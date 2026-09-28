// import Config from '../../config/config'
import Socket from '@/service/socket'
import Config from '@/config/config'
import lodash from 'lodash'
import EventBus from '@/events/event-bus'
const state = {
  socket: null,
  socketPublicDataCount: 0,
  socketGroupDataCount: 0,
  joinedGroups: {}
}

const getters = {
  socketStatus (state) {
    let out = false
    if (state.socket) {
      out = state.socket.status
    }
    return out
  },
  socketPublicDataCount (state) {
    return state.socketPublicDataCount
  },
  socketGroupDataCount (state) {
    return state.socketGroupDataCount
  },
  joinedGroups (state) {
    return state.joinedGroups
  },
  socket (state) {
    return state.socket
  }
}

const actions = {
  reConnect (context) {
    lodash.each(context.state.joinedGroups, (item, groupId) => {
      context.state.socket.join(groupId).then(() => {
      })
    })
  },
  startGlobalSocketConnection (context, payload) {
    let promise = context.dispatch('startConnection', Config.socketURL)
    promise.then((socketObject) => {
      context.commit('OnInitializeGlobalSocket', socketObject)
      EventBus.$emit('SOCKET_GLOBAL_CONNECTION_START')
    })
    return promise
  },
  onPublicDataSocket ({ state }, payload) {
    // TODO: Because of clean history of mutation, there is no need to commit
    state.socketPublicDataCount = state.socketPublicDataCount + 1
    EventBus.$emit('PUBLIC_DATA_SOCKET')
  },
  onGroupDataSocket ({ state }, payload) {
    // console.log('Store on Group Data Socket  ' + payload.groupId)
    // console.log(payload.payload)
    // TODO: Because of clean history of mutation, there is no need to commit
    state.socketGroupDataCount = state.socketGroupDataCount + 1
    EventBus.$emit(payload.groupId, {
      data: payload.payload,
      groupId: payload.groupId
    })
  },
  startConnection ({ commit, state, dispatch }, url) {
    this.data = []
    if (state.socket) {
      state.socket.connection.stop()
    }
    const socket = new Socket(url)
    socket.onPublicData = (payload) => dispatch('onPublicDataSocket', payload)
    socket.onGroupData = (groupId, payload) => dispatch('onGroupDataSocket', { groupId, payload })
    socket.onDisconnect = () => {
      EventBus.$emit('SOCKET_GLOBAL_DISCONNECTION')
    }
    return new Promise((resolve, reject) => {
      socket.start().then(() => {
        commit('OnInitializeSocket', socket)
        resolve(socket)
      }, error => {
        reject(error)
      })
    })
  },
  stopConnection (context) {
    return new Promise((resolve, reject) => {
      context.state.socket.stop().then(() => {
        context.commit('OnStopSocket')
        resolve()
      }, error => {
        reject(error)
      })
    })
  },
  leaveGroupSocket (context, groupId) {
    let out = true
    if (context.state.joinedGroups[groupId]) {
      if (context.state.joinedGroups[groupId].subscriberCount === 1) {
        out = new Promise((resolve, reject) => {
          context.state.socket.leave(groupId).then(() => {
            context.commit('OnLeaveGroupSocket', groupId)
            resolve()
          }, error => {
            reject(error)
          })
        })
      } else {
        context.state.joinedGroups[groupId].subscriberCount -= 1
      }
    }
    return out
  },
  joinGroupSocket (context, groupId) {
    return new Promise((resolve, reject) => {
      let error = 'error'
      if (context.state.joinedGroups[groupId]) {
        context.state.joinedGroups[groupId].subscriberCount += 1
        resolve()
      } else {
        context.state.joinedGroups[groupId] = {
          subscriberCount: 1
        }
        if (groupId === '' || groupId === 'undefined') {
          console.log('Socket: Group id to join is invalid :(')
          reject(error)
        }
        context.state.socket.join(groupId).then(() => {
          context.commit('OnJoinGroupSocket', groupId)
          resolve()
        }, error => {
          reject(error)
        })
      }
    })
  }
}

const mutations = {
  OnInitializeGlobalSocket (state, payload) {
    state.socket = payload
  },
  OnInitializeSocket (state, payload) {
    // state.socket = payload
  },
  OnJoinGroupSocket (state, payload) {
    // state.joinedGroups.push(payload)
  },
  OnLeaveGroupSocket (state, payload) {
    if (state.joinedGroups[payload]) {
      delete state.joinedGroups[payload]
    }
  },
  OnStopSocket (state, payload) {
    state.socket = null
    state.joinedGroups = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
