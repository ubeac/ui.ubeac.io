<template>
  <div class="component-map-pin-selector lined">
    <label class="col-form-label">
      {{ $t('map_pin_size_selector') }}
    </label>
    <p>
      <datalist id="tickmarks">
        <option value="1"/>
        <option value="2"/>
        <option value="3"/>
        <option value="4"/>
        <option value="5"/>
        <option value="6"/>
        <option value="7"/>
      </datalist>
      <input
        v-model="selected"
        class="w-100 mt-3"
        min="1"
        max="7"
        type="range"
        list="tickmarks"
        @input="onInput">
    </p>
  </div>
</template>

<script>
export default {
  name: 'MapPinSelector',
  props: {
    value: {
      default: 1,
      required: false,
      type: [Object, Boolean, String, Number]
    }
  },
  data () {
    return {
      selected: 1
    }
  },
  mounted  () {
    this.selected = this.value
  },
  methods: {
    onInput (event) {
      this.$emit('input', this.selected)
    }
  }
}
</script>
