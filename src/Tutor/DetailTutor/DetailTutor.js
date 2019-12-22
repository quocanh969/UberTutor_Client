import React, { Component } from 'react';
import './DetailTutor.css';

export default class DetailTutor extends Component {

    constructor(props) {
        super(props);

        let id = this.props.match.params.id;        

        this.state = {
            tab: 1,
            user: {
                name: 'John Cena',
                avatarLink: '',
                id: id,
                role: 1,
                email: 'johncena@gmail.com',
                phone: '0325489125',
                gender: 0,
                major: 0,
                price: 0,
                levelTeaching: 0,
                area: 'Quận 4',
                successRate: 0,
                introduction: 'Tháng 2-1930, Đảng Cộng sản Việt Nam ra đời trong hoàn cảnh đất nước đang trong đêm đen nô lệ, nhân dân phải chịu cảnh một cổ đôi tròng, bị bần cùng hóa đến cao độ. Phong trào cách mạng trải nhiều khó khăn, thử thách và có lúc thoái trào. Nhưng ở tuổi mười lăm, Đảng đã lãnh đạo nhân dân cả nước làm cuộc Cách mạng tháng Tám thành công, lập nên nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.',
            },
        }


        //this.initData(id, role);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    initData(id, role) {
        // us.loadUserDetail({ id: id, role: role })
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ user: res.info.data });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    generateTagSkillBox() {
        if (this.state.user.role === 1) {
            return (
                <div className="profile-work rounded w-75 mt-0 mx-auto text-wrap">
                    <div className="text-center font-weight-bold">TAGs</div>
                    <hr />
                    <span className="text-primary p-1"><u>English</u></span>,
                    <span className="text-primary p-1"><u>Dynamic</u></span>,
                    <span className="text-primary p-1"><u>Pedagogica</u></span>,
                    <span className="text-primary p-1"><u>Algebra</u></span>,
                    <span className="text-primary p-1"><u>Geometry</u></span>
                </div>
            );
        }
        else {
            return null;
        }
    }

    render() {
        var accountInfoClass = "";
        var proInfoClass = "";
        var historyInfoClass = '';
        var accountInfoBtn = "";
        var proInfoBtn = "";
        var historyInfoBtn = '';
        console.log('render:');
        console.log(this.state.user);
        let ImgSrc = this.state.user.avatarLink;
        if (ImgSrc === null || ImgSrc === '') {
            ImgSrc = 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8';
        }

        let RoleStr = '';
        switch (this.state.user.levelTeaching) {
            case 0:
                {
                    RoleStr = 'PRIMARY TUTOR';
                    break;
                }
            case 1:
                {
                    RoleStr = 'SECONDARY TUTOR';
                    break;
                }
            case 2:
                {
                    RoleStr = 'HIGH SCHOOL TUTOR';
                    break;
                }
            case 3:
                {
                    RoleStr = 'COLLEAGE TUTOR';
                    break;
                }
            default: break;
        }

        if (this.state.tab === 1) {
            accountInfoBtn = 'nav-link active cursor-pointer';
            accountInfoClass = 'tab-pane fade show active';
            proInfoBtn = 'nav-link cursor-pointer';
            proInfoClass = 'tab-pane fade';
            historyInfoBtn = 'nav-link cursor-pointer';
            historyInfoClass = 'tab-pane fade';
        }
        else if (this.state.tab === 2) {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            proInfoBtn = 'nav-link cursor-pointer  active';
            proInfoClass = 'tab-pane fade show active';
            historyInfoBtn = 'nav-link cursor-pointer';
            historyInfoClass = 'tab-pane fade';
        }
        else {
            accountInfoBtn = 'nav-link cursor-pointer';
            accountInfoClass = 'tab-pane fade';
            proInfoBtn = 'nav-link cursor-pointer';
            proInfoClass = 'tab-pane fade';
            historyInfoBtn = 'nav-link cursor-pointer active';
            historyInfoClass = 'tab-pane fade show active';
        }

        return (
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-4">
                            <div className="profile-img mb-5">
                                <img src={ImgSrc}
                                    alt="avatar-user" />
                                <input type="file" name="file" ref="imgInput" className="d-none" />
                            </div>
                            {this.generateTagSkillBox()}
                        </div>

                        <div className="col-8">
                            <div className="profile-head">
                                <h5>
                                    {this.state.user.name.toUpperCase()}
                                </h5>
                                <h6 className="font-weight-bold">
                                    {RoleStr}
                                </h6>

                                <p className="proile-rating">EVALUATION : <span>8/10</span>&nbsp;<i className="fa fa-star text-warning"></i></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <div className={accountInfoBtn} id="home-tab" data-toggle="tab"
                                            role="tab" aria-controls="home" aria-selected="true"
                                            onClick={() => { this.setState({ tab: 1 }) }}
                                        >Account</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={proInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { this.setState({ tab: 2 }) }}
                                        >Profession</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={historyInfoBtn} id="profile-tab" data-toggle="tab"
                                            aria-controls="profile" aria-selected="false"
                                            onClick={() => { this.setState({ tab: 3 }) }}
                                        >History</div>
                                    </li>
                                </ul>
                            </div>


                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className={accountInfoClass} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Gender</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.gender}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={proInfoClass} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Major</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.major}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-9">
                                            <p>$ {this.state.user.price}/h</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Area</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.area}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Success Rate</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.successRate}%</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Introduction</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.state.user.introduction}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={historyInfoClass} id="profile" role="tabpanel" aria-labelledby="profile-tab">


                                    {/* user comment */}
                                    <div className="bg-light mx-auto mb-2">

                                        <div className="row p-4">
                                            <div className="col-2">
                                                <img src={`https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`}
                                                    alt="tutor avatar" className="w-100 m-1"></img>
                                            </div>
                                            <div className="col-10">
                                                <div className="row">
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Name:</span> Triple H</div>
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Subject:</span> Math</div>
                                                </div>
                                                <div>
                                                    <span className='text-primary font-weight-bold'>Evaluation:</span> 9.5/10 <i className="fa fa-star text-warning"></i>
                                                </div>
                                                <div className="row">
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Date start:</span> 26/10/2019</div>
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Date end:</span> 26/11/2019</div>
                                                </div>
                                                <div className="history-comment text-wrap">
                                                    <span className='text-primary font-weight-bold'>Comment: </span>Tháng 2-1930, Đảng Cộng sản Việt Nam ra đời trong hoàn cảnh đất nước đang trong đêm đen nô lệ, nhân dân phải chịu cảnh một cổ đôi tròng, bị bần cùng hóa đến cao độ. Phong trào cách mạng trải nhiều khó khăn, thử thách và có lúc thoái trào. Nhưng ở tuổi mười lăm, Đảng đã lãnh đạo nhân dân cả nước làm cuộc Cách mạng tháng Tám thành công, lập nên nhà nước dân chủ nhân dân đầu tiên ở Đông Nam Á.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row p-4">
                                            <div className="col-2">
                                                <img src={`https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`}
                                                    alt="tutor avatar" className="w-100 m-1"></img>
                                            </div>
                                            <div className="col-10">
                                                <div className="row">
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Name:</span> Triple H</div>
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Subject:</span> Math</div>
                                                </div>
                                                <div>
                                                    <span className='text-primary font-weight-bold'>Evaluation:</span> 9.5/10 <i className="fa fa-star text-warning"></i>
                                                </div>
                                                <div className="row">
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Date start:</span> 26/10/2019</div>
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Date end:</span> 26/11/2019</div>
                                                </div>
                                                <div className="history-comment text-wrap">
                                                    <span className='text-primary font-weight-bold'>Comment: </span>Tháng 2-1930, Đảng Cộng sản Việt Nam ra đời trong hoàn cảnh đất nước đang trong đêm đen nô lệ
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row p-4">
                                            <div className="col-2">
                                                <img src={`https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50a/p50x50/10645251_10150004552801937_4553731092814901385_n.jpg?_nc_cat=1&_nc_ohc=hnKkw-bKtIkAQlIhz4gzarCWd3tTja6CU5x12XZnI2YTuW9TiBuSlIBlQ&_nc_ht=scontent.xx&oh=64b6c755de54ecae67c9742219d23174&oe=5E7F1EA8`}
                                                    alt="tutor avatar" className="w-100 m-1"></img>
                                            </div>
                                            <div className="col-10">
                                                <div className="row">
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Name:</span> Triple H</div>
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Subject:</span> Math</div>
                                                </div>
                                                <div>
                                                    <span className='text-primary font-weight-bold'>Evaluation:</span> 9.5/10 <i className="fa fa-star text-warning"></i>
                                                </div>
                                                <div className="row">
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Date start:</span> 26/10/2019</div>
                                                    <div className='col-6'><span className='text-primary font-weight-bold'>Date end:</span> 26/11/2019</div>
                                                </div>
                                                <div className="history-comment text-wrap">
                                                    <span className='text-primary font-weight-bold'>Comment: </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* pagination */}
                                    <nav className="mx-auto mb-4">
                                        <ul className="pagination justify-content-end">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                            </div>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}
