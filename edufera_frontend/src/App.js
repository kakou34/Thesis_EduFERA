import './App.css';
import {render} from '@testing-library/react';
import React from 'react';
import {Switch, Route} from 'react-router-dom';

import PastMeetingsPage from './pages/PastMeetingsPage/pastMeetingsPage.component'
import Header from './components/header/header.component';
import CurrentMeetingPage from "./pages/currentMeetingPage/currentMeetingPage.component";
import UsersPage from "./pages/usersPage/usersPage.component";
import StartMeetingPage from './pages/StartMeetingPage/startMeetingPage.component'


class App extends React.Component {
    constructor() {
        super();

        //Just example state before I get the real data

    }

    //Empty for now to fetch data
    componentDidMount() {

    }


    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={PastMeetingsPage}/>
                    <Route exact path='/currentMeeting' component={CurrentMeetingPage}/>
                    <Route path='/usersPage' component={UsersPage}/>
                    <Route path='/startAnalysis' component={StartMeetingPage}/>


                </Switch>

            </div>
        );
    }
}

export default App;
