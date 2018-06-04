import * as actions from './actions'
import { mutations } from './mutations'
import * as getters from './getters'

export const BoardStore = {
  state: {
    userBoards: [],
    boards: []
  },
  getters,
  mutations,
  actions
}
