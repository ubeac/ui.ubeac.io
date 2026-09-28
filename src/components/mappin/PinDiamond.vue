<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--diamond">
    <svg
      viewBox="0 0 34 34"
      @click="$emit('click')">
      <rect
        :fill="primaryColor"
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        x="5"
        y="5.18"
        width="23.87"
        height="23.87"
        transform="translate(17 -7) rotate(45)"/>
      <polyline
        :fill="darkerColor"
        points="20.52 30.14 16.88 33.77 13.23 30.12"/>
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
  .map-pin-icon.map-pin-icon--diamond .icon {
    font-size: .4em !important;
    top: 50%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinDiamond',
  mixins: [ PinMixin ]
}
</script>
