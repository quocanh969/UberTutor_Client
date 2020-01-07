import React, { Component } from 'react';
import { history } from '../../Helpers/History';
import { storage } from '../../Helpers/Firebase';
import { ls } from '../../Services/LearnerService';
import { ts } from '../../Services/TutorService';

import '../../Detail.css';
import { NavLink } from 'react-router-dom';
import ContractList from '../ContractList';

export default class LearnerProfile extends Component {
    tempUser = {
        gender: 0,
    };
    image = null;
    constructor(props) {
        super(props);
        let id = JSON.parse(localStorage.getItem('user')).user.loginUser.id;
        this.state = {
            tab: 1,            
            user: {
                id: 1,
                name: '',
                address: '',
                email: '',
                phone: '',
                gender: 0,
                yob: null,
                avatarLink: '',
                isEditting: false,
            },
        }

        this.initData(id);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    initData(id) {
        ls.getLearnerDetail(id)
            .then(res => {
                this.setState({ user: res.info.data[0] });
                this.onReset();
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleChange(e) {
        this.tempUser[e.target.name] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        ls.updateLearnerDetail(this.tempUser)
            .then(res => {
                this.tempUser.isEditting = false;
                this.setState({ user: this.tempUser });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChangeAvatar(e) {
        this.image = e.target.files[0];
        const uploadTask = storage.ref(`learner-avatar/${this.state.user.id}-${this.state.user.name}/${this.image.name}`).put(this.image);

        uploadTask.on('state_changed',
            () => { },
            (error) => {
                alert('Upload image to server host get error ...');
            },
            () => { // hoàn thành việc upload
                storage.ref(`learner-avatar/${this.state.user.id}-${this.state.user.name}`).child(this.image.name).getDownloadURL()
                    .then(
                        (url) => {
                            this.tempUser.avatarLink = url;
                            this.setState({ user: this.tempUser });
                        }
                    )
            })
    }

    onReset() {
        this.tempUser = { ...this.state.user };
        this.refs.name.value = this.state.user.name;
        this.refs.email.value = this.state.user.email;
        this.refs.phone.value = this.state.user.phone;
        this.refs.gender.value = Number.parseInt(this.state.user.gender);
        this.refs.yob.value = Number.parseInt(this.state.user.yob);
    }

    render() {
        var accountInfoClass = "";
        var accountInfoBtn = "";
        var contractInfoClass = "";
        var contractInfoBtn = "";

        let ImgSrc = this.state.user.avatarLink;
        if (ImgSrc === null || ImgSrc === '') {
            ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
        }

        if (this.state.tab === 1) {
            accountInfoBtn = 'nav-link active cursor-pointer';
            accountInfoClass = 'tab-pane fade show active';            
            contractInfoBtn = 'nav-link cursor-pointer';
            contractInfoClass = 'tab-pane fade';
        }
        else {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            contractInfoBtn = 'nav-link cursor-pointer  active';
            contractInfoClass = 'tab-pane fade show active';
        }

        let disableVal = true;
        if (this.state.user.isEditting) disableVal = false;
        else disableVal = true;

        return (
            <div className="container emp-profile">
                <form ref='editProfileForm' onSubmit={this.handleSubmit}>
                    <div className="row">

                        <div className="col-md-4">
                            <div className="profile-img mb-5">
                                <img src={ImgSrc}
                                    alt="avatar-user" />
                                <input type="file" name="file" ref="imgInput" className="d-none" onChange={this.handleChangeAvatar} />
                                {this.state.user.isEditting ?
                                    <div className="file btn btn-lg btn-primary cursor-pointer"
                                        onClick={() => { this.refs.imgInput.click() }}>
                                        Change Photo
                                    </div>
                                    : ''
                                }

                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="profile-head">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h5>
                                            {this.state.user.name.toUpperCase()}
                                        </h5>
                                        <h6 className="font-weight-bold">
                                            LEARNER
                                        </h6>
                                    </div>
                                    <div className='col-4'>
                                        {this.state.user.isEditting ?
                                            <div className='d-flex justify-content-between'>
                                                <button className='btn btn-success h-100 w-49 font-weight-bold'
                                                    type='submit'>
                                                    <i className="fa fa-save my-auto"></i>&nbsp;&nbsp;| Save
                                                </button>
                                                <button className='btn btn-dark h-100 w-49 font-weight-bold'
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.tempUser.isEditting = false;
                                                        let temp = this.state.user;
                                                        temp.isEditting = false;
                                                        this.setState({ user: temp });
                                                        this.onReset();
                                                    }}>
                                                    <i className="fa fa-times my-auto"></i>&nbsp;&nbsp;| Exit
                                                </button>
                                            </div>
                                            : <button className='btn btn-secondary h-100 w-100 font-weight-bold'
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.tempUser.isEditting = true;
                                                    let temp = this.state.user;
                                                    temp.isEditting = true;
                                                    this.setState({ user: temp });
                                                }}>
                                                <i className="fa fa-pencil-alt my-auto"></i>&nbsp;&nbsp;| Edit Profile !!!
                                            </button>
                                        }
                                    </div>
                                </div>


                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <div className={accountInfoBtn} id="home-tab" data-toggle="tab"
                                            role="tab" aria-controls="home" aria-selected="true"
                                            onClick={() => { if(this.state.tab !== 1) this.setState({ tab: 1, subTab: 4 }) }}
                                        >Account</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={contractInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { if(this.state.tab !== 2) this.setState({ tab: 2 }) }}
                                        >Contract</div>
                                    </li>                                    
                                </ul>
                            </div>

                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className={accountInfoClass} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-75' type='text' name='name' disabled={disableVal}
                                                ref='name'
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-75' type='email' name='email' disabled={disableVal}
                                                ref='email'
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Year of Birth</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-75' type='number' name='yob' min={1980} disabled={disableVal}
                                                ref='yob'
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="tel" required className='w-75' pattern="[0-9+]{10,11}" disabled={disableVal} name="phone"
                                                ref='phone'
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Gender</label>
                                        </div>
                                        <div className="col-9">
                                            <select name="gender" required className='w-75' disabled={disableVal}
                                                onChange={this.handleChange}
                                                ref='gender'>
                                                <option value={0}>Male</option>
                                                <option value={1}>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={contractInfoClass} id="history" role="tabpanel" aria-labelledby="profile-tab">
                                    <ContractList isTutor={false}></ContractList> 
                                </div>

                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
