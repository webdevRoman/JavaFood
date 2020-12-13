<template lang="pug">
  .admin-main.admin-users
    .users-container

      .users-title Управление пользователями

      table.users-table

        tr.users-table__header
          th.login Логин
          th.name ФИО
          th.phone Телефон
          th.role Роль
          th(colspan="3")

        tr.users-table__line(v-for="user in users")
          td.login {{ user.login }}
          td.name {{ user.firstName }} {{ user.midName }} {{ user.lastName }}
          td.phone {{ user.phone }}
          td.role
            .select-container
              v-select.select(
                v-model="user.roleName",
                :options="roles",
                :clearable="false",
                :searchable="false",
                @input="changeUserRole(user)"
              )
                template(v-slot:option="option")
                  span.select-option {{ option.label }}
          td.delete
            button.btn(@click.prevent="deleteUser(user.login)") Удалить

      button.users-btn(@click.prevent="showPopup = true") +

    .overlay(v-if="showPopup")
      form.form.popup.popup-admin(action="#", @submit.prevent="checkForm()")
        .form-title Добавление пользователя
        .form-inputs

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

          .form-block.signup-form__block(:class="{'form-block_error': phoneError != ''}")
            label.form-label(for="signup-phone") Телефон
            input.form-input(
              type="text", id="signup-phone",
              v-model.trim="phone",
              v-mask="'+7 (###) ###-##-##'",
              @focusout="checkPhone()"
            )
            .form-error(v-if="phoneError != ''") {{ phoneError }}

          .form-block.form-block_last
            label.form-label.form-label__role Роль пользователя
            .select-container
              v-select.select(
                v-model="role",
                :options="roles",
                :clearable="false",
                :searchable="false"
              )
                template(v-slot:option="option")
                  span.select-option {{ option.label }}

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

        button.form-submit(type="submit", :disabled="errors") Добавить пользователя
        button.popup-close(@click.prevent="hidePopup()") &times;
</template>

<script>
export default {

  data() {
    return {
      showPopup: false,
      roles: [{ label: 'Администратор', code: 'admin' }, { label: 'Пользователь', code: 'user'}],
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
      phoneError: '',
      role: {label: 'Пользователь', code: 'user'},
    }
  },

  methods:{
    hidePopup() {
      this.showPopup = false
    },

    deleteUser(login) {
      this.$store.dispatch('DELETE_USER_ADMIN', login)
          .catch(err => {
            console.log('Error on deleting user: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },

    changeUserRole(user) {
      this.$store.dispatch('CHANGE_USER_ROLE', user)
          .catch(err => {
            console.log('Error on changing user role: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },

    checkForm() {
      this.checkName()
      this.checkSurname()
      this.checkMiddlename()
      this.checkLogin()
      this.checkPassword()
      this.checkPhone()
      if (!this.errors) {
        this.$store.dispatch('ADD_USER', {
          login: this.login,
          password: this.password,
          firstName: this.name,
          lastName: this.surname,
          midName: this.middlename,
          phone: this.phone
        })
            .then(resp => {
                  this.name = ''
                  this.nameError = ''
                  this.surname = ''
                  this.surnameError = ''
                  this.middlename = ''
                  this.middlenameError = ''
                  this.login = ''
                  this.loginError = ''
                  this.password = ''
                  this.passwordError = ''
                  this.passwordFocus = false
                  this.passwordShow = false
                  this.passwordRepeat = ''
                  this.passwordRepeatError = ''
                  this.passwordRepeatFocus = false
                  this.passwordRepeatShow = false
                  this.passwordsMatch = false
                  this.phone = ''
                  this.phoneError = ''
                  this.role = {label: 'Пользователь', code: 'user'}
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
  },

  computed: {
    users() {
      return this.$store.getters.users
    },

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
    this.$store.dispatch('LOAD_USERS').catch(err => {
      console.log("Users loader rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          { msg: `Ошибка при загрузке пользователей: ${err.message}`, err: true }
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })
  }

}
</script>

<style lang="sass" scoped>
@import "../assets/sass/vars"

.admin
  .users
    &-container
      flex-basis: 1300px
      padding: 30px 35px
      background-color: $c-light
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)

    &-title
      font-weight: 500
      font-size: 24px
      line-height: 28px
      margin-bottom: 40px

    &-table
      width: 100%
      margin-bottom: 17px

      &__header
        border-bottom: 1px solid lighten($c-dark, 40)

        th
          padding-bottom: 15px
          font-size: 12px
          font-weight: normal
          color: lighten($c-dark, 40)
          text-align: left

      .login
        width: 170px

      .name
        width: 350px

      .phone
        width: 200px

      .role
        width: 260px

      .delete
        width: 110px

      &__line
        td
          padding: 10px 14px 10px 0px
          border-bottom: 1px solid $c-middle
          text-align: left
          font-size: 16px

      .login
        font-weight: bold

      .role

        .select
          width: 150px
          background-color: $c-light
          font-size: 14px
          &-container
            margin-bottom: 0

      .delete
        padding-right: 0
        .btn
          width: 100%
          padding: 10px
          font-size: 13px
          font-weight: 500

      .form
        &-block
          &_error
            padding-bottom: 30px

        &-error
          width: 100%
          text-align: center
          left: 50%
          transform: translateX(-50%)
          bottom: 5px
          top: auto

    &-btn
      display: flex
      justify-content: center
      align-items: center
      width: 33px
      height: 33px
      border: 2px solid $c-dark
      border-radius: 50%
      font-weight: 500
      font-size: 18px
      margin: 0 auto 25px auto
      cursor: pointer
      transition: 0.2s
      &:hover
        transform: scale(1.3)

    &-bottom
      display: flex
      justify-content: space-between
      align-items: flex-end

      .form-block
        flex-basis: 300px
        margin-bottom: 0

      .form-submit
        flex-basis: 220px
        padding: 20px 0

.overlay
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  min-height: 100vh
  background-color: rgba(#000, 0.5)
  position: fixed
  top: 0
  left: 0

  .popup
    width: 700px
    padding: 60px 45px 45px 45px
    background-color: $c-bg
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.35)
    margin: 0 auto
    position: relative

    .form
      &-title
        font-weight: bold
        font-size: 24px
        text-align: center
        text-transform: uppercase
        margin-bottom: 50px

      &-inputs
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        margin-bottom: 45px

      &-block
        flex-basis: 262px
        margin-right: 80px
        margin-bottom: 28px

        &:nth-child(2n)
          margin-right: 0

        &_error
          margin-bottom: 50px

        &_last
          margin-bottom: 0

        .select
          width: 262px
          &-container
            margin-bottom: 0

      &-label
        &__role
          margin-bottom: 3px

      &-submit
        width: 262px
        margin: 0 auto

    &-close
      font-size: 38px
      font-weight: 100
      color: $c-dark
      position: absolute
      top: 5px
      right: 18px
</style>