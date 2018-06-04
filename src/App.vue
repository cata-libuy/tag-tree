<template lang="pug">
#app
  main-nav
  .app-container
    //- add-link
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
  methods: {
    getUserFromLocal () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  watch: {
    user: function () {
      if (!this.user) {
        this.$router.push('/login')
      }
    },
    $route: function (to) {
      if (to.meta.requireAuth && !this.user) {
        return this.$router.push('/login')
      }
      if (!to.meta.requireAuth && this.user) {
        return this.$router.push('/')
      }
    }
  },
  created () {
    if (!this.user) {
      const user = this.getUserFromLocal()
      console.log('user from storage', user)
      if (!user) {
        this.$router.push('/login')
      } else {
        this.$store.commit('SET_USER', { user })
        console.log('user restored from localStorage')
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .app-container {
    padding-top: 30px;
  }
}
</style>
