const initState = {
    isSuccess: false,
    tutorList: [],
    areaList: [],
    priceList: [],
    subjectList: [],
    areaASC: null,
    priceASC: null,
    subjectASC: null,
    areaFilter: '',
    priceFilter: 0,
    subjectFilter: '',
    searchStr: '',
    totalPage: 0,
    page: 0,
}

const TutorListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TUTOR_LIST_LOAD_AREA_LIST':
            return {
                ...state,
                areaList: action.res,
            };
        case 'TUTOR_LIST_LOAD_SUBJECT_LIST':
            return {
                ...state,
                subjectList: action.res,
            };
        case 'TUTOR_LIST_LOAD_TOTAL_PAGE':
            return {
                ...state,
                totalPage: Math.fround(Number.parseInt(action.res.info.data[0].count) / 5),
            };
        case 'TUTOR_LIST_LOAD_TUTOR_LIST':
            return {
                ...state,
                isSuccess: action.isSuccess,
                tutorList: action.res,
            };
        case 'TUTOR_LIST_SET_PAGE':
            return {
                ...state,
                page: action.page,
            };
        case 'TUTOR_LIST_SET_PAGE':
            return initState;
        default:
            return state;
    }
}

export default TutorListReducer;