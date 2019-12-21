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
                <NavLink className="dropdown-item text-white font-weight-bold" key={i.id} to={`/subject/idSubject=${i.id}`}>{i.name}</NavLink>
            )
        }
        return content;
    }

    render() {
        return (
            <div className="bg-dark border-top border-light">
                <ul className="nav justify-content-center">
                    <li className="nav-item active">
                        <NavLink className="nav-link text-white font-weight-bold" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="nav-link text-white font-weight-bold cursor-pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Subject
                        </div>
                        <div className="dropdown-menu bg-dark border-0" aria-labelledby="navbarDropdown">
                            {this.GenerateMajorsList()}
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-list">
                            Tutor
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
