import React, { Component } from 'react'

export default class CategoriesList extends Component {
    constructor(props) {
        super(props);
    }

    GenerateMajorsList = () => {
        let content = [];
        for (let i of this.props.majorList) {
            content.push(
                <li class="nav-item">
                    <a class="nav-link" href="#">{i.name}</a>
                </li>
            )
        }
        return content;
    }

    render() {
        return (
            <div>
                <ul class="nav justify-content-center">
                    {this.GenerateMajorsList()}
                </ul>
            </div>
        )
    }
}
