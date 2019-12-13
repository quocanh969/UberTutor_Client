import { us } from '../Services/UserService';

export const ActionTutorRegister = (user) => {
    return dispatch => {

        dispatch(request(user));

        us.registerTutor(user)
            .then(
                res => {
                    if (res.code === 1) {
                        dispatch(success(res.message));
                    }
                    else {
                        dispatch(failure(res.message));
                    }
                },
                (error) => {
                    dispatch(failure('Can not connect to server'));
                }
            )

    }

    function request(user) {
        return {
            type: 'REGISTER_TUTOR_REQUEST',
            user,
        }
    }

    function success(message) {
        return {
            type: 'REGISTER_TUTOR_SUCCESS',
            message,
        }
    }

    function failure(message) {
        return {
            type: 'REGISTER_TUTOR_FAILURE',
            message
        }
    }
}

export const ActionTutorValidateFail = message => {
    return {
        type: 'REGISTER_TUTOR_FAILURE',
        message,
    }
}
