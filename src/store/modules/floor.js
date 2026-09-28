import Server from '@/service/server'
import _ from 'lodash'
import GettersMixin from '@/mixin/storeGetters'
import MutationsMixin from '@/mixin/storeMutations'

const state = {
  dict: {}
}

const getters = Object.assign(_.cloneDeep(GettersMixin), {
  byBuildingId: (state, getters) => (buildingId) => {
    let output
    output = getters.list.filter((item) => {
      return item && item.buildingId === buildingId
    })
    return output
  },
  building (state, getters, rootState, rootGetters) {
    let buildings = rootGetters['building/dict']
    return (id) => {
      let out = null
      if (state.dict[id]) {
        let buildingId = state.dict[id].building
        if (buildingId) {
          out = buildings[buildingId]
        }
      }
      return out
    }
  }
})

const actions = {
  clearSelected (context) {
    context.commit('OnGetById', {})
  },
  getAll (context) {
    const promise = context.dispatch('userassets/getUserAssetsAndDevices', null, { root: true })
    return promise
  },
  add (context, buildingModel) {
    const promise = Server.AddFloor(buildingModel)
    promise.then((response) => {
      context.commit('OnAdd', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.DeleteFloor({ id: id })
    promise.then((response) => {
      context.commit('OnDelete', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  update (context, buildingModel) {
    const promise = Server.UpdateFloor(buildingModel)
    promise.then((response) => {
      context.commit('OnUpdate', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  getById (context, id) {
    const promise = Server.GetFloorsById({
      id: id
    })
    promise.then((result) => {
      context.commit('OnGetById', result.body.data)
    })
    return promise
  }
}

const mutations = Object.assign(_.cloneDeep(MutationsMixin), {
  OnUpdateDeviceData (state, payload) {
    state.dict = _.merge(_.cloneDeep(state.dict), payload)
  },
  OnGetById (state, payload) {
    state.selected = payload
  },
  OnInitDict (state, payload) {
    state.dict = payload
  },
  OnGetAllFromServer (state, payload) {
  },
  OnAdd (state, floorId) {
    state.floor = null
  },
  OnDelete (state, result) {
    state.floor = null
  },
  OnUpdate (state, result) {
    state.floor = null
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
