import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import TutorList from './TutorList';

import {actionLoadAreaList, actionLoadSubjectList, actionLoadTotalPage, actionLoadTutorList} from './TutorList.action';

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadAreaList: () => {
          dispatch(actionLoadAreaList());
        },
        onLoadSubjectList: () => {
            dispatch(actionLoadSubjectList());
        },
        onLoadTotalPage: () => {
            dispatch(actionLoadTotalPage());
        },
        onLoadTutorList: (option) => {
            dispatch(actionLoadTutorList(option));
        },
        onSetPage: (page) => {
            dispatch({
                type: 'TUTOR_LIST_SET_PAGE',
                page,
            });
        },
        onReset: () => {
            dispatch({
                type: 'TUTOR_LIST_RESET',
            })
        },
    }
}

const TutorListContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(TutorList));

export default TutorListContainer;