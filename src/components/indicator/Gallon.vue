<template>
  <ComponentContainer>
    <svg
      width="62"
      height="110"
      viewBox="0 0 115.8 180.8"
      class="indicator--container indicator--gallon">
      <path
        :class="[{ 'indicator--in-active': level < 10}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M41.38,9.08V5A2.54,2.54,0,0,1,41.12.1a2.84,2.84,0,0,1,.72-.1h31a2.71,2.71,0,0,1,.71.1,2.54,2.54,0,0,1-.66,5v4a2.53,2.53,0,0,1,.07,5.06H41.31v0A2.54,2.54,0,0,1,41.38,9.08Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 9}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M89.92,31.8H25.58a39.69,39.69,0,0,1,5-3.27,17.27,17.27,0,0,0,10-10.74H73.67a17,17,0,0,0,9.85,10.67C84.53,29,86.92,30,89.92,31.8Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 8}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M105.93,49.48H8.28a42.87,42.87,0,0,1,3.37-5.76,42.35,42.35,0,0,1,3.25-4.11c.66-.41,3-2.15,5.66-4.13H95.07a41.84,41.84,0,0,1,9.21,10.87C104.9,47.43,105.45,48.48,105.93,49.48Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 7}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M114.41,67.17H.24A8.55,8.55,0,0,1,4.53,61.6a42,42,0,0,1,2.18-8.43H107.52a41.11,41.11,0,0,1,2.16,8.21A8.59,8.59,0,0,1,114.41,67.17Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 6}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M.14,76.93C0,76.19,0,73.11,0,70.86H114.65a42,42,0,0,1-.22,6.49,8.59,8.59,0,0,1-4.26,5.59v1.92H4.07V82.7A8.46,8.46,0,0,1,.14,76.93Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 5}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M114.05,102.55H.6a8.47,8.47,0,0,1,3.47-4.13V88.55h106.1v9.64a8.47,8.47,0,0,1,2.9,2.57A8.16,8.16,0,0,1,114.05,102.55Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 4}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M114.64,112c0,.21,0,.42,0,.63a8.52,8.52,0,0,1-4.44,6.83v.75H4.07v-1A8.54,8.54,0,0,1,0,112v-5.8H114.65C114.7,107.74,114.63,109.59,114.64,112Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 3}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M113.46,137.93H1.18a7.69,7.69,0,0,1,.89-1.25,8.62,8.62,0,0,1,2-1.71v-11h106.1v10.83A8.38,8.38,0,0,1,113.46,137.93Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 2}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M114.64,148.58a8.43,8.43,0,0,1-3.73,7H3.74A8.42,8.42,0,0,1,.1,149.8c-.09-.61-.15-6.14-.05-8.19H114.61C114.66,142.38,114.63,143.69,114.64,148.58Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 1}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M5.75,159.3H108.49a22.53,22.53,0,0,1-20.85,14h-61A22.48,22.48,0,0,1,5.75,159.3Z"/>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'GallonIndicator',
  mixins: [IndicatorMixin],
  computed: {
    level () {
      let out = Math.ceil((parseInt(this.percent) * 10) / 100)
      if (out === 0) {
        out = 1
      }
      if (out > 10) {
        out = 10
      }
      return out
    }
  }
}
</script>
