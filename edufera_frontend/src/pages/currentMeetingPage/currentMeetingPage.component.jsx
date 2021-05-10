import React, {useEffect, useState} from 'react';
import './currentMeetingPage.syles.scss';
import {socket} from '../../App'
import axios from "axios";
import {Line} from "react-chartjs-2";


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [status, setStatus] = useState('');
    // const [labels, setLabels] = useState(['0', '1', '2']);
    const [analysis, setAnalysis] = useState({
        'data': [[1, 2, 3], [5, 0, 1], [0, 8, 2], [8, 9, 1], [0, 0, 5]],
        'labels': ['0', '1', '2']
    });
    useEffect(() => {
        axios.get('http://localhost:5000/get_meeting_status', {params: {meeting_id: roomId}})
            .then(res => {
                setStatus(res.data.message);
            })
        socket.emit('join', {'room': roomId})
    }, [roomId])

    useEffect(() => {
        socket.on('meeting_started', (resp) => {
            console.log(resp.data)
            setStatus(resp.data)
        });

        socket.on('meeting_ended', (resp) => {
            console.log(resp.data)
            setStatus(resp.data)
        });
    }, []);

    useEffect(() => {
        socket.on('emotion_predicted', (resp) => {
            console.log(resp.time_stamp + ': ' + resp.value);
            const label = resp.time_stamp;
            let value = resp.value;
            // // const newLabels = labels;
            if(value === -1) value = 4;
            // // const i = newLabels.indexOf(label);
            // // console.log(labels);
            // // console.log(i);
            // // if(i === -1){
            // //     newLabels.push(label)
            // // }
            // // setLabels(newLabels);
            setAnalysis(prevState => {
                let newState = prevState;
                let i = prevState.labels.indexOf(label)
                if ( i === -1) {
                    return [...prevState, label];
                } else return prevState;
            })
        });
    }, [])


    return (
        <div className='current'>
            <div className='meetingContainer'>
                <div className='diagramCurrent-container'>
                    <Line
                        data={{
                            labels: analysis.labels,
                            datasets: [
                                {
                                    type: "line",
                                    label: "Active Pleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0.5,
                                    data: analysis.data[0]
                                }, {
                                    type: "line",
                                    label: "Active Unpleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(90,20,20,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0.5,
                                    data: analysis.data[1]
                                }, {
                                    type: "line",
                                    label: "Inactive Unpleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(0,10,80,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0.5,
                                    data: analysis.data[2]
                                }, {
                                    type: "line",
                                    label: "Inactive Pleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(0,150,0,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0.5,
                                    data: analysis.data[3]
                                }, {
                                    type: "line",
                                    label: "No Face",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(128,128,128,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0.5,
                                    data: analysis.data[4]
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
                <div className='txt-container'>
                    <p className='txt'>{status}</p>
                    <p className='txt'>Online Students:</p>
                    <p className='txt'>Offline Students:</p>
                </div>
            </div>
        </div>
    )
}


export default CurrentMeetingPage;