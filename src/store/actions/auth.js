import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START,
    }
    
}



export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId,
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
       type:actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationtime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationtime * 1000)  
   } 
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error,
    }
}

export const auth = (email, password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const autData = {
            email: email,
            password: password,
            returnSecureToken:true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBHNQGBK2J6cEK9qH9u1llFSwRg2reknpA';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBHNQGBK2J6cEK9qH9u1llFSwRg2reknpA';

        }
        axios.post(url, autData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(error => { 
                dispatch(authFail(error.response.data.error));
            })
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path,
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate =new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()/1000 )));
            }
            
        }
    }
}