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
      v-if="widgetData.widget && widgetData.widget.settings"
      ref="previewEl"
      :paused="paused"
      :widget-data="widgetData"
      @onMapTypeChanged="onMapTypeChanged"
      @onZoomChanged="onZoomChanged"
      @onCenterChanged="onCenterChanged"/>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
import Preview from './MapPreview.vue'
import Settings from './MapSettings.vue'
export default {
  name: 'MapLiveWidget',
  components: { Preview, Settings },
  mixins: [WidgetBaseMixin],
  data () {
    return {
      defaultSettings: {
        mapTypeId: 'terrain',
        roadsDensity: 0,
        landmarksDensity: 0,
        labelsDensity: 0,
        allInfoboxVisible: false,
        controls: true,
        defaultZoom: 8,
        defaultCenter: { lat: 43.64962701058062, lng: -79.3569616880268 },
        sensorFilter: [],
        defaultWidth: 6,
        defaultHeight: 4
      }
    }
  },
  methods: {
    _onOkSettingsModal () {
      this.data.name = this.widgetData.widget.name
      this.data.description = this.widgetData.widget.description
      this.data.widget = this.widgetData.widget
      this.data.setting = this.data.widget.setting = JSON.stringify(this.widgetData.widget.settings)
    },
    onMapTypeChanged (event) {
      this.widgetData.widget.settings.mapTypeId = event
      this.updateWidgetData(this.widgetData.widget)
      this._onOkSettingsModal()
    },
    onZoomChanged (event) {
      this.widgetData.widget.settings.defaultZoom = event
      this.updateWidgetData(this.widgetData.widget)
      this._onOkSettingsModal()
    },
    onCenterChanged (event) {
      this.widgetData.widget.settings.defaultCenter = {
        lat: event.lat(),
        lng: event.lng()
      }
      this.updateWidgetData(this.widgetData.widget)
      this._onOkSettingsModal()
    }
  }
}
</script>
