import * as actiontypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility'; 


const initialState = {
    orders: [],
    loading: false,
    purchased:false,
}

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, { loading: true })
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrders = updatedObject(action.ordeData, { id: action.ordersId });
            return updatedObject(state, {
                loading: false,
                orders: state.orders.concat(newOrders),
                purchased: true,
            });
}

const purchaseBurgerFail = (state, action) => {
    return updatedObject(state, { loading: false })
}

const purchaseInit = (state, action) => {
    return updatedObject(state, { purchased: false })
}

const fetchOrderStart = (state, action) => {
    return updatedObject(state, { loading: true, })
}

const fetchOrderSuccess = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
       loading:false,
    })
}

const fetchOrderFail = (state, action) => {
    return updatedObject(state, { loading: false, })
}




const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actiontypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);

        case actiontypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
            
        case actiontypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);            
        
        case actiontypes.PURCHASE_INIT: return purchaseInit(state, action);            
        
        case actiontypes.FETCH_ORDERS_START: return fetchOrderStart(state, action); 
            
        case actiontypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);            
        
        case actiontypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state,action)
    
        default: return state
    }
}


export default reducer;