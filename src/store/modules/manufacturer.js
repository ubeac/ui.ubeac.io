import Server from '@/service/server'

const state = {}

const getters = {}

const actions = {
  async getAll (context) {
    const promise = context.dispatch('basedata/getBaseData', false, { root: true })
    return promise
  },
  add (context, manufacturerModel) {
    const promise = Server.AddManufacturer(manufacturerModel)
    promise.then((response) => {
      context.commit('OnAdd', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.RemoveManufacturer({ id: id })
    promise.then((response) => {
      context.commit('OnDelete', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  update (context, manufacturerModel) {
    const promise = Server.UpdateManufacturer(manufacturerModel)
    promise.then((response) => {
      context.commit('OnUpdate', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  }
}

const mutations = {
  OnAdd (state, payload) {
    state.manufacturer = null
  },
  OnDelete (state, result) {
    state.manufacturer = null
  },
  OnUpdate (state, payload) {
    state.manufacturer = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
