import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth.js'
import config from './modules/config.js'
import * as getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    config
  },
  getters
})

export default store
