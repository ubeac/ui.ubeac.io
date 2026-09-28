<template>
  <div
    class="component-color-picker lined"
    style="direction: ltr;">
    <label class="col-form-label">
      {{ $t('general.color') }}
    </label>
    <p>
      <Swatches
        :colors="colors"
        :inline="true"
        v-model="currentColor" />
    </p>
  </div>
</template>
<script>
import Swatches from '@/components/Swatches'
export default {
  components: { Swatches },
  props: {
    value: {
      default: null,
      required: false,
      type: [Array, Boolean, String]
    }
  },
  data () {
    return {
      currentColor: null,
      colors: [
        '#9B3A3A',
        '#E04343',
        '#CD6A2B',
        '#F5A623',
        '#65BF7C',
        '#2B6D5F',
        '#9D6BCA',
        '#C02F6B',
        '#0084D6',
        '#6C7B96',
        '#000000'
      ]
    }
  },
  watch: {
    value () {
      this.currentColor = this.value
    },
    currentColor: {
      deep: true,
      handler () {
        this.$emit('input', this.currentColor)
      }
    }
  },
  created () {
    if (this.value) {
      this.currentColor = this.value
    }
  }
}
</script>
