import React from 'react';
import './users-directory.styles.scss';

import SearchBox from '../search-box/search-box.component';
import UsersListItem from '../users-list-items/users-list-items';
import {Link} from 'react-router-dom';
import axios from "axios";

class UsersDirectory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/get_meeting_details', { params: { meeting_id: this.props.meetingId } })
            .then(res => {
                console.log(res.data)
                this.setState({searchField: '', users: res.data})
            })

    }


    render() {

        const {users, searchField} = this.state;
        const filteredDates = users.filter(users =>
            users.user_id.toLowerCase().includes(searchField.toLowerCase())
        );

        return (
            <div className='users-items'>
                <SearchBox
                    placeholder='Search students by ID'
                    handleChange={e => this.setState({searchField: e.target.value})}
                />
                <div className='usersContainer'>
                    {filteredDates.map(({user_id, user_name, emotions, time_stamps}) => (
                            <UsersListItem className='listItem' key={user_id}
                                           title={user_id} userName={user_name}
                                           emotions={emotions} time_stamps={time_stamps}
                            />
                        )
                    )}
                </div>
                <div className='btnPastMeetingsContainer'>
                    <div className='btnPastMeetings'>
                        <Link style={{textDecoration: 'none', color: 'white'}} to="/">Back to Meetings</Link>
                    </div>
                </div>
            </div>
        );
    }

}

export default UsersDirectory;