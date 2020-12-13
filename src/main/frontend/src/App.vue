<template lang="pug">
  #app
    router-view
</template>

<script>
import axios from 'axios'

export default {
  created() {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('AUTH_LOGOUT').then(
              resp => this.$router.push('/signin'),
              err => console.log('Error when logging out: ' + err)
          )
        }
        throw err;
      });
    });
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap')
@import "./assets/sass/vars"
@import "./assets/sass/reset"
@import "./assets/sass/media-common"

// Common
body, button, input, a
  color: $c-dark

.container
  width: 1140px
  margin: 0 auto
  &_center
    display: flex
    justify-content: center
    align-items: center
    padding: 30px 0
    min-height: 100vh
    max-width: 100vw

.logo
  display: flex
  justify-content: center
  align-items: center
  font-size: 48px
  text-align: center
  text-transform: uppercase
  letter-spacing: 10px
  margin: 0 auto
  &__img
    width: 60px
    margin-right: 10px

.title
  font-weight: bold
  font-size: 24px
  text-transform: uppercase

.btn
  width: 184px
  padding: 15px
  background-color: $c-dark
  border: 1px solid $c-dark
  font-size: 15px
  color: $c-light
  text-align: center
  transition: 0.2s
  &:hover
    background-color: lighten($c-dark, 10)
    border: 1px solid lighten($c-dark, 10)
  &[disabled]
    filter: opacity(50%)
    &:hover
      background-color: $c-dark
      color: $c-light

  &_o
    background-color: transparent
    color: $c-dark
    &:hover
      background-color: lighten($c-middle, 10)
    &[disabled]:hover
      background-color: transparent
      color: $c-dark

.form

  &-block
    margin-bottom: 65px
    position: relative
    transition: 0.2s
    
    &_last
      margin-bottom: 0

    &_disabled
      opacity: 0.5

      .form-label
        cursor: default
        &:hover
          color: lighten($c-dark, 40)

  div.form-block_error
    margin-bottom: 75px

  &-label
    display: block
    font-weight: 500
    font-size: 13px
    text-transform: uppercase
    color: lighten($c-dark, 40)
    transition: 0.2s
    cursor: pointer
    &:hover
      color: $c-active

  &-input
    width: 100%
    padding: 10px 0
    border: none
    background-color: transparent
    border-bottom: 2px solid lighten($c-dark, 40)
    font-weight: 500
    font-size: 18px
    transition: 0.2s
    &:focus
      border-bottom: 2px solid $c-active
    &[type="password"]
      padding-right: 30px

  &-textarea
    width: 100%
    padding: 10px
    min-height: 120px
    border: none
    background-color: $c-light
    box-shadow: 0 0 10px rgba(#000, 0.15)
    font-weight: 500
    font-size: 14px
    transition: 0.2s
    margin-top: 5px
    resize: vertical

  &-file
    margin-top: 15px
    cursor: pointer

  &-password
    position: relative
    &__eye
      width: 24px
      position: absolute
      top: 50%
      transform: translateY(-50%)
      right: 0

  &-error
    font-weight: 500
    font-size: 13px
    color: $c-warning
    position: absolute
    top: calc(100% + 10px)
    left: 0

  &-submit
    width: 100%
    padding: 20px
    background-color: $c-active
    border: 1px solid $c-active
    font-weight: 500
    font-size: 18px
    color: $c-light
    transition: 0.2s
    &:hover
      background-color: darken($c-active, 15)
      border: 1px solid darken($c-active, 15)
    &[disabled]
      opacity: 0.5
      &:hover
        background-color: $c-active
        border: 1px solid $c-active

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
    box-shadow: 0px 0px 50px rgba(#000, 0.35)
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

        &__line
          display: flex
          align-items: center
          span
            font-weight: 500
            font-size: 18px
            margin-left: 10px

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

.notification

  &-popup
    display: flex
    justify-content: space-between
    align-items: center
    width: 350px
    padding: 15px
    background-color: $c-dark
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
    position: fixed
    bottom: 30px
    right: 15px
    z-index: 10

  &-info
    font-size: 14px
    color: $c-light
    margin-right: 10px

  &-img
    flex-basis: 20px
    flex-shrink: 0

  &-close
    font-size: 24px
    position: absolute
    top: -30px
    right: 0

.processing

  &-overlay
    display: flex
    justify-content: center
    align-items: center
    width: 100vw
    height: 100vh
    overflow: hidden
    background-color: rgba(255, 255, 255, 0.7)
    position: fixed
    top: 0
    left: 0
    z-index: 25

  &-indicator
    width: 200px
    height: 200px
    background: url("./assets/img/loader.svg") center no-repeat
    background-size: contain
    animation: loading 1.5s infinite ease-in-out

@keyframes loading
  from
    transform: scale(1) rotate(0)
  50%
    transform: scale(0.5) rotate(180deg)
  to
    transform: scale(1) rotate(360deg)

.select-container
  margin-bottom: 50px

.select
  width: 360px
  background-color: $c-bg
  font-size: 16px

.v-select
  cursor: pointer
  position: relative
  // z-index: 5
  .vs__search
    opacity: 0
    // visibility: hidden
    position: absolute
    top: 2px
    left: 2px
    z-index: -1

  .vs__dropdown-toggle
    display: flex
    justify-content: space-between
    align-items: center
    border: 3px solid $c-middle
    z-index: 3

  .select-arrow
    transition: 0.2s
    width: 14px
    height: 12px
    background: url("./assets/img/arrow-select.svg") center no-repeat
    background-size: contain

.v-select.vs--open
  .select-arrow
    transform: rotateX(180deg)

.select
  transition: 0.2s

  .vs
    &__dropdown
      &-toggle
        padding: 15px 24px
        color: darken($c-middle, 40)

      &-menu
        width: 100%
        max-height: 400px
        background-color: $c-bg
        overflow-y: scroll
        border-left: 3px solid $c-middle
        border-bottom: 3px solid $c-middle
        position: absolute
        top: 100%
        left: 0
        z-index: 5

        &::-webkit-scrollbar
          width: 4px

        &::-webkit-scrollbar-button
          height: 0

        &::-webkit-scrollbar-track
          background-color: $c-middle

        &::-webkit-scrollbar-track-piece
          background-color: $c-middle

        &::-webkit-scrollbar-thumb
          height: 50px
          background-color: $c-dark

        &::-webkit-scrollbar-corner
          background-color: $c-dark

        &::-webkit-resizer
          background-color: $c-dark

      &-option
        padding: 15px 25px
        font-weight: 500
        font-size: 18px
        transition: 0.2s

        &--selected
          background-color: $c-active
          color: $c-light

        &:hover
          background-color: $c-active
          color: $c-light

.select.vs--open
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15)

  .vs__dropdown-menu
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15)

