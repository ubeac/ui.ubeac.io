<template>
  <div
    :id="editorId"
    style="width: 100%; min-height: 300px; border: 1px solid #cad5db;"/>
</template>

<script>
export default {
  name: 'CodeEditor',
  props: {
    value: {
      type: String,
      // TODO: need better text
      default: 'Default Content',
      required: true
    },
    lang: {
      type: String,
      default: 'html',
      required: true
    },
    theme: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      editorId: 'randomId' + (Math.round(Math.random() * 1000)),
      editor: Object,
      beforeContent: ''
    }
  },
  mounted () {
    const lang = this.lang || 'text'
    const theme = this.theme || 'github'
    this.editor = window.ace.edit(this.editorId)
    this.editor.setValue(this.value, 1)
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    })
    // mode-xxx.js or theme-xxx.js
    this.editor.getSession().setMode(`ace/mode/${lang}`)
    this.editor.setTheme(`ace/theme/${theme}`)
    this.editor.on('change', () => {
      const value = this.editor.getValue()
      this.beforeContent = value
      this.$emit('change', value)
      this.$emit('input', value)
      // this.value = value
    })
  }
}
</script>
