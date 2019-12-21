import React, { Component } from 'react';
import { us } from '../../Services/UserService';
import { NavLink } from 'react-router-dom';


export default class Activate extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isSuccess: false,
        }
    }

    componentWillMount()
    {
        let id = this.props.match.params.id;


        us.activateAccount(id)
        .then((res)=>{
            this.setState({
                isSuccess: true,                
            })
        })
        .catch((err)=>{
            this.setState({
                isSuccess: false,
            })
        })
    }
    
    componentDidMount()
    {
        window.scrollTo(0, 0);
    }

    generateNotice()
    {
        if(this.state.isSuccess)
        {
            return(
                <div className="p-5 text-center">
                    <div>Your account is activated,<br></br>Now you're member of</div>
                    <h3 className="text-primary font-weight-bold pt-2">UBER TUTOR</h3>
                    <hr></hr>
                    <NavLink to='/login' className='btn btn-primary'>Back to Login !!!</NavLink>
                </div>
            );
        }
        else
        {
            return(
                <div className="p-5 text-center">
                    <div>There was an error in connect to server,<br></br>Please retry later</div>
                    <hr></hr>
                    <h3 className="text-primary font-weight-bold pt-2">UBER TUTOR</h3>
                    <hr></hr>
                    <NavLink to='/login' className='btn btn-primary'>Back to Login !!!</NavLink>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-forgot-password-image" />
                            <div className="col-lg-6">
                                { this.generateNotice() }
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
