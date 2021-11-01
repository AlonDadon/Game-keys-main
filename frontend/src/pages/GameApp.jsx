import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gameService } from '../services/game.service'
import { loadGames } from '../store/actions/game.actions'
import { GameList } from '../cmps/GameList'
import { GameFilter } from '../cmps/GameFilter'
import { GameCarousel } from '../cmps/UtilCmps/GameCarousel'

class _GameApp extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        const paramsString = this.props.location.search
        const searchParams = new URLSearchParams(paramsString).get('tag');
        if (searchParams) {
            const filterBy = { tag: searchParams }
            this.props.loadGames(filterBy)
        } else {
            this.props.loadGames()
        }
    }
    onSetFilter = (filterBy) => {
        this.props.loadGames(filterBy)
    }

    render() {
        const { games } = this.props
        const backgroundImg = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183628/GameKeys/img/hero3_ensfhg.jpg"
        return (
            <section className="main-explorer">
                <img className="poster mb-20" src={backgroundImg} alt="" />
                {/* <button>Save up to 70%</button> */}
                <GameFilter onSetFilter={this.onSetFilter} />
                <GameList games={games} />
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.systemModule.isLoading,
        games: state.gameModule.games,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadGames,
}

export const GameApp = connect(mapStateToProps, mapDispatchToProps)(_GameApp)