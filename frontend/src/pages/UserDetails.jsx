import React, { Component } from 'react'
import { Upload } from '../cmps/Upload'

import {userService} from '../services/user.service'

export class UserDetails extends Component {
  state = {
    user : null
  }
  async componentDidMount() {
    const user = await userService.getById(this.props.match.params.id)
    this.setState({user})
  }

  render() {
    return (
      <h1>user details</h1>
    )
  }
}

