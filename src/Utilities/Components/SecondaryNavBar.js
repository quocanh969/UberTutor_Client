import React, { Component } from 'react'

export default class SecondaryNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">UBER TUTOR</a>
                    {/* <div className="text-right">
                        <a className="navbar-brand" href="/">UBER TUTOR</a>
                        <a className="navbar-brand" href="/">UBER TUTOR</a>
                        <a className="navbar-brand" href="/">UBER TUTOR</a>
                    </div> */}

                    <div className="form-inline">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Register</button>
                            <a>&nbsp;&nbsp;</a>
                            <a className="btn btn-primary" href="/login" role="button">Login</a>
                            <a>&nbsp;&nbsp;</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item label" href="/register">AS A LEARNER</a>
                                <a className="dropdown-item label" href="/tutorRegister">AS A TUTOR</a>
                                {/* <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Separated link</a> */}
                            </div>
                        </div>
                        <form>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}
