

const initialState = {
    carts: [],
}

export function cartReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_CARTS':
            return { ...state, carts: action.carts }
        case 'ADD_CART':
            console.log('action', action.cart);
            return { ...state, carts: [...state.carts, action.cart] }
        case 'REMOVE_CART':
            return { ...state, carts: state.carts.filter(cart => cart.game._id !== action.gameId) }
        case 'REMOVE_CARTS':
            return { ...state, carts: [] }
        default:
            return state
    }
}
