import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { history } from '../../Helpers/History';
import { cs } from '../../Services/ContractService';
import Menu from '../Menu';
import TutorMenu from '../TutorMenu';
import { ls } from '../../Services/LearnerService';

export default class SecondaryNavBar extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            user: {
                id: -1,
                name: '',
                address: '',
                email: '',
                phone: '',
                role: 0,
                gender: 0,
                yob: null,
                avatarLink: '',
            },
        }

        cs.dueContract()
        .then()
        .catch(err=>{
            console.log(err);
            alert('there was problem in connecting to server');
        });

        
    }

    componentDidMount() {
        if(JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).user !== false)
        {
            ls.getLearnerDetail(JSON.parse(localStorage.getItem('user')).user.loginUser.id)
            .then(res=>{
                if(res.code === 1)
                {
                    this.setState({user: res.info.data[0]});
                }
                else
                {
                    this.setState({user: {
                        id: -1,
                        name: '',
                        address: '',
                        email: '',
                        phone: '',
                        role: 0,
                        gender: 0,
                        yob: null,
                        avatarLink: '',
                    },});
                }
            })
            .catch(err=>{
                this.setState({user: {
                    id: -1,
                    name: '',
                    address: '',
                    email: '',
                    phone: '',
                    role: 0,
                    gender: 0,
                    yob: null,
                    avatarLink: '',
                },});
            })
        }
        else
        {
            this.setState({user: {
                id: -1,
                name: '',
                address: '',
                email: '',
                phone: '',
                role: 0,
                gender: 0,
                yob: null,
                avatarLink: '',
            },});
        }
    }

    componentWillReceiveProps() {
        let user = JSON.parse(localStorage.getItem('user'));
        if(user !== null && user.user !== false && user.user !== undefined)
        {
            ls.getLearnerDetail(JSON.parse(localStorage.getItem('user')).user.loginUser.id)
            .then(res=>{
                if(res.code === 1)
                {
                    this.setState({user: res.info.data[0]});
                }
                else
                {
                    this.setState({user: {
                        id: -1,
                        name: '',
                        address: '',
                        email: '',
                        phone: '',
                        role: 0,
                        gender: 0,
                        yob: null,
                        avatarLink: '',
                    },});
                }
            })
            .catch(err=>{
                this.setState({user: {
                    id: -1,
                    name: '',
                    address: '',
                    email: '',
                    phone: '',
                    role: 0,
                    gender: 0,
                    yob: null,
                    avatarLink: '',
                },});
            })
        }
        else
        {
            this.setState({user: {
                id: -1,
                name: '',
                address: '',
                email: '',
                phone: '',
                role: 0,
                gender: 0,
                yob: null,
                avatarLink: '',
            },});
        }
        
    }

    generateUser()
    {
        if(this.state.user.id === -1)
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
            let ImgSrc = this.state.user.avatarLink;
            console.log(this.state.user);
            if(ImgSrc === '' || ImgSrc === null || ImgSrc === undefined)
            {
                ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
            }
            return(
                <div className="btn-group pr-2 d-flex justify-content-around">
                    
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
                        <span className='text-white font-weight-bold'>&nbsp;&nbsp;AS {this.state.user.role === 0 ? 'LEARNER' : 'TUTOR'}</span>
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
                
                <div style={{paddingTop:57}}>
                    {this.state.user.role === 0
                    ?
                    <Menu></Menu>
                    :
                    <TutorMenu></TutorMenu>
                    }
                </div>
            </div>
        )
    }
}
