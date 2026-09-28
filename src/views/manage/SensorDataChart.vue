<template>
  <ComponentContainer >
    <div
      v-if="userProfile"
      class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="sensor"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("manage.sensors.sensor_data_chart") }}
          </span>
        </div>
        <b-button
          v-b-tooltip
          v-if="!filterBarVisibility"
          type="button"
          variant="success"
          title="Filtering"
          class="ml-auto mr-0 btn-fab float-right"
          @click.prevent="toggleFilterBar">
          <icon
            name="filter"/>
        </b-button>
        <b-button
          v-b-tooltip
          v-if="filterBarVisibility"
          type="button"
          variant="success"
          title="Filtering"
          class="ml-auto mr-0 btn-fab float-right"
          @click.prevent="toggleFilterBar">
          <icon name="close"/>
        </b-button>
        <b-button
          v-b-tooltip.hover
          :title="$t('buttons.export')"
          class="float-right btn-round mr-2 d-none d-sm-block"
          variant="info"
          @click="downloadRequest(sensorData, 'SensorData')">
          <icon name="download"/>
          {{ $t("export") }}
        </b-button>
      </div>
      <div
        class="page-content w-100 float-left">
        <b-card
          v-show="filterBarVisibility"
          no-body
          class="mb-3">
          <FilterDevice
            :compact="true"
            :sensor-schema-enabled="false"
            :auto-select-next-items="true"
            :historical="true"
            :collapse="{enabled: false}"
            :load-on-mount="false"
            :auto-save="false"
            :reset-button="{enabled: true}"
            :find-button="{enabled: true}"
            @collapse="false"
            @filter="doFilter"/>
        </b-card>
        <b-card
          v-if="sensorChartData.length > 0"
          no-body
          style="height: calc(100vh - 280px); position: relative; z-index: 1;"
          class="p-0  border-radius-6">
          <b-card-body
            class="p-0 h-100 border-radius-6">
            <div
              v-for="(chart, index) in sensorChartData"
              :key="index"
              class="h-100 float-left w-100  border-radius-6">
              <template>
                <charts
                  ref="highcharts"
                  :options="chart"
                  class="h-100 border-radius-6 overflow-hidden" />
              </template>
            </div>
          </b-card-body>
        </b-card>
        <DataListNoResult
          v-if="sensorChartData.length === 0"
          class="mt-5 mb-5">
          {{ $t('manage.nothing_data') }}
          <br>
          {{ $t('manage.please_choose_device') }}
        </DataListNoResult>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import FilterSensorData from '@/components/filtering/SensorData'
import FilterDevice from '@/components/filtering/Device.vue'
import DataListNoResult from '@/components/DataListNoResult'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'SensorDataChartPage',
  components: { FilterDevice, FilterSensorData, DataListNoResult },
  mixins: [EntitiesMixin],
  data () {
    let mediumDateFormat = this.$config.dateFormat.medium
    let shortDateFormat = this.$config.dateFormat.short
    return {
      pageSize: 1000,
      dataLoading: false,
      firstLoadDone: false,
      mediumDateFormat: mediumDateFormat,
      shortDateFormat: shortDateFormat,
      filterBarVisibility: true,
      viewGridMode: true,
      filterModel: {},
      date: new Date(),
      pageNumber: 1,
      chartDefaultOption: {
        chart: {
          type: 'line'
        },
        legend: {
          enabled: true
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function (a, b) {
              if (this.isFirst) {
                return Moment(this.value).format(mediumDateFormat)
              } else if (this.isLast) {
                return Moment(this.value).format(mediumDateFormat)
              } else {
                return Moment(this.value).format(shortDateFormat)
              }
            }
          }
        },
        time: {
          useUTC: false
        },
        tooltip: {
          xDateFormat: '%Y/%m/%e %H:%M:%S'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          scatter: {
            lineWidth: 1
          },
          line: {
            step: 'center'
          },
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: []
      }
    }
  },
  computed: {
    sensorChartData () {
      let chartDataList = []
      let series = {}
      let unit = null
      let sensor = null
      if (this.sensorData) {
        this.sensorData.forEach((item) => {
          let dateObject = new Date(item.dateTime).valueOf()
          if (this.sensorById(item.sensorId)) {
            unit = this.sensorById(item.sensorId).unit
            sensor = this.sensorById(item.sensorId)
          }
          if (item.data.Value) {
            if (series['value']) {
              series['value'].data.push([dateObject, item.data.Value])
            } else {
              series['value'] = {
                data: [[dateObject, item.data.Value]],
                name: sensor ? sensor.name : ''
              }
            }
          } else {
            this._.forEach(item.data, (dataItem, key) => {
              if (series[key]) {
                series[key].data.push([dateObject, dataItem])
              } else {
                series[key] = {
                  data: [[dateObject, dataItem]],
                  name: key
                }
              }
            })
          }
        })
        let validSeries = []
        this._.forEach(series, (serie, key) => {
          validSeries.push(serie)
        })
        if (validSeries.length > 0) {
          let chartItem = this._.extend(this._.cloneDeep(this.chartDefaultOption), {
            title: {
              text: ''
            },
            yAxis: {
              title: {
                text: `${unit ? unit.name : ''} (${unit ? unit.abbr : ''})`
              }
            },
            series: validSeries
          })
          chartDataList.push(chartItem)
        }
      }

      let charts = this.$refs.highcharts
      if (charts) {
        charts.forEach((chartItem) => {
          if (chartItem.chart) {
            chartItem.chart.reflow()
          }
        })
      }
      return chartDataList
    }
  },
  mounted () {
    this.clearSensorData()
  },
  beforeDestroy () {
    this.clearSensorData()
  },
  methods: {
    toggleFilterBar () {
      this.filterBarVisibility = !this.filterBarVisibility
      setTimeout(() => {
        this.reflow()
      }, 500)
    },
    downloadRequest (content, name) {
      const data = 'text/jsoncharset=utf-8,' + encodeURIComponent(JSON.stringify(content))
      const a = document.createElement('a')
      a.href = 'data:' + data
      a.download = name + '.json'
      a.innerHTML = 'download JSON'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    doFilter (filter) {
      delete filter.sensorSelectedValue
      this.filterModel = filter
      this.pageNumber = 1
      this.search(filter)
    },
    search (filter) {
      if (filter) {
        filter.pageNumber = this.pageNumber
        filter.pageSize = this.pageSize
        this.dataLoading = true
        this.fetchSensorData(filter).then(() => {
          this.$forceUpdate()
          this.dataLoading = false
          this.firstLoadDone = true
        }).catch(() => {
          this.dataLoading = false
        })
      } else {
        this.dataLoading = true
        this.fetchSensorData().then(() => {
          this.$forceUpdate()
          this.dataLoading = false
          this.firstLoadDone = true
        }).catch(() => {
          this.dataLoading = false
        })
      }
    },
    reflow () {
      let charts = this.$refs.highcharts
      if (charts && charts.length > 0) {
        this._.forEach(charts, (item) => {
          item.chart.reflow()
          item.chart.redraw()
        })
      }
    }
  }
}
</script>
