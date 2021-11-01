import { Component } from 'react'
import { connect } from 'react-redux'
import { Loader } from '../cmps/UtilCmps/Loader'
import { DynamicCmp } from '../cmps/DynamicCmp.jsx'
import { loadGames } from '../store/actions/game.actions'
import { utilService } from '../services/util.service'

class _Home extends Component {
  state = {

  }
  componentDidMount() {
    this.props.loadGames()
    // this.props.loadUsers()
    // service.query(filter)
  }

  render() {
    const poster = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183624/GameKeys/img/hero2_chf0rb.jpg"
    const { games } = this.props // Do we need main here??
    if (!games) return <Loader />
    return (
      <div className="home-page ">
        <div className="home-poster">
          <img className="poster mb-20 " src={poster} alt="defult"></img>
        </div>
        <div className="home-ctg mb-20">
        </div>
        <DynamicCmp games={games} utilService={utilService} type={'main'} />
        <DynamicCmp games={games} type={'small'} />
        <DynamicCmp games={games} src={''} type={'video'} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    isLoading: state.systemModule.isLoading,
    games: state.gameModule.games,
    // loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadGames,
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
