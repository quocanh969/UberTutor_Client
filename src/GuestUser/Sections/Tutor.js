import React, { Component } from 'react';

import {ts} from '../../Services/TutorService';

import OwlCarousel from 'react-owl-carousel';
import './Tutor.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { NavLink } from 'react-router-dom';

export default class TutorList extends Component {
    
    constructor()
    {
        super();

        this.state = {
            isSuccess: false,
            tutorList: [],            
        }
    }

    componentWillMount() {
        ts.getTopTutor()
        .then((data)=>{
            this.setState({
                isSuccess: true,
                tutorList: data.info.data,
            });
        })
        .catch((err)=>{
            this.setState({
                isSuccess: false,
                tutorList: [],
            });
        })
    }
    
    generateTutorList()
    {
        if(this.state.isSuccess)
        {
            let content = [];
            let imgSrc = '';
            //
            for (let i of this.state.tutorList) {
                if(i.avatarLink || i.avatarLink === null || i.avatarLink === '' || i.avatarLink === undefined)
                {
                    imgSrc = `https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`;
                }
                else
                {
                    imgSrc = i.avatarLink;
                }

                content.push(
                    <div className="item card mx-1" key={i.id}>
                        <img src={imgSrc} className="card-img-top" alt="tutor avatar" />
                        <div className="card-body">
                            <h5 className="card-title text-truncate">{i.name}</h5>
                            <div><span className="text-primary">Subject: </span>{i.major_name}</div>
                            <div><span className="text-primary">Area: </span>{i.area}</div>
                            <div><span className="text-primary">Price: </span>$ {i.price}/h</div>
                            <NavLink to={`/detail-tutor/id=${i.id}`} className="btn btn-primary w-100 mt-3 px-auto">Find out more</NavLink>
                        </div>
                    </div>
                )
            }
            return(
                <OwlCarousel
                        ref="tutorList"
                        className="owl-theme"
                        loop
                        items={4}
                        dots={false}
                    >
                    {content}
                </OwlCarousel>
            );
        }
        else
        {
            return(
                <div className="m-auto">
                    Sorry, there was a problem of connecting to server. Please come back later.
                </div>
            );
        }
    }

    render() {
        return (
            <div className="px-auto parent py-5">
                <div className="preBtn" onClick={() => { this.refs.tutorList.prev() }}>
                    <i className="fa fa-angle-left font-size-90"></i>
                </div>
                <div className="d-inline">
                    {this.generateTutorList()}
                </div>
                <div className="nextBtn" onClick={() => { this.refs.tutorList.next() }}>
                    <i className="fa fa-angle-right font-size-90"></i>
                </div>
            </div>
        )
    }
}
