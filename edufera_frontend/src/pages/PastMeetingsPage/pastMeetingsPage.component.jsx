import React, {useState, useEffect} from 'react';
import axios from 'axios'
import MeetingsDirectory from '../../components/meetings-directory/meetings-directory.component';
import './pastMeetingsPage.styles.scss';



const PastMeetingsPage = () => {
const [meetings, setMeetings] = useState([])
useEffect(() => {
        axios.get('http://localhost:5000/past_meetings')
            .then(res => {
            console.log(res)
            setMeetings(res.data)
            })

    }, [])
  return(
    <div className='pastMeetingsPage'>
     <MeetingsDirectory meetings = {meetings}/>
    </div>
    )
};

export default PastMeetingsPage;