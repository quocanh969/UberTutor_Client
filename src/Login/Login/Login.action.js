import { us } from '../../Services/UserService';
import { history } from '../../Helpers/History';

export const ActionNormalLogIn = (user) => {
    return dispatch => {
        dispatch(request(user));
        us.normalLogin(user)
            .then(
                (res) => {
                    console.log(res);
                    console.log(res.info.code);
                    if (res.info.code === 0 || res.info.code === 1 || res.info.code === 2) 
                    {
                        dispatch(failure(res.info.message));
                    }
                    else {
                        dispatch(success(res.info.message));
                        history.push('/dashboard');
                    }
                },
                (error) => {
                    dispatch(failure('Can not connect to server'));
                }
            );
    };

    function request(user) {
        return {
            type: 'LOG_IN_REQUEST',
            user,
        }
    }
    function success(message) {
        return {
            type: 'LOG_IN_SUCCESS',
            message,
        }
    }
    function failure(message) {
        return {
            type: 'LOG_IN_FAILURE',
            message,
        }
    }
}

export const ActionFacebookLogin = (user) => {
    return dispatch => {
        dispatch(request(user));
        us.facebookLogin(user)
            .then(
                (res) => {
                    if (res.info.code === 0 || res.info.code === 1 || res.info.code === 2) 
                    {
                        dispatch(failure(res.info.message));
                    }
                    else {
                        dispatch(success(res.info.message));
                        history.push('/dashboard');
                    }
                },
                (error) => {
                    dispatch(failure('Can not connect to server'));
                }
            );
    };

    function request(user) {
        return {
            type: 'LOG_IN_REQUEST',
            user,
        }
    }
    function success(message) {
        return {
            type: 'LOG_IN_SUCCESS',
            message,
        }
    }
    function failure(message) {
        return {
            type: 'LOG_IN_FAILURE',
            message,
        }
    }
}

export const ActionGoogleLogin = (user) => {
    return dispatch => {
        dispatch(request(user));
        us.googleLogin(user)
            .then(
                (res) => {
                    if (res.info.code === 0 || res.info.code === 1 || res.info.code === 2) 
                    {
                        dispatch(failure(res.info.message));
                    }
                    else {
                        dispatch(success(res.info.message));
                        history.push('/dashboard');
                    }
                },
                (error) => {
                    dispatch(failure('Can not connect to server'));
                }
            );
    };

    function request(user) {
        return {
            type: 'LOG_IN_REQUEST',
            user,
        }
    }
    function success(message) {
        return {
            type: 'LOG_IN_SUCCESS',
            message,
        }
    }
    function failure(message) {
        return {
            type: 'LOG_IN_FAILURE',
            message,
        }
    }
}