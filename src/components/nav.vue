<template lang="pug">
.nav
  a(v-if="user", @click="logout()") logout
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
