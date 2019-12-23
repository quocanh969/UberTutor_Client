import { history } from '../../Helpers/History';
import { ts } from '../../Services/TutorService';

export const actionLoadAreaList = () => {
    return dispatch => {
        ts.getAreaList()
        .then(res => {
            dispatch({
                type: 'TUTOR_LIST_LOAD_AREA_LIST',
                res,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const actionLoadSubjectList = () => {
    return dispatch => {
        ts.getMajorList()
        .then(res => {
            dispatch({
                type: 'TUTOR_LIST_LOAD_SUBJECT_LIST',
                res,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const actionLoadTotalPage = () => {
    return dispatch => {
        ts.getTutorsCount()
        .then(res => {
            dispatch({
                type: 'TUTOR_LIST_LOAD_TOTAL_PAGE',
                res,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const actionLoadTutorList = (option) => {
    return dispatch => {
        ts.getTutorList(option)
        .then(res => {
            dispatch({
                type: 'TUTOR_LIST_LOAD_TUTOR_LIST',
                isSuccess: true,
                res: res.info.data,
            })
        })
        .catch(err => {
            dispatch({
                type: 'TUTOR_LIST_LOAD_TUTOR_LIST',
                isSuccess: false,
                res: [],
            })
        })
    }
}