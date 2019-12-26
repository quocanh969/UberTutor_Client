import React, { Component } from 'react';
import { history } from '../Helpers/History';
import { cs } from '../Services/ContractService';

export default class ContractReply extends Component {
    constructor(props)
    {
        super(props);

        let {reply, id} = this.props.match.params;

        this.state = {
            isDone: false,
        }

        this.replyTheContract(id, Number.parseInt(reply))
    }
    replyTheContract(id, replyStyle) {
        if(replyStyle === 0)
        {// reject
            cs.rejectContract(id)
            .then(res=>{
                this.setState({isDone: true});
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else
        {// agree
            cs.agreeContract(id)
            .then(res=>{
                this.setState({isDone: true});
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.isDone ?
                history.push('/')
                :
                <div className='m-auto'>
                    <div>We are in processing</div>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                }
                
            </div>
        )
    }
}
