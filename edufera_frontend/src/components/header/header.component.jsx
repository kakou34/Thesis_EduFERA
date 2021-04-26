import React from 'react';
import './header.styles.scss';

import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/face-recognition.svg';

const Header = () => (
    <div className='header'>
   
     <div className='logo-container' to ='/'>
      <Logo className='logo'/>  
     </div>
   
     
     <div className='options'>
      <Link className='option' to ='/currentMeeting' >Current Meeting</Link>
      <Link className='option' to ='/' >Past Meetings</Link>

     </div>

    </div>

);

export default Header;