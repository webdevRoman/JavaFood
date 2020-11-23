import axios from 'axios'

export default {
  state: {
    users: []
  },
  mutations: {
    CHANGE_USER_ROLE(status, user) {
      if (user.role == 'Пользователь')
        user.role = 'Администратор'
      else
        user.role = 'Пользователь'
    },
    CHANGE_USER_STATUS(status, user) {
      if (user.role == 'Подтвержден')
        user.role = 'Не подтвержден'
      else
        user.role = 'Подтвержден'
    },
    SET_USERS(state, data) {
      function formatDateCalendar(dateStr) {
        let dateArr = dateStr.split('.')
        if (dateArr[1].length > 1 && dateArr[1][0] == '0') {
          dateArr[1] = dateArr[1][1]
        }
        if (dateArr[2].length > 1 && dateArr[2][0] == '0') {
          dateArr[2] = dateArr[2][1]
        }
        return dateArr.join('.')
      }
      function formatDateInputs(dateStr) {
        let dateArr = dateStr.split('.')
        return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
      }
      let loadedUsers = []
      data.users.forEach(user => {
        let newUser = Object.assign({}, user)
        if (user.role == 'admin') {
          newUser.role = 'Администратор'
        } else if (user.role == 'user' || user.role == null) {
          newUser.role = 'Пользователь'
        } else if (user.role == 'banned') {
          newUser.role = 'Удален'
        }
        newUser.status = data.statuses[user.status].name
        if (user.start == null || user.end == null) {
          newUser.order = true
          newUser.calendarDates = {
            dateRange: {
              start: {
                date: false
              },
              end: {
                date: false
              }
            }
          }
          newUser.inputsDates = {
            start: '',
            end: ''
          }
        } else {
          newUser.order = false
          newUser.calendarDates = {
            dateRange: {
              start: {
                date: formatDateCalendar(user.start)
              },
              end: {
                date: formatDateCalendar(user.end)
              }
            }
          }
          newUser.inputsDates = {
            start: formatDateInputs(user.start),
            end: formatDateInputs(user.end)
          }
        }
        delete newUser.start
        delete newUser.end
        loadedUsers.push(newUser)
      })
      state.users = loadedUsers
    },
    DELETE_USER(state, id) {
      let arrIndex
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id == id) {
          arrIndex = i
          break
        }
      }
      state.users.splice(arrIndex, 1)
    },
    ADD_USER(state, user) {
      if (user.role == 'admin')
        user.role = 'Администратор'
      else
        user.role = 'Пользователь'
      user.status = 'Подтвержден'
      user.order = true
      user.calendarDates = {
        dateRange: {
          start: {
            date: false
          },
          end: {
            date: false
          }
        }
      }
      user.inputsDates = {
        start: '',
        end: ''
      }
      state.users.push(user)
    }
  },
  actions: {
    DOWNLOAD_ORDERS({commit}) {
      return new Promise((resolve, reject) => {
        // axios({ url: '/backend/modules/admin/report', data: { id: user.id, role: user.role == 'Администратор' ? 'admin' : 'user' }, method: 'POST' })
        // axios({ url: '/backend/modules/admin/report', method: 'POST' })
        axios({ url: '/admin/report', method: 'POST' })             // SHOW!!!
        .then(resp => {
          console.log(resp.data);
          resolve()
        },
        err => {
          reject(err)
        })
      })
    },
    LOAD_USERS({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // axios({ url: '/backend/modules/admin/index', method: 'GET' })
        axios({ url: '/admin/index', method: 'GET' })             // SHOW!!!
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
        // axios({ url: '/backend/modules/admin/reset-role', data: { id: user.id, role: user.role == 'Администратор' ? 'admin' : 'user' }, method: 'POST' })
        axios({ url: '/admin/reset-role', data: { id: user.id, role: user.role == 'Администратор' ? 'admin' : 'user' }, method: 'POST' })             // SHOW!!!
        .then(resp => {
          resolve()
        },
        err => {
          commit('CHANGE_USER_ROLE', user)
          reject(err)
        })
      })
    },
    CHANGE_USER_STATUS({commit}, user) {
      return new Promise((resolve, reject) => {
        if (user.status == 'Подтвержден') {
          // axios({ url: '/backend/modules/admin/verify', data: { id: user.id }, method: 'POST' })
          axios({ url: '/admin/verify', data: { id: user.id }, method: 'POST' })             // SHOW!!!
          .then(resp => {
            resolve()
          },
          err => {
            commit('CHANGE_USER_STATUS', user)
            reject(err)
          })
        } else {
          reject()
        }
      })
    },
    CHANGE_USER_LIMIT({commit}, data) {
      return new Promise((resolve, reject) => {
        // axios({ url: '/backend/modules/admin/limit', data: data, method: 'POST' })
        axios({ url: '/admin/limit', data: data, method: 'POST' })             // SHOW!!!
        .then(resp => {
          resolve()
        },
        err => {
          reject(err)
        })
      })
    },
    SET_USER_ORDER({commit}, data) {
      return new Promise((resolve, reject) => {
        // axios({ url: '/backend/modules/admin/order-cancel', data: data, method: 'POST' })
        axios({ url: '/admin/order-cancel', data: data, method: 'POST' })             // SHOW!!!
        .then(resp => {
          if (resp.data == 'success')
            resolve()
          else
            reject(`Изменения не сохранены. ${resp.data.id == undefined ? '' : resp.data.id[0] + ', '}${resp.data.start == undefined ? '' : resp.data.start[0] + ', '}${resp.data.end == undefined ? '' : resp.data.end[0]}.`)
        },
        err => {
          reject('Изменения не сохранены. ' + err)
        })
      })
    },
    DELETE_USER({commit}, id) {
      return new Promise((resolve, reject) => {
        // axios({ url: '/backend/modules/admin/delete', data: { id: id }, method: 'POST' })
        axios({ url: '/admin/delete', data: { id: id }, method: 'POST' })             // SHOW!!!
        .then(resp => {
          commit('DELETE_USER', id)
          resolve()
        },
        err => {
          reject(err)
        })
      })
    },
    ADD_USER({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // const url = '/backend/modules/admin/create'
        const url = '/admin/create'                         // SHOW!!!
        axios({ url: url, data: user, method: 'POST' })
        .then(resp => {
          console.log(resp.data);
          if (resp.data.id != undefined) {
            user.id = resp.data.id
            commit('ADD_USER', user)
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
      // send to server
      // commit('ADD_USER', user)
    }
  },
  getters: {
    users: state => state.users
  }
}