import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActions from 'redux/modules/users';
import { withDone } from 'react-router-server'

class List extends Component {
  componentWillMount() {
    const { UsersActions, data, done } = this.props
    console.log(done)
    if(data.length !== 0) return false;
    UsersActions.getUsers().then(done, done)
  }

  render() {
    const { data } = this.props
    const userList = data.map(
      user => <li key={user.id}>{user.name}</li>
    )
    return (
      <div>
          <ul>
              {userList}
          </ul> 
      </div>
    );
  }
}



export default withDone(connect(
  (state) => ({
      data: state.users.data
  }),
  (dispatch) => ({
    UsersActions: bindActionCreators(usersActions, dispatch)
  })
)(List));