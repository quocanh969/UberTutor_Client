import React, { Component } from 'react'

import maj from '../Services/MajorService';
import {as} from '../Services/AreaService';
import Menu from '../Utilities/Menu';
import TutorList from './Sections/Tutor';
import { NavLink } from 'react-router-dom';

export default class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            majorList: [],
            areaList: [],
        }

        maj.getTop().then(data => {
            this.setState({ majorList: data });
        })

        as.getAreaList()
        .then(data=>{
            this.setState({areaList: data});
        })
    }

    componentDidMount()
    {
        window.scrollTo(0, 0);
    }

    GenerateMajorCards = () => {
        let content = [];
        for (let i of this.state.majorList) {
            content.push(
                <div className="col-4 my-4" key={i.id}>
                    <NavLink className="card card-size border-0 m-auto cursor-pointer" to={`/tutor-list/subject=${i.name}`}>
                        <img src={i.icoUrl} height={300} width={300} className="card-img-top" />
                        <div className="card-body bg-light">
                            <div className="btn btn-light">{i.name}</div>
                        </div>
                    </NavLink>
                </div>
            )
        }
        return content;
    }

    render() {
        return (
            <div>
                
                {/* Website Intro */}
                <div id="carouselExampleCaptions" className="carousel slide container-fluid mx-0 px-0" data-ride="carousel">
                    {/*Carousel*/}
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://e2.com.vn/wp-content/uploads/2019/08/group-class-recolor.jpg" className="d-block m-auto" alt="public\logo512.png"
                                    />
                            <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto">
                                <h3 className='font-weight-bold'>UBER TUTOR</h3>
                                <p className='mb-0 pb-1 text-white'>Connect to those good tutors out there right now at our site</p>
                                <NavLink className='mt-0 pt-0 h4 text-white' to='/login'>JOIN US TODAY</NavLink>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://s3-eu-west-1.amazonaws.com/resources.firsttutors.com/1/ecd1886fad9f0b06a5e35dd1344fe3f3.jpg" className="d-block m-auto" alt="public\logo512.png" />
                            <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto">
                                <h3 className='font-weight-bold'>UBER TUTOR</h3>
                                <p className='mb-0 pb-1 text-white'>Our tutors have different skills to meet your needs</p>
                                <NavLink className='mt-0 pt-0 h4 text-white' to='/subjects'>FIND OUT WHAT YOU NEED</NavLink>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src='http://www.iadtvegas.com/wp-content/uploads/2019/04/online-700x500.png' className="d-block m-auto" alt="public\logo512.png" />
                            <div className="carousel-caption d-none d-md-block bg-dark w-50 mx-auto">
                                <h3 className='font-weight-bold'>UBER TUTOR</h3>
                                <p className='mb-0 pb-1 text-white'>Matching with a suitable tutor with just one click</p>
                                <NavLink className='mt-0 pt-0 h4 text-white' to='/tutor-list'>FIND A TUTOR NOW</NavLink>
                            </div>
                        </div>
                    </div>

                        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>

                        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>

                    </div>
                {/* end of Website Intro */}

                {/* section subject list */}
                <section className="mb-5 ">
                    <h1 className="mt-4 text-center text-white">OUR SUBJECTS</h1>
                    <div className="container">                    
                        <div className="pl-4 mb-0 pb-1 text-white font-weight-bold">
                            Find your major or subject ...
                        </div>
                        <div className="row pb-4 mt-0 pt-0 justify-items-center text-center"> 
                            {this.GenerateMajorCards()}
                        </div>
                    </div>
                </section>
                {/* end section subject list */}

                {/* section tutor list */}
                <section className="mb-5 ">
                    <h1 className="text-center text-white mb-4">OUR TUTORS</h1>
                    <div className="bg-light w-75 px-5 mx-auto border-radius-20px">
                        <TutorList></TutorList>
                    </div>                
                </section>
                {/* end section tutor list */}

                {/* section apply for tutor */}
                <section>
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
            </div>
        )
    }
}
