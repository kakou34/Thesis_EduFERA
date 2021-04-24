import React from 'react';
import './container.styles.scss';

import ListItem from '../list-item/list-item.compopnent';


class Container extends React.Component {
    constructor() {
        super();

        this.state = {
            meetingsDates: [{
                title:  'date1',
                id: 1

            },
            {
                title:  'date2',
                id: 2

            },
            {
                title:  'date3',
                id: 3

            },
            {
                title:  'date4',
                id: 4

            }, 
         ] }

    }

    render() {
        return (
            <div className='container'>
             
            {this.state.meetingsDates.map(({title, id}) => (
                <ListItem key={id} title = {title}/>
            )
            )}
            </div>
        );
    }
    
}

export default Container;