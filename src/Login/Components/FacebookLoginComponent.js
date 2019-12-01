import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookLoginComponent extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        displayName: '',
        email: '',
        avatar: '',
    };

    componentClicked = () => console.log("Clicked");
    responseFacebook = (res) => {
        console.log(res);
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="1031064350575617"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
            </div>
        )
    }
}
