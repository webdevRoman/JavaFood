<template lang="pug">
div
  Header
  .navigation
    .container
      .logo
        img(src="../assets/img/logo.png", alt="Logo")
      .right
        button.nav-btn(@click.prevent="toggleMenu()")
          .nav-burger
        ul.nav
          li.nav-item(:class="{'nav-item_active': !showFavourites}", @click.prevent="showFavourites = false") Меню
          li.nav-item(:class="{'nav-item_active': showFavourites}", @click.prevent="showFavourites = true") Избранное
          li.nav-item(@click.prevent="showCart()")
            button.cart
              .cart-img
                img(src="../assets/img/cart.svg", alt="Cart image")
              .cart-sum {{ currentSum }} Р
    Cart
  .image(:class="{'image_favourites': showFavourites}")
    img(src="../assets/img/top-dish-1.png", alt="Dish image", v-if="showFavourites")
    img(src="../assets/img/top-dish.png", alt="Dish image", v-else)
  Weekdays
  Favourites(v-if="showFavourites")
  Dishes(v-else)
  Footer
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
import Header from '../components/Header'
import Cart from '../components/Cart'
import Weekdays from '../components/Weekdays'
import Favourites from '../components/Favourites'
import Dishes from '../components/Dishes'
import Footer from '../components/Footer'

export default {
  name: 'home',
  data() {
    return {
      showFavourites: false
    }
  },
  methods: {
    showCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'block'
      if (document.body.clientWidth <= 768)
        this.toggleMenu()
    },
    toggleMenu() {
      const burgerBtn = document.querySelector('.nav-burger')
      const navMenu = document.querySelector('.nav')
      navMenu.style.display != 'block' ? burgerBtn.classList.add('nav-burger_active') : burgerBtn.classList.remove('nav-burger_active')
      navMenu.style.display != 'block' ? navMenu.style.display = 'block' : navMenu.style.display = 'none'
    },
    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
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
    },
    processing() {
      return this.$store.getters.processing
    },
    notification() {
      return this.$store.getters.notification
    }
  },
  watch: {
    showFavourites() {
      if (document.body.clientWidth <= 768)
        this.toggleMenu()
    }
  },
  components: {
    Header,
    Cart,
    Weekdays,
    Favourites,
    Dishes,
    Footer
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"
@import "../assets/sass/media-home"

.navigation
  padding: 25px
  .container
    display: flex
    justify-content: space-between
    align-items: center
    .logo
      width: 310px
      margin: 0
    .right
      display: flex
      justify-content: flex-end
      align-items: center
      .nav-btn
        width: 38px
        height: 38px
      .nav-burger, .nav-burger:before, .nav-burger:after
        width: 38px
        height: 3px
        background-color: $c-dark
        transition: 0.2s
        transform-origin: center center
      .nav-burger
        display: none
        position: relative
      .nav-burger:before, .nav-burger:after
        content: ''
        display: block
        position: absolute
        left: 0
      .nav-burger:before
        top: -12px
        transform-origin: right top
      .nav-burger:after
        bottom: -12px
        transform-origin: right bottom
      .nav-burger_active
        width: 0
      .nav-burger_active:before
        transform: translateX(-5px) rotate(-45deg) translateY(-1.5px)
      .nav-burger_active:after
        transform: translateX(-5px) rotate(45deg) translateY(1.5px)
      .nav
        display: flex
        justify-content: flex-end
        &-item
          margin-left: 75px
          position: relative
          font-weight: 500
          font-size: $fz-subtitle
          text-transform: uppercase
          color: $c-dark
          cursor: pointer
          &:after
            display: none
            content: ''
            width: 8px
            height: 8px
            background-color: $c-active
            border-radius: 50%
            position: absolute
            bottom: -12px
            left: 50%
            margin-left: -4px
          &_active:after
            display: block
          &:hover:after
            display: block
      .cart
        display: flex
        justify-content: flex-end
        align-items: center
        &-img
          width: 28px
          margin-right: 9px
        &-sum
          font-weight: 500
          font-size: $fz-subtitle
          color: $c-dark

.image
  display: flex
  justify-content: flex-end
  height: 240px
  background-color: $c-middle
  &_favourites
    background-color: #E8ECEF
  img
    width: auto
    height: 100%
</style>