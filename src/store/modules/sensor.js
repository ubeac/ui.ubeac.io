import Server from '@/service/server'
import Vue from 'vue'
import _ from 'lodash'
import GettersMixin from '@/mixin/storeGetters'
import MutationsMixin from '@/mixin/storeMutations'
import Config from '@/config/config'
const state = {
  units: [],
  typeUnits: [],
  prefixes: [],
  types: [],
  dict: {}
}

const getters = Object.assign(_.cloneDeep(GettersMixin), {
  byDeviceId: (state) => (deviceId) => {
    let out = []
    _.each(state.dict, (sensorItem, key) => {
      if (sensorItem.deviceId === deviceId) {
        out.push(sensorItem)
      }
    })
    out.sort((a, b) => {
      let out = false
      if (a.type && b.type) {
        out = a.type.viewOrder - b.type.viewOrder
      }
      return out
    })
    return out
  },
  byType: (state) => (typeString) => {
    let out = {}
    out = state.types.find((item) => {
      return item.type === typeString
    })
    return out
  },
  unitBySensorId: (state) => (id) => {
    let out = null
    if (state.dict[id] && state.dict[id].unit) {
      out = state.dict[id].unit
    }
    return out
  },
  unitsBySensorType: (state) => (type) => {
    let out = []
    let unitTypes = state.typeUnits.find((item) => {
      return item.type === type
    })
    if (unitTypes && unitTypes.units[0] === '*') {
      out = state.units
    } else if (unitTypes) {
      unitTypes.units.forEach((unitId) => {
        let unitObj = state.units.find((unitItem) => {
          return unitItem.id === unitId
        })
        out.push(unitObj)
      })
    }
    return out
  },
  typesWithTypeKey () {
    let out = {}
    if (state.types) {
      state.types.forEach((item) => {
        out[item.type] = item
      })
    }
    return out
  },
  types (state) {
    return state.types
  },
  typesSingleValue (state) {
    return state.types.filter((item) => {
      return item.name !== 'GPS' &&
        item.name !== 'Acceleration' &&
        item.name !== 'MagneticField' &&
        item.name !== 'RotationalMotion' &&
        item.name !== 'Proximity' &&
        item.name !== 'Orientation' &&
        item.name !== 'Location' &&
        item.name !== 'Gyroscope' &&
        item.name !== 'BLE' &&
        item.name !== 'Beacon' &&
        item.name !== 'Custom'
    })
  },
  prefixes (state) {
    return state.prefixes
  },
  units (state) {
    return state.units
  }
})

const actions = {
  addSensor (context, payload) {
    let promise = Server.AddSensor(payload)
    return promise
  },
  removeSensor (context, payload) {
    let promise = Server.DeleteSensor({ id: payload })
    return promise
  },
  updateSensor (context, payload) {
    let promise = Server.UpdateSensor(payload)
    return promise
  },
  getSensorsTypes (context) {
    Vue.http.get(`${Config.apiServerUrl}sensortypes.json`, {
    }).then((response) => {
      context.commit('OnUpdateTypes', response.body)
    })
    // let out = Server.GetSensorsType().then((response) => {
    //   context.commit('OnUpdateTypes', response.body)
    // })
    // return out
  },
  getSchema (context, payload) {
    let out = Server.GetSensorData(payload)
    return out
  }
}

const mutations = Object.assign(_.cloneDeep(MutationsMixin), {
  PatchAdd (state, payload) {
    let clonedDict = _.cloneDeep(state.dict)
    let sensor = payload.data
    let type = state.types.find((type) => {
      return parseInt(type.type) === parseInt(sensor.type)
    })
    let unit = state.units.find((unit) => {
      return parseInt(unit.id) === parseInt(sensor.unit)
    })
    let prefix = state.prefixes.find((prefix) => {
      return parseInt(prefix.base10) === parseInt(sensor.prefix)
    })
    sensor.unit = unit
    sensor.type = type
    sensor.prefix = (prefix && prefix.name) ? prefix : null
    clonedDict[payload.id] = sensor
    state.dict = clonedDict
  },
  PatchUpdate (state, payload) {
    let sensor = _.cloneDeep(payload.data)
    let type = state.types.find((type) => {
      return parseInt(type.type) === parseInt(sensor.type)
    })
    let unit = state.units.find((unit) => {
      return parseInt(unit.id) === parseInt(sensor.unit)
    })
    let prefix = state.prefixes.find((prefix) => {
      return parseInt(prefix.base10) === parseInt(sensor.prefix)
    })
    sensor.unit = _.cloneDeep(unit)
    sensor.type = _.cloneDeep(type)
    sensor.prefix = (prefix && prefix.name) ? prefix : null
    _.merge(state.dict[sensor.id], sensor)
  },
  OnUpdateTypes (state, payload) {
    state.types = payload.types
    state.units = payload.units
    state.typeUnits = payload.typeUnits
    state.prefixes = payload.prefixes
  },
  OnGetAll (state, payload) {
    let dict = {}
    payload.forEach((item) => {
      item.sensors.forEach((sensor) => {
        dict[sensor.id] = sensor
        let type = state.types.find((type) => {
          return parseInt(type.type) === parseInt(sensor.type)
        })
        let unit = state.units.find((unit) => {
          return parseInt(unit.id) === parseInt(sensor.unit)
        })
        let prefix = state.prefixes.find((prefix) => {
          return parseInt(prefix.base10) === parseInt(sensor.prefix)
        })
        sensor.unit = _.cloneDeep(unit)
        sensor.type = _.cloneDeep(type)
        sensor.prefix = (prefix && prefix.name) ? _.cloneDeep(prefix) : null
      })
    })
    state.dict = dict
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
