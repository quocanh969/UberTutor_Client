import React, { Component } from 'react'

export default class CategoriesList extends Component {
    render() {
        return (
            <div>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Math</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Physics</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Chemistry</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Programming</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Biology</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Networking</a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="#"></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> */}
                </ul>
            </div>
        )
    }
}
