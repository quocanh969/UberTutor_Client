const initState = {
    status: 0,
    message: '',
    loading: false,
}
const RegisterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER_STUDENT_REQUEST':
            return {
                ...state,
                status: 0,
                message: '',
                loading: true,
            };
        case 'REGISTER_STUDENT_SUCCESS':
            return {
                ...state,
                status: 1,
                message: action.message,
                loading: false,
            };
        case 'REGISTER_STUDENT_FAILURE':
            return {
                ...state,
                status: -1,
                message: action.message,
                loading: false,
            };
        case 'REFRESH_STUDENT_REGISTER':
            return initState;
        default:
            return state
    }
}

export default RegisterReducer;