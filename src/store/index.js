import Vuex from 'vuex'
import Vue from "vue"
import VuexPersistence from 'vuex-persist'
import mutations from "./mutations"
import actions from "./actions"
import state from "./state"
import getters from "./getters"

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})

export default store
