import Vuex from 'vuex'
import Vue from "vue"


Vue.use(Vuex)
const state = {
  test: "Hello World"
}
const getters = {}
const mutations = {}
const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
