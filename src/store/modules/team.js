import Server from '@/service/server'
import _ from 'lodash'
import GettersMixin from '@/mixin/storeGetters'
import MutationsMixin from '@/mixin/storeMutations'

const state = {
  dict: {}
}

const getters = Object.assign(_.cloneDeep(GettersMixin), {
  buildingsCount (state) {
    return (id) => {
      let out = 0
      if (state.dict[id].buildings) {
        out = state.dict[id].buildings.length
      }
      return out
    }
  }
})

const actions = {
  getAll (context) {
  },
  checkNamespaceExists (context, payload) {
    const promise = Server.TeamExists({ id: payload })
    return promise
  },
  add (context, teamModel) {
    const promise = Server.AddTeam(teamModel)
    promise.then((result) => {
      context.commit('OnAdd', result.body.data)
    })
    return promise
  },
  delete (context, id) {
    const promise = Server.DeleteTeam({ id: id })
    promise.then((result) => {
      context.commit('OnDelete', result.body.data)
      context.dispatch('workspace/getAll', null, { root: true })
      // context.dispatch('userassets/getUserAssetsAndDevices', null, { root: true })
    })
    return promise
  },
  update (context, teamModel) {
    const promise = Server.UpdateTeam(teamModel)
    promise.then((result) => {
      context.commit('OnUpdate', result)
      context.dispatch('userassets/getUserAssets', null, { root: true })
    })
    return promise
  },
  invokeToken (context, tokenModel) {
    console.log('in Action')
    const promise = Server.InvokeToken(tokenModel)
    promise.then((result) => {
      // let tokenObj = {
      //   accessToken: result.body.data,
      //   accessLevel: tokenModel.accessLevel
      // }
      context.commit('OnInvokeToken')
    })
    return promise
  },
  removeToken (context, tokenModel) {
    const promise = Server.RemoveToken(tokenModel)
    promise.then((result) => {
      context.commit('OnRemoveToken')
    })
    return promise
  }
}

const mutations = Object.assign(_.cloneDeep(MutationsMixin), {
  OnUpdateDeviceData (state, payload) {
    state.dict = _.merge(_.cloneDeep(state.dict), payload)
  },
  OnInitDict (state, payload) {
    // state.dict = payload
  },
  OnAdd (state, teamId) {
    state.team = teamId
  },
  OnDelete (state, payload) {
  },
  OnUpdate (state, payload) {
  },
  OnClearDict (state, payload) {
    state.dict = {}
  },
  OnGetAll (state, payload) {
    let dict = {}
    payload.forEach((item) => {
      dict[item.id] = item
    })
    state.dict = dict
  },
  OnInvokeToken (state, payload) {
  },
  OnRemoveToken (state, payload) {
  }
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
