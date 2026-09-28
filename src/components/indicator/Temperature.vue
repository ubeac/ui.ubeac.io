<template>
  <ComponentContainer>
    <svg
      width="30"
      height="115"
      viewBox="0 0 30 125"
      class="indicator--container indicator--temperature">
      <g>
        <rect
          v-for="(bar, index) in bars"
          :class="[{ 'indicator--in-active': level < index}, indicatorLevelColor]"
          :y="(bar * barHeight) + (14 - (2*index))"
          :style="{ fill: currentColor}"
          :width="12"
          :height="barHeight"
          x="9"
          class="indicator--bar "/>
        <circle
          class="indicator--bar"
          cx="15"
          cy="105"
          r="12"/>
        <circle
          :style="{ fill: currentColor}"
          class="indicator--active"
          cx="15"
          cy="105"
          r="8"/>
      </g>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'TemperatureIndicator',
  mixins: [IndicatorMixin],
  data () {
    return {
      barHeight: 7,
      bars: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    }
  },
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
