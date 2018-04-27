import Vue from 'vue'
import VueD3 from 'vue-d3'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueD3)

new Vue({
  render: h => h(App)
}).$mount('#app')
