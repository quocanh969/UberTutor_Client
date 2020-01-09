import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import maj from '../Services/MajorService';
import { as } from '../Services/AreaService';

export default class TutorMenu extends Component {
    constructor() {
        super();
        this.state = {
            majorList: [],
            areaList: [],
        }

        maj.getList().then(data => {
            this.setState({ majorList: data });
        })

        as.getAreaList()
        .then(data=>{
            this.setState({areaList: data});
        })
    }

    GenerateMajorsList = () => {
        let content = [];
        for (let i of this.state.majorList) {
            content.push(
                <a className="dropdown-item text-white font-weight-bold" key={i.id} href={`/tutor-list/subject=${i.name}`}>{i.name}</a>
            )
        }
        return content;
    }

    GenerateAreaList = () => {
        let content = [];
        for (let i of this.state.areaList) {
            content.push(
                <a className="dropdown-item text-white font-weight-bold" key={i.id_area} href={`/tutor-list/area=${i.area}`}>{i.area}</a>
            )
        }
        return content;
    }


    render() {
        return (
            <div className="bg-dark border-top border-light">
                <ul className="nav justify-content-center">
                    <li className="nav-item dropdown mx-1">
                        <a className="nav-link text-white font-weight-bold" href="/profile">
                            My Profile
                        </a>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <a className="nav-link text-white font-weight-bold" href="/tutor-contract">
                            My Contract
                        </a>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <a className="nav-link text-white font-weight-bold" href="/tutor-summary">
                            Income Summary
                        </a>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            List by Subject
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            {this.GenerateMajorsList()}
                        </div>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            List by Area
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            {this.GenerateAreaList()}
                        </div>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            List by Price
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item text-white font-weight-bold" href={`/tutor-list/price=${20000}`}>Under $20000</a>
                            <a className="dropdown-item text-white font-weight-bold" href={`/tutor-list/price=${40000}`}>Under $40000</a>
                            <a className="dropdown-item text-white font-weight-bold" href={`/tutor-list/price=${60000}`}>Under $60000</a>
                        </div>
                    </li>
                    <li className="nav-item mx-1">
                        <a className="nav-link text-white font-weight-bold" href="/tutor-list">
                            List of Tutor
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
