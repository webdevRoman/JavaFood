import Vue from 'vue'
import axios from 'axios'

export default {

  state: {
    login: '',
    name: '',
    surname: '',
    middleName: '',
    phone: '',
    token: '',
    isAdmin: false,
    users:[]
  },


  mutations: {
    SET_USER(state, user) {
      state.login = user.login
      state.name = user.firstName
      state.surname = user.lastName
      state.middleName = user.midName
      state.phone = user.phone
      state.token = user.token
      if (user.roleName === 'admin')
        state.isAdmin = true
      Vue.$cookies.set('user', user, '1m')
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    },

    UPDATE_USER(state, user) {
      state.login = user.login
      state.name = user.firstName
      state.surname = user.lastName
      state.middleName = user.midName
      state.phone = user.phone
      user.token = state.token
      user.roleName = state.isAdmin ? 'admin' : 'user'
      Vue.$cookies.set('user', user, '1m')
    },

    AUTH_LOGOUT(state) {
      state.status = ''
      state.name = ''
      state.surname = ''
      state.middleName = ''
      state.phone = ''
      state.token = ''
      state.isAdmin = false
      Vue.$cookies.remove('user')
      delete axios.defaults.headers.common['Authorization']
    }
  },


  actions: {
    CHECK_AUTHORIZED({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        if (Vue.$cookies.get('user') != null) {
          commit('SET_USER', Vue.$cookies.get('user'))
          commit('SET_PROCESSING', false)
          resolve()
        } else {
          dispatch('AUTH_LOGOUT')
          commit('SET_PROCESSING', false)
          reject()
        }
      })
    },

    CHECK_AUTHORIZED_ADMIN({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        dispatch('CHECK_AUTHORIZED')
          .then(() => {
            if (Vue.$cookies.get('user').roleName == 'admin')
              resolve()
            else
              reject()
          })
          .catch(() => {
            reject()
          })
      })
    },

    AUTH_REQUEST({commit, dispatch}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/api/auth/login'
        axios({url: url, data: user, method: 'POST'})
          .then(resp => {
            if (resp.data) {
              commit('SET_USER', resp.data)
              commit('SET_PROCESSING', false)
              resolve()
            } else if (resp.data === "") {
              dispatch('AUTH_LOGOUT')
              commit('SET_PROCESSING', false)
              reject('password')
            } else {
              dispatch('AUTH_LOGOUT')
              commit('SET_PROCESSING', false)
              reject()
            }
          })
          .catch(err => {
            dispatch('AUTH_LOGOUT')
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    AUTH_LOGOUT({commit}) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT')
        commit('CLEAR_FAVOURITES')
        commit('CLEAR_ORDER')
        resolve()
      })
    },

    REG_REQUEST({commit, dispatch}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/api/auth/register'
        axios({url: url, data: user, method: 'POST'})
          .then(resp => {
            if (resp.data) {
              commit('SET_USER', resp.data)
              commit('SET_PROCESSING', false)
              resolve()
            } else if (resp.data === "") {
              dispatch('AUTH_LOGOUT')
              commit('SET_PROCESSING', false)
              reject('login')
            } else {
              dispatch('AUTH_LOGOUT')
              commit('SET_PROCESSING', false)
              reject()
            }
          })
          .catch(err => {
            dispatch('AUTH_LOGOUT')
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    UPDATE_USER({commit, dispatch}, newUser) {
      return new Promise(async (resolve, reject) => {
        commit('SET_PROCESSING', true)
        try {
          let updateUserPasswordResp, updateDishUserDataResp
          if (newUser.oldPassword && newUser.password)
            updateUserPasswordResp = await  dispatch('UPDATE_USER_PASSWORD', newUser)
          updateDishUserDataResp = await  dispatch('UPDATE_USER_DATA', newUser)
          let resp = updateDishUserDataResp ? updateDishUserDataResp : (updateUserPasswordResp ? updateUserPasswordResp : null)
          commit('SET_PROCESSING', false)
          if (resp && resp.data) {
            commit('UPDATE_USER', resp.data)
            resolve()
          } else {
            reject('Ошибка при обновлении данных профиля.')
          }
        } catch (err) {
          commit('SET_PROCESSING', false)
          reject(err)
        }
      })
    },

    // eslint-disable-next-line no-empty-pattern
    UPDATE_USER_DATA({}, newUser) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/user', data: newUser, method: 'PUT'})
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },

    // eslint-disable-next-line no-empty-pattern
    UPDATE_USER_PASSWORD({}, newUser) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/user/password', data: newUser, method: 'PUT'})
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    }
  },


  getters: {
    login: state => state.login,
    name: state => state.name,
    surname: state => state.surname,
    middleName: state => state.middleName,
    phone: state => state.phone,
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.isAdmin
  }
}