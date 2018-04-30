import * as actions from './actions'
import { mutations } from './mutations'
import * as getters from './getters'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    links: []
  },
  actions,
  mutations,
  getters
})

export default store
