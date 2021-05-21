import React from 'react';
import './usersPage.styles.scss';
import UsersDirectory from '../../components/users-directory/users-directory.component'


const UsersPage = (props) => {
    const meetingId = props.match.params.meetingId

    return (
        <div className='usersPage'>
            <UsersDirectory meetingId={meetingId}/>
        </div>
    );

}

export default UsersPage;