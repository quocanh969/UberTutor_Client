import React from 'react';
import './App.css';
import FacebookLoginComponent from './Login/Components/FacebookLoginComponent';
import GoogleLoginComponent from './Login/Components/GoogleLoginComponent';


import { Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginContainer from './Login/Login.container';
import RegisterContainer from './Register/Register.container';
import DashboardContainer from './Dashboard/Dashboard.container';
import RegisterTutorContainer from './Register/RegisterTutor.container';
import Homepage from './GuestUser/Homepage';

import { PrivateRoute } from './CustomRoutes/PrivateRoute';
import { history } from './Helpers/History';

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/login" exact component={LoginContainer}></Route>
          <Route path="/register" exact component={RegisterContainer}></Route>
          <PrivateRoute path="/dashboard" exact component={DashboardContainer}></PrivateRoute>
          <Route path="/tutorRegister" exact component={RegisterTutorContainer}></Route>
          <Redirect to='/login' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
