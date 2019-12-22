import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ts } from '../../Services/TutorService';

export default class TutorList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSuccess: false,
            tutorList: [],
            areaList: [],
            priceList: [],
            subjectList: [],
            areaASC: null,
            priceASC: null,
            subjectASC: null,
            areaFilter: '',
            priceFilter: 0,
            subjectFilter: '',
            searchStr: '',
            totalPage: 0,
            page: 0,
        }

        let option = {
            area: '',
            price: 0,
            major: '',
            name: '',
            page: 0,
        };
        
        this.loadAreaData();
        this.loadSubjectData();
        this.loadTutorsCount();
        this.loadData(option);        
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    loadAreaData() {
        ts.getAreaList()
        .then(res => {
            this.setState({
                areaList: res,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    loadSubjectData() {
        ts.getMajorList()
        .then(res => {
            this.setState({
                subjectList: res,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    loadTutorsCount() {
        ts.getTutorsCount()
        .then(res => {            
            this.setState({
                totalPage: Math.round(Number.parseInt(res.info.data[0].count) / 5) + 1,
            })
        })
    }

    loadData(option) {
        ts.getTutorList(option)
            .then(res => {
                this.setState({
                    isSuccess: true,
                    tutorList: res.info.data,
                })
            })
            .catch(err => {
                this.setState({
                    isSuccess: false,
                    tutorList: [],
                })
            });
    }

    generateAreaSelect() {
        let content = [];
        for(let e of this.state.areaList)
        {
            content.push(
                <option value={e.area} key={e.id_area}>{e.area}</option>
            );
        }
        return content;
    }

    generateSubjectSelect() {
        let content = [];
        for(let e of this.state.subjectList)
        {
            content.push(
                <option value={e.name} key={e.id}>{e.name}</option>
            );
        }
        return content;
    }

    generateTutorList() {
        let content = [];
        if (this.state.isSuccess) {
            let imgSrc = '';
            for (let e of this.state.tutorList) {
                if (e.avatarLink || e.avatarLink === null || e.avatarLink === '') {
                    imgSrc = `https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`;
                }
                else {
                    imgSrc = e.avatarLink;
                }
                content.push(
                    <div className="row p-4" key={e.id}>
                        <div className="col-2">
                            <img src={imgSrc} alt="tutor avatar" className="w-100 m-1"></img>
                        </div>
                        <div className="col-6">
                            <div className='row'>
                                <span className='col-2 text-primary'>Name:</span>
                                <span className='col-10'>&nbsp;{e.name}</span>
                            </div>
                            <div className='row'>
                                <span className='col-2 text-primary'>Subject:</span>
                                <span className='col-10'>&nbsp;{e.major_name}</span>
                            </div>
                            <div className='row'>
                                <span className='col-2 text-primary'>Area:</span>
                                <span className='col-10'>&nbsp;{e.area}</span>
                            </div>
                            <div className='row'>
                                <span className='col-2 text-primary'>Email:</span>
                                <span className='col-10'>&nbsp;{e.email}</span>
                            </div>
                            <div className='row'>
                                <span className='col-2 text-primary'>Phone:</span>
                                <span className='col-10'>&nbsp;{e.phone}</span>
                            </div>
                            <div className='row'>
                                <span className='col-2 text-primary'>Tag:</span>
                                <div className='text-wrap word-wrap-break col-10'>
                                    {this.generateTagSkill(e.skills)}
                                </div>
                            </div>
                            <div className='pl-5 mt-4'>
                                <NavLink className='btn btn-secondary cursor-pointer' to='/detail-tutor/id=1'>See more</NavLink>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className='row'>
                                <span className='col-3 text-primary'>Evaluation:</span>
                                <span className='col-9'>&nbsp;{e.evaluation}/10 <i className="fa fa-star text-warning"></i></span>
                            </div>
                            <div className='row'>
                                <span className='col-3 text-primary'>Price:</span>
                                <span className='col-9'>&nbsp;$ {e.price}/h</span>
                            </div>
                            <button className='btn btn-primary w-100 mt-5'>Enroll</button>
                        </div>
                    </div>
                );
            }

            return content;
        }
        else {
            return (
                <div>There was a problem on connecting to the server. Please try again later.</div>
            );
        }
    }

    generateTagSkill(list) {
        let content = [];
        for (let e of list) {
            content.push(
                <span className="text-primary p-1" key={e.id_skill}><u>{e.skill_tag}</u></span>,
            );
        }
        return content;
    }

    onPagi(pageNavigate) {
        console.log(this.state);
        if(pageNavigate !== this.state.page && pageNavigate >= 0 && pageNavigate < this.state.totalPage)
        {
            this.setState({
                page: pageNavigate,
            })
            let option = {
                area: this.state.areaFilter,
                price: this.state.priceFilter,
                major: this.state.subjectFilter,
                name: this.state.searchStr,
                page: pageNavigate,
            };
    
            this.loadData(option);
        }
    }
    
    onAreaFilterChange(e)
    {
        this.setState({
            areaFilter: e.target.value,
        })
    }

    onPriceFilterChange(e)
    {
        this.setState({
            priceFilter: Number.parseInt(e.target.value),
        })
    }

    onSubjectFilterChange(e)
    {
        this.setState({
            subjectFilter: e.target.value,
        })
    }

    onSearchChange(e) {
        this.setState({
            searchStr: e.target.value,
        })
    }

    onFilterClick()
    {
        let option = {
            area: this.state.areaFilter,
            price: this.state.priceFilter,
            major: this.state.subjectFilter,
            name: this.state.searchStr,
            page: 0,
        };

        this.loadData(option);
    }

    onAreaSort(event, sortKey, isASC) {        
        const data = this.state.tutorList;

        if(isASC === false)
        { // Sắp tăng dần
            data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))                            
            this.setState({
                areaASC: true,
                tutorList: data,
            })
        }
        else
        {
            data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))                            
            this.setState({
                areaASC: false,
                tutorList: data,
            })
        }
        
    }

    onPriceSort(event, sortKey, isASC) {        
        const data = this.state.tutorList;

        if(isASC === false)
        { // Sắp tăng dần
            data.sort((a,b) => a[sortKey] - b[sortKey])                            
            this.setState({
                priceASC: true,
                tutorList: data,
            })
        }
        else
        {
            data.sort((a,b) => b[sortKey] - a[sortKey])                            
            this.setState({
                priceASC: false,
                tutorList: data,
            })
        }
        
    }

    onSubjectSort(event, sortKey, isASC) {        
        const data = this.state.tutorList;

        if(isASC === false)
        { // Sắp tăng dần
            data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))                            
            this.setState({
                subjectASC: true,
                tutorList: data,
            })
        }
        else
        {
            data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))                            
            this.setState({
                subjectASC: false,
                tutorList: data,
            })
        }
        
    }

    generateAreaSortButton() {
        if (this.state.areaASC === null) {
            return (
                <span className="bg-light py-3 px-5 font-weight-bold cursor-pointer" 
                        onClick={e => this.onAreaSort(e, 'area', false)}>
                    Area &uarr;
                </span>
            );
        }
        else if (this.state.areaASC) {
            return (
                <span className="py-3 px-5 font-weight-bold cursor-pointer bg-success text-white"
                        onClick={e => this.onAreaSort(e, 'area', true)}>
                    Area &uarr;
                </span>
            );
        }
        else {
            return (
                <span className="py-3 px-5 font-weight-bold cursor-pointer bg-danger text-white" 
                        onClick={e => this.onAreaSort(e, 'area', false)}>
                    Area &darr;
                </span>
            );
        }
    }

    generatePriceSortButton() {
        if (this.state.priceASC === null) {
            return (
                <span className="bg-light py-3 px-5 font-weight-bold cursor-pointer" 
                        onClick={e => this.onPriceSort(e, 'price', false)}>
                    Price &uarr;
                </span>
            );
        }
        else if (this.state.priceASC) {
            return (
                <span className="py-3 px-5 font-weight-bold cursor-pointer bg-success text-white"
                        onClick={e => this.onPriceSort(e, 'price', true)}>
                    Price &uarr;
                </span>
            );
        }
        else {
            return (
                <span className="py-3 px-5 font-weight-bold cursor-pointer bg-danger text-white" 
                        onClick={e => this.onPriceSort(e, 'price', false)}>
                    Price &darr;
                </span>
            );
        }
    }

    generateSubjectSortButton() {
        if (this.state.subjectASC === null) {
            return (
                <span className="bg-light py-3 px-5 font-weight-bold cursor-pointer" 
                        onClick={e => this.onSubjectSort(e, 'major_name', false)}>
                    Subject &uarr;
                </span>
            );
        }
        else if (this.state.subjectASC) {
            return (
                <span className="py-3 px-5 font-weight-bold cursor-pointer bg-success text-white"
                        onClick={e => this.onSubjectSort(e, 'major_name', true)}>
                    Subject &uarr;
                </span>
            );
        }
        else {
            return (
                <span className="py-3 px-5 font-weight-bold cursor-pointer bg-danger text-white" 
                        onClick={e => this.onSubjectSort(e, 'major_name', false)}>
                    Subject &darr;
                </span>
            );
        }
    }

    onReset() {
        this.setState({
            isSuccess: false,
            tutorList: [],
            areaList: [],
            priceList: [],
            subjectList: [],
            areaASC: null,
            priceASC: null,
            subjectASC: null,
            areaFilter: '',
            priceFilter: 0,
            subjectFilter: '',
            searchStr: '',
        });

        let option = {
            area: '',
            price: 0,
            major: '',
            name: '',
            page: 0,
        };

        this.loadData(option);
    }

    render() {
        return (
            <div>
                <section className="my-5">
                    <h1 className="text-center text-white mb-4 pt-4">TUTOR LIST</h1>

                    {/* Filter */}
                    <div className="w-75 mx-auto mb-4">
                        <div className="row">
                            <div className="col-2 px-1">
                                <select className="custom-select" id="inputGroupSelect01" defaultValue='0'
                                        onChange={e=>this.onAreaFilterChange(e)}>
                                    <option value='0'>Choose area ...</option>
                                    {this.generateAreaSelect()}
                                </select>
                            </div>
                            <div className="col-2 px-1">
                                <select className="custom-select" id="inputGroupSelect02" defaultValue='0'
                                        onChange={e=>this.onPriceFilterChange(e)}>
                                    <option value='0'>Choose price ...</option>
                                    <option value='20000'>&lt; $ 20000</option>
                                    <option value='40000'>&lt; $ 40000</option>
                                    <option value='60000'>&lt; $ 60000</option>
                                </select>
                            </div>
                            <div className="col-2 px-1">
                                <select className="custom-select" id="inputGroupSelect03" defaultValue='0'
                                        onChange={e=>this.onSubjectFilterChange(e)}>
                                    <option value='0'>Choose subject ...</option>
                                    {this.generateSubjectSelect()}
                                </select>
                            </div>
                            <div className="col-3 px-1">
                                <div className="form-inline w-100 text-center">
                                    <div className="input-group w-100">
                                        <input type="text" className="form-control" placeholder="Find tutor ..." 
                                            onChange={e=>this.onSearchChange(e)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='col-1'>
                                <button className="btn btn-danger w-100" type="button" onClick={()=>{this.onReset()}}>
                                    <i className="fa fa-redo text-white"></i>
                                </button>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-primary w-100" type="button" onClick={()=>{this.onFilterClick()}}>
                                    <i className="fa fa-search text-white"></i>&nbsp;&nbsp;| Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* End filter */}

                    {/* Sorter */}
                    <div className="w-75 mx-auto text-right pt-4 mb-15">

                        {this.generateAreaSortButton()}

                        {this.generatePriceSortButton()}

                        {this.generateSubjectSortButton()}
                        
                    </div>
                    {/* End sorter */}
                    {/* Tutor data */}
                    <div className="bg-light w-75 mx-auto mb-2">

                        {this.generateTutorList()}

                    </div>
                    {/* End tutor data */}

                    {/* Pagination */}
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
                    {/* End pagination */}

                    {/* section apply for tutor */}
                    <section className="my-4 pt-4">
                        <div className="mx-auto w-75 bg-white shadow-lg border-radius-20px">
                            <div className="row">
                                <div className="col-8 p-5">
                                    <h3 className="d-inline">Join our system to be come a </h3>
                                    <h2 className="d-inline font-weight-bold"><span className="text-primary">UBER</span> TUTOR</h2>
                                </div>
                                <div className="col-4 py-5">
                                    <NavLink to="/tutorRegister" className="btn btn-primary w-75">
                                        <i className="fa fa-chalkboard-teacher"></i>
                                        &nbsp;&nbsp;| JOIN !!!
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end section apply for tutor */}
                </section>
            </div>
        )
    }
}
