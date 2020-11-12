import { USER_LOGIN } from './types'

export function loginUser() {
  return async dispatch => {
    const response = await fetch('http://jsonplaceholder.typicode.com/users/1')
    const json = await response.json()
    console.log(json)
    dispatch({ type: USER_LOGIN, payload: json })
  }
}