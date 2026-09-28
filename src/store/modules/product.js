import Server from '@/service/server'

const state = {}

const getters = {}

const actions = {
  async getAll (context) {
    const promise = context.dispatch('basedata/getBaseData', false, { root: true })
    return promise.products
  },
  add (context, model) {
    const promise = Server.AddProduct(model)
    promise.then((response) => {
      context.commit('OnAdd', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.RemoveProduct({ id: id })
    promise.then((response) => {
      context.commit('OnDelete', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  update (context, model) {
    const promise = Server.UpdateProduct(model)
    promise.then((response) => {
      context.commit('OnUpdate', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  }
}

const mutations = {
  OnAdd (state, payload) {
    state.product = null
  },
  OnDelete (state, result) {
    state.product = null
  },
  OnUpdate (state, payload) {
    state.product = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
