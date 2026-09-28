<template>
  <ComponentContainer>
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      class="indicator--container indicator--gas">
      <g>
        <!--
      <rect class="indicator--in-active" x="30" y="30" width="60" height="0.5"/>
      -->
        <path
          class="indicator--in-active"
          d="M90.07,24.9l-.65-.05V18a.93.93,0,0,0-.27-.68.9.9,0,0,0-.64-.26H73.45a.93.93,0,0,0-.65.26,1,1,0,0,0-.29.68V24.8H68.12L68,24.25l-2.33-10.1a6.36,6.36,0,0,0-6.22-5H36.88a6.5,6.5,0,0,0-6.55,6.44v9.28l-.58.1a7.43,7.43,0,0,0-6,7.39v68.1a7.48,7.48,0,0,0,2.16,5.28,7.32,7.32,0,0,0,5.21,2.17H89.45a7.34,7.34,0,0,0,5.25-2.17,7.48,7.48,0,0,0,2.17-5.27V32.38A7.46,7.46,0,0,0,90.07,24.9Zm-15.56-.81v-5H87.42v5.7H74.51Zm20.37,76.4a5.44,5.44,0,0,1-1.58,3.86,5.33,5.33,0,0,1-3.79,1.58H31.1a5.33,5.33,0,0,1-3.8-1.58,5.44,5.44,0,0,1-1.58-3.86V32.38a5.51,5.51,0,0,1,5.42-5.58h.3a.87.87,0,0,0,.62-.26.89.89,0,0,0,.26-.65V15.61a4.5,4.5,0,0,1,4.55-4.43H59.4a4.41,4.41,0,0,1,4.32,3.46l2.64,11.45a1,1,0,0,0,.92.72H89.45a5.51,5.51,0,0,1,5.42,5.58Z"
          transform="translate(0 0)"/>
        <path
          class="indicator--in-active"
          d="M59.29,18a2.49,2.49,0,0,0-2.42-1.9H39.72a2.52,2.52,0,0,0-2.57,2.4v6.95a1.08,1.08,0,0,0,1.09,1H59.89a1,1,0,0,0,.77-.36.94.94,0,0,0,.2-.81ZM57.8,24.48H39.12V18H57.26l.12.54,1.11,5.12.18.82Z"
          transform="translate(0 0)"/>
        <rect
          v-for="(bar, index) in bars"
          :class="[{ 'indicator--in-active': level < index}, indicatorLevelColor]"
          :y="(bar * barHeight) + (68 - (4*index))"
          :style="{ fill: currentColor}"
          :width="61"
          :height="barHeight"
          x="30"
          class="indicator--bar "/>
      </g>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'Gallon2Indicator',
  mixins: [IndicatorMixin],
  data () {
    return {
      barHeight: 3,
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
