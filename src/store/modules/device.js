import Server from '@/service/server'
import GettersMixin from '@/mixin/storeGetters'
import _ from 'lodash'
import MutationsMixin from '@/mixin/storeMutations'

const state = {
  dict: {},
  uIdDict: {},
  _gatewaysPatch: {},
  _floorsPatch: {},
  _buildingsPatch: {},
  _teamPatch: {}
}

const getters = Object.assign(_.cloneDeep(GettersMixin), {
  byUid: (state) => (uid) => {
    let output
    output = state.uIdDict[uid]
    return output
  },
  bySensorId: (state, getters, rootState, rootGetters) => (sensorId) => {
    let out = null
    getters.list.forEach((item) => {
      if (item.sensors.includes(sensorId)) {
        out = item
      }
    })
    return out
  },
  byFloorId: (state, getters, rootState, rootGetters) => (floorId) => {
    let out = []
    getters.list.forEach((item) => {
      if (item.floorId === floorId) {
        out.push(item)
      }
    })
    return out
  }
})

const actions = {
  searchDevice ({ commit, rootState, dispatch }, payload) {
    let promise = new Promise((resolve, reject) => {
      let ServerPromise = Server.GetDevices(payload)
      ServerPromise.then((response) => {
        // TODO: must move to helper method merge with line 122
        response.body.data.forEach((device) => {
          if (device.sensors && device.sensors.length > 0 && rootState.sensor && rootState.sensor.types) {
            device.sensors.forEach((sensor) => {
              let type = rootState.sensor.types.find((type) => {
                return parseInt(type.type) === parseInt(sensor.type)
              })
              let unit = rootState.sensor.units.find((unit) => {
                return parseInt(unit.id) === parseInt(sensor.unit)
              })
              let prefix = rootState.sensor.prefixes.find((prefix) => {
                return parseInt(prefix.base10) === parseInt(sensor.prefix)
              })
              sensor.unit = unit
              sensor.type = type
              sensor.prefix = prefix
            })
          }
        })
        resolve(response.body.data)
      })
    })
    return promise
  },
  getAll ({ commit, rootState, dispatch, rootGetters }, payload) {
    if (!payload) {
      return true
    }
    commit('sensor/OnGetAll', payload.device, { root: true })
    payload.device.forEach((device) => {
      let tempSensorList = []
      if (device.sensors && device.sensors.length > 0 && rootState.sensor && rootState.sensor.types) {
        device.sensors.forEach((sensor) => {
          tempSensorList.push(sensor.id)
        })
        device.sensors = tempSensorList
      }
      device.requestCount = 0
      device.lastRequestDate = null
    })
    commit('OnGetAll', payload.device)
    state._gatewaysPatch = {}
    state._buildingsPatch = {}
    state._floorsPatch = {}
    state._teamPatch = {}
    _.each(payload.devicesSummary, (deviceItem) => {
      if (state.dict[deviceItem.deviceId]) {
        state.dict[deviceItem.deviceId].lastRequestDate = deviceItem.lastRequestDate
        state.dict[deviceItem.deviceId].requestCount = deviceItem.requestCount
      }
    })
    let groupByGateway = _.groupBy(payload.devicesSummary, (b) => { return b.gatewayId })
    _.each(groupByGateway, (value, key) => {
      state._gatewaysPatch[key] = {
        devices: [],
        sensors: []
      }
      state._gatewaysPatch[key].devices = Object.keys(_.groupBy(value, (b) => { return b.deviceId }))
      // state._gatewaysPatch[key].sensors = Object.keys(_.groupBy(value, (b) => { return b.sensorId }))
    })
    let groupByFloor = _.groupBy(payload.devicesSummary, (b) => { return b.floorId })
    _.each(groupByFloor, (value, key) => {
      let building = rootGetters['floor/building'](key)
      if (building && building.id) {
        if (state._buildingsPatch[building.id]) {
          state._buildingsPatch[building.id].devices.push(Object.keys(_.groupBy(value, (b) => { return b.deviceId })))
          // state._buildingsPatch[building.id].sensors.push(Object.keys(_.groupBy(value, (b) => {return b.sensorId})))
        } else {
          state._buildingsPatch[building.id] = {
            devices: [],
            sensors: []
          }
          state._buildingsPatch[building.id].devices = [...Object.keys(_.groupBy(value, (b) => { return b.deviceId }))]
          // state._buildingsPatch[building.id].sensors = [...Object.keys(_.groupBy(value, (b) => {return b.sensorId}))]
        }
      }
      state._floorsPatch[key] = {
        devices: [],
        sensors: []
      }
      state._floorsPatch[key].devices = Object.keys(_.groupBy(value, (b) => { return b.deviceId }))
      // state._floorsPatch[key].sensors = Object.keys(_.groupBy(value, (b) => {return b.sensorId}))
    })
    dispatch('spreadDataToEntities')
  },
  spreadDataToEntities ({ state, getters, commit, rootState }) {
    if (getters.list) {
      let assetsData = getters.list
      let teamsDict = {}
      assetsData.forEach((item, index) => {
        let teamId = item.teamId
        if (teamsDict[teamId]) {
          if (!teamsDict[teamId].devices.includes(item.id)) {
            teamsDict[teamId].devices.push(item.id)
          }
          if (item.sensors) {
            item.sensors.forEach((sensor) => {
              if (!teamsDict[teamId].sensors.includes(sensor)) {
                teamsDict[teamId].sensors.push(sensor)
              }
            })
          }
        } else {
          teamsDict[teamId] = {
            devices: [item.id],
            sensors: []
          }
          item.sensors.forEach((sensor) => {
            teamsDict[teamId].sensors.push(sensor)
          })
        }
      })
      commit('team/OnUpdateDeviceData', teamsDict, { root: true })
      commit('building/OnUpdateDeviceData', state._buildingsPatch, { root: true })
      commit('floor/OnUpdateDeviceData', state._floorsPatch, { root: true })
      commit('gateway/OnUpdateDeviceData', state._gatewaysPatch, { root: true })
    }
  },
  clearSelected (context) {
    context.commit('OnGetById', {})
  },
  update (context, payload) {
    let promise = Server.UpdateDevice(payload)
    return promise
  },
  add (context, payload) {
    let promise = Server.AddDevice(payload)
    return promise
  },
  delete (context, payload) {
    let promise = Server.DeleteDevice({ id: payload })
    return promise
  }
}

