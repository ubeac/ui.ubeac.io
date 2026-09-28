<template>
  <ComponentContainer>
    <div
      v-if="userProfile"
      class="pr-0 pl-4">
      <b-card
        class="card-help pb-1 mb-2 mr-3 w-auto"
        no-body >
        <b-card-body>
          <icon
            class="mr-3"
            name="info" />
          <span v-html="emptyListMessage"/>
        </b-card-body>
      </b-card>
      <table
        v-if="series && series.length > 0"
        class="table p-0 m-0">
        <thead>
          <tr class="table-header">
            <th style="max-width: 70px;">
              {{ $t('dashboard.device.follow') }}
            </th>
            <th>
              {{ $t('dashboard.device.name') }}
            </th>
            <th/>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(serie, index) in series" >
            <tr
              :class="{'selected': serie.mustFollow}"
              class="text-light table-item">
              <td
                style="width: 90px;max-width: 90px;">
                <template
                  v-if="showMapOptions">
                  <div
                    class="d-block float-left">
                    <b-form-checkbox
                      :speed="100"
                      :sync="true"
                      :labels="false"
                      v-model="serie.mustFollow"
                      :class="{'checked': serie.mustFollow}"
                      class="pointer"
                      size="lg"
                      @change="(e) => {updateMustFollow(serie.id, e)}" />
                  </div>
                </template>
              </td>
              <td
                v-b-toggle="`accordion-${index}`"
                class="pointer">
                <DeviceFilter
                  :sensor-enabled="false"
                  :sensor-schema-enabled="false"
                  :feint="true"
                  :filter-sensors="showMapOptions ? 'map' : false"
                  :reference-key="serie.id"
                  :filtering-data="serie.data"
                  :load-on-mount="false"
                  class="mb-0 mt-2"
                  @filter="(e) => {doFilter(e, serie)}"/>
                <template
                  v-if="!showMapOptions && serie.data && serie.data.deviceIds.length > 0" >
                  <span
                    class="h5">
                    {{ $t('manage.sensors.sensor') }}
                  </span>
                  <DeviceFilter
                    :sensor-enabled="false"
                    :feint="true"
                    :device-selector="{ enabled: false }"
                    :filter-sensors="showMapOptions ? '!map' : false"
                    :reference-key="serie.id"
                    :filtering-data="_.cloneDeep(serie.tooltipSensor)"
                    :load-on-mount="false"
                    class="mb-0"
                    @filter="(e) => {setTooltipSensor(e, serie.id)}"/>
                </template>
              </td>
              <td class="pr-3">
                <b-button
                  v-b-tooltip
                  :title="$t('buttons.remove')"
                  size="sm"
                  type="button"
                  variant="outline-danger"
                  class="float-right"
                  @click="removeSerie(serie)">
                  <icon name="delete"/>
                </b-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <b-button
        :disabled="isAddDeviceButtonDisabled"
        style="width: 200px;"
        class="mb-3 mt-2"
        variant="outline-success"
        @click="addSerie()">
        <icon name="add"/>
        {{ $t('buttons.add_device') }}
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
  name: 'SelectDevices',
  components: { DeviceFilter, FilterSensorData, DataListNoResult },
  mixins: [EntitiesMixin],
  props: {
    emptyListMessage: {
      type: [Boolean, String],
      required: false,
      default () {
        return this.$t('messages.empty_device_selector')
      }
    },
    filterSensors: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    sensorEnabled: {
      type: [Boolean],
      required: false,
      default: true
    },
    showMapOptions: {
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
    }
  },
  data () {
    return {
      expandedId: 'accordion-0',
      doFilterDebounce: null,
      dataFilter: null,
      searchLoading: false,
      filterModel: {}
    }
  },
  computed: {
    isAddDeviceButtonDisabled () {
      let out = false
      this.series.forEach((serie) => {
        if (serie.data === null) {
          out = true
        }
      })
      return out
    }
  },
  mounted () {
    if (this.dataFilter) {
      this.filterModel = this.dataFilter
    }
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (isJustShown) {
        this.expandedId = collapseId
      }
    })
  },
  methods: {
    getSeriesIcon (series) {
      let out = false
      if (series && series.data && series.data.sensorIds && series.data.sensorIds[0]) {
        if (series.data.sensorIds[0] && this.sensorById(series.data.sensorIds[0]) && this.sensorById(series.data.sensorIds[0]).type) {
          out = this.sensorById(series.data.sensorIds[0]).type.type
        }
      }
      return out
    },
    getSensorByType (sensorType) {
      return this.sensorByType(sensorType)
    },
    addSerie () {
      let newlySerie = {
        id: 'random-id-' + Math.random(),
        name: this.$t('device.unnamed_device'),
        data: null
      }
      this.series.push(newlySerie)
      this.resetFilterBox()
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
    doFilter (payload, serie) {
      this.filterModel = payload.filter
      this.series.forEach((serie) => {
        if (serie.id === payload.referenceKey) {
          serie.data = payload.filter
          if (payload.filter) {
            serie.tooltipSensor = {
              deviceIds: payload.filter.deviceIds
            }
          }
        }
      })
      this.saveSerie()
      this.$emit('updateFilter', payload.filter)
      this.$forceUpdate()
    },
    setTooltipSensor (payload, id) {
      this._.each(this.series, (item) => {
        if (item.id === id) {
          item.tooltipSensor = this._.cloneDeep(payload.filter)
        }
      })
    },
    updateMustFollow (id, e) {
      let cloned = this._.cloneDeep(this.series)
      this._.each(cloned, (item) => {
        if (item.id === id) {
          item.mustFollow = true
        } else {
          item.mustFollow = false
        }
      })
      this.$emit('updateSeries', cloned)
    }
  }
}
</script>
