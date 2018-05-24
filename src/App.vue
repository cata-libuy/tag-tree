<template lang="pug">
#app
  main-nav
  add-link
  router-view
</template>

<script>
import MainNav from './components/nav'
import AddLink from './components/addLink'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    MainNav,
    AddLink
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user: function () {
      if (!this.user) {
        this.$router.push('/login')
      }
    },
    $route: function (to, from) {
      if (to.meta.requireAuth && !this.user) {
        return this.$router.push('/login')
      }
      if (!to.meta.requireAuth && this.user) {
        return this.$router.push('/')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
