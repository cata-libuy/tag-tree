import Vue from 'vue'
import VueResource from 'vue-resource'
import settings from '../../config/settings'

Vue.use(VueResource)
const BASE_API = settings.baseApi

export const getUserBoards = ({ commit, state }) => {
  if (state.user) {
    Vue.http.get(`${BASE_API}user/${state.user._id}/board`, { headers: { Authorization: `Bearer ${state.user.token}` } })
      .then(
        (response) => {
          console.log('user boards', response)
        },
        (err) => {
          console.log('error receiving boards', err)
        }
      )
  }
}
