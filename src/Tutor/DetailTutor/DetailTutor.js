import React, { Component } from 'react';
import '../../Detail.css';
import { ts } from '../../Services/TutorService';
import { history } from '../../Helpers/History';
import Popup from "reactjs-popup";
import Contract from '../../Contract/ContractPopup/Contract';

export default class DetailTutor extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;        

        this.state = {
            tab: 1,
            page: 0,
            totalPage: 0,
            contracts: [],
            tutor: {
                id: 0,
                name: '',
                role: 1,
                address: '',
                email: "",
                phone: "",
                gender: 0,
                yob: null,
                avatarLink: null,
                price: 0,
                levelTeaching: "0",
                major: 0,
                major_name:'',
                evaluation: 0,
                areaCode: 0,
                area: "",
            },
            skills: [],
        }

        console.log(id);
        this.loadHistoryData(0);
        this.initData(id);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    initData(id) {
        ts.getTutorDetail(id)
        .then(res => {
            this.setState({
                tutor: res.info.data,
                skills: res.info.skills,
            })
        })
        .catch(err => {
            console.log(err);
            alert('Sorry but this tutor is not exist');
            //history.push('/');
        })
    }

    loadHistoryData(page) {        
        let option = {
            id: Number.parseInt(this.props.match.params.id),
            key: 1,
            page,
        }
        ts.getContracts(option)
        .then(res => {
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

    generateTagSkillBox() {
        
        let content = [];
        for(let e of this.state.skills)
        {
            content.push(
                <span key={e.skill_code}><span className="text-primary p-1"><u>{e.skill_tag}</u></span>,</span>
            );
        }

        return (
            <div className="profile-work rounded w-75 mt-0 mx-auto text-wrap">
                <div className="text-center font-weight-bold">TAGs</div>
                <hr />
                {content}
            </div>
        );
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
                <div className="row p-4">
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

    onPagi(pageNavigate) {
        if(pageNavigate !== this.state.page && pageNavigate >= 0 && pageNavigate < this.state.totalPage)
        {
            this.setState({
                page: pageNavigate,
            })

            this.loadHistoryData(pageNavigate);
        }
    }

    render() {
        var accountInfoClass = "";
        var proInfoClass = "";
        var historyInfoClass = '';
        var accountInfoBtn = "";
        var proInfoBtn = "";
        var historyInfoBtn = '';
        let ImgSrc = '';        
        if (this.state.tutor.avatarLink === null || this.state.tutor.avatarLink === '') {
            ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
        }
        else
        {
            ImgSrc = this.state.tutor.avatarLink;
        }


        if (this.state.tab === 1) {
            accountInfoBtn = 'nav-link active cursor-pointer';
            accountInfoClass = 'tab-pane fade show active';
            proInfoBtn = 'nav-link cursor-pointer';
            proInfoClass = 'tab-pane fade';
            historyInfoBtn = 'nav-link cursor-pointer';
            historyInfoClass = 'tab-pane fade';
        }
        else if (this.state.tab === 2) {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            proInfoBtn = 'nav-link cursor-pointer  active';
            proInfoClass = 'tab-pane fade show active';
            historyInfoBtn = 'nav-link cursor-pointer';
            historyInfoClass = 'tab-pane fade';
        }
        else {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            proInfoBtn = 'nav-link cursor-pointer';
            proInfoClass = 'tab-pane fade';
            historyInfoBtn = 'nav-link cursor-pointer active';
            historyInfoClass = 'tab-pane fade show active';
        }

        return (
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-4">
                            <div className="profile-img mb-5">
                                <img src={ImgSrc}
                                    alt="avatar-user" />
                                <input type="file" name="file" ref="imgInput" className="d-none" />
                            </div>
                            {this.generateTagSkillBox()}
                        </div>

                        <div className="col-8">
                            <div className="profile-head">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h5>
                                            {this.state.tutor.name.toUpperCase()}
                                        </h5>
                                        <h6 className="font-weight-bold">
                                            {this.state.tutor.levelTeaching.toUpperCase()}
                                        </h6>
                                    </div>
                                    <div className='col-4'>
                                    <Popup trigger={
                                        <div className='btn btn-primary py-auto w-100 font-weight-bold cursor-pointer'>
                                            <i className="fa fa-sign-in-alt"></i>&nbsp;| Enroll !!!
                                        </div>} 
                                        modal>
                                        {close => (
                                            <Contract tutorName={this.state.tutor.name} 
                                                    learnerName={JSON.parse(localStorage.getItem('user')).user.loginUser.name}
                                                    idTutor={this.state.tutor.id} 
                                                    email={this.state.tutor.email}
                                                    idLearner={JSON.parse(localStorage.getItem('user')).user.loginUser.id} 
                                                    major={this.state.tutor.major_name} 
                                                    majorCode={this.state.tutor.major}                                                    
                                                    price={this.state.tutor.price}
                                                    onClose={close}>
                                        </Contract>
                                        )}
                                    </Popup>

                                        
                                    </div>
                                </div>                                

                                <p className="proile-rating">EVALUATION : <span>{this.state.tutor.evaluation}/10</span>&nbsp;<i className="fa fa-star text-warning"></i></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <div className={accountInfoBtn} id="home-tab" data-toggle="tab"
                                            role="tab" aria-controls="home" aria-selected="true"
                                            onClick={() => { this.setState({ tab: 1 }) }}
                                        >Account</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={proInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { this.setState({ tab: 2 }) }}
                                        >Profession</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={historyInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { this.setState({ tab: 3 }) }}
                                        >History</div>
                                    </li>
                                </ul>
                            </div>


                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className={accountInfoClass} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Tutor Id</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Gender</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.gender === 0 ? "Male" : "Female"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={proInfoClass} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Major</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.major}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-9">
                                            <p>$ {this.state.tutor.price}/h</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Area</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.area}</p>
                                        </div>
                                    </div>                                    
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Introduction</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.tutor.introduction}</p>
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
