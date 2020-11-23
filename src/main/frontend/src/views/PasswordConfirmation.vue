<template lang="pug">
div
  .container_center.password-container(v-if="!passwordChanged")
    .logo
      img(src="../assets/img/logo.png", alt="Logo")
    .password
      .title.password-title Замена пароля
      form.form.password-form(action="#", @submit.prevent="checkForm()")
        .form-block(:class="{'form-block_error': passwordError != ''}")
          label.form-label(for="password-password") Новый пароль
          .form-password
            input.form-input(type="password", id="password-password", v-model.trim="password", @focusout="checkPassword()")
            button.form-password__eye(v-if="!passwordsMatch && passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="!passwordsMatch && passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-password__eye(v-if="passwordsMatch")
              img(src="../assets/img/tick-success.svg", alt="Tick")
          .form-error(v-if="passwordError != ''") {{ passwordError }}
        .form-block(:class="{'form-block_error': passwordRepeatError != ''}")
          label.form-label(for="password-password-repeat") Повторите новый пароль
          .form-password
            input.form-input(type="password", id="signup-password-repeat", v-model.trim="passwordRepeat", @focusout="checkPasswordRepeat()")
            button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && !passwordRepeatShow", @click.prevent="togglePasswordRepeatShow()")
              img(src="../assets/img/eye.svg", alt="Eye")
            button.form-password__eye(v-if="!passwordsMatch && passwordRepeatFocus && passwordRepeatShow", @click.prevent="togglePasswordRepeatShow()")
              img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-password__eye(v-if="passwordsMatch")
              img(src="../assets/img/tick-success.svg", alt="Tick")
          .form-error(v-if="passwordRepeatError != ''") {{ passwordRepeatError }}
        button.form-submit(type="submit", :disabled="errors") Подтвердить
  .container_center.signup-container(v-else)
    .logo
      img(src="../assets/img/logo.png", alt="Logo")
    .signup.container
      .title.signup-title Замена пароля
      .signup-info
        .signup-info__title Замена пароля успешно завершена
        router-link.signup-info__repeat(tag="button", to="/signin") Войти
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
      getParams: {},
      passwordChanged: false,
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      passwordRepeat: '',
      passwordRepeatError: '',
      passwordRepeatFocus: false,
      passwordRepeatShow: false,
      passwordsMatch: false
    }
  },
  methods: {
    checkForm() {
      this.checkPassword()
      if (!this.errors) {
        this.$store.dispatch('SEND_PASSWORDS', { token: this.getParams.token, password: this.password, password_2: this.passwordRepeat })
        .then(resp => {
          this.passwordChanged = true
        },
        err => {
          console.log('Error on sending passwords: ' + err)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        })
      }
    },
    checkPassword() {
      this.$store.dispatch('CHECK_PASSWORD', this.password)
      .then(
        result => {
          if (result == 'empty')
            this.passwordError = 'Заполните пароль'
          else if (result == 'short')
            this.passwordError = 'Пароль должен содержать не менее 6 символов'
          else if (result == 'long')
            this.passwordError = 'Пароль должен содержать не более 25 символов'
          else if (result == 'wrong')
            this.passwordError = 'Пароль должен состоять только из латинских букв и цифр'
          else
            this.passwordError = ''
          this.checkPasswordRepeat()
        },
        error => console.log("Password checker rejected: " + error.message)
      )
    },
    checkPasswordRepeat() {
      this.$store.dispatch('CHECK_PASSWORD_REPEAT', { password: this.password, passwordRepeat: this.passwordRepeat })
      .then(
        result => {
          this.passwordsMatch = false
          if (result == 'empty')
            this.passwordRepeatError = 'Заполните пароль'
          else if (result == 'wrong')
            this.passwordRepeatError = 'Пароли не совпадают'
          else if (this.passwordError != '')
            this.passwordRepeatError = ''
          else {
            this.passwordRepeatError = ''
            this.passwordsMatch = true
          }
        },
        error => console.log("PasswordRepeat checker rejected: " + error.message)
      )
    },
    togglePasswordShow() {
      const passwordInput = document.getElementById('password-password')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordShow = !this.passwordShow
    },
    togglePasswordRepeatShow() {
      const passwordInput = document.getElementById('password-password-repeat')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordRepeatShow = !this.passwordRepeatShow
    },
    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    }
  },
  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (errors.password != undefined || errors.passwordRepeat != undefined)
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
    },
    passwordRepeat(value) {
      if (value != '')
        this.passwordRepeatFocus = true
      else
        this.passwordRepeatFocus = false
    }
  },
  created() {
    let uri = window.location.href.split('?')
    if (uri.length == 2) {
      let vars = uri[1].split('&')
      let getVars = {}
      let tmp = ''
      vars.forEach(function(v){
        tmp = v.split('=')
        if(tmp.length == 2)
          getVars[tmp[0]] = tmp[1]
      })
      this.getParams = getVars
    }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.password
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
        
@media(max-width: 1200px)
  html
    .container_center
      align-items: center
      height: 100vh
    .password
      &-title
        font-size: 28px
        margin-bottom: 60px
      .logo
        margin-bottom: 25px

@media(max-width: 768px)
  html
    .container_center
      background: url("../assets/img/bg.png") $c-bg center center no-repeat
      background-size: cover
    .password
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
    .password
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
          margin-top: 60px

.signup
  &-container
    flex-direction: column
    .logo
      margin-bottom: 50px
  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px
  &-info
    &__title
      font-weight: 500
      font-size: 28px
      text-align: center
      margin-bottom: 50px
    &__repeat
      display: block
      width: 262px
      padding: 20px
      background-color: #74A049
      border: 1px solid #74A049
      font-weight: 500
      font-size: 18px
      color: #FFFFFF
      text-align: center
      margin: 0 auto
      transition: 0.2s
      &:hover
        background-color: #4e6b31
        border: 1px solid #4e6b31

@media(max-width: 1200px)
  html
    .signup
      &-title
        font-size: 28px
        margin-bottom: 60px
      .logo
        margin-bottom: 25px
      &-info
        &__title
          font-size: 26px

@media(max-width: 992px)
  html
    .signup
      &-info
        &__repeat
          &:hover
            background-color: #74A049
            border: 1px solid #74A049

@media(max-width: 768px)
  html
    .container_center
      background: url("../assets/img/bg.png") $c-bg center center no-repeat
      background-size: cover
    .signup
      &-title
        font-size: 20px
        margin-bottom: 50px
      &-info
        &__title
          font-size: 20px
          margin-bottom: 30px
        &__repeat
          width: 210px
          padding: 18px

@media(max-width: 576px)
  html
    .signup
      &-title
        font-size: 15px
        margin-bottom: 25px
      .logo
        margin-bottom: 20px
      &-info
        &__title
          font-size: 16px
        &__repeat
          width: 180px
          padding: 15px
          font-size: 13px
</style>