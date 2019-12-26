import React, { Component } from 'react';
import { ls } from '../Services/LearnerService';
import { cs } from '../Services/ContractService';

export default class Contract extends Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        ls.enrollClass({
            id: this.props.idLearner,
            id_tutor: this.props.idTutor,
            major: this.props.majorCode,
            description: this.refs.description.value,
        })
        .then(res=>{
            
            cs.noticeContract({
                id_contract: res.info.data.insertId,
                email: this.props.email,
            })
            .then(res2=>{
                //console.log(res2.info.message);
                console.log('success');
                this.props.onClose();
            })
            
        })
        .catch(err=>{
            console.log('failed');
            console.log(err);
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
                                <h1 className="h4 text-gray-900 mb-4">Create Contract!</h1>
                            </div>
                            <form ref="registerForm" onSubmit={this.handleSubmit}>
                                <div className="row my-2">                                
                                    <div className="col-6">
                                        <div className='row'>
                                            <label className='col-4'>Learner:</label>
                                            <p className='col-8 text-left'>{this.props.learnerName}</p>
                                        </div>
                                    </div>                                    
                                    <div className="col-6">
                                        <div className='row'>
                                            <label className='col-4'>Tutor:</label>
                                            <p className='col-8 text-left'>{this.props.tutorName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">                                
                                    <div className="col-6">
                                        <div className='row'>
                                            <label className='col-4'>Subject:</label>
                                            <p className='col-8 text-left'>{this.props.major}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="col-6">
                                        <div className='row'>
                                            <label className='col-4'>Price:</label>
                                            <p className='col-8 text-left'>{this.props.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-2'>
                                    <label className='col-3 pl-0 ml-0'>Description:</label>
                                    <textarea ref='description' required className='col-8 description'></textarea>
                                    <div className='col-1'></div>                                    
                                </div>
                                <button className='btn btn-primary mx-auto mt-4'>CREATE CONTRACT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
