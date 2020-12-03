<template lang="pug">
  .container_center
    .signup

      .logo
        | JavaF
        img.logo__img(src="../assets/img/loader.svg", alt="OO")
        | d

      .title.signup-title Регистрация

      form.form.signup-form(action="#", @submit.prevent="checkForm()")

        .signup-form__inputs

          .form-block.signup-form__block(:class="{'form-block_error': surnameError != ''}")
            label.form-label(for="signup-surname") Фамилия
            input.form-input(
              type="text",
              id="signup-surname",
              v-model.trim="surname",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkSurname()"
            )
            .form-error(v-if="surnameError != ''") {{ surnameError }}

          .form-block.signup-form__block(:class="{'form-block_error': nameError != ''}")
            label.form-label(for="signup-name") Имя
            input.form-input(
              type="text",
              id="signup-name",
              v-model.trim="name",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkName()"
            )
            .form-error(v-if="nameError != ''") {{ nameError }}

          .form-block.signup-form__block(:class="{'form-block_error': middlenameError != ''}")
            label.form-label(for="signup-middlename") Отчество (не обязательно)
            input.form-input(
              type="text",
              id="signup-middlename",
              v-model.trim="middlename",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkMiddlename()"
            )
            .form-error(v-if="middlenameError != ''") {{ middlenameError }}

          .form-block.signup-form__block(:class="{'form-block_error': loginError != ''}")
            label.form-label(for="signup-login") Логин
            input.form-input(
              type="text",
              id="signup-login",
              v-model.trim="login",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkLogin()"
            )
            .form-error(v-if="loginError != ''") {{ loginError }}

          .form-block.signup-form__block(:class="{'form-block_error': passwordError != ''}")
            label.form-label(for="signup-password") Пароль
            .form-password
              input.form-input(
                type="password",
                id="signup-password",
                v-model.trim="password",
                @focusout="checkPassword()"
              )
              button.form-password__eye(
                v-if="!passwordsMatch && passwordFocus && !passwordShow",
                @click.prevent="togglePasswordShow()"
              )
                img(src="../assets/img/eye.svg", alt="Eye")
              button.form-password__eye(
                v-if="!passwordsMatch && passwordFocus && passwordShow",
                @click.prevent="togglePasswordShow()"
              )
                img(src="../assets/img/eye-closed.svg", alt="Closed eye")
              .form-password__eye(v-if="passwordsMatch")
                img(src="../assets/img/tick-success.svg", alt="Tick")
            .form-error(v-if="passwordError != ''") {{ passwordError }}

          .form-block.signup-form__block(:class="{'form-block_error': passwordRepeatError != ''}")
            label.form-label(for="signup-password-repeat") Повторите пароль
            .form-password
              input.form-input(
                type="password",
                id="signup-password-repeat",
                v-model.trim="passwordRepeat",
                @focusout="checkPasswordRepeat()"
              )
              button.form-password__eye(
                v-if="!passwordsMatch && passwordRepeatFocus && !passwordRepeatShow",
                @click.prevent="togglePasswordRepeatShow()"
              )
                img(src="../assets/img/eye.svg", alt="Eye")
              button.form-password__eye(
                v-if="!passwordsMatch && passwordRepeatFocus && passwordRepeatShow",
                @click.prevent="togglePasswordRepeatShow()"
              )
                img(src="../assets/img/eye-closed.svg", alt="Closed eye")
              .form-password__eye(v-if="passwordsMatch")
                img(src="../assets/img/tick-success.svg", alt="Tick")
            .form-error(v-if="passwordRepeatError != ''") {{ passwordRepeatError }}

          .form-block.signup-form__block(:class="{'form-block_error': phoneError != ''}")
            label.form-label(for="signup-phone") Телефон
            input.form-input(
              type="text", id="signup-phone",
              v-model.trim="phone",
              v-mask="'+7 (###) ###-##-##'",
              @focusout="checkPhone()"
            )
            .form-error(v-if="phoneError != ''") {{ phoneError }}

        button.form-submit.signup-form__submit(type="submit", :disabled="errors") Зарегистрироваться
        button.signup-form__signin(@click.prevent="goToSignin()") Уже есть аккаунт?

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
      name: '',
      nameError: '',
      surname: '',
      surnameError: '',
      middlename: '',
      middlenameError: '',
      login: '',
      loginError: '',
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      passwordRepeat: '',
      passwordRepeatError: '',
      passwordRepeatFocus: false,
      passwordRepeatShow: false,
      passwordsMatch: false,
      phone: '',
      phoneError: ''
    }
  },

  methods: {
    goToSignin() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.$router.push('/signin')
    },

    checkForm() {
      this.checkName()
      this.checkSurname()
      this.checkMiddlename()
      this.checkLogin()
      this.checkPassword()
      this.checkPhone()
      if (!this.errors) {
        this.$store.dispatch('REG_REQUEST', {
          login: this.login,
          password: this.password,
          firstName: this.name,
          lastName: this.surname,
          midName: this.middlename,
          phone: this.phone
        })
            .then(resp => {
                  this.$router.push('/')
                },
                err => {
                  if (err == 'login') {
                    this.$store.dispatch('SET_ERROR', {type: 'login', msg: 'reserved'})
                    this.loginError = 'Данный логин уже занят'
                  } else {
                    console.log('Error on checking registration data: ' + err)
                    this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
                    setTimeout(() => {
                      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
                    }, 5000)
                  }
                })
      }
    },

    checkName() {
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', {type: 'name', data: this.name})
          .then(
              result => {
                if (result == 'empty')
                  this.nameError = 'Заполните имя'
                else if (result == 'long')
                  this.nameError = 'Имя должно содержать не более 35 символов'
                else if (result == 'wrong')
                  this.nameError = 'Имя должно состоять только из букв русского алфавита'
                else
                  this.nameError = ''
              },
              error => console.log("Name checker rejected: " + error.message)
          )
    },

    checkSurname() {
      this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', {type: 'surname', data: this.surname})
          .then(
              result => {
                if (result == 'empty')
                  this.surnameError = 'Заполните фамилию'
                else if (result == 'long')
                  this.surnameError = 'Фамилия должна содержать не более 35 символов'
                else if (result == 'wrong')
                  this.surnameError = 'Фамилия должна состоять только из букв русского алфавита'
                else
                  this.surnameError = ''
              },
              error => console.log("Name checker rejected: " + error.message)
          )
    },

    checkMiddlename() {
      this.middlename = this.middlename.charAt(0).toUpperCase() + this.middlename.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', {type: 'middlename', data: this.middlename})
          .then(
              result => {
                if (result == 'long')
                  this.middlenameError = 'Отчество должно содержать не более 35 символов'
                else if (result == 'wrong')
                  this.middlenameError = 'Отчество должно состоять только из букв русского алфавита'
                else
                  this.middlenameError = ''
              },
              error => console.log("Name checker rejected: " + error.message)
          )
    },

    checkLogin() {
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
      this.$store.dispatch(
          'CHECK_PASSWORD_REPEAT',
          {
            password: this.password, passwordRepeat: this.passwordRepeat
          })
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
      const passwordInput = document.getElementById('signup-password')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordShow = !this.passwordShow
    },

    togglePasswordRepeatShow() {
      const passwordInput = document.getElementById('signup-password-repeat')
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      this.passwordRepeatShow = !this.passwordRepeatShow
    },

    checkPhone() {
      this.$store.dispatch('CHECK_PHONE', this.phone)
          .then(
              result => {
                if (result == 'empty')
                  this.phoneError = 'Заполните телефон'
                else if (result == 'wrong')
                  this.phoneError = 'Неверный телефон'
                else {
                  this.phoneError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'phone')
                }
              },
              error => console.log("Phone checker rejected: " + error.message)
          )
    },

    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
    }
  },

  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (
          errors.login != undefined && errors.login != 'wrong'
          || errors.password != undefined
          || errors.passwordRepeat != undefined
          || errors.name != undefined
          || errors.surname != undefined
          || errors.middlename != undefined
          || errors.phone != undefined
      )
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
  }

}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.signup
  width: 945px

  &-title
    font-size: 30px
    text-align: center
    margin-bottom: 90px

  .logo
    margin-bottom: 50px

  &-form
    &__inputs
      display: flex
      justify-content: space-between
      align-items: center
      flex-wrap: wrap

    &__block
      flex-basis: 262px

      &:last-child
        margin-left: auto
        margin-right: auto

    &__submit
      display: block
      width: 262px
      margin: 0 auto

    &__signin
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

@media(max-width: 1200px)
  html
    .container_center
      align-items: center
      height: 100vh

    .signup
      width: 610px

      &-title
        font-size: 28px
        margin-bottom: 60px

      .logo
        margin-bottom: 25px

      &-form
        &__submit
          width: 220px

        &__signin
          margin-top: 13px

@media(max-width: 992px)
  html
    .container_center
      align-items: flex-start
      height: auto

    .signup
      &-form
        &__signin
          &:hover
            color: lighten($c-dark, 40)

@media(max-width: 768px)
  html
    .container_center
      background: url("../assets/img/bg.png") $c-bg center center no-repeat
      background-size: cover

    .signup
      width: 262px

      &-title
        font-size: 20px
        margin-bottom: 50px

      &-form
        &__submit
          width: 210px
          margin-top: 60px

@media(max-width: 576px)
  html
    .signup
      width: 200px

      &-title
        font-size: 15px
        margin-bottom: 25px

      .logo
        margin-bottom: 20px

      &-form
        &__submit
          width: 210px
          margin-top: 60px

        &__signin
          margin-top: 20px
</style>