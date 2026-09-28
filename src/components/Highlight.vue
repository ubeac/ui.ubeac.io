<template>
  <ComponentContainer>
    <pre
      v-if="codeSource"
      ref="prelement"
      class="w-100"/>
  </ComponentContainer>
</template>
<script>
const hljs = require('highlight.js')
require('highlight.js/styles/default.css')
require('highlight.js/styles/github.css')
export default {
  name: 'Highlight',
  props: {
    codeSource: {
      default: false,
      type: [String, Boolean]
    },
    currentLanguage: {
      default: false,
      type: [String, Boolean]
    }
  },
  watch: {
    codeSource () {
      this.makeHljs()
    }
  },
  mounted () {
    this.makeHljs()
  },
  methods: {
    makeHljs () {
      // Note: hlsjs doesn't have destroy method, we must handle it ny self
      let el = this.$refs.prelement
      el.innerHTML = ''
      let codeArray = this.codeSource.split('\n')
      codeArray.forEach((item, index) => {
        let codeElement = document.createElement('code')
        codeElement.innerText = item
        el.appendChild(codeElement)
        hljs.highlightBlock(codeElement)
      })
    }
  }
}
</script>
