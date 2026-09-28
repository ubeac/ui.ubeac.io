<template>
  <b-card
    class="dashboard-widget dashboard-widget--gauge"
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
      icon="GaugeWidget"
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
      :paused="paused"
      :widget-data="widgetData"
      @updateDominantValue="updateDominantValue"/>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
import Preview from './GaugePreview.vue'
import Settings from './GaugeSettings.vue'
export default {
  name: 'GaugeLiveWidget',
  components: { Preview, Settings },
  mixins: [WidgetBaseMixin],
  data () {
    return {
      dominantValue: null,
      defaultSettings: {
        decimalPlaces: 2,
        sensorFilter: null,
        defaultWidth: 3,
        defaultHeight: 3,
        min: 0,
        max: 100
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
