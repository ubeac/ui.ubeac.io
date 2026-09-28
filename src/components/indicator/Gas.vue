<template>
  <ComponentContainer>
    <svg
      width="30"
      height="130"
      viewBox="0 0 30 130"
      class="indicator--container indicator--gas">
      <g>
        <rect
          v-for="(bar, index) in bars"
          :class="[{ 'indicator--in-active': level < index}, indicatorLevelColor]"
          :y="(bar * barHeight) + (18 - (2*index))"
          :style="{ fill: currentColor}"
          :width="14"
          :height="barHeight"
          x="9"
          class="indicator--bar "/>
      </g>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'GasIndicator',
  mixins: [IndicatorMixin],
  data () {
    return {
      barHeight: 10,
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
    },
    indicatorLevelColor () {
      let out = ''
      switch (this.level) {
        case 10:
          out = 'indicator--bar-danger'
          break
        case 9:
          out = 'indicator--bar-danger'
          break
        case 8:
          out = 'indicator--bar-warning'
          break
        case 7:
          out = 'indicator--bar-warning'
          break
        case 6:
          out = 'indicator--bar-normal'
          break
        case 5:
          out = 'indicator--bar-normal'
          break
        case 4:
          out = 'indicator--bar-numb'
          break
        case 3:
          out = 'indicator--bar-numb'
          break
        case 2:
          out = 'indicator--bar-happy'
          break
        case 1:
          out = 'indicator--bar-happy'
          break
      }
      return out
    }
  }
}
</script>
