import Server from '@/service/server'

const state = {
  dict: {},
  reports: {}
}

const getters = {
  reports () {
    return state.reports
  }
}

const actions = {
  ReportList (context) {
    const promise = Server.ReportList()
    promise.then((response) => {
      if (response && response.body && response.body.data) {
        context.commit('OnGetAll', response.body.data)
      }
    })
    return promise
  },
  getLogReport (context, filter) {
    const promise = Server.GetLogReport(filter)
    return promise
  },
  runQuery (context, filter) {
    const promise = Server.RunQuery(filter)
    return promise
  }
}

const mutations = {
  OnGetAll (state, payload) {
    state.reports = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
