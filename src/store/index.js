import Vuex from 'vuex'
import Vue from 'vue'

import app from './modules/app'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  modules: {
    app
  }
})
