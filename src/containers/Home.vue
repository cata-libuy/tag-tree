<template lang="pug">
  .home
    h1 Home
    h2 Tus Colecciones
    board-list(:boards="userBoards")
</template>

<script>
import BoardList from '../components/boardList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    BoardList
  },
  computed: {
    ...mapGetters(['userBoards', 'user'])
  },
  methods: {
    ...mapActions(['getUserBoards'])
  },
  watch: {
    user () {
      if (this.user) {
        this.getUserBoards(this.user)
      }
    }
  },
  created () {
    if (this.user) {
      this.getUserBoards(this.user)
    }
  }
}
</script>

<style lang="css">
</style>
