import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {us} from '../../Services/UserService';

export default class ForgotPassword extends Component {
    constructor(props)
    {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount()
    {
        let { onRefreshForgotPassword } = this.props;
        onRefreshForgotPassword();
    }

    handleSubmit(e)
    {
        e.preventDefault();
        let { onForgotPassword } = this.props;

        onForgotPassword(this.refs.email.value);
    }

    generateNotice()
    {
        let { status, message, loading } = this.props.ForgotPasswordReducer;

        if(status === -1)
        {// Thất bại
            return(
                <div className="alert alert-danger mb-3">
                    {message}
                </div>
            );
        }
        else if( status === 1 )
        {
            this.refs.email.value = '';
            return(
                <div className="alert alert-success mb-3">
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
        return (
            <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-forgot-password-image" />
                            <div className="col-lg-6">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                    <p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                </div>
                                <form className="user" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input ref="email" type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                    </div>
                                    {this.generateNotice()}
                                    <button type="submit" className="btn btn-primary btn-user btn-block font-weight-bold">
                                        Reset Password
                                    </button>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <NavLink className="small" to="/register">Create an Account as Learner!</NavLink>
                                </div>
                                <div className="text-center">
                                    <NavLink className="small" to="/tutorRegister">Create an Account as Tutor!</NavLink>
                                </div>
                                <br></br>
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
            </div>

        )
    }
}
