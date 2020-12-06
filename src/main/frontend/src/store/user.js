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
    isAdmin: false
  },


  mutations: {
    SET_USER(state, user) {
      state.login = user.login
      state.name = user.firstName
      state.surname = user.lasName
      state.middleName = user.midName
      state.phone = user.phone
      state.token = user.token
      if (user.roleName === 'admin')
        state.isAdmin = true
      Vue.$cookies.set('user', user, '1m')
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
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
    },

    // todo:
    SET_USER_ACCOUNT(state, data) {
      state.name = data.firstname
      state.surname = data.lastname
      state.middleName = data.midname
      state.order = data.order
      state.start = data.start != null ? data.start.split('/').join('.') : data.start
      state.end = data.end != null ? data.end.split('/').join('.') : data.end
      Vue.$cookies.set('username', {
        name: data.firstname,
        surname: data.lastname,
        role: state.isAdmin ? 'admin' : 'user'
      }, '1m')
    }
  },


  actions: {
    CHECK_AUTHORIZED({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        if (Vue.$cookies.get('user') != null) {
          commit('SET_USER', Vue.$cookies.get('user'))
          commit('SET_PROCESSING', false)
          resolve()
        } else {
          commit('AUTH_LOGOUT')
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

    AUTH_REQUEST({commit}, user) {
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
                commit('AUTH_LOGOUT')
                commit('SET_PROCESSING', false)
                reject('password')
              } else {
                commit('AUTH_LOGOUT')
                commit('SET_PROCESSING', false)
                reject()
              }
            },
            err => {
              commit('AUTH_LOGOUT')
              commit('SET_PROCESSING', false)
              reject(err)
            })
      })
    },

    AUTH_LOGOUT({commit}) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT')
        resolve()
      })
    },

    REG_REQUEST({commit}, user) {
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
                commit('AUTH_LOGOUT')
                commit('SET_PROCESSING', false)
                reject('login')
              } else {
                commit('AUTH_LOGOUT')
                commit('SET_PROCESSING', false)
                reject()
              }
            },
            err => {
              commit('AUTH_LOGOUT')
              commit('SET_PROCESSING', false)
              reject(err)
            })
      })
    },

    // todo:
    LOAD_ACCOUNT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/account'
        const url = '/account'             // SHOW!!!
        axios({url: url, method: 'GET'})
          .then(resp => {
            commit('SET_USER_ACCOUNT', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    // todo:
    UPDATE_USER({commit, dispatch, getters}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/account/update'
        const url = '/account/update'             // SHOW!!!
        axios({url: url, data: data, method: 'POST'})
          .then(() => {
            commit('SET_USER_ACCOUNT', data)
            dispatch('LOAD_CART', getters.date)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
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