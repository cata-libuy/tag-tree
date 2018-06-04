<template lang="pug">
.board-list
  h1 Colecciones
  b-button(size="md", @click="openCreateModal") Crear
  b-card-group(columns)
      b-card.board-card(v-for="board in boards", :title="board.name")
        p {{ board.description }}
        b-button(variant="primary", :to="{ name: 'Board', params: { boardId: board._id } }") Ver
        b-button(variant="danger", size="sm", @click="showDeleteModal(board)") Eliminar

  //- Modal Eliminar
  b-modal(ref="deleteBoardModal", title="Eliminar Colección", @ok="deleteSelectedBoard")
    p ¿Seguro que deseas eliminar esta colección?
    p ¡Se perderán todos sus links también!
  //- Modal Crear
  board-form(:show="showCreate", action="create", :callback="createCallback")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BoardForm from '../components/BoardForm'
export default {
  name: 'BoardList',
  props: ['boards'],
  components: {
    BoardForm
  },
  data () {
    return {
      selectedBoard: null,
      showCreate: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['deleteBoard']),
    showDeleteModal (board) {
      this.selectedBoard = board
      this.$refs.deleteBoardModal.show()
    },
    deleteSelectedBoard () {
      this.deleteBoard({ user: this.user, boardId: this.selectedBoard._id})
      this.selectedBoard = null
    },
    openCreateModal () {
      this.showCreate = true
    },
    createCallback () {
      this.showCreate = false
    }
  }
}
</script>

<style lang="scss">
.board-list {
  width: 80%;
  margin: 20px auto;
}
</style>
