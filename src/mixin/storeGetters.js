import _ from 'lodash'
export default {
  list (state) {
    return Object.values(state.dict)
  },
  dict (state) {
    return state.dict
  },
  byId: (state) => (id) => {
    let out
    if (state.dict[id]) {
      out = _.cloneDeep(state.dict[id])
    }
    return out
  },
  originalById: (state) => (id) => {
    let out
    if (state.dict[id]) {
      out = state.dict[id]
    }
    return out
  },
  gatewaysCount (state) {
    return (id) => {
      let out = 0
      if (state.dict[id] && state.dict[id].gateways) {
        out = state.dict[id].gateways.length
      }
      return out
    }
  },
  devicesCount (state) {
    return (id) => {
      let out = 0
      if (id && state.dict[id] && state.dict[id].devices) {
        out = state.dict[id].devices.length
      }
      return out
    }
  },
  sensorsCount (state) {
    return (id) => {
      let out = 0
      if (state.dict[id].sensors) {
        out = state.dict[id].sensors.length
      }
      return out
    }
  },
  sensors (state, getters, rootState, rootGetters) {
    let sensorById = rootGetters['sensor/byId']
    return (id) => {
      let typesDict = {}
      if (state.dict[id]) {
        state.dict[id].sensors.forEach((item) => {
          let sensorObj = sensorById(item)
          if (sensorObj && sensorObj.type) {
            if (typesDict[sensorObj.type.name]) {
              typesDict[sensorObj.type.name].count = typesDict[sensorObj.type.name].count + 1
              typesDict[sensorObj.type.name].list.push(sensorObj)
            } else {
              typesDict[sensorObj.type.name] = {
                list: [],
                type: sensorObj.type.type,
                name: sensorObj.type.name,
                count: 1
              }
            }
          }
        })
      }
      return typesDict
    }
  },
  sortedByDate (state, getters) {
    let out = []
    if (getters.list) {
      out = _.cloneDeep(getters.list).sort((a, b) => {
        return new Date(b.updateDate).valueOf() - new Date(a.updateDate).valueOf()
      })
    }
    return out
  }
}
