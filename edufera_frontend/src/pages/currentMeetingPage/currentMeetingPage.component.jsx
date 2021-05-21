import React, {useEffect, useState} from 'react';
import './currentMeetingPage.syles.scss';
import {socket} from '../../App'
import axios from "axios";
import {PolarArea, Pie} from "react-chartjs-2";


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [status, setStatus] = useState('Online');
    const [time, setTime] = useState('15:00:00');
    const [data, setData] = useState([5, 3, 5, 4, 0]);

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
            console.log('data received:');
            console.log(resp);
            setTime(resp.time_stamp);
            setData(resp.results);
        });
    }, [])


    return (
        <div className='current'>
            <div className='meetingContainer'>
            <div style={{
            display:'flex',
            flexDirection: 'row',
            width:'100%',
            justifyContent: 'space-between',


            }}>
            <div className='txt-container'>
                    <p className='txt'>Time: {time}</p>
                </div>
                <div className='txt-container'>
                    <p className='txt'>Status: {status}</p>
                </div>
                </div>
                <div className='diagramCurrent-cont'>
                    <PolarArea
                        data={
                            {
                                labels: ['Active Pleasant',
                                    'Active Unpleasant',
                                    'Inactive Unpleasant',
                                    'Inactive Pleasant',
                                    'No Face'],
                                datasets: [
                                    {
                                        label: time,
                                        data: data,
                                        backgroundColor: [
                                            'red',
                                            '#27E10D',
                                            'orange',
                                            '#11DBCC',
                                            'grey',
                                        ],
                                        borderWidth: 1.5,
                                    },
                                ],
                            }
                        }
                        options={{
                            animation: {
                                duration: 0
                            },
                            chart: {
                                width: 200
                            },
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: {
                                    boxHeight:20,
                                    boxWidth:40,
                                    color: 'black',
                                    padding: 10
                                    }


                                }
                            }

                        }}
                    />
                </div>

            </div>
        </div>
    )
}


export default CurrentMeetingPage;