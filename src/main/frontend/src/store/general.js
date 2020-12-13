export default {

  state: {
    processing: false,
    notification: { msg: '', err: false }
  },

  mutations: {
    SET_PROCESSING(state, payload) {
      state.processing = payload
    },

    SET_NOTIFICATION(state, payload) {
      state.notification = payload
    }
  },

  actions: {
    SET_NOTIFICATION({commit}, payload) {
      commit('SET_NOTIFICATION', payload)
    },

    SET_PROCESSING({commit}, payload) {
      commit('SET_PROCESSING', payload)
    }
  },

  getters: {
    processing: state => state.processing,
    notification: state => state.notification
  }

}