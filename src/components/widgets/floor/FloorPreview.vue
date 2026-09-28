<template>
  <div class="widgets-preview-container">
    <template
      v-if="widgetData && settings && currentFloorPlan">
      <MapFloor
        v-if="timerDone && currentFloorPlan && widgetData && settings"
        :layers-control="true"
        :plan="currentFloorPlan"
        :draggable="false"
        :theme-control="false"
        :update-trigger="updateTrigger"
        :target-trigger="updateBoundTrigger"
        :markers="markers"
        :sensors="lazySensorsLiveData"
        :center="settings.defaultCenter"
        :zoom="settings.defaultZoom"
        :show-back-to-default="true"
        :enable-fit-bounds="false"
        :controls="settings.controls"
        :show-info-box="settings.allInfoboxVisible"
        class="absolute"
        @onZoomChanged="onZoomChanged"
        @onCenterChanged="onCenterChanged"/>
    </template>
  </div>
</template>
<script>
import Moment from 'moment'
import LiveWidgetMixin from '@/components/widgets/mixins/live'
import HistoricalMixin from '@/components/widgets/mixins/historical'
export default {
  name: 'FloorLiveWidgetPreview',
  mixins: [LiveWidgetMixin, HistoricalMixin],
  data () {
    return {
      lazySensorsLiveDataTimer: null,
      lazySensorsLiveData: {},
      sensorsLiveData: {},
      showMapTimer: null,
      timerDone: false,
      updateBoundTrigger: 0,
      updateTrigger: 0
    }
  },
  computed: {
    markers () {
      let out = []
      const gateways = this.gatewayByFloorId(this.settings.floorId)
      gateways.forEach((gateway) => {
        out.push({
          obj: gateway,
          id: gateway.id,
          title: gateway.name,
          type: 'gateway',
          pinNum: 1,
          x: gateway.x,
          y: gateway.y
        })
      })
      this.currentFloorDevices.forEach((device) => {
        out.push({
          obj: device,
          id: device.id,
          title: device.name,
          type: 'device',
          pinNum: 1,
          x: device.x,
          y: device.y
        })
      })
      return out
    },
    currentFloorDevices () {
      return this.deviceByFloorId(this.settings.floorId)
    },
    currentFloorPlan () {
      let out = null
      if (this.currentFloor && this.currentFloor.planFileId) {
        out = this.getImageUrl(this.currentFloor.planFileId)
      }
      return out
    },
    currentFloor () {
      let founded = null
      founded = this.floorById(this.settings.floorId)
      return founded
    }
  },
  beforeDestroy () {
    clearTimeout(this.showMapTimer)
  },
  mounted () {
    this.showMapTimer = setTimeout(() => {
      this.timerDone = true
    }, 1000)
  },
  methods: {
    onZoomChanged (event) {
      this.$emit('onZoomChanged', event)
    },
    onCenterChanged (event) {
      this.$emit('onCenterChanged', event)
    },
    loadHistoricalData () {
      let filter = {}
      let deviceIds = []
      this._.each(this.currentFloorDevices, (device) => {
        deviceIds.push(device.id)
      })
      filter.pageNumber = 1
      filter.pageSize = this.settings.historicalDataSize || 50
      filter.fromDate = new Moment().subtract(1, 'year').toISOString(true)
      filter.toDate = new Moment().toISOString(true)
      this._.each(deviceIds, (deviceId) => {
        filter.deviceIds = [deviceId]
        this.fetchSensorData(filter).then((response) => {
          if (response.body) {
            response.body.data.forEach((item) => {
              this.$set(this.sensorsLiveData, item.sensorId, item)
              this.wakeLazySensorLiveData()
            })
          }
        })
      })
    },
    specialUpdates () {
      this.updateBoundTrigger = this.updateBoundTrigger + 1
      this.updateTrigger = this.updateTrigger + 1
      this.clearSocketThings().then(() => {
        this.updateBoundTrigger = this.updateBoundTrigger + 1
        this.updateTrigger = this.updateTrigger + 1
        this.startSocketThings()
      })
    },
    startSocketThings () {
      if (this.currentFloor) {
        this.lastSocketData = null
        this._.each(this.currentFloorDevices, (device) => {
          let groupId = `SensorData/${this.workspaceId}/*/${device.id}/*`
          this.joinGroupSocket(groupId)
        })
        this.firstSetup = false
      }
    },
    wakeLazySensorLiveData () {
      clearTimeout(this.lazySensorsLiveDataTimer)
      this.lazySensorsLiveDataTimer = setTimeout(() => {
        this.lazySensorsLiveData = this._.cloneDeep(this.sensorsLiveData)
      }, 300)
    },
    onGroupDataSocket (payload) {
      if (!this.paused) {
        let key = payload.data.sensorId
        this.$set(this.sensorsLiveData, key, payload.data)
        this.wakeLazySensorLiveData()
      }
    },
    showSettingModalSpecial () {
      this.updateBoundTrigger = this.updateBoundTrigger + 1
    }
  }
}
</script>
