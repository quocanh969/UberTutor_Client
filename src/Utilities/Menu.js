import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }

    GenerateMajorsList = () => {
        let content = [];
        for (let i of this.props.majorList) {
            content.push(
                // <li className="nav-item" key={i.id}>
                //     <a className="nav-link text-white font-weight-bold" href="#">{i.name}</a>
                // </li>
                <NavLink className="dropdown-item text-white font-weight-bold" key={i.id} to={`/tutor-list/subject=${i.name}`}>{i.name}</NavLink>
            )
        }
        return content;
    }

    GenerateAreaList = () => {
        let content = [];
        for (let i of this.props.areaList) {
            content.push(
                // <li className="nav-item" key={i.id}>
                //     <a className="nav-link text-white font-weight-bold" href="#">{i.name}</a>
                // </li>
                <NavLink className="dropdown-item text-white font-weight-bold" key={i.id_area} to={`/tutor-list/area=${i.area}`}>{i.area}</NavLink>
            )
        }
        return content;
    }

    render() {
        return (
            <div className="bg-dark border-top border-light">
                <ul className="nav justify-content-center">
                    <li className="nav-item active mx-3">
                        <NavLink className="nav-link text-white font-weight-bold" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown mx-3">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Find by Subject
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            {this.GenerateMajorsList()}
                        </div>
                    </li>
                    <li className="nav-item dropdown mx-3">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Find by Area
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            {this.GenerateAreaList()}
                        </div>
                    </li>
                    <li className="nav-item dropdown mx-3">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Find by Price
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            <NavLink className="dropdown-item text-white font-weight-bold" to={`/tutor-list/price=${20000}`}>Under $20000</NavLink>
                            <NavLink className="dropdown-item text-white font-weight-bold" to={`/tutor-list/price=${40000}`}>Under $40000</NavLink>
                            <NavLink className="dropdown-item text-white font-weight-bold" to={`/tutor-list/price=${60000}`}>Under $60000</NavLink>
                        </div>
                    </li>
                    <li className="nav-item mx-3">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-list">
                            Tutor
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
