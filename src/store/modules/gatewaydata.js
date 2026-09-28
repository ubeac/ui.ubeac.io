import Server from '@/service/server'

const state = {
  gatewayData: []
}

const getters = {
  gatewayData () {
    return state.gatewayData
  }
}

const actions = {
  getGatewayData (context, payload) {
    const promise = Server.GetGatewayData(payload)
    promise.then((response) => {
      context.commit('OnGatewayData', response.body.data)
    })
    return promise
  },
  clearGatewayData (context, filter) {
    context.commit('OnGatewayData', [])
  }
}

const mutations = {
  OnGatewayData (state, gatewayData) {
    state.gatewayData = gatewayData
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
