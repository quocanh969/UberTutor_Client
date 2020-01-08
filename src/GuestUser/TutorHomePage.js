import React, { Component } from 'react'
import { ts } from '../Services/TutorService';
import { NavLink } from 'react-router-dom';
import { history } from '../Helpers/History';
import TutorMenu from '../Utilities/TutorMenu';

export default class TutorHomePage extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            learner: [],
            pendingContracts: [],
            totalPendingPage: 0,
            pendingPage: 0,
        }

        this.loadLearnerStudying();
        this.loadPendingData(0);
    }

    loadLearnerStudying() {
        ts.getLearnerStudying(JSON.parse(localStorage.getItem('user')).user.loginUser.id)
        .then(res=>{
            console.log(res);
            if(res.code === 1)
            {
                this.setState({learner: res.info.data});
            }
            else
            {
                console.log(res.info.message);
                alert('There was error when connect to the server');
            }
        })
        .catch(err=>{
            console.log(err);
            alert('There was error when connect to the server');
        })
    }
    
    loadPendingData(page) {
        let option = {
            id: JSON.parse(localStorage.getItem('user')).user.loginUser.id,
            key: 1,
            page,
        }
        ts.getPendingContracts(option)
            .then(res => {
                let total = Math.ceil(Number.parseInt(res.info.total) / 4);
                if (total === 0) total = 1;
                this.setState({
                    pendingContracts: res.info.data,
                    totalPendingPage: total,
                })
            })
            .catch(err => {
                console.log(err);
                alert('Sorry but our connection to server is not available now');
                history.push('/');
            })
    }

    generateLearnerList() {
        let content = [];
        let imgSrc = ''
        for(let e of this.state.learner)
        {
            if (e.avatarLink === null || e.avatarLink === '') {
                imgSrc = `https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`;
            }
            else {
                imgSrc = e.avatarLink;
            }
            content.push(
                <div>
                    <div className='row my-1'>
                        <div className='col-4'>
                            <img src={imgSrc} alt="tutor avatar" className="w-100 m-1"></img>
                        </div>
                        <div className='col-8'>
                            <div>{e.name}</div>
                            <small>{e.email}</small>
                            <div>{e.phone}</div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            );
        }
        return content;
    }

    generatePendingContracts() {
        let content = [];
        let imgSrc = '';
        for (let e of this.state.pendingContracts) {
            if (e.avatarLink === null || e.avatarLink === '') {
                imgSrc = `https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`;
            }
            else {
                imgSrc = e.avatarLink;
            }
            content.push(
                <div className="px-4 pb-4 pt-1" key={e.id}>
                    <div className='row'>
                        <div className='col-2'>
                            <img src={imgSrc} alt="learner avatar" className="w-100 m-1"></img>
                        </div>
                        <div className='col-10'>
                            <div className="row my-2">
                                <div className='col-3'>
                                    <span className='text-primary font-weight-bold'>Learner:</span>
                                </div>
                                <div className='col-9'>
                                    {e.learner}
                                </div>                                
                            </div>
                            <div className="row my-2">
                                <div className='col-3'>
                                    <span className='text-primary font-weight-bold'>Subject:</span>                            
                                </div>
                                <div className='col-9'>
                                    {e.major_name}
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className='col-6 row'>
                                    <span className='text-primary font-weight-bold col-6'>Date start:</span>
                                    <span className='col-6'>{e.StartDate}</span>
                                </div>
                                <div className='col-6 row'>
                                    <span className='text-primary font-weight-bold col-6'>Date end:</span>
                                    <span className='col-6'>{e.EndDate}</span>
                                </div>
                            </div>
                            <div className='text-right'>
                                <NavLink className='btn btn-success mx-2 font-weight-bold text-center cursor-pointer'
                                    to={`/replyContract/id=${e.id}&reply=${1}`}>
                                    Accept
                                </NavLink>
                                <NavLink className='btn btn-danger mx-2 font-weight-bold text-center cursor-pointer'
                                    to={`/replyContract/id=${e.id}&reply=${0}`}>
                                    Reject
                                </NavLink>
                                <NavLink className='btn btn-primary mx-2 font-weight-bold text-center cursor-pointer'
                                    to={`/contract-details/id=${e.id}`}>
                                    Detail
                                </NavLink>
                            </div>
                        </div>
                    </div>                    
                    <hr></hr>
                </div>
            );
        }
        return content;
    }

    render() {
        return (
            <div>
                <TutorMenu></TutorMenu>
                <div className='container my-5 py-5'>
                    <div className='row'>
                        <div className='col-8'>
                            <div className="card">
                                <div className="card-header">
                                    Pending Contracts
                                </div>
                                <div className="card-body">
                                    {this.generatePendingContracts()}
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="card">
                                <div className="card-header">
                                    Learner is studying now
                                </div>
                                <div className="card-body">
                                    {this.generateLearnerList()}
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {/* section apply for tutor */}
                    <section>
                        <div className="mx-auto w-100 mt-5 bg-white shadow-lg border-radius-20px">
                            <div className="row py-3">
                                <div className="col-8 px-5 py-2 text-right border-right border-secondary">
                                    <h3 className="d-inline">Go to your profile to update</h3>
                                    <br></br>
                                    <h2 className="d-inline font-weight-bold"><span className="text-primary">YOUR</span> INFORMATION</h2>
                                </div>
                                <div className="col-4 px-5 py-2 text-left border-left border-secondary">
                                    <NavLink to="/profile" className="btn btn-primary w-100 h-100 font-weight-bold pt-4">
                                        <i className="fa fa-cogs"></i>
                                        &nbsp;&nbsp;| GO UPDATE !!!
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end section apply for tutor */}
                </div>
            </div>
        )
    }
}
