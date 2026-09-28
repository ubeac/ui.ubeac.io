import Server from '@/service/server'
import _ from 'lodash'
import GettersMixin from '@/mixin/storeGetters'
import MutationsMixin from '@/mixin/storeMutations'

const state = {
  dict: {}
}

const getters = Object.assign(_.cloneDeep(GettersMixin), {
  floors (state, getters, rootState, rootGetters) {
    let floors = rootGetters['floor/dict']
    return (id) => {
      let out = []
      state.dict[id].floors.forEach((item) => {
        out.push(floors[item])
      })
      return out
    }
  },
  floorsCount (state) {
    return (id) => {
      let out = 0
      if (state.dict[id] && state.dict[id].floors) {
        out = state.dict[id].floors.length
      }
      return out
    }
  }
})

const actions = {
  getAll (context) {
    const promise = context.dispatch('userassets/getUserAssetsAndDevices', null, { root: true })
    promise.then((result) => {
      if (result && result.body && result.body.data) {
        context.commit('OnGetAll', result.body.data)
      }
    })
    return promise
  },
  add (context, buildingModel) {
    const promise = Server.AddBuilding(buildingModel)
    promise.then((result) => {
      context.commit('OnAdd', result.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.DeleteBuilding({ id: id })
    promise.then((result) => {
      context.commit('OnDelete', result.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  update (context, buildingModel) {
    const promise = Server.UpdateBuilding(buildingModel)
    promise.then((result) => {
      context.commit('OnUpdate', result.body.data)
      context.dispatch('getAll')
    })
    return promise
  }
}

const mutations = Object.assign(_.cloneDeep(MutationsMixin), {
  OnUpdateDeviceData (state, payload) {
    state.dict = _.merge(_.cloneDeep(state.dict), payload)
  },
  OnInitDict (state, payload) {
    state.dict = payload
  },
  OnGetAll (state, userAssets) {
    let output = []
    if (userAssets) {
      for (var i = 0; i < userAssets.length; i++) {
        if (userAssets[i].buildings != null) {
          for (var j = 0; j < userAssets[i].buildings.length; j++) {
            if (userAssets[i].buildings[j] != null) {
              let buildingView = {}
              buildingView = userAssets[i].buildings[j]
              buildingView.team = userAssets[i]
              output.push(buildingView)
            }
          }
        }
      }
    }
    state.list = output
  },
  OnAdd (state, buildingId) {
  },
  OnDelete (state, result) {
  },
  OnUpdate (state, result) {
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
