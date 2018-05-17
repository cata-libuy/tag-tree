import * as actions from './actions'
import { mutations } from './mutations'
import * as getters from './getters'

export const AuthStore = {
  state: {
    user: null,
    registerError: null,
    loginError: null
  },
  getters,
  mutations,
  actions
}
