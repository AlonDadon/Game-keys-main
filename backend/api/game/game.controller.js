const gameService = require('./game.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')
const { makeId } = require('../../services/util-service')


module.exports = {
    addGame,
    getGame,
    getGames,
    deleteGame,
    updateGame,
    addReview
}

async function getGame(req, res) {
    try {
        const game = await gameService.getById(req.params.id)
        res.send(game)
    } catch (err) {
        logger.error('Failed to get game', err)
        res.status(500).send({ err: 'Failed to get game' })
    }
}
async function getGames(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || '',
            tag: req.query.tag || 'all',
        }
        const sort = {
            sortBy: req.query.sortBy || 'title',
        }
        const games = await gameService.query(filterBy, sort)
        res.send(games)
    } catch (err) {
        logger.error('Failed to get games', err)
        res.status(500).send({ err: 'Failed to get games' })
    }
}
async function deleteGame(req, res) {
    try {
        await gameService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete game', err)
        res.status(500).send({ err: 'Failed to delete game' })
    }
}

async function updateGame(req, res) {
    try {
        const game = req.body
        const savedGame = await gameService.update(game)
        res.send(savedGame)
        // socketService.broadcast({ type: 'game-updated', data: review, to: savedGame._id })
    } catch (err) {
        logger.error('Failed to update game', err)
        res.status(500).send({ err: 'Failed to update game' })
    }
}
async function addGame(req, res) {
    try {
        const game = req.body
        const savedGame = await gameService.add(game)
        res.send(savedGame)
        // socketService.broadcast({ type: 'game-updated', data: review, to: savedGame._id })
    } catch (err) {
        logger.error('Failed to update game', err)
        res.status(500).send({ err: 'Failed to update game' })
    }
}
async function addReview(req, res) {
    try {
        const {_id,fullname,imgUrl} = req.body.byUser
        const reviewToAdd = {
            id: makeId(),
            txt: req.body.review.txt,
            rate: req.body.review.rate,
            createdAt: Date.now(),
            byUser: {_id}
        }
        const { gameId } = req.body
        const game = await gameService.addReview(reviewToAdd, gameId)
        res.send(game)
        // socketService.broadcast({ type: 'game-updated', data: review, to: savedGame._id })
    } catch (err) {
        logger.error('Failed to update game', err)
        res.status(500).send({ err: 'Failed to update game' })
    }
}
