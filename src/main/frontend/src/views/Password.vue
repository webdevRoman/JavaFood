<template lang="pug">
div
  .container_center.password-container(v-if="!isEmailSent")
    .logo
      img(src="../assets/img/logo.png", alt="Logo")
    .password
      .title.password-title Замена пароля
      form.form.password-form(action="#", @submit.prevent="checkForm()")
        .form-block(:class="{'form-block_error': emailError != ''}")
          label.form-label(for="password-email") Корпоративная почта SmartWorld
          input.form-input(type="text", id="password-email", placeholder="@smartworld.team", v-model.trim="email", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkEmail()")
          .form-error(v-if="emailError != ''") {{ emailError }}
        button.form-submit(type="submit", :disabled="errors") Подтвердить
  .container_center.signup-container(v-else)
    .logo
      img(src="../assets/img/logo.png", alt="Logo")
    .signup.container
      .title.signup-title Замена пароля
      .signup-info
        .signup-info__title Пожалуйста, проверьте почту
        .signup-info__descr На вашу почту отправлено письмо со ссылкой для подтверждения замены пароля
        //- button.signup-info__repeat(@click.prevent="sendLink()") Получить новую ссылку
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
      isEmailSent: false
    }
  },
  methods: {
    checkForm() {
      this.checkEmail()
      if (!this.errors) {
        this.$store.dispatch('SEND_EMAIL', { email: this.email })
        .then(resp => {
          this.isEmailSent = true
        },
        err => {
          console.log('Error on sending email: ' + err)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        })
      }
    },
    checkEmail() {
      const emailArr = this.email.split('@')
      if (this.email != '' && emailArr[1] == undefined)
        this.email = emailArr[0] + '@smartworld.team'
      this.$store.dispatch('CHECK_EMAIL', this.email)
      .then(
        result => {
          if (result == 'empty')
            this.emailError = 'Заполните e-mail'
          else if (result == 'long')
            this.emailError = 'E-mail должен содержать не более 50 символов'
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
    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    }
  },
  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (errors.email != undefined && errors.email != 'wrong')
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
      margin-bottom: 20px
    &__descr
      font-weight: 500
      font-size: 24px
      text-align: center
      margin-bottom: 50px
    &__repeat
      font-weight: 500
      font-size: 13px
      color: lighten($c-dark, 40)
      text-transform: uppercase
      text-decoration: underline
      text-align: center
      margin: 0 auto
      transition: 0.2s
      &:hover
        color: lighten($c-dark, 20)

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
        &__descr
          font-size: 22px

@media(max-width: 992px)
  html
    .signup
      &-info
        &__repeat
          &:hover
            color: lighten($c-dark, 40)

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
          margin-bottom: 10px
        &__descr
          font-size: 16px
          margin-bottom: 30px
        &__repeat
          font-size: 10px

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
        &__descr
          font-size: 13px
</style>