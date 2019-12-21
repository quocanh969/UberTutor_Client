import React from 'react';
import './App.css';
import './style.css'
import FacebookLoginComponent from './Login/Login/Components/FacebookLoginComponent';
import GoogleLoginComponent from './Login/Login/Components/GoogleLoginComponent';


import { Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginContainer from './Login/Login/Login.container';
import RegisterContainer from './Register/Register.container';
import DashboardContainer from './Dashboard/Dashboard.container';
import RegisterTutorContainer from './Register/RegisterTutor.container';
import Homepage from './GuestUser/Homepage';

import { PrivateRoute } from './CustomRoutes/PrivateRoute';
import { history } from './Helpers/History';
import ChangePasswordContainer from './Login/ChangePassword/ChangePassword.container';
import ForgotPasswordContainer from './Login/ForgotPassword/ForgotPassword.container';
import SecondaryNavBar from './Utilities/Components/SecondaryNavBar';
import RecoverPassword from './Login/RecoverPassword/RecoverPassword';
import Footer from './Utilities/Footer';
import Activate from './Register/Activate/Activate';
import TutorList from './Tutor/TutorList/TutorList';

function App() {
  return (
    <div>
      
      <Router history={history}>
        <SecondaryNavBar/>

        <div className="mt-57 mb-400">
          <Switch>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/login" exact component={LoginContainer}></Route>
            <Route path="/register" exact component={RegisterContainer}></Route>
            <Route path="/change-password" exact component={ChangePasswordContainer}></Route>
            <Route path="/forgot-password" exact component={ForgotPasswordContainer}></Route>
            <Route path="/tutor-list" exact component={TutorList}></Route>
            <Route path={`/recover-password/token=:token&id=:id`} exact component={RecoverPassword}></Route>
            <Route path={`/activate-account/id=:id`} exact component={Activate}></Route>
            <PrivateRoute path="/dashboard" exact component={DashboardContainer}></PrivateRoute>
            <Route path="/tutorRegister" exact component={RegisterTutorContainer}></Route>
            <Redirect to='/login' />
          </Switch>
        </div>
        
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
