import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../Helpers/History';
import { cs } from '../../Services/ContractService';

export default class SecondaryNavBar extends Component {

    constructor()
    {
        super();
        cs.dueContract()
        .then()
        .catch(err=>{
            console.log(err);
            alert('there was problem in connecting to server');
        })
    }



    generateUser()
    {
        let user =  JSON.parse(localStorage.getItem('user'));
        console.log("hello"); 
        if(!user || user.user === null || user.user === false)
        {
            return(
                <div className="btn-group pr-5">
                    <NavLink to="/login" className="btn btn-outline-light border-width-2px font-weight-bold">
                        <i className="fa fa-user mr-2"></i>LOG IN
                    </NavLink> 
                    <NavLink to="/register" className="btn btn-outline-light border-width-2px font-weight-bold">
                        <i className="fa fa-key mr-2"></i>REGISTER
                    </NavLink>                                            
                </div>
            );
        }
        else
        {
            let ImgSrc = user.user.loginUser.avatarLink;
            if(ImgSrc === "" || ImgSrc === null)
            {
                ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
            }
            return(
                <div className="btn-group pr-2 d-flex justify-content-around">
                    
                    {/* Messages */}
                    <div className="nav-item dropdown no-arrow mx-2">
                        <button className="pt-1 hide-down-arrow-dropdown dropdown-toggle background-transparent border-0"
                                id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-envelope fa-fw text-white font-size-20px" />
                            {/* Counter - Messages */}
                            {/*<span className="badge badge-danger badge-counter">7</span>*/}
                        </button>
                        {/* Dropdown - Messages */}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                                Message Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src={this.imageSrc} alt="" />
                                    <div className="status-indicator bg-success" />
                                </div>
                                <div className="font-weight-bold">
                                    <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                                </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                        </div>
                    </div>
                    
                    {/* Alerts */}
                    <div className="nav-item dropdown no-arrow mx-2">
                        <button className="pt-1 hide-down-arrow-dropdown dropdown-toggle background-transparent border-0"
                            id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-bell fa-fw text-white font-size-20px"/>
                            {/* Counter - Alerts */}
                            {/*<span className="badge badge-danger badge-counter">3+</span>*/}
                        </button>
                        {/* Dropdown - Alerts */}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                                Alerts Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-primary">
                                        <i className="fas fa-file-alt text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                        </div>
                    </div>
                    

                    {/*Avatar user */}
                    <div className="mx-2">
                        <button type="button" className="hide-down-arrow-dropdown dropdown-toggle background-transparent border-0" data-toggle="dropdown">
                            <img src={ImgSrc} width={30} height={30}></img>
                        </button>                    
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item label px-2 text-black cursor-pointer" onClick={() => {history.push('/profile');}}>
                                <i className="fa fa-info-circle mr-2"></i>Your Account
                            </div>
                            <div className="dropdown-item label px-2 text-black cursor-pointer" onClick={() => {history.push('/change-password');}}>
                                <i className="fa fa-file-signature mr-2"></i>Change Password
                            </div>
                            <hr className="my-0 mx-1"/>
                            <div className="dropdown-item label px-2 text-black cursor-pointer" onClick={() => {localStorage.clear();window.location.href = './';}}>
                                <i className="fa fa-sign-out-alt mr-2"></i>Sign Out
                            </div>
                        </div>
                        <span className='text-white font-weight-bold'>&nbsp;&nbsp;AS {JSON.parse(localStorage.getItem('user')).user.loginUser.role === 0 ? 'LEARNER' : 'TUTOR'}</span>
                    </div>                    
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand font-weight-bold pl-5" href="/">UBER TUTOR</a>
                    {/* <div className="text-right">
                        <a className="navbar-brand" href="/">UBER TUTOR</a>
                        <a className="navbar-brand" href="/">UBER TUTOR</a>
                        <a className="navbar-brand" href="/">UBER TUTOR</a>
                    </div> */}
                    <div className="form-inline w-50 text-center">
                        <div className="input-group w-100">                            
                            <input type="text" className="form-control" ref='tutorName' placeholder="Find tutor ..."/>
                            <div className="input-group-append width-size-75px">
                                <button className="btn btn-primary w-100" type="button" onClick={e=>{e.preventDefault();window.location.href = `/tutor-list/name=${this.refs.tutorName.value}`}}>
                                    <i className="fa fa-search text-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {this.generateUser()}
                    
                </nav>
            </div>
        )
    }
}
