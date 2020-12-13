import Vue from 'vue'

export default {

  state: {
    errors: {},
    nameMask: /^[А-Яа-яё]{0,35}$/,
    loginMask: /^[A-Za-z0-9]{0,35}$/,
    passwordMask: /^[A-Za-z0-9]{6,25}$/,
    phoneMask: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    timeMask: /^\d{2}:\d{2}$/,
    dishNameMask: /^[А-Яа-яёA-Za-z0-9\s]{0,35}$/,
    emailMask: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,10}$/,
  },


  mutations: {
    CHECK_NAME(state, payload) {
      Vue.set(state.errors, payload.type, undefined)
      if (payload.data.length == 0 && payload.type != 'middlename') {
        Vue.set(state.errors, payload.type, 'empty')
      } else if (payload.data.length > 35) {
        Vue.set(state.errors, payload.type, 'long')
      } else if (payload.type === 'dishName' && !payload.data.match(state.dishNameMask)) {
        Vue.set(state.errors, payload.type, 'wrong')
      } else if (payload.type !== 'dishName' && !payload.data.match(state.nameMask)) {
        Vue.set(state.errors, payload.type, 'wrong')
      }
    },

    CHECK_LOGIN(state, login) {
      Vue.set(state.errors, 'login', undefined)
      if (login.length == 0) {
        Vue.set(state.errors, 'login', 'empty')
      } else if (login.length > 50) {
        Vue.set(state.errors, 'login', 'long')
      } else if (!login.match(state.loginMask)) {
        Vue.set(state.errors, 'login', 'wrong')
      }
    },

    CHECK_OLD_PASSWORD(state, password) {
      Vue.set(state.errors, 'oldPassword', undefined)
      if (password.length == 0) {
        Vue.set(state.errors, 'oldPassword', 'empty')
      }
    },

    CHECK_PASSWORD(state, password) {
      Vue.set(state.errors, 'password', undefined)
      if (password.length == 0) {
        Vue.set(state.errors, 'password', 'empty')
      } else if (password.length < 6) {
        Vue.set(state.errors, 'password', 'short')
      } else if (password.length > 25) {
        Vue.set(state.errors, 'password', 'long')
      } else if (!password.match(state.passwordMask)) {
        Vue.set(state.errors, 'password', 'wrong')
      }
    },

    CHECK_PASSWORD_REPEAT(state, password) {
      Vue.set(state.errors, 'passwordRepeat', undefined)
      if (password.passwordRepeat.length == 0) {
        Vue.set(state.errors, 'passwordRepeat', 'empty')
      } else if (password.password !== password.passwordRepeat) {
        Vue.set(state.errors, 'passwordRepeat', 'wrong')
      }
    },

    CHECK_PHONE(state, phone) {
      Vue.set(state.errors, 'phone', undefined)
      if (phone.length == 0) {
        Vue.set(state.errors, 'phone', 'empty')
      } else if (!phone.match(state.phoneMask)) {
        Vue.set(state.errors, 'phone', 'wrong')
      }
    },

    CHECK_ADDRESS(state, address) {
      Vue.set(state.errors, 'address', undefined)
      if (address.length == 0) {
        Vue.set(state.errors, 'address', 'empty')
      }
    },

    CHECK_TIME(state, time) {
      Vue.set(state.errors, 'time', undefined)
      if (time.length == 0) {
        Vue.set(state.errors, 'time', 'empty')
      } else if (!time.match(state.timeMask)) {
        Vue.set(state.errors, 'time', 'wrong')
      }
    },

    CHECK_EMAIL(state, email) {
      Vue.set(state.errors, 'email', undefined)
      if (email.length == 0) {
        Vue.set(state.errors, 'email', 'empty')
      } else if (email.length > 50) {
        Vue.set(state.errors, 'email', 'long')
      } else if (!email.match(state.emailMask)) {
        Vue.set(state.errors, 'email', 'wrong')
      }
    },

    SET_ERROR (state, error) {
      Vue.set(state.errors, error.type, error.msg)
    },

    CLEAR_ERRORS(state, errorType) {
      if (errorType == 'all')
        Vue.set(state, 'errors', {})
      else
        Vue.set(state.errors, errorType, undefined)
    }
  },


  actions: {
    CHECK_NAME({commit, getters}, payload) {
      commit('CHECK_NAME', payload)
      return new Promise((resolve) => {
        if (getters.errors[payload.type] != undefined)
          resolve(getters.errors[payload.type])
        else
          resolve('correct')
      })
    },

    CHECK_LOGIN({commit, getters}, login) {
      commit('CHECK_LOGIN', login)
      return new Promise((resolve) => {
        if (getters.errors.login != undefined)
          resolve(getters.errors.login)
        else
          resolve('correct')
      })
    },

    CHECK_OLD_PASSWORD({commit, getters}, password) {
      commit('CHECK_OLD_PASSWORD', password)
      return new Promise((resolve) => {
        if (getters.errors.oldPassword != undefined)
          resolve(getters.errors.oldPassword)
        else
          resolve('correct')
      })
    },

    CHECK_PASSWORD({commit, getters}, password) {
      commit('CHECK_PASSWORD', password)
      return new Promise((resolve) => {
        if (getters.errors.password != undefined)
          resolve(getters.errors.password)
        else
          resolve('correct')
      })
    },

    CHECK_PASSWORD_REPEAT({commit, getters}, passwords) {
      commit('CHECK_PASSWORD_REPEAT', passwords)
      return new Promise((resolve) => {
        if (getters.errors.passwordRepeat != undefined)
          resolve(getters.errors.passwordRepeat)
        else
          resolve('correct')
      })
    },

    CHECK_PHONE({commit, getters}, phone) {
      commit('CHECK_PHONE', phone)
      return new Promise((resolve) => {
        if (getters.errors.phone != undefined)
          resolve(getters.errors.phone)
        else
          resolve('correct')
      })
    },

    CHECK_ADDRESS({commit, getters}, address) {
      commit('CHECK_ADDRESS', address)
      return new Promise((resolve) => {
        if (getters.errors.address != undefined)
          resolve(getters.errors.address)
        else
          resolve('correct')
      })
    },

    CHECK_TIME({commit, getters}, time) {
      commit('CHECK_TIME', time)
      return new Promise((resolve) => {
        if (getters.errors.time != undefined)
          resolve(getters.errors.time)
        else
          resolve('correct')
      })
    },

    CHECK_EMAIL({commit, getters}, email) {
      commit('CHECK_EMAIL', email)
      return new Promise((resolve) => {
        if (getters.errors.email != undefined)
          resolve(getters.errors.email)
        else
          resolve('correct')
      })
    },

    SET_ERROR({commit}, error) {
      commit('SET_ERROR', error)
    },

    CLEAR_ERRORS({commit}, errorType) {
      commit('CLEAR_ERRORS', errorType)
    },
  },


  getters: {
    errors: (state) => state.errors
  }

}