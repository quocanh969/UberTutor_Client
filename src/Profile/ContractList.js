import React, { Component } from 'react'
import { ts } from '../Services/TutorService';
import { NavLink } from 'react-router-dom';
import { history } from '../Helpers/History';

export default class ContractList extends Component {

    isTutor = false;
    directLink = '';
    key = 0;

    constructor(props) {
        super(props);

        this.state = {
            tab: 4,
            contracts: [],
            expiredContracts: [],
            pendingContracts: [],
            activeContracts: [],
            totalPage: 0,
            page: 0,
            totalContractPage: 0,
            contractPage: 0,
            totalExpiredPage: 0,
            expiredPage: 0,
            totalPendingPage: 0,
            pendingPage: 0,
        }

        this.isTutor = this.props.isTutor;
        if (this.isTutor) {
            this.directLink = 'contract-details';
            this.key = 1;
        }
        else {
            this.directLink = 'contract-details-for-learner';
            this.key = 0;
        }

        this.loadHistoryData(0);
        this.loadExpiredData(0);
        this.loadPendingData(0);
        this.loadActiveContracts(0);
    }

    loadHistoryData(page) {
        let option = {
            id: JSON.parse(localStorage.getItem('user')).user.loginUser.id,
            key: this.key,
            page,
        }
        ts.getContracts(option)
            .then(res => {
                let total = Math.ceil(Number.parseInt(res.info.total) / 4);
                if (total === 0) total = 1;
                this.setState({
                    contracts: res.info.data,
                    totalPage: total,
                })
            })
            .catch(err => {
                console.log(err);
                alert('Sorry but our connection to server is not available now');
                history.push('/');
            })
    }

    loadExpiredData(page) {
        let option = {
            id: JSON.parse(localStorage.getItem('user')).user.loginUser.id,
            key: this.key,
            page,
        }
        ts.getExpiredContracts(option)
            .then(res => {
                let total = Math.ceil(Number.parseInt(res.info.total) / 4);
                if (total === 0) total = 1;
                this.setState({
                    expiredContracts: res.info.data,
                    totalExpiredPage: total,
                })
            })
            .catch(err => {
                console.log(err);
                alert('Sorry but our connection to server is not available now');
                history.push('/');
            })
    }

    loadPendingData(page) {
        let option = {
            id: JSON.parse(localStorage.getItem('user')).user.loginUser.id,
            key: this.key,
            page,
        }
        ts.getPendingContracts(option)
            .then(res => {
                let total = Math.ceil(Number.parseInt(res.info.total) / 4);
                if (total === 0) total = 1;
                this.setState({
                    pendingContracts: res.info.data,
                    totalPendingPage: total,
                })
            })
            .catch(err => {
                console.log(err);
                alert('Sorry but our connection to server is not available now');
                history.push('/');
            })
    }

    loadActiveContracts(page) {
        let option = {
            id: JSON.parse(localStorage.getItem('user')).user.loginUser.id,
            key: this.key,
            page,
        }
        ts.getActiveContracts(option)
            .then(res => {
                let total = Math.ceil(Number.parseInt(res.info.total) / 4);
                if (total === 0) total = 1;
                this.setState({
                    activeContracts: res.info.data,
                    totalContractPage: total,
                })
            })
            .catch(err => {
                console.log(err);
                alert('Sorry but our connection to server is not available now');
                history.push('/');
            })
    }

    // History
    generateComments() {
        let content = [];
        for (let e of this.state.contracts) {
            content.push(
                <div className="px-4 pb-4 pt-1" key={e.id}>
                    <div className="row my-2">
                        {this.isTutor
                            ?
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Tutor:</span>
                                <span className='col-8'>{e.tutor}</span>
                            </div>
                            :
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Learner:</span>
                                <span className='col-8'>{e.learner}</span>
                            </div>
                        }
                        <div className='col-6 row'>
                            <NavLink className='btn btn-primary font-weight-bold w-100 text-center cursor-pointer'
                                to={`/${this.directLink}/id=${e.id}`}>
                                Detail
                            </NavLink>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Rating:</span>
                            <span className='col-8'>{e.rating}/10 <i className="fa fa-star text-warning"></i></span>
                        </div>
                        <div className='col-6 row'>

                            <span className='text-primary font-weight-bold col-4'>Subject:</span>
                            <span className='col-8'>{e.major_name}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date start:</span>
                            <span className='col-6'>{e.StartDate}</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date end:</span>
                            <span className='col-6'>{e.EndDate}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Status:</span>
                            <span className='text-dark font-weight-bold col-8'>History</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Bill:</span>
                            <span className='col-8'>$&nbsp;{e.totalPrice}</span>
                        </div>
                    </div>
                    <div className="history-comment text-wrap mt-2">
                        <span className='text-primary font-weight-bold'>Description: </span>
                        <span className='ml-5 p-2'>{e.description}</span>
                    </div>
                </div>
            );
        }
        return content;
    }

