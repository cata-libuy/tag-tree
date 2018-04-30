import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export const getLinks = ({ commit, state }) => {
Vue.http.get('data/links.json')
  .then(
    (res) => {
      if (res.body) {
        commit('SET_LINKS', { links: res.body })
      }
      console.log('links', res.body)
    },
    (err) => console.log(err)
  )
}
