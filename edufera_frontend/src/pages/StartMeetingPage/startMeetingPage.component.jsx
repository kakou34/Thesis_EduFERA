import React, {useState} from 'react';
import MeetingsDirectory from '../../components/meetings-directory/meetings-directory.component';
import './startMeetingPage.styles.scss';
import SearchBox from '../../components/search-box/search-box.component'
import { Link } from 'react-router-dom';




class StartMeetingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            meetingID: ''
        }
    }
    render() {
  return(
    <div className='currentForm'>
     <div className='meetingContainerForm'>
      <div className='form-container'>
        
         <form className='group'>
          <label className='form-label'>Meeting ID</label>
          <input className='form-input' name ='meetingID'  required />
         </form>
         <div className='btnAnalysisContainer'>
          <div class='btnAnalysis'>
         <Link to ='/currentMeeting' style={{textDecoration:'none', color:'white', fontWeight:'bold', letterSpacing:1.2}}>Start Analysis</Link>
         </div>
         </div>
        </div>
      </div>
     </div>
    
    )
  }
}


export default StartMeetingPage;