<template>
  <ComponentContainer>
    <b-tabs
      v-if="deviceItem"
      :no-fade="true"
      lazy
      class="card-tabs tab-content-3"
      card>
      <b-tab
        :title="$t('general.live_data')"
        active>
        <EntityDetailsHead
          :item="deviceItem"
          :info-cards="infoCards"
          :edit-url="editUrl"
          class="mb-3"
          type="device"/>
        <DeviceDataTableLive
          :id="id"
          :gateway-item="deviceItem"
          kind="device" />
      </b-tab>
      <b-tab
        :title="$t('general.general')"
      >
        <div
          v-if="deviceItem.description"
          class="lined noline">
          <p
            class="my-2 entity-details-description">
            {{ deviceItem.description }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("device.uid") }}
          </label>
          <p>
            {{ deviceItem.uid }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("data.created") }}
          </label>
          <p>
            {{ deviceItem.createDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.update") }}
          </label>
          <p>
            {{ deviceItem.updateDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("manage.sensors.sensors") }}
          </label>
          <p>
            <EntitySensors :sensors="deviceSensors(id)"/>
          </p>
        </div>
      </b-tab>
      <b-tab
        v-if="deviceItem && deviceItem.floorId"
        :style="{height: '600px'}"
        :title="$t('general.floor')"
        class="py-0">
        <MapFloor
          v-if="currentFloorPlan"
          :draggable="false"
          :plan="currentFloorPlan"
          :zoom="-2"
          :markers="markers"
          :style="{height: '600px'}"
          class="border-radius-6"
        />
      </b-tab>
      <!--TODO: remove this block-->
      <b-tab
        v-if="false"
        :title="$t('device.data_simulator')"
      >
        <DeviceSimulator
          :device-id="id"/>
      </b-tab>
    </b-tabs>
    <DataListNoResult v-else />
  </ComponentContainer>
</template>

<script>
import EntityDetails from '@/mixin/entityDetails'
import DeviceDataTableLive from '@/components/device/DataTableLive'
import EntitySensors from '@/components/entity/EntitySensors'
import DeviceSimulator from '@/components/device/Simulator'

export default {
  name: 'DeviceDetails',
  components: { EntitySensors, DeviceSimulator, DeviceDataTableLive },
  mixins: [EntityDetails],
  data () {
    return {
      deviceSummary: null,
      selectedGateway: true,
      type: 'devices'
    }
  },
  computed: {
    markers () {
      let out = []
      let self = this
      self.deviceItem.sensors = []
      if (self.deviceItem) {
        out.push({
          obj: self.deviceItem,
          id: self.deviceItem.id,
          title: self.deviceItem.name,
          type: 'device',
          pinNum: 1,
          x: self.deviceItem.x,
          y: self.deviceItem.y
        })
      }
      return out
    },
    floor () {
      return this.floorById(this.deviceItem.floorId)
    },
    currentFloorPlan () {
      let out = ''
      if (this.floor && this.floor.planFileId) {
        out = this.getImageUrl(this.floor.planFileId)
      }
      return out
    },
    infoCards () {
      return [
        {
          title: this.$t('badge.last_request'),
          value: this.deviceItem.lastRequestDate,
          icon: 'last-request',
          type: 'date'
        },
        {
          title: this.$t('badge.requests'),
          value: this.deviceItem.requestCount,
          icon: 'request',
          type: 'bigNumber'
        },
        {
          title: this.$t('badge.sensors'),
          value: this.deviceItem.sensors.length,
          icon: 'sensor'
        }
      ]
    },
    deviceItem () {
      return this.deviceById(this.id)
    }
  }
}
</script>
