import Vue from 'vue'
import axios from 'axios'

export default {

  state: {
    // categories: [{
    //   name: 'Название категории 1',
    //   dishes: [{
    //     id: 1,
    //     name: 'Бигус',
    //     price: 85,
    //     weight: 250,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Капуста тушеная со свининой',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }, {
    //     id: 2,
    //     name: 'Салат "Витаминный"',
    //     price: 32,
    //     weight: 150,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 3,
    //     name: 'Овощи на пару',
    //     price: 53,
    //     weight: 100,
    //     weighty: 1,
    //     single: 0,
    //     description: 'Зеленый горошек, брокколи, цветная капуста, картофель, морковь, перец болгарский, стручковая фасоль, чеснок',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 4,
    //     name: 'Окорочок фаршированный',
    //     price: 53,
    //     weight: 80,
    //     weighty: 0,
    //     single: 0,
    //     description: 'Куриный фарш, грибы, специи',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }, {
    //     id: 5,
    //     name: 'Вок с курицей',
    //     price: 135,
    //     weight: 250,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Лапша удон, куриное филе, лук репчатый, лук зеленый, перец болгарский, морковь, капуста, чеснок, кунжут',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }]
    // }, {
    //   name: 'Название категории 2',
    //   dishes: [{
    //     id: 6,
    //     name: 'Салат "Овощное попурри"',
    //     price: 36,
    //     weight: 100,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Капуста, помидор, огурцы, масло',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 7,
    //     name: 'Салат "Цезарь" с пекинской капустой',
    //     price: 66,
    //     weight: 100,
    //     weighty: 1,
    //     single: 0,
    //     description: 'Помидоры, сыр, курица, пекинская капуста, соус "Цезарь"',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }]
    // }, {
    //   name: 'Название категории 3',
    //   dishes: [{
    //     id: 8,
    //     name: 'Суп "Том Ям" с морепродуктами',
    //     price: 154,
    //     weight: 250,
    //     weighty: 1,
    //     single: 0,
    //     description: 'Морепродукты, корень галангала, лемонграсс, сливки, кокосовое молоко, шампиньоны, красный лук, помидоры, кинза, соус Том Ям. Подается с рисом.',
    //     hide: 0,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: false
    //   }, {
    //     id: 9,
    //     name: 'Салат 9',
    //     price: 32,
    //     weight: 150,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known',
    //     hide: 1,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }, {
    //     id: 10,
    //     name: 'Салат 10',
    //     price: 32,
    //     weight: 150,
    //     weighty: 0,
    //     single: 1,
    //     description: 'Lorem ipsum, or lipsum as it is sometimes known',
    //     hide: 1,
    //     image: '/images/delivery/items/199.jpg',
    //     order: 0,
    //     favourite: true
    //   }]
    // }, {
    //   name: 'Длинное название категории (не вмещается в одну строку)',
    //   dishes:[]
    // }, {
    //   name: '5',
    //   dishes:[]
    // }, {
    //   name: '6',
    //   dishes:[]
    // }, {
    //   name: '7',
    //   dishes:[]
    // }, {
    //   name: '8',
    //   dishes:[]
    // }, {
    //   name: '9',
    //   dishes:[]
    // }],
    categories: new Map(),
    favourites: [],
    // todo:
    meta: {},
    links: {},
    cart: {},
    refuseOrder: false,
    acceptOrder: false
  },

  mutations: {
    SET_CATEGORIES(state, data) {
      let categories = new Map()
      if (data != 'err')
        data.forEach(dish => {
          dish.favourite = false
          // todo: order
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
      Vue.set(state.favourites, state.favourites.findIndex(f => f.id === dish.id), dish)
      for (const [key, val] of state.categories) {
        val.forEach(d => {
          if (d.id === dish.id)
            d.favourite = true
        })
      }
      state.categories = new Map(state.categories)
      // todo: order
      // if (state.cart[dish.id] != undefined)
      //   Vue.set(state.cart[dish.id], 'elect', true)
    },

    REMOVE_FAVOURITE(state, dish) {
      const newFavs = state.favourites.splice(state.favourites.findIndex(f => f.id === dish.id), 1)
      state.favourites = newFavs
      for (const [key, val] of state.categories) {
        val.forEach(d => {
          if (d.id === dish.id)
            d.favourite = false
        })
      }
      state.categories = new Map(state.categories)
      // todo: order
      // if (state.cart[dish.id] != undefined)
      //   Vue.set(state.cart[dish.id], 'elect', false)
    },

    // todo:
    SET_CART(state, data) {
      state.refuseOrder = data.refuse
      state.acceptOrder = data.accept
      state.cart = {}
      if (data != 'err') {
        data.dishes.forEach(dish => {
          Vue.set(state.cart, dish.id, dish)
        })
      }
    },

    // todo:
    SET_OREDER(state, dish) {
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
          console.log(resp)
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

    // todo:
    LOAD_CART({commit, dispatch}, date) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        let requestParams = {}
        // const url = '/backend/modules/basket'
        const url = '/basket'             // SHOW!!!
        requestParams = {
          url: url,
          method: 'GET',
          params: { date: date }
        }
        axios(requestParams)
        .then(resp => {
          commit('SET_CART', resp.data)
          commit('SET_LIMIT', resp.data.total + resp.data.balance)
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
    SET_OREDER({commit, getters}, dish) {
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
            commit('SET_OREDER', dish)
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
        //   commit('SET_OREDER', data)
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
    // todo:
    cart: (state) => state.cart,
    refuseOrder: (state) => state.refuseOrder,
    acceptOrder: (state) => state.acceptOrder
  }

}