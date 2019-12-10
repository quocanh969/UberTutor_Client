const initState = {
    status: 0,
    message: '',
    loading: false,
}
const RegisterTutorReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REGISTER_TUTOR_REQUEST':
            return {
                ...state,
                status: 0,
                message: '',
                loading: true,
            };
        case 'REGISTER_TUTOR_SUCCESS':
            return {
                ...state,
                status: 1,
                message: action.message,
                loading: false,
            };
        case 'REGISTER_TUTOR_FAILURE':
            return {
                ...state,
                status: -1,
                message: action.message,
                loading: false,
            };
        case 'REFRESH_TUTOR_REGISTER':
            return initState;
        default:
            return state
    }
}

export default RegisterTutorReducer;