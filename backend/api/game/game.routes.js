const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getGame, getGames, deleteGame, updateGame,addGame, addReview} = require('./game.controller')
const router = express.Router()

router.get('/', getGames)
router.get('/:id', getGame)
// router.post('/', requireAuth, requireAdmin,addGame)
router.post('/',addGame)
// router.put('/:id', requireAuth, requireAdmin,updateGame)
router.put('/review', addReview)
router.put('/:id', updateGame)
// router.delete('/:id', requireAuth, requireAdmin, deleteGame)
router.delete('/:id',  deleteGame)

module.exports = router