import axios from "axios"

export default {

  state: {
    users: []
  },

  mutations: {
    SET_USERS(state, data) {
      data.forEach(user => {
        user.roleName = {
          label: user.roleName === 'admin' ? 'Администратор' : 'Пользователь',
          code: user.roleName
        }
      })
      state.users = data
    },

    ADD_USER(state, user) {
      user.roleName = {
        label: user.roleName === 'admin' ? 'Администратор' : 'Пользователь',
        code: user.roleName
      }
      state.users = [...state.users, user]
    },

    CHANGE_USER_ROLE(state, user) {
      state.users.find(u => u.login === user.login).roleName = user.roleName
      state.users = [...state.users]
    },

    DELETE_USER_ADMIN(state, login) {
      let arrIndex
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].login == login) {
          arrIndex = i
          break
        }
      }
      state.users.splice(arrIndex, 1)
    },
  },

  actions: {
    LOAD_USERS({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({url: '/api/user/admin', method: 'GET'})
          .then(resp => {
            commit('SET_USERS', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    CHANGE_USER_ROLE({commit}, user) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/user/admin/role', data: {login: user.login, roleName: user.roleName.code}, method: 'PUT'})
          .then(() => {
            commit('CHANGE_USER_ROLE', user)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    ADD_USER({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        const url = 'api/auth/register'
        axios({url: url, data: user, method: 'POST'})
          .then(resp => {
            if (resp.data) {
              commit('ADD_USER', resp.data)
              commit('SET_PROCESSING', false)
              resolve()
            } else if (resp.data === "") {
              commit('SET_PROCESSING', false)
              reject()
            } else {
              commit('SET_PROCESSING', false)
              reject()
            }
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    DELETE_USER_ADMIN({commit}, login) {
      return new Promise((resolve, reject) => {
        commit('DELETE_USER_ADMIN', login)
        axios({url: '/api/user/admin', data: login, method: 'DELETE'})
          .then(() => resolve())
          .catch(err => reject(err))
      })
    }
  },

  getters: {
    users: state => state.users
  }

}