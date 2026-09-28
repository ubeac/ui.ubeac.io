<template>
  <div class="widgets-preview-container">
    <template v-if="settings">
      <MapGeoV2
        ref="mapitem"
        :enable-fit-bound="false"
        :roads-density="settings.roadsDensity | int"
        :landmarks-density="settings.landmarksDensity | int"
        :labels-density="settings.labelsDensity | int"
        :all-infobox-visible="settings.allInfoboxVisible"
        :searchable="false"
        :center="validateCenter"
        :zoom="settings.defaultZoom | int"
        :draggable="false"
        :controls="settings.controls"
        :clickable="false"
        :markers="markers"
        :show-info-box="settings.allInfoboxVisible"
        :custom-markers="true"
        :map-type-id="settings.mapTypeId"
        class="widgets-border-radius overflow-hidden"
        @onMapTypeChanged="onMapTypeChanged"
        @onCenterChanged="onCenterChanged"
        @onZoomChanged="onZoomChanged"/>
    </template>
  </div>
</template>
<script>
import Moment from 'moment'
import MapGeoV2 from '@/components/map/GeoMapV2.vue'
import LiveWidgetMixin from '@/components/widgets/mixins/live'
import EntitiesMixin from '@/mixin/entities'
import HistoricalMixin from '@/components/widgets/mixins/historical'
export default {
  name: 'MapLiveWidgetPreview',
  components: { MapGeoV2 },
  mixins: [LiveWidgetMixin, EntitiesMixin, HistoricalMixin],
  data () {
    return {
      applyHistoricalDataDebounce: null,
      markers: {},
      updateDebounceTimer: null
    }
  },
  computed: {
    validateCenter () {
      let out
      if (this.followingDeviceCenter) {
        out = this.followingDeviceCenter
      } else {
        out = this.settings.defaultCenter ? this.settings.defaultCenter : { lat: 43.64962701058062, lng: -79.3569616880268 }
      }
      return out
    },
    followingDevice () {
      // Handle old map widgets
      if (this.settings.sensorFilter === null) {
        this.$set(this.settings, 'sensorFilter', [])
      }
      return this.settings.sensorFilter.find((i) => { return i.mustFollow })
    },
    followingDeviceCenter () {
      let out
      if (this.followingDevice && this.followingDevice.data && this.markers[this.followingDevice.data.deviceIds[0]]) {
        out = this.markers[this.followingDevice.data.deviceIds[0]].position
      }
      return out
    },
    locationalDevice () {
      let out = this.deviceList.filter((device) => {
        return device.sensors.find((sensorId) => {
          if (this.sensorById(sensorId).type) {
            return this.sensorById(sensorId).type.type === 2
          } else {
            return false
          }
        })
      })
      if (this.settings.sensorFilter && this.settings.sensorFilter.length > 0) {
        out = this.settings.sensorFilter.map((i) => {
          if (i && i.data && i.data.deviceIds) {
            return this.deviceById(i.data.deviceIds[0])
          } else {
            return null
          }
        }).filter((i) => i !== null)
      }
      return out
    },
    locationalDeviceIds () {
      return this.locationalDevice.map((device) => {
        return device.id
      })
    },
    dashboardEditMode () {
      return this.dashboardIsEditMode
    },
    dashboardPreviewMode () {
      return this.dashboardIsPreviewMode
    }
  },
  beforeDestroy () {
    clearTimeout(this.applyHistoricalDataDebounce)
    clearInterval(this.updateDebounceTimer)
  },
  created () {
    this.markerShadow = {}
  },
  mounted () {
    clearInterval(this.updateDebounceTimer)
    this.updateDebounceTimer = setInterval(() => {
      this.markers = this.markerShadow
    }, 1000)
    this.specialUpdates()
  },
  methods: {
    onZoomChanged (event) {
      this.$emit('onZoomChanged', event)
    },
    onCenterChanged (event) {
      this.$emit('onCenterChanged', event)
    },
    onMapTypeChanged (event) {
      this.$emit('onMapTypeChanged', event)
    },
    getMarkersData () {
      let out = {}
      this.buildingList.forEach((item) => {
        let thisBuildingGateways = []
        this.gatewayList.forEach((gateway) => {
          if (gateway.floor) {
            let building = this.floorBuilding(gateway.floor)
            if (building && building.id === item.id) {
              thisBuildingGateways.push(gateway)
            }
          }
        })
        if (item && item.latitude) {
          out[item.id] = {
            type: 'building',
            defaultCenterOfMap: this.settings.defaultBuilding === item.id,
            obj: item,
            gateways: thisBuildingGateways,
            position: { lat: item.latitude, lng: item.longitude },
            contentType: 'icon',
            popupVisibility: this.settings.allInfoboxVisible,
            iconName: 'building'
          }
        }
      })
      this.locationalDevice.forEach((device) => {
        out[device.id] = {
          id: device.id,
          obj: device,
          type: 'device',
          position: null,
          sensors: {},
          trackPath: [],
          popupVisibility: false, // this.settings.allInfoboxVisible,
          contentType: 'icon',
          iconName: 'device'
        }
      })
      return out
    },
    loadHistoricalData () {
      clearTimeout(this.applyHistoricalDataDebounce)
      this.applyHistoricalDataDebounce = setTimeout(() => {
        let filter = {}
        filter.deviceIds = this.locationalDeviceIds
        filter.pageNumber = 1
        filter.pageSize = this.settings.historicalDataSize || 500
        filter.fromDate = new Moment().subtract(1, 'year').toISOString(true)
        filter.toDate = new Moment().toISOString(true)
        this.fetchSensorData(filter).then((response) => {
          if (response.body) {
            response.body.data.forEach((item) => {
              this.updateMarker(item)
            })
          }
        })
      }, 3000)
    },
    updateMarker (item) {
      let sensor = this.sensorById(item.sensorId)
      if (this.markerShadow[sensor.deviceId]) {
        if (sensor.type.type === 2) {
          let validLat = this.getValidLat(item.data)
          let validLng = this.getValidLng(item.data)
          this.markerShadow[sensor.deviceId].trackPath.push({
            lat: validLat,
            lng: validLng
          })
          this.markerShadow[sensor.deviceId].position = {
            lat: validLat,
            lng: validLng
          }
        } else {
          this.markerShadow[sensor.deviceId].sensors[item.sensorId] = item
        }
      }
    },
    specialUpdates () {
      let markerInlineCache = this.getMarkersData()
      this.markers = markerInlineCache
      this.markerShadow = this._.cloneDeep(this.markers)
      this.clearSocketThings().then(() => {
        this.startSocketThings()
      })
    },
    reload3rdParties () {
      this.$refs.mapitem.setMapStyle()
    },
    startSocketThings () {
      this._.each(this.locationalDeviceIds, (device) => {
        let groupId = `SensorData/${this.workspaceId}/*/${device}/*`
        this.joinGroupSocket(groupId)
      })
      this.firstSetup = false
    },
    getValidLng (data) {
      return data.long ? data.long : data.lng ? data.lng : data.longitude ? data.longitude : null
    },
    getValidLat (data) {
      return data.lat ? data.lat : data.latitude ? data.latitude : null
    },
    onGroupDataSocket (payload) {
      if (!this.paused) {
        this.updateMarker(payload.data)
      }
    }
  }
}
</script>
