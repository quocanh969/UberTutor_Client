import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class TutorList extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <section className="my-5">
                    <h1 className="text-center text-white mb-4 pt-4">TUTOR LIST</h1>

                    {/* Filter */}
                    <div className="w-75 mx-auto mb-4">
                        <div className="row">
                            <div className="col-3 px-3">
                                <select className="custom-select" id="inputGroupSelect01">
                                    <option selected>Choose area ...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-3 px-3">
                                <select className="custom-select" id="inputGroupSelect02">
                                    <option selected>Choose price ...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-3 px-3">
                                <select className="custom-select" id="inputGroupSelect03">
                                    <option selected>Choose subject ...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-3 px-3">
                                <div className="form-inline w-100 text-center">
                                    <div className="input-group w-100">
                                        <input type="text" className="form-control" placeholder="Find tutor ..."/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fa fa-search text-white"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End filter */}

                    {/* Sorter */}
                    <div className="w-75 mx-auto text-right pt-4">
                        <span className="bg-light py-3 px-5 font-weight-bold cursor-pointer">Area &uarr;</span>
                        {/* <span>Area &darr;</span> */}
                        <span className="bg-light py-3 px-5 font-weight-bold cursor-pointer">Price &uarr;</span>
                        {/* <span>Price &darr;</span> */}
                        <span className="bg-light py-3 px-5 font-weight-bold cursor-pointer">Subject &uarr;</span>
                        {/* <span>Subject &darr;</span> */}
                    </div>
                    {/* End sorter */}
                    {/* Tutor data */}
                    <div className="bg-light w-75 mx-auto mb-2">
                        
                        <div className="row p-4">
                            <div className="col-2">
                                <img src={`https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`}
                                    alt="tutor avatar" className="w-100 m-1"></img>
                            </div>
                            <div className="col-6">
                                <div>Name: </div>
                                <div>Subject: </div>
                                <div>Tag: </div>
                                <a>See more</a>
                            </div>
                            <div className="col-4">
                                <div>Evaluation: </div>
                                <div>Price: </div>
                                <button className='btn btn-primary w-100'>Enroll</button>
                            </div>
                        </div>
                    
                    
                        <div className="row p-4">
                            <div className="col-2">
                                <img src={`https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`}
                                    alt="tutor avatar" className="w-100 m-1"></img>
                            </div>
                            <div className="col-6">
                                <div>Name: </div>
                                <div>Subject: </div>
                                <div>Tag: </div>
                                <a>See more</a>
                            </div>
                            <div className="col-4">
                                <div>Evaluation: </div>
                                <div>Price: </div>
                                <button className='btn btn-primary w-100'>Enroll</button>
                            </div>
                        </div>
                    
                    
                        <div className="row p-4">
                            <div className="col-2">
                                <img src={`https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`}
                                    alt="tutor avatar" className="w-100 m-1"></img>
                            </div>
                            <div className="col-6">
                                <div>Name: </div>
                                <div>Subject: </div>
                                <div>Tag: </div>
                                <a>See more</a>
                            </div>
                            <div className="col-4">
                                <div>Evaluation: </div>
                                <div>Price: </div>
                                <button className='btn btn-primary w-100'>Enroll</button>
                            </div>
                        </div>
                    
                    </div>
                    {/* End tutor data */}

                    {/* Pagination */}
                    <nav className="w-75 mx-auto mb-4">
                        <ul className="pagination justify-content-end">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
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
