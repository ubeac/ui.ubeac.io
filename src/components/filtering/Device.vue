<template>
  <ComponentContainer>
    <b-card
      :class="{ 'card-feint': feint}"
      class="no-shadow component-filtering"
      no-body
      title="Filter Data">
      <b-card-body class="pb-2">
        <b-form
          :inline="!compact"
          :class="{ 'form-compact': compact}"
          class="needs-validation"
          autocomplete="nope"
          novalidate>
          <div 
            class="clear-both w-100 float-left"
            v-if="historical">
            <template
              v-if="fromDate.enabled">
              <!-- From -->
              <b-form-group>
                <b-input-group
                  class="mr-2"
                  size="md">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <icon
                        class="mr-1"
                        name="calendar"/>
                      {{ $t("data.from") }}
                    </span>
                  </div>
                  <date-picker
                    v-model="filterModel.fromDate"
                    :disabled="dateFilterShorthand"
                    :placeholder="$t('data.date_picker_from')"
                    :config="options"
                    class="form-control"
                    @input="autoSearch"/>
                </b-input-group>
              </b-form-group>
            </template>
            <template
              v-if="toDate.enabled">
              <!-- To -->
              <b-form-group>
                <b-input-group
                  class="mr-2"
                  size="md">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <icon
                        class="mr-1"
                        name="calendar"/>
                      {{ $t("data.to") }}
                    </span>
                  </div>
                  <date-picker
                    v-model="filterModel.toDate"
                    :disabled="dateFilterShorthand"
                    :placeholder="$t('data.date_picker_to') "
                    :config="options"
                    class="form-control"
                    @input="autoSearch"/>
                </b-input-group>
              </b-form-group>
            </template>
            <b-form-group
              class="clear-right"
              v-if="dateShortener.enabled">
              <b-button
                :variant="dateFilterShorthand === 'minute' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('minute', true)">{{ $t("data.lasts.minute") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'hour' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('hour', true)">{{ $t("data.lasts.hour") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'day' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('day', true)">{{ $t("data.lasts.day") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'week' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('week', true)">{{ $t("data.lasts.week") }}
              </b-button>
            </b-form-group>
          </div>
          <!--Device-->
          <b-form-group 
              :label="$t('general.device')"
              v-if="deviceList && deviceSelector.enabled">
            <multiselect
              class="mr-2"
              v-model="selectedDevice"
              :disabled="deviceList.length == 0 || disabled"
              :auto-close="true"
              :multiple="false"
              :options="sortedDeviceList"
              :placeholder="$t('manage.select_device')"
              label="name"
              @input="onSelectDevice()"/>
          </b-form-group>
          <template
            v-if="!novalidate" >
            <input
              v-validate="'required'"
              v-model="selectedDevice"
              :state="errors.has(`${$t('manage.select_device')}`) ? 'invalid' : null"
              :name="$t('manage.select_device')"
              required
              type="hidden" >
              <b-form-invalid-feedback 
              class="pb-2"
              v-if="errors.has(`${$t('manage.select_device')}`)">
                <span 
              v-for="error in errors.collect(`${$t('manage.select_device')}`)">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </template>
          <!--Sensor-->
          <template
            v-if="selectedDevice && selectedDevice.sensors && sensorEnabled && !compact">
            <div class="lined" >
              <label>
                {{ $t('form.choose_sensor') }}
              </label>
              <p>
              <!-- eslint-disable vue/valid-v-for -->
              <template
                v-if="privateSensorList && privateSensorList.length > 0"
                v-for="sensorItem in privateSensorList">
                <b-button
                  :disabled="disabled"
                  size="md"
                  :class="{
                           'btn-success' : selectedSensor && sensorItem.id === selectedSensor.id,
                           'btn-outline-success' : !selectedSensor && sensorItem !== selectedSensor
                           }"
                  class="text-capitalize mr-1 mb-1"
                  @click="onSelectSensor(sensorItem);">
                  <icon
                    v-if="sensorItem.type"
                    :name="sensorItem.type.name | lowercase"
                    class="mr-1"/>
                  <icon
                    v-else
                    :name="'nosensor'"
                    class="mr-1"/>
                  {{ sensorItem.name }}
                </b-button>
              </template>
              <template v-if="privateSensorList.length === 0">
                <b-alert
                  class="p-2 mr-3 w-auto"
                  variant="info"
                  size="sm"
                  show>
                  {{ $t('messages.no_sensor') }}
                </b-alert>
              </template>
              <!-- eslint-enablevue/valid-v-for -->
              </p>
            </div>
          </template>
          <template
            v-if="selectedDevice && selectedDevice.sensors && sensorEnabled && compact">
            <!-- eslint-disable vue/valid-v-for -->
            <b-form-group 
            :label="$t('general.sensor')"
            v-if="privateSensorList && privateSensorList.length > 0">
              <multiselect
                v-if="privateSensorList && privateSensorList.length > 0"
                v-model="selectedSensor"
                :auto-close="true"
                :multiple="false"
                :options="privateSensorList"
                :placeholder="$t('badge.sensors')"
                label="name"/>
            </b-form-group>
            <template v-if="privateSensorList.length === 0">
              <b-alert
                class="p-2"
                variant="info"
                size="sm"
                show>
                {{ $t('messages.no_sensor') }}
              </b-alert>
            </template>
          </template>

          <!--Sensor Schema-->
          <template
            v-if="selectedSensor && sensorSchemaEnabled">
            <div class="lined" >
              <label>
                {{ $t('form.choose_sensor_data_schema') }}
              </label>
              <p>
              <template >
                <template 
                v-if="schema.indexOf('ui_') < 0"
                v-for="schema in selectedSensor.schema">
                  <b-button
                    :disabled="disabled"
                    :class="{
                             'btn-success' : schema === selectedSchema,
                             'btn-outline-secondry' : schema !== selectedSchema
                             }"
                    class="mr-2 mb-2 text-capitalize"
                    @click="onSelectSchema(schema);">
                    {{ schema }}
                  </b-button>
                </template>
              </template>
              </p>
            </div>
          </template>

          <div
            v-if="findButton.enabled"
            class="form-button-row">
            <b-button
              :disabled="disabled"
              :class="{'btn-loading': loading}"
              class="mr-2 text-upper"
              variant="outline-primary"
              type="button"
              @click="doFilter">
              <!--<icon name="filter"/>-->
              <span>
                {{ $t("buttons.find") }}
              </span>
            </b-button>
            <b-button
              v-if="resetEnabled && resetButton.enabled"
              :disabled="disabled"
              variant="outline-secondary"
              class="text-upper"
              type="button"
              @click="reset">
              <span>
                {{ $t("buttons.reset") }}
              </span>
            </b-button>
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import validation from '@/decorators/validation'
import datePicker from 'vue-bootstrap-datetimepicker'
import Multiselect from '../multiselect/Multiselect.vue'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'
import DataListNoResult from '../../components/DataListNoResult'

export default {
  name: 'DeviceFiltering',
  components: { DataListNoResult, datePicker, Multiselect },
  mixins: [EntitiesMixin],
  props: {
    filterByTeam: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    filterSensors: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    novalidate: {
      type: Boolean,
      required: false,
      default: false
    },
    fromDate: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    toDate: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    dateShortener: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    historical: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedTypesMultiple: {
      type: Boolean,
      required: false,
      default: true
    },
    referenceKey: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    compact: {
      type: Boolean,
      required: false,
      default: false
    },
    feint: {
      type: Boolean,
      required: false,
      default: false
    },
    autoSave: {
      type: Boolean,
      required: false,
      default: true
    },
    header: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    filteringData: {
      type: [Boolean, Object, String],
      required: false,
      default: null
    },
    resetButton: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    findButton: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    autoSelectNextItems: {
      type: [Boolean],
      required: false,
      default: true
    },
    loadOnMount: {
      type: Boolean,
      required: false,
      default: true
    },
    deviceSelector: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    assetSelector: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: false
        }
      }
    },
    sensorEnabled: {
      type: [Boolean],
      required: false,
      default: true
    },
    sensorSchemaEnabled: {
      type: [Boolean],
      required: false,
      default: true
    },
    disabled: {
      type: [Boolean],
      required: false,
      default: false
    }
  },
  data () {
    let dateFormatDatepicker = this.$config.dateFormat.datepicker
    return {
      privateSensorList: [],
      autoSearchTimer: null,
      cachedFilterObject: null,
      selectedDevice: [],
      dateFilterShorthand: false,
      selectedSensor: null,
      options: {
        showTodayButton: true,
        format: dateFormatDatepicker,
        useCurrent: false,
        icons: {
          time: 'icon icon-clock',
          date: 'icon icon-calendar',
          up: 'fas fa-arrow-up',
          down: 'fas fa-arrow-down',
          previous: 'fas fa-chevron-left',
          next: 'fas fa-chevron-right',
          today: 'icon icon-target',
          clear: 'far fa-trash-alt',
          close: 'far fa-times-circle'
        }
      },
      selectedSchema: null,
      filter: null,
      filterModel: {
        fromDate: new Moment().subtract(1, 'hour').toISOString(true),
        toDate: new Moment().toISOString(true),
        sensorSelectedValue: null,
        deviceIds: [],
        sensorIds: []
      }
    }
  },
  computed: {
    ...mapGetters({
      deviceList: 'device/list',
      deviceById: 'device/byId'
    }),
    resetEnabled () {
      return JSON.stringify(this.filter) !== JSON.stringify(this.cachedFilterObject)
    },
    sortedDeviceList () {
      let that =  this
      let out = this._.orderBy(this.deviceList, ['name'], ['asc'])
      if (this.filterSensors && this.filterSensors === 'map') {
        out = this._.filter(out, (item) => {
          // Note: https://api.ubeac.io/sensortypes.json
          // 2 refrenced to sensor type location
          return item.sensors.find((sensorId) => {
             return that.sensorById(sensorId).type.type === 2
          })
          log(item)
        })
      } else if (this.filterSensors && this.filterSensors === '!map') {
        out = this._.filter(out, (item) => {
          return item.sensors.find((sensorId) => {
             // Note: https://api.ubeac.io/sensortypes.json
             // 2 refrenced to sensor type location
             return that.sensorById(sensorId).type.type !== 2
          })
        })
      }
      return out
    }
  },
  watch: {
    filteringData (newVal, oldVal) {
      if (this.filteringData && JSON.stringify(newVal) !== JSON.stringify(oldVal) ) {
        this.syncFilterModel()
      }
    }
  },
  mounted () {
    if (this.filteringData) {
      this.syncFilterModel()
    }
    if (this.loadOnMount) {
      this.doFilter()
    }
    this.preparefilter()
    this.cachedFilterObject = Object.assign({}, this.filter)
  },
  methods: {
    getSensorList () {
      if (this.selectedDevice) {
        let out = this.sensorByDevice(this.selectedDevice.id)
        if (this.filterSensors && this.filterSensors === 'map') {
          out = this._.filter(out, (item) => {
            // Note: https://api.ubeac.io/sensortypes.json
            // 2 refrenced to sensor type location
            return item.type.type === 2
          })
        } else if (this.filterSensors && this.filterSensors === '!map') {
          out = this._.filter(out, (item) => {
            // Note: https://api.ubeac.io/sensortypes.json
            // 2 refrenced to sensor type location
            return !(item.type.type === 2)
          })
        }
        this.privateSensorList = out
      }
    },
    filterTime (payload, toggle) {
      if (this.dateFilterShorthand === payload && toggle) {
        this.dateFilterShorthand = false
      } else {
        this.dateFilterShorthand = payload
        this.filterModel.toDate = new Moment().toISOString(true)
        this.filterModel.fromDate = new Moment().subtract(1, payload).toISOString(true)
      }
      this.autoSearch()
    },
    onSelectDevice () {
      this.getSensorList()
      this.selectDefaultSensor()
      this.selectDefaultSchema()
    },
    selectDefaultSensor () {
      if (this.autoSelectNextItems && this.privateSensorList && this.privateSensorList.length) {
        this.selectedSensor = this.sensorById(this.privateSensorList[0].id)
        this.selectedSchema = null
      } else {
        this.selectedSensor = null
        this.selectedSchema = null
      }
      this.autoSearch()
    },
    onSelectSchema (payload) {
      this.selectedSchema = payload
      this.autoSearch()
    },
    onSelectSensor (payload) {
      this.selectedSensor = payload
      this.selectDefaultSchema()
      this.autoSearch()
    },
    selectDefaultSchema () {
      if (this.autoSelectNextItems) {
        let once = true
        if (this.selectedSensor) {
          this._.each(this.selectedSensor.schema, (key) => {
            if (once) {
              once = false
              this.selectedSchema = key
            }
          })
        }
      }
      this.autoSearch()
    },
    reset () {
      this.filterModel = {
        fromDate: new Moment().subtract(1, 'hour').toISOString(true),
        toDate: new Moment().toISOString(true),
        sensorIds: [],
        sensorSelectedValue: null,
        deviceIds: []
      }
      this.selectedDevice = null
      this.dateFilterShorthand = false
      this.selectedSensor = null
      this.selectedSchema = null
      this.preparefilter()
      this.cachedFilterObject = Object.assign({}, this.filter)
      this.doFilter()
    },
    autoSearch () {
      this.preparefilter()
      clearTimeout(this.autoSearchTimer)
      if (this.autoSave) {
        this.autoSearchTimer = setTimeout(() => {
          this.doFilter()
        }, 100)
      }
    },
    syncFilterModel () {
      this.filterModel = Object.assign({}, this.filteringData)
      if (this.filterModel.deviceIds && this.filterModel.deviceIds.length > 0) {
        this.selectedDevice = this.deviceById(this.filterModel.deviceIds[0])
        this.getSensorList()
      }
      if (this.filterModel.sensorIds && this.filterModel.sensorIds.length > 0) {
        this.selectedSensor = this.sensorById(this.filterModel.sensorIds[0])
      }
      if (this.filterModel.sensorSelectedValue && this.filterModel.sensorSelectedValue.length > 0) {
         this.selectedSchema = this.filterModel.sensorSelectedValue
      }
    },
    getSensorByType (sensorType) {
      return this.sensorByType(sensorType)
    },
    preparefilter () {
      this.filter = {
        fromDate: new Moment(this.filterModel.fromDate).toISOString(true),
        toDate: new Moment(this.filterModel.toDate).toISOString(true),
        sensorIds: [],
        sensorSelectedValue: this.selectedSchema,
        deviceIds: []
      }
      if (this.selectedDevice && this.selectedDevice.id) {
        this.filter.deviceIds.push(this.selectedDevice.id)
      } else {
        this.filter.deviceIds = []
      }
      if (this.selectedSensor) {
        this.filter.sensorIds.push(this.selectedSensor.id)
      } else {
        this.filter.sensorIds = []
      }
      return this.filter
    },
     @validation
    doFilter () {
      if (this.dateFilterShorthand) {
        this.filterTime(this.dateFilterShorthand, false)
      }
      this.preparefilter()
      if (this.referenceKey) {
        this.$emit('filter', {
          filter: this.filter,
          referenceKey: this.referenceKey
        })
      } else {
        this.$emit('filter', this.filter)
      }
    }
  }
}
</script>
