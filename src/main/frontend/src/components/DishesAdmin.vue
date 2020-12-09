<template lang="pug">
  .admin-main.admin-dishes
    .dishes
      .dishes-header
        .dishes-header__title Блюда
        button.btn.dishes-header__btn Добавить блюдо

      .dishes-container
        .dish(v-for="dish in dishes")
          .dish-img(v-if="!!dish.imageAddress")
            .dish-img__container(:style="{'background-image': `url(http://localhost:8087/${dish.imageAddress})`}")
          .dish-img.dish-img__default(v-else)
            img(src="../assets/img/dish-default.svg", alt="Dish image")
          .dish-name Название блюда
          .dish-category Категория
          .dish-buttons
            button.dish-buttons__btn
              img(src="../assets/img/pencil.svg", alt="Pencil")
            button.dish-buttons__btn &times;
</template>

<script>
export default {
  computed: {
    dishes() {
      return this.$store.getters.dishes
    }
  },

  created() {
    this.$store.dispatch('LOAD_DISHES').catch(err => {
      console.log("Dishes loader rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          { msg: `Ошибка при загрузке блюд: ${err.message}`, err: true }
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })
  }

}
</script>

<style lang="sass" scoped>
@import "../assets/sass/vars"

.admin

  .dishes

    &-header
      display: flex
      justify-content: space-between
      max-width: 1140px
      margin-bottom: 40px
      &__title
        font-weight: 500
        font-size: 24px
        line-height: 28px
      &__btn
        width: 220px
        border: none
        background-color: $c-active
        &:hover
          background-color: darken($c-active, 15)

    &-container
      display: flex
      justify-content: space-between
      align-items: stretch
      flex-wrap: wrap
      max-width: 1140px

  .dish
    flex-basis: 555px
    display: flex
    align-items: center
    box-shadow: 0 0 10px rgba(#000, 0.15)
    padding: 15px
    margin-right: 30px
    margin-bottom: 15px
    &:nth-child(2n)
      margin-right: 0

    &-img
      flex-basis: 70px
      height: 70px
      margin-right: 15px
      &__container
        height: 100%
        background-repeat: no-repeat
        background-position: center
        background-size: cover

    &-name
      flex-basis: 190px
      font-weight: bold
      font-size: 13px
      line-height: 15px

    &-category
      flex-basis: 170px
      font-size: 12px
      line-height: 14px

    &-buttons
      flex-grow: 1
      display: flex
      justify-content: space-between
      align-items: center
      &__btn
        flex-basis: 33px
        height: 33px
        transition: 0.2s
        &:last-child
          border: 2px solid $c-dark
          border-radius: 50%
          font-size: 18px
          font-weight: bold
        &:hover
          transform: scale(1.2)
</style>