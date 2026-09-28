<template>
  <div class="component-map-pin-selector lined">
    <label class="col-form-label">
      {{ $t('pin') }}
    </label>
    <p>
      <b-button
        v-for="item in pins"
        :key="item.name"
        :title="item"
        :class="{'component-icon-selector--selected': value === item.name}"
        style="font-size: 1.3em;"
        variant="outline-success"
        class="no-border mb-2 mr-2"
        @click="clickOnIcon(item.name)">
        <component
          :is="item"
          :color="color"
          :icon="icon" />
      </b-button>
    </p>
  </div>
</template>

<script>
import Pins from '@/components/mappin/pins.js'
export default {
  name: 'MapPinSelector',
  props: {
    value: {
      default: null,
      required: false,
      type: [Object, Boolean, String]
    },
    color: {
      default: '#ff0000',
      required: false,
      type: [Object, Boolean, String]
    },
    size: {
      default: 1,
      required: false,
      type: [Object, Boolean, String, Number]
    },
    icon: {
      default: 'default',
      required: false,
      type: [Object, Boolean, String]
    }
  },
  data () {
    return {
      pins: Pins
    }
  },
  methods: {
    clickOnIcon (name) {
      this.$emit('input', name)
    }
  }
}
</script>
