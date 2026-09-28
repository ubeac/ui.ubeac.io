<template>
  <ComponentContainer>
    <svg
      width="80"
      height="80"
      viewBox="0 0 160.8 180.8"
      class="indicator--container indicator--signal">
      <path
        :class="[{ 'indicator--in-active': level < 10}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M134.17,143.36c0,5.33,3.11,9.64,6.95,9.64h10.1c3.84,0,6.95-4.31,6.95-9.64V9.64c0-5.33-3.11-9.64-6.95-9.64h-10.1c-3.84,0-6.95,4.31-6.95,9.64Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 8}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M100.46,144.87c0,4.49,3.11,8.13,6.95,8.13h10.1c3.84,0,6.95-3.64,6.95-8.13V32.13c0-4.49-3.11-8.13-6.95-8.13h-10.1c-3.84,0-6.95,3.64-6.95,8.13Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 6}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M66.75,144.87c0,4.5,3.11,8.13,6.95,8.13H83.8c3.84,0,6.95-3.64,6.95-8.13V60.13c0-4.49-3.11-8.13-6.95-8.13H73.7c-3.84,0-6.95,3.64-6.95,8.13Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 4}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M33,144.41C33,149.16,36.15,153,40,153h10.1c3.84,0,6.95-3.84,6.95-8.59V84.59C57,79.84,53.93,76,50.09,76H40C36.15,76,33,79.84,33,84.59Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 2}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M0,146.9A6.34,6.34,0,0,0,6.56,153H16.1a6.34,6.34,0,0,0,6.56-6.1V104.41a6.34,6.34,0,0,0-6.56-6.1H6.56A6.34,6.34,0,0,0,0,104.41Z"/>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'SignalIndicator',
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
