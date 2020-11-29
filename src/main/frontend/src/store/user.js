import Vue from 'vue'
import axios from 'axios'

export default {

  state: {
    login: '',
    name: '',
    surname: '',
    middlename: '',
    phone: '',
    token: '',
    isAdmin: false,
    // todo
    limit: 0,
    order: true,
    start: null,
    end: null
  },


  mutations: {
    SET_USER(state, user) {
      state.login = user.login
      state.name = user.firstName
      state.surname = user.lasName
      state.middlename = user.midName
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
      state.middlename = ''
      state.phone = ''
      state.token = ''
      state.isAdmin = false
      Vue.$cookies.remove('user')
      delete axios.defaults.headers.common['Authorization']
    },

    // todo
    SET_USER_ACCOUNT(state, data) {
      state.name = data.firstname
      state.surname = data.lastname
      state.middlename = data.midname
      state.order = data.order
      state.start = data.start != null ? data.start.split('/').join('.') : data.start
      state.end = data.end != null ? data.end.split('/').join('.') : data.end
      Vue.$cookies.set('username', { name: data.firstname, surname: data.lastname, role: state.isAdmin ? 'admin' : 'user' }, '1m')
    },

    // todo
    SET_LIMIT(state, limit) {
      Vue.set(state, 'limit', limit)
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

    CHECK_AUTHORIZED_ADMIN({commit, dispatch, getters}) {
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
        axios({ url: url, data: user, method: 'POST' })
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
        // commit('SET_PROCESSING', true)
        // const url = 'api/auth/logout'
        // axios({ url: url, method: 'POST' })
        // .then(resp => {
        //   commit('AUTH_LOGOUT')
        //   commit('SET_PROCESSING', false)
        //   resolve()
        // })
        // .catch(err => {
        //   commit('SET_PROCESSING', false)
        //   reject(err)
        // })
      })
    },

    REG_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = '/api/auth/register'
        axios({ url: url, data: user, method: 'POST' })
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

    // todo
    LOAD_ACCOUNT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/account'
        const url = '/account'             // SHOW!!!
        axios({ url: url, method: 'GET' })
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

    // todo
    UPDATE_USER({commit, dispatch, getters}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/account/update'
        const url = '/account/update'             // SHOW!!!
        axios({ url: url, data: data, method: 'POST' })
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
    },

    // todo
    SEND_LINK({commit}) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.get('email') != null) {
          commit('SET_PROCESSING', true)
          // const url = '/backend/modules/auth/resend'
          const url = '/auth/resend'             // SHOW!!!
          axios({ url: url, data: Vue.$cookies.get('email'), method: 'POST' })
          .then(() => {
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
        }
      })
    },

    // todo
    SEND_EMAIL({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/auth/reset-request'
        const url = '/auth/reset-request'             // SHOW!!!
        axios({ url: url, data: payload, method: 'POST' })
        .then(resp => {
          commit('SET_PROCESSING', false)
          resolve()
        },
        err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },

    // todo
    SEND_PASSWORDS({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/auth/reset-password'
        const url = '/auth/reset-password'             // SHOW!!!
        axios({ url: url, data: payload, method: 'POST' })
        .then(resp => {
          commit('SET_PROCESSING', false)
          resolve()
        },
        err => {
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
    middlename: state => state.middlename,
    phone: state => state.phone,
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.isAdmin,
    // todo
    limit: state => state.limit,
    order: state => state.order,
    start: state => state.start,
    end: state => state.end,
  }
}