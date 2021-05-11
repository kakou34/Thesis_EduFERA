import React from 'react';
import './meetings-list-items.styles.scss';
import Expand from 'react-expand-animated';
import CustomButton from '../custom-button/custom-button.component'
import {Link} from 'react-router-dom'
import {Line} from "react-chartjs-2"

//const ListItem = ({title}) => (

//<div className='list-item'>
//   <p className='title'>{title}</p>
//  </div>

//);

class MeetingsListItems extends React.Component {
    state = {open: false};

    toggle = () => {
        this.setState(prevState => ({open: !prevState.open}));
    };

    render() {
        return (
            <React.Fragment>
                <div className='list-item' onClick={this.toggle}>
                    <p className='title'>
                        {this.props.title}
                    </p>
                </div>
                <Expand open={this.state.open}>
                    <div className='item-expand'>
                        <div className='diagram-container'>
                            <div className='diagram'>
                                <Line   data={{
                                            labels: [],
                                            datasets: [
                                                {
                                                    type: "line",
                                                    label: "Active Pleasant",
                                                    fill: false,
                                                    lineTension: 0.5,
                                                    backgroundColor: 'rgba(75,192,192,1)',
                                                    borderColor: 'rgba(0,0,0,1)',
                                                    borderWidth: 0.5,
                                                    data: []
                                                }, {
                                                    type: "line",
                                                    label: "Active Unpleasant",
                                                    fill: false,
                                                    lineTension: 0.5,
                                                    backgroundColor: 'rgba(90,20,20,1)',
                                                    borderColor: 'rgba(0,0,0,1)',
                                                    borderWidth: 0.5,
                                                    data: []
                                                }, {
                                                    type: "line",
                                                    label: "Inactive Unpleasant",
                                                    fill: false,
                                                    lineTension: 0.5,
                                                    backgroundColor: 'rgba(0,10,80,1)',
                                                    borderColor: 'rgba(0,0,0,1)',
                                                    borderWidth: 0.5,
                                                    data: []
                                                }, {
                                                    type: "line",
                                                    label: "Inactive Pleasant",
                                                    fill: false,
                                                    lineTension: 0.5,
                                                    backgroundColor: 'rgba(0,150,0,1)',
                                                    borderColor: 'rgba(0,0,0,1)',
                                                    borderWidth: 0.5,
                                                    data: []
                                                }, {
                                                    type: "line",
                                                    label: "No Face",
                                                    fill: false,
                                                    lineTension: 0.5,
                                                    backgroundColor: 'rgba(128,128,128,1)',
                                                    borderColor: 'rgba(0,0,0,1)',
                                                    borderWidth: 0.5,
                                                    data: []
                                                }
                                            ]
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            tooltips: {
                                                enabled: true
                                            },
                                            scales: {
                                                xAxes: [
                                                    {
                                                        ticks: {
                                                            autoSkip: true,
                                                            maxTicksLimit: 10
                                                        }
                                                    }
                                                ]
                                            }
                                        }}/>
                            </div>
                        </div>

                        <div className='btnContainer'>
                            <div className='btnListOfUsers'>
                                <Link className='usersLink' style={{textDecoration: 'none', color: 'white'}}
                                      to="/usersPage">Students's details</Link>
                            </div>
                        </div>
                    </div>
                </Expand>
            </React.Fragment>
        );
    }
}

export default MeetingsListItems;