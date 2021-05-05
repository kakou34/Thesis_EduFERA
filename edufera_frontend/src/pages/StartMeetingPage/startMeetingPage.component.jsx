import React, {useState} from 'react';
import './startMeetingPage.styles.scss';
import {Link} from 'react-router-dom';


class StartMeetingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meetingID: ''
        }
    }

    handleMeetingIdChange = (event) => {
        this.setState({meetingID: event.target.value});
    }

    render() {
        return (
            <div className='currentForm'>
                <div className='meetingContainerForm'>
                    <div className='form-container'>
                        <form className='group'>
                            <label className='form-label'>Meeting ID</label>
                            <input className='form-input' name='meetingID'
                                   required type='text'
                                   value={this.state.meetingID}
                                   onChange={this.handleMeetingIdChange}
                            />
                        </form>
                        <div className='btnAnalysisContainer'>
                            <div className='btnAnalysis'>
                                <Link to={`/current/${this.state.meetingID}`} style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    letterSpacing: 1.2
                                }}>Start Analysis</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default StartMeetingPage;