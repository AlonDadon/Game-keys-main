const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
// const utilServic = require('../../services/util-service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    // console.log('im waitinggggg... order service', orderId);
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ '_id': ObjectId(orderId) })
        // delete order.password

        // order.givenReviews = await reviewService.query({ byorderId: ObjectId(order._id) })
        // order.givenReviews = order.givenReviews.map(review => {
        //     delete review.byorder
        //     return review
        // })

        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}



async function add(order) {
    const { game, buyerId } = order
    const { discount, price, } = game
    try {
        // peek only updatable fields!
        const orderToAdd = {
            price,
            buyerId: ObjectId(buyerId),
            discount,
            game: {
                _id: ObjectId(game._id),
                img: game.img,
                title: game.title,
                sellerId: game.sellerId,
                serialKey:game.serialKey

            },
            createdAt: Date.now(),
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.buyerId) {
        criteria.buyerId = filterBy.buyerId
    }
    return criteria
}
