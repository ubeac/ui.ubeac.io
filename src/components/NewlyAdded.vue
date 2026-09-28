<template>
  <ComponentContainer>
    <template v-if="newDevices.length > 0">
      <b-card
        v-for="device in newDevices"
        :key="device"
        no-body
        class="no-shadow card-border px-3 mb-2">
        <b-row
          v-if="deviceById(device)" >
          <b-col
            cols="12"
            lg="2"
            class="float-left pt-3">
            <icon
              style="font-size: 4em;"
              class="h1 m-auto d-block text-center mb-2 mt-1 w-100"
              name="mobile-phone" />
            <h5
              class="text-center mt-2">
              {{ deviceById(device).name }}
            </h5>
          </b-col>
          <b-col
            cols="12"
            lg="10"
            class="float-right pl-0 overflow-auto">
            <table class="table mb-0">
              <tbody>
                <tr
                  v-for="(item, sensorId) in newSensorsData"
                  v-if="sensorById(sensorId) && sensorById(sensorId).deviceId === device"
                  :style="{height: '3.5em'}">
                  <td
                    style="width: 180px;">
                    <template v-if="sensorById(sensorId) && sensorById(sensorId).type">
                      <icon
                        v-if="sensorById(sensorId) && sensorById(sensorId).type"
                        :name="sensorById(sensorId).type.name | lowercase"
                        style="position:relative; top: 3px;"
                        class="mr-3 h4 float-left d-none d-lg-table-cell"/>
                      <span class="pl-0 d-block mt-1 pl-lg-2"> {{ sensorById(sensorId).name }} </span>
                    </template>
                  </td>
                  <td style="width: 200px;">
                    <template v-if="newSensorsData[sensorId] && newSensorsData[sensorId].date" >
                      {{ newSensorsData[sensorId].date | date }}
                    </template>
                  </td >
                  <td >
                    <template v-if="newSensorsData[sensorId] && newSensorsData[sensorId].data">
                      <template
                        v-for="(value, key) in newSensorsData[sensorId].data" >
                        <span
                          :key="key">
                          <span
                            v-if="key !== 'value' && key !== 'value'"
                            class="text-capitalize">
                            {{ key }}:
                          </span>
                          <span class="text-capitalize mr-2">{{ value }}</span>
                        </span>
                      </template>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-card>
    </template>
    <b-card
      v-if="newDevices.length === 0"
      class="no-shadow card-border">
      <h3
        class="text-success text-center mt-4">
        {{ $t("wizard.waite_for_data_title") }}
      </h3>
      <h6
        class="text-primary text-center mt-2 mb-5">
        {{ $t("wizard.waite_for_data_message") }}
      </h6>
    </b-card>
  </ComponentContainer>
</template>

<script>
import SocketMixin from '@/mixin/socket'
import EntitiesMixin from '@/mixin/entities'
import HttpMethod from '@/components/HttpMethod'

export default {
  name: 'NewlyAddedDevice',
  components: { HttpMethod },
  mixins: [SocketMixin, EntitiesMixin],
  props: {
    id: {
      type: [Boolean, String],
      default: false,
      required: true
    }
  },
  data () {
    return {
      updatedSensorList: [],
      updatedDeviceList: [],
      newDevices: [],
      newSensorsData: {}
    }
  },
  methods: {
    startSocketThings () {
      this.joinGroupSocket(`GatewayData/${this.workspaceId}/${this.id}`)
    },
    extractSensors (sensorList) {
      sensorList.forEach((item) => {
        if (item) {
          this.newSensorsData[item.sensorId] = {
            data: item.data,
            date: item.dateTime
          }
          let sensorObj = this.sensorById(item.sensorId)
          if (sensorObj)  {
            if (sensorObj.type) {
              sensorObj.type = sensorObj.type.type
            }
            if (sensorObj.unit) {
              sensorObj.unit = sensorObj.unit.id
            }
            if (sensorObj.prefix) {
              sensorObj.prefix = sensorObj.prefix.base10
            } else {
              delete sensorObj.prefix
            }
            if (sensorObj.uid === 'Battery') {
              sensorObj.attributes = {
                ui_colorRange:
                '[{"value":100,"id":"max"},{"value":87.5,"color":"#2B6D5F"},{"value":75,"color":"#7BC08C"},{"value":50,"color":"#F5A623"},{"value":0,"color":"#E04343","id":"min"}]',
                ui_precision: "0",
                ui_icon: "voltage",
              }
              if (this.updatedSensorList.indexOf(sensorObj.id) < 0) {
                this.updateSensor(sensorObj)
              }
              this.updatedSensorList.push(sensorObj.id)
            } else if (sensorObj.uid === 'Location') {
              sensorObj.attributes = {
                ui_icon: "mobile-phone",
              }
              if (this.updatedSensorList.indexOf(sensorObj.id) < 0) {
                this.updateSensor(sensorObj)
              }
              this.updatedSensorList.push(sensorObj.id)
            }
          }
        }
      })
    },
    setDeviceUIThings (device) {
      device.attributes = {
        ui_color: '#E04343',
        ui_icon: 'mobile-phone',
        ui_map_pin: 'MapPinRectangle',
        ui_map_pin_size: '4'
      }
      if (this.updatedDeviceList.indexOf(device.id) < 0) {
        this.updateDevice(device)
      }
      this.updatedDeviceList.push(device.id)
    },
    extractDevices (deviceList) {
      deviceList.forEach((item) => {
        let device = this.deviceById(item.id)
        if (device) {
          if (!this.newDevices.includes(device.id)) {
            this.newDevices.push(device.id)
            this.$emit('onnewdevice', device.id)
          }
          this.extractSensors(item.sensors)
          this.setDeviceUIThings(device)
        }
      })
    },
    onGroupDataSocket (payload) {
      if (payload.data.devices) {
        this.extractDevices(payload.data.devices)
      }
    }
  }
}
</script>
