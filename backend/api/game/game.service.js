const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
// const utilServic = require('../../services/util-service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    // getByUsername,
    remove,
    update,
    add,
    addReview,
    getNewRating
}

async function query(filterBy = { tag: 'all', txt: '' }, sort = { sortby: 'title' }) { //probably no need
    const filterCriteria = _buildCriteria(filterBy)
    let { sortBy } = sort
    try {
        const collection = await dbService.getCollection('game')
        var games
        if(sortBy === 'title'){
            games = await collection.find(filterCriteria, { [sortBy]: 1, _id: 0 }).sort({ [sortBy]: 1 }).toArray()
        }else if (sortBy=== 'minPrice'){
            sortBy='price'
            games = await collection.find(filterCriteria, { [sortBy]: 1, _id: 0 }).sort({ [sortBy]: 1 }).toArray()
        }else if (sortBy=== 'maxPrice'){
            sortBy='price'
            games = await collection.find(filterCriteria, { [sortBy]: 1, _id: 0 }).sort({ [sortBy]: -1 }).toArray()
        }else{
            games = await collection.find(filterCriteria, { [sortBy]: 1, _id: 0 }).sort({ [sortBy]: -1 }).toArray()
        }
        // games = games.map(game => {
        //     delete game.password
        //     game.createdAt = ObjectId(game._id).getTimestamp() 
        //     why is that????
        //     Returning fake fresh data
        //     game.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
        //     return game
        // })
        return games
    } catch (err) {
        logger.error('cannot find games', err)
        throw err
    }
}

async function getById(gameId) {
    // console.log('im waitinggggg... game service', gameId);
    try {
        const collection = await dbService.getCollection('game')
        const game = await collection.findOne({ '_id': ObjectId(gameId) })
        // delete game.password

        // game.givenReviews = await reviewService.query({ bygameId: ObjectId(game._id) })
        // game.givenReviews = game.givenReviews.map(review => {
        //     delete review.bygame
        //     return review
        // })

        return game
    } catch (err) {
        logger.error(`while finding game ${gameId}`, err)
        throw err
    }
}
async function remove(gameId) {
    try {
        const collection = await dbService.getCollection('game')
        await collection.deleteOne({ '_id': ObjectId(gameId) })
    } catch (err) {
        logger.error(`cannot remove game ${gameId}`, err)
        throw err
    }
}
async function update({ title, price, tags, _id, discount, reviews, rating, sDescription, description,videoUrls }) {
    console.log('Add function', title, price, tags, _id, discount);
    try {
        // peek only updatable fields!
        const gameToSave = {
            _id: ObjectId(_id),
            rating,
            title,
            price,
            tags,
            discount,
            updatedAt: Date.now(),
            reviews,
            sDescription,
            description,
            videoUrls
        }
        const collection = await dbService.getCollection('game')
        await collection.updateOne({ '_id': gameToSave._id }, { $set: gameToSave })
        return gameToSave;
    } catch (err) {
        logger.error(`cannot update game ${_id}`, err)
        throw err
    }
}

async function add({ title, price, tags, discount, description,
    imgs, serialKey, releasedAt, seller, videoUrls, sDescription }) {

    try {
        // peek only updatable fields!
        const gameToAdd = {
            title,
            price,
            seller,
            tags,
            discount,
            imgs,
            description,
            releasedAt,
            serialKey,
            rating: 0,
            wishlistCount: 0,
            reviews: [],
            videoUrls,
            sDescription,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const collection = await dbService.getCollection('game')
        await collection.insertOne(gameToAdd)
        return gameToAdd
    } catch (err) {
        logger.error('cannot insert game', err)
        throw err
    }
}

async function addReview(review, gameId) {
    const game = await getById(gameId)
    game.rating = getNewRating(game.rating, game.reviews.length, review.rate)
    game.reviews.unshift(review)
    await update(game)
    return game
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                title: txtCriteria
            },
            {
                sDescription: txtCriteria
            },
            {
                description: txtCriteria
            }
        ]
    }
    if (filterBy.tag !== 'all') {
        criteria.tags = filterBy.tag
    }
    return criteria
}
function getNewRating(prevRating, prevLength, newRating) {
    return (prevRating * prevLength + newRating) / (prevLength + 1)
}