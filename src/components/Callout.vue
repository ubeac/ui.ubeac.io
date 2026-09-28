<template>
  <ComponentContainer>
    <div :class="classList">
      <slot/>
    </div>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'Callout',
  props: {
    variant: {
      type: [String, Boolean],
      required: false,
      default: false
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
  }
}
</script>
