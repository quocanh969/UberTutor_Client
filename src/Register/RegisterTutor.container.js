import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

import RegisterTutor from './RegisterTutor';
import { ActionTutorRegister, ActionTutorValidateFail } from './RegisterTutor.action';

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onTutorRegister: user => {
            dispatch(ActionTutorRegister(user));
        },
        onTutorValidateFail: message => {
            dispatch(ActionTutorValidateFail(message));
        },
        onTutorRegisterRefresh: () => {
            dispatch({
                type:'REFRESH_TUTOR_REGISTER',
            });
        },
    }
}

const RegisterTutorContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterTutor));

export default RegisterTutorContainer;