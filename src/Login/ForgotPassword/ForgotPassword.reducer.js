const initState = {
    status: 0,
    message: '',
    loading: false,
}

const ForgotPasswordReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FORGOT_PASSWORD_REQUEST':
            return {
                ...state,
                status: 0,
                message: '',
                loading: true,
            };
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                ...state,
                status: 1,
                message: action.message,
                loading: false,
            };
        case 'FORGOT_PASSWORD_FAILURE':
            return {
                ...state,
                status: -1,
                message: action.message,
                loading: false,
            };
        case 'REFRESH_FORGOT_PASSWORD':
            return initState;
        default:
            return state
    }
}

export default ForgotPasswordReducer;