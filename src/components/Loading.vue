<template>
  <ComponentContainer>
    <PulseLoader/>
  </ComponentContainer>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Loading',
  components: {
    PulseLoader
  }
}
</script>
