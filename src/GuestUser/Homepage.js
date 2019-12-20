import React, { Component } from 'react'

import SecondaryNavBar from '../Utilities/Components/SecondaryNavBar'
import CategoriesList from '../Utilities/Components/CategoriesList'
import maj from '../Services/MajorService';

export default class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            majorList: [],
        }

        maj.getTop().then(data => {
            console.log(data);
            this.setState({ majorList: data });
            // console.log(this.majorsSelector);
        })
    }

    GenerateMajorCards = () => {
        let content = [];
        for (let i of this.state.majorList) {
            content.push(
                <div className="col-4 my-4">
                    <div className="card card-size border-0 m-auto">
                        <img src={i.icoUrl} height={300} width={300} class="card-img-top" />
                        <div className="card-body bg-light">
                            <a href="#" class="btn btn-light">{i.name}</a>
                        </div>
                    </div>
                </div>
            )
        }
        return content;
    }

    render() {
        return (
            <div>
                <div className="cat-bar">
                    <CategoriesList majorList={this.state.majorList}/>
                </div>
                
                <div id="carouselExampleCaptions" className="carousel slide container-fluid mx-0 px-0" data-ride="carousel">
                    {/*Carousel*/}
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://e2.com.vn/wp-content/uploads/2019/08/group-class-recolor.jpg" class="d-block m-auto" alt="public\logo512.png"
                                    />
                            <div className="carousel-caption d-none d-md-block bg-dark">
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://s3-eu-west-1.amazonaws.com/resources.firsttutors.com/1/ecd1886fad9f0b06a5e35dd1344fe3f3.jpg" class="d-block m-auto" alt="public\logo512.png" />
                            <div className="carousel-caption d-none d-md-block bg-dark">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://e2.com.vn/wp-content/uploads/2019/08/group-class-recolor.jpg" class="d-block m-auto" alt="public\logo512.png" />
                            <div className="carousel-caption d-none d-md-block bg-dark">
                                <h5>Third slide label</h5>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>

                </div>
                


                <div className="container">                    
                    <div className="pl-4 pt-4 mb-0 pb-1 text-white font-weight-bold">
                        Find your major or subject ...
                    </div>
                    <div className="row pb-4 mt-0 pt-0 justify-items-center text-center"> 
                        {this.GenerateMajorCards()}
                    </div>
                    <div className="pl-4 py-4 text-white font-weight-bold text-center">
                        Don't you see what you're looking for? &nbsp;
                        <a className="text-warning" href="#">See all subject</a>
                    </div>
                </div>

            </div>
        )
    }
}
