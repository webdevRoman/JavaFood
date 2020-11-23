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
    categories: [],
    meta: {},
    links: {},
    favourites: {},
    cart: {},
    refuseOrder: false,
    acceptOrder: false
  },
  mutations: {
    SET_CATEGORIES(state, data) {
      function checkCategories(categories, name) {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].name == name) {
            return i
          }
        }
        return -1
      }
      let categories = []
      if (data != 'err') {
        // data.categories.forEach(cat => {
        //   categories.push({ id: cat.id, name: cat.name, dishes: [] })
        // })
        // data.dishes.forEach(dish => {
        //   for (let i = 0; i < categories.length; i++) {
        //     if (dish.category == categories[i].name) {
        //       categories[i].dishes.push(dish)
        //       break
        //     }
        //   }
        // })
        // state.meta = data._meta
        // state.links = data._links
        data.dishes.forEach(dish => {
          let index = checkCategories(categories, dish.category)
          if (index == -1) {
            categories.push({ name: dish.category, dishes: [] })
            categories[categories.length - 1].dishes.push(dish)
          } else {
            categories[index].dishes.push(dish)
          }
        })
      }
      state.categories = categories
    },
    SET_FAVOURITES(state, data) {
      if (data != 'err') {
        data.dishes.forEach(dish => {
          Vue.set(state.favourites, dish.id, dish)
        })
      } else {
        state.favourites = {}
      }
    },
    ADD_FAVOURITE(state, dish) {
      dish.active = dish.hide == 0 ? true : false
      Vue.set(state.favourites, dish.id, dish)
      for (let i = 0; i < state.categories.length; i++) {
        for (let j = 0; j < state.categories[i].dishes.length; j++) {
          const d = state.categories[i].dishes[j]
          if (d.id == dish.id)
            Vue.set(state.categories[i].dishes[j], 'elect', true)
        }
      }
      if (state.cart[dish.id] != undefined)
        Vue.set(state.cart[dish.id], 'elect', true)
    },
    REMOVE_FAVOURITE(state, dish) {
      let newFavs = state.favourites
      Vue.set(state.favourites, dish.id, null)
      delete newFavs[dish.id]
      state.favourites = newFavs
      for (let i = 0; i < state.categories.length; i++) {
        for (let j = 0; j < state.categories[i].dishes.length; j++) {
          const d = state.categories[i].dishes[j]
          if (d.id == dish.id)
            Vue.set(state.categories[i].dishes[j], 'elect', false)
        }
      }
      if (state.cart[dish.id] != undefined)
        Vue.set(state.cart[dish.id], 'elect', false)
    },
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
    LOAD_DISHES({commit, dispatch}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // dispatch('SET_DATE', data.date)
        let requestParams = {}
        // if (data.link == undefined) {
          // const url = '/backend/modules/menu'
        const url = '/menu'             // SHOW!!!
          const parameters = {}
          parameters.date = data.date
          // if (data.category != 'all')
          //   parameters.category = data.category
          // parameters.page = data.page
          requestParams = {
            url: url,
            method: 'GET',
            params: parameters
          }
        // } else {
        //   requestParams = { url: data.link, method: 'GET' }
        // }
        axios(requestParams)
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
    LOAD_FAVOURITES({commit, dispatch}, date) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        // dispatch('SET_DATE', date)
        let requestParams = {}
        // const url = '/backend/modules/account/elect'
        const url = '/account/elect'             // SHOW!!!
        requestParams = {
          url: url,
          method: 'GET',
          params: { date: date }
        }
        axios(requestParams)
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
    TOGGLE_FAVOURITE({commit}, data) {
      return new Promise((resolve, reject) => {
        // axios({ url: '/backend/modules/account/edit', data: { id: data.dish.id }, method: 'POST' })
        axios({ url: '/account/edit', data: { id: data.dish.id }, method: 'POST' })             // SHOW!!!
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
    cart: (state) => state.cart,
    refuseOrder: (state) => state.refuseOrder,
    acceptOrder: (state) => state.acceptOrder
  }
}