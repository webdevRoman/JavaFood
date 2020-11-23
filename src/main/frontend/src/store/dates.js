export default {
  state: {
    date: '',
    weekdays: []
  },
  mutations: {
    SET_DATE(state, date) {
      state.date = date
    },
    SET_WEEKDAYS(state, startDate) {
      function formatDate (date) {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        if (day.toString().length < 2)
          day = '0' + day.toString()
        if (month.toString().length < 2)
          month = '0' + month.toString()
        return `${year.toString()}.${month}.${day}`
      }
      let weekdays = []
      for (let i = 0; i < 8; i++) {
        const nextDay = new Date(startDate)
        nextDay.setDate(nextDay.getDate() + i)
        let day, date, month, weekdayObj
        switch (nextDay.getDay()) {
          case 1:
            day = 'Понедельник'
            break;
          case 2:
            day = 'Вторник'
            break;
          case 3:
            day = 'Среда'
            break;
          case 4:
            day = 'Четверг'
            break;
          case 5:
            day = 'Пятница'
            break;
          case 6:
            day = 'Суббота'
            break;
          case 0:
            day = 'Воскресенье'
            break;
          default:
            break;
        }
        date = nextDay.getDate()
        switch (nextDay.getMonth()) {
          case 0:
            month = 'Января'
            break;
          case 1:
            month = 'Февраля'
            break;
          case 2:
            month = 'Марта'
            break;
          case 3:
            month = 'Апреля'
            break;
          case 4:
            month = 'Мая'
            break;
          case 5:
            month = 'Июня'
            break;
          case 6:
            month = 'Июля'
            break;
          case 7:
            month = 'Августа'
            break;
          case 8:
            month = 'Сентября'
            break;
          case 9:
            month = 'Октября'
            break;
          case 10:
            month = 'Ноября'
            break;
          case 11:
            month = 'Декабря'
            break;
          default:
            break;
        }
        weekdayObj = { day: day, date: date, month: month, fullDate: formatDate(nextDay) }
        weekdays.push(weekdayObj)
      }
      state.weekdays = weekdays
    }
  },
  actions: {
    SET_DATE({commit}, date) {
      commit('SET_DATE', date)
    },
    SET_WEEKDAYS({commit}, startDate) {
      commit('SET_WEEKDAYS', startDate)
    }
  },
  getters: {
    date: (state) => state.date,
    weekdays: (state) => state.weekdays
  }
}