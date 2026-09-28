<template>
  <b-card
    class="dashboard-widget dashboard-widget--raw"
    no-body>
    <!-- Toolbox ------------------------------------------------------------------------- -->
    <WidgetToolbox
      v-if="!skeletonMode && editMode"
      @remove="remove"
      @showSettingsModal="showSettingsModal"/>
    <!-- Remove Modal ------------------------------------------------------------------------- -->
    <WidgetModalRemove
      :visibility="removeWidgetModalEnabled"
      :data="widgetData"
      @show="onShowRemoveModal"
      @hide="onHideRemoveModal"
      @ok="onOkRemoveModal"/>
    <!-- Need completion mode ------------------------------------------------------------------------- -->
    <WidegtNeedCompletionMode
      v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.contentHTML === ''"
      ref="previewNeedCompletionEl"
      :edit-mode="editMode"
      @showSettingsModal="showSettingsModal"/>
    <!-- Loading ------------------------------------------------------------------------- -->
    <Widgetloading
      v-if="loadingMode"/>
    <!-- Settings ------------------------------------------------------------------------- -->
    <Settings
      v-if="settingsModalEnabled"
      :preview-width="getPreviewWidth()"
      v-model="widgetData"
      :visibility="settingsModalEnabled"
      @show="onShowSettingsModal"
      @hide="onHideSettingsModal"
      @updateWidgetData="updateWidgetData"
      @cancelSettingsModal="onCancelSettingsModal"
      @ok="onOkSettingsModal"/>
    <!-- Preview ------------------------------------------------------------------------- -->
    <Preview
      v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.contentHTML !== ''"
      ref="previewEl"
      :paused="paused"
      :widget-data="widgetData"/>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
import Preview from './RawPreview.vue'
import Settings from './RawSettings.vue'
export default {
  name: 'RawWidget',
  components: { Preview, Settings },
  mixins: [WidgetBaseMixin],
  data () {
    return {
      defaultSettings: {
        contentHTML: '',
        sensorFilter: null,
        defaultWidth: 4,
        defaultHeight: 2
      }
    }
  }
}
</script>
