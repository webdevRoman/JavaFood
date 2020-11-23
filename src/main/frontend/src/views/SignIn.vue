<template lang="pug">
.container_center.signin-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .signin
    .title.signin-title Вход
    form.form.signin-form(action="#", @submit.prevent="checkForm()")
      .form-block(:class="{'form-block_error': emailError != ''}")
        label.form-label(for="signin-email") Корпоративная почта SmartWorld
        input.form-input(type="text", id="signin-email", placeholder="@smartworld.team", v-model.trim="email", @focusout="checkEmail()")
        .form-error(v-if="emailError != ''") {{ emailError }}
      .form-block(:class="{'form-block_error': passwordError != '' || authError != ''}")
        label.form-label(for="signin-password") Пароль
        .form-password
          input.form-input(type="password", id="signin-password", v-model.trim="password", @focusout="checkPassword()")
          button.form-password__eye(v-if="passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
            img(src="../assets/img/eye.svg", alt="Eye")
          button.form-password__eye(v-if="passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
            img(src="../assets/img/eye-closed.svg", alt="Closed eye")
        button.signin-form__forget(@click.prevent="goToPassword()") Забыли пароль?
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
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      authError: ''
    }
  },
  methods: {
    goToPassword() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/password')
    },
    goToSignup() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/signup')
    },
    checkForm() {
      this.checkEmail()
      this.checkPassword()
      if (!this.errors || (this.email != '' && this.password != '')) {
        this.$store.dispatch('AUTH_REQUEST', { email: this.email, rememberMe: 1, password: this.password })
        .then(resp => {
          this.$router.push('/')
        },
        err => {
          if (err == 'password') {
            this.$store.dispatch('SET_ERROR', { type: 'auth', msg: 'wrong' })
            this.authError = 'Неверная почта или пароль'
          } else if (err == 'banned') {
            this.$store.dispatch('SET_ERROR', { type: 'auth', msg: 'banned' })
            this.authError = 'Пользователь удален'
          } else {
            console.log('Error on signing in: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
            }, 5000)
          }
        })
      }
    },
    checkEmail() {
      this.$store.dispatch('CLEAR_ERRORS', 'auth')
      this.authError = ''
      const emailArr = this.email.split('@')
      if (this.email != '' && emailArr[1] == undefined)
        this.email = emailArr[0] + '@smartworld.team'
      this.$store.dispatch('CHECK_EMAIL', this.email)
      .then(
        result => {
          if (result == 'empty')
            this.emailError = 'Заполните e-mail'
          // else if (result == 'wrong')
          //   this.emailError = 'Невалидный e-mail'
          else {
            this.emailError = ''
            this.$store.dispatch('CLEAR_ERRORS', 'email')
          }
        },
        error => console.log("Email checker rejected: " + error.message)
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
      this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    }
  },
  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (errors.email != undefined || errors.password != undefined || errors.auth != undefined)
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