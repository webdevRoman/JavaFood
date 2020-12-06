import Vue from 'vue'
import Vuex from 'vuex'
import generalModule from './general'
import dishesModule from './dishes'
import userModule from './user'
import validationModule from './validation'
import adminModule from './admin'
import companyModule from './company'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    generalModule,
    dishesModule,
    userModule,
    validationModule,
    adminModule,
    companyModule
  }
})
