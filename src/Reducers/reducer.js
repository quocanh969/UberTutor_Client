import { combineReducers } from "redux";

import LoginReducer from '../Login/Login/Login.reducer';
import RegisterReducer from '../Register/Register.reducer';
import DashboardReducer from '../Dashboard/Dashboard.reducer';
import RegisterTutorReducer from '../Register/RegisterTutor.reducer';
import ChangePasswordReducer from '../Login/ChangePassword/ChangePassword.reducer';
import ForgotPasswordReducer from '../Login/ForgotPassword/ForgotPassword.reducer';

const reducer = combineReducers(
    {
        LoginReducer,
        RegisterReducer,
        DashboardReducer,
        RegisterTutorReducer,
        ChangePasswordReducer,
        ForgotPasswordReducer,
    }
)

export default reducer;