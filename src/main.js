import Vue from 'vue'
import App from './App.vue'
import VueLocalStorage from 'vue-ls'
import VueAnalytics from 'vue-analytics'
/* eslint-disable */

require('./assets/sass/main.scss');

Vue.use(VueLocalStorage)
Vue.use(VueAnalytics, {
  id: 'UA-117158565-1'
})
Vue.config.productionTip = false

Event = new Vue()
new Vue({
  render: h => h(App)
}).$mount('#app')
