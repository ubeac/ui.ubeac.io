<template>
  <ComponentContainer class="map-custom-marker p-1">
    <icon
      v-if="sensorName"
      :name="sensorName.toLowerCase()"
      class="mr-2 mt-3 ml-2"/>
    <span> {{ dominantValue }} </span>
    <span> {{ sensorUnit }} </span>
    <div class="map-custom-marker--pointer"/>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'TrickingSensor',
  mixins: [EntitiesMixin],
  props: {
    settings: {
      required: false,
      type: [Boolean, Object],
      default () {
        return {
          decimalPlaces: 2
        }
      }
    },
    sensor: {
      required: false,
      type: [Boolean, Object, String],
      default: false
    },
    sensorConfig: {
      required: false,
      type: [Boolean, Object, String],
      default: false
    }
  },
  computed: {
    dominantValue () {
      let out = ''
      if (this.sensorConfig && this.sensor) {
        out = this.sensor.data.value
        if (this.sensorConfig.sensorSelectedValue) {
          let normalizeKey = this.sensorConfig.sensorSelectedValue.toLowerCase()
          out = parseFloat(this.sensor.data[normalizeKey])
          let m = Math.pow(10, parseInt(this.settings.decimalPlaces))
          out = Math.floor(out * m) / m
        }
      }
      return out
    },
    sensorName () {
      let out = ''
      let cached = this.sensorById(this.sensor.sensorId)
      if (cached) {
        out = cached.name
      }
      return out
    },
    sensorUnit () {
      let out = ''
      let cached = this.sensorById(this.sensor.sensorId)
      if (cached && cached.unit) {
        out = cached.unit.abbr
      }
      return out
    }
  }
}
</script>
