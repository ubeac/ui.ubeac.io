<template>
  <div class="map-markers">
    <ul
      class="map-markers-box">
      <li
        v-for="gateway in marker.gateways"
        :key="gateway.id"
        class="map-markers-item my-1 p-1">
        <CircleIndicator
          :value="gateway.lastSeen"/>
        <span class="ml-1"> {{ gateway.name }} </span>
        <span class="ml-2"> {{ gateway.description }} </span>
      </li>
    </ul>
    <div
      class="markers-icon p-1">
      <icon
        :name="marker.iconName"
        @click.native="toggleInfoWindow(marker,index)"/>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Indicators from '@/components/indicator/index'
import GeoMap from './GeoMap.vue'
export default {
  name: 'MapMarker',
  props: {
    marker: {
      default: null,
      type: [Boolean, Object],
      requierd: false
    }
  },
  components: { GeoMap, ...Indicators }
}
</script>
