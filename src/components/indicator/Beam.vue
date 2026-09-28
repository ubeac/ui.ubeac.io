<template>
  <ComponentContainer>
    <div
      v-show="level"
      ref="indicator"
      class="indicator--container indicator--beam"/>
  </ComponentContainer>
</template>
<style type="text/css" scoped>
.indicator--beam {
  border-radius: 100%;
  display: block;
  width: 3px !important;
  height: 3px !important;
  opacity: 1;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  10% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, .3);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}
.shadow-pulse {
  animation: pulse 4s;
}
</style>
<script>
import IndicatorMixin from './mixin'
export default {
  name: 'BeamIndicator',
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
      cachedValue: null,
      animationStartedFlag: false,
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
        jQuery(self.$refs.indicator).removeClass('shadow-pulse')
        jQuery(self.$refs.indicator).addClass('shadow-pulse')
        this.animationTimeout = setTimeout(() => {
          self.animationStartedFlag = false
        }, 4000)
      }
    }
  }
}
</script>
