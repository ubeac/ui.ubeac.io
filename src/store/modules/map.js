import Config from '@/config/config'

const state = {
  currentPosition: Config.map.defaultMapCenter
}

const getters = {
  currentPosition () {
    return state.currentPosition
  }
}

const actions = {
  getCurrentPosition (context) {
    navigator.geolocation.getCurrentPosition((position) => {
      context.commit('OnUpdatePosition', {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      })
    })
  }
}

const mutations = {
  OnUpdatePosition (state, payload) {
    state.currentPosition = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
