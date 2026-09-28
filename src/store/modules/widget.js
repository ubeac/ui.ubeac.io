import Server from '@/service/server'

const state = {
  list: []
}

const getters = {
  list: (state) => {
    return state.list
  }
}

const actions = {
  setCurrentWidgetList (context, payload) {
    context.commit('OnGetAll', payload)
  },
  getAll (context) {
    const promise = Server.GetCards()
    promise.then((response) => {
      context.commit('OnGetAll', response.body.data)
    })
    return promise
  },
  add (context, payload) {
    let promise = Server.AddCard(payload)
    return promise
  },
  update (context, payload) {
    let promise = Server.UpdateCard(payload)
    return promise
  },
  delete (context, id) {
    let promise = Server.DeleteCard({
      id: id
    })
    return promise
  }
}

const mutations = {
  OnGetAll (state, payload) {
    state.list = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
