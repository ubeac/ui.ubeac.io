import Bowser from 'bowser'
const browser = Bowser.getParser(window.navigator.userAgent)
const state = {
  baseDataLoaded: false,
  fullscreen: false,
  width: null,
  browser: {
    isMobile: browser.parsedResult.platform.type === 'mobile',
    isDesktop: browser.parsedResult.platform.type === 'desktop'
  }
}

const getters = {
  baseDataLoaded () {
    return state.baseDataLoaded
  },
  fullscreen () {
    return state.fullscreen
  },
  browser () {
    return state.browser
  }
}

const actions = {
  setBaseDataLoadedStatus (context, payload) {
    context.commit('OnSetBaseDataLoadedStatus', payload)
  },
  setFullscreen (context, payload) {
    context.commit('OnUpdateFullscreen', payload)
  }
}

const mutations = {
  OnSetBaseDataLoadedStatus (state, payload) {
    state.baseDataLoaded = payload
  },
  OnUpdateFullscreen (state, payload) {
    state.fullscreen = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
