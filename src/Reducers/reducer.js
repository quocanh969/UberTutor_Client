import { combineReducers } from "redux";

import LoginReducer from '../Login/Login/Login.reducer';
import RegisterReducer from '../Register/Register.reducer';
import DashboardReducer from '../Dashboard/Dashboard.reducer';
import RegisterTutorReducer from '../Register/RegisterTutor.reducer';
import ChangePasswordReducer from '../Login/ChangePassword/ChangePassword.reducer';

const reducer = combineReducers(
    {
        LoginReducer,
        RegisterReducer,
        DashboardReducer,
        RegisterTutorReducer,
        ChangePasswordReducer,
    }
)

export default reducer;