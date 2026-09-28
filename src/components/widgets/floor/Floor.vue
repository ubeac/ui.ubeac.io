<template>
  <b-card
    class="dashboard-widget dashboard-widget--indicator"
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
      v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.floorId === null"
      ref="previewNeedCompletionEl"
      :edit-mode="editMode"
      icon="FloorWidget"
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
      v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.floorId !== null"
      ref="previewEl"
      :paused="paused"
      :widget-data="widgetData"/>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
import Preview from './FloorPreview.vue'
import Settings from './FloorSettings.vue'
export default {
  name: 'FloorLiveWidget',
  components: { Preview, Settings },
  mixins: [WidgetBaseMixin],
  data () {
    return {
      defaultSettings: {
        allInfoboxVisible: false,
        controls: true,
        defaultZoom: -1,
        defaultCenter: { lat: 50, lng: 50 },
        historicalDataSize: 100,
        floorId: null,
        deviceFilter: null,
        defaultWidth: 4,
        defaultHeight: 2
      }
    }
  }
}
</script>
