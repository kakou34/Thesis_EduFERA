import React, {useState, useEffect} from 'react';
import './currentMeetingPage.syles.scss';
import { socket } from '../../App'


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [data, setData] = useState('Data');

    useEffect(() => {
        console.log(socket)
        socket.emit('hello', {'data' : 'hello'})
        socket.on('meeting_started', (resp) => {
        console.log(resp)
            setData(resp)
    });

    }, [roomId]);


    return (
        <div className='current'>
            <div className='meetingContainer'>

                <div className='diagramCurrent-container'>
                    <div className='diagramCurrent'>{data.data}</div>
                </div>
                <div className='txt-container'>
                    <p className='txt'>Online Students:</p>
                    <p className='txt'>Offline Students:</p>

                </div>
            </div>
        </div>
    )
}


export default CurrentMeetingPage;