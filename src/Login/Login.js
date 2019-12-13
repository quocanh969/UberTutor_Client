import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import FacebookLoginComponent from './Components/FacebookLoginComponent'
import GoogleLoginComponent from './Components/GoogleLoginComponent'
import SecondaryNavBar from '../Utilities/Components/SecondaryNavBar'

export default class Login extends Component {
    role = 0;
    user = {
        username:'',
        password:'',
    }

    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this); // handle submit
        this.handleChange = this.handleChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    
    handleChange(e)
    {
        this.user[e.target.name] = e.target.value;
    }

    handleRoleChange(e)
    {
        this.role = e.target.value;
    }

    handleSubmit(e)
    {
        e.preventDefault();
        

        let { onNormalLogin } = this.props;        
        onNormalLogin({
            username: this.user.username,
            password: this.user.password,
            role: this.role,
        });        
        
    }

    generateNotice()
    {
        let { status, message, loading } = this.props.LoginReducer;

        if(status === -1)
        {// Thất bại
            return(
                <div className="alert alert-danger mb-3">
                    {message}
                </div>
            );
        }
        else if( loading === true)
        {
            return(
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        else
        {
            return ;
        }
    }

    render() {
        let {onFacebookLogin,onGoogleLogin} = this.props;
        return (
            <div>                
                <div className="container">
                    {/* Outer Row */}
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    {/* Nested Row within Card Body */}
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4 font-weight-bold">Welcome to UBER TUTOR!</h1>
                                                </div>
                                                <label className="mb-1">Login as:</label>
                                                <div className="form-group">
                                                    <select onChange={this.handleRoleChange} className="form-control" defaultValue={0}>
                                                        <option value={0}>Learner</option>
                                                        <option value={1}>Tutor</option>
                                                    </select>
                                                </div>
                                                <hr />
                                                <form className="user" onSubmit={this.handleSubmit}>
                                                    <div className="form-group">
                                                        <input type="email" onChange={this.handleChange} required className="form-control" id="username" name="username" placeholder="Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" onChange={this.handleChange} required className="form-control" id="password" name="password" placeholder="Password" />
                                                    </div>
                                                    {this.generateNotice()}
                                                    <button type="submit" className="btn btn-primary btn-user btn-block font-weight-bold font-20 mt-5">
                                                        Login
                                                    </button>
                                                    <hr />
                                                    <div className="align-center">
                                                        <div className="btn btn-sm w-100"><FacebookLoginComponent FacebookLogin={onFacebookLogin} role={this.role}/></div>
                                                        <div className="btn btn-sm w-100"><GoogleLoginComponent GoogleLoginFunc={onGoogleLogin} role={this.role}/></div>
                                                    </div>
                                                </form>
                                                <hr />                                                
                                                <div className="text-center">
                                                    <NavLink className="small" to="/register">Sign up as a learner!</NavLink>
                                                </div>
                                                <div className="text-center">
                                                    <NavLink className="small" to="/tutorRegister">Sign up as a tutor!</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
