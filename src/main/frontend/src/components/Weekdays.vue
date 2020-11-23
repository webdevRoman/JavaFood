<template lang="pug">
.weekdays
  button.weekdays-nav.weekdays-prev(@click.prevent="offset--", :disabled="offset == 0")
    .weekdays-arrow__prev
  button.weekdays-nav.weekdays-next(@click.prevent="offset++", :disabled="offset == 2 && screenWidth >= 768 || offset == 3")
    .weekdays-arrow__next
  .container
    .weekdays-container(:class="{'weekdays-container_1': offset == 1, 'weekdays-container_2': offset == 2, 'weekdays-container_3': offset == 3}")
      button.weekday(v-for="weekday in weekdays", :class="{'weekday_active': weekday.fullDate == currentDate}", @click.prevent="chooseDate(weekday.fullDate)")
        .weekday-tick
          img(src="../assets/img/tick-success.svg", alt="Tick")
        .weekday-title {{ weekday.day }}
        .weekday-date {{ weekday.date }} {{ weekday.month }}
</template>

<script>
export default {
  data() {
    return {
      offset: 0
    }
  },
  methods: {
    formatDate(date) {
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      if (day.toString().length < 2)
        day = '0' + day.toString()
      if (month.toString().length < 2)
        month = '0' + month.toString()
      return `${year.toString()}.${month}.${day}`
    },
    chooseDate(date) {
      this.$store.dispatch('LOAD_DISHES', { date: date, category: 'all', page: 1 })
      .then(resp => {
        this.$store.dispatch('SET_DATE', date)
        this.$store.dispatch('LOAD_FAVOURITES', date)
        .catch(err => {
          console.log("Error on loading favourites: " + err.message)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        })
        this.$store.dispatch('LOAD_CART', date)
        .catch(err => {
          console.log("Error on loading cart " + err.message)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        })
      },
      err => {
        this.categories = []
        this.$store.dispatch('SET_DATE', date)
        this.$store.dispatch('LOAD_FAVOURITES', date)
        .catch(err => {
          console.log("Error on loading favourites: " + err.message)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        })
        console.log("Error on loading dishes: " + err.message)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    checkDate() {
      const date = new Date()
      let nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + 1)
      const curDateStr = this.currentDate
      const nextDateStr = this.formatDate(nextDate)
      const nextDateArr = nextDateStr.split('.')
      const curDateArr = curDateStr.split('.')
      const firstDateArr = this.weekdays[0].fullDate.split('.')
      if (date.getHours() >= 16 && (nextDateArr[0] > firstDateArr[0] || nextDateArr[1] > firstDateArr[1] || nextDateArr[2] > firstDateArr[2])) {
        this.$store.dispatch('SET_WEEKDAYS', nextDate)
        if (nextDateArr[0] > curDateArr[0] || nextDateArr[1] > curDateArr[1] || nextDateArr[2] > curDateArr[2]) {
          this.$store.dispatch('LOAD_DISHES', { date: nextDateStr, category: 'all', page: 1 })
          .catch(err => {
            console.log("Error on loading dishes: " + err.message)
            this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
            }, 5000)
          })
          this.$store.dispatch('LOAD_FAVOURITES', nextDateStr)
          .catch(err => {
            console.log("Error on loading favourites: " + err.message)
            this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
            }, 5000)
          })
          this.$store.dispatch('LOAD_CART', nextDateStr)
          .catch(err => {
            console.log("Error on loading cart " + err.message)
            this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
            }, 5000)
          })
          this.$store.dispatch('SET_DATE', nextDateStr)
        }
      }
    }
  },
  computed: {
    currentDate() {
      return this.$store.getters.date
    },
    weekdays() {
      return this.$store.getters.weekdays
    },
    screenWidth() {
      return document.body.clientWidth
    }
  },
  created() {
    const date = new Date()
    const currentDate = this.formatDate(date)
    this.$store.dispatch('SET_WEEKDAYS', date)
    this.$store.dispatch('SET_DATE', currentDate)
    this.$store.dispatch('LOAD_DISHES', { date: currentDate, category: 'all', page: 1 })
    .catch(err => {
      console.log("Error on loading dishes: " + err.message)
      this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      }, 5000)
    })
    this.$store.dispatch('LOAD_FAVOURITES', currentDate)
    .catch(err => {
      console.log("Error on loading favourites: " + err.message)
      this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      }, 5000)
    })
    this.$store.dispatch('LOAD_CART', currentDate)
    .catch(err => {
      console.log("Error on loading cart " + err.message)
      this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      }, 5000)
    })
    this.checkDate()
    window.setInterval(this.checkDate, 300000)
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.weekdays
  border-top: 4px solid $c-middle
  border-bottom: 4px solid $c-middle
  margin: 50px 0
  &-nav
    display: none
  &-container
    display: flex
    justify-content: space-between
    align-items: stretch
    .weekday
      flex-basis: 12.5%
      padding: 15px 0 45px 0
      border-left: 2px solid $c-middle
      border-right: 2px solid $c-middle
      transition: 0.2s
      &:first-child
        border-left: 4px solid $c-middle
      &:last-child
        border-right: 4px solid $c-middle
      &-tick
        opacity: 1
        visibility: hidden
        width: 20px
        margin: 0 auto 10px auto
      &-title
        font-weight: bold
        font-size: 15px
        text-transform: uppercase
        margin-bottom: 13px
        transition: 0.2s
      &-date
        font-size: 13px
        text-transform: uppercase
        transition: 0.2s
      &_active
        background-color: $c-dark
        border-right: 2px solid $c-dark
        border-left: 2px solid $c-dark
        .weekday-title, .weekday-date
          color: $c-light
        &:first-child
          border-left: 4px solid $c-dark
        &:last-child
          border-right: 4px solid $c-dark
      &:hover
        background-color: $c-dark
        border-right: 2px solid $c-dark
        border-left: 2px solid $c-dark
        .weekday-title, .weekday-date
          color: $c-light

