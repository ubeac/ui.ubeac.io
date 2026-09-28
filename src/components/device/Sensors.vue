<template>
  <ComponentContainer
    class="float-right w-100 card no-shadow">
  <div
    v-if="deviceUpdate"
    no-body
    class="float-left no-shadow mb-3 mt-0 w-100 page-device--sensor no-border float-right">
    <!--Sensors-->
    <h4 class="lined-header noline w-50 text-dark pb-0 float-left d-block">
      {{ $t('badge.sensors') }}
    </h4>
    <b-btn
      v-b-toggle.accordionAdd
      class="float-right mr-3 mb-4 mb-sm-2"
      variant="outline-info">
      <icon 
      v-if="!showAddSensorPanel"
      name="add" />
      <icon 
      v-if="showAddSensorPanel"
      name="close" />
      Add Sesnor
    </b-btn>
    <!-- Add New Sensor -->
    <b-collapse
      class="w-100 float-left"
      id="accordionAdd"
      v-model="showAddSensorPanel"
      accordion="my-accordion"
      role="tabpanel">
      <b-card
        no-body
        class="card-alternative no-shadow no-radius p-0 m-0 w-100 float-left">
        <h4 class="lined-header text-dark pb-2 w-100 mt-3 float-left d-block">
          {{ $t('buttons.add_sensor') }}
        </h4>
        <b-form
          inline
          class="needs-validation"
          v-if="showAddSensorPanel"
          autocomplete="nope"
          novalidate>
          <!--Uid-->
          <b-form-group :label="$t('device.uid')">
            <b-form-input
              v-validate="{
                          required: true,
                          min: 0,
                          max: 50
                          }"
              :state="errors.has($t('manage.sensors.uid_placeholder')) ? false : null"
              v-model="underAddSensor.uid"
              :placeholder="$t('manage.sensors.uid_placeholder')"
              type="text"
              autofocus
              :name="$t('manage.sensors.uid_placeholder')"/>
              <b-form-invalid-feedback v-if="errors.has($t('manage.sensors.uid_placeholder'))">
                <span
                  v-for="(error, index) in errors.collect($t('manage.sensors.uid_placeholder'))"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="isSensorUidDuplicated">
                <span>
                  {{ $t('validation.custom.deviceUidExists') }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>
          <!--Name-->
          <b-form-group :label="$t('device.sensor_name')">
            <b-form-input
              v-validate="{
                          required: true,
                          min: 2,
                          max: 150
                          }"
              :state="errors.has($t('device.sensor_name_placeholder')) ? false : null"
              v-model="underAddSensor.name"
              :placeholder="$t('device.sensor_name_placeholder')"
              type="text"
              :name="$t('device.sensor_name_placeholder')"/>
              <b-form-invalid-feedback v-if="errors.has($t('device.sensor_name_placeholder'))">
                <span
                  v-for="(error, index) in errors.collect($t('device.sensor_name_placeholder'))"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>
          <!--Description-->
          <b-form-group
            :label="$t('general.description') + ' ' + $t('general.optional')"
            class="form-control-optional">
            <b-form-textarea
              v-validate="{
                          min: 0,
                          max: 500
                          }"
              :state="errors.has('description') ? 'invalid' : null"
              v-model="underAddSensor.description"
              :rows="2"
              :placeholder="$t('device.sensor_description_placeholder')"
              type="text"
              name="description"/>
              <b-form-invalid-feedback v-if="errors.has('description')">
                <span
                  v-for="(error, index) in errors.collect('description')"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>

          <!-- Sensor Type -->
          <b-form-group :label="$t('device.sensor_type')">
            <multiselect
              :class="{ 'no-validate' : errors.has($t('device.sensor_type')) }"
              v-model="underAddSensor.type"
              :multiple="false"
              :options="_sensorTypes"
              :placeholder="$t('device.sensor_type')"
              label="name"
              @input="resetSensorUnit(underAddSensor)"/>
            <input
              v-validate="'required'"
              v-model="underAddSensor.type"
              :state="errors.has($t('device.sensor_type')) ? false : null"
              :name="$t('device.sensor_type')"
              required
              type="hidden" >
              <b-form-invalid-feedback v-if="errors.has($t('device.sensor_type'))">
                <span
                  v-for="(error, index) in errors.collect($t('device.sensor_type'))"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>
          <!-- Unit Add-->
          <b-form-group
            v-if="underAddSensor.type"
            :label="$t('device.unit')">
            <multiselect
              :class="{ 'no-validate' : errors.has('sensor_unit') }"
              v-model="underAddSensor.unit"
              :multiple="false"
              :options="underAddSensorUnitList"
              :placeholder="$t('device.unit')"
              label="name"/>
            <input
              v-validate="'required'"
              v-model="underAddSensor.unit"
              :state="errors.has(`sensor_unit`) ? false : null"
              name="sensor_unit"
              required
              type="hidden" >
              <b-form-invalid-feedback v-if="errors.has('sensor_unit')">
                <span
                  v-for="(error, index) in errors.collect('sensor_unit')"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>
          <!-- Prefix Add-->
          <b-form-group
            v-if="underAddSensor.type"
            :label="$t('device.prefix') + ' ' + $t('general.optional')">
            <multiselect
              v-model="underAddSensor.prefix"
              :multiple="false"
              :options="sensorPrefixes"
              :placeholder="$t('device.prefix')"
              label="name"/>
          </b-form-group>
          <!--Precision-->
          <b-form-group :label="$t('dashboard.widget.precision') + ' ' + $t('general.optional')">
            <b-form-input
              v-validate="{
                          regex: /^(2[0-0]|1[0-9]|[0-9])$/
                          }"
              :state="errors.has(`precision`) ? false : null"
              v-model="underAddSensor.attributes.ui_precision"
              :placeholder="$t('dashboard.widget.precision')"
              type="text"
              :name="`precision`"/>
              <b-form-invalid-feedback v-if="errors.has(`precision`)">
                <span
                  v-for="(error, index) in errors.collect(`precision`)"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>
          <IconSelector v-model="underAddSensor.attributes.ui_icon" />
          <ColorPicker v-model="underAddSensor.attributes.ui_color" />
          <ColorRange 
                       v-if="underAddSensor.attributes"
                       v-model="underAddSensor.attributes.ui_colorRange" />
          <div class="form-row form-button-row p-3">
            <b-button
              v-if="showAddSensorPanel"
              :disabled="isSensorUidDuplicated"
              :class="{'btn-loading': addSensorLoading}"
              class="btn btn-success mr-2"
              type="button"
              @click="_addSensor(underAddSensor)">
              {{ $t("buttons.submit") }}
            </b-button>
            <b-btn
              v-b-toggle.accordionAdd
              v-if="showAddSensorPanel"
              variant="secondary"
              href="#">
              {{ $t("buttons.cancel") }}
            </b-btn>
          </div>
          </b-form>
      </b-card>
    </b-collapse>
    <div 
    role="tablist">
      <b-card
        v-for="(sensor, key) in sensorByDevice(underUpdateItem.id)"
        :key="sensor.id"
        no-body
        class="mb-1 lined no-radius no-shadow">
        <b-card-header
          @click="toggleCollapse(sensor.id)"
          header-tag="header"
          class="w-100 py-3 pr-3 pl-0 ml-0 mr-0 pointer"
          role="tab">
          <span class="w-100 float-left page-device--sensor-item align-middle">
            <span class="float-left page-device--sensor-item-title align-middle">
              <span class="page-device--sensor--item-icon">
                <icon
                  v-if="sensor.type && sensor.type.name"
                  :name="sensor.type.name.toLowerCase()"
                  class="mr-2 float-left"/>
                <icon
                  v-else
                  name="nosensor"
                  class="mr-2 float-left"/>
              </span>
              {{ sensor.name }}
            </span>
            <small
              v-if="sensor.type"
              class="text-muted mt-1 ml-2 float-left align-middle d-none d-sm-block">
              {{ sensor.type.name }}
              <template v-if="sensor.prefix && sensor.prefix.name">
                ({{ sensor.prefix.name }})
              </template>
              <template v-if="sensor.unit">
                ({{ sensor.unit.name }})
              </template>
            </small>
            <b-button
              variant="info"
              v-b-tooltip
              :title="$t('device.edit_sensor') "
              v-if="sensor.id !== expanded"
              :class="{'btn-loading': sensor.id == underLoading}"
              class="btn-iconic p-2 float-right">
              <icon name="setting" />
            </b-button>
            <b-button
              variant="info"
              v-b-tooltip
              :title="$t('device.edit_sensor') "
              v-if="sensor.id === expanded"
              :class="{'btn-loading': sensor.id == underLoading}"
              class="btn-iconic p-2 float-right">
              <icon name="close" />
            </b-button>
          </span>
        </b-card-header>
        <b-collapse
          :id="`collpaseable-${sensor.id}`"
          :visible="sensor.id === expanded"
          accordion="my-accordion"
          role="tabpanel">
          <SensorUpdateForm 
          :id="id"
          @closeMe="collapseItem"
          :lazy-loaded="sensor.id === expanded"
          :sensor-obj="sensor"/>
        </b-collapse>
      </b-card>
    </div>
  </div>
  </ComponentContainer>
