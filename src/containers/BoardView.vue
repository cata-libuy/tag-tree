<template lang="pug">
.board-view(v-if="boardData")
  h1 {{ boardData.board.name }}
  force-component(:tagsData="tagsData")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ForceComponent from '../components/ForceComponent'

export default {
  name: 'BoardView',
  components: {
    'force-component': ForceComponent
  },
  computed: {
    ...mapGetters(['user', 'boardById', 'tagsDataForBoard']),
    boardData () {
      return this.boardById(this.$route.params.boardId)
    },
    tagsData () {
      return this.tagsDataForBoard(this.$route.params.boardId)
    }
  },
  methods: {
    ...mapActions(['getUserBoard'])
  },
  created () {
    const boardId = this.$route.params.boardId
    if (boardId) {
      this.getUserBoard({ user: this.user, boardId: this.$route.params.boardId })
    } else {
      console.log('no board id')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
