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
          .dish-name Название блюда
          .dish-category Категория
          .dish-buttons
            button.dish-buttons__btn
              img(src="../assets/img/pencil.svg", alt="Pencil")
            button.dish-buttons__btn &times;

    .overlay(v-if="isPopupShown")
      form.form.popup.popup-admin(action="#", @submit.prevent="checkForm()")
        .form-title(v-if="editingDish") Редактирование блюда
        .form-title(v-else) Добавление блюда
        .form-inputs
          .form-block(:class="{'form-block_error': surnameError != ''}")
            label.form-label(for="account-surname") Фамилия
            input.form-input(type="text", id="account-surname", v-model.trim="surname", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkSurname()")
            .form-error(v-if="surnameError != ''") {{ surnameError }}
          .form-block(:class="{'form-block_error': nameError != ''}")
            label.form-label(for="account-name") Имя
            input.form-input(type="text", id="account-name", v-model.trim="name", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkName()")
            .form-error(v-if="nameError != ''") {{ nameError }}
          .form-block(:class="{'form-block_error': middlenameError != ''}")
            label.form-label(for="account-middlename") Отчество (не обязательно)
            input.form-input(type="text", id="account-middlename", v-model.trim="middlename", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkMiddlename()")
            .form-error(v-if="middlenameError != ''") {{ middlenameError }}
          .form-block(:class="{'form-block_error': emailError != ''}")
            label.form-label(for="account-email") Корпоративная почта SmartWorld
            input.form-input(type="text", id="account-email", placeholder="@smartworld.team", v-model.trim="email", v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'", @focusout="checkEmail()")
            .form-error(v-if="emailError != ''") {{ emailError }}
          .form-block.form-block_last
            label.form-label.form-label__role Роль пользователя
            .select-container
              v-select.select(v-model="role", label="name", index="name", :options="roles", :clearable="false", :searchable="false")
                template(v-slot:option="option")
                  span.select-option {{ option.name }}
          .form-block.form-block_last(:class="{'form-block_error': limitError != ''}")
            label.form-label(for="account-limit") Лимит заказа
            .form-block__line
              input.form-input(type="text", id="account-limit", v-model.trim="limit", v-mask="'#####'", @focusout="checkLimit()")
              span Р
            .form-error(v-if="limitError != ''") {{ limitError }}
        button.form-submit(type="submit", v-if="editingDish", :disabled="errors") Сохранить изменения
        button.form-submit(type="submit", v-else, :disabled="errors") Добавить блюдо
        button.popup-close(@click.prevent="hidePopup()") &times;

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
    },

    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
    }
  },

  computed: {
    dishes() {
      return this.$store.getters.dishes
    },

    processing() {
      return this.$store.getters.processing
    },

    notification() {
      return this.$store.getters.notification
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