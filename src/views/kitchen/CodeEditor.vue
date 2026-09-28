<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn p-4">
      <CodeEditor
        :content="contentB"
        lang="javascript"/>
      <CodeEditor
        :content="contentC"
        lang="html"/>
      <CodeEditor
        :content="contentD"
        lang="css"/>
    </div>
  </ComponentContainer>
</template>

<script>
import CodeEditor from '@/components/CodeEditor'
export default {
  name: 'CodeEditorTestPage',
  components: { CodeEditor },
  data () {
    return {
      contentB: 'var t = null;',
      contentC: '<h3>hi editor</h3>',
      contentD: '.body {border : solid red;}'
    }
  }
}
</script>
