import Auth from '@/service/auth'
import Store from '@/store/index'
const signalR = require('@microsoft/signalr')

export default class {
  constructor (url) {
    this.status = 'loading'
    this.id = ''
    this.url = url
    const token = Auth.getToken()
    var connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => token.access_token,
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect({ nextRetryDelayInMilliseconds: retryContext => { return 20000 } })
      .configureLogging({
        log: function (logLevel, message) {
          // console.log(new Date().toISOString() + ': ' + message)
        }
      })
      .build()

    connection.on('onConnect', (clientId) => {
      this.onConnect(clientId)
      this.id = clientId
      this.status = 'connected'
    })

    connection.on('onDisconnect', (clientId, reason) => {
      // console.log('on disconnect')
      this.onDisconnect(clientId, reason)
      this.status = 'disconnected'
    })

    // connection.onreconnecting((error) => {
    //   console.log('The client is disconnected and I am in onReconnecting status' + error)
    // })

    connection.onreconnected((connectionId) => {
      console.log('On Reconnected')
      // console.log(connection.state)
      // console.log(connectionId)
      Store.dispatch('socket/reConnect')
    })

    connection.on('onJoin', (clientId) => {
      // console.log('Socket onJoin')
      this.onJoin(clientId)
    })

    connection.on('onLeave', (clientId) => {
      // console.log('Socket onLeave')
      this.onLeave(clientId)
    })

    connection.on('onPublicData', (data) => {
      // console.log('Socket onPublicData')
      var jdata = JSON.parse(data)
      this.onPublicData(jdata)
    })

    connection.on('onPrivateData', (clientId, data) => {
      // console.log('Socket onPrivateData')
      var jdata = JSON.parse(data)
      this.onPrivateData(clientId, jdata)
    })

    connection.on('onGroupData', (groupId, data) => {
      // console.log('Socket onGroupData')
      var jdata = JSON.parse(data)
      this.onGroupData(groupId, jdata)
    })

    this.join = (groupId) => connection.invoke('join', groupId)
    this.leave = (groupId) => connection.invoke('leave', groupId)
    this.send = (data) => connection.invoke('send', data)
    this.sendToAll = (data) => connection.invoke('sendToAll', data)
    this.sendToGroup = (groupId, data) => connection.invoke('sendToGroup', groupId, data)
    this.sendToClient = (clientId, data) => connection.invoke('sendToClient', clientId, data)

    this.onPublicData = (data) => {
      // console.log('onPublicData', data)
    }
    this.onPrivateData = (clientId, data) => {
      // console.log('onPrivateData', clientId, data)
    }
    this.onGroupData = (groupId, data) => {
      // console.log('onGroupData', groupId, data)
    }
    this.onConnect = (clientId) => {
      // console.log('onConnect', clientId)
    }
    this.onDisconnect = (clientId, reason) => {
      // console.log('onDisconnect', clientId, reason)
    }
    this.onJoin = (clientId) => {
      // console.log('onJoin', clientId)
    }
    this.onLeave = (clientId) => {
      // console.log('onLeave', clientId)
    }
    // this.onReconnecting = (error) => {
    // console.log('onReconnecting', error)
    // }
    this.onReconnected = (clientId) => {
      // console.log('onReconnected', clientId)
    }
    this.connection = connection
    // this.start = () => connection.start().catch(err => console.log('***********' + err))
    this.start = async () => {
      try {
        await connection.start()
        console.assert(connection.state === signalR.HubConnectionState.Connected)
        // console.log('connected')
      } catch (err) {
        console.assert(connection.state === signalR.HubConnectionState.Disconnected)
        console.log(err)
        setTimeout(() => this.start(), 5000)
      }
    }
    this.stop = () => connection.stop()
  }
}
