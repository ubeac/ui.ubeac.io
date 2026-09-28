const state = {
}
const actions = {
  change ({ rootState, context, commit }, payload) {
    // Request Counts

    if (payload.data.type === 'GatewayDataRec') {
      commit('gateway/UpdateGatewayItem', {
        id: payload.data.id,
        data: {
          requestCount: payload.data.value.value,
          lastRequestDate: payload.data.dateTime
        }
      }, { root: true })
    }
    if (payload.data.type === 'DeviceDataRec') {
      commit('device/UpdateItemRequestCount', {
        id: payload.data.id,
        data: {
          requestCount: payload.data.value.value,
          lastRequestDate: payload.data.dateTime
        }
      }, { root: true })
    }
    // Dashboard
    // ======================================================================
    if (payload.data.type === 'Dashboard') {
      if (payload.data.action === 1) {
        commit('dashboard/PatchAdd', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
      }
      if (payload.data.action === 2) {
        commit('dashboard/PatchUpdate', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
      }
      if (payload.data.action === 3) {
        commit('dashboard/PatchDelete', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
      }
    }
    // Device
    // ======================================================================
    if (payload.data.type === 'Device') {
      if (payload.data.action === 1) {
        commit('device/PatchAdd', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchAddChildren', {
          id: payload.data.value.teamId,
          childName: 'devices',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 2) {
        commit('device/PatchUpdate', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchUpdateChildren', {
          id: payload.data.value.teamId,
          childName: 'devices',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 3) {
        commit('device/PatchDelete', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchDeleteChildren', {
          id: payload.data.teamId,
          childName: 'devices',
          childId: payload.data.id
        }, { root: true })
      }
    }
    // Sensor
    // ======================================================================
    if (payload.data.type === 'Sensor') {
      if (payload.data.action === 1) {
        commit('sensor/PatchAdd', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        let deviceById = this.getters['device/byId']
        if (deviceById(payload.data.value.deviceId)) {
          commit(`team/OnPatchAddChildren`, {
            id: deviceById(payload.data.value.deviceId).teamId,
            childName: 'sensors',
            childId: payload.data.id
          }, { root: true })
        } else {
          // TODO: fix this! path for when sensor add before device
          setTimeout(() => {
            commit(`team/OnPatchAddChildren`, {
              id: deviceById(payload.data.value.deviceId).teamId,
              childName: 'sensors',
              childId: payload.data.id
            }, { root: true })
          }, 500)
        }
        commit(`device/OnPatchAddChildren`, {
          id: payload.data.value.deviceId,
          childName: 'sensors',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 2) {
        commit('sensor/PatchUpdate', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        let deviceById = this.getters['device/byId']
        commit(`team/OnPatchUpdateChildren`, {
          id: deviceById(payload.data.value.deviceId).teamId,
          childName: 'sensors',
          childId: payload.data.id
        }, { root: true })
        commit(`device/OnPatchUpdateChildren`, {
          id: payload.data.value.deviceId,
          childName: 'sensors',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 3) {
        let sensorById = this.getters['sensor/byId']
        let deviceById = this.getters['device/byId']
        if (sensorById(payload.data.id) && sensorById(payload.data.id).deviceId && deviceById(sensorById(payload.data.id).deviceId)) {
          commit(`team/OnPatchDeleteChildren`, {
            id: deviceById(sensorById(payload.data.id).deviceId).teamId,
            childName: 'sensors',
            childId: payload.data.id
          }, { root: true })
        }
        commit(`device/OnPatchDeleteChildren`, {
          id: sensorById(payload.data.id).deviceId,
          childName: 'sensors',
          childId: payload.data.id
        }, { root: true })
        commit('sensor/PatchDelete', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
      }
    }
    // Building
    // ======================================================================
    if (payload.data.type === 'Building') {
      if (payload.data.action === 1) {
        commit('building/PatchAdd', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchAddChildren', {
          id: payload.data.value.teamId,
          childName: 'buildings',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 2) {
        commit('building/PatchUpdate', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchUpdateChildren', {
          id: payload.data.value.teamId,
          childName: 'buildings',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 3) {
        commit('building/PatchDelete', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchDeleteChildren', {
          id: payload.data.teamId,
          childName: 'buildings',
          childId: payload.data.id
        }, { root: true })
      }
    }
    // Floor
    // ======================================================================
    if (payload.data.type === 'Floor') {
      if (payload.data.action === 1) {
        commit('floor/PatchAdd', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchAddChildren', {
          id: payload.data.value.teamId,
          childName: 'floors',
          childId: payload.data.id
        }, { root: true })
        commit('building/OnPatchAddChildren', {
          id: payload.data.value.buildingId,
          childName: 'floors',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 2) {
        commit('floor/PatchUpdate', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchUpdateChildren', {
          id: payload.data.value.teamId,
          childName: 'floors',
          childId: payload.data.id
        }, { root: true })
        commit('building/OnPatchUpdateChildren', {
          id: payload.data.value.buildingId,
          childName: 'floors',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 3) {
        commit('building/OnPatchDeleteChildren', {
          id: rootState.floor.dict[payload.data.id].buildingId,
          childName: 'floors',
          childId: payload.data.id
        }, { root: true })
        commit('team/OnPatchDeleteChildren', {
          id: payload.data.teamId,
          childName: 'floors',
          childId: payload.data.id
        }, { root: true })
        commit('floor/PatchDelete', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
      }
    }
    // Gateways
    // ======================================================================
    if (payload.data.type === 'Gateway') {
      if (payload.data.action === 1) {
        commit('gateway/PatchAdd', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchAddChildren', {
          id: payload.data.value.teamId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
        if (this.getters['floor/byId'](payload.data.value.floorId)) {
          let buildingId = this.getters['floor/byId'](payload.data.value.floorId).building
          commit('building/OnPatchAddChildren', {
            id: buildingId,
            childName: 'gateways',
            childId: payload.data.id
          }, { root: true })
        }
        commit('floor/OnPatchAddChildren', {
          id: payload.data.value.floorId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 3) {
        commit('building/OnPatchDeleteChildren', {
          id: rootState.gateway.dict[payload.data.id].buildingId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
        commit('floor/OnPatchDeleteChildren', {
          id: rootState.gateway.dict[payload.data.id].floorId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
        commit('gateway/PatchDelete', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchDeleteChildren', {
          id: payload.data.teamId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
      }
      if (payload.data.action === 2) {
        commit('gateway/PatchUpdate', {
          id: payload.data.id,
          data: payload.data.value
        }, { root: true })
        commit('team/OnPatchUpdateChildren', {
          id: payload.data.value.teamId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
        if (this.getters['floor/byId'](payload.data.value.floorId)) {
          let buildingId = this.getters['floor/byId'](payload.data.value.floorId).building
          commit('building/OnPatchUpdateChildren', {
            id: buildingId,
            childName: 'gateways',
            childId: payload.data.id
          }, { root: true })
        }
        commit('floor/OnPatchUpdateChildren', {
          id: payload.data.value.floorId,
          childName: 'gateways',
          childId: payload.data.id
        }, { root: true })
      }
    }
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
