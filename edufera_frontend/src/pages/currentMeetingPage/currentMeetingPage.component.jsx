import React, {useState, useEffect} from 'react';
import './currentMeetingPage.syles.scss';
import {socket} from '../../App'
import axios from "axios";


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [emotions, setEmotions] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        console.log(socket)
        socket.emit('join', {'room': roomId})

        socket.on('meeting_started', (resp) => {
            console.log(resp.data)
            setStatus(resp.data)
        });

        socket.on('meeting_ended', (resp) => {
            console.log(resp.data)
            setStatus(resp.data)
        });

        socket.on('emotion_predicted', (resp) => {
            console.log(resp)
            setEmotions(old =>[resp, ...old])
        });

        axios.get('http://localhost:5000/get_meeting_status', { params: { meeting_id: roomId } })
            .then(res => {
                setStatus(res.data.message);
            })

    }, [roomId]);


    return (
        <div className='current'>
            <div className='meetingContainer'>

                <div className='diagramCurrent-container'>
                    <div className='diagramCurrent'>
                        {emotions.map(emotion => <div> time={emotion.time_stamp}, emotion={emotion.value}</div>)}
                    </div>
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