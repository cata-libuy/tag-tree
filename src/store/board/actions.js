import Vue from 'vue'
import VueResource from 'vue-resource'
import settings from '../../config/settings'

Vue.use(VueResource)
const BASE_API = settings.baseApi

export const getUserBoards = ({ commit, state }, user) => {
  console.log('action getUserBoards', user)
  if (user) {
    Vue.http.get(`${BASE_API}user/${user._id}/board`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(
        (response) => {
          console.log('user boards', response.body)
          commit('SET_USER_BOARDS', { boards: response.body.boards })
        },
        (err) => {
          console.log('error receiving boards', err)
        }
      )
  }
}
