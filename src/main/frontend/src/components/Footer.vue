<template lang="pug">
  footer.footer

    .container

      .footer-top

        .footer-contacts
          .contacts-item
            .contacts-item__title Доставка:
            a.contacts-item__contact(href="tel:+73822214111") {{ companyPhone }}
          .contacts-item
            .contacts-item__title Служба поддержки:
            a.contacts-item__contact(href="mailto:mail@edatomsk.ru") {{ companyEmail }}

        .logo
          | JavaF
          img.logo__img(src="../assets/img/loader-light.svg", alt="OO")
          | d

      .footer-bot
        a.footer-bot__policy(href="#") Политика конфиденциальности

    button.btn-up(@click.prevent="scrollToTop()")
      img.btn-up__arrow(src="../assets/img/arrow-up.svg", alt="Arrow image")
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },

  computed: {
    companyPhone() {
      return this.$store.getters.companyPhone
    },
    companyEmail() {
      return this.$store.getters.companyEmail
    }
  }
}

window.addEventListener('scroll', () => {
  const btn = document.querySelector('.btn-up')
  if (window.pageYOffset > document.documentElement.clientHeight / 2 && btn != undefined) {
    btn.style.display = 'flex'
  } else if (btn != undefined) {
    btn.style.display = 'none'
  }
})
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.footer
  padding: 35px 0 20px 0
  background-color: $c-dark
  color: $c-light

  &-top
    display: flex
    justify-content: space-between
    padding-bottom: 35px
    border-bottom: 1px solid $c-middle

    .logo
      font-size: 36px
      color: #fafafa
      margin: 0
      letter-spacing: 3px

      &__img
        width: 40px
        margin-right: 3px

  &-contacts
    flex-basis: 584px
    display: flex
    justify-content: space-between
    align-items: center

    .contacts-item
      flex-basis: 262px
      margin-right: 30px

      &__title
        font-size: 15px
        margin-bottom: 12px

      &__contact
        font-weight: 500
        font-size: 18px
        color: $c-light
        transition: 0.2s

        &:hover
          color: $c-active

  &-bot
    padding-top: 12px

    &__policy
      font-size: 13px
      color: $c-light
      text-decoration: underline
      transition: 0.2s

      &:hover
        color: $c-active

.btn-up
  position: fixed
  bottom: 30px
  right: 55px
  display: none
  justify-content: center
  align-items: center
  width: 45px
  height: 45px
  padding: 7px
  border-radius: 3px
  background-color: $c-middle
  transition: 0.2s

  &:hover
    transform: rotate(45deg)

    .btn-up__arrow
      transform: rotate(-45deg)

  &__arrow
    width: auto
    height: 100%
    transition: 0.2s

@media(max-width: 992px)
  html
    .footer
      &-top
        .logo
        font-size: 32px

        &__img
          width: 35px

      &-contacts
        flex-basis: 380px

        .contacts-item
          flex-basis: 155px

          &__contact
            &:hover
              color: $c-light

      &-bot
        &__policy
          &:hover
            color: $c-light

    .btn-up
      right: 30px
      width: 40px
      height: 40px
      padding: 6px

      &:hover
        transform: rotate(0)

        .btn-up__arrow
          transform: rotate(0)

@media(max-width: 768px)
  html
    .footer
      &-top
        .logo
        display: none

      &-contacts
        flex-basis: 100%

        .contacts-item
          flex-basis: 250px
          margin-right: 40px

          &:last-child
            margin-right: 0

    .btn-up
      right: 15px
      bottom: 15px

@media(max-width: 576px)
  html
    .footer
      padding: 15px 0

      &-top
        padding-bottom: 30px

      &-contacts
        flex-basis: 100%
        flex-wrap: wrap

        .contacts-item
          flex-basis: 100%
          margin-right: 0
          margin-bottom: 30px

          &:last-child
            margin-bottom: 0

          &__title
            font-size: 13px
            margin-bottom: 5px

          &__contact
            font-size: 15px

    .btn-up
      width: 35px
      height: 35px
      padding: 5px
</style>