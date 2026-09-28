import Server from '@/service/server'
import Lodash from 'lodash'

const state = {
  userAssetsLoaded: false
}

const getters = {
  userAssetsLoaded (state) {
    return state.userAssetsLoaded
  }
}

const actions = {
  getUserAssetsAndDevices (context) {
    return new Promise((resolve, reject) => {
      context.dispatch('userassets/getUserAssets', null, { root: true }).then(() => {
        context.dispatch('device/getAll', null, { root: true }).then(() => {
          resolve()
        })
      })
    })
  },
  getUserAssets (context) {
    let outPromise = new Promise((resolve, reject) => {
      const promise = Server.GetTeamsById({
        id: [context.rootGetters['workspace/teamId']]
      })
      promise.then((response) => {
        const teams = [response.body.data]
        context.commit('OnUserAssets', teams)
        if (teams && teams.length > 0) {
          context.commit('building/OnGetAll', teams, { root: true })
          context.commit('floor/OnGetAllFromServer', teams, { root: true })
          context.commit('gateway/OnGetAll', teams, { root: true })
          // Create Dict data structure
          let teamsList = []
          let teamsDict = {}
          let buildingsDict = {}
          let floorsDict = {}
          let gatewaysDict = {}
          let devicesDict = {}
          let devicesSummaryDict = {}
          let dashboardDict = {}
          teams.forEach((item) => {
            let teamId = item.id
            let gateways = []
            let buildings = []
            let floors = []
            // BUILDING
            if (item.buildings) {
              item.buildings.forEach((item) => {
                // FlOORS
                if (item.floors) {
                  item.floors.forEach((item) => {
                    if (item && item.id) {
                      floors.push(item.id)
                      floorsDict[item.id] = Object.assign({}, item)
                      floorsDict[item.id].building = floorsDict[item.id].buildingId
                      floorsDict[item.id].buildingId = floorsDict[item.id].buildingId
                      floorsDict[item.id].gateways = []
                      floorsDict[item.id].team = teamId
                      floorsDict[item.id].teamId = teamId
                      floorsDict[item.id].devices = []
                      floorsDict[item.id].sensors = []
                    }
                  })
                }
                buildings.push(item.id)
                buildingsDict[item.id] = Object.assign({}, item)
                buildingsDict[item.id].team = buildingsDict[item.id].teamId
                buildingsDict[item.id].gateways = []
                Lodash.each(gatewaysDict, (gatewayItem, id) => {
                  if (gatewayItem.building === item.id) {
                    buildingsDict[item.id].gateways.push(id)
                  }
                })
                buildingsDict[item.id].floors = []
                Lodash.each(floorsDict, (floorItem, id) => {
                  if (floorItem.building === item.id) {
                    buildingsDict[item.id].floors.push(id)
                  }
                })
                buildingsDict[item.id].devices = []
                buildingsDict[item.id].sensors = []
              })
            }
            // GATEWAYS
            if (item.gateways) {
              item.gateways.forEach((item) => {
                gateways.push(item.id)
                gatewaysDict[item.id] = Object.assign({}, item)
                gatewaysDict[item.id].floor = gatewaysDict[item.id].floorId
                delete gatewaysDict[item.id].floorId
                if (floors.length > 0 && gatewaysDict[item.id] && gatewaysDict[item.id].floor && floorsDict[gatewaysDict[item.id].floor]) {
                  gatewaysDict[item.id].building = floorsDict[gatewaysDict[item.id].floor].building
                  floorsDict[gatewaysDict[item.id].floor].gateways.push(item.id)
                  item.building = floorsDict[gatewaysDict[item.id].floor].building
                  buildingsDict[item.building].gateways.push(item.id)
                } else {
                  gatewaysDict[item.id].building = null
                }
                gatewaysDict[item.id].team = gatewaysDict[item.id].teamId
                delete gatewaysDict[item.id].teamId
                gatewaysDict[item.id].devices = []
                gatewaysDict[item.id].sensors = []
              })
            }
            devicesDict = item.devices
            devicesSummaryDict = item.deviceSummaries
            dashboardDict = item.dashboards
            // Team
            if (item.id) {
              teamsDict[item.id] = Object.assign({}, item)
              teamsDict[item.id].buildings = buildings
              teamsDict[item.id].floors = floors
              teamsDict[item.id].gateways = gateways
              teamsDict[item.id].devices = []
              teamsDict[item.id].sensors = []
              item = teamsDict[item.id]
              teamsList.push(teamsDict[item.id])
            }
          })
          context.commit('team/OnGetAll', teamsList, { root: true })
          context.commit('team/OnInitDict', teamsDict, { root: true })
          context.commit('building/OnInitDict', buildingsDict, { root: true })
          context.commit('floor/OnInitDict', floorsDict, { root: true })
          context.commit('gateway/OnInitDict', gatewaysDict, { root: true })
          context.commit('dashboard/OnGetAll', dashboardDict, { root: true })
          context.dispatch('device/getAll', { device: devicesDict, devicesSummary: devicesSummaryDict }, { root: true })
        }
        resolve(response)
      })
    })
    return outPromise
  }
}

const mutations = {
  OnUserAssets (state, teams) {
    state.userAssetsLoaded = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
