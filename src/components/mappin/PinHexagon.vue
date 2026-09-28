<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--hexagon">
    <svg
      viewBox="0 0 34 34"
      @click="$emit('click')">
      <polygon
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        points="34 14.85 25.5 0 8.5 0 0 14.85 8.5 29.7 15.17 29.7 17.17 32.84 18.44 30.43 18.83 29.7 25.5 29.7 34 14.85"/>
    </svg>
    <div
      class="marker-icon"
      @click="$emit('click')">
      <icon
        :name="icon"/>
    </div>
  </ComponentContainer>
</template>
<style>
  .map-pin-icon.map-pin-icon--hexagon .icon {
    top: 44%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinHexagon',
  mixins: [ PinMixin ]
}
</script>
