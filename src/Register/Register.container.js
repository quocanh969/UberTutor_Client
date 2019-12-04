import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Register from './Register';
import { ActionStudentRegister, ActionStudentValidateFail } from './Register.action';

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onStudentRegister: user => {
            dispatch(ActionStudentRegister(user));
        },
        onStudentValidateFail: message => {
            dispatch(ActionStudentValidateFail(message));
        },
        onStudentRegisterRefresh: () => {
            dispatch({
                type:'REFRESH_STUDENT_REGISTER',
            });
        },
    }
}

const RegisterContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));

export default RegisterContainer;