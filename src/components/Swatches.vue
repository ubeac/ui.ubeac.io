<!-- Vue component -->
<!-- https://saintplay.github.io/vue-swatches/ -->
<template>
  <div style="direction: ltr;">
    <swatches
      :inline="inline"
      :colors="colors"
      :disabled="disabled"
      v-model="color"
      popover-to="bottom"
      row-length="9"
      swatch-size="24"
      shapes="circles"
      show-bordercolors="text-advanced"
      @input="update" />
  </div>
</template>

<script>
import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'
export default {
  components: { Swatches },
  props: {
    colors: {
      required: false,
      type: [Boolean, String, Array],
      default: false
    },
    inline: {
      required: false,
      type: [Boolean, String],
      default: false
    },
    disabled: {
      default: null,
      required: false,
      type: [Boolean, String]
    },
    value: {
      default: null,
      required: false,
      type: [Boolean, String]
    }
  }, // window.VueSwatches.default - from CDN
  data () {
    return {
      color: '#000000'
    }
  },
  watch: {
    value () {
      if (this.value) {
        this.color = this.value
      }
    }
  },
  mounted () {
    if (this.value) {
      this.color = this.value
    }
  },
  methods: {
    update () {
      this.$emit('input', this.color)
    }
  }
}
</script>
