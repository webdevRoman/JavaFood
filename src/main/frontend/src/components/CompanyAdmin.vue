<template lang="pug">
  .admin-main.admin-companyInfo
    .companyInfo-container
      .companyInfo-title О компании

      .form-inputs

        .form-inputs__half

          .form-block(:class="{'form-block_error': descrError != ''}")
            label.form-label(for="company-descr") Описание
            textarea.form-textarea(
              id="company-descr",
              v-model.trim="descr",
              @focusout="checkDescr()")
            //- .form-error(v-if="descrError != ''") {{ descrError }}


        .form-inputs__half

          .form-block(:class="{'form-block_error': descrError != ''}")
            label.form-label(for="signup-phone") Телефон
            input.form-textarea(
              type="text", id="signup-phone",
              v-model.trim="phone",
              v-mask="'+7 (###) ###-##-##'",
              @focusout="checkPhone()"
            )
            //- .form-error(v-if="phoneError != ''") {{ phoneError }}

          .form-block(:class="{'form-block_error': descrError != ''}")
            label.form-label(for="company-phone") Email
            input.form-textarea(
              id="company-phone",
              v-model.trim="descr",
              @focusout="checkDescr()")
            //- .form-error(v-if="descrError != ''") {{ descrError }}

          .form-block.form-block_last(:class="{'form-block_error': descrError != ''}")
            label.form-label(for="company-phone") Адрес
            input.form-textarea(
              id="company-phone",
              v-model.trim="descr",
              @focusout="checkDescr()")
            //- .form-error(v-if="descrError != ''") {{ descrError }}

      button.form-submit(type="submit", :disabled="errors") Сохранить изменения
        
</template>

<script>
export default {

  data() {
    return {
      descr: '',
      phone: '',
      email: '',
      address: ''
    }
  },


  computed: {
    companyDescr() {
      return this.$store.getters.companyDescr
    },
    companyPhone(){
      return this.$store.getters.companyPhone
    },
    companyEmail() {
      return this.$store.getters.companyEmail
    },
    companyAddress() {
      return this.$store.getters.companyAddress
    }
  },

  created() {
    this.$store.dispatch('LOAD_COMPANY')
    .then(() => {
      this.deskr = this.companyDescr,
      this.phone = this.companyPhone,
      this.email = this.companyEmail,
      this.address = this.companyAddress
    })
    .catch(err => {
      console.log("Orders loader rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          { msg: `Ошибка при загрузке информации о компании: ${err.message}`, err: true }
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.admin

  .companyInfo

    &-container
      flex-basis: 1300px
      padding: 30px 35px

    &-title
      font-weight: 500
      font-size: 24px
      line-height: 28px
      margin-bottom: 40px

  .form
    &-inputs
      display: flex
      align-items: stretch
      width: 100%
      justify-content: space-between

      &__half
        flex-basis: 650px
        display: flex
        flex-direction: column
        justify-content: space-between

        &:first-child
          .form-block
            flex-basis: 100%
          .form-textarea
            height: 100%

        &:last-child
          flex-basis: 450px
          .form-textarea
            min-height: 60px

      // &__descr
      //   flex-basis: 200px
      //   display: flex
      //   width: 650px
      //   height: 290px
      //   flex-direction: column
      //   justify-content: space-between

      // &__contacts
      //   flex-basis: 20px
      //   display: flex
      //   width: 450px
      //   height: 60px
      //   flex-direction: column
      //   justify-content: space-between

    &-block
      margin-right: 0
      margin-bottom: 20px
      &_last
        margin-bottom: 0
      &__line
        justify-content: space-between
        .form-block
          flex-basis: 100px

      .company-descr
        flex-basis: 100px

    &-submit
      margin-right: 0
      margin-top: 80px
      width: 262px


</style>