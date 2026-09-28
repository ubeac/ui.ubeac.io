<template>
  <ComponentContainer>
    <div
      ref="editor"
      :contenteditable="editable"
      class="component-editable"
      @blur="update"/>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'Editable',
  props: {
    content: {
      type: String,
      default: '',
      required: true
    },
    editable: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      text: 'This text is editable!'
    }
  },
  watch: {
    content () {
      this.$refs.editor.innerText = this.content
    }
  },
  mounted: function () {
    this.$refs.editor.innerText = this.content
  },
  methods: {
    update: function (event) {
      this.$emit('update', event.target.innerText)
    }
  }
}
</script>
