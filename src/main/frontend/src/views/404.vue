<template lang="pug">
  .page404-container
    .page404
      .page404-main

        .page404-main__text 404

        .page404-main__fork
          img(src="../assets/img/fork.png", alt="Fork")
        .page404-main__plate
          img(src="../assets/img/plate.png", alt="Plate")
        .page404-main__spoon
          img(src="../assets/img/spoon.png", alt="Spoon")

      .page404-error Ошибка! <br> Страница не найдена
      router-link.form-submit.page404-button(tag="button", to="/") Вернуться на сайт
</template>

<style scoped lang="sass">
@import "../assets/sass/vars"

.page404
  &-container
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    background-color: $c-dark

  &-main
    position: relative
    margin-top: -90px

    &__text
      font-weight: bold
      font-size: 560px
      color: $c-light
      letter-spacing: 0.1em

    &__fork
      left: 145px

    &__plate
      top: 50%
      left: 50%
      transform: translateX(-52%) translateY(-48%)
      width: 610px

    &__spoon
      right: 145px

    .page404-main__fork, .page404-main__plate, .page404-main__spoon
      position: absolute

    .page404-main__fork, .page404-main__spoon
      height: 470px
      top: 115px

      img
        height: 100%
        width: auto

  &-error
    font-weight: 500
    font-size: 36px
    line-height: 60px
    color: $c-light
    letter-spacing: 0.1em
    text-align: center
    text-transform: uppercase
    margin-top: -80px
    margin-bottom: 25px

  &-button
    display: block
    width: 262px
    margin: 0 auto

@media(max-width: 1200px)
  html
    .page404
      &-main
        margin-top: -30px

        &__text
          font-size: 400px

        &__fork
          left: 105px

        &__plate
          width: 430px

        &__spoon
          right: 110px

        .page404-main__fork, .page404-main__spoon
          height: 330px
          top: 90px

      &-error
        font-size: 30px
        line-height: 50px
        margin-top: -30px

      &-button
        width: 210px
        padding: 18px

@media(max-width: 992px)
  html
    .page404
      &-main
        margin-top: -20px

        &__text
          font-size: 320px

        &__fork
          left: 85px

        &__plate
          width: 350px

        &__spoon
          right: 90px

        .page404-main__fork, .page404-main__spoon
          height: 270px
          top: 75px

      &-error
        font-size: 24px
        line-height: 40px
        margin-top: -20px
        margin-bottom: 15px

      &-button
        width: 180px
        padding: 15px
        font-size: 15px

@media(max-width: 768px)
  html
    .page404
      &-main
        margin-top: 0

        &__text
          font-size: 230px

        &__fork
          left: 60px

        &__plate
          width: 250px

        &__spoon
          right: 60px

        .page404-main__fork, .page404-main__spoon
          height: 200px
          top: 50px

      &-error
        font-size: 20px
        margin-top: 0
        margin-bottom: 30px

@media(max-width: 576px)
  html
    .page404
      &-main
        &__text
          font-size: 150px

        &__fork
          left: 40px

        &__plate
          transform: translateX(-52%) translateY(-47%)
          width: 165px

        &__spoon
          right: 40px

        .page404-main__fork, .page404-main__spoon
          height: 125px
          top: 35px

      &-error
        font-size: 15px
        line-height: 30px

      &-button
        width: 160px
        font-size: 13px
</style>