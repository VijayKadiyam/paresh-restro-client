import * as types from '../mutation_types.js'

const state = {
  api: {
    apiUrl: 'http://localhost:8080/soheil-restro-api/public/',
    // apiUrl: 'http://localhost:8080/', 
    // apiUrl: 'http://13.232.155.235:8092/' 
  },
  outlet: {
    id: '',
    name: ''
  }
}

const mutations = {
  // To set config in the local storage
  [types.CONFIG_SET] (state, config) {
    if (config.hasOwnProperty('outlet')) localStorage.setItem('outletId', config.outlet.id)
    if (config.hasOwnProperty('outlet')) localStorage.setItem('outletName', config.outlet.name)
  },

  // To initialize config state variables
  [types.CONFIG_INITIALIZE] (state) {
    state.outlet.id = parseInt(localStorage.getItem('outletId'))
    state.outlet.name = localStorage.getItem('outletName')
  },

  // To remove the localStorage config values
  [types.CONFIG_REMOVE] (state) {
    localStorage.removeItem('outletId')
    localStorage.removeItem('outletName')
  }
}

const actions = {
  // To set config in the local storage
  configSet ({ commit }, config) {
    commit(types.CONFIG_SET, config)
  },

  // To initialize config in the local storage
  configInitialize ({ commit }) {
    commit(types.CONFIG_INITIALIZE)
  },

  // To remove local storage config variables
  configRemove ({ commit }) {
    commit(types.CONFIG_REMOVE)
  }
}

export default {
  state,
  mutations,
  actions
}
