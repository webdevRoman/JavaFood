import { USER_LOGIN } from './types'

const initialState = {
  id: '',
  token: '',
  login: '',
  role: '',
  firstName: '',
  lastName: '',
  midName: '',
  phone: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload }
    default: return state
  }
}