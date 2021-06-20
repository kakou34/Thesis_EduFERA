import './App.css'
import React from 'react'
import {Switch, Route} from 'react-router-dom'

import PastMeetingsPage from './pages/PastMeetingsPage/pastMeetingsPage.component'
import Header from './components/header/header.component';
import CurrentMeetingPage from "./pages/CurrentMeetingPage/currentMeetingPage.component";
import UsersPage from "./pages/UsersPage/usersPage.component";
import StartMeetingPage from "./pages/StartMeetingPage/startMeetingPage.component";
import RecordedMeetingPage from "./pages/recordedMeetingPage/recordedMeetingPage.component";
import AboutUsPage from './pages/AboutUsPage/aboutUsPage.component'
import io from 'socket.io-client'


export const socket = io.connect('http://localhost:5000/', {transports: ['websocket'], upgrade: false})

class App extends React.Component {
    constructor() {
        super();
    }

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
                    <Route exact path='/about' component={AboutUsPage}/>
                </Switch>

            </div>
        );
    }
}

export default App;
