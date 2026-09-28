<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--circle">
    <svg
      viewBox="0 0 30 36"
      @click="$emit('click')">
      <path
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        d="M28.23,14.36A14.11,14.11,0,1,0,11.36,28.21l3,5.57,2.14-4.71.4-.87A14.13,14.13,0,0,0,28.23,14.36Z"
        transform="translate(1 1)"/>
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
  .map-pin-icon.map-pin-icon--circle .icon {
    top: 43%;
    left: 51%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinCircle',
  mixins: [ PinMixin ]
}
</script>
