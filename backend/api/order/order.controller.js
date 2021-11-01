const orderService = require('./order.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')


module.exports = {
    addOrder,
    getOrder,
    getOrders,
}

async function getOrder(req, res) {
    try {
        const order = await orderService.getById(req.params.id)
        res.send(order)
    } catch (err) {
        logger.error('Failed to get order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}
async function getOrders(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query.txt || '',
        //     tag: req.query.tag || 'all',
        // }
        // const sort ={
        //     sortBy:req.query.sortBy || 'title',  
        // } 
        const orders = await orderService.query()
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    try {
        const order ={
            game: req.body.order.game,
            buyerId:req.body.buyer._id
        } 
        const savedOrder = await orderService.add(order)
        res.send(savedOrder)
        // socketService.broadcast({ type: 'order-updated', data: review, to: savedOrder._id })
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}