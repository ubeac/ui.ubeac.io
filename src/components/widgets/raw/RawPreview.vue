<template>
  <div class="widgets-preview-container">
    <template v-if="widgetData.widget && widgetData.widget.settings && settings">
      <b-row class="m-0">
        <div class="w-100 p-2 pb-0">
          <vuep
            :mixin="[entityMixin, liveWidgetMixin, historicalMixin]"
            :store="storeObj"
            :data="lastSocketData"
            :widget-data="widgetData"
            v-model="settings.contentHTML" />
        </div>
      </b-row>
    </template>
  </div>
</template>
<script>
import LiveWidgetMixin from '@/components/widgets/mixins/live'
import HistoricalMixin from '@/components/widgets/mixins/historical'
import store from '@/store'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'RawWidgetPreview',
  mixins: [LiveWidgetMixin],
  data () {
    return {
      storeObj: store,
      historicalMixin: HistoricalMixin,
      liveWidgetMixin: LiveWidgetMixin,
      entityMixin: EntitiesMixin
    }
  },
  computed: {
    dominantValueUpdateTime () {
      let out = null
      if (this.lastSocketData) {
        out = new Date(this.lastSocketData.dateTime)
      }
      return out
    },
    dominantValue () {
      let out = ''
      if (this.lastSocketData) {
        out = this.lastSocketData.value
        if (this.settings.sensorFilter.sensorSelectedValue) {
          let normalizeKey = this.settings.sensorFilter.sensorSelectedValue.toLowerCase()
          out = parseFloat(this.lastSocketData.data[normalizeKey])
          let m = Math.pow(10, parseInt(this.settings.decimalPlaces))
          out = Math.floor(out * m) / m
        }
      }
      return out
    },
    dominantSensor () {
      let out = ''
      if (this.lastSocketData) {
        out = this.sensorById(this.lastSocketData.sensorId)
      }
      return out
    },
    dominantItem () {
      return this.lastSocketData
    },
    dominantGateway () {
      let out = false
      if (this.lastSocketData) {
        out = this.gatewayById(this.lastSocketData.gatewayId)
      }
      return out
    }
  }
}
</script>
