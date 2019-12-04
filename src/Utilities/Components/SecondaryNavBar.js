import React, { Component } from 'react'

export default class SecondaryNavBar extends Component {
    render() {
        return (
            <div>
                <nav class="navbar fixed-top navbar-dark bg-dark">
                    <a class="navbar-brand" href="/">UBER TUTOR</a>
                    {/* <div class="text-right">
                        <a class="navbar-brand" href="/">UBER TUTOR</a>
                        <a class="navbar-brand" href="/">UBER TUTOR</a>
                        <a class="navbar-brand" href="/">UBER TUTOR</a>
                    </div> */}

                    <div class="form-inline">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Register</button>
                            <a>&nbsp;&nbsp;</a>
                            <a class="btn btn-primary" href="/login" role="button">Login</a>
                            <a>&nbsp;&nbsp;</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item label" href="/register">AS A LEARNER</a>
                                <a class="dropdown-item label" href="/tutorRegister">AS A TUTOR</a>
                                {/* <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a> */}
                            </div>
                        </div>
                        <form>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}
