import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import { mutations } from './mutations'
import * as getters from './getters'
import {AuthStore }from './auth/'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    collections: [],
    links: [],
    selectedTag: null
  },
  actions,
  mutations,
  getters,
  modules: {
    AuthStore
  }
})

export default store
