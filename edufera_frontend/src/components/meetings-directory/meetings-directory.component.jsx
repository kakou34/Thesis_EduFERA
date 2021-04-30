import React from 'react';
import './meetings-directory.styles.scss';

import SearchBox from '../search-box/search-box.component';
import MeetingsListItems from '../meetings-list-items/meetings-list-items.compopnent';
import {data} from '../../data/dummydata'

class MeetingsDirectory extends React.Component {

    constructor() {
        super();

        this.state = {
            searchField: '',
            meetingsDates: [{
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
    }



    render() {
        const {meetingsDates,searchField } = this.state;
        const filteredDates = meetingsDates.filter(meetingDate =>
            meetingDate.title.toLowerCase().includes(searchField.toLowerCase()))

        return (
            <div className='directory-items'>
             <SearchBox
             placeholder= 'Search meetings by ID'
             handleChange = {e => this.setState({searchField: e.target.value})} 
             />
             <div className='container'>
             {filteredDates.map(({title, id}) => (
                <MeetingsListItems className='listItem' key={id} title = {title}/>
            )   
            )}
             </div>
            </div>
        )
    }
    
}

export default MeetingsDirectory;