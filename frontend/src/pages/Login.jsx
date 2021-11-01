import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert } from '../cmps/UtilCmps/Alert'
import { FormInput } from '../cmps/UtilCmps/FormInput'
import { socketService } from '../services/socket.service'

import {
  login,
  logout,
  signup
} from '../store/actions/user.actions'

class _Login extends Component {
  state = {
    loginCred: {
      username: '',
      password: ''
    },
    alertMsg: ''
  }

  componentDidMount() {
    if (this.props.loggedInUser) this.props.history.push(`/`)
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      await this.props.login(userCreds)
      socketService.emit('login', this.props.loggedInUser)
      this.props.history.push(`/`)
    } catch (err) {
      this.setState({ alertMsg: 'Login failed, try again.' })
    }
  }

  render() {
    const { alertMsg } = this.state
    return (
      <div className="login-signup space-around align-center flex container mb-20">
        <div className="flex">
          <div className="login-container">
            <form className="flex space-around align-center column" onSubmit={this.doLogin}>
              <p className="login-title"> LOG IN</p>
              {alertMsg && <Alert msg={alertMsg} />}
              <FormInput type="text" name="username" value={this.state.loginCred.username}
                handleChange={this.loginHandleChange} label="Username" />
              <FormInput type="password" name="password" value={this.state.loginCred.password}
                handleChange={this.loginHandleChange} label="Password" />
              <button className="btn-primary mb-20 " type="submit">LOG IN</button>
              <a className="forget-link">Forgot your password?</a>
            </form>
          </div>
        </div>
        <div className="join-container flex column space-around">
          <div className="flex column space-between align-center">
            <p>Join Game keys and discover thousands of games to play.</p>
            <Link to="/about" className='about-link'>Learn more</Link>
          </div>
          <div className="flex justify-center column">
            <p>It's <span>free</span> and <span>easy</span>  to use.</p>
            <Link to="/signup"><button className="btn-primary"
            >Join GameKeys</button></Link>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
