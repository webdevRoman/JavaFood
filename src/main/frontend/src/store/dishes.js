import axios from 'axios'

export default {

  state: {
    dishes: []
  },

  mutations: {
    SET_DISHES(state, data) {
      let dishes = []
      if (data && data != 'err')
        data.forEach(dish => {
          dish.favourite = false
          dish.amount = 0
          dishes.push(dish)
        })
      state.dishes = dishes
    },

    SET_FAVOURITES(state, data) {
      if (data && data != 'err') {
        data.forEach(dish => {
          state.dishes.forEach(d => {
            if (d.id === dish.id)
              d.favourite = true
          })
        })
        state.dishes = [...state.dishes]
      }
    },

    ADD_FAVOURITE(state, dish) {
      state.dishes.forEach(d => {
        if (d.id === dish.id)
          d.favourite = true
      })
      state.dishes = [...state.dishes]
    },

    REMOVE_FAVOURITE(state, dish) {
      state.dishes.forEach(d => {
        if (d.id === dish.id)
          d.favourite = false
      })
      state.dishes = [...state.dishes]
    },

    CLEAR_FAVOURITES(state) {
      state.dishes.forEach(d => d.favourite = false)
      state.dishes = [...state.dishes]
    },

    SET_CART(state, data) {
      if (data && data != 'err') {
        data.forEach(dish => {
          state.dishes.forEach(d => {
            if (d.id === dish.dish.id)
              d.amount = dish.amount
          })
        })
        state.dishes = [...state.dishes]
      }
    },

    SET_ORDER(state, payload) {
      if (!payload.oldDishAmount) {
        state.dishes.splice(state.dishes.findIndex(d => d.id === payload.id), 1)
        state.dishes = [...state.dishes, payload]
      } else {
        state.dishes.splice(state.dishes.findIndex(d => d.id === payload.dish.id), 1)
        payload.dish.amount = payload.oldDishAmount
        state.dishes = [...state.dishes, payload.dish]
      }
    },

    CLEAR_ORDER(state) {
      state.dishes.forEach(d => d.amount = 0)
      state.dishes = [...state.dishes]
    },

    ADD_DISH(state, data) {
      data.amount = 0
      data.favourite = false
      state.dishes = [...state.dishes, data]
    },

    UPDATE_DISH(state, dish) {
      const oldDish = state.dishes.find(d => d.id === dish.id)
      dish.amount = oldDish.amount
      dish.favourite = oldDish.favourite
      state.dishes.splice(state.dishes.findIndex(d => d.id === dish.id), 1, dish)
      state.dishes = [...state.dishes]
    },

    DELETE_DISH(state, id) {
      state.dishes.splice(state.dishes.findIndex(dish => dish.id === id), 1)
      state.dishes = [...state.dishes]
    }
  },

  actions: {
    LOAD_DISHES({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({url: '/api/dish', method: 'GET'})
          .then(resp => {
            commit('SET_DISHES', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_DISHES', 'err')
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    LOAD_FAVOURITES({commit, getters}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({ url: '/api/favourite', method: 'GET', params: {userLogin: getters.login}})
          .then(resp => {
            commit('SET_FAVOURITES', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_FAVOURITES', 'err')
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    TOGGLE_FAVOURITE({commit, getters}, data) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/favourite',
          data: { userLogin: getters.login, dishId: data.dish.id },
          method: data.remove ? 'DELETE' : 'POST'
        })
          .then(() => {
            if (data.remove)
              commit('REMOVE_FAVOURITE', data.dish)
            else
              commit('ADD_FAVOURITE', data.dish)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    LOAD_CART({commit, getters}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({ url: '/api/basket', method: 'GET', params: {userLogin: getters.login}})
          .then(resp => {
            commit('SET_CART', resp.data)
            commit('SET_PROCESSING', false)
            resolve()
          })
          .catch(err => {
            commit('SET_CART', 'err')
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    SET_ORDER({commit, getters}, payload) {
      return new Promise((resolve, reject) => {
        let requestParams = {
          url: '',
          method: '',
          data: { userLogin: getters.login, dishId: payload.dish.id, amount: payload.dish.amount }
        }

        // Create new basket
        if (getters.cart.length === 1 && payload.oldDishAmount === 0) {
          requestParams.url = '/api/basket'
          requestParams.method = 'POST'
        }
        // Add dish to basket
        if (
          getters.cart.length > 1
          && payload.oldDishAmount === 0
        ) {
          requestParams.url = '/api/basket/add'
          requestParams.method = 'PUT'
        }
        // Change dish amount
        if (
          getters.cart.length >= 1
          && payload.oldDishAmount !== 0
        ) {
          requestParams.url = '/api/basket/amount'
          requestParams.method = 'PUT'
        }
        // Remove dish from basket
        if (getters.cart.length !== 0 && payload.oldDishAmount !== 0 && payload.dish.amount === 0) {
          requestParams.url = '/api/basket/dish'
          requestParams.method = 'DELETE'
        }
        // Delete basket
        if (getters.cart.length === 0) {
          requestParams.url = '/api/basket/basket'
          requestParams.method = 'DELETE'
          requestParams.data = getters.login
        }

        if (requestParams.url && requestParams.method && requestParams.data)
          axios(requestParams)
            .then(resp => {
              commit('SET_ORDER', payload.dish)
              resolve()
            })
            .catch(err => {
              commit('SET_ORDER', payload)
              reject(err)
            })
      })
    },

    CLEAR_ORDER({commit, dispatch, getters}) {
      return new Promise((resolve, reject) => {
        axios({ url: '/api/basket/basket', method: 'DELETE', data: getters.login })
          .then(() => {
            commit('CLEAR_ORDER')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    CONFIRM_ORDER({commit, getters}, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({
          url: '/api/order',
          method: 'POST',
          data: { userLogin: getters.login, address: payload.address, deliveryTime: payload.deliveryTime }
        })
          .then(() => {
            commit('CLEAR_ORDER')
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
    dishes: (state) => state.dishes
      .sort((a, b) => a.dishTypeName < b.dishTypeName ? -1 : (a.dishTypeName > b.dishTypeName ? 1 : 0)),

    categories: (state) => {
      const categories = state.dishes.reduce((acc, item) => {
        if (!acc.has(item.dishTypeName))
          acc.set(item.dishTypeName, [])
        acc.get(item.dishTypeName).push(item)
        return acc
      }, new Map())
      const sortedCategories = Object.keys(Object.fromEntries(categories.entries()))
        .sort()
        .reduce((acc, key) => acc.set(key, categories.get(key)), new Map())
      return sortedCategories
    },

    favourites: (state) => state.dishes
      .filter(d => d.favourite)
      .sort((a, b) => a.dishTypeName < b.dishTypeName ? -1 : (a.dishTypeName > b.dishTypeName ? 1 : 0)),

    cart: (state) => state.dishes
      .filter(d => d.amount > 0)
      .sort((a, b) => a.dishTypeName < b.dishTypeName ? -1 : (a.dishTypeName > b.dishTypeName ? 1 : 0))
  }

}