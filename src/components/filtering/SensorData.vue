<template>
  <ComponentContainer>
    <b-card
      :class="{ 'card-feint': feint}"
      class="component-filtering no-shadow"
      no-body
      title="Filter Data">
      <b-card-header
        v-if="header.enabled"
        class="card-header-colored">
        <div class="float-left">
          <icon name="filter"/>
          {{ $t("manage.sensors.filter") }}
        </div>
        <b-button
          v-b-tooltip
          v-if="collapse.enabled"
          size="sm"
          type="button"
          title="Close Filtering"
          class="ml-auto float-right"
          @click="toggleFilterBarVisibility">
          <icon
            name="close"/>
        </b-button>
      </b-card-header>
      <b-card-body>
        <b-form>
          <b-row>
            <b-col
              v-if="fromDate.enabled"
              cols="12">
              <!-- From -->
              <b-form-group>
                <b-input-group
                  class="mr-2"
                  size="md">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <icon name="calendar"/>
                      {{ $t("data.from") }}
                    </span>
                  </div>
                  <date-picker
                    v-model="filterModel.fromDate"
                    :disabled="dateFilterShorthand"
                    :placeholder="$t('data.date_picker_from')"
                    :config="options"
                    class="form-control"/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col
              v-if="toDate.enabled"
              cols="12">
              <!-- To -->
              <b-form-group>
                <b-input-group
                  class="mr-2"
                  size="md">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <icon name="calendar"/>
                      {{ $t("data.to") }}
                    </span>
                  </div>
                  <date-picker
                    v-model="filterModel.toDate"
                    :disabled="dateFilterShorthand"
                    :placeholder="$t('data.date_picker_to') "
                    :config="options"
                    class="form-control"/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col
              v-if="dateShortener.enabled"
              cols="12"
              class="mb-3">
              <b-button
                :variant="dateFilterShorthand === 'minute' ? 'success' : 'secondary'"
                size="sm"
                class="mb-2"
                @click="filterTime('minute', true)">{{ $t("data.lasts.minute") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'hour' ? 'success' : 'secondary'"
                size="sm"
                class="mb-2"
                @click="filterTime('hour', true)">{{ $t("data.lasts.hour") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'day' ? 'success' : 'secondary'"
                size="sm"
                class="mb-2"
                @click="filterTime('day', true)">{{ $t("data.lasts.day") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'week' ? 'success' : 'secondary'"
                size="sm"
                class="mb-2"
                @click="filterTime('week', true)">{{ $t("data.lasts.week") }}
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
              <!--GatewayIds-->
              <b-form-group size="sm">
                <b-input-group size="sm">
                  <multiselect
                    v-model="selectedGateways"
                    :multiple="true"
                    :disabled="disabled"
                    :placeholder="$t('manage.select_gateway')"
                    :options="gatewayList"
                    label="name"
                    track-by="id"
                    @input="autoSearch"/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <!--Tags-->
              <b-form-group>
                <multiselect
                  v-model="selectedTags"
                  :disabled="deviceList.length == 0 || disabled"
                  :multiple="true"
                  :placeholder="$t('manage.select_device_uid')"
                  :options="deviceList"
                  @input="autoSearch"/>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!--Assets-->
              <b-form-group v-if="assetSelector.enabled && assetsList && assetsList">
                <multiselect
                  v-model="selectedAssets"
                  :disabled="assetsList.length == 0 || disabled"
                  :multiple="true"
                  :options="assetsList"
                  label="name"
                  placeholder="Select Assets"
                  @input="autoSearch"/>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <!--Types-->
              <b-form-group>
                <multiselect
                  v-model="selectedTypes"
                  :disabled="(sensorTypes && sensorTypes.length == 0) || disabled"
                  :multiple="selectedTypesMultiple"
                  :placeholder="$t('manage.select_sensor_types')"
                  :options="sensorTypes"
                  label="nameWithUnit"
                  track-by="type"
                  @input="autoSearch();selectDefaultSensorValueType();"/>
              </b-form-group>
            </b-col>
            <b-col
              v-if="sensorValueType"
              cols="12"
              class="mb-2">
              <template v-if="selectedTypesList && selectedTypesList.length > 0">
                <b-button-group
                  size="sm"
                  class="dashboard-card-select--sensor">
                  <!-- eslint-disable vue/valid-v-for -->
                  <template
                    v-for="typeItem in selectedTypesList"
                    v-if="sensorByType(typeItem.type).schema">
                    <template v-for="(schema, valueType) in sensorByType(typeItem.type).schema[0]">
                      <b-button
                        :disabled="disabled"
                        :class="{
                          'btn-success' : valueType === filterModel.sensorSelectedValue ,
                          'btn-outline-success' : valueType !== filterModel.sensorSelectedValue
                        }"
                        class="text-capitalize"
                        @click="updateSensorSelectedValue(valueType)">
                        {{ valueType }}
                      </b-button>
                    </template>
                  </template>
                  <!-- eslint-enablevue/valid-v-for -->
                </b-button-group>
              </template>
            </b-col>
            <b-col
              v-if="!staticCount"
              cols="12">
              <b-form-group>
                <b-input-group class="mr-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      {{ $t("data.count") }}
                    </span>
                  </div>
                  <b-form-select
                    v-model="filterModel.pageSize">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                    <option value="10000">10000 (Experimental)</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <template v-if="buttons.enabled">
            <b-button
              :disabled="disabled"
              :class="{'btn-loading': loading}"
              variant="outline-primary"
              @click="doFilter()">
              <icon name="filter"/>
              <span>
                {{ $t("buttons.find") }}
              </span>
            </b-button>
            <b-button
              v-if="resetEnabled && resetButton.enabled"
              :disabled="disabled"
              variant="outline-link"
              @click="resetFilters()">
              <span>
                {{ $t("buttons.reset") }}
              </span>
            </b-button>
          </template>
        </b-form>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import datePicker from 'vue-bootstrap-datetimepicker'
import Multiselect from 'vue-multiselect'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'SensorDataFiltering',
  components: { datePicker, Multiselect },
  mixins: [EntitiesMixin],
  props: {
    collapse: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: false
        }
      }
    },
    selectedTypesMultiple: {
      type: Boolean,
      required: false,
      default: true
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
    sensorValueType: {
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
      default: false
    },
    resetButton: {
      type: [Boolean, Object],
      required: false,
      default: true
    },
    buttons: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
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
    dateShortener: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
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
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    staticCount: {
      type: [Number, Boolean],
      required: false,
      default: false
    },
    loadOnMount: {
      type: Boolean,
      required: false,
      default: true
    },
    filteringData: {
      type: [Boolean, Object, String],
      required: false,
      default: null
    },
    disabled: {
      type: [Boolean],
      required: false,
      default: false
    }
  },
  data () {
    let dateFormat = this.$config.dateFormat.global
    return {
      dateFormat: dateFormat,
      autoSearchTimer: null,
      cachedFilterObject: null,
      date: new Date(),
      selectedAssets: [],
      selectedTags: [],
      selectedGateways: [],
      selectedTypes: [],
      dateFilterShorthand: false,
      options: {
        showTodayButton: true,
        format: dateFormat,
        useCurrent: false
      },
      filterModel: {
        sensorSelectedValue: null,
        fromDate: new Moment().subtract(1, 'hour').format(dateFormat),
        toDate: new Moment().format(dateFormat),
        devices: [],
        gateways: [],
        types: [],
        assetIds: [],
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapGetters({
      sensorData: 'sensordata/sensorData',
      sensorTypesWidthTypeKey: 'sensor/typesWithTypeKey',
      timeZoneOffset: 'user/timeZoneOffset'
    }),
    gatewayList () {
      let output = this.gatewayLightList
      return output
    },
    resetEnabled () {
      return JSON.stringify(this.filterModel) !== JSON.stringify(this.cachedFilterObject) ||
          this.selectedTags.length > 0 ||
          this.selectedGateways.length > 0 ||
          (this.selectedTypes && this.selectedTypes.length > 0)
    },
    selectedTypesList () {
      let out = []
      if (this.selectedTypes && this.selectedTypes.length > 0) {
        out = this.selectTypes
      } else if (typeof this.selectedTypes === 'object' && this.selectedTypes && this.selectedTypes.type) {
        out.push(this.selectedTypes)
      }
      return out
    }
  },
  watch: {
    staticCount () {
      if (this.staticCount) {
        this.filterModel.pageSize = this.staticCount
      }
    },
    filteringData () {
      if (this.filteringData === 'reset') {
        this.reset()
      } else {
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
    if (this.staticCount) {
      this.filterModel.pageSize = this.staticCount
    }
    this.cachedFilterObject = Object.assign({}, this.filterModel)
  },
  methods: {
    reset () {
      this.filterModel = {
        sensorSelectedValue: null,
        fromDate: new Moment().subtract(1, 'hour').format(this.dateFormat),
        toDate: new Moment().format(this.dateFormat),
        devices: [],
        gateways: [],
        types: [],
        assetIds: [],
        pageSize: 20
      }
      this.selectedTags = []
      this.selectedGateways = []
      this.selectedTypes = []
      this.dateFilterShorthand = false
      // this.doFilter()
    },
    toggleFilterBarVisibility () {
      this.$emit('collapse')
    },
    updateSensorSelectedValue (payload) {
      this.filterModel.sensorSelectedValue = payload
    },
    selectDefaultSensorValueType () {
      let once = true
      if (this.selectedTypesList && this.selectedTypesList.length > 0) {
        this._.each(this.sensorByType(this.selectedTypesList[0].type).schema[0], (item, key) => {
          if (once) {
            once = false
            this.filterModel.sensorSelectedValue = key
          }
        })
      }
    },
    autoSearch () {
      clearTimeout(this.autoSearchTimer)
      if (this.autoSave) {
        this.autoSearchTimer = setTimeout(() => {
          this.doFilter()
        }, 100)
      }
    },
    syncFilterModel () {
      this.filterModel = Object.assign({}, this.filteringData)
      this.selectedTags = [...this.filteringData.deviceIds]
      this.selectedGateways = []
      this.filteringData.gatewayIds.forEach((item) => {
        this.selectedGateways.push(this.getGatewayById(item))
      })
      this.selectedTypes = []
      this.filteringData.types.forEach((item) => {
        this.selectedTypes.push(this.getSensorByType(item))
        if (this.selectedTypesMultiple === false) {
          this.selectedTypes = this.getSensorByType(item)
        }
      })
    },
    getSensorByType (sensorType) {
      return this.sensorByType(sensorType)
    },
    getGatewayById (gatewayId) {
      let out = null
      let getter = this.gatewayById(gatewayId)
      if (getter) {
        out = Object.assign({}, getter)
      }
      return out
    },
    resetFilters () {
      if (this.filteringData) {
        this.syncFilterModel()
        this.doFilter()
      } else {
        this.filterModel = Object.assign({}, this.cachedFilterObject)
        this.selectedTags = []
        this.selectedGateways = []
        this.selectedTypes = []
        this.dateFilterShorthand = false
        this.doFilter()
      }
    },
    filterTime (payload, toggle) {
      if (this.dateFilterShorthand === payload && toggle) {
        this.dateFilterShorthand = false
      } else {
        this.dateFilterShorthand = payload
        this.filterModel.toDate = new Moment().format(this.dateFormat)
        this.filterModel.fromDate = new Moment().subtract(1, payload).format(this.dateFormat)
      }
    },
    preparefilter () {
      let filterModel = this.filterModel
      this.filter = {
        fromDate: new
        Moment(filterModel.fromDate).format(this.dateFormat),
        toDate: new
        Moment(filterModel.toDate).format(this.dateFormat),
        types: [],
        assetIds: [],
        sensorSelectedValue: filterModel.sensorSelectedValue,
        pageSize: filterModel.pageSize,
        gatewayIds: [],
        deviceIds: []
      }
      if (this.selectedGateways && this.selectedGateways.length > 0) {
        this.selectedGateways.forEach((item) => {
          this.filter.gatewayIds.push(item.id)
        })
      } else {
        this.filter.gatewayIds = []
      }
      if (this.selectedTypes && this.selectedTypes.length > 0) {
        this.selectedTypes.forEach((item) => {
          this.filter.types.push(item.type)
        })
      } else if (this.selectedTypesList && this.selectedTypesList.length > 0) {
        this.selectedTypesList.forEach((item) => {
          this.filter.types.push(item.type)
        })
      } else {
        this.filter.types = []
      }
      if (this.selectedTags && this.selectedTags.length > 0) {
        this.selectedTags.forEach((item) => {
          this.filter.deviceIds.push(item)
        })
      } else {
        this.filter.deviceIds = []
      }
      if (this.selectedAssets && this.selectedAssets.length > 0) {
        this.selectedAssets.forEach((item) => {
          this.filter.assetIds.push(item.id)
        })
      } else {
        this.filter.assetIds = []
      }
      return this.filter
    },
    doFilter () {
      if (this.dateFilterShorthand) {
        this.filterTime(this.dateFilterShorthand, false)
      }
      var filter = this.preparefilter()
      this.$emit('filter', filter)
    }
  }
}
</script>
