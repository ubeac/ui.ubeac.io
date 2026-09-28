<template>
  <span class="widget-icon" >
    <i
      v-if="name == 'firmware'"
      class="icon icon-sensors"/>
    <i
      v-if="name == 'product'"
      class="icon icon-device"/>
    <i
      v-if="name == 'stepcount'"
      class="icon icon-step-count"/>
    <i
      v-if="name == 'signalstrength'"
      class="icon icon-signal"/>
    <i
      v-if="name == 'rssi'"
      class="icon icon-signal"/>
    <i
      v-if="name == 'gps'"
      class="icon icon-crosshairs"/>
    <i
      v-if="name == 'magneticfield'"
      class="icon icon-magnet"/>
    <i
      v-if="name == 'longitude'"
      class="icon icon-longitude"/>
    <i
      v-if="name == 'location'"
      class="icon icon-map-marker-alt"/>
    <i
      v-if="name == 'location (gps)'"
      class="icon icon-map-marker-alt"/>
    <i
      v-if="name == 'illuminance'"
      class="icon icon-light"/>
    <i
      v-if="name == 'SensorAcceleration'"
      class="icon icon-acceleration"/>
    <i
      v-if="name == 'CustomWidget'"
      class="icon icon-text-document"/>
    <i
      v-if="name == 'TextWidget'"
      class="icon icon-text-document"/>
    <i
      v-if="name == 'IndicatorLiveWidget'"
      class="icon icon-temperature"/>
    <i
      v-if="name == 'GridWidget'"
      class="icon icon-table"/>
    <i
      v-if="name == 'GaugeWidget'"
      class="icon icon-gauge"/>
    <i
      v-if="name == 'RawWidget'"
      class="icon icon-text-document"/>
    <i
      v-if="name == 'ChartLiveWidget'"
      class="icon icon-chart"/>
    <i
      v-if="name == 'MapWidget'"
      class="icon icon-location-map"/>
    <!-- TODO: Fix douplicate class with name floor -->
    <i
      v-if="name == 'FloorWidget'"
      class="icon icon-layer-group"/>
    <i
      v-if="name == 'MultiTrackerWidget'"
      class="icon icon-tracking"/>
    <i
      v-if="name == 'CancelThin'"
      class="icon icon-cancel"/>
    <i
      v-if="name == 'close'"
      class="icon icon-cancel"/>
    <i
      v-if="name == 'times'"
      class="icon icon-cancel"/>
    <i
      v-if="name == 'avatar'"
      class="icon icon-avatar"/>
    <i
      v-if="name == 'wizard'"
      class="icon icon-magic"/>
    <i
      v-if="name == 'user-plus'"
      class="icon icon-user-plus"/>
    <i
      v-if="name == 'times-circle'"
      class="icon icon-times-circle"/>
    <i
      v-if="name == 'lock-regular'"
      class="icon icon-key"/>
    <i
      v-if="name == 'delete'"
      class="icon icon-trash-alt"/>
    <i
      v-if="name == 'danger'"
      class="icon icon-exclamation-triangle"/>
    <i
      v-if="name == 'target'"
      class="icon icon-dot-circle"/>
    <i
      v-if="name == 'collapse'"
      class="icon icon-compress"/>
    <i
      v-if="name == 'Socket'"
      class="icon icon-socket"/>
    <i
      v-if="name == 'refresh'"
      class="icon icon-redo-alt"/>
    <i
      v-if="name == 'address'"
      class="icon icon-map-pin"/>
    <i
      v-if="name == 'sensor'"
      class="icon icon-sensors"/>
    <i
      v-if="name == 'info'"
      class="icon icon-info-regular"/>
    <i
      v-if="name == 'gateway'"
      class="icon icon-hdd"/>
    <i
      v-if="name == 'liveData'"
      class="icon icon-beat"/>
    <i
      v-if="name == 'user'"
      class="icon icon-user"/>
    <i
      v-if="name == 'setting'"
      class="icon icon-cog"/>
    <i
      v-if="name == 'default'"
      class="icon icon-dashboard"/>
    <i
      v-if="name == 'reports'"
      class="icon icon-file-contract"/>
    <i
      v-if="name == 'report'"
      class="icon icon-file-alt"/>
    <i
      v-if="name == 'manage'"
      class="icon icon-cogs"/>
    <i
      v-if="name == 'calendar'"
      class="icon icon-calendar-alt"/>
    <i
      v-if="name == 'last-request'"
      class="icon icon-heartbeat"/>
    <i
      v-if="name == 'data'"
      class="icon icon-list"/>
    <i
      v-if="name == 'kitchensink'"
      class="icon icon-fire"/>
    <i
      v-if="name == 'add'"
      class="icon icon-plus"/>
    <i
      v-if="name == 'AddThin'"
      class="icon icon-plus-thin"/>
    <i
      v-if="name == 'ble'"
      class="icon icon-bluetooth"/>
    <i
      v-if="name == 'custom' || name == 'gpu' || name == 'cpu' || name == 'n/a' || name == 'bus' ||
      name == 'revolution' || name == 'processor'"
      class="icon icon-sensors"/>
    <i
      v-if="name == 'nosensor'"
      class="icon icon-sensors"/>
    <i
      v-for="(item, key) in iconsList"
      v-if="name == key"
      :class="`icon-${key}`"
      class="icon"/>
  </span>
</template>

<script>
import IconJson from '@/fonts/.fontcustom-manifest.json'
export default {
  name: 'Icon',
  props: {
    name: {
      type: [String, Number, Boolean],
      required: true
    }
  },
  data () {
    return {
      iconsList: IconJson.glyphs
    }
  }
}
</script>
