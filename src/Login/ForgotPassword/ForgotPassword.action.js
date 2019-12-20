import { us } from '../../Services/UserService';
import { history } from '../../Helpers/History';

export const ActionForgotPass = (email) => {
    return dispatch => {
        dispatch(request());
        
        us.forgotPassword(email)
            .then(
                (res) => {
                    if (res.info.code === 0) 
                    {
                        dispatch(failure(res.info.message));
                    }
                    else {
                        dispatch(success(res.info.message));
                    }
                },
                (error) => {
                    dispatch(failure('Can not connect to server'));
                }
            );
    };

    function request() {
        return {
            type: 'FORGOT_PASSWORD_REQUEST',
        }
    }
    function success(message) {
        return {
            type: 'FORGOT_PASSWORD_SUCCESS',
            message,
        }
    }
    function failure(message) {
        return {
            type: 'FORGOT_PASSWORD_FAILURE',
            message,
        }
    }
}
