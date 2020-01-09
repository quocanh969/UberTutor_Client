import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LearnerProfile from '../Profile/Learner/LearnerProfile';
import TutorProfile from '../Profile/Tutor/TutorProfile';
import Homepage from '../GuestUser/Homepage';
import TutorHomePage from '../GuestUser/TutorHomePage';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = JSON.parse(localStorage.getItem('user'));
                /*
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();
                */
                //if (user && user.user !== false && setupTime - now < 6 * 60 * 60 * 1000) {
                if (user && user.user !== false) {
                    return (
                        <Component {...props}></Component>
                    );
                }
                else {                    
                    localStorage.removeItem('user');
                    /*
                    localStorage.removeItem('setTimeLogIn');
                    localStorage.removeItem('isBotMode');
                    localStorage.removeItem('room');
                    */
                    return (
                        <Redirect to={
                            {
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                }
                            }
                        }
                        ></Redirect>
                    );
                }
            }
        }
        ></Route>
    );
}

export const LoginRoute = ({ component: Component,noticeUserLogin, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {                
                return (// kiểm tra xem đã có thông tin người dùng trong localStorage chưa
                    localStorage.getItem('user')
                        ? <Redirect to={
                                {
                                    pathname: '/',
                                    state: {
                                        from: props.location,
                                    }
                                }
                            }
                            ></Redirect>
                        : <Component noticeUserLogin={noticeUserLogin} {...props}></Component>
                );
            }
        }
        ></Route>
    );
}

export const ProfileRoute = ({ component: Component, noticeUserLogin, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = JSON.parse(localStorage.getItem('user'));
                /*
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();
                */
                //if (user && user.user !== false && setupTime - now < 6 * 60 * 60 * 1000) {
                if (user && user.user !== false) {
                    if(user.user.loginUser.role === 0)
                    { // learner
                        return (
                            <LearnerProfile noticeUserLogin={noticeUserLogin} {...props}></LearnerProfile>
                        );
                    }
                    else
                    { // tutor
                        return (
                            <TutorProfile noticeUserLogin={noticeUserLogin} {...props}></TutorProfile>
                        );
                    }
                }
                else {                    
                    localStorage.removeItem('user');
                    /*
                    localStorage.removeItem('setTimeLogIn');
                    localStorage.removeItem('isBotMode');
                    localStorage.removeItem('room');
                    */
                    return (
                        <Redirect to={
                            {
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                }
                            }
                        }
                        ></Redirect>
                    );
                }
            }
        }
        ></Route>
    );
}

export const HomeRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = JSON.parse(localStorage.getItem('user'));
                /*
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();
                */
                //if (user && user.user !== false && setupTime - now < 6 * 60 * 60 * 1000) {
                if (user && user.user !== false) {
                    if(user.user.loginUser.role === 0)
                    { // learner
                        return (
                            <Homepage {...props}></Homepage>
                        );
                    }
                    else
                    { // tutor
                        return (
                            <TutorHomePage {...props}></TutorHomePage>
                        );
                    }
                }
                else {                    
                    return (
                        <Homepage {...props}></Homepage>
                    );
                }
            }
        }
        ></Route>
    );
}

export const TutorRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = JSON.parse(localStorage.getItem('user'));
                /*
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();
                */
                //if (user && user.user !== false && setupTime - now < 6 * 60 * 60 * 1000) {
                if (user && user.user !== false) {
                    if(user.user.loginUser.role === 0)
                    { // learner
                        
                        return (
                            <Redirect to={
                                {
                                    pathname: '/',
                                    state: {
                                        from: props.location,
                                    }
                                }
                            }
                            ></Redirect>
                        );
                    }
                    else
                    { // tutor
                        return (
                            <Component {...props}></Component>
                        );
                    }
                }
                else {                    
                    return (
                        <Redirect to={
                            {
                                pathname: '/',
                                state: {
                                    from: props.location,
                                }
                            }
                        }
                        ></Redirect>
                    );
                }
            }
        }
        ></Route>
    );
}

export const TutorReplyRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = JSON.parse(localStorage.getItem('user'));
                /*
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();
                */
                //if (user && user.user !== false && setupTime - now < 6 * 60 * 60 * 1000) {
                if (user && user.user !== false) {
                    if(user.user.loginUser.role === 0)
                    { // learner
                        alert('You have to log in as tutor to accept this link');
                        return '';
                    }
                    else
                    { // tutor
                        return (
                            <Component {...props}></Component>
                        );
                    }
                }
                else {                    
                    alert('You have to log in as tutor to accept this link');
                    return '';
                }
            }
        }
        ></Route>
    );
}

export const LearnerRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                let user = JSON.parse(localStorage.getItem('user'));
                /*
                let setupTime = localStorage.getItem('setTimeLogIn');
                let now = new Date().getTime();
                */
                //if (user && user.user !== false && setupTime - now < 6 * 60 * 60 * 1000) {
                if (user && user.user !== false) {
                    if(user.user.loginUser.role === 0)
                    { // learner
                        
                        return (
                            <Component {...props}></Component>
                        );
                    }
                    else
                    { // tutor
                        return (                            
                            <Redirect to={
                                {
                                    pathname: '/',
                                    state: {
                                        from: props.location,
                                    }
                                }
                            }
                            ></Redirect>
                        );
                    }
                }
                else {                    
                    return (
                        <Redirect to={
                            {
                                pathname: '/',
                                state: {
                                    from: props.location,
                                }
                            }
                        }
                        ></Redirect>
                    );
                }
            }
        }
        ></Route>
    );
}