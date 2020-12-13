<template lang="pug">
  .admin-main.admin-companyInfo
    .companyInfo-container
      .companyInfo-title О компании

      form.form(action="#", @submit.prevent="checkForm()")
        .form-inputs

          .form-inputs__half

            .form-block(:class="{'form-block_error': descrError != ''}")
              label.form-label(for="company-descr") Описание
              textarea.form-textarea(
                id="company-descr",
                v-model.trim="descr",
                @focusout="checkDescr()")
              .form-error(v-if="descrError != ''") {{ descrError }}


          .form-inputs__half

            .form-block(:class="{'form-block_error': phoneError != ''}")
              label.form-label(for="company-phone") Телефон
              input.form-textarea(
                type="text", id="company-phone",
                v-model.trim="phone",
                v-mask="'+7 (###) ###-##-##'",
                @focusout="checkPhone()"
              )
              .form-error(v-if="phoneError != ''") {{ phoneError }}

            .form-block(:class="{'form-block_error': emailError != ''}")
              label.form-label(for="company-email") Email
              input.form-textarea(
                id="company-email",
                v-model.trim="email",
                @focusout="checkEmail()")
              .form-error(v-if="emailError != ''") {{ emailError }}

            .form-block.form-block_last(:class="{'form-block_error': addressError != ''}")
              label.form-label(for="company-address") Адрес
              input.form-textarea(
                id="company-address",
                v-model.trim="address",
                @focusout="checkAddress()")
              .form-error(v-if="addressError != ''") {{ addressError }}

        button.form-submit(type="submit", :disabled="errors") Сохранить изменения
</template>

<script>
export default {

  data() {
    return {
      descr: '',
      descrError: '',
      phone: '',
      phoneError: '',
      email: '',
      emailError: '',
      address: '',
      addressError: ''
    }
  },

  methods: {
    checkForm() {
      this.checkDescr()
      this.checkPhone()
      this.checkEmail()
      this.checkAddress()
      if (!this.errors && (
          this.descr !== this.companyDescr ||
          this.email !== this.companyEmail ||
          this.phone !== this.companyPhone ||
          this.address !== this.companyAddress
      )) {
        this.$store.dispatch('UPDATE_COMPANY', {
          description: this.descr,
          phone: this.phone,
          email: this.email,
          address: this.address
        })
            .then(resp => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: 'Информация о компании изменена.', err: false})
              setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                  5000)
            })
            .catch(err => {
              console.log('Error on updating company info: ' + err)
              this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
              setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                  5000)
            })
      }
    },

    checkDescr() {
      this.descrError = ''
      if (this.descr === '')
        this.descrError = 'Введите описание'
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

    checkEmail() {
      this.$store.dispatch('CHECK_EMAIL', this.email)
          .then(
              result => {
                if (result == 'empty')
                  this.emailError = 'Заполните e-mail'
                else if (result == 'long')
                  this.emailError = 'E-mail должен содержать не более 50 символов'
                else if (result == 'wrong')
                  this.emailError = 'Невалидный e-mail'
                else {
                  this.emailError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'email')
                }
              },
              error => console.log("Email checker rejected: " + error.message)
          )
    },

    checkAddress() {
      this.addressError = ''
      if (this.address === '')
        this.addressError = 'Введите адрес'
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
    },

    errors() {
      const errors = this.$store.getters.errors
      if (
          this.descrError != '' ||
          errors.phone != undefined ||
          errors.email != undefined ||
          this.addressError != ''
      )
        return true
      else
        return false
    }
  },

  created() {
    this.$store.dispatch('LOAD_COMPANY')
        .then(() => {
          this.descr = this.companyDescr
          this.phone = this.companyPhone
          this.email = this.companyEmail
          this.address = this.companyAddress
        })
        .catch(err => {
          console.log("Orders loader rejected: " + err.message)
          this.$store.dispatch(
              'SET_NOTIFICATION',
              {msg: `Ошибка при загрузке информации о компании: ${err.message}`, err: true}
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
          margin-right: 30px
          .form
            &-block
              flex-basis: 100%
            &-textarea
              height: 100%
            &-error
              top: calc(100% + 30px)

        &:last-child
          flex-basis: 450px
          .form
            &-textarea
              min-height: 60px
            &-block
              &_error
                margin-bottom: 50px
              &_last.form-block_error
                margin-bottom: 0

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