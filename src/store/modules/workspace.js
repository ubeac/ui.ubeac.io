import Server from '@/service/server'
const state = {
  teamId: null,
  teamsListLoaded: false,
  teamList: []
}

const getters = {
  teamId: (state) => {
    return state.teamId
  },
  teamList: (state) => {
    return state.teamList
  },
  teamsListLoaded (state) {
    return state.teamsListLoaded
  }
}

const actions = {
  getAll (context) {
    const promise = Server.GetTeams()
    promise.then((result) => {
      context.commit('OnUpdateTeamList', result.body.data)
    })
    return promise
  },
  setTeamId (context, payload) {
    context.commit('OnUpdateTeamId', payload)
  }
}

const mutations = {
  OnUpdateTeamList (state, payload) {
    state.teamList = payload
    state.teamsListLoaded = true
  },
  OnUpdateTeamId (state, teamId) {
    state.teamId = teamId
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
