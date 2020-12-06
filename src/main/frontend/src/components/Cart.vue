<template lang="pug">
  .cart
    .cart-popup

      .cart-close
        button.cart-close__btn(@click.prevent="hideCart()") &times;

      .cart-items__no(v-if="cartItems.length < 1") Ваша корзина пуста

      .cart-items(v-else)
        .cart-item(v-for="dish in cartItems")
          .cart-item__block
            .cart-item__main

              .cart-item__img(
                v-if="!!dish.imageAddress"
                :style="{'background-image': `url(http://localhost:8087/${dish.imageAddress})`}"
              )
              .cart-item__img(v-else)
                img(src="../assets/img/dish-default.svg", alt="Dish image")

              .cart-item__text
                .cart-item__info
                  .cart-item__price {{ dish.price }} Р
                  .cart-item__name {{ dish.name }}

                  .cart-item__number
                    button.cart-number__btn(
                      @click.prevent="decrementOrder(dish)",
                      :disabled="dish.amount <= 0 || buttonsDisabled"
                    ) -
                    input.cart-number__value(
                      type="text",
                      v-model.trim="dish.amount",
                      v-mask="'##'",
                      @focusin="rememberOldVal(dish)",
                      @focusout="checkOrder(dish)",
                      :disabled="buttonsDisabled"
                    )
                    button.cart-number__btn(
                      @click.prevent="incrementOrder(dish)",
                      :disabled="dish.amount >= 99 || buttonsDisabled"
                    ) +

                  button.cart-item__fav(@click.prevent="toggleFavourite(dish)", v-if="dish.favourite")
                    .cart-fav__img
                      img(src="../assets/img/star-active.svg", alt="Star image")
                    .cart-fav__text В избранном

                  button.cart-item__fav.cart-item__fav_active(@click.prevent="toggleFavourite(dish)", v-else)
                    .cart-fav__img
                      img(src="../assets/img/star.svg", alt="Star image")
                    .cart-fav__text В избранное

            button.cart-item__delete(@click.prevent="deleteOrder(dish)") &times;

          .cart-item__sum
            div Всего: <span class="cart-sum__value">{{ dish.price * dish.amount }}</span> Р

      .cart-price
        .cart-price__line.cart-price__sum
          .cart-price__text Итого
          .cart-price__value <span class="cart-value__value">{{ currentSum }}</span> Р

      .cart-buttons
        button.btn.btn_o(
          @click.prevent="clearCart()",
          :disabled="cartItems.length < 1"
        ) Очистить корзину
        button.btn(
          @click.prevent="showConfirm()",
          :disabled="cartItems.length < 1 || buttonsDisabled"
        ) Подтвердить заказ

    .cart-overlay
      OrderConfirmation
</template>

<script>
import OrderConfirmation from './OrderConfirmation'

