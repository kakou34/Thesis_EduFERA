import React, {useEffect} from 'react';
import axios from 'axios';
import { socket } from './App'


export default class UserList extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    console.log(socket)

    socket.emit('UserAdded', {'data' : {'user': 'hello'}})
    socket.on('userAddedResponse', (resp) => {
      console.log(resp)
    });

    axios.get(`http://localhost:5000/users`)
      .then(res => {
        const users = res.data.users;
        this.setState({ users });
      })
  }

  render() {
    return (
      <div>
        { this.state.users.map(user => <div> firstName={user.firstName} lastName={user.lastName} office={user.office} email={user.email} mobile={user.mobile} </div>)}
      </div>
    )
  }
}