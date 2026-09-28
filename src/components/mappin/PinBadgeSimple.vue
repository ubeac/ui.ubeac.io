<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--badge-simple">
    <svg
      viewBox="0 0 32 34"
      @click="$emit('click')">
      <path
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        d="M26.33.23H2.85L.91.25A.92.92,0,0,0,0,1.14V18.42c0,.48.07,1.27.12,1.75A8.56,8.56,0,0,0,.57,22a12.36,12.36,0,0,0,2.08,3.37,24.69,24.69,0,0,0,3.78,3.56A46.57,46.57,0,0,0,12.64,33a4.57,4.57,0,0,0,2,.72,4.42,4.42,0,0,0,2-.71,54.24,54.24,0,0,0,5.07-3.31,31.46,31.46,0,0,0,3-2.5c.49-.46,1-.94,1.39-1.43a15.25,15.25,0,0,0,1.65-2.21,10,10,0,0,0,1-2.1A4.42,4.42,0,0,0,29,20.13c0-.48,0-1.27,0-1.76V1.18a.86.86,0,0,0-.81-.91S26.94.23,26.33.23Z"
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
  .map-pin-icon.map-pin-icon--badge-simple .icon {
    top: 40%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinBadgeSimple',
  mixins: [ PinMixin ]
}
</script>
