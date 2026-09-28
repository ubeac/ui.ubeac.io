<template>
  <ComponentContainer>
    <div
      v-if="userProfile"
      class="px-4">
      <div role="tablist">
        <b-card
          v-for="(serie, index) in series"
          :key="index"
          :style="{ 'z-index': 100 - (index * 10) }"
          no-body
          class="mb-3 card-border no-shadow">
          <div
            header-tag="header"
            class="pointer px-3 pt-2 pb-2"
            role="tab"
            @click="toggleCollapse(index)">
            <span
              class="float-left mt-2">
              <icon
                v-if="getSeriesIcon(serie)"
                :name="getSeriesIcon(serie)"
                class="float-left mr-2 icon-fixture"/>
              <span
                class="ml-1 float-left">
                {{ serie.name }}
              </span>
              <span
                class="ml-1 float-left">
                <small>
                  {{ getFilterString(serie.data) }}
                </small>
              </span>
            </span>
            <b-button
              v-b-tooltip
              v-if="index !== expanded"
              :title="$t('device.edit_sensor') "
              :class="{'btn-loading': index == underLoading}"
              variant="info"
              size="md"
              class="btn-iconic float-right">
              <icon name="setting" />
            </b-button>
            <b-button
              v-b-tooltip
              v-if="index === expanded"
              :title="$t('device.edit_sensor') "
              :class="{'btn-loading': index == underLoading}"
              variant="info"
              size="md"
              class="btn-iconic float-right">
              <icon name="close" />
            </b-button>
          </div>
          <b-collapse
            v-if="index === expanded"
            :id="`collpaseable-${index}`"
            visible
            accordion="my-accordion"
            role="tabpanel">
            <b-card-body class="p-0">
              <b-form
                inline
                class="needs-validation mb-0 pb-0"
                autocomplete="nope"
                novalidate>
                <b-form-group
                  :label="$t('general.series')"
                  class="form-border-bottom">
                  <b-input
                    v-model="serie.name"
                    autofocus
                    placeholder="Add serie unique name"
                    class="w-100 float-left"
                    @input="debounceFilter"/>

                </b-form-group>
              </b-form>
              <b-card
                class="no-shadow float-right w-100 no-border"
                no-body>
                <b-row>
                  <b-col
                    cols="12">
                    <DeviceFilter
                      :feint="true"
                      :reference-key="serie.id"
                      :filtering-data="serie.data"
                      :load-on-mount="false"
                      class="mb-0"
                      @filter="doFilter"/>
                    <b-button
                      v-b-tooltip
                      :title="$t('buttons.remove_serie')"
                      type="button"
                      variant="outline-danger"
                      class="float-right mr-3"
                      @click="removeSerie(serie)">
                      <icon name="delete"/>
                    </b-button>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <input
        v-validate="'required'"
        v-model="series"
        :state="errors.has(`${$t('general.series')}`) ? 'invalid' : null"
        :name="$t('general.series')"
        required
        type="hidden" >
      <b-form-invalid-feedback v-if="errors.has(`${$t('general.series')}`)">
        <span v-for="error in errors.collect(`${$t('general.series')}`)">
          {{ error }}
        </span>
      </b-form-invalid-feedback>
      <b-button
        class="mb-3 mt-2"
        style="width: 200px;"
        variant="outline-success"
        @click="addSerie()">
        <icon name="add"/>
        {{ $t('add_serie') }}
      </b-button>
    </div>
  </ComponentContainer>
</template>

<script>
import FilterSensorData from '@/components/filtering/SensorData'
import DeviceFilter from '@/components/filtering/Device'
import DataListNoResult from '@/components/DataListNoResult'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'SelectSeries',
  components: { DeviceFilter, FilterSensorData, DataListNoResult },
  mixins: [EntitiesMixin],
  props: {
    selectedTypesMultiple: {
      type: Boolean,
      required: false,
      default: false
    },
    series: {
      type: [Boolean, Array],
      required: false,
      default () {
        return []
      }
    },
    sensorValueType: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      doFilterDebounce: null,
      dataFilter: null,
      searchLoading: false,
      expanded: null,
      underLoading: null,
      underLoadingCached: [],
      filterModel: {},
      eventModel: {
        action: 'add_chart_series',
        category: 'Chart Widget',
        label: 'User added a new chart',
        value: 0
      }
    }
  },
  mounted () {
    if (this.dataFilter) {
      this.filterModel = this.dataFilter
    }
  },
  methods: {
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'
      // this.sendGtagEvent(this.eventModel)
    },
    toggleCollapse (id) {
      if (this.expanded === id) {
        this.expanded = null
        this.underLoading = null
      } else {
        this.expanded = id
        if (!this.underLoadingCached[id]) {
          this.underLoading = id
          setTimeout(() => {
            this.underLoading = null
          }, 1200)
        }
        this.underLoadingCached[id] = true
      }
    },
    getSeriesIcon (series) {
      let out = false
      if (series && series.data && series.data.sensorIds && series.data.sensorIds[0]) {
        if (this.sensorById(series.data.sensorIds[0]) && this.sensorById(series.data.sensorIds[0]).attributes.ui_icon) {
          out = this.sensorById(series.data.sensorIds[0]).attributes.ui_icon
        }
      }
      return out
    },
    getFilterString (data) {
      let out = ''
      if (data && data.gatewayIds && data.gatewayIds.length > 0) {
        out += this.getGatewayById(data.gatewayIds[0]).name
      }
      if (data && data.deviceIds && data.deviceIds.length > 0 && this.deviceById(data.deviceIds[0])) {
        out += ' / ' + this.deviceById(data.deviceIds[0]).name
      }
      if (data && data.sensorIds && data.sensorIds.length > 0 && this.sensorById(data.sensorIds[0])) {
        out += ' / ' + this.sensorById(data.sensorIds[0]).name
      }
      if (data && data.sensorSelectedValue && data.sensorSelectedValue !== 'value') {
        out += ' / ' + data.sensorSelectedValue
      }
      return out
    },
    getSensorByType (sensorType) {
      return this.sensorByType(sensorType)
    },
    addSerie () {
      this.eventModel.action = 'add-series-button'
      // this.sendGtagEvent(this.eventModel)
      let newlySerie = {
        id: 'random-id-' + Math.random(),
        name: this.$t('dashboard.chart.new_series'),
        data: null
      }
      this.series.push(newlySerie)
      this.toggleCollapse(this.series.length - 1)
      this.resetFilterBox()
      this.$forceUpdate()
    },
    resetFilterBox () {
      this.dataFilter = 'reset'
    },
    editSerie (serie) {
      if (serie.data && typeof serie.data === 'object') {
        this.dataFilter = serie.data
      } else {
        this.dataFilter = 'reset'
      }
    },
    saveSerie (reset = true) {
      this.$emit('updateSeries', this.series)
    },
    removeSerie (serie) {
      this.eventModel.action = 'remove-series-button'
      // this.sendGtagEvent(this.eventModel)
      this.series.splice(this.series.indexOf(serie), 1)
      this.$emit('updateSeries', this.series)
      this.resetFilterBox()
    },
    debounceFilter () {
      clearTimeout(this.doFilterDebounce)
      this.doFilterDebounce = setTimeout(() => {
        this.saveSerie()
        this.$forceUpdate()
      }, 500)
    },
    doFilter (payload) {
      this.filterModel = payload.filter
      this.series.forEach((serie) => {
        if (serie.id === payload.referenceKey) {
          serie.data = payload.filter
        }
      })
      this.saveSerie()
      this.$emit('updateFilter', payload.filter)
      this.$forceUpdate()
    }
  }
}
</script>
