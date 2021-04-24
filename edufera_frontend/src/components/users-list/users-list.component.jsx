import React from 'react';
import './users-list.styles.scss';

import SearchBox from '../search-box/search-box.component';
import UsersListItem from '../users-list-items/users-list-items';
import { Link } from 'react-router-dom';

class UsersList extends React.Component {

    constructor() {
        super();

        this.state = {
            searchField: '',
            meetingsAttendances: [{
                title:  'User 1',
                id: 1

            },
            {
                title:  'User 2',
                id: 2

            },
            {
                title:  'User 3',
                id: 3

            },
            {
                title:  'User 4',
                id: 4

            }, 
         ]
        };
    }



    render() {
        const {searchField, meetingsAttendances} = this.state;
        const filteredDates = meetingsAttendances.filter(meetingsAttendances =>
            meetingsAttendances.title.toLowerCase().includes(searchField.toLowerCase())
            );

        return (
            <div className='users-items'>
             <SearchBox
             placeholder= 'Search users'
             handleChange = {e => this.setState({searchField: e.target.value})} 
             />
             <div className='usersContainer'>
             {this.state.meetingsAttendances.map(({title, id}) => (
                <UsersListItem className='listItem' key={id} title = {title}/>
            )   
            )}
             </div>
             <div className='btnPastMeetingsContainer'>
             <Link className='btnPastMeetings' to="/">Past Meetings</Link>
             </div>
            </div>
        );
    }
    
}

export default UsersList;