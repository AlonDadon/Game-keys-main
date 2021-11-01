const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ORDERS':
            return { ...state, orders: action.orders }
        case 'ADD_ORDER':
            return { ...state, orders: [...state.orders, action.order] }
        default:
            return state
    }
}