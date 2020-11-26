import Vue from 'vue'
import VueMask from 'v-mask'
import vSelect from 'vue-select'
import FunctionalCalendar from 'vue-functional-calendar'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueMask);

vSelect.props.components.default = () => ({
  OpenIndicator: {
    render: createElement =>  createElement('div', {class: {'select-arrow': true}})
  }
})
Vue.component('v-select', vSelect)

Vue.use(FunctionalCalendar, {
  dayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
})

Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')