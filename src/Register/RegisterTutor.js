import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'
import SecondaryNavBar from '../Utilities/Components/SecondaryNavBar'

export default class RegisterTutor extends Component {

    user = {
        username: '',
        password: '',
        name: '',
        email: '',
        yob: 1980,
        role: 1,
        gender: 0,
        address: '',
        phone: '',
        major: '',
        levelTeaching: 0,
    }

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this); // handle submit
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        let { onTutorRegisterRefresh } = this.props;
        onTutorRegisterRefresh();
    }

    handleChange(e) {
        this.user[e.target.name] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.user.password === this.refs.confirm.value) {
            let { onTutorRegister } = this.props;
            onTutorRegister(this.user);
        }
        else {
            let { onTutorValidateFail } = this.props;
            onTutorValidateFail('Repeat is not the same as password');
        }
    }

    generateNotice() {
        let { status, message, loading } = this.props.RegisterReducer;

        if (status === 0) {
            if (loading === true) {
                return (
                    <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                );
            }
            else {
                return null;
            }
        }
        else if (status === 1) {// Thành công
            this.refs.registerForm.reset()
            return (
                <div className="alert alert-success mb-3">
                    {message}
                </div>
            );
        }
        else {// Thất bại
            return (
                <div className="alert alert-danger mb-3">
                    {message}
                </div>
            );
        }
    }


    render() {
        return (
            <div>
                <div><SecondaryNavBar /></div>
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
                                        <form ref="registerForm" className="user">
                                            <div className="form-group">
                                                <div className="mb-3 mb-sm-0">
                                                    <input type="text" required name="name" className="form-control" id="exampleLastName" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" required name="email" className="form-control" id="exampleInputEmail" placeholder="Email Address" />
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" required name="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" required ref="confirm" className="form-control" id="exampleRepeatPassword" placeholder="Repeat Password" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <h1 className="h5 text-gray-900 mb-4">Professional information</h1>
                                            </div>
                                            {/* <a>Major:</a> */}
                                            <div className="form-group">
                                                <select class="form-control" defaultValue="0" name='mainMajor'>
                                                    <option value="0">Major 1</option>
                                                    <option value="1">Major 2</option>
                                                    <option value="2">Major 3</option>
                                                    <option value="4">Major 4</option>
                                                    <option value="5">Major 5</option>
                                                </select>
                                            </div>
                                            <a>Choose your current educational level:</a>
                                            <div className="form-group">
                                                <select class="form-control" defaultValue="0" name='levelTeaching'>
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
