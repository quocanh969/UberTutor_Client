const initState = {
    status: 0,
    message: '',
    loading: false,
}

const ChangePasswordReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD_REQUEST':
            return {
                ...state,
                status: 0,
                message: '',
                loading: true,
            };
        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                ...state,
                status: 1,
                message: action.message,
                loading: false,
            };
        case 'CHANGE_PASSWORD_FAILURE':
            return {
                ...state,
                status: -1,
                message: action.message,
                loading: false,
            };
        case 'REFRESH_CHANGE_PASSWORD':
            return initState;
        default:
            return state
    }
}

export default ChangePasswordReducer;