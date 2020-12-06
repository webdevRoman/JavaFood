<template lang="pug">
  .company Company info
</template>

<script>
export default {

  beforeCreate() {
    this.$store.dispatch('CHECK_AUTHORIZED').catch(err => {
      console.log("Authorization checker rejected: " + err.message)
      this.$store.dispatch(
          'SET_NOTIFICATION',
          {msg: `Ошибка проверки авторизации: ${err.message}`, err: true}
      )
      setTimeout(() => {
        this.$store.dispatch('SET_NOTIFICATION', {msg: '', err: false})
      }, 5000)
    })
  }

}
</script>

<style scoped>

</style>