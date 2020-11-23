<template lang="pug">
.admin
  .admin-sidebar
    button.admin-sidebar__btn(:class="{'admin-sidebar__btn_active': chosenSection == 'docs'}", @click.prevent="chosenSection = 'docs'")
      <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.9398 6.8985L22.1979 0.276947C22.0171 0.0994492 21.7739 0 21.5203 0H4.47577C2.48679 0 0.868408 1.61813 0.868408 3.60736V29.3926C0.868408 31.3816 2.48653 33 4.47577 33H25.6217C27.6107 33 29.229 31.3819 29.229 29.3926V7.58835C29.229 7.32877 29.1248 7.08028 28.9398 6.8985V6.8985ZM22.4871 3.2715L25.8981 6.62155H22.7946C22.6251 6.62155 22.4871 6.48358 22.4871 6.31414V3.2715ZM25.6217 31.0664H4.47577C3.55303 31.0664 2.802 30.3156 2.802 29.3926V3.60736C2.802 2.68437 3.55278 1.93359 4.47577 1.93359H20.5538V6.31414C20.5538 7.54983 21.5591 8.55515 22.7948 8.55515H27.2954V29.3926C27.2954 30.3156 26.5447 31.0664 25.6217 31.0664V31.0664Z" fill="#ffffff"/>
        <path d="M23.2124 15.3398H9.58362C9.04961 15.3398 8.61682 15.7726 8.61682 16.3066C8.61682 16.8406 9.04961 17.2734 9.58362 17.2734H23.2124C23.7464 17.2734 24.1792 16.8406 24.1792 16.3066C24.1792 15.7726 23.7464 15.3398 23.2124 15.3398Z" fill="#ffffff"/>
        <path d="M9.58362 21.1406H20.6962C21.2302 21.1406 21.663 20.7078 21.663 20.1738C21.663 19.6398 21.2302 19.207 20.6962 19.207H9.58362C9.04961 19.207 8.61682 19.6398 8.61682 20.1738C8.61682 20.7078 9.04961 21.1406 9.58362 21.1406V21.1406Z" fill="#ffffff"/>
        <path d="M22.0369 23.0742H9.58362C9.04961 23.0742 8.61682 23.507 8.61682 24.041C8.61682 24.575 9.04961 25.0078 9.58362 25.0078H22.0369C22.5707 25.0078 23.0037 24.575 23.0037 24.041C23.0037 23.507 22.5707 23.0742 22.0369 23.0742Z" fill="#ffffff"/>
      </svg>
    button.admin-sidebar__btn(:class="{'admin-sidebar__btn_active': chosenSection == 'users'}", @click.prevent="chooseUsersSection()")
      <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.3803 17.7813C14.4145 17.7813 14.4487 17.7813 14.4897 17.7813C14.5033 17.7813 14.517 17.7813 14.5307 17.7813C14.5512 17.7813 14.5785 17.7813 14.599 17.7813C16.6013 17.7472 18.2209 17.0433 19.4168 15.697C22.0477 12.7312 21.6104 7.64693 21.5626 7.16173C21.3917 3.51936 19.6696 1.77677 18.2482 0.963554C17.189 0.355353 15.9521 0.0273349 14.5717 0H14.5238C14.517 0 14.5033 0 14.4965 0H14.4555C13.697 0 12.2072 0.123007 10.779 0.936219C9.34387 1.74943 7.59444 3.49203 7.4236 7.16173C7.37576 7.64693 6.93841 12.7312 9.56939 15.697C10.7585 17.0433 12.378 17.7472 14.3803 17.7813ZM9.2482 7.33257C9.2482 7.31207 9.25504 7.29157 9.25504 7.2779C9.48055 2.37813 12.9589 1.85194 14.4487 1.85194H14.476C14.4897 1.85194 14.5102 1.85194 14.5307 1.85194C16.3758 1.89294 19.5124 2.64465 19.7243 7.2779C19.7243 7.29841 19.7243 7.31891 19.7311 7.33257C19.738 7.38041 20.2163 12.0273 18.0432 14.4738C17.1821 15.4442 16.0341 15.9226 14.5238 15.9362C14.5102 15.9362 14.5033 15.9362 14.4897 15.9362C14.476 15.9362 14.4692 15.9362 14.4555 15.9362C12.9521 15.9226 11.7972 15.4442 10.943 14.4738C8.77668 12.041 9.24137 7.37358 9.2482 7.33257Z" fill="#ffffff"/>
        <path d="M28.533 26.2141C28.533 26.2072 28.533 26.2004 28.533 26.1936C28.533 26.1389 28.5262 26.0842 28.5262 26.0227C28.4852 24.6696 28.3963 21.5056 25.4305 20.4942C25.41 20.4874 25.3827 20.4806 25.3622 20.4737C22.2802 19.6879 19.7175 17.9111 19.6902 17.8906C19.2733 17.5968 18.6993 17.6993 18.4054 18.1161C18.1116 18.533 18.2141 19.107 18.631 19.4009C18.7471 19.4829 21.4669 21.3758 24.8701 22.2505C26.4624 22.8177 26.6401 24.5193 26.6879 26.0774C26.6879 26.1389 26.6879 26.1936 26.6947 26.2482C26.7016 26.8633 26.6606 27.8132 26.5512 28.3599C25.4442 28.9886 21.1048 31.1617 14.5034 31.1617C7.92936 31.1617 3.56262 28.9817 2.44872 28.353C2.33939 27.8063 2.29155 26.8564 2.30522 26.2414C2.30522 26.1867 2.31205 26.1321 2.31205 26.0706C2.35989 24.5125 2.53756 22.8109 4.12982 22.2437C7.53301 21.369 10.2528 19.4692 10.369 19.394C10.7859 19.1002 10.8884 18.5261 10.5945 18.1093C10.3007 17.6924 9.72663 17.5899 9.30977 17.8838C9.28244 17.9043 6.73346 19.681 3.63779 20.4669C3.61046 20.4737 3.58996 20.4806 3.56945 20.4874C0.603622 21.5056 0.514784 24.6696 0.473782 26.0159C0.473782 26.0774 0.473781 26.1321 0.466948 26.1867C0.466948 26.1936 0.466948 26.2004 0.466948 26.2072C0.460114 26.5626 0.453281 28.3872 0.815467 29.3029C0.883804 29.4806 1.00681 29.6309 1.17082 29.7334C1.37583 29.8701 6.28927 32.9999 14.5102 32.9999C22.7312 32.9999 27.6446 29.8633 27.8496 29.7334C28.0068 29.6309 28.1367 29.4806 28.205 29.3029C28.5467 28.394 28.5398 26.5694 28.533 26.2141Z" fill="#ffffff"/>
      </svg>
    router-link.admin-sidebar__btn(tag="button", to="/")
      <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.4531 6.49997H11.4844V1.57809C11.4844 1.14591 11.2465 0.748816 10.8654 0.544909C10.4844 0.341003 10.0221 0.363327 9.66246 0.603034L0.521836 6.69678C0.19582 6.91411 0 7.28003 0 7.67184C0 8.06366 0.19582 8.42958 0.521836 8.6469L9.66246 14.7407C10.0226 14.9807 10.4849 15.0024 10.8654 14.7988C11.2465 14.5949 11.4844 14.1978 11.4844 13.7656V8.84372H19.4531C23.9763 8.84372 27.6562 12.5236 27.6562 17.0468C27.6562 21.57 23.9763 25.25 19.4531 25.25C18.8059 25.25 18.2812 25.7746 18.2812 26.4218C18.2812 27.0691 18.8059 27.5937 19.4531 27.5937C25.2687 27.5937 30 22.8624 30 17.0468C30 11.2313 25.2687 6.49997 19.4531 6.49997ZM9.14062 11.5759L3.28453 7.67184L9.14062 3.76774V11.5759Z" fill="#ffffff"/>
      </svg>
  .admin-main.admin-docs(v-if="chosenSection == 'docs'")
    .docs-container
      form.docs-block(action="#", @submit.prevent="downloadOrders()")
        .docs-block__title Скачать лист заказов
        div
          .form-block.docs-block__block.docs-block__block__calendar
            label.form-label(@click.prevent="showCalendarDocs()") Выберите дату
            input.form-input(type="text", id="orders-date", v-mask="'##.##.####'", v-model.trim="inputDate", @focus="showCalendarDocs()", @focusout="checkInput()")
            FunctionalCalendar.calendar.account-form__calendar(id="account-form__calendar", v-model="calendarDate", :configs="calendarConfig")
          button.form-submit(type="submit") Скачать
      form.docs-block(action="#", @submit.prevent="downloadLimits()")
        .docs-block__title Скачать лист превышений лимита
        div
          .select-container
            v-select.select(v-model="selectedMonth", label="name", index="name", :options="months", :clearable="false", :searchable="false")
              template(v-slot:option="option")
                span.select-option {{ option.name }}
          button.form-submit(type="submit") Скачать
  .admin-main.admin-users(v-if="chosenSection == 'users'")
    //- form.users-container(action="#", @submit.prevent="saveChanges()")
    .users-container
      .users-title Управление пользователями
      table.users-table
        tr.users-table__header
          th.name Фамилия и имя
          th.email Почта
          th.role Роль
          th.status Статус учетной записи
          th.limit Лимит
          th(colspan="3")
        tr.users-table__line(v-for="user in users")
          //- td.name {{ user.firstname }} {{ user.midname }} {{ user.lastname }}
          td.name {{ user.firstname }} {{ user.lastname }}
          td.email {{ user.email }}
          td.role
            .select-container
              v-select.select(v-model="user.role", label="name", index="name", :options="roles", :clearable="false", :searchable="false", @input="changeUserRole(user)")
                template(v-slot:option="option")
                  span.select-option {{ option.name }}
          td.status
            .select-container
              v-select.select(v-model="user.status", label="name", index="name", :options="statuses", :clearable="false", :searchable="false", @input="changeUserStatus(user)", :disabled="user.status == 'Подтвержден'")
                template(v-slot:option="option")
                  span.select-option {{ option.name }}
          td.limit(:class="{'form-block_error': userLimitError(user) != ''}")
            input.form-input(type="text", v-model="user.limit", v-mask="'####'", @focusout="changeUserLimit(user)")
            .form-error(v-if="userLimitError(user) != ''") {{ userLimitError(user) }}
          td.no-order.form-block.account-form__block.account-form__block__checkbox
            input.form-input.account-form__checkbox(type="checkbox", :id="`account-checkbox-${user.id}`", @change.prevent="toggleCalendar(user)")
            label.form-label(:for="`account-checkbox-${user.id}`", :class="{'form-label__checkbox_active': !user.order}") Не заказывать
          td.no-order.form-block.account-form__block.account-form__block__calendar(:class="[calendarClass(user.id), {'form-block_disabled': user.order, 'form-block_error': calendarError(user) != ''}]")
            label.form-label(@click.prevent="showCalendar(user)") Начало и окончание периода
            .inputs-container
              input.form-input(type="text", :id="`account-date-start-${user.id}`", v-mask="'##.##.####'", v-model.trim="user.inputsDates.start", @focus="showCalendar(user)", @focusout="checkInputs(user)", , :disabled="user.order")
              .account-form__separator
              input.form-input(type="text", :id="`account-date-end-${user.id}`", v-mask="'##.##.####'", v-model.trim="user.inputsDates.end", @focus="showCalendar(user)", @focusout="checkInputs(user)", , :disabled="user.order")
            FunctionalCalendar.calendar.account-form__calendar(:id="`account-form__calendar-${user.id}`", v-model="user.calendarDates", :configs="calendarConfig2")
            .form-error(v-if="calendarError(user) != ''") {{ calendarError(user) }}
          td.delete
            button.btn(@click.prevent="deleteUser(user.id)") Удалить
      button.users-btn(@click.prevent="showPopup = true") +
      .users-bottom
        .form-block
          label.form-label(for="users-limit") Установить лимит всем пользователями
          .form-block__line
            input.form-input(type="text", v-model.trim="allLimit", v-mask="'#####'", @change="setAllLimit()")
            span Р
        //- button.form-submit(type="submit") Сохранить изменения

  .overlay(v-if="showPopup")
    form.form.popup.popup-admin(action="#", @submit.prevent="checkForm()")
      .form-title Добавление пользователя
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
      chosenSection: 'docs',
      calendarConfig: {
        isDatePicker: true,
        dateFormat: 'yyyy.mm.dd',
        disabledDates: ['afterToday'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonthNames: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        limits: { min: this.getLimitDates().min, max: this.getLimitDates().max },
        applyStylesheet: false
      },
      calendarConfig2: {
        isDateRange: true,
        dateFormat: 'yyyy.mm.dd',
        disabledDates: ['beforeToday'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        shortMonthNames: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        limits: { min: this.getTodayDate(), max: '3030.12.31' },
        applyStylesheet: false
      },
      inputDate: '',
      calendarDate: { selectedDate: '' },
      selectedMonth: 'Выберите месяц',
      selectedRole: '',
      roles: ['Пользователь', 'Администратор'],
      selectedStatus: '',
      statuses: ['Не подтвержден', 'Подтвержден'],
      allLimit: '',
      showPopup: false,
      name: '',
      nameError: '',
      surname: '',
      surnameError: '',
      middlename: '',
      middlenameError: '',
      email: '',
      emailError: '',
      // password: '',
      // passwordError: '',
      // passwordFocus: false,
      // passwordShow: false,
      role: 'Пользователь',
      limit: '',
      limitError: ''
    }
  },
  methods: {
    chooseUsersSection() {
      this.chosenSection = 'users'
      this.$store.dispatch('LOAD_USERS')
      .catch(err => {
        console.log('Error on loading users: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },

    getLimitDates() {
      const date = new Date()
      return { min: `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`, max: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}` }
    },
    showCalendarDocs() {
      const calendar = document.getElementById('account-form__calendar')
      calendar.classList.add('account-form__calendar_active')
      this.hideCalendarDocs()
    },
    hideCalendarDocs() {
      const calendar = document.getElementById('account-form__calendar')
      function hideOnClickOutsideDocs(e) {
        let a = e.target
        let parentsFlag = false
        while (a) {
          if (a == calendar) {
            parentsFlag = true
            break
          }
          a = a.parentNode
        }
        if(calendar.classList.contains('account-form__calendar_active') && !parentsFlag && !e.target.parentNode.classList.contains('docs-block__block__calendar') && !e.target.classList.contains('docs-block__block__calendar')) {
          calendar.classList.remove('account-form__calendar_active')
          document.removeEventListener('click', hideOnClickOutsideDocs)
        }
      }
      document.addEventListener('click', hideOnClickOutsideDocs)
    },
    checkInput() {
      const input = document.getElementById('orders-date')
      if (input.value.length == 10) {
        let inputArr = input.value.split('.')
        let endDate = new Date()
        let startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)
        if (parseInt(inputArr[2]) < startDate.getFullYear())
          inputArr[2] = startDate.getFullYear()
        if (parseInt(inputArr[2]) > endDate.getFullYear())
          inputArr[2] = endDate.getFullYear()
        if (parseInt(inputArr[1]) < startDate.getMonth() + 1)
          inputArr[1] = startDate.getMonth() + 1
        if (parseInt(inputArr[1]) > endDate.getMonth() + 1)
          inputArr[1] = endDate.getMonth() + 1
        if (inputArr[1].toString().length < 2)
          inputArr[1] = '0' + inputArr[1].toString()
        if (parseInt(inputArr[0]) < startDate.getDate())
          inputArr[0] = startDate.getDate()
        if (parseInt(inputArr[0]) > endDate.getDate())
          inputArr[0] = endDate.getDate()
        if (inputArr[0].toString().length < 2)
          inputArr[0] = '0' + inputArr[0].toString()
        input.value = inputArr.join('.')
        this.calendarDate.selectedDate = this.formatDateCalendar(input.value)
      } else
        this.calendarDate.selectedDate = ''
    },
    downloadOrders() {
      this.$store.dispatch('DOWNLOAD_ORDERS')
      .then(resp => {
        this.$store.dispatch('SET_NOTIFICATION', { msg: 'Скачивание листа заказов', err: false })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      },
      err => {
        console.log('Error on downloading orders list: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    downloadLimits() {
      // this.$store.dispatch('DOWNLOAD_LIMITS')
      // .then(resp => {
      //   this.$store.dispatch('SET_NOTIFICATION', { msg: 'Скачивание листа превышений лимита', err: false })
      //   setTimeout(() => {
      //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      //   }, 5000)
      // },
      // err => {
      //   console.log('Error on saving changes in admin panel: ' + err)
      //   this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
      //   setTimeout(() => {
      //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
      //   }, 5000)
      // })
    },

    changeUserRole(user) {
      this.$store.dispatch('CHANGE_USER_ROLE', user)
      .catch(err => {
        console.log('Error on changing user role: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    changeUserStatus(user) {
      this.$store.dispatch('CHANGE_USER_STATUS', user)
      .catch(err => {
        console.log('Error on changing user status: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    userLimitError(user) {
      if (user.limit != '' && parseInt(user.limit) > 0)
        return ''
      else
        return 'Заполните лимит'
    },
    changeUserLimit(user) {
      user.limit = parseInt(user.limit)
      if (this.userLimitError(user) == '') {
        this.$store.dispatch('CHANGE_USER_LIMIT', { id: user.id, limit: user.limit })
        .catch(err => {
          console.log('Error on changing user limit: ' + err)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        })
      }
    },
    setAllLimit() {
      if (this.allLimit != '') {
        this.allLimit = parseInt(this.allLimit)
        if (this.allLimit != 0) {
          (async () => {
            this.$store.dispatch('SET_PROCESSING', true)
            for (let i = 0; i < this.users.length; i++) {
              const user = this.users[i]
              user.limit = this.allLimit
              await this.$store.dispatch('CHANGE_USER_LIMIT', { id: user.id, limit: this.allLimit })
              .catch(err => {
                console.log('Error on changing user limit: ' + err)
                this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
                setTimeout(() => {
                  this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
                }, 5000)
              })
            }
            this.allLimit = ''
            this.$store.dispatch('SET_PROCESSING', false)
          })()
        }
      }
    },
    calendarError(user) {
      if (user.order || (user.calendarDates.dateRange.start.date != false && user.calendarDates.dateRange.end.date != false && user.inputsDates.start != '' && user.inputsDates.end != ''))
        return ''
      else
        return 'Дни отмены заказа не выбраны'
    },
    toggleCalendar(user) {
      const calendar = document.getElementById(`account-form__calendar-${user.id}`)
      const checkbox = document.getElementById(`account-checkbox-${user.id}`)
      const startInput = document.getElementById(`account-date-start-${user.id}`)
      user.order = !user.order
      checkbox.checked = !checkbox.checked
      if (!user.order) {
        this.showCalendar(user)
        startInput.focus()
        const date = new Date()
        date.setDate(date.getDate() + 1)
        let dateStr = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
        user.calendarDates = {
          dateRange: {
            start: {
              date: dateStr
            },
            end: {
              date: dateStr
            }
          }
        }
        user.inputsDates.start = this.formatDateInputs(dateStr)
        user.inputsDates.end = this.formatDateInputs(dateStr)
        const data = { id: user.id, start: this.formatDateRequest(dateStr), end: this.formatDateRequest(dateStr) }
        this.$store.dispatch('SET_USER_ORDER', data)
        .catch(err => {
          console.log('Error on setting user order denial: ' + err)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
          this.chooseUsersSection()
        })
      } else {
        user.calendarDates = {
          dateRange: {
            start: {
              date: false
            },
            end: {
              date: false
            }
          }
        }
        user.inputsDates.start = ''
        user.inputsDates.end = ''
        calendar.classList.remove('account-form__calendar_active')
        const data = { id: user.id, start: null, end: null }
        this.$store.dispatch('SET_USER_ORDER', data)
        .catch(err => {
          console.log('Error on setting user order denial: ' + err)
          this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
          this.chooseUsersSection()
        })
      }
    },
    calendarClass(id) {
      return `account-form__block__calendar-${id}`
    },
    showCalendar(user) {
      if (!user.order) {
        user.calendarDates = JSON.parse(JSON.stringify(user.calendarDates))
        const calendar = document.getElementById(`account-form__calendar-${user.id}`)
        calendar.classList.add('account-form__calendar_active')
        this.hideCalendar(user)
      }
    },
    hideCalendar(user) {
      const calendar = document.getElementById(`account-form__calendar-${user.id}`)
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
        if(calendar.classList.contains('account-form__calendar_active') && !parentsFlag && !e.target.parentNode.parentNode.classList.contains(`account-form__block__calendar-${user.id}`) && !e.target.parentNode.classList.contains(`account-form__block__calendar-${user.id}`) && !e.target.classList.contains(`account-form__block__calendar-${user.id}`)) {
          if (user.calendarDates.dateRange.start.date.length >= 8 && user.calendarDates.dateRange.start.date.length <= 10)
            user.inputsDates.start = self.formatDateInputs(user.calendarDates.dateRange.start.date)
          if (user.calendarDates.dateRange.end.date.length >= 8 && user.calendarDates.dateRange.end.date.length <= 10)
            user.inputsDates.end = self.formatDateInputs(user.calendarDates.dateRange.end.date)
          if (user.calendarDates.dateRange.start.date.length >= 8 && user.calendarDates.dateRange.start.date.length <= 10 && user.calendarDates.dateRange.end.date.length >= 8 && user.calendarDates.dateRange.end.date.length <= 10) {
            const data = { id: user.id, start: self.formatDateRequest(user.calendarDates.dateRange.start.date), end: self.formatDateRequest(user.calendarDates.dateRange.end.date) }
            self.$store.dispatch('SET_USER_ORDER', data)
            .catch(err => {
              console.log('Error on setting user order denial: ' + err)
              self.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
              setTimeout(() => {
                self.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
              }, 5000)
              self.chooseUsersSection()
            })
          }
          calendar.classList.remove('account-form__calendar_active')
          document.removeEventListener('click', hideOnClickOutside)
        }
      }
      document.addEventListener('click', hideOnClickOutside)
    },
    checkInputs(user) {
      const startInput = document.getElementById(`account-date-start-${user.id}`)
      const endInput = document.getElementById(`account-date-end-${user.id}`)
      if (startInput.value.length == 10) {
        let startInputArr = startInput.value.split('.')
        let date = new Date()
        if (parseInt(startInputArr[2]) < date.getFullYear())
          startInputArr[2] = date.getFullYear()
        date.setFullYear(startInputArr[2])
        if (parseInt(startInputArr[1]) < date.getMonth() + 1) {
          startInputArr[1] = date.getMonth() + 1
          if (startInputArr[1].toString().length < 2)
            startInputArr[1] = '0' + startInputArr[1].toString()
        }
        if (parseInt(startInputArr[1]) > 12)
          startInputArr[1] = 12
        date.setMonth(parseInt(startInputArr[1]) - 1)
        const lastDay = new Date(parseInt(startInputArr[2]), parseInt(startInputArr[1]), 0)
        if (parseInt(startInputArr[0]) < date.getDate() + 1) {
          startInputArr[0] = date.getDate() + 1
          if (startInputArr[0].toString().length < 2)
            startInputArr[0] = '0' + startInputArr[0].toString()
        }
        if (parseInt(startInputArr[0]) > lastDay.getDate())
          startInputArr[0] = lastDay.getDate()
        date.setDate(parseInt(startInputArr[0]))
        startInput.value = startInputArr.join('.')
        user.calendarDates.dateRange.start.date = this.formatDateCalendar(startInput.value)
      } else {
        user.inputsDates.start = endInput.value
        user.calendarDates.dateRange.start.date = this.formatDateCalendar(endInput.value)
        user.inputsDates.end = ''
        user.calendarDates.dateRange.end.date = false
        endInput.value = ''
        // user.calendarDates.dateRange.start.date = false
        // user.inputsDates.start = ''
      }
      if (endInput.value.length == 10) {
        let endInputArr = endInput.value.split('.')
        let date = new Date()
        if (parseInt(endInputArr[2]) < date.getFullYear())
          endInputArr[2] = date.getFullYear()
        date.setFullYear(endInputArr[2])
        if (parseInt(endInputArr[1]) < date.getMonth() + 1) {
          endInputArr[1] = date.getMonth() + 1
          if (endInputArr[1].toString().length < 2)
            endInputArr[1] = '0' + endInputArr[1].toString()
        }
        if (parseInt(endInputArr[1]) > 12)
          endInputArr[1] = 12
        date.setMonth(parseInt(endInputArr[1]) - 1)
        const lastDay = new Date(parseInt(endInputArr[2]), parseInt(endInputArr[1]), 0)
        if (parseInt(endInputArr[0]) < date.getDate() + 1) {
          endInputArr[0] = date.getDate() + 1
          if (endInputArr[0].toString().length < 2)
            endInputArr[0] = '0' + endInputArr[0].toString()
        }
        if (parseInt(endInputArr[0]) > lastDay.getDate())
          endInputArr[0] = lastDay.getDate()
        date.setDate(parseInt(endInputArr[0]))
        endInput.value = endInputArr.join('.')
        user.calendarDates.dateRange.end.date = this.formatDateCalendar(endInput.value)
      } else {
        user.calendarDates.dateRange.end.date = false
        user.inputsDates.end = ''
      }

      if (startInput.value.length == 10 && endInput.value.length == 10) {
        const startDateArr = startInput.value.split('.')
        const endDateArr = endInput.value.split('.')
        if (parseInt(startDateArr[2]) > parseInt(endDateArr[2])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates(user)
        } else if (parseInt(startDateArr[1]) > parseInt(endDateArr[1])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates(user)
        } else if (parseInt(startDateArr[0]) > parseInt(endDateArr[0])) {
          let temp = startInput.value
          startInput.value = endInput.value
          endInput.value = temp
          this.swapDates(user)
        }
      }
    },
    swapDates(user) {
      const inputsTemp = user.inputsDates.start
      user.inputsDates.start = user.inputsDates.end
      user.inputsDates.end = inputsTemp
      const calendarTemp = user.calendarDates.dateRange.start.date
      user.calendarDates.dateRange.start.date = user.calendarDates.dateRange.end.date
      user.calendarDates.dateRange.end.date = calendarTemp
    },
    deleteUser(id) {
      this.$store.dispatch('DELETE_USER', id)
      .catch(err => {
        console.log('Error on deleting user: ' + err)
        this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
        setTimeout(() => {
          this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
        }, 5000)
      })
    },
    getTodayDate() {
      const date = new Date()
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    },
    formatDateInputs(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[2].length < 2)
        dateArr[2] = '0' + dateArr[2]
      if (dateArr[1].length < 2)
        dateArr[1] = '0' + dateArr[1]
      return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
    },
    formatDateCalendar(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[0].length == 2 && dateArr[0][0] == '0')
        dateArr[0] = dateArr[0][1]
      if (dateArr[1].length == 2 && dateArr[1][0] == '0')
        dateArr[1] = dateArr[1][1]
      return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
    },
    formatDateRequest(dateStr) {
      let dateArr = dateStr.split('.')
      if (dateArr[1].length == 1)
        dateArr[1] = '0' + dateArr[1]
      if (dateArr[2].length == 1)
        dateArr[2] = '0' + dateArr[2]
      return dateArr.join('.')
    },
    // saveChanges() {
    //   this.$store.dispatch('SAVE_CHANGES')
    //   // .then(resp => {
    //   //   this.$store.dispatch('SET_NOTIFICATION', { msg: 'Изменения сохранены', err: false })
    //   //   setTimeout(() => {
    //   //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    //   //   }, 5000)
    //   // },
    //   // err => {
    //   //   console.log('Error on saving changes in admin panel: ' + err)
    //   //   this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
    //   //   setTimeout(() => {
    //   //     this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    //   //   }, 5000)
    //   // })
    // },

    checkName() {
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', { type: 'name', data: this.name })
      .then(
        result => {
          if (result == 'empty')
            this.nameError = 'Заполните имя'
          else if (result == 'long')
            this.nameError = 'Имя должно содержать не более 35 символов'
          else if (result == 'wrong')
            this.nameError = 'Имя должно состоять только из букв русского алфавита'
          else
            this.nameError = ''
        },
        error => console.log("Name checker rejected: " + error.message)
      )
    },
    checkSurname() {
      this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', { type: 'surname', data: this.surname })
      .then(
        result => {
          if (result == 'empty')
            this.surnameError = 'Заполните фамилию'
          else if (result == 'long')
            this.surnameError = 'Фамилия должна содержать не более 35 символов'
          else if (result == 'wrong')
            this.surnameError = 'Фамилия должна состоять только из букв русского алфавита'
          else
            this.surnameError = ''
        },
        error => console.log("Name checker rejected: " + error.message)
      )
    },
    checkMiddlename() {
      this.middlename = this.middlename.charAt(0).toUpperCase() + this.middlename.slice(1).toLowerCase()
      this.$store.dispatch('CHECK_NAME', { type: 'middlename', data: this.middlename })
      .then(
        result => {
          if (result == 'long')
            this.middlenameError = 'Отчество должно содержать не более 35 символов'
          else if (result == 'wrong')
            this.middlenameError = 'Отчество должно состоять только из букв русского алфавита'
          else
            this.middlenameError = ''
        },
        error => console.log("Name checker rejected: " + error.message)
      )
    },
    checkEmail() {
      const emailArr = this.email.split('@')
      if (this.email != '' && emailArr[1] == undefined)
        this.email = emailArr[0] + '@smartworld.team'
      this.$store.dispatch('CHECK_EMAIL', this.email)
      .then(
        result => {
          if (result == 'empty')
            this.emailError = 'Заполните e-mail'
          else if (result == 'long')
            this.emailError = 'E-mail должен содержать не более 50 символов'
          // else if (result == 'wrong')
          //   this.emailError = 'Невалидный e-mail'
          else {
            this.emailError = ''
            this.$store.dispatch('CLEAR_ERRORS', 'email')
          }
        },
        error => console.log("Email checker rejected: " + error.message)
      )
    },
    // checkPassword() {
    //   this.$store.dispatch('CHECK_PASSWORD', this.password)
    //   .then(
    //     result => {
    //       if (result == 'empty')
    //         this.passwordError = 'Заполните пароль'
    //       else if (result == 'short')
    //         this.passwordError = 'Пароль должен содержать не менее 6 символов'
    //       else if (result == 'long')
    //         this.passwordError = 'Пароль должен содержать не более 25 символов'
    //       else if (result == 'wrong')
    //         this.passwordError = 'Пароль должен состоять только из латинских букв и цифр'
    //       else
    //         this.passwordError = ''
    //     },
    //     error => console.log("Password checker rejected: " + error.message)
    //   )
    // },
    checkLimit() {
      if (this.limit == '')
        this.limitError = 'Заполните лимит'
      else
        this.limitError = ''
    },
    // togglePasswordShow() {
    //   const passwordInput = document.getElementById('account-password')
    //   if (passwordInput.type == 'password')
    //     passwordInput.type = 'text'
    //   else
    //     passwordInput.type = 'password'
    //   this.passwordShow = !this.passwordShow
    // },
    checkForm() {
      this.checkName()
      this.checkSurname()
      this.checkMiddlename()
      this.checkEmail()
      // this.checkPassword()
      this.checkLimit()
      if (!this.errors) {
        this.$store.dispatch('ADD_USER', { email: this.email, firstname: this.name, lastname: this.surname, midname: this.middlename, role: this.role == 'Администратор' ? 'admin' : 'user', limit: this.limit })
        .then(() => {
          this.hidePopup()
          this.$store.dispatch('SET_NOTIFICATION', { msg: 'Пользователь добавлен', err: false })
          setTimeout(() => {
            this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
          }, 5000)
        },
        err => {
          if (err == 'email') {
            this.$store.dispatch('SET_ERROR', { type: 'email', msg: 'reserved' })
            this.emailError = 'Данная почта уже занята'
          } else {
            console.log('Error on adding user: ' + err)
            this.$store.dispatch('SET_NOTIFICATION', { msg: `Ошибка: ${err}`, err: true })
            setTimeout(() => {
              this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
            }, 5000)
          }
        })
      }
    },
    hidePopup() {
      this.$store.dispatch('CLEAR_ERRORS', 'all')
      this.name = ''
      this.nameError = ''
      this.surname = ''
      this.surnameError = ''
      this.middlename = ''
      this.middlenameError = ''
      this.email = ''
      this.emailError = ''
      this.password = ''
      this.passwordError = ''
      this.passwordFocus = false
      this.passwordShow = false
      this.role = 'Пользователь'
      this.limit = ''
      this.limitError = '',
      this.showPopup = false
    },
    closeNotification() {
      this.$store.dispatch('SET_NOTIFICATION', { msg: '', err: false })
    }
  },
  computed: {
    months() {
      let months = []
      const nextMonthDay = new Date()
      const startYear = nextMonthDay.getFullYear()
      const startMonth = nextMonthDay.getMonth()
      for (let i = 0; i < 12; i++) {
        let currentYear, currentMonth
        if (startMonth - i >= 0) {
          currentYear = startYear
          currentMonth = startMonth - i
        } else {
          currentYear = startYear - 1
          currentMonth = 12 + startMonth - i
        }
        let month
        switch (currentMonth) {
          case 0:
            month = 'Январь'
            break;
          case 1:
            month = 'Февраль'
            break;
          case 2:
            month = 'Март'
            break;
          case 3:
            month = 'Апрель'
            break;
          case 4:
            month = 'Май'
            break;
          case 5:
            month = 'Июнь'
            break;
          case 6:
            month = 'Июль'
            break;
          case 7:
            month = 'Август'
            break;
          case 8:
            month = 'Сентябрь'
            break;
          case 9:
            month = 'Октябрь'
            break;
          case 10:
            month = 'Ноябрь'
            break;
          case 11:
            month = 'Декабрь'
            break;
          default:
            break;
        }
        months.push({ name: month + ' ' + currentYear })
      }
      return months
    },
    users() {
      return this.$store.getters.users
    },
    errors() {
      const errors = this.$store.getters.errors
      // if (errors.email != undefined && errors.email != 'wrong' || errors.password != undefined || errors.name != undefined || errors.surname != undefined || errors.middlename != undefined || this.limit == '')
      if (errors.email != undefined && errors.email != 'wrong' || errors.name != undefined || errors.surname != undefined || errors.middlename != undefined || this.limit == '')
        return true
      else
        return false
    },
    processing() {
      return this.$store.getters.processing
    },
    notification() {
      return this.$store.getters.notification
    }
  },
  watch: {
    calendarDate: {
      handler (value) {
        value = { selectedDate:  value.selectedDate }
        if (value.selectedDate == '')
          this.inputDate = ''
        else
          this.inputDate = this.formatDateInputs(value.selectedDate)
      },
      deep: true
    },
    // password(value) {
    //   if (value != '')
    //     this.passwordFocus = true
    //   else
    //     this.passwordFocus = false
    // }
  }
}
</script>

<style scoped lang="sass">
@import "../assets/sass/vars"

.admin
  display: flex
  justify-content: space-between
  align-items: stretch
  width: 100%
  min-height: 100vh
  &-sidebar
    flex-basis: 75px
    min-height: 100vh
    background-color: $c-dark
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4)
    &__btn
      height: 145px
      padding: 22px
      transition: 0.2s
      svg path
        transition: 0.2s
      &:hover
        background-color: $c-middle
        svg path
          fill: $c-dark
      &_active
        background-color: $c-middle
        svg path
          fill: $c-dark
  &-main
    flex-grow: 1
    display: flex
    justify-content: center
    align-items: center
    min-height: 100vh
    padding: 30px 0
  .docs
    &-container
      display: flex
      justify-content: center
      align-items: stretch
    &-block
      display: flex
      justify-content: space-between
      align-items: center
      flex-direction: column
      width: 360px
      padding: 35px 55px 60px 55px
      background-color: $c-light
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25)
      &:first-child
        margin-right: 90px
      &__title
        font-weight: 500
        font-size: 24px
        line-height: 28px
        text-align: center
        margin-bottom: 80px
      .form-block
        margin-bottom: 75px
      .form-label, .form-input
        display: block
        width: 220px
      .form-submit
        width: 220px
      .select
        width: 220px
        &-container
          margin-bottom: 75px
  .account-form
    &__calendar
      display: none
      position: absolute
      top: calc(100% + 15px)
      left: 50%
      margin-left: -154px
      margin-bottom: 25px
      &_active
        display: block
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
          text-align: center
      .name
        width: 170px
      .email
        width: 140px
        text-align: center
      .role
        width: 140px
      .status
        width: 140px
      .limit
        width: 70px
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
  min-height: 100vh // change!
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