import React, { Component } from 'react';
import { ls } from '../../Services/LearnerService';
import { ts } from '../../Services/TutorService';
import '../../Detail.css';

export default class LearnerProfile extends Component {
    constructor(props) {
        super(props);
        let id = JSON.parse(localStorage.getItem('user')).user.loginUser.id;
        this.state = {
            tab: 1,
            contracts: [],
            user: {
                id: 1,
                name: '',
                address: '',
                email: '',
                phone: '',
                gender: 0,                
                yob:null,
                avatarLink: '',
                isEditting: false,
            },
            totalPage: 0,
            page: 0,
        }
        
        this.initData(id);
        this.loadHistoryData(0);
    }

    initData(id) {
        ls.getLearnerDetail(id)
            .then(res => {
                console.log(res);
                this.setState({ user: res.info.data[0] });
                console.log(this.state);
            })
            .catch(error => {
                console.log(error);
            })
    }

    loadHistoryData(page) {        
        let option = {
            id: JSON.parse(localStorage.getItem('user')).user.loginUser.id,
            key: 0,
            page,
        }
        console.log('option');
        console.log(option);
        ts.getContracts(option)
        .then(res => {
            console.log(res);
            let total = Math.ceil(Number.parseInt(res.info.total) / 4);
            if(total === 0) total = 1;
            this.setState({
                contracts: res.info.data,
                totalPage: total,
            })
        })
        .catch(err => {
            console.log(err);
            alert('Sorry but our connection to server is not available now');
            //history.push('/');
        })
    }

    generateComments() {
        let content = [];
        let imgSrc = '';
        for(let e of this.state.contracts)
        {
            if (e.avatarLink === null || e.avatarLink === '') {
                imgSrc = `https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`;
            }
            else {
                imgSrc = e.avatarLink;
            }
            content.push(
                <div className="row p-4" key={e.id}>
                    <div className="col-2">
                        <img src={imgSrc} alt="learner avatar" className="w-100 m-1"></img>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className='col-6'><span className='text-primary font-weight-bold'>Name:</span> {e.learner}</div>
                            <div className='col-6'><span className='text-primary font-weight-bold'>Subject:</span> {e.major_name}</div>
                        </div>
                        <div>
                            <span className='text-primary font-weight-bold'>Evaluation:</span> {e.rating}/10 <i className="fa fa-star text-warning"></i>
                        </div>
                        <div className="row">
                            <div className='col-6'><span className='text-primary font-weight-bold'>Date start:</span> {e.StartDate}</div>
                            <div className='col-6'><span className='text-primary font-weight-bold'>Date end:</span> {e.EndDate}</div>
                        </div>
                        <div className="history-comment text-wrap">
                            <span className='text-primary font-weight-bold'>Comment: </span>
                            {e.feedback}
                        </div>
                    </div>
                </div>
            );
        }
        return content;        
    }

    render() {
        var accountInfoClass = "";
        var historyInfoClass = "";
        var accountInfoBtn = "";
        var historyInfoBtn = "";
        let ImgSrc = this.state.user.avatarLink;
        if (ImgSrc === null || ImgSrc === '') {
            ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
        }
        
        if (this.state.tab === 1) {
            accountInfoBtn = 'nav-link active cursor-pointer';
            accountInfoClass = 'tab-pane fade show active';
            historyInfoBtn = 'nav-link cursor-pointer';
            historyInfoClass = 'tab-pane fade';
        }
        else {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            historyInfoBtn = 'nav-link cursor-pointer  active';
            historyInfoClass = 'tab-pane fade show active';
        }

        return (
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        
                        <div className="col-md-4">
                            <div className="profile-img mb-5">
                                <img src={ImgSrc}
                                    alt="avatar-user" />
                                <input type="file" name="file" ref="imgInput" className="d-none" />
                                <div className="file btn btn-lg btn-primary cursor-pointer"
                                    onClick={() => { this.refs.imgInput.click() }}>
                                    Change Photo
                                </div>
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
                                            {this.state.user.email}
                                        </h6>
                                    </div>
                                    <div className='col-4'>
                                        <button className='btn btn-primary h-100 w-100 font-weight-bold'>
                                            <i className="fa fa-pencil-alt"></i>&nbsp;| Edit Profile !!!
                                        </button>
                                    </div>
                                </div>
                                

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <div className={accountInfoBtn} id="home-tab" data-toggle="tab"
                                            role="tab" aria-controls="home" aria-selected="true"
                                            onClick={() => { this.setState({ tab: 1 }) }}
                                        >Account</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={historyInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { this.setState({ tab: 2 }) }}
                                        >History</div>
                                    </li>
                                </ul>
                            </div>
                        
                            <div className="tab-content profile-tab" id="myTabContent">
                                
                                <div className={accountInfoClass} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Year of Birth</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.yob ? this.state.user.yob : 1980}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Gender</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.gender === 0 ? "Male" : "Female"}</p>
                                        </div>                                        
                                    </div>
                                </div>
                                
                                <div className={historyInfoClass} id="history" role="tabpanel" aria-labelledby="profile-tab">


                                    {/* user comment */}
                                    <div className="bg-light mx-auto mb-2">

                                    {this.generateComments()}
                                        
                                    </div>
                                    {/* pagination */}
                                    <nav className="w-75 mx-auto mb-4">
                                        <ul className="pagination justify-content-end">
                                            <li className="page-item" onClick={()=>this.onPagi(0)}>
                                                <a className="page-link cursor-pointer">&lt;&lt;</a>
                                            </li>
                                            <li className="page-item" onClick={()=>this.onPagi(this.state.page - 1)}>
                                                <a className="page-link cursor-pointer">&lt;</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link cursor-pointer">
                                                    {this.state.page + 1} / {this.state.totalPage}
                                                </a>
                                            </li>
                                            <li className="page-item" onClick={()=>this.onPagi(this.state.page + 1)}>
                                                <a className="page-link cursor-pointer">&gt;</a>
                                            </li>
                                            <li className="page-item" onClick={()=>this.onPagi(this.state.totalPage - 1)}>
                                                <a className="page-link cursor-pointer">&gt;&gt;</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                            </div>
                       
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
