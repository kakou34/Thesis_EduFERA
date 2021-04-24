import React from 'react';
import './directory-items.styles.scss';

import SearchBox from '../search-box/search-box.component';
import ListItem from '../list-item/list-item.compopnent';

class DirectoryItems extends React.Component {

    constructor() {
        super();

        this.state = {
            searchField: '',
            meetingsDates: [{
                title:  'Date 1',
                id: 1

            },
            {
                title:  'Date 2',
                id: 2

            },
            {
                title:  'Date 3',
                id: 3

            },
            {
                title:  'Date 4',
                id: 4

            }, 
         ]
        };
    }



    render() {
        const {searchField, meetingsDates} = this.state;
        const filteredDates = meetingsDates.filter(meetingDate =>
            meetingDate.title.toLowerCase().includes(searchField.toLowerCase())
            );

        return (
            <div className='directory-items'>
             <SearchBox
             placeholder= 'Search dates'
             handleChange = {e => this.setState({searchField: e.target.value})} 
             />
             <div className='container'>
             {this.state.meetingsDates.map(({title, id}) => (
                <ListItem className='listItem' key={id} title = {title}/>
            )   
            )}
             </div>
            </div>
        );
    }
    
}

export default DirectoryItems;