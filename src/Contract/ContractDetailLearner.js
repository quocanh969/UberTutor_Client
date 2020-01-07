import React, { Component } from 'react';
import { cs } from '../Services/ContractService';
import ComplainContract from './ContractPopup/ComplainContract';
import Popup from 'reactjs-popup';
import ContractPayment from './ContractPopup/ContractPayment';

export default class ContractDetailLearner extends Component {
    contract;
    constructor(props)
    {
        super(props);

        this.state = {
            isCancel: false,
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
            .catch(err=>{
                console.log(err);
                alert("There was error when loading data from server");
            })

    }

    handleChange(e)
    {
        this.contract[e.target.name] = e.target.value;
        this.setState({
            contract: this.contract,            
        })
    }

    cancelContract() {
        var r = window.confirm('Are you sure to cancel this contract ?');
        if(r === true)
        {
            console.log("cancel contract");
            this.setState({isCancel: true});
        }
        else
        {
            // do nothing
        }        
    }

    render() {
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

            
                {this.state.contract.status !== 2 
                ?
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
                            <div className='col-5 text-primary font-weight-bold'>
                                Estimated End Date:
                            </div>
                            <div className='col-7 pl-5'>
                                {this.state.contract.EstimatedEndDate}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='row my-2'>
                    <div className="col-4">
                        <div className="row">
                            <div className='col-5 text-primary font-weight-bold'>
                                Start Date:
                            </div>
                            <div className='col-7 pl-5'>
                                {this.state.contract.StartDate}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className='col-6 text-primary font-weight-bold'>
                                Estimated End Date:
                            </div>
                            <div className='col-6 pl-5'>
                                {this.state.contract.EstimatedEndDate}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className='col-5 text-primary font-weight-bold'>
                                End Date:
                            </div>
                            <div className='col-7 pl-5'>
                                {this.state.contract.EndDate}
                            </div>
                        </div>
                    </div>
                </div>
                }
            
                {this.state.contract.status !== 0
                ?
                <div className="row my-2">
                    <div className='col-2 text-primary font-weight-bold'>
                        Bill:
                    </div>
                    <div className='col-10 pl-0 ml-0'>
                        $&nbsp;{this.state.contract.totalPrice}
                    </div>
                </div>
                :
                ''
                }
                <hr></hr>
                <div className="row my-2">
                    <div className='col-2 text-primary font-weight-bold'>
                        Feedback:
                    </div>
                    <textarea className='col-10  pt-1 ml-0 feedback' 
                            disabled
                            name='feedback' required minLength={3} onChange={this.handleChange}
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
                                { this.state.contract.status === 0 ? 
                                <span className='text-danger font-weight-bold col-8'>Pending</span>
                                : (this.state.contract.status === 1 ?
                                    <span className='text-success font-weight-bold col-8'>Active</span>
                                    : (this.state.contract.status === 2 ?
                                        <span className='text-dark font-weight-bold col-8'>History</span>
                                        :
                                        <span className='text-warning font-weight-bold col-8'>Expired</span>
                                    )
                                )
                            }
                            </div>
                            <div className='col-4'>
                                { this.state.contract.status === 1 ? 
                                <div>
                                    <div className='btn btn-secondary cursor-pointer' onClick={()=>{this.cancelContract()}}>Cancel contract</div> 
                                    <Popup open={this.state.isCancel} 
                                            onClose={()=>{this.setState({isCancel: false})}}>
                                        {close => (
                                            <ContractPayment
                                                id={this.state.contract.id}
                                                status={this.state.contract.status}
                                                onReload={this.initData(this.state.contract.id)}
                                                onClose={close}
                                            ></ContractPayment>
                                        )}
                                    </Popup>                
                                </div>
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
                                {/* {disable === false ?
                                <input ref='ratingSlider' type="range" min="0" max="10" 
                                        required disabled={disable}
                                        value={this.state.contract.rating}
                                        className="slider mt-auto px-0" name='rating'
                                        onChange={this.handleChange}/>
                                :''} */}
                                <span>{this.state.contract.rating}&nbsp;<i className="fa fa-star text-warning"></i></span>
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
                            name='description' required minLength={3}
                            disabled onChange={this.handleChange}
                            defaultValue={this.state.contract.description}>
                    </textarea>
                </div>
                {this.state.contract.status === 1 ?
                <div className='m-5 row'>
                    <div className='col-6 text-center'>                
                        
                        <Popup trigger={
                            <div className='btn btn-primary cursor-pointer font-weight-bold'>
                                PAY FOR CONTRACT
                            </div>} 
                            modal>
                            {close => (
                                <ContractPayment
                                    id={this.state.contract.id}
                                    status={this.state.contract.status}
                                    onReload={this.initData(this.state.contract.id)}
                                    onClose={close}
                                ></ContractPayment>
                            )}
                        </Popup>     
                    </div>
                    <div className='col-6 text-center'>                
                        <Popup trigger={
                            <div className='btn btn-danger cursor-pointer font-weight-bold'>
                                GIVE COMPLAIN
                            </div>} 
                            modal>
                            {close => (
                                <ComplainContract
                                    id={this.state.contract.id}
                                    onClose={close}
                                ></ComplainContract>
                            )}
                        </Popup>
                    </div>
                </div>
                :
                (this.state.contract.status === 3
                    ?
                    <div className='m-5 text-center'>
                        <Popup trigger={
                            <div className='btn btn-primary cursor-pointer font-weight-bold'>
                                PAY FOR CONTRACT
                            </div>} 
                            modal>
                            {close => (
                                <ContractPayment
                                    id={this.state.contract.id}
                                    status={this.state.contract.status}
                                    onReload={this.initData(this.state.contract.id)}
                                    onClose={close}
                                ></ContractPayment>
                            )}
                        </Popup>     
                    </div>
                    :
                    ''
                    )
                }
            </div>
        )
    }
}
