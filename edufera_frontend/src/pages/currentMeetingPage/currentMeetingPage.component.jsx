import React, {useEffect, useState} from 'react';
import './currentMeetingPage.syles.scss';
import {socket} from '../../App'
import axios from "axios";
import LineChart from "../../components/graphs/LineChart";


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [status, setStatus] = useState('');
    const [labels, setLabels] = useState(['0', '1', '2']);
    const [data, setData] = useState([[1, 2, 3],
                                               [5, 0, 1],
                                               [0, 8, 2],
                                               [8, 9, 1],
                                               [0, 0, 5]]);
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
            const newLabels = labels;
            if(value === -1) value = 4;
            const i = newLabels.indexOf(label);
            console.log(labels);
            console.log(i);
            if(i === -1){
                newLabels.push(label)
            }
            setLabels(newLabels);
        });
    }, [])




    return (
        <div className='current'>
            <div className='meetingContainer'>

                <div className='diagramCurrent-container'>
                    <LineChart labels={labels} data={data}/>
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