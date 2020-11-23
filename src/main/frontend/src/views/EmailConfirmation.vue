<template lang="pug">
.container_center.signup-container
  .logo
    img(src="../assets/img/logo.png", alt="Logo")
  .signup.container
    .title.signup-title Регистрация
    .signup-info
      .signup-info__title Пожалуйста, проверьте почту
      .signup-info__descr На вашу почту отправлено письмо со ссылкой для подтверждения регистрации
      button.signup-info__repeat(@click.prevent="sendLink()") Получить новую ссылку
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
  methods: {
    sendLink() {
      this.$store.dispatch('SEND_LINK')
      .then(resp => {
        this.$store.dispatch('SET_NOTIFICATION', { msg: 'Новая ссылка отправлена', err: false })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      },
      err => {
        console.log('Error on sending new link: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    }
  },
  computed: {
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