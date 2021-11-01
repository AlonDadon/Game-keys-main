import { gameService } from '../../services/game.service'

export function loadGames(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const games = await gameService.getGames(filterBy)
            dispatch({ type: 'SET_GAMES', games })
        } catch (err) {
            console.log('GameActions: err in loadGames', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}
export function saveGame(game) {
    return async dispatch => {
        try {
            // const toyToSave = (!toy._id) ? await toyService.add(toy) : await toyService.update(toy)
            let gameToSave
            gameToSave = await gameService.save(game) //after back is runing change to add
            const action = (!game._id) ? { type: 'ADD_GAME', game: gameToSave } : { type: 'UPDATE_GAME', game: gameToSave }
            dispatch(action)
        } catch (err) {
            console.log('GamesActions: err in saveGame', err)
        }
    }
}
export function addReview(review, gameId, loggedInUser) {
    return async dispatch => {
        try {
            const game = await gameService.addReview(review, gameId, loggedInUser)
            dispatch({ type: 'UPDATE_GAME', game })
        } catch (err) {
            console.log('GamesActions: err in addReview', err)
        }
    }
}
export function removeGame(gameId) {
    return async dispatch => {
        try {
            await gameService.remove(gameId)
            dispatch({ type: 'REMOVE_GAME', gameId })
        } catch (err) {
            console.log('GameActions: err in removeGame', err)
        }
    }
}