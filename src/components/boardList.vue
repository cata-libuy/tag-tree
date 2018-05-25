<template lang="pug">
.board-list
  b-card-group(columns)
      b-card(v-for="board in boards", :title="board.name", img-src="/img/placeholder_600x400.svg")
        router-link(:to="{ name: 'Board', params: { boardId: board._id } }")
          b-button Go
</template>

<script>
export default {
  name: 'BoardList',
  props: ['boards']
}
</script>

<style lang="scss">
.board-list {
  width: 80%;
  margin: 20px auto;
}
</style>
