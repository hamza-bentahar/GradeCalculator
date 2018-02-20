import Vue from 'vue'
import App from './App.vue'
/* eslint-disable */

require('./assets/sass/main.scss');

Vue.config.productionTip = false

Event = new Vue()
new Vue({
  render: h => h(App)
}).$mount('#app')
