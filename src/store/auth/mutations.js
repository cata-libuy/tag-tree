export const mutations = {
  ['SET_USER'] (state, { user }) {
    state.user = null
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
    console.log('user setted', state.user)
  },
  ['SET_REGISTER_ERROR'] (state, { message }) {
    state.registerError = message
  },
  ['SET_LOGIN_ERROR'] (state, { message }) {
    state.loginError = message
  }
}
