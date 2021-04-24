import React from 'react';
import './list-item.styles.scss';
import Expand from 'react-expand-animated';
import CustomButton from '../custom-button/custom-button.component'
import {Link} from 'react-router-dom';

//const ListItem = ({title}) => (
    
     //<div className='list-item'>
     //   <p className='title'>{title}</p>
     //  </div>
   
//);

class ListItem extends React.Component {
   state = { open: false };
 
   toggle = () => {
     this.setState(prevState => ({ open: !prevState.open }));
   };
  
   render() {
     return (
       <React.Fragment>
         <div className='list-item' onClick={this.toggle}>
          <p className='title'>
         {this.props.title}
          </p>
         </div>
         <Expand open={this.state.open}>
           <div className='item-expand' >
            <div className='diagram-container'>
             <div className='diagram'>Here goes diagram</div>
            </div>
            <div className='btnContainer'>
             <div className='btnListOfUsers'>
             <Link className='usersLink' to="/usersPage">List of users</Link>
             </div>
            </div>
           </div>
         </Expand>
       </React.Fragment>
     );
   }
}

export default ListItem;