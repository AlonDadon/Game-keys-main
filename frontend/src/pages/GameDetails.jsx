import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { gameService } from '../services/game.service'
import { addReview } from '../store/actions/game.actions'
import { loadUsers, userMsg } from '../store/actions/user.actions'
import { Loader } from '../cmps/UtilCmps/Loader'
import { AddReview } from '../cmps/ReviewCmps/AddReview'
import { Link } from 'react-router-dom'
import { ReviewList } from '../cmps/ReviewCmps/ReviewList'
import { utilService } from '../services/util.service'
import { orderService } from '../services/order.service'
import { DetailsSideBar } from '../cmps/GameDetailsCmps/DetailsSideBar'
import { DetailsPriceBar } from '../cmps/GameDetailsCmps/DetailsPriceBar'
import { DetailsPanel } from '../cmps/GameDetailsCmps/DetailsPanel'
import { DetailsTopNav } from '../cmps/GameDetailsCmps/DetailsTopNav'
import { ImgModal } from '../cmps/GameDetailsCmps/ImgModal'
import { GamePreview } from '../cmps/GamePreview'
import { useOnScreen } from '../services/customHooks'

import React from 'react'

export const GameDetails = ({ history, match }) => {
    const { loggedInUser, users } = useSelector(state => state.userModule)
    const [game, setGame] = useState(null)
    const [isInLibrary, setIsInLibrary] = useState(false)
    const [addCardClass, setAddCardClass] = useState('')
    const [orderPath, setOrderPath] = useState('')

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [imgPreviewIdx, setImgPreviewIdx] = useState(0)

    const dispatch = useDispatch()

    //onScreen
    const [setRef, visible] = useOnScreen({ threshold: 0 })
    const [setBottomRef, visibleBottom] = useOnScreen({ threshold: 0.1 })
    const [setTopRef, visibleTop] = useOnScreen({ threshold: 0 })

    useEffect(() => {
        dispatch(loadUsers())
        loadGame()
    }, [])

    useEffect(() => {
        if (!orderPath) return
        history.push(orderPath)
    }, [orderPath])

    useEffect(() => {
        if (visibleTop) { }
        (visibleBottom) ? setAddCardClass('absolute') : setAddCardClass('')
    }, [visibleBottom, visibleTop])

    // useEffect(() => {
    //     setIsOpenModal(!isOpenModal)
    // }, [imgPreviewIdx])

    useEffect(() => {
        checkIsInLibrary()
    }, [game])

    const toggleOpenModal = () => { setIsOpenModal(!isOpenModal) }
    const setMsg = (msg) => {
        dispatch(userMsg(msg))
    }

    const loadGame = async () => {
        const game = await gameService.getById(match.params.gameId)
        setGame(game)
        if (loggedInUser) checkIsInLibrary()
    }

    const checkIsInLibrary = async () => {
        if (!game) return
        const gameId = game._id
        const userId = loggedInUser._id
        const gameIsInLibrary = await orderService.checkIsInLibrary(gameId, userId)
        setIsInLibrary(gameIsInLibrary)
    }
    const changeIdxByDiff = (diff) => {
        if (diff > 0 && imgPreviewIdx < game.imgs.largeImgUrls.length - 1) {
            setImgPreviewIdx(imgPreviewIdx + diff)
        } else if (diff < 0 && imgPreviewIdx > 0) {
            setImgPreviewIdx(imgPreviewIdx + diff)
        }
    }

    const onAddReview = async (review) => {
        await dispatch(addReview(review, game._id, loggedInUser))
        loadGame()
    }

    const getDesc = () => {
        if (game) {
            const { description } = game
            const descriptions = description.split('.');
            let shortStr = ''
            let length = 3
            let newDescs = []
            descriptions.forEach((desc, idx) => {
                shortStr += desc + '. '
                if (idx === length) {
                    length += 3
                    newDescs.push(shortStr)
                    shortStr = ''
                }
            })
            return newDescs
        }
    }
    const getUserByReview = (review) => {
        let user = users.filter(user => user._id === review.byUser._id)
        return user[0]
    }

    const addToCart = () => {
        setOrderPath(`/game/order/${game._id}`)
    }

    if (!game) return <Loader />
    const finalPrice = utilService.getFinalPrice(game.price, game.discount)
    const descriptions = getDesc()
    return (
        <section className="main-details ">
            <DetailsTopNav game={game} />
            <h1 className="container" >{game.title}</h1>
            <div className="" ref={setTopRef}>
                <DetailsPanel game={game}
                    getDateString={utilService.getDateString}
                    setIsOpenModal={setIsOpenModal}
                    setImgPreviewIdx={setImgPreviewIdx} />
            </div>

            <div className="wishlist-link container " ref={setRef}>
                {loggedInUser && !isInLibrary && <button className="btn btn-light btn-outline-secondary" >Add to wishList</button>}
                {!loggedInUser && <p><Link to={'/login'}>Sign in</Link> to add this item to your wishlist, follow it, or mark it as ignored</p>}
            </div>

            <div className="buy-container flex column gap-10 container"  >
                <DetailsPriceBar isInLibrary={isInLibrary} game={game} finalPrice={finalPrice} />
                <DetailsSideBar loggedInUser={loggedInUser} isInLibrary={isInLibrary} />
            </div>

            <div className="flex mb-20 container ">

                <div className="desc"  >
                    <p className="title" >ABOUT THIS GAME</p>
                    {descriptions.map((desc, idx) => {
                        return (
                            <div key={'desc' + idx}>
                                <p>{desc}</p>
                                <br />

                            </div>
                        )
                    })}
                </div>
            </div>
            <ImgModal imgs={game.imgs.largeImgUrls}
                imgPreviewIdx={imgPreviewIdx}
                isOpenModal={isOpenModal}
                toggleOpenModal={toggleOpenModal}
                changeIdxByDiff={changeIdxByDiff}
            />


            <div className="add-review container description-container">
                <GamePreview game={game} addClass={`${addCardClass} ${(!visible && !visibleTop) && 'visible'}`} >
                    <div className="card-buy-btn">{!isInLibrary &&
                        <button className="btn-main" onClick={() => addToCart()}>Add to cart</button>}
                    </div>
                </GamePreview>
                <AddReview loggedInUser={loggedInUser} onAddReview={onAddReview} userMsg={setMsg} />
            </div>
            <div className="reviews-container container " ref={setBottomRef}>
                <ReviewList reviews={game.reviews} getUserByReview={getUserByReview} loggedInUser={loggedInUser} />
            </div>
        </section >

    )
}
