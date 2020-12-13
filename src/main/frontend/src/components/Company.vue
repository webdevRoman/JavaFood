<template lang="pug">
  .company
    .container.company-info

      .company-text
        .company-text__descr {{ companyDescr }}

        .company-text__contacts
          .company-text__contact
            span.company-text__contact_bold Телефон:
            | {{ companyPhone }}
          .company-text__contact
            span.company-text__contact_bold E-mail:
            | {{ companyEmail }}
          .company-text__contact
            span.company-text__contact_bold Адрес:
            | {{ companyAddress }}

      .company-img
        img(src="../assets/img/company-mid.jpg", alt="Dish image")
</template>

<script>
export default {
  computed: {
    companyDescr() {
      return this.$store.getters.companyDescr
    },
    companyPhone() {
      return this.$store.getters.companyPhone
    },
    companyEmail() {
      return this.$store.getters.companyEmail
    },
    companyAddress() {
      return this.$store.getters.companyAddress
    },
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.company
  &-info
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 100px

  &-text
    flex-basis: 458px
    color: $c-dark

    &__descr
      font-size: 18px
      line-height: 25px
      margin-bottom: 70px
    &__contact
      font-size: 14px
      margin-bottom: 20px
      &_bold
        font-weight: bold
        margin-right: 10px

  &-img
    flex-basis: 458px
</style>