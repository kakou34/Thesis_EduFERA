import React from 'react';
import './meetings-directory.styles.scss';
import SearchBox from '../search-box/search-box.component';
import MeetingsListItems from '../meetings-list-items/meetings-list-items.compopnent';
import axios from "axios";

class MeetingsDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            meetings: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/past_meetings')
            .then(res => {
                console.log(res)
                this.setState({searchField: '', meetings: res.data})
            })

    }


    render() {
        const {meetings, searchField} = this.state;
        const filteredMeetings = meetings.filter(meeting =>
            meeting.id.toLowerCase().includes(searchField.toLowerCase()))

        return (
            <div className='directory-items'>
                <SearchBox
                    placeholder='Search meetings by ID'
                    handleChange={e => this.setState({searchField: e.target.value})}
                />
                <div className='container'>
                    {filteredMeetings.map(({start_time, id, labels, data}) => (
                            <MeetingsListItems className='listItem' start_time={start_time} key={id} title={id} labels={labels} data={data}/>
                        )
                    )}
                </div>
            </div>
        )
    }

}

export default MeetingsDirectory;