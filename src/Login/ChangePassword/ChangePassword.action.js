import { us } from '../../Services/UserService';
import { history } from '../../Helpers/History';

export const ActionChangePass = (changePassForm) => {
    return dispatch => {
        dispatch(request());
        
        // us.normalLogin(user)
        //     .then(
        //         (res) => {
        //             if (res.info.code === 0 || res.info.code === 1 || res.info.code === 2) 
        //             {
        //                 dispatch(failure(res.info.message));
        //             }
        //             else {
        //                 dispatch(success(res.info.message));
        //                 history.push('/dashboard');
        //             }
        //         },
        //         (error) => {
        //             dispatch(failure('Can not connect to server'));
        //         }
        //     );
        console.log("request");
        let changeRes = us.changePassword(changePassForm);
        if(changeRes.code === 0)
        {
            console.log("success");            
            dispatch(failure(changeRes.info.message));
        }
        else
        {
            console.log("failure");
            dispatch(success(changeRes.info.message));
        }
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
