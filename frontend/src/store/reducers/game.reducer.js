const initialState = {
    games: [],
}

export function gameReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_GAMES':
            return { ...state, games: action.games }
        case 'ADD_GAME':
            return { ...state, games: [...state.games, action.game] }
        case 'REMOVE_GAME':
            return { ...state, games: state.games.filter(game => game._id !== action.gameId) }
        case 'UPDATE_GAME':
            return {
                ...state,
                games: state.games.map(game =>
                    game._id === action.game._id ? action.game : game
                )
            }
        default:
            return state
    }
}