    // Expired
    generateExpiredContracts() {
        let content = [];
        for (let e of this.state.expiredContracts) {
            content.push(
                <div className="px-4 pb-4 pt-1" key={e.id}>
                    <div className="row my-2">
                        {this.isTutor
                            ?
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Learner:</span>
                                <span className='col-8'>{e.learner}</span>
                            </div>
                            :
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Tutor:</span>
                                <span className='col-8'>{e.tutor}</span>
                            </div>
                        }
                        <div className='col-6 row'>
                            <NavLink className='btn btn-primary font-weight-bold w-100 text-center cursor-pointer'
                                to={`/${e.directLink}/id=${e.id}`}>
                                Detail
                            </NavLink>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Rating:</span>
                            <span className='col-8'>{e.rating}/10 <i className="fa fa-star text-warning"></i></span>
                        </div>
                        <div className='col-6 row'>

                            <span className='text-primary font-weight-bold col-4'>Subject:</span>
                            <span className='col-8'>{e.major_name}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date start:</span>
                            <span className='col-6'>{e.StartDate}</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date end:</span>
                            <span className='col-6'>{e.EndDate}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Status:</span>
                            <span className='text-warning font-weight-bold col-8'>Expired</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Bill:</span>
                            <span className='col-8'>$&nbsp;{e.totalPrice}</span>
                        </div>
                    </div>
                    <div className="history-comment text-wrap mt-2">
                        <span className='text-primary font-weight-bold'>Description: </span>
                        <span className='ml-5 p-2'>{e.description}</span>
                    </div>
                </div>
            );
        }
        return content;
    }

    // Pending
    generatePendingContracts() {
        let content = [];
        for (let e of this.state.pendingContracts) {
            content.push(
                <div className="px-4 pb-4 pt-1" key={e.id}>
                    <div className="row my-2">
                        {this.isTutor
                            ?
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Learner:</span>
                                <span className='col-8'>{e.learner}</span>
                            </div>
                            :
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Tutor:</span>
                                <span className='col-8'>{e.tutor}</span>
                            </div>
                        }
                        <div className='col-6 row'>
                            <NavLink className='btn btn-primary font-weight-bold w-100 text-center cursor-pointer'
                                to={`/${this.directLink}/id=${e.id}`}>
                                Detail
                            </NavLink>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Rating:</span>
                            <span className='col-8'>{e.rating}/10 <i className="fa fa-star text-warning"></i></span>
                        </div>
                        <div className='col-6 row'>

                            <span className='text-primary font-weight-bold col-4'>Subject:</span>
                            <span className='col-8'>{e.major_name}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date start:</span>
                            <span className='col-6'>{e.StartDate}</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date end:</span>
                            <span className='col-6'>{e.EndDate}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Status:</span>
                            <span className='text-danger font-weight-bold col-8'>Pending</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Bill:</span>
                            <span className='col-8'>$&nbsp;{e.totalPrice}</span>
                        </div>
                    </div>
                    <div className="history-comment text-wrap mt-2">
                        <span className='text-primary font-weight-bold'>Description: </span>
                        <span className='ml-5 p-2'>{e.description}</span>
                    </div>
                </div>
            );
        }
        return content;
    }

    // Active
    generateActiveContracts() {
        let content = [];
        for (let e of this.state.activeContracts) {
            content.push(
                <div className="px-4 pb-4 pt-1" key={e.id}>
                    <div className="row my-2">
                        {this.isTutor
                            ?
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Learner:</span>
                                <span className='col-8'>{e.learner}</span>
                            </div>
                            :
                            <div className='col-6 row'>
                                <span className='text-primary font-weight-bold col-4'>Tutor:</span>
                                <span className='col-8'>{e.tutor}</span>
                            </div>
                        }
                        <div className='col-6 row'>
                            <NavLink className='btn btn-primary font-weight-bold w-100 text-center cursor-pointer'
                                to={`/${this.directLink}/id=${e.id}`}>
                                Detail
                            </NavLink>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Rating:</span>
                            <span className='col-8'>{e.rating}/10 <i className="fa fa-star text-warning"></i></span>
                        </div>
                        <div className='col-6 row'>

                            <span className='text-primary font-weight-bold col-4'>Subject:</span>
                            <span className='col-8'>{e.major_name}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date start:</span>
                            <span className='col-6'>{e.StartDate}</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-6'>Date end:</span>
                            <span className='col-6'>{e.EndDate}</span>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Status:</span>
                            <span className='text-success font-weight-bold col-8'>Active</span>
                        </div>
                        <div className='col-6 row'>
                            <span className='text-primary font-weight-bold col-4'>Bill:</span>
                            <span className='col-8'>${e.totalPrice}</span>
                        </div>
                    </div>
                    <div className="history-comment text-wrap mt-2">
                        <span className='text-primary font-weight-bold'>Description: </span>
                        <span className='ml-5 p-2'>{e.description}</span>
                    </div>
                </div>
            );
        }
        return content;
    }

