<template>
  <b-card
    class="dashboard-widget dashboard-widget--chart"
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
      v-if="(widgetData.widget && widgetData.widget.settings &&
        widgetData.widget.settings.sensorFilter && widgetData.widget.settings.sensorFilter.length ==
      0) || !widgetData.widget.settings.sensorFilter"
      ref="previewNeedCompletionEl"
      :edit-mode="editMode"
      icon="ChartLiveWidget"
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
      v-if="widgetData.widget && widgetData.widget.settings &&
      widgetData.widget.settings.sensorFilter && widgetData.widget.settings.sensorFilter.length > 0"
      ref="previewEl"
      :paused="paused"
      :widget-data="widgetData"/>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
import Preview from './ChartPreview.vue'
import Settings from './ChartSettings.vue'
export default {
  name: 'ChartLiveWidget',
  components: { Preview, Settings },
  mixins: [WidgetBaseMixin],
  data () {
    return {
      defaultSettings: {
        historicalDataSize: 1000,
        refreshTime: 1000,
        dataTimeRange: 60,
        dataCount: 1000,
        chart: {},
        sensorFilter: [],
        defaultWidth: 4,
        defaultHeight: 2
      }
    }
  }
}
</script>
