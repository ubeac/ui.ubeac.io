<template>
  <ComponentContainer>
    <svg
      ref="svgElement"
      width="80"
      height="80"
      class="indicator--container indicator--light">
      <path
        class="indicator--bar"
        d="M40,63.2c-12.8,0-23.2-10.4-23.2-23.2S27.2,16.8,40,16.8S63.2,27.2,63.2,40S52.8,63.2,40,63.2z M68,46.7L80,40
      l-12-6.7V46.7z M12,33.3L0,40l12,6.7V33.3z M40,80l6.7-12H33.3L40,80z M40,0l-6.7,12h13.3L40,0z M15.5,55.1l-3.8,13.2l13.2-3.8
      L15.5,55.1z M55.1,15.5l9.4,9.4l3.8-13.2L55.1,15.5z M11.7,11.7l3.8,13.2l9.4-9.4L11.7,11.7z M55.1,64.5l13.2,3.8l-3.8-13.2
      L55.1,64.5z"/>
    </svg>
  </ComponentContainer>
</template>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'LightIndicator',
  mixins: [IndicatorMixin],
  watch: {
    percent (newVal, oldVal) { // watch it
      this.renderChart()
    }
  },
  mounted () {
    this.renderChart()
  },
  methods: {
    deferredMountedTo () {
      // console.log('')
    },
    renderChart () {
      const size = parseInt(44)
      const radius = size / 2
      const value = Math.min(Math.max(this.percent, 0), 99.99)
      if (this.slice) {
        this.slice.parentNode.removeChild(this.slice)
      }
      // http://jsfiddle.net/lensco/ScURE/
      const svgEl = this.$refs.svgElement
      this.slice = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      this.slice.setAttribute('class', 'indicator--light-active')
      let x = Math.cos((2 * Math.PI) / (100 / value))
      let y = Math.sin((2 * Math.PI) / (100 / value))
      let longArc = (value <= 50) ? 0 : 1
      let d = 'M' + radius + ',' + radius + ' L' + radius + ',' + 0 + ', A' + radius + ',' + radius + ' 0 ' + longArc + ',1 ' + (radius + y * radius) + ',' + (radius - x * radius) + ' z'
      this.slice.setAttribute('d', d)
      /* eslint-disable spellcheck/spell-checker */
      this.slice.setAttribute('fill', '#ffeb3b')
      this.slice.style.transform = 'translate(18px, 18px)'
      /* eslint-enable spellcheck/spell-checker */
      svgEl.appendChild(this.slice)
      return this
    }
  }
}
</script>
