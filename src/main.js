import Vue from 'vue'
import VueD3 from 'vue-d3'
import App from './App.vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { routes } from './config/routes'

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(VueD3)
Vue.use(Vuelidate)

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
