<template lang="pug">
  .admin
    Sidebar(@changeView="changeView")

    DishesAdmin(v-if="chosenSection == 'dishes'")
    Orders(v-if="chosenSection == 'orders'")
    CompanyAdmin(v-if="chosenSection == 'companyInfo'") 
    Users(v-if="chosenSection == 'users'")   


    .notification-popup(v-if="notification.msg != ''")
      .notification-info {{ notification.msg }}
      .notification-img(v-if="notification.err")
        img(src="../assets/img/cross.svg", alt="Cross")
      .notification-img(v-else)
        img(src="../assets/img/tick-success.svg", alt="Tick")
      button.notification-close(@click.prevent="closeNotification()") &times;
      
    .processing-overlay(v-if="processing")
      .processing-indicator
</template>

<script>
import Sidebar from '../components/Sidebar'
import DishesAdmin from '../components/DishesAdmin'
import Orders from '../components/Orders'
import CompanyAdmin from '../components/CompanyAdmin'
import Users from '../components/Users'

export default {

  data() {
    return {
      chosenSection: 'dishes'
    }
  },

  methods: {
    changeView(viewName) {
      this.chosenSection = viewName
    },

    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
    }
  },

  computed: {
    processing() {
      return this.$store.getters.processing
    },

    notification() {
      return this.$store.getters.notification
    }
  },

  components: {
    Sidebar,
    DishesAdmin,
    Orders,
    CompanyAdmin,
    Users
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.admin
  display: flex
  justify-content: space-between
  align-items: stretch
  width: 100%
  min-height: 100vh

  &-main
    flex-grow: 1
    min-height: 100vh
    padding: 80px 70px
</style>