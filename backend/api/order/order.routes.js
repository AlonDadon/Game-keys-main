const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getOrder, getOrders,addOrder} = require('./order.controller')
const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
// router.post('/', requireAuth, requireAdmin,addOrder)
router.post('/',addOrder)

module.exports = router