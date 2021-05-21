import './App.css'
import React from 'react'
import {Switch, Route} from 'react-router-dom'

import PastMeetingsPage from './pages/PastMeetingsPage/pastMeetingsPage.component'
import Header from './components/header/header.component';
import CurrentMeetingPage from "./pages/currentMeetingPage/currentMeetingPage.component";
import UsersPage from "./pages/usersPage/usersPage.component";
import StartMeetingPage from "./pages/StartMeetingPage/startMeetingPage.component";
import RecordedMeetingPage from "./pages/recordedMeetingPage/recordedMeetingPage.component";
import io from 'socket.io-client'

export const socket = io.connect('http://localhost:5000/', {transports: ['websocket'], upgrade: false})

class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={PastMeetingsPage}/>
                    <Route exact path='/current/:meetingId' component={CurrentMeetingPage}/>
                    <Route path='/usersPage/:meetingId' render={(props) => <UsersPage {...props}/>}/>
                    <Route exact path='/startAnalysis' component={StartMeetingPage}/>
                    <Route exact path='/offlineAnalysis' component={RecordedMeetingPage}/>
                </Switch>

            </div>
        );
    }
}

export default App;
