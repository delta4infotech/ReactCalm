import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (Wrapped,axios) => {
    
    return class extends Component {

        state= {
            error:null
        }

        componentWillMount() {
           this.reqInterceptor= axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            });
            this.resInterceptor= axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
            });
            
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.state.reqInterceptor);
            axios.interceptors.response.eject(this.state.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({error:null})
        }

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmed}>
                    {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <Wrapped {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler


