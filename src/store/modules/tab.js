const state = {
  tagList: []
}

const mutations = {
  ADD_TAG(state, tag) {
    if (state.tagList.some(item => item.path === tag.path)) {
      return
    }
    state.tagList.push(
      Object.assign({}, tag, {
        title: tag.meta.title || '未知标签页'
      })
    )
  },
  DEL_TAG(state, tagPath) {
    for (const [i, v] of state.tagList.entries()) {
      if (v.path === tagPath) {
        state.tagList.splice(i, 1)
        break
      }
    }
  },
  DEL_OTHER_TAG(state, tagPath) {
    state.tagList = state.tagList.filter(item => item.meta.affix || item.path === tagPath)
  },
  DEL_ALL_TAG(state) {
    state.tagList = state.tagList.filter(item => item.meta.affix)
  },
  UPDATE_TAG(state, tag) {
    // path未改变，其他属性有变动
    for (let t of state.tagList) {
      if (t.path === tag.path) {
        t = Object.assign(t, tag)
        break
      }
    }
  }
}

const actions = {
  addTag({ commit }, tag) {
    commit('ADD_TAG', tag)
  },
  delTag({ commit }, tagPath) {
    commit('DEL_TAG', tagPath)
  },
  delOtherTag({ commit }, tagPath) {
    commit('DEL_OTHER_TAG', tagPath)
  },
  delAllTag({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_TAG')
      resolve([...state.tagList])
    })
  },
  updateTag({ commit }, tag) {
    commit('UPDATE_TAG', tag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
