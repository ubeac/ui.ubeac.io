<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--up-triangle">
    <svg
      viewBox="0 0 33.19 27.78"
      @click="$emit('click')">
      <polygon
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        points="16.59 0 33.19 27.78 0 27.78 16.59 0"/>
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
  .map-pin-icon.map-pin-icon--up-triangle .icon {
    font-size: .4em !important;
    top: 65%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinUpTriangle',
  mixins: [ PinMixin ]
}
</script>
