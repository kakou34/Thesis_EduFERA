import React from 'react';
import './meetings-directory.styles.scss';

import SearchBox from '../search-box/search-box.component';
import MeetingsListItems from '../meetings-list-items/meetings-list-items.compopnent';

class MeetingsDirectory extends React.Component {
state = {
    searchField: '',
    // You can even call functions and class methods:
    meetings: this.props.meetings,
  }
   /* constructor() {
        super();
        this.state = {
            searchField: '',
            meetings: [{
                title:  'Meeting ID1',
                id: 1

            },
            {
                title:  'Meeting ID2',
                id: 2

            },
            {
                title:  'Meeting ID3',
                id: 3

            },
            {
                title:  'Meeting ID4',
                id: 4

            }, 
         ]
        };
    }*/



    render() {
        console.log('here come props')
        console.log(this.state)
        const {meetings,searchField } = this.state;
        const filteredMeetings = meetings.filter(meeting =>
            meeting.start_time.toLowerCase().includes(searchField.toLowerCase()))

        return (
            <div className='directory-items'>
             <SearchBox
             placeholder= 'Search meetings by ID'
             handleChange = {e => this.setState({searchField: e.target.value})} 
             />
             <div className='container'>
             {filteredMeetings.map(({start_time, id}) => (
                <MeetingsListItems className='listItem' key={id} title = {id}/>
            )   
            )}
             </div>
            </div>
        )
    }
    
}

export default MeetingsDirectory;