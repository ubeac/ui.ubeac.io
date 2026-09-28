<template>
  <ComponentContainer>
    <label :class="classList">
      <input
        :value="value"
        :checked="isChecked"
        type="checkbox"
        class="switch-input"
        @change="handleChange">
      <template v-if="isOn">
        <span
          :data-on="on"
          :data-off="off"
          class="switch-label"/>
      </template>
      <template v-else>
        <span class="switch-label"/>
      </template>
      <span class="switch-handle"/>
    </label>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'Switch',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true
    },
    uncheckedValue: {
      type: Boolean,
      required: false,
      default: false
    },
    checked: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: 'default'
    },
    variant: {
      type: String,
      required: false,
      default: ''
    },
    pill: {
      type: Boolean,
      required: false,
      default: false
    },
    on: {
      type: String,
      required: false,
      default: null
    },
    off: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    classList () {
      return [
        'switch',
        this.switchType,
        this.switchVariant,
        this.switchPill,
        this.switchSize
      ]
    },
    switchType () {
      return this.type ? `switch-${this.type}` : `switch-default`
    },
    switchVariant () {
      return this.variant ? `switch-${this.variant}` : `switch-secondary`
    },
    switchPill () {
      return !this.pill ? null : `switch-pill`
    },
    switchSize () {
      return this.size ? `switch-${this.size}` : ''
    },
    isChecked () {
      return this.checked === this.value
    },
    isOn () {
      return !this.on ? null : true
    }
  },
  methods: {
    handleChange ({ target: { checked } }) {
      this.$emit('change', checked ? this.value : this.uncheckedValue)
    }
  }
}
</script>
