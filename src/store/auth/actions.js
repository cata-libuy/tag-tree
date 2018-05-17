import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const BASE_API = process.env.AUTH_API

export const login = ({ commit, state }, userData) => {
  if (state.loginError) commit('SET_LOGIN_ERROR', { message: null })
  const defaultErrorMessage = 'Error en inicio de sesion'
  if (userData.email && userData.password) {
    Vue.http.post(`${BASE_API}login/`, userData)
      .then(
        (response) => {
          if (response.body.user && response.body.token) {
            const user = response.body.user
            user.token = response.body.token
            commit('SET_USER', { user })
          }
          else {
            let message = defaultErrorMessage
            if (response.body.message && response.body.message === 'Username not found') message = 'Cuenta no existe'
            if (response.body.message && response.body.message === 'Invalid Password') message = 'Password incorrecta'
            commit('SET_LOGIN_ERROR', { message })
          }
        },
        () => {
          commit('SET_LOGIN_ERROR', { message: defaultErrorMessage })
        }
      )
  }
}

export const register = ({ commit, state }, userData) => {
  if (state.registerError) commit('SET_REGISTER_ERROR', { message: null })
  if (userData.email && userData.password) {
    Vue.http.post(`${BASE_API}users/`, userData)
      .then(
        () => {
          login({ commit, state }, userData)
        },
        (error) => {
          if (error.body.invalidAttributes && error.body.invalidAttributes.email && error.body.invalidAttributes.email[0].rule === 'unique') {
            commit('SET_REGISTER_ERROR', { message: 'Ya existe una cuenta con ese email' })
          }
          else {
            commit('SET_REGISTER_ERROR', { message: 'Error en registro' })
          }
        }
      )
  }
}

export const logout = ({ commit }) => {
  commit('SET_USER', { user: null })
}
