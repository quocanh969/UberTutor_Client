import React, { Component } from 'react';
import ZingChart from "zingchart-react";
import { ts } from '../../Services/TutorService';
import { NavLink } from 'react-router-dom';

export default class TutorSummary extends Component {
    arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    constructor(props)
    {
        super(props);
        this.state = {
            contracts: [],
            month: [],
            series: [{
                text: "Income",
                values:this.arr,
            }],
            config: {
              backgroundColor: "#ecf2f6",
              graphset: [
                {
                  type: "line",
                  backgroundColor: "#fff",
                  borderColor: "#dae5ec",
                  borderWidth: "1px",
                  width: "100%",
                  height: "100%",
                  x: "0",
                  y: "0",
                  title: {
                    text: "Year's Income",
                    marginTop: "7px",
                    marginLeft: "12px",
                    backgroundColor: "none",
                    fontColor: "#707d94",
                    fontFamily: "Arial",
                    fontSize: "11px",
                    shadow: false,
                    textAlign: "left"
                  },
                  plot: {
                    animation: {
                      delay: 500,
                      effect: "ANIMATION_SLIDE_LEFT"
                    }
                  },
                  plotarea: {
                    margin: "50px 25px 70px 46px"
                  },
                  scaleY: {
                    values: "0:500000:50000",
                    //values: "0:100:25",
                    guide: {
                      alpha: 0.75,
                      lineColor: "#d2dae2",
                      lineStyle: "solid",
                      lineWidth: "1px"
                    },
                    item: {
                      paddingRight: "5px",
                      fontColor: "#8391a5",
                      fontFamily: "Arial",
                      fontSize: "10px"
                    },
                    lineColor: "none",
                    tick: {
                      visible: false
                    }
                  },
                  scaleX: {
                    values: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec"
                    ],
                    guide: {
                      visible: true
                    },
                    item: {
                      paddingTop: "5px",
                      fontColor: "#8391a5",
                      fontFamily: "Arial",
                      fontSize: "10px"
                    },
                    lineColor: "#d2dae2",
                    lineWidth: "2px",
                    tick: {
                      lineColor: "#d2dae2",
                      lineWidth: "1px"
                    }
                  },
                  legend: {
                    margin: "auto auto 15 auto",
                    backgroundColor: "none",
                    borderWidth: "0px",
                    item: {
                      margin: "0px",
                      padding: "0px",
                      fontColor: "#707d94",
                      fontFamily: "Arial",
                      fontSize: "9px"
                    },
                    layout: "x4",
                    marker: {
                      type: "match",
                      padding: "3px",
                      fontFamily: "Arial",
                      fontSize: "10px",
                      lineWidth: "2px",
                      showLine: "true",
                      size: 4
                    },
                    shadow: false
                  },
                  scaleLabel: {
                    padding: "5px 10px",
                    backgroundColor: "#707d94",
                    borderRadius: "5px",
                    fontColor: "#ffffff",
                    fontFamily: "Arial",
                    fontSize: "10px"
                  },
                  crosshairX: {
                    lineColor: "#707d94",
                    lineWidth: "1px",
                    plotLabel: {
                      padding: "5px 10px",
                      alpha: 1,
                      borderRadius: "5px",
                      fontColor: "#000",
                      fontFamily: "Arial",
                      fontSize: "10px",
                      shadow: false
                    }
                  },
                  tooltip: {
                    visible: false
                  },
                  series: [
                    {
                      text: "Income",
                      values: this.arr,
                      lineColor: "#4dbac0",
                      lineWidth: "2px",
                      marker: {
                        backgroundColor: "#fff",
                        borderColor: "#36a2a8",
                        borderWidth: "1px",
                        shadow: false,
                        size: 3
                      },
                      palette: 0,
                      shadow: false
                    },
                  ]
                }
              ]
            }
          };

