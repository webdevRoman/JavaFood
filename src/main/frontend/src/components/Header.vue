<template lang="pug">
  .header
    .container
      .header-container
        button.user(@click.prevent="toggleMenu()")
          .user-img
            img(src="../assets/img/user.svg", alt="User Image")
          .user-name(v-if="isAuthenticated") {{ login }}
          .user-name(v-else) Неавторизованный пользователь
          .user-triangle
            img(src="../assets/img/triangle-down.svg", alt="Triangle down")
        .user-menu
          router-link.user-menu__item(v-if="!isAuthenticated", tag="button", to="/signin") Вход
          router-link.user-menu__item(v-if="!isAuthenticated", tag="button", to="/signup") Регистрация
          router-link.user-menu__item(v-if="isAuthenticated", tag="button", to="/account") Личный кабинет
          router-link.user-menu__item(v-if="isAuthenticated && isAdmin", tag="button", to="/admin") Администрирование
          button.user-menu__item(v-if="isAuthenticated", @click.prevent="signout()") Выход
</template>

<script>
export default {

  methods: {
    toggleMenu() {
      const menuBtn = document.querySelector('.header-container')
      menuBtn.classList.contains('header-container_active')
          ? menuBtn.classList.remove('header-container_active')
          : menuBtn.classList.add('header-container_active')
    },

    signout() {
      this.$store.dispatch('AUTH_LOGOUT')
          .catch(err => {
            console.log('Error on signing out: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    login() {
      return this.$store.getters.login
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  }

}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.header
  padding: 9px 0
  background-color: $c-dark

  .header-container
    position: relative

    &_active
      .user-triangle
        transform: rotateX(180deg)

      div.user-menu
        display: block

  .container
    display: flex
    justify-content: flex-end
    align-items: center

    .user
      display: flex
      align-items: center

      &-img
        width: 32px
        height: 32px
        padding: 5px
        background-color: $c-bg
        border-radius: 50%
        overflow: hidden
        margin-right: 13px

      &-name
        font-weight: bold
        font-size: $fz-subtitle
        color: $c-light
        transition: 0.2s
        margin-right: 20px

      &-triangle
        transition: 0.2s

      &:hover
        .user-name
          color: $c-active

      &-menu
        display: none
        width: 250px
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25)
        position: absolute
        top: calc(100% + 5px)
        right: 0
        z-index: 15

        &__item
          width: 100%
          padding: 14px 24px
          background-color: $c-bg
          font-size: 18px
          text-align-last: left
          transition: 0.2s

          &:hover
            background-color: $c-active
            color: $c-light

@media(max-width: 992px)
  html
    .header
      .container
        .user
          &:hover
            .user-name
              color: $c-light

          &-menu
            &__item
              &:hover
                background-color: $c-bg
                color: $c-dark
</style>