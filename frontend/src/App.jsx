import { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
// import { UserDetails } from './src/pages/UserDetails'

import { Header } from './cmps/Header'
import { GameApp } from './pages/GameApp'
import { GameDetails } from './pages/GameDetails'
import { About } from './pages/About'
import { userMsg } from './store/actions/user.actions'

import { Footer } from './cmps/Footer'
import { GameCart } from './pages/GameCart'
import { UserProfile } from './pages/UserProfile'
import { socketService } from './services/socket.service'
import { GameSwipe } from './cmps/UtilCmps/GameSwipe'
import { login } from './store/actions/user.actions'
import { GameEdit } from './pages/GameEdit'
import { UserEdit } from './pages/UserEdit'
import { Signup } from './pages/Signup'

class _App extends Component {
  state = {
    msg: '',
    isUpdate: null
  }

  async componentDidMount() {
    const userCreds = { username:'Guest', password:'Guest'}
    await this.props.login(userCreds)
    await socketService.setup()
    await socketService.on('gameBought', this.onGameBought)
    await socketService.on('giftBought', this.onGiftSent)
    this.setState({ msg: this.props.msg })
  }
  componentWillUnmount() {
    socketService.terminate()
  }

  onGameBought = async (order) => {
    await this.props.userMsg('An order has been made')
    this.setState({ msg: this.props.msg, isUpdate: true })
    setTimeout(() => {
      this.props.userMsg('')
    }, 3000);
    this.setState({ msg: this.props.msg })
    // this.onSetMsg("An order has been made" )
  }

  onGiftSent = async (order) => {
    await this.props.userMsg('You got a gift!!!')
    this.setState({ msg: this.props.msg })
    setTimeout(() => {
      this.props.userMsg('')
    }, 3000);
    this.setState({ msg: this.props.msg })
    // this.onSetMsg("An order has been made" )
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Header msg={this.props.msg} isUpdate={this.state.isUpdate}></Header>
          <main className="">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/profile/mystore/edit/:gameId?" component={GameEdit} />
              <Route path="/profile/edit" component={UserEdit} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/game/order/:gameId?" component={GameCart} />
              <Route path="/game/:gameId" component={GameDetails} />
              <Route path="/game" component={GameApp} />
              <Route path="/about" component={About} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    msg: state.userModule.msg
  }
}
const mapDispatchToProps = {
  userMsg,
  login
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
