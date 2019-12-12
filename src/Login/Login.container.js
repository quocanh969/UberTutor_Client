import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { ActionNormalLogIn, ActionFacebookLogin, ActionGoogleLogin } from './Login.action';

import Login from './Login'

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onNormalLogin: user => {            
            dispatch(ActionNormalLogIn(user));
        },
        onFacebookLogin: user => {
            dispatch(ActionFacebookLogin(user));
        },
        onGoogleLogin: user => {
            dispatch(ActionGoogleLogin(user));
        },
        onRefreshLogin: () => {
            dispatch({
                type:'REFRESH_LOGIN',
            });
        },
    }
}

const LoginContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

export default LoginContainer;