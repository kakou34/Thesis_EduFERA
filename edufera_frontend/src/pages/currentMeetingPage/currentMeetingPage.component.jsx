import React, {useEffect, useState} from 'react';
import './currentMeetingPage.syles.scss';
import {socket} from '../../App'
import axios from "axios";
import {PolarArea} from "react-chartjs-2";


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [data, setData] = useState([0, 0, 0, 0, 0]);

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
                <div className='diagramCurrent-container'>
                    <PolarArea style={{height: 500, width: 500}}
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
                                                   'rgba(255, 99, 132, 0.8)',
                                                   'rgba(54, 162, 235, 0.8)',
                                                   'rgba(255, 206, 86, 0.8)',
                                                   'rgba(75, 192, 192, 0.8)',
                                                   'rgba(153, 102, 255, 0.6)',
                                               ],
                                               borderWidth: 1,
                                           },
                                       ],
                                   }
                               }
                               options={{
                                   animation: {
                                       duration: 0
                                   }
                               }}
                    />
                </div>
                <div className='txt-container'>
                    <p className='txt'>{status}</p>
                </div>
            </div>
        </div>
    )
}


export default CurrentMeetingPage;