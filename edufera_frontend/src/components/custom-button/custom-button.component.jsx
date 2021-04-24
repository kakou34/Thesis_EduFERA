import React from 'react';

import './custom-button.styles.scss';

const CustomButton = (props) => (
    <button className='custom-button'>
    {props.text}
    </button>
    )
export default CustomButton;