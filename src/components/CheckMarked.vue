<template>
  <ComponentContainer>
    <div
      v-show="visibility"
      class="component-check-marked">
      <label class="label">
        <input
          :checked="isChecked"
          class="label__checkbox d-none"
          type="checkbox">
        <span class="label__text">
          <span class="label__check">
            <!-- TODO: Check functionality -->
            <i class="icon">
              <icon
                name="check"/>
            </i>
          </span>
        </span>
      </label>
    </div>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'CheckMarked',
  props: {
    visibility: {
      type: Boolean,
      required: false,
      default: false
    },
    variant: {
      type: [String, Boolean],
      default: false
    },
    delay: {
      required: true,
      type: [Number, Boolean],
      default: false
    },
    animateDuration: {
      required: true,
      type: [Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    classList () {
      return [
        'callout',
        this.calloutVariant
      ]
    },
    calloutVariant () {
      return this.variant ? `callout-${this.variant}` : ''
    }
  },
  mounted () {
    if (this.visibility) {
      setTimeout(() => {
        this.startAnimate()
      }, this.delay)
    }
  },
  methods: {
    startAnimate () {
      this.isChecked = true
      setTimeout(() => {
        this.$emit('done')
      }, this.animateDuration)
    }
  }
}
</script>
