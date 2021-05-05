import React, {useState, useEffect} from 'react';
import './currentMeetingPage.syles.scss';
// import SocketIOClient from "socket.io-client";
import SocketIOClient from 'socket.io-client';
import { useParams } from 'react-router-dom'

let socket;

export const initiateSocket = (room) => {
    // socket = SocketIOClient('http://127.0.0.1:5000');
    // console.log(socket);
    // console.log('room: ' + room)
    // if (socket && room) socket.emit('connecttt');
    socket = SocketIOClient('http://127.0.0.1:5000');
    console.log(socket);
    console.log('room: ' + room)
    if (socket && room) {
        console.log('I am emitting')
        socket.emit('aaa');
    }
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToAnalysis = (cb) => {
    if (!socket) return true;

    socket.on('aaa_response', data => {
        console.log('Websocket event received!');
        return cb(null, data);
    });
}


const CurrentMeetingPage = (props) => {
    const roomId = props.match.params.meetingId // Gets roomId (meetingId) from URL
    const [data, setData] = useState('');

    useEffect(() => {
        console.log(roomId)
        if (roomId) initiateSocket(roomId);
        subscribeToAnalysis((err, data) => {
            if (err) return;
            setData(oldData => [data, ...oldData])
        });
        return () => {
            disconnectSocket();
        }
    }, [roomId]);


    return (
        <div className='current'>
            <div className='meetingContainer'>

                <div className='diagramCurrent-container'>
                    <div className='diagramCurrent'>{data}</div>
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