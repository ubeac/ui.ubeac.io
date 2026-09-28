<template>
  <ComponentContainer>
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      class="indicator--container indicator--gas">
      <path 
         class="indicator--in-active"
         d="M65.1,6.8c4.9,0,4.9,7.3,4.9,7.3H50.3c0.1,0,0.1-7.3,5-7.3H65.1z M88.1,25.5v77c0,3.7-1.5,6.3-4.5,7.8
         c-2.4,1.2-4.8,1.2-4.8,1.2H41.5c0,0-2.5,0-4.8-1.2c-3-1.5-4.5-4.1-4.5-7.7v-77c0-3.7,1.5-6.3,4.5-7.8c2.4-1.2,4.8-1.2,4.8-1.2h37.2
         C79.1,16.6,88.1,16.7,88.1,25.5z M85.8,25.3c0-5.1-4.4-6.5-6.7-6.5H41.2l-0.1,0c-2.5,0-6.7,1.4-6.7,6.5v77.4c0,5.1,4.4,6.5,6.7,6.5
         h37.9c0.2,0,1.7,0,3.3-0.8c2.2-1.1,3.4-3.1,3.4-5.7V25.3z M59.9,89.4l10-32.5l-10,1.3V35.8l-9.5,31.6l9.5-3V89.4z"/>
      <rect
          v-for="(bar, index) in bars"
          :class="[{ 'indicator--in-active': level < index}, indicatorLevelColor]"
          :y="(bar * barHeight) + (58 - (4*index))"
          :style="{ fill: currentColor}"
          :width="45"
          :height="barHeight"
          x="38"
          class="indicator--bar "/>
      </g>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'BatteryIndicator',
  mixins: [IndicatorMixin],
  data () {
    return {
      barHeight: 4,
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
        case 1:
          out = 'indicator--bar-danger'
          break
        case 2:
          out = 'indicator--bar-danger'
          break
        case 3:
          out = 'indicator--bar-warning'
          break
        case 4:
          out = 'indicator--bar-warning'
          break
        case 5:
          out = 'indicator--bar-normal'
          break
        case 6:
          out = 'indicator--bar-normal'
          break
        case 7:
          out = 'indicator--bar-numb'
          break
        case 8:
          out = 'indicator--bar-numb'
          break
        case 9:
          out = 'indicator--bar-happy'
          break
        case 10:
          out = 'indicator--bar-happy'
          break
      }
      return out
    }
  }
}
</script>
