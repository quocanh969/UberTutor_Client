import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import FacebookLoginComponent from './Components/FacebookLoginComponent'
import GoogleLoginComponent from './Components/GoogleLoginComponent'


export default class Login extends Component {
    render() {
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
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome you to UBER TUTOR!</h1>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Username" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                                                    </div>
                                                    <div className="form-group">
                                                        <select class="form-control" defaultValue="0">
                                                            <option value="0">Learner</option>
                                                            <option value="1">Tutor</option>
                                                        </select>
                                                    </div>
                                                    <a href="index.html" className="btn btn-primary btn-user btn-block font-weight-bold font-20 mt-5">
                                                        Login
                                                    </a>
                                                    <hr />
                                                    <div className="align-center">
                                                        <div className="btn btn-sm w-100"><FacebookLoginComponent /></div>
                                                        <div className="btn btn-sm w-100"><GoogleLoginComponent /></div>
                                                    </div>
                                                </form>
                                                <hr />
                                                <div className="text-center">
                                                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                                                </div>
                                                <div className="text-center">
                                                    <NavLink className="small" to="/register">Create an Account!</NavLink>
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
