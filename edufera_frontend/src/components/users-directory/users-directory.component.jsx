import React from 'react';
import './users-directory.styles.scss';

import SearchBox from '../search-box/search-box.component';
import UsersListItem from '../users-list-items/users-list-items';
import { Link } from 'react-router-dom';

class UsersDirectory extends React.Component {

    constructor() {
        super();

        this.state = {
            searchField: '',
            meetingsAttendances: [{
                title:  'Student ID1',
                id: 1

            },
            {
                title:  'Student ID2',
                id: 2

            },
            {
                title:  'Student ID3',
                id: 3

            },
            {
                title:  'Student ID4',
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
             placeholder= 'Search students by ID'
             handleChange = {e => this.setState({searchField: e.target.value})} 
             />
             <div className='usersContainer'>
             {this.state.meetingsAttendances.map(({title, id}) => (
                <UsersListItem className='listItem' key={id} title = {title}/>
            )   
            )}
             </div >
             <div className='btnPastMeetingsContainer'>
             <div className='btnPastMeetings'>
             <Link style={{textDecoration:'none', color:'white'}} to="/">Back to Meetings</Link>
             </div>
            </div>
            </div>
        );
    }
    
}

export default UsersDirectory;