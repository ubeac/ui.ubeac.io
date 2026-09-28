<template>
  <ComponentContainer
    :style="{'font-size': `${sanitizedSize}em`}"
    class="map-pin-icon map-pin-icon--badge-star">
    <svg
      viewBox="0 0 36 36"
      @click="$emit('click')">
      <path
        :stroke="darkerColor"
        :stroke-width="strokeWidth"
        :fill="primaryColor"
        d="M34.7,14.44a1.1,1.1,0,0,0-.39-1.75l-5.25-2.54a3.39,3.39,0,0,1-1.61-2l-1.3-5.71a1.1,1.1,0,0,0-1.61-.78L19.28,4.17a3.37,3.37,0,0,1-2.58,0L11.44,1.63a1.09,1.09,0,0,0-1.61.78l-1.3,5.7a3.39,3.39,0,0,1-1.61,2L1.67,12.67a1.1,1.1,0,0,0-.4,1.75L4.91,19a3.38,3.38,0,0,1,.58,2.52L4.19,27.15A1.07,1.07,0,0,0,5.3,28.52h5.83a3.41,3.41,0,0,1,2.33,1.16l3.63,4.61a1.09,1.09,0,0,0,1.79,0l3.63-4.61a3.41,3.41,0,0,1,2.33-1.16h5.83a1.07,1.07,0,0,0,1.11-1.37l-1.29-5.64A3.39,3.39,0,0,1,31.07,19Z"
        transform="translate(0 0)"/>
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
  .map-pin-icon.map-pin-icon--badge-star .icon {
    top: 48%;
    font-size: 0.45em;
  }
</style>
<script>
import PinMixin from './pinMixin.js'
export default {
  name: 'MapPinBadgeStar',
  mixins: [ PinMixin ]
}
</script>
