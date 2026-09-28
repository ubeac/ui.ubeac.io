import Server from '@/service/server'

const state = {
  permissionId: ''
}

const getters = {
  permissionId () {
    return state.permissionId
  }
}

const actions = {
  add (context, permissionModel) {
    const promise = Server.AddPermission(permissionModel)
    promise.then((response) => {
      const result = response.body.data
      context.commit('OnAdd', result)
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.DeletePermission({ id: id })
    promise.then((response) => {
      const result = response.body.data
      context.commit('OnDelete', result)
    })
    return promise
  }
}

const mutations = {
  OnAdd (state, permissionId) {
    state.permissionId = permissionId
  },
  OnDelete (state, result) {
    state.permission = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
