import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'

export default class GoogleLoginComponent extends Component {
    // componentClicked = () => console.log("Clicked");
    responseGoogle = (res) => {
        console.log("google response");
        console.log(res);
    }
    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="478268913211-ldu6mf2b7jpk6g7v62qcfogr2egt6dak.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    cookiePolicy={'single_host_origin'}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}
