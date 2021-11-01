import { userService } from '../../services/user.service'

// THUNK action creators
// Work asynchronously with the service and dispatch actions to the reducers 

export function loadUsers() {
  return async dispatch => {
    try {
      dispatch({ type: 'LOADING_START' })
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('UserActions: err in loadUsers', err)
    } finally {
      dispatch({ type: 'LOADING_DONE' })
    }
  }
}

export function removeUser(userId) {
  return async dispatch => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}


export function login(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.login(userCreds)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in login', err)
      throw err
    }
  }
}
export function signup(userCreds) {
  return async dispatch => {
    try {
      const user = await userService.signup(userCreds)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('UserActions: err in signup', err)
    }
  }
}
export function logout() {
  return async dispatch => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('UserActions: err in logout', err)
    }
  }
}

export function updateUser(user) {
  return async dispatch => {
    try {
      // console.log('actionnnnnn', user);
      let userToSave
      userToSave = await userService.updateUser(user) //after back is runing change to add
      // console.log('userToSave', userToSave);
      const action = { type: 'UPDATE_USER', user: userToSave }
      dispatch(action)
    } catch (err) {
      console.log('usersActions: err in saveUser', err)
      dispatch({ type: 'SET_MSG', msg:'Error updating user' })
    }
  }
}

 export function userMsg(msg) {
  return dispatch => {
    dispatch({ type: 'SET_MSG', msg })
  }
}
