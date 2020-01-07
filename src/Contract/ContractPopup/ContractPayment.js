import React, { Component } from 'react'
import { cs } from '../../Services/ContractService';

export default class ContractPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            rating: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.props.status === 1)
        {// Nghỉ ngang
            cs.payContract({
                id_contract: this.props.id,
                rating: this.state.rating,
                complain: this.refs.complain.value,
                feedback: this.refs.feedback.value,
            })
            .then(res=>{
                if(res.code === 1)
                {
                    alert('Giao dịch thành công');                    
                    this.props.onClose();   
                }
                else
                {
                    console.log(res.info.message);
                    alert('Giao dịch thất bại');
                }
                
            })
            .catch(err=>{
                console.log(err);
                alert('Giao dịch thất bại');            
            })
        }
        else
        {
            cs.payExpiredContract({
                id_contract: this.props.id,
                rating: this.state.rating,
                complain: this.refs.complain.value,
                feedback: this.refs.feedback.value,
            })
            .then(res=>{
                if(res.code === 1)
                {
                    alert('Giao dịch thành công');
                    this.props.onClose();                
                }
                else
                {
                    console.log(res.info.message);
                    alert('Giao dịch thất bại');
                }
                
            })
            .catch(err=>{
                console.log(err);
                alert('Giao dịch thất bại');            
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container text-center" >
                    <div className="card o-hidden border-0 shadow-lg my-5 py-4">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="text-center">
                                <h1 className="h4 text-primary font-weight-bold mb-4">CONTRACT PAYMENT DETAIL</h1>
                            </div>
                            <form ref="registerForm" onSubmit={this.handleSubmit}>
                                <hr></hr>
                                <div className='row my-2'>
                                    <label className='col-3 pl-0 ml-0'>Complain:</label>
                                    <textarea className='col-8 description' ref='complain'></textarea>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row my-2'>
                                    <label className='col-3 pl-4 text-left'>Rating:</label>
                                    <input ref='ratingSlider' type="range" min="0" max="10" 
                                        required onChange={this.handleChange} defaultValue={0}                                    
                                        className="slider w-100 px-0 ml-0 col-6 my-auto" ref='rating'/>
                                    <span>&nbsp;&nbsp;{this.state.rating}&nbsp;<i className="fa fa-star text-warning col-2"></i></span>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row my-2'>
                                    <label className='col-3 pl-0 ml-0'>Feedback:</label>
                                    <textarea ref='feedback' required className='col-8 description'></textarea>
                                    <div className='col-1'></div>
                                </div>
                                <hr></hr>
                                <div className='row my-2 align-items-center'>
                                    <label className='col-3 pl-0 ml-0'>Type of Card:</label>
                                    <select ref='typeOfCard' required className='col-8'>
                                        <option value={1}>Master Card</option>
                                        <option value={2}>Visa Card</option>
                                    </select>
                                    <div className='col-1'></div>
                                </div>
                                <div className='row my-2 align-items-center'>
                                    <label className='col-3 pl-0 ml-0'>Card Num:</label>
                                    <input type='text' className='col-8' pattern="[0-9]{10}" required ></input>
                                    <div className='col-1'></div>
                                </div>
                                <hr></hr>
                                <button className='btn btn-primary mx-auto'>GET PAY</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
