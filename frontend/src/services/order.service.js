import { httpService } from './http.service'
import { userService } from './user.service'

export const orderService = {
    getOrders,
    getById,
    // remove,
    save,
    checkIsInLibrary
    // addReview
}

function getOrders(filterBy = {},) {
    return httpService.get('order', filterBy)

}

function getById(orderId) {
    return httpService.get(`order/${orderId}`, orderId)
}

function save(order, buyer) {
    // if (order._id) {
    //     return httpService.put(`order/${order._id}`, order)
    // } else {
    const newOrder = {
        order,
        buyer
    }
    return httpService.post(`order`, newOrder)
    // }
}

async function checkIsInLibrary(gameId, userId) {

    const user = await userService.getById(userId)
    return user.orders.some(order => order.game._id === gameId)
}