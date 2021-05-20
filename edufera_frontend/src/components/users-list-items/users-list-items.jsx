import React from 'react';
import './users-list-items.styles.scss';
import Expand from 'react-expand-animated';
import {Line} from "react-chartjs-2";


class UsersListItem extends React.Component {
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
                            <Line
                                data={{
                                    labels: this.props.time_stamps,
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
                                            data: this.props.emotions,
                                            tension: 1
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
                                        y: {
                                            type: 'category',
                                            labels: ['Positively-Active',
                                                     'Negatively-Active',
                                                     'Negatively-Passive',
                                                     'Positively-Passive',
                                                     'No Face'],
                                        },

                                    }
                                }}/>
                        </div>
                        {/*<div className='piechart-container'>*/}
                        {/*    <div className='piechart'>Here goes piechart</div>*/}
                        {/*</div>*/}
                    </div>
                </Expand>
            </React.Fragment>
        );
    }
}

export default UsersListItem;