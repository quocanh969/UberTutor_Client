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
                <div class="col-4 my-4">
                    <div class="card card-size border-0 m-auto">
                        <img src={i.icoUrl} height={300} width={300} class="card-img-top" />
                        <div class="card-body bg-light">
                            <a href="#" class="btn btn-light">{i.name}</a>
                        </div>
                    </div>
                </div>
            )
        }
        console.log(content);
        return content;
    }

    render() {
        return (
            <div>
                <div><SecondaryNavBar /></div>
                <div className="cat-bar">
                    <CategoriesList majorList={this.state.majorList}/>
                </div>
                <div id="carouselExampleCaptions" class="carousel slide border-danger container-fluid" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://e2.com.vn/wp-content/uploads/2019/08/group-class-recolor.jpg" class="d-block w-75 m-auto" alt="public\logo512.png" />
                            <div class="carousel-caption d-none d-md-block bg-secondary">
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://s3-eu-west-1.amazonaws.com/resources.firsttutors.com/1/ecd1886fad9f0b06a5e35dd1344fe3f3.jpg" class="d-block w-75 m-auto" alt="public\logo512.png" />
                            <div class="carousel-caption d-none d-md-block bg-secondary">
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://e2.com.vn/wp-content/uploads/2019/08/group-class-recolor.jpg" class="d-block w-75 m-auto" alt="public\logo512.png" />
                            <div class="carousel-caption d-none d-md-block bg-secondary">
                                <h5>Third slide label</h5>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="container justify-items-center text-center">
                    <div class="row py-4">
                        {/* <div class="col">
                            <div class="card card-size m-auto">
                                <img src="" class="card-img-top" />
                                <div class="card-body bg-light">
                                    <a href="#" class="btn btn-light">Math</a>
                                </div>
                            </div>
                        </div> */}
                        {this.GenerateMajorCards()}
                        {/* <div class="col">
                            <div class="card card-size m-auto">
                                <img src="" class="card-img-top" />
                                <div class="card-body bg-light">
                                    <a href="#" class="btn btn-light">Physics</a>
                                </div>
                            </div>
                        </div>

                        
                        <div class="col">
                            <div class="card card-size m-auto">
                                <img src="" class="card-img-top" />
                                <div class="card-body bg-light">
                                    <a href="#" class="btn btn-light">Chemistry</a>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>

            </div>
        )
    }
}
