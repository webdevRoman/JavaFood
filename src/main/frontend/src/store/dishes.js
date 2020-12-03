import Vue from 'vue'
import axios from 'axios'

export default {

  state: {
    categories: new Map(),
    favourites: [],
    cart: [],
    // todo:
    meta: {},
    links: {},
    acceptOrder: false
  },

  mutations: {
    SET_CATEGORIES(state, data) {
      let categories = new Map()
      if (data != 'err')
        data.forEach(dish => {
          dish.favourite = false
          dish.amount = 0
          if (categories.has(dish.dishTypeName))
            categories.set(dish.dishTypeName, [...categories.get(dish.dishTypeName), dish])
          else
            categories.set(dish.dishTypeName, [dish])
        })
      state.categories = categories
    },

    SET_FAVOURITES(state, data) {
      if (data != 'err') {
        data.forEach(dish => {
          dish.amount = 0
          for (const [key, val] of state.categories) {
            val.forEach(d => {
              if (d.id === dish.id)
                d.favourite = true
            })
          }
        })
        state.favourites = data
        state.categories = new Map(state.categories)
      } else {
        state.favourites = []
      }
    },

    ADD_FAVOURITE(state, dish) {
      let newFavs = []
      if (state.favourites.length === 0) {
        newFavs.push(dish)
      } else {
        newFavs = [...state.favourites, dish]
      }
      state.favourites = newFavs
      for (const [key, val] of state.categories) {
        val.forEach(d => {
          if (d.id === dish.id)
            d.favourite = true
        })
      }
      const tempCategories = state.categories
      state.categories = new Map()
      state.categories = new Map(tempCategories)
      if (state.cart.findIndex(d => d.id === dish.id) !== -1)
        state.cart.splice(state.cart.findIndex(d => d.id === dish.id), 1, dish)
    },

    REMOVE_FAVOURITE(state, dish) {
      state.favourites.splice(state.favourites.findIndex(f => f.id === dish.id), 1)
      for (const [key, val] of state.categories) {
        val.forEach(d => {
          if (d.id === dish.id)
            d.favourite = false
        })
      }
      const tempCategories = state.categories
      state.categories = new Map()
      state.categories = new Map(tempCategories)
      if (state.cart.findIndex(d => d.id === dish.id) !== -1)
        state.cart.splice(state.cart.findIndex(d => d.id === dish.id), 1, dish)
    },

    SET_CART(state, data) {
      if (data != 'err') {
        const newFavs = state.favourites.slice(0)
        data.forEach(basketDish => {
          for (const [key, val] of state.categories) {
            val.forEach(d => {
              if (d.id === basketDish.dish.id)
                d.amount = basketDish.amount
            })
          }
          newFavs.forEach(favDish => {
            if (favDish.id === basketDish.dish.id)
              favDish.amount = basketDish.amount
          })
        })
        state.cart = data
        state.categories = new Map(state.categories)
        state.favourites = newFavs
      } else {
        state.cart = []
      }
    },

    // todo:
    SET_ORDER(state, dish) {
      if (dish.amount != 0) {
        Vue.set(state.cart, dish.id, dish)
      } else {
        let newCart = state.cart
        delete newCart[dish.id]
        state.cart = {}
        state.cart = newCart
      }
      for (let i = 0; i < state.categories.length; i++) {
        for (let j = 0; j < state.categories[i].dishes.length; j++) {
          const d = state.categories[i].dishes[j]
          if (d.id == dish.id)
            Vue.set(state.categories[i].dishes[j], 'amount', dish.amount)
        }
      }
      if (state.favourites[dish.id] != undefined)
        Vue.set(state.favourites[dish.id], 'amount', dish.amount)
    },

    // todo:
    CONFIRM_ORDER(state) {
      state.acceptOrder = true
      state.cart = {}
      for (const key in state.favourites) {
        Vue.set(state.favourites[key], 'amount', 0)
      }
      for (let i = 0; i < state.categories.length; i++) {
        for (let j = 0; j < state.categories[i].dishes.length; j++) {
          Vue.set(state.categories[i].dishes[j], 'amount', 0)
        }
      }
    }
  },

  actions: {
    LOAD_DISHES({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({ url: '/api/dish', method: 'GET'} )
        .then(resp => {
          commit('SET_CATEGORIES', resp.data)
          commit('SET_PROCESSING', false)
          resolve()
        },
        err => {
          commit('SET_CATEGORIES', 'err')
          commit('SET_PROCESSING', false)
          reject(err)
        })
      })
    },

    LOAD_FAVOURITES({commit, getters}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        axios({ url: '/api/favourite', method: 'GET', params: { userLogin: getters.login } })
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
        .then(resp => {
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
        axios({ url: '/api/basket', method: 'GET', params: { userLogin: getters.login } })
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

    // todo:
    SET_ORDER({commit, getters}, dish) {
      return new Promise((resolve, reject) => {
        let parameters = { data: { date: getters.date, id: dish.id }, method: 'POST' }
        if (dish.amount != 0) {
          // parameters.url = '/backend/modules/basket/amount'
          parameters.url = '/basket/amount'             // SHOW!!!
          parameters.data.amount = dish.amount
        } else {
          // parameters.url = '/backend/modules/basket/delete'
          parameters.url = '/basket/delete'             // SHOW!!!
        }
        axios(parameters)
        .then(resp => {
          if (resp.data == 'success') {
            commit('SET_ORDER', dish)
            resolve()
          } else {
            let errStr = ''
            for (const key in resp.data)
              errStr += resp.data[key] + '. '
            reject(errStr)
          }
        },
        err => {
          reject(err)
        })
      })
    },

    // todo:
    CONFIRM_ORDER({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        commit('CONFIRM_ORDER')
        commit('SET_PROCESSING', false)
        resolve()
        // let parameters = { data: { date: getters.date, id: data.dish.id }, method: 'POST' }
        // if (data.amount != 0) {
        //   if (data.amount >= data.dish.amount)
        //     parameters.url = '/backend/modules/basket/add'
        //   else
        //     parameters.url = '/backend/modules/basket/reduce'
        //   parameters.data.amount = data.amount
        // } else {
        //   parameters.url = '/backend/modules/basket/delete'
        // }
        // axios(parameters)
        // .then(resp => {
        //   data.dish.amount = data.amount
        //   commit('SET_ORDER', data)
        //   commit('SET_PROCESSING', false)
        //   resolve()
        // })
        // .catch(err => {
        //   commit('SET_PROCESSING', false)
        //   reject(err)
        // })
      })
    }
  },

  getters: {
    categories: (state) => state.categories,
    favourites: (state) => state.favourites,
    cart: (state) => state.cart,
    // todo:
    acceptOrder: (state) => state.acceptOrder
  }

}