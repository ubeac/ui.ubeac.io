import EventBus from '@/events/event-bus'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      socketIsConnected: false,
      joinedGroup: [],
      socket: null,
      leaveGroupLoading: false,
      joinGroupLoading: false,
      socketLoading: false,
      socketData: []
    }
  },
  computed: {
    ...mapGetters({
      sensorTypeBase: 'sensor/typesWithTypeKey',
      socketJoinedGroups: 'socket/joinedGroups',
      socketObject: 'socket/socket',
      socketStatus: 'socket/socketStatus',
      socketPublicDataCount: 'socket/socketPublicDataCount',
      socketGroupDataCount: 'socket/socketGroupDataCount'
    }),
    socketStatus () {
      let out = false
      if (this.socketObject) {
        out = this.socketObject.status
      }
      return out
    }
  },
  mounted () {
    if (this.socketObject) {
      this.startSocketThings()
      this.socketIsConnected = true
    } else {
      EventBus.$on('SOCKET_GLOBAL_CONNECTION_START', (data) => {
        this.startSocketThings()
        this.socketIsConnected = true
      })
    }
  },
  beforeDestroy () {
    // TODO: fix widget preview and same scenario issues socket
    this.clearSocketThings()
  },
  methods: {
    ...mapActions({
      startConnection: 'socket/startConnection',
      stopConnection: 'socket/stopConnection',
      joinGroup: 'socket/joinGroupSocket',
      leaveGroup: 'socket/leaveGroupSocket'
    }),
    clearAllSocketEvent () {
      this.joinedGroup.forEach((joinedGroupItem) => {
        this.eventOff(joinedGroupItem)
      })
      return true
    },
    clearSocketThings () {
      return new Promise((resolve, reject) => {
        let leavePromise = []
        this.joinedGroup.forEach((joinedGroupItem) => {
          leavePromise.push(this.leaveGroupSocket(joinedGroupItem))
          this.eventOff(joinedGroupItem)
        })
        Promise.all(leavePromise).then(() => {
          this.joinedGroup = []
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    eventOff (groupId) {
      EventBus.$off(groupId, this.onGroupDataSocket)
    },
    startSocketThings () {
      // TODO: must implement in components
    },
    joinGroupSocket (groupId) {
      // console.log('component join <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ' + groupId)
      this.joinGroupLoading = true
      let promise = this.joinGroup(groupId)
      this.joinedGroup.push(groupId)
      promise.then(() => {
        this.joinGroupLoading = false
      })
      promise.catch(() => {
        this.joinGroupLoading = false
      })
      this.eventOff(groupId)
      EventBus.$on(groupId, this.onGroupDataSocket)
    },
    leaveGroupSocket (groupId = false) {
      // console.log('component Leave >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ' + groupId)
      this.leaveGroupLoading = true
      let promise = this.leaveGroup(groupId)
      promise.then(() => {
        this.eventOff(groupId)
        this.leaveGroupLoading = false
      })
      promise.catch(() => {
        this.leaveGroupLoading = false
      })
      return promise
    },
    stopSocket () {
      this.socketStopLoading = true
      const socketPromise = this.stopConnection()
      socketPromise.then((socket) => {
        this.socketStopLoading = false
        this.$forceUpdate()
      }).catch(() => {
        this.socketStopLoading = false
      })
    },
    onPublicDataSocket (data) {
      // this.socketPublicDataCount += 1
    },
    clearData () {
      this.socketData = []
    }
  }
}
