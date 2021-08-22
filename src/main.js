import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-ls'
import Toasted from 'vue-toasted'
/* eslint-disable */

require('./assets/sass/main.scss')
import './assets/css/font-awesome.min.css'

Vue.use(Toasted)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

Event = new Vue()
new Vue({
  render: h => h(App)
}).$mount('#app')
