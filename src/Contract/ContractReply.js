import React, { Component } from 'react';
import { history } from '../Helpers/History';
import { cs } from '../Services/ContractService';

export default class ContractReply extends Component {
    constructor(props)
    {
        super(props);

        let {reply, id} = this.props.match.params;

        this.state = {
            result: -1,
            message: '',
        }

        this.replyTheContract(id, Number.parseInt(reply))
    }
    replyTheContract(id, replyStyle) {
        if(replyStyle === 0)
        {// reject
            cs.rejectContract(id)
            .then(res=>{
                if(res.code === 1)
                {
                    this.setState({result: 1, message:'Your reject has been recorded'});
                }
                else
                {
                    this.setState({result: 0, message:'We sorry about problem !! Please try again later'});
                    console.log(res.info.message);
                }
            })
            .catch(err=>{
                this.setState({result: 0, message:'We sorry about problem !! Please try again later'});
                console.log(err);
            })
        }
        else
        {// agree
            cs.agreeContract(id)
            .then(res=>{
                if(res.code === 1)
                {
                    this.setState({result: 1, message:'Your acceptance has been recorded'});
                }
                else
                {
                    this.setState({result: 0, message:'We sorry about problem !! Please try again later'});
                    console.log(res.info.message);
                }
            })
            .catch(err=>{
                this.setState({result: 0, message:'We sorry about problem !! Please try again later'});
                console.log(err);
            })
        }
    }
    render() {
        return (
            <div className='mt-5 pt-5'>
                <div className='bg-light p-5'>
                    {this.state.result === -1 ?
                    <div className='m-auto text-center'>
                        <div>We are in processing</div>
                        <div className="spinner-border text-primary mt-3" style={{height:80,width:80,fontSize:30}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    (this.state.result === 1
                        ?
                        <div className='m-auto text-center'>
                            <div>Process done successful</div>
                            <div className="mt-3">
                                <i className="fa fa-check text-success rounded-circle border border-success pt-4" style={{height:80,width:80,fontSize:30}}></i>
                            </div>
                            <div className="mt-1">
                                <h3>{this.state.message}</h3>
                            </div>
                        </div>
                        :
                        <div className='m-auto text-center'>
                            <div>Process fail</div>
                            <div className="mt-3">
                                <i className="fa fa-times text-danger rounded-circle border border-danger pt-4" style={{height:80,width:80,fontSize:30}}></i>
                            </div>
                            <div className="mt-1">
                                <h3>{this.state.message}</h3>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
