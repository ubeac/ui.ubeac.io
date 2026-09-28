import Server from '@/service/server'
import _ from 'lodash'

const state = {
  updateTrigger: 0,
  list: [],
  currentDashboardId: false,
  currentDashboardPreviewMode: false,
  currentDashboardEditMode: false,
  currentDashboardResetMode: false,
  currentDashboardPaused: false,
  currentDashboardData: [],
  currentDashboardSaveLoading: false
}

const getters = {
  list: (state) => {
    return state.list.sort((a, b) => {
      if (a.viewOrder === b.viewOrder) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
      }
      return a.viewOrder - b.viewOrder
    })
  },
  updateTrigger () {
    return state.updateTrigger
  },
  currentDashboardPaused (state) {
    return state.currentDashboardPaused
  },
  currentDashboardResetMode (state) {
    return state.currentDashboardResetMode
  },
  currentDashboardSaveLoading (state) {
    return state.currentDashboardSaveLoading
  },
  currentDashboardPreviewMode: (state) => {
    return state.currentDashboardPreviewMode
  },
  currentDashboardEditMode: (state) => {
    return state.currentDashboardEditMode
  },
  currentDashboardData: (state) => {
    return state.currentDashboardData
  },
  currentDashboardId: (state) => {
    return state.currentDashboardId
  },
  byId: (state) => (id) => {
    let output
    if (state.list) {
      output = state.list.find((item) => {
        return item && item.id === id
      })
    }
    return output
  }
}

const actions = {
  updateTrigger (context) {
    context.state.updateTrigger = context.state.updateTrigger + 1
  },
  setCurrentDashboardPaused (context, payload) {
    context.commit('OnSetCurrentDashboardPaused', payload)
  },
  setCurrentDashboardResetMode (context, payload) {
    context.commit('OnSetCurrentDashboardResetMode', payload)
  },
  setCurrentDashboardEditMode (context, payload) {
    context.commit('_setCurrentDashboardEditMode', payload)
  },
  setCurrentDashboardPreviewMode (context, payload) {
    context.commit('setCurrentDashboardPreviewMode', payload)
  },
  getAll (context) {
    // const promise = Server.GetDashboards({
    // teamId: context.rootGetters['workspace/teamId']
    // })
    // promise.then((response) => {
    // context.commit('OnGetAll', response.body.data)
    // })
    // return promise
  },
  updateData (context, payload) {
    const promise = Server.UpdateDashboardData(payload)
    promise.then((response) => {
      if (response.body.data) {
        context.commit('UpdateDashboardItemData', {
          id: payload.dashboardId,
          data: response.body.data
        })
      }
    })
    return promise
  },
  getData (context, id) {
    const promise = Server.GetDashboardData({
      id: id
    })
    promise.then((response) => {
      context.commit('OnGetDashboardData', {
        id: id,
        data: response.body.data
      })
    })
    return promise
  },
  add (context, payload) {
    let promise = Server.AddDashboard(payload)
    return promise
  },
  update (context, payload) {
    let promise = Server.UpdateDashboard(payload)
    return promise
  },
  delete (context, id) {
    let promise = Server.DeleteDashboard({
      id: id
    })
    return promise
  },
  clearCurrentData (context) {
    context.commit('OnClearCurrentDashboard')
  },
  setCurrentDashboardSaveLoading (context, payload) {
    context.commit('OnSetCurrentDashboardSaveLoading', payload)
  },
  updateDashboardDetails (context, payload) {
    context.commit('UpdateDashboardItemDetails', payload)
  }
}

const mutations = {
  UpdateDashboardItemDetails (state, payload) {
    let tempList = []
    _.each(state.list, (item) => {
      if (item.id === payload.id) {
        item.attributes.theme = payload.attributes.theme
      }
      tempList.push(Object.assign({}, item))
    })
    state.list = tempList
  },
  UpdateDashboardItemData (state, payload) {
    let tempList = []
    _.each(state.list, (item) => {
      if (item.id === payload.id) {
        item.widgets = payload.data
      }
      tempList.push(Object.assign({}, item))
    })
    state.list = tempList
  },
  PatchAdd (state, payload) {
    state.list.push(payload.data)
  },
  PatchUpdate (state, payload) {
    let tempList = []
    _.each(state.list, (item) => {
      if (item.id === payload.id) {
        // TODO: this must fix from socket, at the moment socket changelog always return empty list
        // in widgets attr
        let widgets = item.widgets
        item = payload.data
        item.widgets = widgets
      }
      tempList.push(item)
    })
    state.list = tempList
  },
  PatchDelete (state, payload) {
    let tempList = []
    _.each(state.list, (item) => {
      if (item.id !== payload.id) {
        tempList.push(item)
      }
    })
    state.list = tempList
  },
  OnSetCurrentDashboardPaused (state, payload) {
    state.currentDashboardPaused = payload
  },
  OnSetCurrentDashboardResetMode (state, payload) {
    state.currentDashboardResetMode = payload
  },
  OnSetCurrentDashboardSaveLoading (state, payload) {
    state.currentDashboardSaveLoading = payload
  },
  OnGetAll (state, payload) {
    state.list = payload
  },
  OnGetDashboardData (state, payload) {
    state.currentDashboardData = payload.data
    state.currentDashboardId = payload.id
  },
  OnClearCurrentDashboard (state, payload) {
    state.currentDashboardPaused = false
    state.currentDashboardResetMode = false
    state.currentDashboardSaveLoading = false
    state.currentDashboardEditMode = false
    state.currentDashboardData = []
    state.currentDashboardId = false
    state.updateTrigger = 0
  },
  _setCurrentDashboardEditMode (state, payload) {
    state.currentDashboardEditMode = payload
  },
  setCurrentDashboardPreviewMode (state, payload) {
    state.currentDashboardPreviewMode = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
