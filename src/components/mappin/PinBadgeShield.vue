<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--shield">
    <svg
      viewBox="0 0 26 34"
      @click="$emit('click')">
      <path
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        d="M23.33,6.06s-1.05,0-1.55,0C17.3,6,12.59.46,12.59.46a.6.6,0,0,0-.94,0S6.84,6,2.36,6L.75,6A.76.76,0,0,0,0,6.78V21.07c0,.4.06,1.05.1,1.45A7.08,7.08,0,0,0,.48,24,10.22,10.22,0,0,0,2.2,26.81a20.43,20.43,0,0,0,3.13,2.95,38.52,38.52,0,0,0,5.13,3.39,3.78,3.78,0,0,0,1.67.59,3.66,3.66,0,0,0,1.67-.59A44.86,44.86,0,0,0,18,30.41a26,26,0,0,0,2.52-2.07c.4-.38.79-.77,1.15-1.18A12.62,12.62,0,0,0,23,25.33a8.26,8.26,0,0,0,.81-1.74A3.65,3.65,0,0,0,24,22.48c0-.4,0-1.05,0-1.45V6.81A.71.71,0,0,0,23.33,6.06Z"
        transform="translate(1 0)"/>
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
  .map-pin-icon.map-pin-icon--shield .icon {
    top: 50%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinBadgeShield',
  mixins: [ PinMixin ]
}
</script>
