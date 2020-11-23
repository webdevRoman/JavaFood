<template lang="pug">
.dishes
  .container
    .select-container
      v-select.select(v-model="selectCategory", label="name", index="name", :options="selectCategories", :clearable="false", :searchable="false")
        template(v-slot:option="option")
          span.select-option {{ option.name }}
  .container
    .title.favourites-no(v-if="categories.length == 0") На этот день нет блюд
    .category(v-for="category in currentCategories")
      .title.category-title {{ category.name }}
      .title.favourites-no(v-if="category.dishes.length == 0") В этой категории нет блюд
      .category-dishes(v-else)
        .dish(v-for="dish in category.dishes", :class="{'dish_inactive': dish.hide == 1}")
          .dish-top
            .dish-img(:style="{'background-image': `url(https://edatomsk.ru${dish.image})`}")
              //- img(src="../assets/img/dish.svg", alt="Dish image")
            .dish-title {{ dish.name }}
            //- .dish-descr {{ dish.description }}
            .dish-descr(v-html="formatDescr(dish.description)")
          .dish-bottom
            .dish-info
              .dish-info__text
                span.dish-info__price {{ dish.price }} Р
                span.dish-info__weight {{ dish.weight }} г
              button.dish-info__show(@click.prevent="showDescr(dish.description)", v-if="dish.description != ''")
                .dish-info__dot
                .dish-info__dot
                .dish-info__dot
            .dish-footer
              div(:class="{'dish-footer__cart': true, 'dish-footer__cart_active': dish.amount > 0}")
                button.cart-btn(@click.prevent="incrementOrder(dish)", :disabled="dish.amount > 0 || dish.hide == 1 || refuseOrder")
                  img(src="../assets/img/cart-active.svg", alt="Cart image", v-if="dish.amount > 0")
                  img(src="../assets/img/cart.svg", alt="Cart image", v-else)
                div(:class="{'cart-number': true, 'cart-number_active': dish.amount > 0}")
                  button.cart-number__btn(@click.prevent="decrementOrder(dish)", :disabled="dish.amount <= 0 || dish.hide == 1 || refuseOrder") -
                  input.cart-number__value(type="text", v-model.trim="dish.amount", v-mask="'##'", @focusout="checkOrder(dish)", :disabled="dish.hide == 1 || refuseOrder")
                  button.cart-number__btn(@click.prevent="incrementOrder(dish)", :disabled="dish.amount >= 99 || dish.hide == 1 || refuseOrder") +
              button.dish-footer__favourite(@click.prevent="toggleFavourite(dish)")
                img(src="../assets/img/star-active.svg", alt="Star image", v-if="dish.elect")
                img(src="../assets/img/star.svg", alt="Star image", v-else)
  .overlay(v-if="showPopup")
    .popup {{ showingDescr }}
      button.popup-close(@click.prevent="hideDescr()") &times;
</template>

