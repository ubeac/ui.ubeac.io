import Server from '@/service/server'
import _ from 'lodash'
import GettersMixin from '@/mixin/storeGetters'
import MutationsMixin from '@/mixin/storeMutations'

const state = {
  dict: {}
}

const getters = Object.assign(_.cloneDeep(GettersMixin), {
  cardList (state, getters, rootState, rootGetters) {
    let cardList = []
    if (getters.list) {
      getters.list.forEach((item) => {
        let building = null
        let floor = null
        let manufacturer = null
        let gateway = null
        if (item.floor) {
          building = rootGetters['floor/byId'](item.floor).building
          floor = item.floor
        }
        manufacturer = rootGetters['basedata/getManufacturerByFirmware'](item.firmwareId)
        gateway = rootGetters['basedata/getProductByFirmware'](item.firmwareId)
        cardList.push({
          id: item.id,
          lastRequestDate: item.lastRequestDate,
          name: item.name,
          url: item.url,
          description: item.description,
          manufacturer: manufacturer,
          gateway: gateway,
          updateDate: item.updateDate,
          requestCount: item.requestCount,
          firmwareId: item.firmwareId,
          team: item.team,
          building: building,
          floor: floor,
          x: item.x,
          y: item.y
        })
      })
    }
    return cardList
  },
  lightList  () {
    let out = []
    if (state.list) {
      state.list.forEach((item) => {
        out.push({
          name: item.name,
          id: item.id
        })
      })
    }
    return out
  },
  byFloorId: (state, getters, rootState, rootGetters) => (floorId) => {
    let out = []
    getters.list.forEach((item) => {
      if (item.floor === floorId) {
        out.push(item)
      }
    })
    return out
  },
  floor (state, getters, rootState, rootGetters) {
    let floors = rootGetters['floor/dict']
    return (id) => {
      let out = null
      let floorId = state.dict[id].floor
      if (floorId) {
        out = floors[floorId]
      }
      return out
    }
  },
  building (state, getters, rootState, rootGetters) {
    let buildings = rootGetters['building/dict']
    return (id) => {
      let out = null
      let buildingId = state.dict[id].building
      if (buildingId) {
        out = buildings[buildingId]
      }
      return out
    }
  },
  team (state, getters, rootState, rootGetters) {
    let teams = rootGetters['team/dict']
    return (id) => {
      let out = null
      let teamId = state.dict[id].team
      if (teamId) {
        out = teams[teamId]
      }
      return out
    }
  }
})

const actions = {
  getAll (context) {
    context.dispatch('userassets/getUserAssetsAndDevices', null, { root: true })
  },
  checkUrlExists (context, payload) {
    const promise = Server.GatewayExists({
      id: payload,
      teamId: [context.rootGetters['workspace/teamId']]
    })
    return promise
  },
  add (context, gatewayModel) {
    const promise = Server.AddGateway(gatewayModel)
    promise.then((response) => {
      // TODO: remove
      context.commit('OnAdd', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.DeleteGateway({ id: id })
    promise.then((response) => {
      context.commit('OnDelete', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  },
  update (context, gatewayModel) {
    const promise = Server.UpdateGateway(gatewayModel)
    promise.then((response) => {
      context.commit('OnUpdate', response.body.data)
      context.dispatch('getAll')
    })
    return promise
  }
}

const mutations = Object.assign(_.cloneDeep(MutationsMixin), {
  PatchUpdate (state, payload) {
    _.merge(state.dict[payload.id], payload.data)
    state.dict[payload.id].floor = state.dict[payload.id].floorId
    delete state.dict[payload.id].floorId
  },
  UpdateGatewayItem (state, payload) {
    if (state.dict[payload.id]) {
      state.dict[payload.id].requestCount = state.dict[payload.id].requestCount + payload.data.requestCount
      state.dict[payload.id].lastRequestDate = payload.data.lastRequestDate
    }
  },
  OnUpdateDeviceData (state, payload) {
    state.dict = _.merge(_.cloneDeep(state.dict), payload)
    _.each(state.dict, (item, key) => {
      if (!item.id) {
        delete state.dict[key]
      }
    })
  },
  OnGetSecurity (state, payload) {
    // no need to state
  },
  OnGetById (state, payload) {
    state.selected = payload
  },
  OnInitDict (state, payload) {
    state.dict = payload
  },
  OnGetAll (state, userAssets) {
  },
  OnAdd (state, gatewayId) {
    state.gateway = null
  },
  OnDelete (state, result) {
    state.gateway = null
  },
  OnUpdate (state, result) {
    state.gateway = null
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
