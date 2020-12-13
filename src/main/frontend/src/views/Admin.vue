<template lang="pug">
  .admin
    Sidebar(@changeView="changeView")

    DishesAdmin(v-if="chosenSection == 'dishes'")
    Orders(v-if="chosenSection == 'orders'")
    CompanyAdmin(v-if="chosenSection == 'companyInfo'") 
    Users(v-if="chosenSection == 'users'")   


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
import Sidebar from '../components/Sidebar'
import DishesAdmin from '../components/DishesAdmin'
import Orders from '../components/Orders'
import CompanyAdmin from '../components/CompanyAdmin'
import Users from '../components/Users'

export default {

  data() {
    return {
      chosenSection: 'dishes',
     
      inputDate: '',
      calendarDate: {selectedDate: ''},
      selectedMonth: 'Выберите месяц',
      selectedRole: '',
      roles: ['Пользователь', 'Администратор'],
      selectedStatus: '',
      statuses: ['Не подтвержден', 'Подтвержден'],
      allLimit: '',
      showPopup: false,
      name: '',
      nameError: '',
      surname: '',
      surnameError: '',
      middlename: '',
      middlenameError: '',
      email: '',
      emailError: '',
      // password: '',
      // passwordError: '',
      // passwordFocus: false,
      // passwordShow: false,
      role: 'Пользователь',
      limit: '',
      limitError: ''
    }
  },

  methods: {
    changeView(viewName) {
      this.chosenSection = viewName
    },

    chooseUsersSection() {
      this.chosenSection = 'users'
      this.$store.dispatch('LOAD_USERS')
          .catch(err => {
            console.log('Error on loading users: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },


    checkInput() {
      const input = document.getElementById('orders-date')
      if (input.value.length == 10) {
        let inputArr = input.value.split('.')
        let endDate = new Date()
        let startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)
        if (parseInt(inputArr[2]) < startDate.getFullYear())
          inputArr[2] = startDate.getFullYear()
        if (parseInt(inputArr[2]) > endDate.getFullYear())
          inputArr[2] = endDate.getFullYear()
        if (parseInt(inputArr[1]) < startDate.getMonth() + 1)
          inputArr[1] = startDate.getMonth() + 1
        if (parseInt(inputArr[1]) > endDate.getMonth() + 1)
          inputArr[1] = endDate.getMonth() + 1
        if (inputArr[1].toString().length < 2)
          inputArr[1] = '0' + inputArr[1].toString()
        if (parseInt(inputArr[0]) < startDate.getDate())
          inputArr[0] = startDate.getDate()
        if (parseInt(inputArr[0]) > endDate.getDate())
          inputArr[0] = endDate.getDate()
        if (inputArr[0].toString().length < 2)
          inputArr[0] = '0' + inputArr[0].toString()
        input.value = inputArr.join('.')
        this.calendarDate.selectedDate = this.formatDateCalendar(input.value)
      } else
        this.calendarDate.selectedDate = ''
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



    checkInputs(user) {
      const startInput = document.getElementById(`account-date-start-${user.id}`)
      const endInput = document.getElementById(`account-date-end-${user.id}`)
      if (startInput.value.length == 10) {
        let startInputArr = startInput.value.split('.')
        let date = new Date()
        if (parseInt(startInputArr[2]) < date.getFullYear())
          startInputArr[2] = date.getFullYear()
        date.setFullYear(startInputArr[2])
        if (parseInt(startInputArr[1]) < date.getMonth() + 1) {
          startInputArr[1] = date.getMonth() + 1
          if (startInputArr[1].toString().length < 2)
            startInputArr[1] = '0' + startInputArr[1].toString()
        }
        if (parseInt(startInputArr[1]) > 12)
          startInputArr[1] = 12
        date.setMonth(parseInt(startInputArr[1]) - 1)
        const lastDay = new Date(parseInt(startInputArr[2]), parseInt(startInputArr[1]), 0)
        if (parseInt(startInputArr[0]) < date.getDate() + 1) {
          startInputArr[0] = date.getDate() + 1
          if (startInputArr[0].toString().length < 2)
            startInputArr[0] = '0' + startInputArr[0].toString()
        }
        if (parseInt(startInputArr[0]) > lastDay.getDate())
          startInputArr[0] = lastDay.getDate()
        date.setDate(parseInt(startInputArr[0]))
        startInput.value = startInputArr.join('.')
        user.calendarDates.dateRange.start.date = this.formatDateCalendar(startInput.value)
      } else {
        user.inputsDates.start = endInput.value
        user.calendarDates.dateRange.start.date = this.formatDateCalendar(endInput.value)
        user.inputsDates.end = ''
        user.calendarDates.dateRange.end.date = false
        endInput.value = ''
        // user.calendarDates.dateRange.start.date = false
        // user.inputsDates.start = ''
      }
      if (endInput.value.length == 10) {
        let endInputArr = endInput.value.split('.')
        let date = new Date()
        if (parseInt(endInputArr[2]) < date.getFullYear())
          endInputArr[2] = date.getFullYear()
        date.setFullYear(endInputArr[2])
        if (parseInt(endInputArr[1]) < date.getMonth() + 1) {
          endInputArr[1] = date.getMonth() + 1
          if (endInputArr[1].toString().length < 2)
            endInputArr[1] = '0' + endInputArr[1].toString()
        }
        if (parseInt(endInputArr[1]) > 12)
          endInputArr[1] = 12
        date.setMonth(parseInt(endInputArr[1]) - 1)
        const lastDay = new Date(parseInt(endInputArr[2]), parseInt(endInputArr[1]), 0)
        if (parseInt(endInputArr[0]) < date.getDate() + 1) {
          endInputArr[0] = date.getDate() + 1
          if (endInputArr[0].toString().length < 2)
            endInputArr[0] = '0' + endInputArr[0].toString()
        }
        if (parseInt(endInputArr[0]) > lastDay.getDate())
          endInputArr[0] = lastDay.getDate()
        date.setDate(parseInt(endInputArr[0]))
        endInput.value = endInputArr.join('.')
        user.calendarDates.dateRange.end.date = this.formatDateCalendar(endInput.value)
      } else {
        user.calendarDates.dateRange.end.date = false
        user.inputsDates.end = ''
      }

      if (startInput.value.length == 10 && endInput.value.length == 10) {
        const startDateArr = startInput.value.split('.')
        const endDateArr = endInput.value.split('.')
        if (parseInt(startDateArr[2]) > parseInt(endDateArr[2])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates(user)
        } else if (parseInt(startDateArr[1]) > parseInt(endDateArr[1])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates(user)
        } else if (parseInt(startDateArr[0]) > parseInt(endDateArr[0])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates(user)
        }
      }
    },
    swapDates(user) {
      const inputsTemp = user.inputsDates.start
      user.inputsDates.start = user.inputsDates.end
      user.inputsDates.end = inputsTemp
      const calendarTemp = user.calendarDates.dateRange.start.date
      user.calendarDates.dateRange.start.date = user.calendarDates.dateRange.end.date
      user.calendarDates.dateRange.end.date = calendarTemp
    },

    deleteUser(id) {
      this.$store.dispatch('DELETE_USER', id)
          .catch(err => {
            console.log('Error on deleting user: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
            }, 5000)
          })
    },

    getTodayDate() {
      const date = new Date()
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    },
    formatDateInputs(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[2].length < 2)
        dateArr[2] = '0' + dateArr[2]
      if (dateArr[1].length < 2)
        dateArr[1] = '0' + dateArr[1]
      return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
    },
    formatDateCalendar(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[0].length == 2 && dateArr[0][0] == '0')
        dateArr[0] = dateArr[0][1]
      if (dateArr[1].length == 2 && dateArr[1][0] == '0')
        dateArr[1] = dateArr[1][1]
      return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
    },
    formatDateRequest(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[1].length == 1)
        dateArr[1] = '0' + dateArr[1]
      if (dateArr[2].length == 1)
        dateArr[2] = '0' + dateArr[2]
      return dateArr.join('.')
    },

    // saveChanges() {
    //   this.$store.dispatch('SAVE_CHANGES')
    //   // .then(resp => {
    //   //   this.$store.dispatch('SET_NOTIFICATION', { msg: 'Изменения сохранены', err: false })
    //   //   setTimeout(() => {
    //   //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    //   //   }, 5000)
    //   // },
    //   // err => {
    //   //   console.log('Error on saving changes in admin panel: ' + err)
    //   //   this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
    //   //   setTimeout(() => {
    //   //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    //   //   }, 5000)
    //   // })
    // },

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

    // checkPassword() {
    //   this.$store.dispatch('CHECK_PASSWORD', this.password)
    //   .then(
    //     result => {
    //       if (result == 'empty')
    //         this.passwordError = 'Заполните пароль'
    //       else if (result == 'short')
    //         this.passwordError = 'Пароль должен содержать не менее 6 символов'
    //       else if (result == 'long')
    //         this.passwordError = 'Пароль должен содержать не более 25 символов'
    //       else if (result == 'wrong')
    //         this.passwordError = 'Пароль должен состоять только из латинских букв и цифр'
    //       else
    //         this.passwordError = ''
    //     },
    //     error => console.log("Password checker rejected: " + error.message)
    //   )
    // },

   

    // togglePasswordShow() {
    //   const passwordInput = document.getElementById('account-password')
    //   if (passwordInput.type == 'password')
    //     passwordInput.type = 'text'
    //   else
    //     passwordInput.type = 'password'
    //   this.passwordShow = !this.passwordShow
    // },

    checkForm() {
      this.checkName()
      this.checkSurname()
      this.checkMiddlename()
      this.checkEmail()
      // this.checkPassword()
      this.checkLimit()
      if (!this.errors) {
        this.$store.dispatch('ADD_USER', {
          email: this.email,
          firstname: this.name,
          lastname: this.surname,
          midname: this.middlename,
          role: this.role == 'Администратор' ? 'admin' : 'user',
          limit: this.limit
        })
            .then(() => {
                  this.hidePopup()
                  this.$store.dispatch('SET_NOTIFICATION', {msg: 'Пользователь добавлен', err: false})
                  setTimeout(() => {
                    this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
                  }, 5000)
                },
                err => {
                  if (err == 'email') {
                    this.$store.dispatch('SET_ERROR', {type: 'email', msg: 'reserved'})
                    this.emailError = 'Данная почта уже занята'
                  } else {
                    console.log('Error on adding user: ' + err)
                    this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
                    setTimeout(() => {
                      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
                    }, 5000)
                  }
                })
      }
    },

    hidePopup() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.name = ''
      this.nameError = ''
      this.surname = ''
      this.surnameError = ''
      this.middlename = ''
      this.middlenameError = ''
      this.email = ''
      this.emailError = ''
      this.password = ''
      this.passwordError = ''
      this.passwordFocus = false
      this.passwordShow = false
      this.role = 'Пользователь'
      this.limit = ''
      this.limitError = '',
          this.showPopup = false
    },

    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
    }
  },

  computed: {
    
    users() {
      return this.$store.getters.users
    },

    errors() {
      const errors = this.$store.getters.errors
      // if (errors.email != undefined && errors.email != 'wrong' || errors.password != undefined || errors.name != undefined || errors.surname != undefined || errors.middlename != undefined || this.limit == '')
      if (errors.email != undefined && errors.email != 'wrong' || errors.name != undefined || errors.surname != undefined || errors.middlename != undefined || this.limit == '')
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
    calendarDate: {
      handler(value) {
        value = {selectedDate: value.selectedDate}
        if (value.selectedDate == '')
          this.inputDate = ''
        else
          this.inputDate = this.formatDateInputs(value.selectedDate)
      },
      deep: true
    },
    
    // password(value) {
    //   if (value != '')
    //     this.passwordFocus = true
    //   else
    //     this.passwordFocus = false
    // }
  },

  components: {
    Sidebar,
    DishesAdmin,
    Orders,
    CompanyAdmin,
    Users
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.admin
  display: flex
  justify-content: space-between
  align-items: stretch
  width: 100%
  min-height: 100vh

  &-main
    flex-grow: 1
    min-height: 100vh
    padding: 80px 70px
   


  .docs
    &-container
      display: flex
      justify-content: center
      align-items: stretch

    &-block
      display: flex
      justify-content: space-between
      align-items: center
      flex-direction: column
      width: 360px
      padding: 35px 55px 60px 55px
      background-color: $c-light
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)

      &:first-child
        margin-right: 90px

      &__title
        font-weight: 500
        font-size: 24px
        line-height: 28px
        text-align: center
        margin-bottom: 80px

      .form-block
        margin-bottom: 75px

      .form-label, .form-input
        display: block
        width: 220px

      .form-submit
        width: 220px

      .select
        width: 220px

        &-container
          margin-bottom: 75px

  .account-form
    &__calendar
      display: none
      position: absolute
      top: calc(100% + 15px)
      left: 50%
      margin-left: -154px
      margin-bottom: 25px

      &_active
        display: block

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
          text-align: center

      .name
        width: 170px

      .email
        width: 140px
        text-align: center

      .role
        width: 140px

      .status
        width: 140px

      .limit
        width: 70px

      .account-form__block__checkbox
        width: 140px

      .account-form__block__calendar
        width: 210px

      .delete
        width: 110px

      &__line
        td
          padding: 14px 10px
          border-bottom: 1px solid $c-middle

        .name
          padding-left: 0
          font-weight: bold
          font-size: 13px

        .email
          font-size: 12px

        .select
          width: 125px
          background-color: $c-light
          font-size: 12px
          margin: 0 auto

        .limit
          position: relative

          .form-input
            text-align: center

        .limit.form
          &-block
            &_error
              padding-bottom: 47px

        .account-form__block__checkbox
          padding-right: 4px

          .form-label
            max-width: 140px
            font-weight: 500
            font-size: 12px
            color: $c-dark
            text-transform: none

          .account-form__checkbox
            position: absolute
            z-index: -1
            opacity: 0

          .account-form__checkbox + label
            position: relative
            padding: 0 0 0 26px
            cursor: pointer

          .account-form__checkbox + label:before
            content: ''
            position: absolute
            top: 50%
            left: 0
            margin-top: -11px
            width: 18px
            height: 18px
            border: 1px solid #2c3e50
            background: transparent
            transition: 0.1s

          .account-form__checkbox + label:after
            content: ''
            position: absolute
            top: 50%
            left: 4px
            width: 14px
            height: 14px
            margin-top: -8px
            background: url(../assets/img/tick.svg) center no-repeat
            background-size: contain
            opacity: 0
            transition: 0.1s

          .account-form__checkbox:checked + label:after
            opacity: 1

          label.form-label__checkbox_active
            &:after
              opacity: 1

        .account-form__block__calendar
          padding-left: 4px

          .form-label
            font-size: 12px
            text-transform: none

          .inputs-container
            display: flex
            justify-content: space-between
            align-items: center

          .form-input
            width: 92px

          .account-form__separator
            width: 15px
            height: 2px
            background-color: $c-dark
            margin: 0 10px

        .delete
          padding-right: 0

          .btn
            width: 100%
            padding: 10px
            font-size: 13px
            font-weight: 500

        .select
          &-container
            margin-bottom: 0

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

        &__line
          display: flex
          align-items: center

          .form-input
            width: 170px

          span
            font-weight: 500
            font-size: 18px
            margin-left: 7px

      .form-submit
        flex-basis: 220px
        padding: 20px 0

.overlay
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  min-height: 100vh
  // change!
  background-color: rgba(0, 0, 0, 0.5)
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
        // &-line
        //   display: flex
        //   justify-content: space-between
        // &__item
        //   &:first-child
        //     margin-right: 20px
        //     .form-label
        //       margin-bottom: 10px
        &__line
          display: flex
          align-items: center
          // .form-input
          //   width: 85px
          span
            font-weight: 500
            font-size: 18px
            margin-left: 10px

        .select
          width: 262px
          // font-size: 12px
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