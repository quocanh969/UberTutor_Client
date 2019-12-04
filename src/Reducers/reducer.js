import { combineReducers } from "redux";

import LoginReducer from '../Login/Login.reducer';
import RegisterReducer from '../Register/Register.reducer';
import DashboardReducer from '../Dashboard/Dashboard.reducer';
import RegisterTutorReducer from '../Register/RegisterTutor.reducer';

const reducer = combineReducers(
    {
        LoginReducer,
        RegisterReducer,
        DashboardReducer,
        RegisterTutorReducer,
    }
)

export default reducer;