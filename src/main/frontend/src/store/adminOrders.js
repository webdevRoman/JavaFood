import axios from 'axios'

export default {
  state: {
    orders: []
  },

  mutations: {
    SET_ORDERS(state, data) {
      let orders = []
      if (data && data != 'err')
        data.forEach(order => {
          order.confirmed = false
          orders.push(order)
        })
      state.orders = orders
    },
    

    DELETE_ORDER_ADMIN(state, id) {
      let arrIndex
      for (let i = 0; i < state.orders.length; i++) {
        if (state.orders[i].id == id) {
          arrIndex = i
          break
        }
      }
      state.orders.splice(arrIndex, 1)
    },
  },

  actions: {
    LOAD_ORDERS({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({url: '/api/order/admin', method: 'GET'})
          .then(resp => {
            commit('SET_ORDERS', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_ORDERS', 'err')
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },
    

    DELETE_ORDER_ADMIN({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('DELETE_ORDER_ADMIN', id)
        axios({ url: '/api/order/admin', data: id, method: 'DELETE'})
          .then(() => resolve())
          .catch(err => reject(err))
      })
    },
  },

  getters: {
    orders: state => state.orders
  }
}