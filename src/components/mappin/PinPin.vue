<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--pin">
    <svg
      viewBox="0 0 28 36"
      @click="$emit('click')">
      <path
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        d="M12.66,34S25.32,19.9,25.32,12.9A12.66,12.66,0,1,0,0,12.9C0,19.9,12.66,34,12.66,34Z"
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
  .map-pin-icon.map-pin-icon--pin .icon {
    top: 40%;
    font-size: 0.45em;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinPin',
  mixins: [ PinMixin ]
}
</script>