    // History Paging
    onPagi(pageNavigate) {
        if (pageNavigate !== this.state.page && pageNavigate >= 0 && pageNavigate < this.state.totalPage) {
            this.setState({
                page: pageNavigate,
            })

            this.loadHistoryData(pageNavigate);
        }
    }

    // Pending Paging
    onPendingPagi(pageNavigate) {
        if (pageNavigate !== this.state.pendingPage && pageNavigate >= 0 && pageNavigate < this.state.totalPendingPage) {
            this.setState({
                pendingPage: pageNavigate,
            })

            this.loadPendingData(pageNavigate);
        }
    }

    // Expired Paging
    onExpiredPagi(pageNavigate) {
        if (pageNavigate !== this.state.expiredPage && pageNavigate >= 0 && pageNavigate < this.state.totalExpiredPage) {
            this.setState({
                expiredPage: pageNavigate,
            })

            this.loadExpiredData(pageNavigate);
        }
    }

    // Active Paging
    onContractPagi(pageNavigate) {
        if (pageNavigate !== this.state.contractPage && pageNavigate >= 0 && pageNavigate < this.state.totalContractPage) {
            this.setState({
                contractPage: pageNavigate,
            })

            this.loadActiveContracts(pageNavigate);
        }
    }

    render() {
        var PendingBtn = '';
        var ActivedBtn = '';
        var ExpiredBtn = '';
        var HistoryBtn = '';

        if (this.state.tab === 1) {
            ActivedBtn = 'nav-link text-white cursor-pointer font-weight-bold bg-success';
            ExpiredBtn = 'nav-link text-warning cursor-pointer font-weight-bold';
            HistoryBtn = 'nav-link text-dark cursor-pointer font-weight-bold';
            PendingBtn = 'nav-link text-danger cursor-pointer font-weight-bold';
        }
        else if (this.state.tab === 2) {
            ActivedBtn = 'nav-link text-success cursor-pointer font-weight-bold';
            ExpiredBtn = 'nav-link text-white cursor-pointer font-weight-bold bg-warning';
            HistoryBtn = 'nav-link text-dark cursor-pointer font-weight-bold';
            PendingBtn = 'nav-link text-danger cursor-pointer font-weight-bold';
        }
        else if (this.state.tab === 4) {
            ActivedBtn = 'nav-link text-success cursor-pointer font-weight-bold';
            ExpiredBtn = 'nav-link text-warning cursor-pointer font-weight-bold';
            HistoryBtn = 'nav-link text-dark cursor-pointer font-weight-bold';
            PendingBtn = 'nav-link text-white cursor-pointer font-weight-bold bg-danger';
        }
        else {
            ActivedBtn = 'nav-link text-success cursor-pointer font-weight-bold';
            ExpiredBtn = 'nav-link text-warning cursor-pointer font-weight-bold';
            HistoryBtn = 'nav-link text-white cursor-pointer font-weight-bold bg-dark';
            PendingBtn = 'nav-link text-danger cursor-pointer font-weight-bold';
        }

        return (

            <div className='row'>
                <div className='col-2 border-right border-secondary'>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <div className={PendingBtn} onClick={() => { if (this.state.tab !== 4) this.setState({ tab: 4 }) }}>Pending</div>
                        </li>
                        <li className="nav-item">
                            <div className={ActivedBtn} onClick={() => { if (this.state.tab !== 1) this.setState({ tab: 1 }) }}>Actived</div>
                        </li>
                        <li className="nav-item">
                            <div className={ExpiredBtn} onClick={() => { if (this.state.tab !== 2) this.setState({ tab: 2 }) }}>Expired</div>
                        </li>
                        <li className="nav-item">
                            <div className={HistoryBtn} onClick={() => { if (this.state.tab !== 3) this.setState({ tab: 3 }) }}>History</div>
                        </li>
                    </ul>
                </div>
                <div className='col-10'>
                    {this.state.tab === 1
                        ?
                        <div>
                            {/* user comment */}
                            <div className="bg-light mx-auto mb-2">

                                {this.generateActiveContracts()}

                            </div>
                            {/* pagination */}
                            <nav className="w-75 mx-auto mb-4">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item" onClick={() => this.onContractPagi(0)}>
                                        <a className="page-link cursor-pointer">&lt;&lt;</a>
                                    </li>
                                    <li className="page-item" onClick={() => this.onContractPagi(this.state.contractPage - 1)}>
                                        <a className="page-link cursor-pointer">&lt;</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link cursor-pointer">
                                            {this.state.contractPage + 1} / {this.state.totalContractPage}
                                        </a>
                                    </li>
                                    <li className="page-item" onClick={() => this.onContractPagi(this.state.contractPage + 1)}>
                                        <a className="page-link cursor-pointer">&gt;</a>
                                    </li>
                                    <li className="page-item" onClick={() => this.onContractPagi(this.state.totalContractPage - 1)}>
                                        <a className="page-link cursor-pointer">&gt;&gt;</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        : (this.state.tab === 2
                            ?
                            <div>
                                {/* user comment */}
                                <div className="bg-light mx-auto mb-2">

                                    {this.generateExpiredContracts()}

                                </div>
                                {/* pagination */}
                                <nav className="w-75 mx-auto mb-4">
                                    <ul className="pagination justify-content-end">
                                        <li className="page-item" onClick={() => this.onExpiredPagi(0)}>
                                            <a className="page-link cursor-pointer">&lt;&lt;</a>
                                        </li>
                                        <li className="page-item" onClick={() => this.onExpiredPagi(this.state.expiredPage - 1)}>
                                            <a className="page-link cursor-pointer">&lt;</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link cursor-pointer">
                                                {this.state.expiredPage + 1} / {this.state.totalExpiredPage}
                                            </a>
                                        </li>
                                        <li className="page-item" onClick={() => this.onExpiredPagi(this.state.expiredPage + 1)}>
                                            <a className="page-link cursor-pointer">&gt;</a>
                                        </li>
                                        <li className="page-item" onClick={() => this.onExpiredPagi(this.state.totalExpiredPage - 1)}>
                                            <a className="page-link cursor-pointer">&gt;&gt;</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            : (this.state.tab === 3
                                ?
                                <div>
                                    {/* user comment */}
                                    <div className="bg-light mx-auto mb-2">

                                        {this.generateComments()}

                                    </div>
                                    {/* pagination */}
                                    <nav className="w-75 mx-auto mb-4">
                                        <ul className="pagination justify-content-end">
                                            <li className="page-item" onClick={() => this.onPagi(0)}>
                                                <a className="page-link cursor-pointer">&lt;&lt;</a>
                                            </li>
                                            <li className="page-item" onClick={() => this.onPagi(this.state.page - 1)}>
                                                <a className="page-link cursor-pointer">&lt;</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link cursor-pointer">
                                                    {this.state.page + 1} / {this.state.totalPage}
                                                </a>
                                            </li>
                                            <li className="page-item" onClick={() => this.onPagi(this.state.page + 1)}>
                                                <a className="page-link cursor-pointer">&gt;</a>
                                            </li>
                                            <li className="page-item" onClick={() => this.onPagi(this.state.totalPage - 1)}>
                                                <a className="page-link cursor-pointer">&gt;&gt;</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                :
                                <div>
                                    {/* user comment */}
                                    <div className="bg-light mx-auto mb-2">

                                        {this.generatePendingContracts()}

                                    </div>
                                    {/* pagination */}
                                    <nav className="w-75 mx-auto mb-4">
                                        <ul className="pagination justify-content-end">
                                            <li className="page-item" onClick={() => this.onPendingPagi(0)}>
                                                <a className="page-link cursor-pointer">&lt;&lt;</a>
                                            </li>
                                            <li className="page-item" onClick={() => this.onPendingPagi(this.state.pendingPage - 1)}>
                                                <a className="page-link cursor-pointer">&lt;</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link cursor-pointer">
                                                    {this.state.pendingPage + 1} / {this.state.totalPendingPage}
                                                </a>
                                            </li>
                                            <li className="page-item" onClick={() => this.onPendingPagi(this.state.pendingPage + 1)}>
                                                <a className="page-link cursor-pointer">&gt;</a>
                                            </li>
                                            <li className="page-item" onClick={() => this.onPendingPagi(this.state.totalPendingPage - 1)}>
                                                <a className="page-link cursor-pointer">&gt;&gt;</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            ))}
                </div>
            </div>

        )
    }
}
