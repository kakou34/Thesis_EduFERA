import React, {useState} from 'react';
import MeetingsDirectory from '../../components/meetings-directory/meetings-directory.component';
import './currentMeetingPage.syles.scss';
import SearchBox from '../../components/search-box/search-box.component'




const CurrentMeetingPage = () => {
  return(
    <div className='current'>
     <div className='meetingContainer'>
     
    
     
      <div className='diagramCurrent-container'>
        <div className='diagramCurrent'>Here goes diagram</div>
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