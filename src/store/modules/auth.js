import * as types from '../mutation_types.js'

const state = {
  user: {
    id: '',
    name: '',
    phone: '',
    api_token: '',
    role: '',
    role_id: ''
  }
}

const mutations = {
  // To set the local storage
  [types.AUTH_SET] (state, user) {
    if (user.id) {
      localStorage.setItem('id', user.id)
    }
    if (user.name) {
      localStorage.setItem('name', user.name)
    }
    if (user.phone) {
      localStorage.setItem('phone', user.phone)
    }
    if (user.api_token) {
      localStorage.setItem('api_token', user.api_token)
    }
    if (user.role_id) {
      localStorage.setItem('role_id', user.role_id)
    }
    if (user.role) {
      localStorage.setItem('role', user.role)
    }
  },
  // To initialize the state variables
  [types.AUTH_INITIALIZE] (state) {
    state.user.id = localStorage.getItem('id')
    state.user.name = localStorage.getItem('name')
    state.user.phone = localStorage.getItem('phone')
    state.user.api_token = localStorage.getItem('api_token')
    state.user.role = localStorage.getItem('role')
    state.user.role_id = localStorage.getItem('role_id')
  },
  // Remove the local storage values
  [types.AUTH_REMOVE] (state) {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('phone')
    localStorage.removeItem('api_token')
    localStorage.removeItem('role')
    localStorage.removeItem('role_id')
  }
}

const actions = {
  // To set the local storage
  authSet ({commit}, {data}) {
    commit(types.AUTH_SET, data)
  },
  // To inilialize the state variables
  authInitialize ({commit}) {
    commit(types.AUTH_INITIALIZE)
  },
  // To remove the local storage
  authRemove ({ commit }) {
    commit(types.AUTH_REMOVE)
  }
}

export default {
  state, mutations, actions
}
