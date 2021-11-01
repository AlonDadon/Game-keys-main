import { orderService } from '../../services/order.service'

export function loadOrders(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const orders = await orderService.getOrders(filterBy)
            dispatch({ type: 'SET_ORDERS', orders })
        } catch (err) {
            console.log('OrderActions: err in loadOrders', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}
export function saveOrder(order, buyer) {
    return async dispatch => {
        try {
            
            const orderToSave = await orderService.save(order, buyer) //after back is runing change to add
            const action ={ type: 'ADD_ORDER', order: orderToSave }
            dispatch(action)
            return orderToSave
        } catch (err) {
            console.log('OrdersActions: err in saveOrder', err)
        }
    }
}
