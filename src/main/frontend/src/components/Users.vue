<template lang="pug">
.admin-main.admin-users
  //- form.users-container(action="#", @submit.prevent="saveChanges()")
  .users-container
    .users-title Управление пользователями
    table.users-table
      tr.users-table__header
        th.login Логин
        th.name ФИО
        th.phone Телефон
        th.role Роль
        th(colspan="3")
      tr.users-table__line(v-for="user in users")
        th.login Логин
        td.name {{ user.firstname }} {{ user.midname }} {{ user.lastname }}
        th.phone {{ user.phone }}
        td.role
          .select-container
            v-select.select(
              v-model="user.role",
              label="name",
              index="name",
              :options="roles",
              :clearable="false",
              :searchable="false",
              @input="changeUserRole(user)"
            )
              template(v-slot:option="option")
                span.select-option {{ option.name }}
        //- td.status
        //-   .select-container
        //-     v-select.select(
        //-       v-model="user.status",
        //-       label="name",
        //-       index="name",
        //-       :options="statuses",
        //-       :clearable="false",
        //-       :searchable="false",
        //-       @input="changeUserStatus(user)",
        //-       :disabled="user.status == 'Подтвержден'"
        //-     )
        //-       template(v-slot:option="option")
        //-         span.select-option {{ option.name }}
        //- td.limit(:class="{ 'form-block_error': userLimitError(user) != '' }")
        //-   input.form-input(
        //-     type="text",
        //-     v-model="user.limit",
        //-     v-mask="'####'",
        //-     @focusout="changeUserLimit(user)"
        //-   )
        //-   .form-error(v-if="userLimitError(user) != ''") {{ userLimitError(user) }}
        //- td.no-order.form-block.account-form__block.account-form__block__checkbox
        //-   input.form-input.account-form__checkbox(
        //-     type="checkbox",
        //-     :id="`account-checkbox-${user.id}`",
        //-     @change.prevent="toggleCalendar(user)"
        //-   )
        //-   label.form-label(
        //-     :for="`account-checkbox-${user.id}`",
        //-     :class="{ 'form-label__checkbox_active': !user.order }"
        //-   ) Не заказывать
        //- td.no-order.form-block.account-form__block.account-form__block__calendar(
        //-   :class="[calendarClass(user.id), { 'form-block_disabled': user.order, 'form-block_error': calendarError(user) != '' }]"
        //- )
        //-   label.form-label(@click.prevent="showCalendar(user)") Начало и окончание периода
        //-   .inputs-container
        //-     input.form-input(
        //-       type="text",
        //-       :id="`account-date-start-${user.id}`",
        //-       v-mask="'##.##.####'",
        //-       v-model.trim="user.inputsDates.start",
        //-       @focus="showCalendar(user)",
        //-       @focusout="checkInputs(user)",
        //-       ,
        //-       :disabled="user.order"
        //-     )
        //-     .account-form__separator
        //-     input.form-input(
        //-       type="text",
        //-       :id="`account-date-end-${user.id}`",
        //-       v-mask="'##.##.####'",
        //-       v-model.trim="user.inputsDates.end",
        //-       @focus="showCalendar(user)",
        //-       @focusout="checkInputs(user)",
        //-       ,
        //-       :disabled="user.order"
        //-     )
        //-   FunctionalCalendar.calendar.account-form__calendar(
        //-     :id="`account-form__calendar-${user.id}`",
        //-     v-model="user.calendarDates",
        //-     :configs="calendarConfig2"
        //-   )
        //-   .form-error(v-if="calendarError(user) != ''") {{ calendarError(user) }}
        td.delete
          button.btn(@click.prevent="deleteUser(user.id)") Удалить
    button.users-btn(@click.prevent="showPopup = true") +

      //- button.form-submit(type="submit") Сохранить изменения

  .overlay(v-if="showPopup")
    form.form.popup.popup-admin(action="#", @submit.prevent="checkForm()")
      .form-title Добавление пользователя
      .form-inputs
        .form-block(:class="{ 'form-block_error': surnameError != '' }")
          label.form-label(for="account-surname") Фамилия
          input#account-surname.form-input(
            type="text",
            v-model.trim="surname",
            v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
            @focusout="checkSurname()"
          )
          .form-error(v-if="surnameError != ''") {{ surnameError }}
        .form-block(:class="{ 'form-block_error': nameError != '' }")
          label.form-label(for="account-name") Имя
          input#account-name.form-input(
            type="text",
            v-model.trim="name",
            v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
            @focusout="checkName()"
          )
          .form-error(v-if="nameError != ''") {{ nameError }}
        .form-block(:class="{ 'form-block_error': middlenameError != '' }")
          label.form-label(for="account-middlename") Отчество (не обязательно)
          input#account-middlename.form-input(
            type="text",
            v-model.trim="middlename",
            v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
            @focusout="checkMiddlename()"
          )
          .form-error(v-if="middlenameError != ''") {{ middlenameError }}
        .form-block(:class="{ 'form-block_error': emailError != '' }")
          label.form-label(for="account-email") Корпоративная почта SmartWorld
          input#account-email.form-input(
            type="text",
            placeholder="@smartworld.team",
            v-model.trim="email",
            v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'",
            @focusout="checkEmail()"
          )
          .form-error(v-if="emailError != ''") {{ emailError }}
        .form-block.form-block_last
          label.form-label.form-label__role Роль пользователя
          .select-container
            v-select.select(
              v-model="role",
              label="name",
              index="name",
              :options="roles",
              :clearable="false",
              :searchable="false"
            )
              template(v-slot:option="option")
                span.select-option {{ option.name }}
        .form-block.form-block_last(
          :class="{ 'form-block_error': limitError != '' }"
        )
          //- label.form-label(for="account-limit") Лимит заказа
          //- .form-block__line
          //-   input#account-limit.form-input(
          //-     type="text",
          //-     v-model.trim="limit",
          //-     v-mask="'#####'",
          //-     @focusout="checkLimit()"
          //-   )
          //-   span Р
          //- .form-error(v-if="limitError != ''") {{ limitError }}
        //- .form-block.form-block-line(:class="{'form-block_error': limitError != ''}")
        //-   .form-block__item
        //-     label.form-label Роль пользователя
        //-     .select-container
        //-       v-select.select(v-model="role", label="name", index="name", :options="roles", :clearable="false", :searchable="false")
        //-         template(v-slot:option="option")
        //-           span.select-option {{ option.name }}
        //-   .form-block__item
        //-     label.form-label(for="account-limit") Лимит заказа
        //-     .form-block__line
        //-       input.form-input(type="text", id="account-limit", v-model.trim="limit", v-mask="'#####'", @focusout="checkLimit()")
        //-       span Р
        //-   .form-error(v-if="limitError != ''") {{ limitError }}
        //- .form-block(:class="{'form-block_error': passwordError != ''}")
        //-   label.form-label(for="account-password") Пароль
        //-   .form-password
        //-     input.form-input(type="password", id="account-password", v-model.trim="password", @focusout="checkPassword()")
        //-     button.form-password__eye(v-if="passwordFocus && !passwordShow", @click.prevent="togglePasswordShow()")
        //-       img(src="../assets/img/eye.svg", alt="Eye")
        //-     button.form-password__eye(v-if="passwordFocus && passwordShow", @click.prevent="togglePasswordShow()")
        //-       img(src="../assets/img/eye-closed.svg", alt="Closed eye")
        //-   .form-error(v-if="passwordError != ''") {{ passwordError }}
      button.form-submit(type="submit", :disabled="errors") Добавить пользователя
      button.popup-close(@click.prevent="hidePopup()") &times;
</template>

<script>
export default {
  data() {
    return {
      showPopup: false

    }
  },

  methods:{
    hidePopup() {
      this.showPopup = false
    }
  },

  computed: {
    users() {
      return this.$store.getters.users
    }

  },

  created() {
    this.$store.dispatch('LOAD_USERS').catch(err => {
      console.log("Users loader rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          { msg: `Ошибка при загрузке пользователей: ${err.message}`, err: true }
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/sass/vars"

.admin
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
          text-align: left

      .login
        width: 170px
      
      .name
        width: 170px

      .phone
        width: 140px
        text-align: center

      .role
        width: 140px

      .status
        width: 140px

      // .limit
      //   width: 70px

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