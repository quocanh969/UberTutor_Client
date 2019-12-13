import { us } from '../Services/UserService';

export const ActionStudentRegister = (user) => {
    return dispatch => {

        dispatch(request(user));
        console.log(user);
        us.registerStudent(user)
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
            type: 'REGISTER_STUDENT_REQUEST',
            user
        }
    }

    function success(message) {
        return {
            type: 'REGISTER_STUDENT_SUCCESS',
            message
        }
    }

    function failure(message) {
        return {
            type: 'REGISTER_STUDENT_FAILURE',
            message
        }
    }
}

export const ActionStudentValidateFail = message => {
    return {
        type: 'REGISTER_STUDENT_FAILURE',
        message,
    }
}
