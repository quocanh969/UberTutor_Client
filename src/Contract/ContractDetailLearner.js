import React, { Component } from 'react';
import { cs } from '../Services/ContractService';

export default class ContractDetailLearner extends Component {
    contract;
    constructor(props)
    {
        super(props);

        this.state = {
            contract: {
                id: 0,
                id_learner: 0,
                id_tutor: 0,
                StartDate: null,
                EndDate: null,
                totalPrice: 0,
                status: 0,
                complain: "",
                feedback: "",
                rating: 0,
                major: 0,
                description: "",
                learner_email: "",
                tutor_email: "",
                learner_name: "",
                tutor_name: "",
            },
        }

        let id = Number.parseInt(this.props.match.params.id);

        this.initData(id);

        this.handleChange = this.handleChange.bind(this);
    }

    initData(id) {
        cs.getContractDetail(id)
            .then(res => {
                this.setState({
                    contract: res.info.data[0],
                })
                this.contract = this.state.contract;
                console.log(this.state.contract);
            })

    }

    handleChange(e)
    {
        this.contract[e.target.name] = e.target.value;
        this.setState({
            contract: this.contract,            
        })
    }

    payContract()
    {
        cs.payContract({
            id_contract: this.state.contract.id,
            rating: this.state.contract.rating,
            complain: this.state.contract.complain,
            feedback: this.state.contract.feedback,
        })
        .then(res=>{
            alert('Giao dịch thành công');
        })
        .catch(err=>{
            alert('Giao dịch thất bại');
            console.log(err);
        })
    }

    render() {
        let disable = true;
        if(this.state.contract.status === 1) disable = false;
        return (
            <div className="container emp-profile">
                <h2 className='text-center text-primary font-weight-bold'>CONTRACT DETAIL</h2>

                <div className="row my-2">
                    <div className='col-2 text-primary font-weight-bold'>
                        Contract ID:
                    </div>
                    <div className='col-10 ml-0 pl-0'>
                        {this.state.contract.id}
                    </div>
                </div>

                <div className='row my-2'>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Learner:
                            </div>
                            <div className='col-9 pl-5'>
                                {this.state.contract.learner_name}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Tuutor:
                            </div>
                            <div className='col-9 pl-5'>
                                {this.state.contract.tutor_name}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row my-2'>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Learner Email:
                            </div>
                            <div className='col-9 pl-5'>
                                {this.state.contract.learner_email}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Tutor Email:
                            </div>
                            <div className='col-9 pl-5'>
                                {this.state.contract.tutor_email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row my-2'>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Start Date:
                            </div>
                            <div className='col-9 pl-5'>
                                {this.state.contract.StartDate}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                End Date:
                            </div>
                            <div className='col-9 pl-5'>
                                {this.state.contract.EndDate}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-2">
                    <div className='col-2 text-primary font-weight-bold'>
                        Bill:
                    </div>
                    <div className='col-10 pl-0 ml-0'>
                        {this.state.contract.totalPrice} /day
                    </div>
                </div>
                <hr></hr>
                <div className="row my-2">
                    <div className='col-2 text-primary font-weight-bold'>
                        Feedback:
                    </div>
                    <textarea className='col-10  pt-1 ml-0 feedback' 
                            disabled={disable}
                            name='feedback' required minlength={3}
                            defaultValue={this.state.contract.feedback}></textarea>
                </div>
                <hr></hr>
                <div className='row my-2'>
                    <div className="col-6">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Status:
                            </div>
                            <div className='col-3 pl-5'>
                                { this.state.contract.status.status === 0 ? 
                                <span className='text-danger font-weight-bold col-8'>Pending</span>
                                : (this.state.contract.status === 1 ?
                                    <span className='text-success font-weight-bold col-8'>Active</span>
                                    : <span className='text-dark font-weight-bold col-8'>History</span>
                                )
                            }
                            </div>
                            <div className='col-4'>
                                { this.state.contract.status === 1 ? 
                                <div className='btn btn-secondary cursor-pointer'>Cancel contract</div>
                                : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-6 my-2">
                        <div className="row">
                            <div className='col-3 text-primary font-weight-bold'>
                                Rating:
                            </div>
                            <div className='col-9 pl-5 slidecontainer'>
                                {disable === false ?
                                <input ref='ratingSlider' type="range" min="0" max="10" 
                                        required disabled={disable}
                                        value={this.state.contract.rating}
                                        className="slider mt-auto" name='rating'
                                        onChange={this.handleChange}/>
                                :''}
                                <span>&nbsp;&nbsp;{this.state.contract.rating}&nbsp;<i className="fa fa-star text-warning"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row my-2">
                    <div className='col-2 text-primary font-weight-bold'>
                        Description:
                    </div>
                    <textarea className='col-10 pt-1 ml-0 text-wrap word-wrap-break description'
                            name='description' required minlength={3}
                            disabled={disable}
                            defaultValue={this.state.contract.description}>
                    </textarea>
                </div>
                {this.state.contract.status === 1 ?
                <div className='row m-5'>
                    <div className='col-4 text-center'>
                        <div className='btn btn-primary cursor-pointer font-weight-bold' onClick={()=>{this.payContract()}}>
                            PAY FOR CONTRACT
                        </div>
                    </div>
                    <div className='col-4 text-center'>
                        <div className='btn btn-success cursor-pointer font-weight-bold'>
                            UPDATE CONTRACT INFO
                        </div>
                    </div>
                    <div className='col-4 text-center'>
                        <div className='btn btn-danger cursor-pointer font-weight-bold'>
                            GIVE COMPLAIN
                        </div>
                    </div>                    
                </div>
                :''}
            </div>
        )
    }
}