export default {

  data() {
    return {
      buttonsDisabled: false,
      oldDishAmount: null
    }
  },

  methods: {
    hideCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'none'
    },

    toggleFavourite(dish) {
      let data = {dish: dish}
      if (!dish.favourite) {
        data.remove = false
        dish.favourite = true
      } else {
        data.remove = true
        dish.favourite = false
      }
      this.$store.dispatch('TOGGLE_FAVOURITE', data)
          .catch(err => {
            console.log('Error on adding or removing favourite dish: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },

    incrementOrder(dish) {
      const oldVal = parseInt(dish.amount)
      dish.amount = parseInt(dish.amount) + 1
      this.setOrder(oldVal, dish)
    },

    decrementOrder(dish) {
      const oldVal = parseInt(dish.amount)
      dish.amount = parseInt(dish.amount) - 1
      this.setOrder(oldVal, dish)
    },

    rememberOldVal(dish) {
      this.oldDishAmount = dish.amount
    },

    checkOrder(dish) {
      if (dish.amount == '' || !String(dish.amount).match(/\d+/)) {
        dish.amount = 0
      } else if (dish.amount.length > 1 && dish.amount[0] == '0') {
        dish.amount = parseInt(dish.amount[1])
      }
      this.setOrder(this.oldDishAmount, dish)
      this.oldDishAmount = null
    },

    deleteOrder(dish) {
      this.rememberOldVal(dish)
      dish.amount = 0
      this.setOrder(this.oldDishAmount, dish)
    },

    clearCart() {
      this.cartItems.forEach(d => d.amount = 0)
      this.$store.dispatch('CLEAR_ORDER')
          .catch(err => {
            console.log('Error on clearing cart: ' + err)
            this.$store.dispatch(
                'SET_NOTIFICATION',
                {msg: `Ошибка при очистке корзины: ${err.message}`, err: true}
            )
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },

    setOrder(oldDishAmount, dish) {
      if (this.oldDishAmount !== dish.amount) {
        this.buttonsDisabled = true
        this.$store.dispatch('SET_ORDER', {oldDishAmount: oldDishAmount, dish: dish})
            .catch(err => {
              console.log('Error on setting order: ' + err)
              this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
              setTimeout(() => {
                this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
              }, 5000)
            })
            .finally(() => this.buttonsDisabled = false)
      }
    },

    showConfirm() {
      const confirm = document.querySelector('.cart-overlay')
      confirm.style.display = 'flex'
    }
  },

  computed: {
    cartItems() {
      return this.$store.getters.cart
    },

    currentSum() {
      let sum = 0
      for (const key in this.cartItems) {
        sum += this.cartItems[key].price * this.cartItems[key].amount
      }
      return sum
    }
  },

  components: {
    OrderConfirmation
  }

}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.cart
  &-popup
    display: none
    width: 468px
    height: 100vh
    background-color: $c-bg
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25)
    position: absolute
    top: 0
    right: 0
    overflow: hidden
    z-index: 10

  &-close
    height: 30px
    padding: 0 13px
    background-color: $c-dark
    display: flex
    justify-content: flex-end

    &__btn
      font-weight: 300
      font-size: 34px
      color: $c-light
      margin-top: -8px

  &-items
    height: calc(100vh - 220px)
    overflow-y: scroll

    &::-webkit-scrollbar
      width: 4px

    &::-webkit-scrollbar-button
      height: 0

    &::-webkit-scrollbar-track
      background-color: $c-middle

    &::-webkit-scrollbar-track-piece
      background-color: $c-middle

    &::-webkit-scrollbar-thumb
      height: 50px
      background-color: $c-dark

    &::-webkit-scrollbar-corner
      background-color: $c-dark

    &::-webkit-resizer
      background-color: $c-dark

    &__no
      height: calc(100vh - 220px)
      padding: 50px 0
      font-weight: bold
      font-size: 24px
      text-align: center

  &-item
    padding: 20px 25px
    border-bottom: 1px solid $c-middle

    &:last-child
      border-bottom: none

    &__block
      display: flex
      justify-content: space-between
      align-items: flex-start

    &__main
      display: flex
      margin-bottom: 20px

    &__img
      flex-basis: 134px
      width: 134px
      height: 134px
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      margin-right: 40px

    &__text
      display: flex
      justify-content: space-between

    &__price
      font-weight: bold
      font-size: 15px
      margin-bottom: 7px

    &__name
      font-weight: bold
      font-size: 15px
      margin-bottom: 25px

    &__number
      display: flex
      align-items: center
      margin-bottom: 10px

    &__fav
      display: flex
      justify-content: space-between
      align-items: center
      padding: 5px 8px
      border: 1px solid $c-dark

      &:hover
        .cart-fav__img
          transform: scale(1.3)

    &__delete
      font-weight: 300
      font-size: 34px
      color: $c-middle
      margin-top: -10px

    &__sum
      display: flex
      justify-content: flex-end
      font-weight: bold
      font-size: 15px

  &-number
    &__btn
      width: 20px
      height: 20px
      border: 1px solid $c-dark
      border-radius: 50%
      font-weight: 500
      font-size: 15px
      margin-right: 5px
      transition: 0.2s

      &:last-child
        margin-right: 0

      &:hover
        transform: scale(1.4)

      &[disabled]:hover
        transform: scale(1)

    &__value
      width: 20px
      background-color: transparent
      border: none
      font-weight: 500
      font-size: 15px
      text-align: center
      margin-right: 5px

  &-fav
    &__img
      width: 23px
      margin-right: 9px
      transition: 0.2s

    &__text
      font-size: 13px

  &-sum
    &__value
      margin-left: 6px

  &-price
    padding: 20px 25px
    border-top: 1px solid $c-middle
    border-bottom: 1px solid $c-middle

    &__line
      display: flex
      justify-content: space-between
      align-items: center

    &__sum
      font-weight: bold

      .cart-price__text
        font-size: 24px

      .cart-price__value
        font-size: 20px

  &-buttons
    padding: 26px 38px 38px 38px
    display: flex
    justify-content: center
    align-items: center
    position: relative

    .btn:first-child
      margin-right: 20px


  &-overlay
    display: none
    justify-content: center
    align-items: center
    width: 100vw
    height: 100vh
    overflow: hidden
    background-color: rgba(255, 255, 255, 0.7)
    position: fixed
    top: 0
    left: 0
    z-index: 25

@media(max-width: 992px)
  html
    .cart
      &-popup
        &-item
          &__fav
            &:hover
              .cart-fav__img
                transform: scale(1)

        &-number
          &__btn
            &:hover
              transform: scale(1)

@media(max-width: 768px)
  html
    .cart
      &-popup
        top: -50px

@media(max-width: 576px)
  html
    .cart
      &-popup
        width: 100%

      &-items
        height: calc(100vh - 170px)

        &__no
          height: calc(100vh - 170px)

      &-item
        padding: 10px

        &__main
          margin-bottom: 10px

        &__img
          flex-basis: 100px
          padding: 10px
          margin-right: 25px

        &__price
          margin-bottom: 3px

        &__name
          margin-bottom: 15px

        &__number
          margin-bottom: 15px

        &__fav
          padding: 2px 4px

      &-price
        padding: 15px 20px

        &__sum
          .cart-price__text
            font-size: 20px

          .cart-price__value
            font-size: 18px

      &-buttons
        padding: 15px 20px

        .btn:first-child
          margin-right: 10px
</style>