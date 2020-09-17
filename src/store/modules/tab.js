const state = {
  menu: [],
  currentMenu: null
}

const mutations = {
  SELECT_MENU(state, value) {
    value && value.name !== 'home' ? state.currentMenu = value : state.currentMenu = null
  }
}

const actions = {
  selectMenu({ commit }, value) {
    commit('SELECT_MENU', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
