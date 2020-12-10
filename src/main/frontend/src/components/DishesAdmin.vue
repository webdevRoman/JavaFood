<template lang="pug">
  .admin-main.admin-dishes
    .dishes
      .dishes-header
        .dishes-header__title Блюда
        button.btn.dishes-header__btn(@click.prevent="showPopup(null)") Добавить блюдо

      .dishes-container
        .dish(v-for="dish in dishes")
          .dish-img(v-if="!!dish.imageAddress")
            .dish-img__container(:style="{'background-image': `url(http://localhost:8087/${dish.imageAddress})`}")
          .dish-img.dish-img__default(v-else)
            img(src="../assets/img/dish-default.svg", alt="Dish image")
          .dish-name {{ dish.name }}
          .dish-category {{ dish.dishTypeName }}
          .dish-buttons
            button.dish-buttons__btn
              img(src="../assets/img/pencil.svg", alt="Pencil")
            button.dish-buttons__btn &times;

    .overlay(v-if="isPopupShown")
      form.form.popup.popup-admin-dish(action="#", @submit.prevent="checkForm()")
        .form-title(v-if="editingDish") Редактирование блюда
        .form-title(v-else) Добавление блюда
        .form-inputs

          .form-inputs__half

            .form-block(:class="{'form-block_error': nameError != ''}")
              label.form-label(for="dish-name") Название блюда
              input.form-input(
                type="text",
                id="dish-name",
                v-model.trim="name",
                v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
                @focusout="checkName()")
              .form-error(v-if="nameError != ''") {{ nameError }}

            .form-block(:class="{'form-block_error': categoryError != ''}")
              label.form-label(for="dish-category") Категория
              input.form-input(
                type="text",
                id="dish-category",
                v-model.trim="category",
                v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
                @focusout="checkCategory()")
              .form-error(v-if="categoryError != ''") {{ categoryError }}

            .form-block__line
              .form-block.form-block_last(:class="{'form-block_error': priceError != ''}")
                label.form-label(for="dish-price") Стоимость
                .form-block__line
                  input.form-input(type="text", id="dish-price", v-model.trim="price", v-mask="'#####'", @focusout="checkPrice()")
                  span Р
                .form-error(v-if="priceError != ''") {{ priceError }}

              .form-block.form-block_last(:class="{'form-block_error': weightError != ''}")
                label.form-label(for="dish-weight") Вес
                .form-block__line
                  input.form-input(type="text", id="dish-weight", v-model.trim="weight", v-mask="'#####'", @focusout="checkWeight()")
                  span гр
                .form-error(v-if="weightError != ''") {{ weightError }}

          .form-inputs__half

            .form-block(:class="{'form-block_error': descrError != ''}")
              label.form-label(for="dish-descr") Описание
              textarea.form-textarea(
                id="dish-descr",
                v-model.trim="descr",
                @focusout="checkDescr()")
              .form-error(v-if="descrError != ''") {{ descrError }}


            label.form-label(for="dish-img") Изображение
            .form-block.form-block_last.form-block-img(:class="{'form-block_error': imgError != ''}")
              input.form-file(type="file", id="dish-img", @change="checkImg($event)")
              label.form-label(for="dish-img")
                span.form-file-icon__wrapper
                  img.form-file-icon(src="../assets/img/camera.svg", alt="Выбрать файл", width="25")
                span.form-file-text Выберите изображение
              .form-error(v-if="imgError != ''") {{ imgError }}

        button.form-submit(type="submit", v-if="editingDish", :disabled="errors") Сохранить изменения
        button.form-submit(type="submit", v-else, :disabled="errors") Добавить блюдо
        button.popup-close(@click.prevent="hidePopup()") &times;
</template>

<script>
export default {
  data() {
    return {
      isPopupShown: false,
      editingDish: false
    }
  },

  methods: {
    showPopup(dish) {
      if (dish) {
        this.editingDish = true
        console.log('edit')
      } else {
        this.editingDish = false
        console.log('new')
      }
      this.isPopupShown = true
    },

    hidePopup() {
      this.isPopupShown = false
      this.editingDish = null
    }
  },

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

.popup-admin-dish
  .form
    &-inputs
      align-items: stretch
      flex-wrap: nowrap
      &__half
        flex-basis: 260px
        display: flex
        flex-direction: column
        justify-content: space-between
    &-block
      flex-basis: auto
      margin-right: 0
      &__line
        justify-content: space-between
        .form-block
          flex-basis: 100px

      &-img
        position: relative
        margin-top: 5px
        .form
          &-file
            opacity: 0
            visibility: hidden
            position: absolute
          &-label
            padding: 10px 20px 10px 10px
            background-color: darken($c-bg, 25)
            color: $c-light
            display: flex
            justify-content: space-between
            align-items: center
            cursor: pointer
            transition: 0.2s
            &:hover
              background-color: darken($c-bg, 40)
</style>