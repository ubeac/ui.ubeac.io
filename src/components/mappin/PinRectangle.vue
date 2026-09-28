<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--rectangle">
    <svg
      viewBox="0 0 32 36"
      @click="$emit('click')">
      <path
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        d="M26.29.23H3.55A3.56,3.56,0,0,0,0,3.79V26.54a3.56,3.56,0,0,0,3.55,3.55H13L15.17,34,17,30.09h9.33a3.56,3.56,0,0,0,3.55-3.55V3.79A3.56,3.56,0,0,0,26.29.23Z"
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
  .map-pin-icon.map-pin-icon--rectangle .icon {
    top: 43%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinRectangle',
  mixins: [ PinMixin ]
}
</script>
