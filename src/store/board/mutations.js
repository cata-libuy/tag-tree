export const mutations = {
  ['SET_USER_BOARDS'] (state, { boards }) {
    state.userBoards = boards
  },
  ['SET_BOARD'] (state, { board, references }) {
    const boards = state.boards
    state.boards = null
    boards[board._id] = { board, references }
    state.boards = boards
    console.log('board setted', state.boards[board._id])
  }
}
