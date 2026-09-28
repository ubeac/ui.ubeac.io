<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--down-triangle">
    <svg
      viewBox="0 0 33.19 27.78"
      @click="$emit('click')">
      <polygon
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        points="16.59 27.78 0 0 33.19 0 16.59 27.78"/>
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
  .map-pin-icon.map-pin-icon--down-triangle .icon {
    font-size: .4em;
    top: 40%;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinDownTriangle',
  mixins: [ PinMixin ]
}
</script>
