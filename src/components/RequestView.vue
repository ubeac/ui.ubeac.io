<template>
  <ComponentContainer>
    <div class="mt-4">
      <div
        v-if="controls"
        class="w-100 mb-3 d-block clearfix px-3 mt-3">
        <b-button
          v-b-tooltip.hover
          :title="$t('file.copy')"
          variant="outline-primary"
          size="sm"
          class="btn-sm btn-info ml-3 float-right"
          @click="copyToClipBoard">
          <!--contentCopyIcon-->
          <icon :name="copyIcon"/>
        </b-button>
        <b-dropdown
          id="down-sm"
          :text="contentViewFormat"
          class="float-right"
          right
          variant="outline-primary"
          size="sm">
          <b-dropdown-item @click="changeContentViewFormat('raw')">{{ $t("file.Raw") }}</b-dropdown-item>
          <b-dropdown-item @click="changeContentViewFormat('json')">{{ $t("file.Json") }}</b-dropdown-item>
          <b-dropdown-item @click="changeContentViewFormat('yaml')">{{ $t("file.Yaml") }}</b-dropdown-item>
          <b-dropdown-item @click="changeContentViewFormat('xml')">{{ $t("file.XML") }}</b-dropdown-item>
          <b-dropdown-item @click="changeContentViewFormat('html')">{{ $t("file.HTML") }}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div
        v-if="content"
        class="tab-contents">
        <Highlight
          v-if="['html', 'yaml', 'xml'].indexOf(contentViewFormat) > -1"
          :current-language="contentViewFormat"
          :code-source="content"/>
        <textarea
          v-if="contentViewFormat === 'raw'"
          ref="bodyContainer"
          :disabled="true"
          v-model="content"
          rows="5"
          class="form-control request-body--raw"/>
        <tree-view
          v-if="contentViewFormat === 'json'"
          :data="getTreeViewJsonData(content)"
          :options="{maxDepth: 2}"/>
      </div>
      <p
        v-else
        class="text-center text-muted mt-3">
        {{ $t("file.no_content_with_req") }}
      </p>
    </div>
  </ComponentContainer>
</template>
<script>
import Config from '@/config/config.js'
import Highlight from '@/components/Highlight'
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'

export default {
  name: 'RequestView',
  components: { Highlight },
  props: {
    controls: {
      type: Boolean,
      default: false,
      required: false
    },
    format: {
      type: [Boolean, String],
      default: false,
      required: false
    },
    content: {
      type: [Boolean, String],
      default: false,
      required: true
    },
    defaultFormat: {
      type: [Boolean, String],
      default: 'raw',
      required: false
    }
  },
  data () {
    return {
      contentViewFormat: this.defaultFormat,
      copyIcon: 'copy',
      showHappyClipboardTimeout: 2000,
      globalConfig: Config,
      chartUpdateInterval: null
    }
  },
  watch: {
    format () {
      this.changeContentViewFormat(this.format)
    }
  },
  methods: {
    changeContentViewFormat (payload) {
      this.contentViewFormat = payload
    },
    getTreeViewJsonData (content) {
      try {
        return JSON.parse(content)
      } catch (err) {
        return {}
      }
    },
    copyToClipBoard () {
      clipboard.writeText(this.content).then(() => {
        this.copyIcon = 'check'
        if (this.$refs.bodyContainer) {
          this.$refs.bodyContainer.focus()
          this.$refs.bodyContainer.select()
        }
        setTimeout(() => {
          this.copyIcon = 'copy'
        }, this.showHappyClipboardTimeout)
      })
    }
  }
}
</script>
