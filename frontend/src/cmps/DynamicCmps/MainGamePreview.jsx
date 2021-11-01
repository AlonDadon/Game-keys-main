import { render } from "@testing-library/react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../UtilCmps/Loader";
import { utilService } from '../../services/util.service'


// export function MainGamePreview({ games }) {
export class MainGamePreview extends Component {
    state = {
        games: null,
        gameIdx: 0,
        imgIdx: 0,
        classTransition: ''
    }
    componentDidMount() {
        const games = this.props.games
        this.toggleTransition()
        this.setState({ games })
    }

    changeGameByDiff = (diff) => {
        this.setState({ classTransition: '' })
        const { games, gameIdx } = this.state
        let nextIdx = diff += gameIdx
        if (nextIdx < 0) nextIdx = games.length - 1
        if (nextIdx >= games.length) nextIdx = 0
        setTimeout(() => this.setState({ gameIdx: nextIdx }), 100)
        this.toggleTransition()
    }
    changeGameByIdx(idx) {
        this.setState({ classTransition: '' })
        setTimeout(() => this.setState({ gameIdx: idx }), 100)
        this.toggleTransition()
    }
    toggleTransition() {
        setTimeout(() => this.setState({ classTransition: 'transition' }), 100)
    }
    changeImg = (imgIdx) => {
        this.setState({ imgIdx })
    }
    render() {
        const { games, gameIdx, imgIdx, classTransition } = this.state
        if (!games || !games.length) return (<Loader />)
        const game = games[gameIdx]
        const imgs = game.imgs.largeImgUrls.map(img => img)
        const mainImgUrl = games[gameIdx].imgs.largeImgUrls[imgIdx]
        const mainImg = mainImgUrl
        const releasedAt = this.props.utilService.getDateFormat(game.releasedAt)
        const finalPrice = utilService.getFinalPrice(game.price, game.discount)
        return (
            <>
                <div>

                    <div className="main-game-preview container mb-30">
                        <button className="btn btn-prev" onClick={() => this.changeGameByDiff(-1)} >&#10094;</button>
                        <Link to={`/game/${game._id}`}>

                            <div className="preview-container flex column">
                                <div className={`m-img ${classTransition}`} >
                                    <img src={mainImg} alt="" />
                                </div>

                                <div className="imgs-container flex column">
                                    <img
                                        onMouseOver={() => this.changeImg(1)}
                                        onMouseLeave={() => this.changeImg(0)}
                                        className={classTransition} src={imgs[1]} />
                                    <img onMouseOver={() => this.changeImg(2)}
                                        onMouseLeave={() => this.changeImg(0)}
                                        className={classTransition} src={imgs[2]} />

                                    <h2>{game.title}</h2>
                                    <p>Release date:{releasedAt}</p>
                                </div>

                                <div className="imgs-container flex column space-between">
                                    <div>
                                    <img onMouseOver={() => this.changeImg(3)}
                                        onMouseLeave={() => this.changeImg(0)}
                                        className={classTransition} src={imgs[3]} />
                                    <img onMouseOver={() => this.changeImg(4)}
                                        onMouseLeave={() => this.changeImg(0)}
                                        className={classTransition} src={imgs[4]} />
                                        
                                    </div>

                                    <div className="preview-price">
                                        <p className={`discount ${!game.discount && 'hidden'}`}>{game.discount ? `${game.discount}%` : '1'}</p>
                                        <div className="price-container flex column">
                                            <p className={`in-sale ${!game.discount && 'hidden'}`} >${game.price.toFixed(2)}</p>
                                            <p className={`f-price `} >${finalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    {/* <button className="btn-home-buy-now btn-success">Buy now</button> */}
                                    <button className="btn-main txt-cap">Get it today</button>
                                </div>
                            </div>
                        </Link>
                        <button className=" btn btn-next" onClick={() => this.changeGameByDiff(1)}> &#10095;</button>
                    </div>
                    <div className="carousel-nav flex justify-center">
                        {games.map((game, idx) =>
                            <div key={'ball' + idx}
                                onClick={() => this.changeGameByIdx(idx)}
                                className={`item ${gameIdx === idx && 'active'} `}
                            ></div>)}
                    </div>
                </div>
            </>
        )
    }
}
