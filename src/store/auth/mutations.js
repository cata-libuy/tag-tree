export const mutations = {
  ['SET_USER'] (state, { user }) {
    console.log('mutation SET_USER', user)
    state.user = null
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  ['SET_REGISTER_ERROR'] (state, { message }) {
    state.registerError = message
  },
  ['SET_LOGIN_ERROR'] (state, { message }) {
    state.loginError = message
  }
}
