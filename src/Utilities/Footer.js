import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <footer class="container-fluid bg-dark text-white">
                <div className="container">
                    
                    <div className="row pt-4">
                        <div className="col-4 border-right border-light">
                            <h4 className='font-weight-bold text-left'>About us:</h4>
                            <div className="border-radius-20px bg-2d2b2b p-3">
                                <div className="row mb-1">
                                    <div className="col-3">Email:</div>
                                    <div className="col-9">ubertutor018175</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-3">Phone:</div>
                                    <div className="col-9">+84352468482</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-3">Address:</div>
                                    <div className="col-9">District 5, TPHCM</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-3">CEO:</div>
                                    <div className="col-9">John Cena</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-3">Founder:</div>
                                    <div className="col-9">Tripple H</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <h4 className='font-weight-bold text-left'>Social:</h4>
                            <div className="border-radius-20px bg-2d2b2b p-3">
                                <div className="row pl-3 mb-1">
                                    <div className="col-1">
                                        <i className="fab fa-facebook"></i>
                                    </div>
                                    <div className="col-10">/fb.ubertutor018175</div>
                                </div>
                                <div className="row pl-3 my-1">
                                    <div className="col-1">
                                        <i className="fab fa-linkedin-in"></i>
                                    </div>
                                    <div className="col-10">/ubertutor.in.018175</div>
                                </div>
                                <div className="row pl-3 my-1">
                                    <div className="col-1">
                                        <i className="fab fa-google-plus"></i>
                                    </div>
                                    <div className="col-10">/ubertutor018175@gmail.com</div>
                                </div>
                                <div className="row pl-3 my-1">
                                    <div className="col-1">
                                        <i class="fab fa-instagram"></i>
                                    </div>
                                    <div className="col-10">/inst.ubertutor018175</div>
                                </div>
                                <div className="row pl-3 my-1">
                                    <div className="col-1">
                                        <i class="fab fa-twitter"></i>  
                                    </div>
                                    <div className="col-10">/ubertutor.twit.018175</div>
                                </div>
                            </div>                    
                        </div>
                        <div className="col-4 border-left border-light">
                            <h4 className='font-weight-bold text-left'>Map:</h4>
                            <div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.630704761159!2d106.679983014287!3d10.762918262387192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2sHo%20Chi%20Minh%20City%20University%20of%20Science!5e0!3m2!1sen!2s!4v1576904299994!5m2!1sen!2s" 
                                    width="auto" height="auto" frameBorder="0" allowFullScreen=""></iframe>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='text-white text-center'>
                        <div>Our website is on developping phase, so if you have any complain or idea for this website.</div>
                        <h3>Please contact us.</h3>
                    </div>  
                    {/* <hr className="border-light"></hr> */}
                    <div className="text-center">© 2019 Copyright</div>
                </div>
            </footer>
        );
    }
}
