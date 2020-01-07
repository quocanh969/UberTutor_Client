import React, { Component } from 'react';
import { cs } from '../../Services/ContractService';

export default class ComplaintContract extends Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        cs.complainContract(this.props.id, this.refs.complain.value)
        .then(res=>{
            if(res.code === 1)
            {
                alert(res.info.message);
                this.props.onClose();
            }
            else
            {
                alert(res.info.message);
            }
        })
        .catch(err=>{
            console.log(err);
            alert('Complain contract failed');            
        })
    }

    render() {
        return (
            <div>
                <div className="container text-center">
                    <div className="card o-hidden border-0 shadow-lg my-5 py-4">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Tell us what you think about this tutor!</h1>
                            </div>
                            <form ref="registerForm" onSubmit={this.handleSubmit}>
                                <div className='row my-2'>
                                    <label className='col-3 pl-0 ml-0'>Complain:</label>
                                    <textarea ref='complain' required className='col-8 description'></textarea>
                                    <div className='col-1'></div>                                    
                                </div>
                                <button className='btn btn-danger mx-auto mt-4'>COMPLAIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
