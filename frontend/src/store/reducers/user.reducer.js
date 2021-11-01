let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
  msg: '',
  loggedInUser: localLoggedinUser,
  users: []
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'SET_MSG':
      return { ...state, msg: action.msg }
      case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user._id === action.user._id ? action.user : user,
                ),
                msg:'User has been updated'
            }
    default:
      return state
  }
}
