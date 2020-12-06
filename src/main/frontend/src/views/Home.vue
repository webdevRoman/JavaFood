<template lang="pug">
  .home
    Header

    .navigation

      .container
        .logo
          | JavaF
          img.logo__img(src="../assets/img/loader.svg", alt="OO")
          | d
        .right
          button.nav-btn(@click.prevent="toggleMenu()")
            .nav-burger
          ul.nav
            li.nav-item(
              :class="{'nav-item_active': shownCompany}",
              @click.prevent="showCompany()"
            ) О компании
            li.nav-item(
              :class="{'nav-item_active': !shownCompany && !shownFavourites}",
              @click.prevent="showMenu()"
            ) Меню
            li.nav-item(
              v-if="isAuthenticated",
              :class="{'nav-item_active': shownFavourites}",
              @click.prevent="showFavourites()"
            ) Избранное
            li.nav-item(v-if="isAuthenticated", @click.prevent="showCart()")
              button.cart
                .cart-img
                  img(src="../assets/img/cart.svg", alt="Cart image")
                .cart-sum {{ currentSum }} Р

      Cart

    .image(:class="{'image_company': shownCompany, 'image_favourites': shownFavourites}")
      .company-image__container(v-if="shownCompany")
        .container
          .company-image__title Доставка полезной еды
          .company-image__subtitle Поможем сэкономить время на питание без ущерба для фигуры
      img(src="../assets/img/top-dish-1.png", alt="Dish image", v-else-if="shownFavourites")
      img(src="../assets/img/top-dish.png", alt="Dish image", v-else)

    Company(v-if="shownCompany")
    .company-menu(v-if="shownCompany")
      .company-menu__title Наше меню
      button.company-menu__link.form-submit(@click.prevent="showMenu()") Смотреть

    Favourites(v-else-if="shownFavourites")

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
import Company from '../components/Company'
import Favourites from '../components/Favourites'
import Dishes from '../components/Dishes'
import Footer from '../components/Footer'

export default {

  name: 'home',

  data() {
    return {
      shownCompany: false,
      shownFavourites: false
    }
  },

  methods: {
    showCompany() {
      this.shownCompany = true
      this.shownFavourites = false
    },

    showMenu() {
      this.shownCompany = false
      this.shownFavourites = false
    },

    showFavourites() {
      this.shownCompany = false
      this.shownFavourites = true
    },

    showCart() {
      const cart = document.querySelector('.cart-popup')
      cart.style.display = 'block'
      if (document.body.clientWidth <= 768)
        this.toggleMenu()
    },

    toggleMenu() {
      const burgerBtn = document.querySelector('.nav-burger')
      const navMenu = document.querySelector('.nav')
      navMenu.style.display != 'block'
          ? burgerBtn.classList.add('nav-burger_active')
          : burgerBtn.classList.remove('nav-burger_active')
      navMenu.style.display != 'block' ? navMenu.style.display = 'block' : navMenu.style.display = 'none'
    },

    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },

    cartItems() {
      return this.$store.getters.cart
    },

    currentSum() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)
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

  created() {
    this.$store.dispatch('CHECK_AUTHORIZED').catch(err => {
      if (err) {
        console.log("Authorization checker rejected: " + err.message)
        this.$store.dispatch(
            'SET_NOTIFICATION',
            {msg: `Ошибка проверки авторизации: ${err.message}`, err: true}
        )
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
        }, 5000)
      }
    })

    this.$store.dispatch('LOAD_DISHES').catch(err => {
      console.log("Dishes loader rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          { msg: `Ошибка при загрузке меню: ${err.message}`, err: true }
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })

    this.$store.dispatch('LOAD_COMPANY')
        .catch(err => {
          console.log("Company loader rejected: " + err.message)
          this.$store.dispatch(
              'SET_NOTIFICATION',
              {msg: `Ошибка при загрузке информации о компании: ${err.message}`, err: true}
          )
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
          }, 5000)
        })

    if (this.isAuthenticated) {
      this.$store.dispatch('LOAD_FAVOURITES').catch(err => {
        console.log("Favourites loader rejected: " + err.message)
        this.$store.dispatch(
            'SET_NOTIFICATION',
            {msg: `Ошибка при загрузке избранного: ${err.message}`, err: true}
        )
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
        }, 5000)
      })

      this.$store.dispatch('LOAD_CART').catch(err => {
        console.log("Cart loader rejected: " + err.message)
        this.$store.dispatch(
            'SET_NOTIFICATION',
            {msg: `Ошибка при загрузке корзины: ${err.message}`, err: true}
        )
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
        }, 5000)
      })
    }
  },

  components: {
    Header,
    Cart,
    Company,
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
  margin-bottom: 50px

  &_company
    height: auto
    margin-bottom: 100px
    .company-image
      &__container
        flex-basis: 100%
        background: no-repeat center url("../assets/img/company-top.jpg") $c-middle
        background-size: cover
      &__title
        max-width: 50%
        font-weight: bold
        font-size: 64px
        color: $c-light
        line-height: 80px
        text-transform: uppercase
        margin-top: 100px
        margin-bottom: 10px
      &__subtitle
        max-width: 50%
        font-weight: 300
        font-size: 24px
        color: $c-light
        line-height: 30px
        margin-bottom: 150px

  &_favourites
    background-color: #E8ECEF

  img
    width: auto
    height: 100%

.company
  &-menu
    background: no-repeat center url("../assets/img/company-bot.jpg") $c-middle
    background-size: cover
    padding: 210px 0 140px 0
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    &__title
      font-weight: bold
      font-size: 64px
      color: $c-light
      line-height: 75px
      text-transform: uppercase
      margin-bottom: 30px
    &__link
      width: 262px
</style>