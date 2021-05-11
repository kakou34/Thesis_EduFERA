import React from 'react';

import MeetingsDirectory from '../../components/meetings-directory/meetings-directory.component';
import './pastMeetingsPage.styles.scss';


const PastMeetingsPage = () => {
    return (
        <div className='pastMeetingsPage'>
            <MeetingsDirectory/>
        </div>
    )
};

export default PastMeetingsPage;