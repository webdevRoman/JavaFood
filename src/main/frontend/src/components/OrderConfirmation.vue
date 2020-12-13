<template lang="pug">
  .confirm

    button.confirm-close(@click.prevent="hideConfirm()") &times;

    form.form.confirm-form(action="#", @submit.prevent="checkForm()")

      .title.confirm-title Оформление заказа

      .form-block.confirm-form__block.confirm-form__block_wide(:class="{'form-block_error': addressError != ''}")
        label.form-label(for="confirm-address") Адрес доставки
        input.form-input(type="text", id="confirm-address", v-model.trim="address", @focusout="checkAddress()")
        .form-error(v-if="addressError != ''") {{ addressError }}

      .form-block.confirm-form__block.confirm-form__block__calendar(
        :class="{'form-block_error': dateError != ''}"
      )
        label.form-label(@click.prevent="showCalendar()") Дата доставки
        input.form-input(
          type="text",
          id="confirm-date",
          v-mask="'##.##.####'",
          v-model.trim="date",
          @focus="showCalendar()",
          @focusout="checkDate()"
        )
        FunctionalCalendar.calendar.confirm-form__calendar(v-model="calendarDate", :configs="calendarConfig")
        .form-error(v-if="dateError != ''") {{ dateError }}

      .form-block.confirm-form__block(:class="{'form-block_error': timeError != ''}")
        label.form-label(for="confirm-time") Время доставки
        input.form-input(
          type="text",
          id="confirm-time",
          v-mask="'##:##'",
          v-model.trim="time",
          @focusout="checkTime()"
        )
        .form-error(v-if="timeError != ''") {{ timeError }}

      button.form-submit(type="submit", :disabled="errors") Оформить заказ
</template>

