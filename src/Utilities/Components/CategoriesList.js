import React, { Component } from 'react'

export default class CategoriesList extends Component {
    constructor(props) {
        super(props);
    }

    GenerateMajorsList = () => {
        let content = [];
        for (let i of this.props.majorList) {
            content.push(
                <li className="nav-item">
                    <a className="nav-link text-white font-weight-bold" href="#">{i.name}</a>
                </li>
            )
        }
        return content;
    }

    render() {
        return (
            <div className="bg-dark border-top border-light">
                <ul className="nav justify-content-center">
                    {this.GenerateMajorsList()}
                </ul>
            </div>
        )
    }
}
