import axios from 'axios'

export default {

  actions: {
    ADD_DISH({commit, dispatch}, payload) {
      return new Promise(async (resolve, reject) => {
        commit('SET_PROCESSING', true)
        try {
          let createDishResp, updateDishImageResp
          createDishResp = await dispatch('CREATE_DISH', payload.dish)
          if (createDishResp && createDishResp.data && payload.image)
            updateDishImageResp = await dispatch('UPDATE_DISH_IMAGE', { dishId: createDishResp.data.id, image: payload.image })
          let resp = updateDishImageResp ? updateDishImageResp : (createDishResp ? createDishResp : null)
          commit('SET_PROCESSING', false)
          if (resp && resp.data) {
            commit('ADD_DISH', resp.data)
            resolve()
          } else {
            reject('Ошибка при добавлении блюда.')
          }
        } catch (err) {
          commit('SET_PROCESSING', false)
          reject(err)
        }
      })
    },

    EDIT_DISH({commit, dispatch}, payload) {
      return new Promise(async (resolve, reject) => {
        commit('SET_PROCESSING', true)
        try {
          let editDataResp, editCategoryResp, editImgResp
          if (payload.requests.some(r => r === 'data'))
            editDataResp = await dispatch('EDIT_DISH_DATA', payload.dish)
          if (payload.requests.some(r => r === 'category'))
            editCategoryResp = await dispatch('EDIT_DISH_CATEGORY', payload.dish)
          if (payload.requests.some(r => r === 'img'))
            editImgResp = await dispatch('UPDATE_DISH_IMAGE', {dishId: payload.dish.id, image: payload.image})
          let resp = editImgResp ? editImgResp : (editCategoryResp ? editCategoryResp : (editDataResp ? editDataResp : null))
          commit('SET_PROCESSING', false)
          if (resp && resp.data) {
            commit('UPDATE_DISH', resp.data)
            if (editImgResp)
              document.location.reload(true)
            resolve()
          } else {
            reject('Ошибка при редактированни блюда.')
          }
        } catch (err) {
          commit('SET_PROCESSING', false)
          reject(err)
        }
      })
    },

    // eslint-disable-next-line no-empty-pattern
    CREATE_DISH({}, dish) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/dish/admin', method: 'POST', data: dish})
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },

    // eslint-disable-next-line no-empty-pattern
    UPDATE_DISH_IMAGE({}, payload) {
      return new Promise((resolve, reject) => {
        const imageNameParts = payload.image.name.split('.')
        let formData = new FormData()
        formData.append('file', payload.image, payload.dishId + '.' + imageNameParts[imageNameParts.length - 1])
        axios({url: '/api/dish/admin/img', method: 'POST', data: formData})
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },

    // eslint-disable-next-line no-empty-pattern
    EDIT_DISH_DATA({}, dish) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/dish/admin', method: 'PUT', data: dish})
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },

    // eslint-disable-next-line no-empty-pattern
    EDIT_DISH_CATEGORY({}, dish) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/dish/admin/type', method: 'PUT', data: dish})
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },

    DELETE_DISH({commit}, id) {
      return new Promise((resolve, reject) => {
        axios({url: '/api/dish/admin', method: 'DELETE', data: id})
          .then(resp => {
            if (resp.data) {
              commit('DELETE_DISH', id)
              resolve()
            } else {
              reject('Ошибка при удалении блюда.')
            }
          })
          .catch(err => reject(err))
      })
    }
  }

}