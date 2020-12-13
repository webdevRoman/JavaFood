<template lang="pug">
  .admin-main.admin-orders
    .orders-container

      .orders-title Заказы

      table.orders-table

        tr.orders-table__header
          th.user Пользователь
          th.adress Адрес
          th.phone Телефон
          th.time Время доставки

        tr.orders-table__line(v-for="order in orders")
          td.user {{ order.userLogin }}
          td.adress {{ order.address }}
          td.phone {{ order.phone }}
          td.time {{ order.deliveryTime}}
          td.confirm
            button.confirm-btn(@click.prevent="order.confirmed = true", :disabled = "order.confirmed")
              img(v-if="order.confirmed", src="../assets/img/tick-success.svg", alt="Tick")
              img(v-else, src="../assets/img/tick-grey.svg", alt="Tick")
          td.delete
            button.delete-btn(@click.prevent="deleteOrder(order.id)") &times;
</template>

<script>
export default {
  data() {
    return {
      rechangeColor: false
    }
  },

  methods: {
    deleteOrder(id) {
      this.$store.dispatch('DELETE_ORDER_ADMIN', id)
          .catch(err => {
            console.log('Error on deleting order: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },
  },

  computed: {
    orders() {
      return this.$store.getters.orders
    }
  },

  created() {
    this.$store.dispatch('LOAD_ORDERS').catch(err => {
      console.log("Orders loader rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          { msg: `Ошибка при загрузке заказов: ${err.message}`, err: true }
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })
  }

}
</script>

<style lang="sass" scoped>
@import "../assets/sass/vars"

.admin

  .orders

    &-container
      flex-basis: 1300px
      padding: 30px 35px

    &-title
      font-weight: 500
      font-size: 24px
      line-height: 28px
      margin-bottom: 40px

    &-table
      width: 100%
      padding: 30px 35px
      background-color: #f0f0f0

      &__header
        width: 100%
        background-color: #f0f0f0

        th
          padding: 20px
          font-size: 16px
          font-weight: bold
          color: lighten($c-dark, 40)
          text-align: left

      .user
        width: 270px

      .adress
        width: 280px

      .phone
        width: 200px

      .time
        width: 230px

      .confirm
        width: 33px
        padding-right: 0px

        &-btn
          height: 33px
          width: 33px
          backgound-color: $c-dark
          transition: 0.2s

          &:hover
            transform: scale(1.3)
          &[disabled]:hover
            transform: none

      .delete
        width: 33px

        &-btn
          height: 33px
          width: 33px
          border: 2px solid $c-dark
          border-radius: 50%
          backgound-color: $c-dark
          font-size: 18px
          font-weight: bold
          transition: 0.2s
          &:hover
            transform: scale(1.3)

      &__line
        td
          background-color: $c-light
          padding: 26px 20px
          border-bottom: 1px solid $c-middle
          font-size: 16px
          font-color: $c-dark
</style>