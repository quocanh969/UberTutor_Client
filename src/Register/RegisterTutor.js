import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'
import { maj } from '../Services/MajorService';

export default class RegisterTutor extends Component {

    user = {
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
        this.state = {
            isLoaded: false,
            majorsSelector: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this); // handle submit
        this.handleChange = this.handleChange.bind(this);

        maj.getList().then(data => {          
            this.setState({majorsSelector: data});
            // console.log(this.majorsSelector);
        })
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
        let { status, message, loading } = this.props.RegisterTutorReducer;

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

    GenerateMajorsList = () => {
        let content = [];
        for (let i of this.state.majorsSelector) {
            content.push(
                <option value={i.id} key={i.id}>{i.name}</option>
            )
        }
        return content;
    }

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
                                            <h1 className="h5 text-gray-900 mb-4">Account information</h1>
                                        </div>
                                        <form ref="registerForm" onSubmit={this.handleSubmit} className="user">
                                            <div className="form-group">
                                                <div className="mb-3 mb-sm-0">
                                                    <input type="text" required name="name" className="form-control" id="exampleLastName" placeholder="Name" onChange={this.handleChange}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" required name="email" className="form-control" id="exampleInputEmail" placeholder="Email Address" onChange={this.handleChange}/>
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" required name="password" className="form-control" id="exampleInputPassword" placeholder="Password" onChange={this.handleChange}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" required ref="confirm" className="form-control" id="exampleRepeatPassword" placeholder="Repeat Password" onChange={this.handleChange} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" onChange={this.handleChange} className="form-control" id="address" name="address" placeholder="Address" />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" required onChange={this.handleChange} className="form-control" id="phone" name="phone" placeholder="Phone number" />
                                            </div>
                                            <div className="form-group row py-auto">
                                                <div className="col-6 mb-3 mb-sm-0">
                                                    <input type="number" required onChange={this.handleChange} className="form-control" id="yob" name="yob" min="1980" placeholder="Years Of Birth" />
                                                </div>
                                                <select className="form-select col-6"
                                                    name="gender"
                                                    id="gender"
                                                    onChange={this.handleChange}
                                                    defaultValue={0}>
                                                    <option value={0}>Male</option>
                                                    <option value={1}>Female</option>
                                                </select>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <h1 className="h5 text-gray-900 mb-4">Professional information</h1>
                                            </div>

                                            <div className="form-group">
                                                <select className="form-control" defaultValue="0" name='mainMajor' onChange={this.handleChange}>
                                                    
                                                    {this.GenerateMajorsList()}
                                                </select>
                                            </div>
                                            <a>Choose your current educational level:</a>
                                            <div className="form-group">
                                                <select className="form-control" defaultValue="0" name='levelTeaching' onChange={this.handleChange}>
                                                    <option value="0">Undergraduate</option>
                                                    <option value="1">Bachelor</option>
                                                    <option value="2">Master</option>
                                                    <option value="4">Doctor</option>
                                                    <option value="5">Professor</option>
                                                </select>
                                            </div>
                                            {this.generateNotice()}
                                            <button className="btn btn-primary btn-user btn-block font-weight-bold font-20">
                                                Register Account
                                            </button>
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
