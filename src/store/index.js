export const state = () => ({

})

export const mutations = {
  setModuleContract (state, { module, value }) {
    state[module].contract = value.methods
  }
}

export const actions = {
  initializeContract ({ dispatch, commit, getters, rootGetters }, { module, value }) {
    commit('setModuleContract', { module, value })
  }
}

export const getters = {}
