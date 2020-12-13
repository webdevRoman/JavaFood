import axios from "axios";

export default {

  state: {
    companyDescr: '',
    companyPhone: '',
    companyEmail: '',
    companyAddress: ''
  },

  mutations: {
    SET_COMPANY(state, data) {
      state.companyDescr = data.description
      state.companyPhone = data.phone
      state.companyEmail = data.email
      state.companyAddress = data.address
    }
  },

  actions: {
    LOAD_COMPANY({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({url: '/api/company', method: 'GET'})
          .then(resp => {
            commit('SET_COMPANY', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    UPDATE_COMPANY({commit}, company) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({url: '/api/company/admin', method: 'PUT', data: company})
          .then(resp => {
            commit('SET_COMPANY', resp.data)
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
    companyDescr: state => state.companyDescr,
    companyPhone: state => state.companyPhone,
    companyEmail: state => state.companyEmail,
    companyAddress: state => state.companyAddress
  }

}