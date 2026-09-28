<template>
  <ComponentContainer>
    <div
      v-if="normalizedMethod === 'get'"
      class="http-get http-method">
      {{ $t('http.get') }}
    </div>
    <div
      v-if="normalizedMethod === 'post'"
      class="http-post http-method">
      {{ $t('http.post') }}
    </div>
    <div
      v-if="normalizedMethod === 'put'"
      class="http-put http-method">
      {{ $t('http.put') }}
    </div>
    <div
      v-if="normalizedMethod === 'delete'"
      class="http-delete http-method">
      {{ $t('http.delete') }}
    </div>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'HttpMethod',
  props: {
    method: {
      default: 'get',
      type: [Boolean, Object, String],
      required: true
    }
  },
  computed: {
    normalizedMethod () {
      if (this.method && this.method.toLowerCase) {
        return this.method.toLowerCase()
      } else {
        return false
      }
    }
  }
}
</script>
