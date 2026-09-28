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
      v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.sensorFilter === null"
      ref="previewNeedCompletionEl"
      :edit-mode="editMode"
      icon="IndicatorLiveWidget"
      @showSettingsModal="showSettingsModal"/>
    <!-- Loading ------------------------------------------------------------------------- -->
    <Widgetloading
      v-if="loadingMode"/>
    <!-- Settings ------------------------------------------------------------------------- -->
    <Settings
      v-if="settingsModalEnabled"
      :preview-width="getPreviewWidth()"
      v-model="widgetData"
      :dominant-value="dominantValue"
      :visibility="settingsModalEnabled"
      @show="onShowSettingsModal"
      @hide="onHideSettingsModal"
      @updateWidgetData="updateWidgetData"
      @cancelSettingsModal="onCancelSettingsModal"
      @ok="onOkSettingsModal"/>
    <!-- Preview ------------------------------------------------------------------------- -->
    <Preview
      v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.sensorFilter !== null"
      ref="previewEl"
      :is-resizing="isResizing"
      :paused="paused"
      :widget-data="widgetData"
      @updateDominantValue="updateDominantValue"/>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
import Preview from './IndicatorPreview.vue'
import Settings from './IndicatorSettings.vue'
export default {
  name: 'IndicatorLiveWidget',
  components: { Preview, Settings },
  mixins: [WidgetBaseMixin],
  data () {
    return {
      dominantValue: null,
      defaultSettings: {
        decimalPlaces: 2,
        historicalDataSize: 20,
        sensorFilter: null,
        defaultWidth: 4,
        defaultHeight: 2,
        widgetIndicator: 'GasIndicator',
        indicatorMin: 0,
        indicatorMax: 100,
        deviceName: {
          enabled: true
        },
        unit: {
          enabled: true
        },
        lastUpdateTime: {
          enabled: true
        },
        updateTimeDiff: {
          enabled: false
        },
        chart: {
          enabled: true
        }
      }
    }
  },
  methods: {
    updateDominantValue (e) {
      this.dominantValue = e
    }
  }
}
</script>
