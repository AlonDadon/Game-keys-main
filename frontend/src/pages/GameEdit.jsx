import React, { useEffect, useState } from 'react'
import { handleFile, useForm, useUploadImg } from '../services/customHooks.js'
import { useDispatch } from 'react-redux'
import { saveGame } from '../store/actions/game.actions.js'
import { gameService } from '../services/game.service'
import { utilService } from '../services/util.service'
import { Loader } from '../cmps/UtilCmps/Loader'
import { FormInput } from '../cmps/UtilCmps/FormInput'
import { useSelector } from 'react-redux'
import { TagList } from '../cmps/TagList.jsx'


export const GameEdit = ({ history, match }) => {
    const { loggedInUser } = useSelector(state => state.userModule)
    const [game, handleChange, setGame] = useForm(gameService.getEmptyGame())
    const [gameImages, setGameImages] = useState([])
    const [newImage, setNewImage] = useState('')
    const [imgIdx, setImgIdx] = useState('')
    const dispatch = useDispatch()

    useEffect(async () => {
        window.scrollTo(0, 0)
        const { gameId } = match.params
        // console.log(gameId);
        if (gameId) await loadGame(gameId); setDefultImages(gameId);

    }, [])

    useEffect(() => {
        if (!newImage) return
        const newGameImages = [...gameImages]
        newGameImages.splice(imgIdx, 1, newImage)
        setGameImages(newGameImages)
    }, [newImage])

    const loadGame = async (gameId) => {
        const _game = await gameService.getById(gameId)
        if (!_game || (_game.seller._id !== loggedInUser._id)) history.push('/')

        // const dateValueString = new Date(game.releasedAt).toISOString().slice(0,10).replace(/-/g,"xxx");
        //example of how to use regEx to change the string, ex: 2021-03-25 => 2021xxx03xxx25
        if (_game.releasedAt) {
            const newDateValueString = new Date(_game.releasedAt).toISOString().slice(0, 10)
            _game.releasedAt = newDateValueString
        }
       if(_game.videoUrls.length === 0) _game.videoUrls = ['','',''];
        setGame({ ..._game })
        setGameImages([..._game.imgs.largeImgUrls])
    }

    const setDefultImages = (gameId) => {
        if (gameId) return
        const defaultImage = 'https://res.cloudinary.com/dat4toc2t/image/upload/v1633548278/GK/camera-add-icon_wiloio.jpg'
        const images = game.imgs.largeImgUrls.fill(defaultImage)
        setGameImages([...images])
    }

    const uploadImg = async (ev, idx) => {
        const fileEv = ev.target.files[0]
        setImgIdx(idx)
        handleFile(fileEv, setNewImage)
    }

    const addRemoveTag = (tag) => {
        const { tags } = game
        let tagIndex
        if (tags.includes(tag)) {
            tagIndex = tags.indexOf(tag)
            tags.splice(tagIndex, 1)
        } else {
            tags.push(tag)
        }
        setGame({ ...game })
    }
    const onAddGame = (ev) => {
        ev.preventDefault()
        if (!game._id) {
            const { _id, fullname, imgUrl } = loggedInUser
            game.seller = {
                _id,
                fullname,
                imgUrl
            }
        }
        game.imgs.largeImgUrls = gameImages
        console.log(game);
        dispatch(saveGame(game))
        // history.push('/profile')
        //"https://res.cloudinary.com/dat4toc2t/image/upload/v1623183656/GameKeys/img/assassin-creed/5_c1sa8u.jpg"
    }
    if (!game) {
        return <Loader />
    }
    else
        return (
            <section className="game-edit container">
                <form className="game-edit-form flex column" onSubmit={onAddGame}>
                    {game._id ? <h1>Edit game</h1> : <h1>Add game</h1>}
                    <div className="form-container flex space-between">
                        <div className="info-area flex">
                            <div className="info-details">
                                <FormInput type="text" name="title" label="title" value={game.title} handleChange={handleChange} />
                                <FormInput type="text" name="serialKey" label="serialKey" value={game.serialKey} handleChange={handleChange} />
                                <FormInput type="number" name="price" label="price" value={game.price} handleChange={handleChange} />
                                <FormInput type="number" name="discount" label="discount" value={game.discount} handleChange={handleChange} />
                                <FormInput type="date" name="releasedAt" label="released At" value={game.releasedAt} handleChange={handleChange} />

                                <TagList tags={game.tags} addRemoveTag={addRemoveTag} />
                                <FormInput type="textarea" name="sDescription" label="short Description"
                                    value={game.sDescription} handleChange={handleChange}
                                    cols="40" rows="5"
                                />

                                
                            </div>
                            <div className="info-text">
                                <FormInput type="textarea" name="description" label="description"
                                    value={game.description} handleChange={handleChange}
                                    cols="40" rows="10" />
                            </div>
                        </div>
                        <div className="media-area">
                            <p>Upload pictures: add up to 5 pictures</p>
                            <div className="images-area flex">
                                {gameImages && gameImages.map((image, idx) => {
                                    return (
                                        <label className="img-upload" key={`imageUrlInput${idx}`}>
                                            <img src={image} alt="user" />
                                            <input
                                                id="fileInput"
                                                type="file"
                                                name="imgUrl"
                                                onChange={((ev) => uploadImg(ev, idx))}
                                                value={''}
                                                className="img-input"
                                                accept="image/png, image/jpeg"
                                            />
                                        </label>
                                    )
                                })}
                            </div>
                            <div className="video-area">
                                <p>Video Urls: add up to 3 Youtube urls</p>
                                {game.videoUrls.map((url, index) =>
                                    <FormInput type="text" key={`videoUrlsKey${index}`} name="videoUrls" label={`video Url ${index+1}`}
                                        value={url} handleChange={(ev) => handleChange(ev, index)} />
                                )}
                                {/* <FormInput type="text" name="videoUrls[1]" label="video Url 1" value={videoUrls.url0} handleChange={handleChanges('url0')} />
                                <FormInput type="text" name="videoUrls[2]" label="video Url 2" value={videoUrls.url1} handleChange={handleChanges('url1')} />
                                <FormInput type="text" name="videoUrls[3]" label="video Url 3" value={videoUrls.url2} handleChange={handleChanges('url2')} /> */}
                            </div>
                        </div>
                    </div>
                    <button className='btn-main' type='submit'>Save</button>
                </form>
            </section>
        )
}