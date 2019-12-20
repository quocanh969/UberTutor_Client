import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import { ActionForgotPass } from './ForgotPassword.action';

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onForgotPassword: changePassForm => {            
            dispatch(ActionForgotPass(changePassForm));
        },
        onRefreshForgotPassword: () => {
            dispatch({
                type:'REFRESH_FORGOT_PASSWORD',
            });
        },
    }
}

const ForgotPasswordContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));

export default ForgotPasswordContainer;