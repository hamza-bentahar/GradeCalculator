import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-ls'
import Toasted from 'vue-toasted'
import store from './store'

// eslint-disable-next-line no-undef
require('./assets/sass/main.scss')
import './assets/css/font-awesome.min.css'

Vue.use(Toasted)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

// eslint-disable-next-line no-global-assign
Event = new Vue()
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
