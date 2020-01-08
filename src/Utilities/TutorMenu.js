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
                <NavLink className="dropdown-item text-white font-weight-bold" key={i.id} to={`/tutor-list/subject=${i.name}`}>{i.name}</NavLink>
            )
        }
        return content;
    }

    GenerateAreaList = () => {
        let content = [];
        for (let i of this.state.areaList) {
            content.push(
                <NavLink className="dropdown-item text-white font-weight-bold" key={i.id_area} to={`/tutor-list/area=${i.area}`}>{i.area}</NavLink>
            )
        }
        return content;
    }


    render() {
        return (
            <div className="bg-dark border-top border-light">
                <ul className="nav justify-content-center">
                    <li className="nav-item dropdown mx-1">
                        <NavLink className="nav-link text-white font-weight-bold" to="/profile">
                            My Profile
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-contract">
                            My Contract
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown mx-1">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-summary">
                            Income Summary
                        </NavLink>
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
                            <NavLink className="dropdown-item text-white font-weight-bold" to={`/tutor-list/price=${20000}`}>Under $20000</NavLink>
                            <NavLink className="dropdown-item text-white font-weight-bold" to={`/tutor-list/price=${40000}`}>Under $40000</NavLink>
                            <NavLink className="dropdown-item text-white font-weight-bold" to={`/tutor-list/price=${60000}`}>Under $60000</NavLink>
                        </div>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-list">
                            List of Tutor
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
