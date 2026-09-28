<template>
  <ComponentContainer>
    <b-tabs
      v-if="gatewayItem"
      :no-fade="true"
      lazy
      class="card-tabs"
      card>
      <b-tab
        :title="$t('general.live_data')"
        active>
        <!--Details-->
        <EntityDetailsHead
          :item="gatewayItem"
          :info-cards="infoCards"
          :edit-url="editUrl"
          class="mb-3"
          type="gateway"
        >
          <!--<template slot="headerSide">-->
          <!--<GatewayCopyUrl-->
          <!--v-if="gatewayItem"-->
          <!--:uid="true"-->
          <!--:title="gatewayItem.name"-->
          <!--:url="gatewayItem.url"-->
          <!--:gateway-url-default="false"-->
          <!--:qr-code="false"-->
          <!--class="pl-2 pl-sm-0 pt-sm-0 pr-2 float-right entity-details-url gateway-entity-head-details"-->
          <!--/>-->
          <!--</template>-->
        </EntityDetailsHead>
        <GatewayDataTableLive
          :id="id"
          :gateway-item="gatewayItem" />
        <div class="px-3">
          <b-card
            no-body
            class="no-radius mb-0 card-help">
            <b-card-body class="p-3">
              <icon
                class="mr-2"
                name="help" />
              {{ $t('general.gateway_limitation') }}
              <small v-html="$t('general.gateway_warning')"/>
            </b-card-body>
          </b-card>
        </div>
      </b-tab>
      <b-tab
        :title="$t('general.general')"
      >
        <div
          v-if="gatewayItem.description"
          class="lined noline">
          <p
            class="my-2 entity-details-description">
            {{ gatewayItem.description }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("data.created") }}
          </label>
          <p>
            {{ gatewayItem.createDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.update") }}
          </label>
          <p>
            {{ gatewayItem.updateDate | moment("from") }}
          </p>
        </div>
        <div
          v-if="building"
          class="lined">
          <label>
            {{ $t("form.address") }}:
          </label>
          <p>
            {{ building.address.postal_code }}
            {{ building.address.address1 }}
            {{ building.address.city }}
            {{ building.address.province }}
            {{ building.address.country }}
          </p>
        </div>
        <GatewayHelpBox
          :firmware-id="gatewayItem.firmwareId" />
        <div
          class="lined">
          <label>
            {{ $t("manage.sensors.sensors") }}
          </label>
          <p>
            <EntitySensors :sensors="gatewaySensorsList" />
          </p>
        </div>
      </b-tab>
      <b-tab
        v-if="building && building.id"
        :title="$t('intro.map')"
        class="py-0">
        <MapGeo
          :zoom="16"
          :style="{height: '600px'}"
          :searchable="false"
          :draggable="false"
          :controls="false"
          :clickable="false"
          :lat="building.latitude"
          :lng="building.longitude"
          class="border-radius-6 overflow-hidden"
        />
      </b-tab>
      <b-tab
        v-if="building && building.id"
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
    </b-tabs>
    <DataListNoResult v-else />
  </ComponentContainer>
</template>

<script>
import GatewayCopyUrl from './CopyUrl'
import EntityDetails from '@/mixin/entityDetails'
import GatewayDataTableLive from './DataTableLive'
import GatewayHelpBox from '@/components/gateway/HelpBox'

export default {
  name: 'GatewayDetails',
  components: { GatewayHelpBox, GatewayCopyUrl, GatewayDataTableLive },
  mixins: [EntityDetails],
  data () {
    return {
      gatewaySensorsList: {},
      cached: true,
      selectedManufacturer: null,
      selectedProduct: null,
      type: 'gateway'
    }
  },
  computed: {
    infoCards () {
      return [
        {
          title: this.$t('badge.last_request'),
          value: this.gatewayItem.lastRequestDate,
          icon: 'last-request',
          type: 'date'
        },
        {
          title: this.$t('badge.requests'),
          value: this.gatewayItem.requestCount,
          icon: 'request',
          type: 'bigNumber'
        },
        {
          title: this.$t('badge.devices'),
          value: this.gatewaysDevicesCount(this.id),
          icon: 'device'
        }
        // {
        //   title: this.$t('badge.sensors'),
        //   value: this.gatewaysSensorsCount(this.id),
        //   icon: 'sensor'
        // }
      ]
    },
    team () {
      let out = this.gatewaysTeam(this.id)
      return out
    },
    markers () {
      let out = []
      if (this.gatewayItem) {
        out.push({
          obj: this.gatewayById(this.gatewayItem.id),
          id: this.gatewayItem.id,
          title: this.gatewayItem.name,
          type: 'gateway',
          pinNum: 1,
          x: this.gatewayItem.x,
          y: this.gatewayItem.y
        })
      }
      return out
    },
    currentFloorPlan () {
      let out = ''
      if (this.floor && this.floor.planFileId) {
        out = this.getImageUrl(this.floor.planFileId)
      }
      return out
    },
    floor () {
      let out = this.gatewaysFloor(this.id)
      this.gatewayItem.floor = out
      return out
    },
    building () {
      let out = this.gatewaysBuilding(this.id)
      this.gatewayItem.building = out
      return out
    },
    selectedFirmware () {
      let out = null
      if (this.selectedProduct) {
        out = this.selectedProduct.firmwares.find(item => {
          return item.id === this.gatewayItem.gatewayFirmwareId
        })
      }
      return out
    },
    gatewayItem () {
      return this.gatewayById(this.id)
    }
  },
  mounted () {
    this.getGatewayItem()
  },
  methods: {
    getGatewayItem () {
      let item = this.gatewayItem
      if (item) {
        const manufacturer = this._.cloneDeep(
          this.manufacturerByFirmware(item.firmwareId)
        )
        if (manufacturer) {
          this.selectedManufacturer = manufacturer
        }
        const gateway = this._.cloneDeep(
          this.productByFirmware(item.firmwareId)
        )
        if (gateway) {
          this.selectedProduct = gateway
        }
        this.getGatewaySensors()
      }
      return item
    },
    getGatewaySensors () {
      let typesDict = {}
      let out = []
      if (this.gatewayItem && this.gatewayItem.devices) {
        this._.each(this.gatewayItem.devices, deviceId => {
          let device = this.deviceById(deviceId)
          if (device && device.sensors) {
            out.push(...device.sensors)
          }
        })
        out.forEach(item => {
          let sensorObj = this.sensorById(item)
          if (sensorObj && sensorObj.type) {
            if (typesDict[sensorObj.type.name]) {
              typesDict[sensorObj.type.name].count =
                typesDict[sensorObj.type.name].count + 1
              typesDict[sensorObj.type.name].list.push(sensorObj)
            } else {
              typesDict[sensorObj.type.name] = {
                list: [],
                type: sensorObj.type.type,
                name: sensorObj.type.name,
                count: 1
              }
            }
          }
        })
        this.gatewaySensorsList = typesDict
      }
      return typesDict
    }
  }
}
</script>
