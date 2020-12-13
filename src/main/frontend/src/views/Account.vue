<template lang="pug">
  .container_center
    .account

      .account-logo
        .account-logo__line
        .account-logo__img
          img(src="../assets/img/user.svg", alt="User icon")

      form.form.account-form(action="#", @submit.prevent="checkForm()")
        .account-form__inputs

          .form-block.account-form__block(:class="{'form-block_error': surnameError != ''}")
            label.form-label(for="account-surname") Фамилия
            input.form-input(
              type="text",
              id="account-surname",
              v-model.trim="surname",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkSurname()")
            .form-error(v-if="surnameError != ''") {{ surnameError }}

          .form-block.account-form__block(:class="{'form-block_error': nameError != ''}")
            label.form-label(for="account-name") Имя
            input.form-input(
              type="text",
              id="account-name",
              v-model.trim="name",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkName()")
            .form-error(v-if="nameError != ''") {{ nameError }}

          .form-block.account-form__block(:class="{'form-block_error': middleNameError != ''}")
            label.form-label(for="account-middlename") Отчество (не обязательно)
            input.form-input(
              type="text",
              id="account-middlename",
              v-model.trim="middleName",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkMiddleName()")
            .form-error(v-if="middleNameError != ''") {{ middleNameError }}

          .form-block.account-form__block(:class="{'form-block_error': oldPasswordError != ''}")
            label.form-label(for="account-password-old") Ваш действующий пароль
            .form-password
              input.form-input(
                type="password",
                id="account-password-old",
                v-model.trim="oldPassword",
                @focusout="checkOldPassword()")
              button.form-password__eye(
                v-if="oldPasswordFocus && !oldPasswordShow",
                @click.prevent="togglePasswordShow('account-password-old')")
                img(src="../assets/img/eye.svg", alt="Eye")
              button.form-password__eye(
                v-if="oldPasswordFocus && oldPasswordShow",
                @click.prevent="togglePasswordShow('account-password-old')")
                img(src="../assets/img/eye-closed.svg", alt="Closed eye")
            .form-error(v-if="oldPasswordError != ''") {{ oldPasswordError }}

          .form-block.account-form__block(
            :class="{'form-block_disabled': !newPasswordEnabled, 'form-block_error': passwordError != ''}")
            label.form-label(for="account-password") Новый пароль
            .form-password
              input.form-input(
                type="password",
                id="account-password",
                v-model.trim="password",
                @focusout="checkPassword()",
                :disabled="!newPasswordEnabled")
              button.form-password__eye(
                v-if="!passwordsMatch && passwordFocus && !passwordShow",
                @click.prevent="togglePasswordShow('account-password')")
                img(src="../assets/img/eye.svg", alt="Eye")
              button.form-password__eye(
                v-if="!passwordsMatch && passwordFocus && passwordShow",
                @click.prevent="togglePasswordShow('account-password')")
                img(src="../assets/img/eye-closed.svg", alt="Closed eye")
              .form-password__eye(v-if="passwordsMatch")
                img(src="../assets/img/tick-success.svg", alt="Tick")
            .form-error(v-if="passwordError != ''") {{ passwordError }}

          .form-block.account-form__block(
            :class="{'form-block_disabled': !newPasswordEnabled, 'form-block_error': passwordRepeatError != ''}")
            label.form-label(for="account-password-repeat") Повторите пароль
            .form-password
              input.form-input(
                type="password",
                id="account-password-repeat",
                v-model.trim="passwordRepeat",
                @focusout="checkPasswordRepeat()",
                :disabled="!newPasswordEnabled")
              button.form-password__eye(
                v-if="!passwordsMatch && passwordRepeatFocus && !passwordRepeatShow",
                @click.prevent="togglePasswordShow('account-password-repeat')")
                img(src="../assets/img/eye.svg", alt="Eye")
              button.form-password__eye(
                v-if="!passwordsMatch && passwordRepeatFocus && passwordRepeatShow",
                @click.prevent="togglePasswordShow('account-password-repeat')")
                img(src="../assets/img/eye-closed.svg", alt="Closed eye")
              .form-password__eye(v-if="passwordsMatch")
                img(src="../assets/img/tick-success.svg", alt="Tick")
            .form-error(v-if="passwordRepeatError != ''") {{ passwordRepeatError }}

          .form-block.account-form__block(:class="{'form-block_error': loginError != ''}")
            label.form-label(for="account-login") Логин
            input.form-input(
              type="text",
              id="account-login",
              v-model.trim="login",
              v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
              @focusout="checkLogin()"
            )
            .form-error(v-if="loginError != ''") {{ loginError }}

          .form-block.account-form__block(:class="{'form-block_error': phoneError != ''}")
            label.form-label(for="account-phone") Телефон
            input.form-input(
              type="text", id="account-phone",
              v-model.trim="phone",
              v-mask="'+7 (###) ###-##-##'",
              @focusout="checkPhone()"
            )
            .form-error(v-if="phoneError != ''") {{ phoneError }}

        .account-form__buttons
          button.btn.btn_o.account-form__btn(@click.prevent="goBack()") Вернуться на сайт
          button.form-submit.account-form__btn.account-form__submit(type="submit", :disabled="errors") Подтвердить

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
      middleName: '',
      middleNameError: '',
      oldPassword: '',
      oldPasswordError: '',
      oldPasswordFocus: false,
      oldPasswordShow: false,
      password: '',
      passwordError: '',
      passwordFocus: false,
      passwordShow: false,
      passwordRepeat: '',
      passwordRepeatError: '',
      passwordRepeatFocus: false,
      passwordRepeatShow: false,
      passwordsMatch: false,
      newPasswordEnabled: false,
      login: '',
      loginError: '',
      phone: '',
      phoneError: ''
    }
  },

  methods: {
    goBack() {
      this.closeNotification()
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.oldPassword = ''
      this.password = ''
      this.passwordRepeat = ''
      this.passwordsMatch = false
      this.$router.push('/')
    },

    checkForm() {
      this.checkName()
      this.checkSurname()
      this.checkMiddleName()
      this.checkOldPassword()
      this.checkLogin()
      this.checkPhone()
      if (!this.errors) {
        let newUser = {}
        newUser.firstName = this.name ? this.name : this.stateName
        newUser.lastName = this.surname ? this.surname : this.stateSurname
        newUser.midName = this.middleName ? this.middleName : null
        if (this.oldPassword && this.passwordsMatch) {
          newUser.oldPassword = this.oldPassword
          newUser.password = this.password
        }
        if (this.login && this.login !== this.stateLogin) {
          newUser.oldLogin = this.stateLogin
          newUser.login = this.login
        } else {
          newUser.login = this.stateLogin
        }
        newUser.phone = this.phone ? this.phone : this.statePhone
        this.$store.dispatch('UPDATE_USER', newUser)
            .then(resp => {
              this.oldPassword = ''
              this.password = ''
              this.passwordRepeat = ''
              this.$store.dispatch('SET_NOTIFICATION', {msg: 'Изменения сохранены', err: false})
              setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                  5000)
            })
            .catch(err => {
              console.log('Error on updating user data: ' + err)
              this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
              setTimeout(() => {
                this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
              }, 5000)
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

    checkMiddleName() {
      if (this.middleName) {
        this.middleName = this.middleName.charAt(0).toUpperCase() + this.middleName.slice(1).toLowerCase()
        this.$store.dispatch('CHECK_NAME', {type: 'middlename', data: this.middleName})
            .then(
                result => {
                  if (result == 'long')
                    this.middleNameError = 'Отчество должно содержать не более 35 символов'
                  else if (result == 'wrong')
                    this.middleNameError = 'Отчество должно состоять только из букв русского алфавита'
                  else
                    this.middleNameError = ''
                },
                error => console.log("Name checker rejected: " + error.message)
            )
      }
    },

    checkOldPassword() {
      if (this.oldPassword == '') {
        this.$store.dispatch('CLEAR_ERRORS', 'oldPassword')
        this.$store.dispatch('CLEAR_ERRORS', 'password')
        this.password = ''
        this.passwordError = ''
        this.$store.dispatch('CLEAR_ERRORS', 'passwordRepeat')
        this.passwordRepeat = ''
        this.passwordRepeatError = ''
        this.passwordsMatch = false
      } else {
        this.$store.dispatch('CHECK_OLD_PASSWORD', this.oldPassword)
            .then(
                result => {
                  this.oldPasswordError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'oldPassword')
                  this.checkPassword()
                  this.checkPasswordRepeat()
                },
                error => console.log("OldPassword checker rejected: " + error.message)
            )
      }
    },

    checkPassword() {
      this.$store.dispatch('CHECK_PASSWORD', this.password)
          .then(
              result => {
                if (this.oldPassword && result == 'empty')
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

    togglePasswordShow(id) {
      const passwordInput = document.getElementById(id)
      if (passwordInput.type == 'password')
        passwordInput.type = 'text'
      else
        passwordInput.type = 'password'
      if (id == 'account-password-old')
        this.oldPasswordShow = !this.oldPasswordShow
      else if (id == 'account-password')
        this.passwordShow = !this.passwordShow
      else if (id == 'account-password-repeat')
        this.passwordRepeatShow = !this.passwordRepeatShow
    },

    checkPasswordRepeat() {
      this.$store.dispatch(
          'CHECK_PASSWORD_REPEAT',
          { password: this.password, passwordRepeat: this.passwordRepeat }
      )
          .then(
              result => {
                this.passwordsMatch = false
                if (this.password && result == 'empty')
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

    checkLogin() {
      this.$store.dispatch('CHECK_LOGIN', this.login)
          .then(
              result => {
                if (result == 'wrong')
                  this.loginError = 'Неверный логин'
                else {
                  this.loginError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'login')
                }
              },
              error => console.log("Login checker rejected: " + error.message)
          )
    },

    checkPhone() {
      this.$store.dispatch('CHECK_PHONE', this.phone)
          .then(
              result => {
                if (result == 'wrong')
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
    stateLogin() {
      return this.$store.getters.login
    },

    stateName() {
      return this.$store.getters.name
    },

    stateSurname() {
      return this.$store.getters.surname
    },

    stateMiddleName() {
      return this.$store.getters.middleName
    },

    statePhone() {
      return this.$store.getters.phone
    },

    errors() {
      const errors = this.$store.getters.errors
      if (
          errors.oldPassword != undefined
          || errors.password != undefined
          || errors.passwordRepeat != undefined
          || errors.name != undefined
          || errors.surname != undefined
          || errors.middlename != undefined
          || errors.login != undefined
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
    oldPassword(value) {
      if (value != '') {
        this.oldPasswordFocus = true
        this.newPasswordEnabled = true
      } else {
        this.oldPasswordFocus = false
        this.newPasswordEnabled = false
      }
    },

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
    this.login = this.stateLogin
    this.name = this.stateName
    this.surname = this.stateSurname
    this.middleName = this.stateMiddleName
    this.phone = this.statePhone
  }

}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.container_center
  overflow-x: hidden

.account
  width: 945px

  &-logo
    margin: 0 auto 90px auto
    position: relative

    &__line
      width: 274px
      height: 3px
      background-color: $c-dark
      position: absolute
      top: 70px
      left: 50%
      margin-left: -137px
      z-index: -1

    &__img
      display: flex
      justify-content: center
      align-items: center
      width: 110px
      height: 110px
      padding: 27px
      border-radius: 50%
      border: 2px solid $c-dark
      background-color: $c-bg
      margin: 0 auto

  &-form
    &__inputs
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      margin-bottom: 50px

      &:after
        content: ''
        flex: auto

    &__block
      flex-basis: 262px
      margin-right: 78px
      margin-bottom: 50px

      &:nth-child(3n)
        margin-right: 0

    &__buttons
      display: flex
      justify-content: center
      align-items: center

    &__btn
      display: block
      width: 262px
      padding: 20px
      font-weight: 500
      font-size: 18px

      &:first-child
        margin-right: 30px

@media(max-width: 1200px)
  html
    .container_center
      overflow-x: visible

    .account
      width: 610px

      &-logo
        margin-bottom: 25px

        &__line
          width: 186px
          height: 2px
          top: 50px
          margin-left: -93px

        &__img
          width: 75px
          height: 75px
          padding: 17px

      &-form
        &__block
          margin-right: 85px

          &:nth-child(3n)
            margin-right: 85px

          &:nth-child(2n)
            margin-right: 0

        &__btn
          width: 210px

          &:first-child
            margin-right: 25px

@media(max-width: 768px)
  html
    .account
      width: 380px

      &-logo
        margin-bottom: 65px

      &-form
        &__inputs
          margin-bottom: 65px

          &:after
            display: none

        &__block
          margin: 0 auto 30px auto

          &:nth-child(3n)
            margin-right: auto

          &:nth-child(2n)
            margin-right: auto

        &__btn
          width: 180px
          padding: 15px
          font-size: 15px

          &:first-child
            margin-right: 20px

@media(max-width: 576px)
  html
    .account
      width: 200px

      &-logo
        margin-bottom: 40px

        &__line
          width: 138px
          height: 1px
          top: 35px
          margin-left: -69px

        &__img
          width: 54px
          height: 54px
          padding: 13px
          border: 1px solid $c-dark

      &-form
        &__inputs
          margin-bottom: 50px

        &__block
          margin-bottom: 20px

        &__buttons
          flex-direction: column-reverse

        &__btn
          width: 160px
          font-size: 13px

          &:first-child
            margin-right: 0
            margin-top: 15px
</style>