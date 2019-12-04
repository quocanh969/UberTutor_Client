import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

export default class RegisterTutor extends Component {
    render() {
        return (
            <div>
                <div className="container my-0">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-5 d-none d-lg-block bg-register-tutor-image" />
                                <div className="col-lg-7">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Sign up as a Tutor</h1>
                                        </div>
                                        <hr />
                                        <div className="text-center">
                                            <h1 className="h5 text-gray-900 mb-4">Personal information</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control" id="exampleFirstName" placeholder="First Name" />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" id="exampleLastName" placeholder="Last Name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control" id="exampleInputEmail" placeholder="Email Address" />
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" className="form-control" id="exampleRepeatPassword" placeholder="Repeat Password" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <h1 className="h5 text-gray-900 mb-4">Professional information</h1>
                                            </div>
                                            {/* <a>Major:</a> */}
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputEmail" placeholder="Enter your main major" />
                                            </div>
                                            <a>Choose your current educational level:</a>
                                            <div className="form-group">
                                                <select class="form-control" defaultValue="0">
                                                    <option value="0">Undergraduate</option>
                                                    <option value="1">Bachelor</option>
                                                    <option value="2">Master</option>
                                                    <option value="4">Doctor</option>
                                                    <option value="5">Professor</option>
                                                </select>
                                            </div>
                                            <a href="login.html" className="btn btn-primary btn-user btn-block font-weight-bold font-20">
                                                Register Account
                                            </a>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <NavLink className="small" to="/register">Sign up as a learner instead?</NavLink>
                                        </div>
                                        <div className="text-center">
                                            <NavLink className="small" to="/login">Already have an account? Login!</NavLink>
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
