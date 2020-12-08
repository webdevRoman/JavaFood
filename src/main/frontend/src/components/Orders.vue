<template lang="pug">
    .admin-main.admin-orders
      .orders-container
        .orders-title Заказы
        .orders-table-container
          table.orders-table
            tr.orders-table__header
              th.user Пользователь
              th.adress Адрес
              th.phone Телефон
              th.time Время доставки
            //- tr.orders-table__line(v-for="order in orders")
            tr
              td.user Пользователь1
              td.adress Пирогова
              td.phone +7 (777) 777-77-77
              td.time 14:30
            tr
            tr
              td.user Пользователь2
              td.adress Усова
              td.phone +7 (777) 777-77-77
              td.time 14:30
            tr
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
@import "../assets/sass/vars"

.admin

  .orders
    &-title
      font-weight: 500
      font-size: 24px
      line-height: 28px
      margin-bottom: 40px

    &-table-container
      flex-basis: 1300px
      padding: 30px 35px
      background-color: $c-light
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)

      .table__header
        background-color: #f0f0f0f
</style>