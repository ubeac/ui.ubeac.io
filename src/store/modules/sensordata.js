import Server from '@/service/server'

const state = {
  sensorData: []
}

const getters = {
  sensorData () {
    return state.sensorData
  }
}

const actions = {
  getSensorData (context, filter) {
    if (filter) {
      filter.teamId = context.rootGetters['workspace/teamId']
    } else {
      filter = {
        teamId: context.rootGetters['workspace/teamId']
      }
    }
    const promise = Server.GetSensorData(filter)
    promise.then((result) => {
      if (result.body.data) {
        context.commit('OnSensorData', result.body.data)
      } else {
        context.commit('OnSensorData', [])
      }
    })
    return promise
  },
  clear (context) {
    context.commit('Clear')
  }
}

const mutations = {
  Clear (state, sensorData) {
    state.sensorData = []
  },
  OnSensorData (state, sensorData) {
    state.sensorData = sensorData
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
