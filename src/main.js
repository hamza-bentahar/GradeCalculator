import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-ls'
/* eslint-disable */

require('./assets/sass/main.scss');

Vue.use(VueLocalStorage)
Vue.config.productionTip = false

Event = new Vue()
new Vue({
  render: h => h(App)
}).$mount('#app')
