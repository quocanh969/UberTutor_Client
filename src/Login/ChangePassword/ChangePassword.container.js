import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import ChangePassword from './ChangePassword';
import { ActionChangePass } from './ChangePassword.action';

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: changePassForm => {            
            dispatch(ActionChangePass(changePassForm));
        },
        onRefreshLogin: () => {
            dispatch({
                type:'REFRESH_CHANGE_PASSWORD',
            });
        },
    }
}

const ChangePasswordContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));

export default ChangePasswordContainer;