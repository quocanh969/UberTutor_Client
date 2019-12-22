import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class ChangePassword extends Component {
    changePassForm = {
        id:JSON.parse(localStorage.getItem('user')).user.loginUser.id,
        oldPassword: '',
        newPassword: '',
        reconfirmPassword: '',
    };
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount()
    {
        let { onRefreshChangePassword } = this.props;
        onRefreshChangePassword();
    }

    handleChange(e)
    {
        this.changePassForm[e.target.name] = e.target.value;
    }

    handleSubmit(e)
    {
        e.preventDefault();
        let {onChangePassword} = this.props;
        onChangePassword(this.changePassForm);        
    }

    
    generateNotice()
    {
        let { status, message, loading } = this.props.ChangePasswordReducer;

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
            this.refs.changePassForm.reset();
            return(
                <div className="alert alert-success mb-3">
                    {message}
                </div>
            );
        }
        else if( loading === true)
        {
            return(
                <div className="d-flex justify-content-center my-3">
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
            <div className="container mt-5">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-change-password-image" />
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2">Change Your Password?</h1>
                                                <hr/>
                                            </div>
                                            <form className="user" ref="changePassForm" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="password" minLength="7" required name="oldPassword" 
                                                            className="form-control form-control-user" placeholder="Old Password" 
                                                            onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" minLength="7" required name="newPassword" 
                                                            className="form-control form-control-user" placeholder="New Password" 
                                                            onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" minLength="7" required name="reconfirmPassword" 
                                                            className="form-control form-control-user" placeholder="Confirm Password" 
                                                            onChange={this.handleChange}/>
                                                </div>
                                                {this.generateNotice()}
                                                <button className="btn btn-primary btn-user btn-block font-weight-bold" type="submit">
                                                    Change Password
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <NavLink className="small" to="/register">Create new Account as Learner!</NavLink>
                                            </div>
                                            <div className="text-center">
                                                <NavLink className="small" to="/tutorRegister">Create new Account as Tutor!</NavLink>
                                            </div>
                                            <br></br>
                                            <div className="text-center">
                                                <NavLink className="small" to="/login">Remember how your password is? Login!</NavLink>                                                
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
