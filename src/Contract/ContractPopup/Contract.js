import React, { Component } from 'react';
import { ls } from '../../Services/LearnerService';
import { cs } from '../../Services/ContractService';

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
            estimatedEndDate: this.refs.endDate.value.toString(),
            description: this.refs.description.value,
        })
        .then(res=>{
            console.log(res);
            cs.noticeContract({
                id_contract: res.info.data.insertId,
                email: this.props.email,
            })
            .then(res2=>{
                //console.log(res2.info.message);
                console.log('success');
                alert('Create contract successfully');
                this.props.onClose();
            })
            .catch(err=>{
                alert('Create contract failed');
            })
            
        })
        .catch(err=>{
            console.log('failed');
            console.log(err);
        })
    }

    render() {
        var today = new  Date();
        var todayStr = `${today.getFullYear()}-${today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate() < 10 ? '0'+today.getDate():today.getDate()}`;
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
                                <div className='text-danger text-left pl-3'><i>*Due to laboral policies, a tutor can only teach 3 days a week and 2 hours a day</i></div>
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
                                            <p className='col-8 text-left'>$&nbsp;{this.props.price}/hour</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-2'>
                                    <label className='col-3 pl-4 text-left'>Date End:</label>
                                    <input type='date' ref='endDate' min={todayStr} required className='col-8'></input>
                                    <div className='col-1'></div>                                    
                                </div>
                                <div className='text-danger text-left pl-3 mt-3'><i>*Specific tutoring schedule should be included in the description</i></div>
                                <div className='row my-2'>
                                    <label className='col-3 pl-4 text-left'>Description:</label>
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