</template>

<script>
import SensorUpdateForm from '@/components/device/SensorUpdateForm'
import ColorPicker from '@/components/ColorPicker'
import ColorRange from '@/components/ColorRange'
import IconSelector from '@/components/IconSelector'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import Multiselect from 'vue-multiselect'
import EntityUpdateMixin from '@/mixin/entityUpdate'
export default {
  name: 'DeviceUpdateForm',
  components: {IconSelector, ColorRange, Multiselect, ColorPicker, SensorUpdateForm },
  mixins: [EntityUpdateMixin],
  data () {
    return {
      underLoadingCached: {},
      underLoading: null,
      setOneTime: false,
      addSensorLoading: false,
      updateSensorLoading: false,
      underAddSensor: {
        attributes: {},
        deviceId: this.id,
        name: ''
      },
      underUpdateItem: {},
      updateItemCached: {},
      expanded: null,
      showAddSensorPanel: false
    }
  },
  computed: {
    isSensorUidDuplicated () {
      let out = false
      this._.each(this.sensorByDevice(this.underUpdateItem.id), (item) => {
        if (item.uid === this.underAddSensor.uid) {
          out = true 
        }
      })
      return out
    },
    underAddSensorUnitList () {
      let out = null
      if (this.underAddSensor.type) {
        out = this.sensorUnitsBySensorType(this.underAddSensor.type.type)
      }
      return out
    },
    deviceUpdate () {
      const item = this.deviceById(this.id)
      if (item && this.setOneTime === false) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
        this.underUpdateItem = this._.cloneDeep(item)
        this.underAddSensor.deviceId = item.id
        this.underAddSensor.deviceUid = item.uid
        this.underAddSensor.teamId = item.teamId
        this.setOneTime = true
      }
      return item
    },
    _sensorTypes () {
      let output = []
      if (this.sensorTypes) {
        output = this.sensorTypes
        output.forEach((item) => {
          if (item.unit && item.unit !== '') {
            item.nameWithUnit = item.name + ' (' + item.unit + ')'
          } else {
            item.nameWithUnit = item.name
          }
        })
      }
      return output
    }
  },
  watch: {
    showAddSensorPanel () {
      this.resetUnderAddSensor()
    }
  },
  methods: {
    collapseItem () {
      this.expanded = null
    },
    toggleCollapse (sensorId) {
      if (this.expanded === sensorId) {
        this.expanded = null
        this.underLoading = null
      } else {
        this.expanded = sensorId
        if (!this.underLoadingCached[sensorId]) {
          this.underLoading = sensorId
          setTimeout(() => {
            this.underLoading = null
          }, 1200)
        }
        this.underLoadingCached[sensorId] = true
      }
    },
    resetSensorUnit (sensor) {
      if (this.underAddSensor.type) {
        this.underAddSensor.unit = this.sensorUnitsBySensorType(this.underAddSensor.type.type)[0]
      }
    },
    resetUnderAddSensor () {
      this.$validator.pause()
      this.underAddSensor = {
        name: null,
        attributes: {},
        description: null,
        uid: null,
        type: null,
        unit: null,
        deviceId: this.underUpdateItem.id,
        deviceUid: this.underUpdateItem.uid,
        teamId: this.underUpdateItem.teamId
      }
      setTimeout(() => {
        this.$validator.resume()
      }, 100)
    },
      @validation
    _addSensor (mainPayload) {
      let payload = this._.cloneDeep(mainPayload)
      this.addSensorLoading = true
      if (payload.type) {
        payload.type = payload.type.type
      }
      if (payload.unit) {
        payload.unit = payload.unit.id
      } else {
        delete payload.unit
      }
      if (payload.prefix) {
        payload.prefix = payload.prefix.base10
      }
      payload.teamId = this.workspaceId
      return this.addSensor(payload).then(() => {
        this.addSensorLoading = false
        this.showAddSensorPanel = false
        this.fetchDevices()
        this.resetUnderAddSensor()
      }).catch(() => {
        this.addSensorLoading = false
      })
    }
  }
}
</script>
