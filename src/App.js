import React from 'react';
import './App.css';
import FacebookLoginComponent from './Login/Components/FacebookLoginComponent';
import GoogleLoginComponent from './Login/Components/GoogleLoginComponent';


import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginContainer from './Login/Login.container';
import RegisterContainer from './Register/Register.container';
import DashboardContainer from './Dashboard/Dashboard.container';

import { PrivateRoute } from './CustomRoutes/PrivateRoute';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LoginContainer}></Route>
          <Route path="/register" exact component={RegisterContainer}></Route>
          <Route path="/dashboard" exact component={DashboardContainer}></Route>
          <Redirect to='/login' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
