import { us } from '../../Services/UserService';
import { history } from '../../Helpers/History';

export const ActionChangePass = (changePassForm) => {
    return dispatch => {
        dispatch(request());

        us.changePassword(changePassForm)
            .then(
                (res) => {
                    if (res.code === 0) {
                        console.log('failed');
                        console.log(res);
                        dispatch(failure(res.info.message));
                    }
                    else {
                        console.log('success');
                        // update token
                        let user = JSON.parse(localStorage.getItem('user'));
                        user.token = res.info.token;
                        localStorage.setItem('user',JSON.stringify(user));

                        dispatch(success(res.info.message));
                    }
                }
            ).catch((error) => {
                    dispatch(failure('Error in processing'));
            });                           
    };

function request() {
    return {
        type: 'CHANGE_PASSWORD_REQUEST',
    }
}
function success(message) {
    return {
        type: 'CHANGE_PASSWORD_SUCCESS',
        message,
    }
}
function failure(message) {
    return {
        type: 'CHANGE_PASSWORD_FAILURE',
        message,
    }
}
}
