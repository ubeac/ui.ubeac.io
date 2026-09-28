import SocketMixin from '@/mixin/socket'
import WidgetPreviewMixin from '@/components/widgets/mixins/preview'
export default {
  mixins: [WidgetPreviewMixin, SocketMixin],
  data () {
    return {
      specialUpdateDelay: null,
      lastSocketData: null
    }
  },
  computed: {
    updateTimeDiff () {
      let out = null
      if (this.lastSocketData) {
        out = this.convert(this.lastUpdateTime.valueOf() - this.dominantValueUpdateTime.valueOf())
      }
      return out
    }
  },
  beforeDestroy () {
    clearTimeout(this.specialUpdateDelay)
  },
  methods: {
    reloadData () {
      this.specialUpdates()
    },
    startDataLoading () {
      this.startSocketThings()
    },
    specialUpdates () {
      this.clearSocketThings().then(() => {
        this.startSocketThings()
      })
    },
    startSocketThings () {
      if (this.socketIsConnected && this.settings && this.settings.sensorFilter) {
        let gatewayId = '*'
        let deviceId = this.settings.sensorFilter.deviceIds[0] || '*'
        let sensorId = this.settings.sensorFilter.sensorIds[0] || '*'
        let teams = this.teamList
        this.lastSocketData = null
        this._.each(teams, (teamItem) => {
          this.joinGroupSocket(`SensorData/${teamItem.id}/${gatewayId}/${deviceId}/${sensorId}`)
        })
        this.firstSetup = false
      }
    },
    onGroupDataSocket (payload) {
      if (!this.paused) {
        this.lastUpdateTime = new Date()
        this.lastSocketData = payload.data
      }
    },
    convert (rawDuration) {
      let isNegative = ''
      if (rawDuration < 0) {
        isNegative = '-'
      }
      let duration = Math.abs(rawDuration)
      let milliseconds = parseInt((duration % 1000) / 100)
      let seconds = parseInt((duration / 1000) % 60)
      let minutes = parseInt((duration / (1000 * 60)) % 60)
      let hours = parseInt((duration / (1000 * 60 * 60)) % 24)
      hours = (hours < 10) ? '0' + hours : hours
      minutes = (minutes < 10) ? '0' + minutes : minutes
      seconds = (seconds < 10) ? '0' + seconds : seconds
      return isNegative + hours + ':' + minutes + ':' + seconds + '.' + milliseconds
    }
  }
}
