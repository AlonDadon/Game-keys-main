const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const orderService = require('../order/order.service')
const ObjectId = require('mongodb').ObjectId
const cloudinaryService = require('../../services/cloudinary.service')
const bcrypt = require('bcrypt')


module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        const orders = await orderService.query({ buyerId: ObjectId(userId) })
        user.orders = orders
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update({ orders, createdAt, friends, _id, username, fullname, imgUrl, newPassword }) {
    const user = getById(_id)
    const img = (user.imgUrl === imgUrl) ? imgUrl : await cloudinaryService.uploadImgToCloudinary(imgUrl)
    const saltRounds = 10
    console.log('newPassword newPassword newPassword', newPassword);
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(_id),
            username,
            fullname,
            friends,
            imgUrl:img.url,
            orders,
            updatedAt: Date.now(),
            createdAt,
        }
        if(newPassword.length > 0) userToSave.password = await bcrypt.hash(newPassword, saltRounds)
        console.log(userToSave);
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        // userToSave.delete(password)
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add({ username, password, fullname, imgUrl }) {
    if(!imgUrl) imgUrl = 'https://res.cloudinary.com/dat4toc2t/image/upload/v1633477090/GK/no-image-available-icon_qxycdt.jpg'
    try {
        // peek only updatable fields!
        const userToAdd = {
            username,
            password,
            fullname,
            imgUrl,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}


