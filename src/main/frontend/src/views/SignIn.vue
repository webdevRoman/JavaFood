<template lang="pug">
  .container_center.signin-container

    .logo
      | JavaF
      img.logo__img(src="../assets/img/loader.svg", alt="OO")
      | d

    .signin
      .title.signin-title Вход

      form.form.signin-form(action="#", @submit.prevent="checkForm()")
        .form-block(:class="{'form-block_error': loginError != ''}")
          label.form-label(for="signin-login") Логин
          input.form-input(type="text", id="signin-login", v-model.trim="login", @focusout="checkLogin()")
          .form-error(v-if="loginError != ''") {{ loginError }}

        .form-block(:class="{'form-block_error': passwordError != '' || authError != ''}")
          label.form-label(for="signin-password") Пароль
          .form-password
            input.form-input(
              type="password",
              id="signin-password",
              v-model.trim="password",
              @focusout="checkPassword()"
            )
            button.form-password__eye(v-if="passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
          .form-error(v-if="passwordError != ''") {{ passwordError }}
          .form-error(v-if="authError != ''") {{ authError }}

        button.form-submit(type="submit", :disabled="errors") Войти
        button.signin-form__signup(@click.prevent="goToSignup()") Еще нет аккаунта?

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
export default {

  data() {
    return {
      login: '',
      loginError: '',
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      authError: ''
    }
  },

  methods: {
    goToSignup() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/signup')
    },

    checkForm() {
      this.checkLogin()
      this.checkPassword()
      if (!this.errors || (this.login != '' && this.password != '')) {
        this.$store.dispatch(
            'AUTH_REQUEST',
            {login: this.login, rememberMe: 1, password: this.password}
        )
            .then(resp => {
                  this.$router.push('/')
                },
                err => {
                  if (err == 'password') {
                    this.$store.dispatch('SET_ERROR', {type: 'auth', msg: 'wrong'})
                    this.authError = 'Неверная почта или пароль'
                  } else {
                    console.log('Error on signing in: ' + err)
                    this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
                    setTimeout(() => {
                      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
                    }, 5000)
                  }
                })
      }
    },

    checkLogin() {
      this.$store.dispatch('CLEAR_ERRORS', 'auth')
      this.authError = ''
      this.$store.dispatch('CHECK_LOGIN', this.login)
          .then(
              result => {
                if (result == 'empty')
                  this.loginError = 'Заполните логин'
                else if (result == 'wrong')
                  this.loginError = 'Неверный логин'
                else {
                  this.loginError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'login')
                }
              },
              error => console.log("Login checker rejected: " + error.message)
          )
    },

    checkPassword() {
      this.$store.dispatch('CLEAR_ERRORS', 'auth')
      this.authError = ''
      this.$store.dispatch('CHECK_OLD_PASSWORD', this.password)
          .then(
              result => {
                if (result == 'empty')
                  this.passwordError = 'Заполните пароль'
                else if (result == 'wrong')
                  this.passwordError = 'Неверный пароль'
                else {
                  this.passwordError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'oldPassword')
                }
              },
              error => console.log("Password checker rejected: " + error.message)
          )
    },

    togglePasswordShow() {
      const passwordInput = document.getElementById('signin-password')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordShow = !this.passwordShow
    },

    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
    }
  },

  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (errors.login != undefined || errors.password != undefined || errors.auth != undefined)
        return true
      else
        return false
    },

    processing() {
      return this.$store.getters.processing
    },

    notification() {
      return this.$store.getters.notification
    }
  },

  watch: {
    password(value) {
      if (value != '')
        this.passwordFocus = true
      else
        this.passwordFocus = false
    }
  }

}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.signin
  width: 262px

  &-container
    flex-direction: column

    .logo
      margin-bottom: 50px

  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px

  &-form
    &__forget
      display: block
      font-weight: 500
      font-size: 13px
      color: lighten($c-dark, 40)
      text-decoration: underline
      margin-top: 12px
      transition: 0.2s

      &:hover
        color: lighten($c-dark, 20)

    &__signup
      font-weight: 500
      font-size: 13px
      color: lighten($c-dark, 40)
      text-transform: uppercase
      text-decoration: underline
      text-align: center
      margin: 30px auto 0 auto
      transition: 0.2s

      &:hover
        color: lighten($c-dark, 20)

  .form
    &-submit
      margin-top: 85px

@media(max-width: 1200px)
  html
    .container_center
      align-items: center
      height: 100vh

    .signin
      &-title
        font-size: 28px
        margin-bottom: 60px

      .logo
        margin-bottom: 25px

      &-form
        &__signup
          margin-top: 13px

@media(max-width: 992px)
  html
    .signin
      .form
        &__signup
          &:hover
            color: lighten($c-dark, 40)

@media(max-width: 768px)
  html
    .container_center
      background: url("../assets/img/bg.png") $c-bg center center no-repeat
      background-size: cover

    .signin
      &-title
        font-size: 20px
        margin-bottom: 50px

      .form
        &-block
          margin-right: 0

          &:nth-child(3n)
            margin-right: 0

          &:nth-child(2n)
            margin-right: 0

        &-submit
          width: 100%
          margin-top: 60px

@media(max-width: 576px)
  html
    .signin
      width: 200px

      &-title
        font-size: 15px
        margin-bottom: 25px

      .logo
        margin-bottom: 20px

      .form
        &-block
          margin-right: 0

          &:nth-child(3n)
            margin-right: 0

          &:nth-child(2n)
            margin-right: 0

        &-submit
          width: 210px
          font-size: 15px

      &-form
        &__signup
          margin-top: 20px
</style>