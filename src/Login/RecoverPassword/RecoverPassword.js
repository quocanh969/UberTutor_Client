import React, { Component } from 'react'

import { us } from '../../Services/UserService'

export default class RecoverPassword extends Component {
    token;
    id;
    constructor(props) {
        super(props);
        this.state = ({ newPassword: '' });
        console.log("fafaefa");
        console.log(this.props);
    }

    componentWillMount() {
        this.token = this.props.match.params.token;
        this.id = this.props.match.params.id;

        us.recoverPassword(this.id, this.token)
        .then( data => 
            {
                console.log(data.info);
                this.setState({newPassword: data.info.data})
            }
        )
        .catch( err => {
            return (
                <div>{err}</div>
            )
        })
    }

    DisplayNewPassword() {
       return (
           <div>{this.state.newPassword}</div>
       )
    }

    render() {
        return (
            <div>
                {this.state.newPassword}
            </div>
        )
    }
}
