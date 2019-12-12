import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'

export default class GoogleLoginComponent extends Component {
    // componentClicked = () => console.log("Clicked");
    responseGoogle = (res) => {
        console.log(res);
        let { GoogleLoginFunc } = this.props;
        let { role } = this.props;
        GoogleLoginFunc({
            name: res.profileObj.name,
            id_social: res.profileObj.googleId,
            email: res.profileObj.email,
            avatarLink: res.profileObj.imageUrl,
            role: role,
        });
    }
    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="478268913211-ldu6mf2b7jpk6g7v62qcfogr2egt6dak.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    className="w-100"
                    cookiePolicy={'single_host_origin'}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}
