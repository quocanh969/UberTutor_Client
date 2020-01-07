import React, { Component } from 'react';
import { history } from '../../Helpers/History';
import { storage } from '../../Helpers/Firebase';
import { as } from '../../Services/AreaService';
import { ts } from '../../Services/TutorService';
import { ls } from '../../Services/LearnerService';
import { skillSer } from '../../Services/SkillService';
import ReactTags from 'react-tag-autocomplete';
import maj from '../../Services/MajorService';
import { NavLink } from 'react-router-dom';
import ContractList from '../ContractList';

export default class TutorProfile extends Component {
    tempTutor = {
        gender: 0,
        levelTeaching: '',
        areaCode: 1,
        major: 0,
    };
    tempSkills;
    image = null;

    constructor(props) {
        super(props);
        let id = JSON.parse(localStorage.getItem('user')).user.loginUser.id;
        this.state = {
            tab: 1,
            areaList: [],
            majorList: [],
            skillList:  [],
            tutor: {
                id: 1,
                name: '',
                address: '',
                email: '',
                phone: '',
                gender: 0,                
                yob:null,
                avatarLink: '',
                isEditting: false,
                major: 0,                
                price: 0,
                levelTeaching: '',
                areaCode: 0,
                area: '',
                successRate: 0,
                introduction: '',
            },
            skills:[],
            
        }

        this.initData(id);        

        as.getAreaList()
        .then(data=>{
            this.setState({areaList: data});
        });

        maj.getList()
        .then(data=>{
            this.setState({majorList: data});
        });

        skillSer.getSkillList()
        .then(data=>{
            data = data.map(item=>{
                return {
                    name: item.skill_tag,
                    id: item.id_skill,
                }
            });
            this.setState({
                skillList: data,
            })
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);        
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
        this.refs.area.value = this.tempTutor.areaCode;
        this.refs.gender.value = this.tempTutor.gender;
        this.refs.major.value = this.tempTutor.major;
        this.refs.levelTeaching.value = this.tempTutor.levelTeaching;
    }

    initData(id) {
        ts.getTutorDetail(id)
        .then(res=>{
            console.log(res);
            let skill_list = [];
            if(res.info.skills.length > 0)
            {
                skill_list = res.info.skills.map(item=>{
                    return{
                        name: item.skill_tag,
                        id: item.id_skill,
                    }
                })
            }

            this.setState({
                tutor: res.info.data,    
                skills: skill_list,     
            });
            
            this.tempSkills = {...this.state.skills};
            console.log(this.tempSkills);
            this.onReset();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    generateTagSkillBox() {
        
        let content = [];
        if(!this.state.isEditting)
        {
            let index = 0;
            for(let e of this.state.skills)
            {
                content.push(
                    <span key={index}><span className="text-primary p-1"><u>{e.name}</u></span>,</span>
                );
                index++;
            }
        }        

        return (
            <div className="profile-work rounded w-75 mt-0 mx-auto text-wrap">
                <div className="text-center font-weight-bold">TAGs</div>
                <hr />
                {this.state.tutor.isEditting ?
                <ReactTags
                    tags={this.state.skills}
                    minQueryLength={1}    
                    autofocus={false}
                    placeholder='Add Skill Tag'           
                    suggestions={this.state.skillList}
                    tagComponent={SkillTag}
                    handleDelete={this.handleDelete.bind(this)}
                    handleAddition={this.handleAddition.bind(this)} />
                : content}
            </div>
        );
    }

    generateAreaSelector() {
        let content = [];
        for(let e of this.state.areaList)
        {
            content.push(
                <option value={e.id_area} key={e.id_area}>{e.area}</option>
            );
        }
        return content;
    }

    generateMajorSelector() {
        let content = [];
        for(let e of this.state.majorList)
        {
            content.push(
                <option value={e.id} key={e.id}>{e.name}</option>
            );
        }
        return content;
    }

    handleChange(e)
    {        
        console.log(e.target.value);
        this.tempTutor[e.target.name] = e.target.value;
    }

    handleDelete(i) {
        console.log('hello');
        const tags = this.state.skills;
        tags.splice(i, 1)
        this.setState({ skills: tags })
    }

    handleAddition(tag) {
        const tags = [].concat(this.state.skills, tag)
        this.setState({ skills: tags })
    }

    handleSubmit(e)
    {
        let isFailed = false;
        e.preventDefault();

        ls.updateLearnerDetail(this.tempTutor)
        .then(res=>{
            ts.updateTutorProfess(this.tempTutor)
            .then(res=>{
                ts.clearTutorSkill(this.state.tutor.id)
                .then(res=>{
                    for(let e of this.state.skills)
                    {
                        ts.updateTutorSkill(this.state.tutor.id,e.id)
                        .then(res=>{
                            console.log('success');
                        })
                        .catch(err=>{
                            console.log('err');
                        });   
                    }
                    this.tempTutor.isEditting = false;
                    this.setState({tutor: this.tempTutor});
                    this.tempSkills = {...this.state.skills};
                })
                .catch(err=>{
                    isFailed = true;
                    console.log(err);
                })                
            })
            .catch(err=>{
                isFailed = true;
                console.log(err);
            })
        })
        .catch(err=>{
            isFailed = true;
            console.log(err);
        });

    }

    handleChangeAvatar(e)
    {
        this.image = e.target.files[0];
        const uploadTask = storage.ref(`tutor-avatar/${this.state.tutor.id}-${this.state.tutor.name}/${this.image.name}`).put(this.image);

        uploadTask.on('state_changed',
        ()=>{},
        (error)=>{
            alert('Upload image to server host get error ...');
        },
        ()=>{ // hoàn thành việc upload
            storage.ref(`tutor-avatar/${this.state.tutor.id}-${this.state.tutor.name}`).child(this.image.name).getDownloadURL()
            .then(
                (url)=>{                                           
                    this.tempTutor.avatarLink = url;
                    this.setState({tutor: this.tempTutor});
                }
            )
        })
    }

    onReset()
    {        
        this.tempTutor = {...this.state.tutor};
        
        this.refs.name.value = this.state.tutor.name;
        this.refs.email.value = this.state.tutor.email;
        this.refs.phone.value = this.state.tutor.phone;
        this.refs.yob.value = Number.parseInt(this.state.tutor.yob);  
        
        this.refs.price.value = Number.parseInt(this.state.tutor.price);
        this.refs.introduction.value = this.state.tutor.introduction;

        this.refs.area.value = this.state.tutor.areaCode;
        this.refs.gender.value = this.state.tutor.gender;
        this.refs.major.value = this.state.tutor.major;
        this.refs.levelTeaching.value = this.state.tutor.levelTeaching;

    }

    render() {
        var accountInfoClass = "";        
        var accountInfoBtn = "";
        var contractInfoBtn = "";
        var contractInfoClass = '';
        var professionInfoClass = "";
        var professionInfoBtn = '';
        

        let ImgSrc = this.state.tutor.avatarLink;
        if (ImgSrc === null || ImgSrc === '') {
            ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
        }
        
        if (this.state.tab === 1) {
            accountInfoBtn = 'nav-link active cursor-pointer';
            accountInfoClass = 'tab-pane fade show active';
            contractInfoBtn = 'nav-link cursor-pointer';
            contractInfoClass = 'tab-pane fade';
            professionInfoBtn = 'nav-link cursor-pointer';
            professionInfoClass = 'tab-pane fade';
        }
        else if(this.state.tab === 3) {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            contractInfoBtn = 'nav-link cursor-pointer  active';
            contractInfoClass = 'tab-pane fade show active';
            professionInfoBtn = 'nav-link cursor-pointer';
            professionInfoClass = 'tab-pane fade';
        }
        else 
        {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            contractInfoBtn = 'nav-link cursor-pointer';
            contractInfoClass = 'tab-pane fade';
            professionInfoBtn = 'nav-link cursor-pointer  active';
            professionInfoClass = 'tab-pane fade show active';
        }

        
        let disableVal = true;
        if(this.state.tutor.isEditting) disableVal = false;
        else disableVal = true;

        return (
            <div className="container emp-profile">
                
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img mb-5">
                            <img src={ImgSrc}
                                alt="avatar-user" />
                            <input type="file" name="file" ref="imgInput" className="d-none" onChange={this.handleChangeAvatar}/>
                            {this.state.tutor.isEditting ?
                                <div className="file btn btn-lg btn-primary cursor-pointer"
                                    onClick={() => { this.refs.imgInput.click() }}>
                                    Change Photo
                                </div>
                            : ''
                            }
                            
                        </div>
                        {this.generateTagSkillBox()}
                    </div>
                        
                    <form ref='editProfileForm' className="col-md-8" onSubmit={this.handleSubmit}>
                        <div>
                            <div className="profile-head">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h5>
                                            {this.state.tutor.name.toUpperCase()}
                                        </h5>
                                        <h6 className="font-weight-bold">
                                            TUTOR
                                        </h6>
                                    </div>
                                    <div className='col-4'>
                                        {this.state.tutor.isEditting ? 
                                            <div className='d-flex justify-content-between'>
                                                <button className='btn btn-success h-100 w-49 font-weight-bold'
                                                        type='submit'>
                                                    <i className="fa fa-save my-auto"></i>&nbsp;&nbsp;| Save
                                                </button>
                                                <button className='btn btn-dark h-100 w-49 font-weight-bold'                                                        
                                                        onClick={e=>{   
                                                            e.preventDefault();      
                                                            this.tempTutor.isEditting = false;        
                                                            let temp = this.state.tutor;                                                             
                                                            temp.isEditting = false;                                                       
                                                            this.setState({tutor: temp});
                                                            this.onReset();
                                                        }}>
                                                    <i className="fa fa-times my-auto"></i>&nbsp;&nbsp;| Exit
                                                </button>
                                            </div>
                                        :   <button className='btn btn-secondary h-100 w-100 font-weight-bold' 
                                                    onClick={e=>{
                                                        e.preventDefault();
                                                        this.tempTutor.isEditting = true;
                                                        let temp = this.state.tutor;                         
                                                        temp.isEditting = true;
                                                        this.setState({tutor: temp});
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
                                            onClick={() => { if(this.state.tab !== 1) this.setState({ tab: 1}) }}
                                        >Account</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={professionInfoBtn} id="home-tab" data-toggle="tab"
                                            role="tab" aria-controls="home" aria-selected="true"
                                            onClick={() => { this.setState({ tab: 2 }) }}
                                        >Profession</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={contractInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { this.setState({ tab: 3 }) }}
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
                                                    onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-75' type='email' name='email' disabled={disableVal} 
                                                    ref='email'
                                                    onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Year of Birth</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-75' type='number' name='yob' min={1980} disabled={disableVal} 
                                                    ref='yob'
                                                    onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="tel" required className='w-75' pattern="[0-9+]{10,11}" disabled={disableVal} name="phone" 
                                                    ref='phone'
                                                    onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Gender</label>
                                        </div>
                                        <div className="col-9">
                                            <select name="gender" required className='w-75' disabled={disableVal}
                                                    onChange={this.handleChange} value={this.tempTutor.gender}
                                                    ref='gender'>
                                                <option value={0}>Male</option>
                                                <option value={1}>Female</option>
                                            </select>
                                        </div>                                        
                                    </div>
                                </div>
                                
                                <div className={professionInfoClass} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Major</label>
                                        </div>
                                        <div className="col-9">  
                                            <select name="major" required className='w-75' disabled={disableVal}
                                                    onChange={this.handleChange}
                                                    ref='major'>
                                                {this.generateMajorSelector()}
                                            </select>                                       
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Price</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-25' type='number' min={0} name='price' disabled={disableVal} 
                                                    ref='price'
                                                    onChange={this.handleChange}/>&nbsp;&nbsp;$/hr
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Level Teaching</label>
                                        </div>
                                        <div className="col-9">
                                            <select className="w-75" disabled={disableVal} required
                                                    ref='levelTeaching'
                                                    name='levelTeaching' onChange={this.handleChange}>
                                                <option value='0'>Elementary</option>
                                                <option value='1'>Intermediate</option>
                                                <option value='2'>Upper-Intermediate</option>
                                                <option value='3'>Advanced</option>
                                                <option value='4'>Undergraduate</option>
                                                <option value='5'>Graduate</option>
                                            </select>                                            
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Area</label>
                                        </div>
                                        <div className="col-9">                                            
                                            <select name="areaCode" required className='w-75' disabled={disableVal}
                                                    onChange={this.handleChange}
                                                    ref='area'>
                                                {this.generateAreaSelector()}
                                            </select>
                                                    
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col-3">
                                            <label>Success Rate</label>
                                        </div>
                                        <div className="col-9">
                                            <p className='w-75'>{this.state.tutor.successRate}&nbsp;%</p>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-3">
                                            <label>Introduction</label>
                                        </div>
                                        <div className="col-9">
                                            <input required className='w-75' type='text' name='introduction' disabled={disableVal} 
                                                    ref='introduction'
                                                    onChange={this.handleChange}/>
                                        </div>                                        
                                    </div>
                                </div>

                                <div className={contractInfoClass} id="history" role="tabpanel" aria-labelledby="profile-tab">
                                    <ContractList isTutor={true} ></ContractList>
                                </div>

                            </div>
                       
                        </div>
                    </form>
                </div>                
            </div>
        )
    }
}

class SkillTag extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (            
            <div className='rounded-pill bg-secondary tag-pill my-1 d-flex justify-content-between'>                
                <span>{this.props.tag.name}</span>
                <button onClick={this.props.onDelete} className='rounded-circle border-0 bg-dark'>
                    <i className="fa fa-times"></i>
                </button>
            </div>            
        )
    }
}
