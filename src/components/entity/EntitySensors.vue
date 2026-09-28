<template>
  <ComponentContainer>
    <section class="component-entity-sensors">
      <section
        v-if="sensors && sensorLength > 0"
        class="mt-2">
        <b-badge
          v-for="sensor in sensors"
          :key="sensor.id"
          class="item mr-2 mb-2 p-1">
          <template v-if="sensor">
            <div
              v-if="sensor.name"
              class="icon-area pt-2">
              <icon
                v-if="sensor.name"
                :name="sensor.name.toLowerCase()"/>
            </div>
            <span class="main-text">
              <span>{{ sensor.name }}</span>
              <span
                v-b-tooltip.hover
                v-if="sensor.count"
                :title="$t('badge.sensors_count')">
                ({{ sensor.count }})
              </span>
            </span>
          </template>
        </b-badge>
      </section>
      <div
        v-else
        class="empty-state">
        <span>{{ $t("manage.sensors.no_sensor") }}</span>
      </div>
    </section>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'EntitySensors',
  props: {
    sensors: {
      type: [Array, Object],
      default () {
        return []
      },
      required: false
    }
  },
  computed: {
    sensorLength () {
      return Object.values(this.sensors).length
    }
  }
}
</script>
