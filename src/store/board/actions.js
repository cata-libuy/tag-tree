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

export const deleteBoard = ({ commit, state }, params = { user: null, boardId: null }) => {
  console.log('action deleteBoard', params)
  if (params.user && params.boardId) {
    Vue.http.delete(`${BASE_API}user/${params.user._id}/board/${params.boardId}`, { headers: { Authorization: `Bearer ${params.user.token}` } })
      .then(
        (response) => {
          console.log('deleted', response)
          getUserBoards({ commit, state }, params.user)
        },
        (err) => {
          console.log('error deleting board', err)
        }
      )
  }
}

export const createBoard = ({ commit, state }, params = { name: null, description: '' }) => {
  console.log('action createBoard', params)
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && params.name) {
    Vue.http.post(`${BASE_API}user/${user._id}/board/`, params, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(
        (response) => {
          console.log('created', response)
          getUserBoards({ commit, state }, user)
        },
        (err) => {
          console.log('error creating board', err)
        }
      )
  }
}
