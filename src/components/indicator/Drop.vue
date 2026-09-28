<template>
  <ComponentContainer>
    <svg
      width="65"
      height="120"
      viewBox="0 0 115.8 180.8"
      class="indicator--container indicator--magnet">
      <path
        :class="[{ 'indicator--in-active': level < 10}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M69.63,14.9H47.92l7.3-12.82A4.06,4.06,0,0,1,61.29.88a3.85,3.85,0,0,1,1,1.19Z"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 9}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="79.73 32.59 37.84 32.59 45.82 18.57 71.73 18.57 79.73 32.59"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 8}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="89.82 50.27 27.76 50.27 35.74 36.27 81.83 36.27 89.82 50.27"/>
      <polygon
        :class="[{ 'indicator--in-active': level < 7}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        points="99.92 67.95 17.68 67.95 25.66 53.95 91.93 53.95 99.92 67.95"/>
      <path
        :class="[{ 'indicator--in-active': level < 6}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M110,85.65H7.61l.16-.29,7.81-13.71H102l7.83,13.71Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 5}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M116.54,103.34H1.12a59.38,59.38,0,0,1,4.6-14h106.2A58.79,58.79,0,0,1,116.54,103.34Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 4}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M117.3,121H.33a59.11,59.11,0,0,1,.19-14H117.14A59.19,59.19,0,0,1,117.3,121Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 3}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M116.79,124.71a59.22,59.22,0,0,1-4.2,14H5a58.49,58.49,0,0,1-4.19-14Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 2}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M110.83,142.4a58.61,58.61,0,0,1-10.2,14H17a58.92,58.92,0,0,1-9.23-12.21c-.34-.59-.66-1.19-1-1.79Z"/>
      <path
        :class="[{ 'indicator--in-active': level < 1}, indicatorLevelColor]"
        :style="{ fill: currentColor}"
        class="indicator--bar"
        d="M21,160.09H96.63a58.65,58.65,0,0,1-75.65,0Z"/>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'DropIndicator',
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
