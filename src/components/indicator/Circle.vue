<template>
  <svg
    ref="indicator"
    width="30"
    height="30"
    viewBox="-8 -3 525.8 525.8"
    class="indicator--container indicator--circle">
    <path
      :class="{
        'indicator--on': level >= 1,
        'indicator--off': level == 0
      }"
      class="indicator--bar"
      d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z"/>
  </svg>
</template>
<style type="text/css" scoped>
.indicator--circle {
  opacity: .2
}
.indicator--bar {
  fill: rgba(250, 250, 250, 1);
}
</style>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'CircleIndicator',
  mixins: [IndicatorMixin],
  props: {
    animation: {
      type: [Boolean],
      required: false,
      default: false
    }
  },
  data () {
    return {
      animationStartedFlag: false,
      animationStarted: false,
      animationTimeout: null
    }
  },
  computed: {
    level () {
      let out
      if (this.cachedValue !== this.value) {
        out = 1
        this.startLiveAnimation()
      } else {
        out = 0
      }
      this.cachedValue = this.value
      return out
    }
  },
  methods: {
    startLiveAnimation () {
      let self = this
      if (self.$refs.indicator && this.animationStartedFlag === false) {
        self.animationStartedFlag = true
        self.animationStarted = true
        jQuery(self.$refs.indicator).animate({
          opacity: 0.9
        }, 300, function () {
          jQuery(self.$refs.indicator).animate({
            opacity: 0.2
          }, 6000, function () {
            self.animationStartedFlag = false
          })
        })
      }
    }
  }
}
</script>