<script>
export default {

  data() {
    return {
      address: '',
      addressError: '',
      date: '',
      dateError: '',
      calendarDate: {},
      calendarConfig: {
        isDatePicker: true,
        dateFormat: 'yyyy.mm.dd',
        disabledDates: ['beforeToday'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonthNames: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        limits: this.getCalendarLimits()
      },
      time: '',
      timeError: ''
    }
  },

  methods: {
    hideConfirm() {
      const confirm = document.querySelector('.cart-overlay')
      confirm.style.display = 'none'
      this.address = ''
      this.time = ''
      const date = new Date()
      let dateStr = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
      this.calendarDate = {
        selectedDate: dateStr,
        dateRange: {
          end: '',
          start: ''
        }
      }
      this.date = this.formatDateInput(dateStr)
    },

    checkForm() {
      this.checkAddress()
      this.checkDate()
      this.checkTime()
      if (!this.errors || (this.address != '' && this.date != '' && this.time != '')) {
        this.$store.dispatch(
            'CONFIRM_ORDER',
            { address: this.address, deliveryTime: this.date + ' ' + this.time }
        )
            .then(resp => {
              this.hideConfirm()
              this.$store.dispatch('SET_NOTIFICATION', {msg: 'Заказ принят в обработку', err: false})
              setTimeout(() => {
                this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
              }, 5000)
            })
            .catch(err => {
              console.log('Error on confirming order: ' + err)
              this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
              setTimeout(() => {
                this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
              }, 5000)
            })
      }
    },

    checkAddress() {
      this.$store.dispatch('CHECK_ADDRESS', this.address)
          .then(
              result => {
                if (result == 'empty')
                  this.addressError = 'Заполните адрес'
                else {
                  this.addressError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'address')
                }
              },
              error => console.log("Address checker rejected: " + error.message)
          )
    },

    getCalendarLimits() {
      const date = new Date()
      return {
        min: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
        max: `${date.getFullYear()}.${date.getMonth() + 4}.${date.getDate()}`
      }
    },

    showCalendar() {
      const calendar = document.querySelector('.confirm-form__calendar')
      calendar.classList.add('confirm-form__calendar_active')
      this.hideCalendar()
    },

    hideCalendar() {
      const calendar = document.querySelector('.confirm-form__calendar')
      const self = this

      function hideOnClickOutside(e) {
        let a = e.target
        let parentsFlag = false
        while (a) {
          if (a == calendar) {
            parentsFlag = true
            break
          }
          a = a.parentNode
        }
        if (
            calendar.classList.contains('confirm-form__calendar_active')
            && !parentsFlag
            && !e.target.parentNode.classList.contains('confirm-form__block__calendar')
            && !e.target.classList.contains('confirm-form__block__calendar')
        ) {
          calendar.classList.remove('confirm-form__calendar_active')
          self.checkDate()
          document.removeEventListener('click', hideOnClickOutside)
        }
      }

      document.addEventListener('click', hideOnClickOutside)
    },

    checkDate() {
      this.dateError = ''
      this.$store.dispatch('CLEAR_ERRORS', 'date')
      const input = document.getElementById('confirm-date')
      if (input.value.length == 10) {
        let inputArr = input.value.split('.')
        let date = new Date()

        if (parseInt(inputArr[2]) < date.getFullYear())
          inputArr[2] = date.getFullYear()
        date.setFullYear(inputArr[2])

        if (inputArr[1].toString().length < 2)
          inputArr[1] = '0' + inputArr[1].toString()
        if (parseInt(inputArr[1]) > 12)
          inputArr[1] = 12
        date.setMonth(parseInt(inputArr[1]) - 1)

        const lastDay = new Date(parseInt(inputArr[2]), parseInt(inputArr[1]), 0)
        if (parseInt(inputArr[0]) < date.getDate())
          inputArr[0] = date.getDate()
        if (inputArr[0].toString().length < 2)
          inputArr[0] = '0' + inputArr[0].toString()
        if (parseInt(inputArr[0]) > lastDay.getDate())
          inputArr[0] = lastDay.getDate()
        date.setDate(parseInt(inputArr[0]))

        input.value = inputArr.join('.')
        this.calendarDate.selectedDate = this.formatDateCalendar(input.value)
      } else {
        this.calendarDate.selectedDate = ''
        this.$store.dispatch('SET_ERROR', {type: 'date', msg: 'wrong'})
        this.dateError = 'Дата доставки не выбрана'
      }
    },

    formatDateCalendar(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[0].length == 2 && dateArr[0][0] == '0')
        dateArr[0] = dateArr[0][1]
      if (dateArr[1].length == 2 && dateArr[1][0] == '0')
        dateArr[1] = dateArr[1][1]
      return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
    },

    formatDateInput(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[2].length < 2)
        dateArr[2] = '0' + dateArr[2]
      if (dateArr[1].length < 2)
        dateArr[1] = '0' + dateArr[1]
      return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
    },

    checkTime() {
      const input = document.getElementById('confirm-time')
      if (input.value.length == 5) {
        let inputArr = input.value.split(':')
        if (parseInt(inputArr[0]) > 24)
          inputArr[0] = '24'
        if (inputArr[0].toString().length < 2)
          inputArr[0] = '0' + inputArr[0].toString()
        if (parseInt(inputArr[1]) > 59)
          inputArr[1] = '59'
        if (inputArr[1].toString().length < 2)
          inputArr[1] = '0' + inputArr[1].toString()
        this.time = inputArr.join(':')
      }
      this.$store.dispatch('CHECK_TIME', this.time)
          .then(
              result => {
                if (result == 'empty')
                  this.timeError = 'Заполните время'
                else if (result == 'wrong')
                  this.timeError = 'Неверное время'
                else {
                  this.timeError = ''
                  this.$store.dispatch('CLEAR_ERRORS', 'time')
                }
              },
              error => console.log("Time checker rejected: " + error.message)
          )
    }
  },

  watch: {
    calendarDate: {
      handler(value) {
        value = {
          selectedDate: value.selectedDate,
          dateRange: {
            end: value.dateRange.end,
            start: value.dateRange.start
          }
        }
        if (!value.selectedDate)
          this.date = ''
        else
          this.date = this.formatDateInput(value.selectedDate)
      },
      deep: true
    }
  },

  beforeMount() {
    const date = new Date()
    let dateStr = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    this.calendarDate = {
      selectedDate: dateStr,
      dateRange: {
        end: '',
        start: ''
      }
    }
    this.date = this.formatDateInput(dateStr)
  },

  computed: {
    errors() {
      const errors = this.$store.getters.errors
      if (errors.address != undefined || errors.date != undefined || errors.time != undefined)
        return true
      else
        return false
    },
  }

}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.confirm
  position: relative
  padding: 20px
  width: 80vw
  height: 80vh
  display: flex
  justify-content: center
  align-items: center
  background-color: $c-bg
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.25)
  &-close
    position: absolute
    top: -10px
    right: -30px
    font-weight: 300
    font-size: 34px
    color: $c-dark
  &-title
    margin-bottom: 50px
    flex-basis: 100%
    text-align: center
  &-form
    display: flex
    justify-content: space-between
    align-items: center
    flex-wrap: wrap
    max-width: 602px
    &__block
      flex-basis: 262px
      margin-right: 0
      &_wide
        flex-basis: 602px
      &__calendar
        margin-right: 78px
    &__calendar
      display: none
      position: absolute
      top: calc(100% + 15px)
      left: 50%
      margin-left: -154px
      margin-bottom: 25px
      &_active
        display: block
</style>