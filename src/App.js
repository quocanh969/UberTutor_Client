import React, { Component } from 'react';
import './App.css';
import './style.css'

import { Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginContainer from './Login/Login/Login.container';
import RegisterContainer from './Register/Register.container';
import RegisterTutorContainer from './Register/RegisterTutor.container';
import Homepage from './GuestUser/Homepage';

import { ProfileRoute, HomeRoute, LoginRoute, TutorRoute, LearnerRoute, TutorReplyRoute } from './CustomRoutes/PrivateRoute';
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      test: 0
    }
  }

  updateUserInfo() {
    this.setState({test:this.state.test + 1});
  }

  render() {
    return (
      <div>
        
        <Router history={history}>
          <SecondaryNavBar notice={this.state.test}/>

          <div className="mt-57 mb-400">
            <Switch>
              <HomeRoute path="/" exact component={Homepage}></HomeRoute>

              <LoginRoute path="/login" exact noticeUserLogin={()=>{this.updateUserInfo()}} component={LoginContainer}></LoginRoute>
              <LoginRoute path="/register" exact component={RegisterContainer}></LoginRoute>
              <Route path="/change-password" exact component={ChangePasswordContainer}></Route>
              <LoginRoute path="/forgot-password" exact component={ForgotPasswordContainer}></LoginRoute>
              <Route path="/tutorRegister" exact component={RegisterTutorContainer}></Route>
              
              <Route path="/tutor-list" exact component={TutorList}></Route>
              <Route path="/tutor-list/area=:area" exact component={TutorList}></Route>
              <Route path="/tutor-list/price=:price" exact component={TutorList}></Route>
              <Route path="/tutor-list/subject=:subject" exact component={TutorList}></Route>
              <Route path="/tutor-list/name=:name" exact component={TutorList}></Route>
              
              <TutorRoute path="/tutor-contract" exact component={TutorContract}></TutorRoute>
              <TutorRoute path="/tutor-summary" exact component={TutorSummary}></TutorRoute>

              <TutorReplyRoute path={`/replyContract/id=:id&reply=:reply`} exact component={ContractReply}></TutorReplyRoute>

              <TutorRoute path="/contract-details/id=:id" exact component={ContractDetail}></TutorRoute>
              <LearnerRoute path="/contract-details-for-learner/id=:id" exact component={ContractDetailLearner}></LearnerRoute>

              <ProfileRoute path="/profile" noticeUserLogin={()=>{this.updateUserInfo()}}></ProfileRoute>

              <Route path="/detail-tutor/id=:id" exact component={DetailTutor}></Route>

              <Route path={`/recover-password/token=:token&id=:id`} exact component={RecoverPassword}></Route>
              <Route path={`/activate-account/id=:id`} exact component={Activate}></Route>
              
              <Redirect to='/' />
            </Switch>
          </div>
          
          <Footer/>
        </Router>
        
      </div>
    );
  }
}

export default App;
