import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class TutorMenu extends Component {
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
                        <NavLink className="nav-link text-white font-weight-bold" to="/profile">
                            My Profile
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown mx-3">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-contract">
                            My Contract
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown mx-3">
                        <NavLink className="nav-link text-white font-weight-bold" to="/tutor-summary">
                            Income Summary
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
