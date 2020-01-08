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

import { PrivateRoute, ProfileRoute, HomeRoute } from './CustomRoutes/PrivateRoute';
import { history } from './Helpers/History';
import ChangePasswordContainer from './Login/ChangePassword/ChangePassword.container';
import ForgotPasswordContainer from './Login/ForgotPassword/ForgotPassword.container';
import SecondaryNavBar from './Utilities/Components/SecondaryNavBar';
import RecoverPassword from './Login/RecoverPassword/RecoverPassword';
import Footer from './Utilities/Footer';
import Activate from './Register/Activate/Activate';
import TutorList from './Tutor/TutorList/TutorList';
import DetailTutor from './Tutor/DetailTutor/DetailTutor';
import ContractDetail from './Contract/ContractDetail';
import ContractReply from './Contract/ContractReply';
import ContractDetailLearner from './Contract/ContractDetailLearner';
import TutorContract from './Tutor/Contract/TutorContract';
import TutorSummary from './Tutor/Summary/TutorSummary';

function App() {
  return (
    <div>
      
      <Router history={history}>
        <SecondaryNavBar/>

        <div className="mt-57 mb-400">
          <Switch>
            <HomeRoute path="/" exact component={Homepage}></HomeRoute>

            <Route path="/login" exact component={LoginContainer}></Route>
            <Route path="/register" exact component={RegisterContainer}></Route>
            <Route path="/change-password" exact component={ChangePasswordContainer}></Route>
            <Route path="/forgot-password" exact component={ForgotPasswordContainer}></Route>
            
            <Route path="/tutor-list" exact component={TutorList}></Route>
            <Route path="/tutor-list/area=:area" exact component={TutorList}></Route>
            <Route path="/tutor-list/price=:price" exact component={TutorList}></Route>
            <Route path="/tutor-list/subject=:subject" exact component={TutorList}></Route>
            <Route path="/tutor-list/name=:name" exact component={TutorList}></Route>
            
            <Route path="/tutor-contract" exact component={TutorContract}></Route>
            <Route path="/tutor-summary" exact component={TutorSummary}></Route>

            <Route path={`/replyContract/id=:id&reply=:reply`} exact component={ContractReply}></Route>
            <Route path="/contract-details/id=:id" exact component={ContractDetail}></Route>
            <Route path="/contract-details-for-learner/id=:id" exact component={ContractDetailLearner}></Route>

            <ProfileRoute path="/profile"></ProfileRoute>

            <Route path="/detail-tutor/id=:id" exact component={DetailTutor}></Route>

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