<script>
export default {
  data() {
    return {
      selectCategory: { name: 'Все категории' },
      showPopup: false,
      showingDescr: '',
      timeoutId: null
    }
  },
  methods: {
    formatDescr(text) {
      return text.split('\n').join('<br>')
    },
    toggleFavourite(dish) {
      let data = {}
      if (!dish.elect) {
        data = { dish: dish, remove: false }
        dish.elect = true
      } else {
        data = { dish: dish, remove: true }
        dish.elect = false
      }
      this.$store.dispatch('TOGGLE_FAVOURITE', data)
      .catch(err => {
        console.log('Error on adding or removing favourite dish: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    incrementOrder(dish) {
      dish.amount = parseInt(dish.amount) + 1
      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
      this.timeoutId = setTimeout(this.setOrder, 500, dish)
      // this.$store.dispatch('SET_OREDER', { dish: dish, amount: parseInt(dish.amount) + 1 })
      // this.$store.dispatch('SET_OREDER', { dish: dish, amount: parseInt(dish.amount) })
      // .catch(err => {
      //   console.log('Error on incrementing dish amount: ' + err)
      //   this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      //   setTimeout(() => {
      //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      //   }, 5000)
      // })
    },
    decrementOrder(dish) {
      dish.amount = parseInt(dish.amount) - 1
      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
      this.timeoutId = setTimeout(this.setOrder, 500, dish)
      // this.$store.dispatch('SET_OREDER', { dish: dish, amount: parseInt(dish.amount) - 1 })
      // this.$store.dispatch('SET_OREDER', { dish: dish, amount: parseInt(dish.amount) })
      // .catch(err => {
      //   console.log('Error on decrementing dish amount: ' + err)
      //   this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      //   setTimeout(() => {
      //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      //   }, 5000)
      // })
    },
    checkOrder(dish) {
      // let data = {}
      // if (dish.amount == '' || !dish.amount.match(/\d+/)) {
      //   data = { dish: dish, amount: 0 }
      // } else if (dish.amount.length > 1 && dish.amount[0] == '0') {
      //   data = { dish: dish, amount: parseInt(dish.amount[1]) }
      // } else {
      //   data = { dish: dish, amount: dish.amount }
      // }
      if (dish.amount == '' || !dish.amount.match(/\d+/)) {
        dish.amount = 0
      } else if (dish.amount.length > 1 && dish.amount[0] == '0') {
        dish.amount = parseInt(dish.amount[1])
      }
      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
      // if (dish.amount > 0) {
      //   let fakeDish = Object.assign({}, dish)
      //   fakeDish.amount = 0
      //   this.setOrder(fakeDish)
      // }
      this.timeoutId = setTimeout(this.setOrder, 500, dish)
      // this.$store.dispatch('SET_OREDER', data)
      // .catch(err => {
      //   console.log('Error on changing dish amount: ' + err)
      //   this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      //   setTimeout(() => {
      //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      //   }, 5000)
      // })
    },
    setOrder(dish) {
      this.$store.dispatch('SET_OREDER', dish)
      .catch(err => {
        console.log('Error on setting order: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    showDescr(descr) {
      this.showPopup = true
      this.showingDescr = descr
    },
    hideDescr() {
      this.showPopup = false
      this.showingDescr = ''
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    currentCategories() {
      if (this.selectCategory.name == 'Все категории')
        return this.categories
      else
        return this.categories.filter(c => c.name == this.selectCategory.name)
    },
    selectCategories() {
      let selectCategories = this.categories.slice()
      selectCategories.unshift({ name: 'Все категории' })
      return selectCategories
    },
    refuseOrder() {
      return this.$store.getters.refuseOrder
    }
  },
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"
@import "../assets/sass/media-dishes"

.favourites
  &-no
    text-align: center
    margin-bottom: 50px

.category
  margin-bottom: 80px
  &-title
    font-weight: bold
    font-size: 24px
    text-transform: uppercase
    margin-bottom: 30px
  &-dishes
    display: flex
    justify-content: space-between
    align-items: stretch
    flex-wrap: wrap
    &:after
      content: ''
      flex: auto
    .dish
      flex-basis: 262px
      display: flex
      justify-content: space-between
      flex-direction: column
      border: 2px solid $c-middle
      box-sizing: border-box
      text-align: center
      margin-right: 30px
      margin-bottom: 30px
      transition: 0.2s
      &_inactive
        opacity: 0.5
      &:nth-child(4n)
        margin-right: 0
      &:hover
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1)
      &-img
        height: 200px
        border-bottom: 2px solid $c-middle
        background-repeat: no-repeat
        background-position: center
        background-size: cover
        margin-bottom: 12px
        // img
        //   width: 140px
      &-title
        width: 90%
        font-weight: bold
        font-size: 18px
        margin: 0 auto 25px auto
      &-descr
        width: 90%
        font-size: 13px
        line-height: 20px
        margin: 0 auto 25px auto
      &-info
        margin-bottom: 15px
        &__price
          font-weight: bold
          font-size: 18px
          vertical-align: middle
          margin-right: 10px
        &__weight
          font-size: 13px
          vertical-align: middle
        &__show
          display: none
          justify-content: center
          align-items: center
          width: 26px
          height: 26px
          border: 2px solid $c-dark
          border-radius: 50%
          position: relative
          .dish-info__dot
            width: 4px
            height: 4px
            background-color: $c-dark
            border-radius: 50%
            margin-right: 2px
            &:last-child
              margin-right: 0
      &-footer
        display: flex
        justify-content: space-between
        align-items: stretch
        border-top: 2px solid $c-middle
        &__cart
          display: flex
          justify-content: space-between
          align-items: center
          flex-basis: 75%
          padding: 5px 10px
          border-right: 2px solid $c-middle
          &_active
            background-color: $c-active
          .cart
            &-btn
              transition: 0.2s
              &:hover
                transform: scale(1.3)
              &[disabled]
                &:hover
                  transform: scale(1)
            &-number
              display: flex
              align-items: center
              &__btn
                width: 24px
                height: 24px
                border: 1px solid $c-dark
                border-radius: 50%
                font-weight: 500
                font-size: 18px
                margin-right: 10px
                transition: 0.2s
                &:last-child
                  margin-right: 0
                &:hover
                  transform: scale(1.4)
                &[disabled]
                  &:hover
                    transform: scale(1)
              &__value
                width: 20px
                background-color: transparent
                border: none
                font-weight: 500
                font-size: 18px
                text-align: center
                margin-right: 10px
              &_active
                .cart-number__btn
                  border: 1px solid $c-light
                .cart-number__btn, .cart-number__value
                  color: $c-light
        &__favourite
          display: flex
          justify-content: center
          align-items: center
          flex-basis: 25%
          padding: 2px 12px
          box-sizing: border-box
          transition: 0.2s
          &:hover
            transform: scale(1.3)
.overlay
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)
  position: fixed
  top: 0
  left: 0
  .popup
    width: 90%
    padding: 20px
    background-color: $c-bg
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.35)
    font-size: 15px
    line-height: 25px
    margin: 0 auto
    position: relative
    &-close
      font-size: 38px
      color: $c-light
      position: absolute
      top: -45px
      right: 0
</style>