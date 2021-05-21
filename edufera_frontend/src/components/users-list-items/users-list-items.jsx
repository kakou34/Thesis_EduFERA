import React from 'react';
import './users-list-items.styles.scss';
import Expand from 'react-expand-animated';
import {Line} from "react-chartjs-2";
import 'chartjs-adapter-moment';


class UsersListItem extends React.Component {
    state = {open: false};

    toggle = () => {
        this.setState(prevState => ({open: !prevState.open}));
    };

    render() {
        return (
            <React.Fragment>
                {/*<div className='list-item' onClick={this.toggle}>*/}
                {/*    <p className='title'>*/}
                {/*        {this.props.title}*/}
                {/*    </p>*/}
                {/*</div>*/}
                <div className='list-item' onClick={this.toggle}>
                    <div className='title_container'>
                        <p className='title'>
                            User ID: {this.props.title}
                        </p>
                    </div>
                    <div className='name_container'>
                        <p className='name'>
                            {this.props.userName}
                        </p>
                    </div>
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
                                            // label: "Active Pleasant",
                                            fill: false,
                                            lineTension: 0.5,
                                            backgroundColor: function (context) {
                                                const index = context.dataIndex;
                                                const value = context.dataset.data[index];
                                                let color = '';
                                                if (value === 'Positively-Active') color = '#25F70C'
                                                else if (value === 'Negatively-Active') color = 'red'
                                                else if (value === 'Negatively-Passive') color = '#F59800'
                                                else if (value === 'Positively-Passive') color = '#007EF5'
                                                else color = 'rgba(128,128,128,1)'
                                                return color;
                                            },
                                            borderColor: 'gray',
                                            borderWidth: 1,
                                            pointRadius: 2.5,
                                            data: this.props.emotions,
                                            tension: 0
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    tooltips: {
                                        enabled: true
                                    },
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
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
                    </div>
                </Expand>
            </React.Fragment>
        );
    }
}

export default UsersListItem;