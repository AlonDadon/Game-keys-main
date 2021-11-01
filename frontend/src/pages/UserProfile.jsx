import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadGames } from '../store/actions/game.actions'
import { UserHeader } from '../cmps/UserCmps/UserHeader'
import { DanDUserGameList } from '../cmps/UserCmps/DanDUserGameList'
import { userService } from '../services/user.service'
import { Link } from 'react-router-dom'
import { Loader } from '../cmps/UtilCmps/Loader'

class _UserProfile extends Component {
    state = {
        user: null,
        serialKey: '',
        gamesToSell: null
    }
    componentDidMount = async () => {
        const { loggedInUser } = this.props
        if (!loggedInUser) return this.props.history.push(`/`)
        const user = await userService.getById(loggedInUser._id)
        this.setState({ user })
        await this.props.loadGames()
        const games = this.props.games
        const gamesToSell = games.filter(game => game.seller._id === loggedInUser._id)
        this.setState({ gamesToSell })
    }

    componentDidUpdate(prevProps, prevState) {
        const { loggedInUser } = this.props
        if (prevProps.loggedInUser !== loggedInUser) {
            if (!loggedInUser) this.props.history.push(`/`)
            // if (!user) this.props.history.push(`/`)
        }
    }
    onGameClicked = (serialKey) => {
        this.setState({ serialKey: serialKey })
    }

    render() {
        const { loggedInUser } = this.props
        const { user, serialKey, gamesToSell } = this.state
        if (!loggedInUser) return <h1>No user to show</h1>
        if (!user) return <Loader />
        if (!gamesToSell) return <Loader />
        return (
            <section className="main-user-profile">
                <UserHeader fullname={user.fullname} img={user.imgUrl} />
                <div className="user-bought-list container">
                    <h1>Games you bought</h1>
                    {/* <UserGameList orders={user.orders} /> */}
                    <DanDUserGameList orders={user.orders} onGameClicked={this.onGameClicked} />
                </div>
                <div className="user-sell-container container">
                    <h1>Games you sell</h1>
                    <div className="user-sell-list">
                        {gamesToSell.map(game => <div className="user-sell-preview" key={game._id}>
                            <div className="user-sell-card">
                                <div className="user-sell-img">
                                    <img src={game.imgs.largeImgUrls[0]} alt=""></img>
                                </div>
                                <div className="user-sell-info">
                                    <h2>{game.title}</h2>
                                    <h2>Sell price: ${game.price}</h2>
                                </div>
                                <Link to={`/profile/mystore/edit/${game._id}`}>Edit</Link>
                            </div>
                        </div>)}
                    </div>
                        <Link to="/profile/mystore/edit"> <button className="btn btn-primary">Add game</button></Link>
                </div>
                {serialKey && <div className="game-clicked-info">
                    <h1>Your serial-key:<span> {serialKey}</span></h1>
                    <p>Add your key to your favorite app</p>
                    <p>We advise to use GameKeys app! but we work with</p>
                    <p>Steam, Google play and HBO-Games</p>
                    <p>Enjoy</p>
                    <button className="game-user-btn" onClick={() => this.onGameClicked('')}>GG</button>
                </div>}
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
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)