<template lang="pug">
  b-navbar(toggleable="sm", type="dark", variant="info")
    b-navbar-toggle(target="nav_collapse")
    b-navbar-brand(to="/") TreeTag
    b-collapse(is-nav, id="nav_collapse")
      //- left aligned
      //- b-navbar-nav
      //-  b-nav-item(to="/") Home

      //- right aligned
      b-navbar-nav.ml-auto
        b-nav-item-dropdown(right, v-if="user")
          template(slot="button-content")
            em {{ user.email }}
          b-dropdown-item(@click="logout()") logout
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MainNav',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="css">
</style>
