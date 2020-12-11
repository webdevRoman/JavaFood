import axios from 'axios'

export default {

  mutations: {
    ADD_DISH(state, data) {
      state.companyDescr = data.description
      state.companyPhone = data.phone
      state.companyEmail = data.email
      state.companyAddress = data.address
    }
  },

  actions: {
    ADD_DISH({commit, dispatch}, payload) {
      return new Promise((resolve, reject) => {
        commit('SET_PROCESSING', true)
        dispatch('CREATE_DISH', payload.dish)
          .then(resp => {
            if (resp.data) {
              if (payload.image) {
                dispatch('UPDATE_DISH_IMAGE', { dishId: resp.data.id, image: payload.image })
                  .then(resp => {
                    if (resp.data) {
                      commit('ADD_DISH', resp.data)
                      commit('SET_PROCESSING', false)
                      resolve()
                    } else {
                      commit('SET_PROCESSING', false)
                      reject('Ошибка при установке изображения блюда.')
                    }
                  })
                  .catch(err => {
                    commit('SET_PROCESSING', false)
                    reject(err)
                  })
              } else {
                commit('ADD_DISH', resp.data)
                commit('SET_PROCESSING', false)
                resolve()
              }
            } else {
              commit('SET_PROCESSING', false)
              reject('Ошибка при добавлении блюда.')
            }
          })
          .catch(err => {
            commit('SET_PROCESSING', false)
            reject(err)
          })
      })
    },

    CREATE_DISH({commit}, dish) {
      return new Promise((resolve, reject) => {
        axios({ url: '/api/dish/admin', method: 'POST', data: dish })
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },

    UPDATE_DISH_IMAGE({commit}, payload) {
      return new Promise((resolve, reject) => {
        const imageNameParts = payload.image.name.split('.')
        let formData = new FormData()
        formData.append('file', payload.image, payload.dishId + '.' + imageNameParts[imageNameParts.length - 1])
        axios({ url: '/api/dish/admin/img', method: 'POST', data: formData })
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    }
  }

}