@media(max-width: 1200px)
  html
    .weekdays
      margin: 35px 0
      .container
        .weekday
          padding: 15px 0 35px 0
          &-tick
            width: 17px
            margin: 0 auto 6px auto
          &-title
            font-size: 13px
          &-date
            font-size: 12px

@media(max-width: 992px)
  html
    .weekdays
      position: relative
      &-prev
        left: 25px
      &-next
        right: 25px
      &-nav
        display: flex
        justify-content: center
        align-items: center
        width: 26px
        height: 26px
        border: 2px solid $c-dark
        border-radius: 50%
        position: absolute
        top: 50%
        transform: translateY(-50%)
        .weekdays-arrow__prev, .weekdays-arrow__next
          width: 10px
          height: 10px
          border-top: 2px solid $c-dark
          border-right: 2px solid $c-dark
        .weekdays-arrow__prev
          transform: rotate(225deg)
          margin-right: -3px
        .weekdays-arrow__next
          transform: rotate(45deg)
          margin-right: 3px
        &[disabled]
          border: 2px solid lighten($c-dark, 40)
          .weekdays-arrow__prev, .weekdays-arrow__next
            border-top: 2px solid lighten($c-dark, 40)
            border-right: 2px solid lighten($c-dark, 40)
      .container
        width: 592px
        overflow: hidden
        .weekday
          flex-basis: 148px
          padding: 20px 0 45px 0
          &-tick
            width: 22px
            margin-bottom: 12px
          &-title
            font-size: 15px
            margin-bottom: 20px
          &-date
            font-size: 13px
      &-container
        justify-content: flex-start
        margin-left: 0
        margin-right: -592px
        transition: 0.2s
        &_1
          margin-left: -296px
          margin-right: -296px
        &_2
          margin-left: -592px
          margin-right: 0

@media(max-width: 768px)
  html
    .weekdays
      margin: 0 0 35px 0
      .container
        width: 296px
      &-container
        margin-left: 0
        margin-right: -888px
        &_1
          margin-left: -296px
          margin-right: -592px
        &_2
          margin-left: -592px
          margin-right: -296px
        &_3
          margin-left: -888px
          margin-right: 0

@media(max-width: 576px)
  html
    .weekdays
      margin-bottom: 20px
      &-prev
        left: 8px
      &-next
        right: 8px
      .container
        width: 240px
        .weekday
          flex-basis: 120px
          padding: 10px 0 35px 0
          &-tick
            width: 18px
          &-title
            font-size: 13px
            margin-bottom: 15px
          &-date
            font-size: 12px
      &-container
        margin-left: 0
        margin-right: -720px
        &_1
          margin-left: -240px
          margin-right: -480px
        &_2
          margin-left: -480px
          margin-right: -240px
        &_3
          margin-left: -720px
          margin-right: 0
</style>