.select.vs--disabled
  cursor: default
  opacity: 0.7

.admin-users
  .select-arrow
    width: 10px
    height: 9px

  .vs
    &__dropdown
      &-toggle
        background-color: $c-light
        border: 1px solid $c-middle
        padding: 8px 6px

      &-menu
        overflow-y: visible
        background-color: $c-light
        border-left: 1px solid $c-middle
        border-bottom: 1px solid $c-middle
        border-right: 1px solid $c-middle

      &-option
        padding: 8px 6px
        font-size: 12px

.popup-admin
  .vs
    &__dropdown
      &-toggle
        border: 1px solid $c-middle
        padding: 10px 15px

      &-menu
        overflow-y: visible
        border-left: 1px solid $c-middle
        border-bottom: 1px solid $c-middle
        border-right: 1px solid $c-middle

      &-option
        padding: 10px 15px

.calendar
  z-index: 10

  .vfc
    &-main
      &-container
        width: 308px
        height: auto !important
        background-color: $c-light
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2)
        border-radius: 0
        .vfc-content
          margin: 0
          &>div:last-child
            &>div:last-child
              height: 5px !important
        .vfc-calendar
          width: 100%
        .vfc-separately-navigation-buttons
          margin-top: -28px
        .vfc-top-date
          margin: 0 25px 0 25px
        .vfc-dayNames
          margin-bottom: 0
        .vfc-day
          margin: 0
        .vfc-week .vfc-day
          span.vfc-span-day
            margin: 0
            border-radius: 0
            width: 44px
            height: 30px
            line-height: normal
            &:hover
              background-color: $c-active
          span.vfc-span-day.vfc-today
            background-color: lighten($c-active, 20)
          span.vfc-span-day.vfc-marked
            background-color: $c-active

    &-calendars
      &-container
        position: relative

    &-navigation
      &-buttons
        display: flex
        justify-content: space-between
        align-items: center
        width: 100%
        padding: 13px
        position: absolute
        top: 0
        left: 0

        & > div
          display: flex
          justify-content: center
          align-items: center
          width: 22px
          height: 22px
          border: 2px solid lighten($c-dark, 40)
          border-radius: 50%
          transition: 0.2s

          .vfc-arrow-left, .vfc-arrow-right
            width: 8px
            height: 8px
            border-top: 2px solid lighten($c-dark, 40)
            border-right: 2px solid lighten($c-dark, 40)
            transition: 0.2s

          .vfc-arrow-right
            transform: rotate(45deg)
            margin-right: 3px

          .vfc-arrow-left
            transform: rotate(225deg)
            margin-right: -3px

        .vfc-cursor
          &-pointer
            border: 2px solid $c-dark
            cursor: pointer

            &:hover
              border: 2px solid lighten($c-dark, 40)

              .vfc-arrow-left, .vfc-arrow-right
                border-top: 2px solid lighten($c-dark, 40)
                border-right: 2px solid lighten($c-dark, 40)

            .vfc-arrow-left, .vfc-arrow-right
              border-top: 2px solid $c-dark
              border-right: 2px solid $c-dark

    &-top
      &-date
        padding: 8px
        text-align: center

        a
          font-weight: 500
          font-size: 18px

    &-dayNames
      display: flex
      justify-content: space-between
      align-items: center

      span
        display: block
        width: 44px
        padding: 9px 0
        background-color: $c-dark
        font-weight: bold
        font-size: 13px
        color: $c-light
        text-align: center
    // &:last-child
    //   background-color: lighten($c-dark, 40)
    &-week
      display: flex
      justify-content: space-between
      align-items: center

    &-day
      width: 44px

      span
        display: block
        width: 100%
        padding: 9px 0
        font-size: 13px
        text-align: center
        transition: 0.2s
        cursor: pointer

        &:hover
          background-color: $c-active
          color: $c-light

      .vfc-today
        background-color: lighten($c-active, 30)

      .vfc-cursor-not-allowed
        color: lighten($c-dark, 40)
        cursor: default

        &:hover
          background-color: transparent
          color: lighten($c-dark, 40)

      .vfc-hide
        color: lighten($c-dark, 40)
        cursor: default

        &:hover
          background-color: transparent
          color: lighten($c-dark, 40)

      .vfc-marked
        background-color: lighten($c-active, 10)
        color: $c-light

      .vfc-start-marked, .vfc-end-marked
        background-color: $c-active
        color: $c-light
</style>