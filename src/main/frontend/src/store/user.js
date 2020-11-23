import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    isAuthenticated: false,
    isAdmin: false,
    name: '',
    surname: '',
    middlename: '',
    limit: 0,
    order: true,
    start: null,
    end: null
  },
  mutations: {
    SET_AUTHENTICATED(state, data) {
      state.isAuthenticated = data
    },
    LOAD_USERNAME(state) {
      const username = Vue.$cookies.get('username')
      state.name = username.name
      state.surname = username.surname
      if (username.role == 'admin')
        state.isAdmin = true
      state.isAuthenticated = true
    },
    SET_USER(state, user) {
      state.name = user.firstname
      state.surname = user.lastname
      if (user.role == 'admin')
        state.isAdmin = true
      state.isAuthenticated = true
      Vue.$cookies.set('username', { name: user.firstname, surname: user.lastname, role: user.role }, '1m')
    },
    AUTH_LOGOUT(state) {
      state.status = ''
      state.token = ''
      state.name = ''
      state.surname = ''
      state.isAdmin = false
      state.isAuthenticated = false
      Vue.$cookies.remove('username')
    },
    SET_USER_ACCOUNT(state, data) {
      state.name = data.firstname
      state.surname = data.lastname
      state.middlename = data.midname
      state.order = data.order
      state.start = data.start != null ? data.start.split('/').join('.') : data.start
      state.end = data.end != null ? data.end.split('/').join('.') : data.end
      Vue.$cookies.set('username', { name: data.firstname, surname: data.lastname, role: state.isAdmin ? 'admin' : 'user' }, '1m')
    },
    SET_LIMIT(state, limit) {
      Vue.set(state, 'limit', limit)
    }
  },
  actions: {
    CHECK_AUTHORIZED({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        if (Vue.$cookies.get('username') != null) {
          commit('SET_AUTHENTICATED', true)
          commit('SET_PROCESSING', false)
          resolve()
        } else {
          commit('SET_AUTHENTICATED', false)
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
          if (Vue.$cookies.get('username').role == 'admin')
            resolve()
          else
            reject()
        })
        .catch(() => {
          reject()
        })
      })
    },
    LOAD_USERNAME({commit}) {
      commit('LOAD_USERNAME')
    },
    AUTH_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/auth/login'
        const url = '/auth/login'             // SHOW!!!
        axios({ url: url, data: user, method: 'POST' })
        .then(resp => {
          if (resp.data.firstname != undefined && resp.data.lastname != undefined && resp.data.role != 'banned') {
            commit('SET_USER', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          } else if (resp.data.password != undefined) {
            commit('SET_PROCESSING', false)
            reject('password')
          } else if (resp.data.role == 'banned') {
            commit('SET_PROCESSING', false)
            reject('banned')
          }else {
            reject()
          }
        },
        err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    AUTH_LOGOUT({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/auth/logout'
        const url = '/auth/logout'             // SHOW!!!
        axios({ url: url, method: 'POST' })
        .then(resp => {
          commit('AUTH_LOGOUT')
          commit('SET_PROCESSING', false)
          resolve()
        })
        .catch(err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
    REG_REQUEST({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/auth/signup'
        const url = '/auth/signup'             // SHOW!!!
        axios({ url: url, data: user, method: 'POST' })
        .then(resp => {
          if (resp.data == 'success') {
            Vue.$cookies.set('email', user.email, '1m')
            commit('SET_PROCESSING', false)
            resolve()
          } else if (resp.data.email != undefined) {
            commit('SET_PROCESSING', false)
            reject('email')
          } else {
            commit('SET_PROCESSING', false)
            reject()
          }
        },
        err => {
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },
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
    name: state => state.name,
    surname: state => state.surname,
    middlename: state => state.middlename,
    isAuthenticated: state => state.isAuthenticated,
    isAdmin: state => state.isAdmin,
    limit: state => state.limit,
    order: state => state.order,
    start: state => state.start,
    end: state => state.end,
  }
}