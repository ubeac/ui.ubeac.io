<template>
  <b-card
    class="dashboard-widget">
    <!-- Toolbox ------------------------------------------------------------------------- -->
    <WidgetToolbox
      v-if="!skeletonMode && editMode"
      :setting-visibility="false"
      @remove="remove"
      @showSettingsModal="showSettingsModal"/>
    <!-- Remove Modal ------------------------------------------------------------------------- -->
    <WidgetModalRemove
      :visibility="removeWidgetModalEnabled"
      :data="widgetData"
      @show="onShowRemoveModal"
      @hide="onHideRemoveModal"
      @ok="onOkRemoveModal"/>
    <b-alert
      show
      variant="warning">
      {{ $t("dashboard.delete_widget_message") }}
    </b-alert>
  </b-card>
</template>
<script>
import WidgetBaseMixin from '@/components/widgets/mixins/base'
export default {
  name: 'DeletedWidget',
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
