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
                <div className='title_container'>
                    <p className='title'>
                      Meeting ID:  {this.props.title}
                    </p>
                </div>
                <div className='start_time_container'>
                    <p className='start_time'>
                        {this.props.start_time}
                    </p>
                </div>
                </div>
                <Expand open={this.state.open}>
                    <div className='item-expand'>
                        <div className='diagram-cont'>

                                <Line
                                      data={{
                                          labels: this.props.labels,
                                          datasets: [
                                              {
                                                  type: "line",
                                                  label: "Active Pleasant",
                                                  fill: false,
                                                  lineTension: 0.5,
                                                  backgroundColor: '#25F70C',
                                                  borderColor: '#25F70C',
                                                  borderWidth: 1,
                                                  pointRadius: 0.1,
                                                  data: this.props.data[0],
                                                  tension: 0.1
                                              }, {
                                                  type: "line",
                                                  label: "Active Unpleasant",
                                                  fill: false,
                                                  lineTension: 0.5,
                                                  backgroundColor: 'red',
                                                  borderColor: 'red',
                                                  borderWidth: 1.8,
                                                  pointRadius: 0.1,
                                                  data: this.props.data[1]
                                              }, {
                                                  type: "line",
                                                  label: "Inactive Unpleasant",
                                                  fill: false,
                                                  lineTension: 0.5,
                                                  backgroundColor: '#F59800',
                                                  borderColor: '#F59800',
                                                  borderWidth: 1.8,
                                                  pointRadius: 0.1,
                                                  data: this.props.data[2]
                                              }, {
                                                  type: "line",
                                                  label: "Inactive Pleasant",
                                                  fill: false,
                                                  lineTension: 0.5,
                                                  backgroundColor: '#007EF5',
                                                  borderColor: '#007EF5',
                                                  borderWidth: 1,
                                                  pointRadius: 0.1,
                                                  data: this.props.data[3]
                                              }, {
                                                  type: "line",
                                                  label: "No Face",
                                                  fill: false,
                                                  lineTension: 0.5,
                                                  backgroundColor: 'rgba(128,128,128,1)',
                                                  borderColor: 'rgba(128,128,128,1)',
                                                  borderWidth: 1.5,
                                                  pointRadius: 0.1,
                                                  data: this.props.data[4]
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
                                              xAxis : [
                                                  {
                                                      ticks: {
                                                          autoSkip: true,
                                                          maxTicksLimit:10
                                                      },
                                                  }
                                              ]
                                          }
                                      }}/>

                        </div>

                        <div className='btnContainer'>
                            <div className='btnListOfUsers'>
                                <Link className='usersLink' style={{textDecoration: 'none', color: 'white'}}
                                      to={'/usersPage/' + this.props.title}>Details</Link>
                            </div>
                        </div>
                    </div>
                </Expand>
            </React.Fragment>
        );
    }
}

export default MeetingsListItems;