        this.loadIncomeByMonthData(2020);
        this.loadIncomeReport();
    }

    loadIncomeByMonthData(year) {
        ts.getStatisticByYear(JSON.parse(localStorage.getItem('user')).user.loginUser.id, year)
        .then(res=>{
          console.log(res);
            if(res.code === 1)
            {                
                for(let e of res.info.data)
                {
                    this.arr[e.idMonth - 1] = e.total;
                }
                let temp = this.state.config;
                temp.graphset[0].series.values = this.arr;
                this.setState({month: res.info.data, series: {text: "Income",values: this.arr}});
            }
            else
            {
                console.log(res.info.message);
                alert('There was error when connect to server');
            }
        })
        .catch(err=>{
            console.log(err);
            alert('There was error when connect to server');
        })
    }

    loadIncomeReport() {
      ts.getIncomeReport(JSON.parse(localStorage.getItem('user')).user.loginUser.id, 0)
      .then(res=>{
        if(res.code === 1)
        {
          this.setState({contracts: res.info.data});
        }
        else
        {
          console.log(res.info.message);
          alert('There was error when connect to server');
        }
      })
      .catch(err=>{
        console.log(err);
        alert('There was error when connect to server');
      })
    }

    generateIncomeTable() {
      let content = [];
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      for(let i = 0; i<this.state.month.length;i++)
      {
          let e = this.state.month[i];
          content.push(
              <tr key={i}>
                  <th scope="row">{i+1}</th>
                  <td>{months[i]}</td>
                  <td>$&nbsp;{e.total}</td>                    
              </tr>
          );
      }
      return content;
    }

    generateHistoryContract() {
      let content = [];
      for(let e of this.state.contracts)
      {
          content.push(
            <div className='border border-dark rounded p-3 my-2'>
              <div className='row pr-3'>
                <label className='col-3 pt-2 text-dark font-weight-bold'>Id contract: </label>
                <span className='col-3 pt-2'>{e.id}</span>
                <NavLink to={`/contract-details/id=${e.id}`} className='col-6 btn btn-dark font-weight-bold cursor-pointer'>Detail</NavLink>
              </div>
              <div className='row'>
                <label className='col-3 text-dark font-weight-bold'>Total price: </label>
                <span className='col-9'>$&nbsp;{e.totalPrice}</span>
              </div>
              <div className='row'>
                <label className='col-3 text-dark font-weight-bold'>Feedback</label>
                <span className='col-9 text-truncate'>{e.feedback}</span>
              </div>
              <div className='row'>
                <label className='col-3 text-dark font-weight-bold'>DStart:</label>
                <span className='col-3'>{e.StartDate}</span>
                <label className='col-3 text-dark font-weight-bold'>DEnd:</label>
                <span className='col-3'>{e.EndDate}</span>
              </div>
            </div>        
          );
      }
      return content;
    }

    render() {
        return (
            <div className='mt-5 pt-5'>
                <div className='container bg-light'>
                    <h1 className='text-primary font-weight-bold text-center pt-3 mb-2'>STATISTIC</h1>
                    <div className='mt-3 mb-4'>
                        <label>Choose year:&nbsp;&nbsp;</label>
                        <input type='number' ref='year' min={2015} defaultValue={2020} onChange={e=>{this.loadIncomeByMonthData(e.target.value)}}></input>
                    </div>
                    <div className='px-3 my-3'>
                        <ZingChart data={this.state.config} series={this.state.series}/>
                    </div>
                    <div className='row my-5 pb-5'>
                        <div className='col-6'>
                          <table className="table rounded-top">
                              <thead className="thead-dark">
                                  <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Month</th>
                                      <th scope="col">Income</th>                                    
                                  </tr>
                              </thead>
                              <tbody>
                                  {this.generateIncomeTable()}
                              </tbody>
                          </table>
                          <span className='mt-3 pt-3 mb-4 pt-4'>*Income table of year {!this.refs.year ? '2020' : this.refs.year.value}</span>
                        </div>
                        <div className='col-6'>
                          <div className="card">
                            <div className="card-header bg-dark text-white font-weight-bold">
                              History Contracts
                            </div>
                            <div className="card-body">
                              {this.generateHistoryContract()}
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
