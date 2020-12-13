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
            button.dish-buttons__btn(@click.prevent="showPopup(dish)")
              img(src="../assets/img/pencil.svg", alt="Pencil")
            button.dish-buttons__btn(@click.prevent="deleteDish(dish.id)") &times;

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
            .form-block.form-block_last.form-block-img
              input.form-file(type="file", id="dish-img", @change="checkImg($event)")
              label.form-label(for="dish-img", :class="{'form-label_success': imgChosen}")
                span.form-file-icon__wrapper
                  img.form-file-icon(v-if="!editingDish || img", src="../assets/img/camera.svg", alt="Выбрать файл")
                  .form-file-icon.form-file-icon_bg(
                    v-else-if="!!editingDish.imageAddress",
                    :style="{'background-image': `url(http://localhost:8087/${editingDish.imageAddress})`}")
                  img.form-file-icon(v-else, src="../assets/img/dish-default-light.svg", alt="Dish image")
                span.form-file-text(v-if="img") Изображение выбрано
                span.form-file-text(v-else) Выберите изображение

        button.form-submit(type="submit", v-if="editingDish", :disabled="errors") Сохранить изменения
        button.form-submit(type="submit", v-else, :disabled="errors") Добавить блюдо
        button.popup-close(@click.prevent="hidePopup()") &times;
</template>

<script>
export default {
  data() {
    return {
      isPopupShown: false,
      editingDish: null,
      name: '',
      nameError: '',
      category: '',
      categoryError: '',
      price: '',
      priceError: '',
      weight: '',
      weightError: '',
      descr: '',
      descrError: '',
      img: null,
      imgChosen: false
    }
  },

  methods: {
    showPopup(dish) {
      if (dish) {
        this.editingDish = dish
        this.name = dish.name
        this.category = dish.dishTypeName
        this.price = dish.price
        this.weight = dish.weight
        this.descr = dish.description
      } else {
        this.editingDish = null
      }
      this.isPopupShown = true
    },

    hidePopup() {
      this.isPopupShown = false
      this.editingDish = null
      this.name = ''
      this.nameError = ''
      this.category = ''
      this.categoryError = ''
      this.price = ''
      this.priceError = ''
      this.weight = ''
      this.weightError = ''
      this.descr = ''
      this.descrError = ''
      this.img = null
      this.imgChosen = false
      this.$store.dispatch('CLEAR_ERRORS', 'all')
    },

    deleteDish(id) {
      this.$store.dispatch('DELETE_DISH', id)
          .then(() => {
            this.$store.dispatch('SET_NOTIFICATION', {msg: 'Блюдо удалено.', err: false})
            setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                5000)
          })
          .catch(err => {
            console.log('Error on deleting dish: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                5000)
          })
    },

    checkForm() {
      this.checkName()
      this.checkCategory()
      this.checkPrice()
      this.checkWeight()
      this.checkDescr()
      if (!this.errors) {
        if (this.editingDish === null)
          this.addDish()
        else
          this.editDish()
      }
    },

    addDish() {
      this.$store.dispatch('ADD_DISH', {
        dish: {
          name: this.name,
          weight: this.weight,
          description: this.descr,
          price: this.price,
          dishTypeName: this.category,
          hasImage: !!this.img
        },
        image: this.img
      })
          .then(() => {
            this.hidePopup()
            this.$store.dispatch('SET_NOTIFICATION', {msg: 'Блюдо добавлено.', err: false})
            setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                5000)
          })
          .catch(err => {
            console.log('Error on creating dish: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
            setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                5000)
          })
    },

    editDish() {
      const requests = this.getRequests()
      if (requests.length > 0) {

        this.$store.dispatch('EDIT_DISH', {
          dish: {
            id: this.editingDish.id,
            name: this.name,
            weight: this.weight,
            description: this.descr,
            price: this.price,
            dishTypeName: this.category,
            hasImage: !!this.image
          },
          image: this.img,
          requests: requests
        })
            .then(() => {
              this.hidePopup()
              this.$store.dispatch('SET_NOTIFICATION', {msg: 'Блюдо изменено.', err: false})
              setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                  5000)
            })
            .catch(err => {
              console.log('Error on editing dish: ' + err)
              this.$store.dispatch('SET_NOTIFICATION', {msg: `Ошибка: ${err}`, err: true})
              setTimeout(() => this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false}),
                  5000)
            })

      }
    },

    getRequests() {
      const requests = []
      if (
          this.name !== this.editingDish.name ||
          this.price !== this.editingDish.price ||
          this.weight !== this.editingDish.weight ||
          this.descr !== this.editingDish.description
      )
        requests.push('data')
      if (this.category !== this.editingDish.dishTypeName)
        requests.push('category')
      if (this.img !== null)
        requests.push('img')
      return requests
    },

    checkName() {
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
      this.$store.dispatch('CHECK_NAME', {type: 'dishName', data: this.name})
          .then(
              result => {
                if (result == 'empty')
                  this.nameError = 'Заполните название'
                else if (result == 'long')
                  this.nameError = 'Название должно содержать не более 35 символов'
                else if (result == 'wrong')
                  this.nameError = 'Название должно состоять только из букв, цифр и проеблов'
                else
                  this.nameError = ''
              },
              error => console.log("Name checker rejected: " + error.message)
          )
    },

    checkCategory() {
      this.category = this.category.charAt(0).toUpperCase() + this.category.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', {type: 'dishName', data: this.category})
          .then(
              result => {
                if (result == 'empty')
                  this.categoryError = 'Заполните категорию'
                else if (result == 'long')
                  this.categoryError = 'Название категории должна содержать не более 35 символов'
                else if (result == 'wrong')
                  this.categoryError = 'Название категории должна состоять только из букв, цифр и проеблов'
                else
                  this.categoryError = ''
              },
              error => console.log("Name checker rejected: " + error.message)
          )
    },

    checkPrice() {
      this.priceError = ''
      if (this.price === '')
        this.priceError = 'Введите стоимость'
    },

    checkWeight() {
      this.weightError = ''
      if (this.weight === '')
        this.weightError = 'Введите вес'
    },

    checkDescr() {
      this.descrError = ''
      if (this.descr === '')
        this.descrError = 'Введите описание'
    },

    checkImg(event) {
      if (event && event.target && event.target.files)
        this.img = event.target.files[0]
      if (this.img !== null)
        this.imgChosen = true
    }
  },

  computed: {
    dishes() {
      return this.$store.getters.dishes
    },

    errors() {
      const errors = this.$store.getters.errors
      if (
          errors.dishName != undefined
          || this.priceError != ''
          || this.weightError != ''
          || this.descrError != ''
      )
        return true
      else
        return false
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
    background-color: $c-light
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
            &-icon
              &__wrapper
                flex-basis: 35px
                height: 35px
                overflow: hidden
                display: flex
                justify-content: center
                align-items: center
              &_bg
                width: 100%
                height: 100%
                background-repeat: no-repeat
                background-position: center
                background-size: cover
          &-label
            padding: 10px 20px 10px 10px
            background-color: darken($c-bg, 25)
            color: $c-light
            display: flex
            justify-content: space-between
            align-items: center
            cursor: pointer
            transition: 0.2s
            &_success
              background-color: $c-active
            &:hover
              background-color: darken($c-bg, 40)
</style>