const mutations = Object.assign(_.cloneDeep(MutationsMixin), {
  UpdateItemRequestCount (state, payload) {
    if (state.dict[payload.id]) {
      state.dict[payload.id].requestCount = state.dict[payload.id].requestCount + 1
      state.dict[payload.id].lastRequestDate = payload.data.lastRequestDate
    }
  },
  PatchAdd (state, payload) {
    let clonedDict = _.cloneDeep(state.dict)
    payload.data.requestCount = 0
    clonedDict[payload.id] = payload.data
    let uidDict = {}
    _.each(state.dict, (item) => {
      if (item) {
        uidDict[`${item.uid}-${item.teamId}`] = item
      }
    })
    state.dict = clonedDict
    state.uIdDict = uidDict
  },
  PatchUpdate (state, payload) {
    _.merge(state.dict[payload.id], payload.data)
    let dict = {}
    let uidDict = {}
    _.each(state.dict, (item) => {
      dict[item.id] = item
      uidDict[`${item.uid}-${item.teamId}`] = item
    })
    state.dict = dict
    state.uIdDict = uidDict
  },
  OnGetAll (state, payload) {
    let dict = {}
    let uidDict = {}
    payload.forEach((item) => {
      dict[item.id] = item
      uidDict[`${item.uid}-${item.teamId}`] = item
    })
    state.dict = dict
    state.uIdDict = uidDict
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
