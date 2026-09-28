<template>
  <div
    :class="[responsiveRatioClass, responsiveWidthClass, responsiveHeightClass]"
    class="widgets-preview-container">
    <div class="chart-area" >
      <charts
        ref="highcharts"
        :constructor-type="'stockChart'"
        :options="options"/>
    </div>
    <div
      v-if="settings"
      class="none-chart-area">
      <template
        v-if="timeMachineValue !== null">
        <icon
          class="dashboard-widget--time-machine-icon"
          name="clock" />
      </template>

      <div
        class="dashboard-widget--indicator-indicator-area">
        <component
          :last-update="dominantValueUpdateTime"
          :value="timeMachineValue ? timeMachineValue : dominantValue"
          :is="settings.widgetIndicator"
          :max="indicatorMax"
          :range="range"
          :min="indicatorMin"/>
      </div>
      <div class="dashboard-widget--indicator-text-area p-2 pb-0">
        <div class="main-center-text">
          <div v-if="widgetData.widget.name">
            <p
              v-if="widgetData"
              :style="{'color': settings.textNameColor}"
              class="name-card text-one-line mb-0">
              {{ widgetData.widget.name }}
            </p>
          </div>
          <p class="card-text description-card pb-0 mb-0">
            <span
              v-if="dominantSensor"
              class="text-one-line widget-value-text w-100 d-block">
              <template
                v-if="timeMachineValue !== null">
                {{ timeMachineValue | numeralFormat(`${numeralFormat}`) }}
              </template>
              <template
                v-else >
                {{ dominantValue | numeralFormat(`${numeralFormat}`) }}
              </template>
              <small
                v-if="dominantSensor && settings.unit && settings.unit.enabled"
                class="text-muted">
                <span v-if="dominantSensor.prefix">{{ dominantSensor.prefix.symbol }}</span>
                <span v-if="dominantSensor.unit">{{ dominantSensor.unit.abbr }}</span>
              </small>
            </span>
            <span v-if="!settings.sensorFilter">
              {{ $t('dashboard.widget.no_data') }}
            </span>
          </p>
          <p
            v-if="dominantDevice && settings.deviceName && settings.deviceName.enabled"
            class="text-one-line mb-0">
            <span class="clearfix w-100 db-block text-one-line widget-value-text-device">
              {{ dominantDevice.name }}
              <!--
              <small>
               {{ debugResponsiveWidthClass }} / {{ debugResponsiveHeightClass }}
              </small>
              -->
            </span>
          </p>
          <small
            v-if="dominantValueUpdateTime && settings.lastUpdateTime && settings.lastUpdateTime.enabled"
            :style="{'color': settings.textDateColor}"
            class="card-text date-card-update text-one-line mb-1 mr-0">
            <template
              v-if="timeMachineDate !== null">
              {{ $t('general.update') }} {{ timeMachineDate | date }}
            </template>
            <template v-else >
              {{ $t('general.update') }} {{ dominantValueUpdateTime | date }}
            </template>
          </small>
          <!--
          <p
            v-if="settings.updateTimeDiff && settings.updateTimeDiff.enabled"
            class="card-text text-muted dashboard-widget--text-latency">
            <small>
              {{ updateTimeDiff }}
            </small>
          </p>
          -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Indicators from '@/components/indicator/index'
import LiveWidgetMixin from '@/components/widgets/mixins/live'
import HistoricalMixin from '@/components/widgets/mixins/historical'
export default {
  name: 'IndicatorLiveWidgetPreview',
  components: { ...Indicators },
  mixins: [LiveWidgetMixin, HistoricalMixin],
  data () {
    const self = this
    return {
      reflowDebounceTimer: null,
      handleResizeDebounceTimer: null,
      timeMachineValue: null,
      timeMachineDate: null,
      setResponsiveClassInterval: null,
      cachedSeriesGroupId: null,
      seriesCounter: {},
      responsiveRatioClass: null,
      responsiveWidthClass: null,
      responsiveHeightClass: null,
      debugResponsiveWidthClass: null,
      debugResponsiveHeightClass: null,
      options: {
        chart: {
          type: 'area',
          zoomType: 'false',
          animation: false,
          alignTicks: true,
          backgroundColor: 'transparent',
          padding: 0,
          paddingTop: 0,
          marginTop: 10,
          spacingBottom: 0,
          spacingTop: 0,
          spacingLeft: 0,
          spacingRight: 0
        },
        scrollbar: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          crosshairs: false
        },
        plotOptions: {
          area: {
            fillOpacity: 0.08,
            opacity: 0.08,
            enabled: true
          },
          series: {
            states: {
              hover: {
                halo: {
                  size: 6
                }
              }
            },
            softThreshold: 0,
            lineWidth: 0.5,
            marker: {
              enabled: true,
              radius: 2
            },
            point: {
              events: {
                mouseOver: function (a, b) {
                  self.timeMachineValue = a.target.options.y
                  self.timeMachineDate = a.target.options.x
                },
                mouseOut: function () {
                  self.timeMachineValue = null
                  self.timeMachineDate = null
                }
              }
            }
          }
        },
        yAxis: {
          lineWidth: 1,
          tickWidth: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          }
        },
        xAxis: {
          lineWidth: 1,
          tickWidth: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          }
        },
        legend: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        credits: {
          enabled: false
        }
      }
    }
  },
  computed: {
    dominantValueUpdateTime () {
      let out = null
      if (this.lastSocketData) {
        out = new Date(this.lastSocketData.dateTime)
      } else if (this.historicalData && this.historicalData.length > 0) {
        out = this.historicalData[this.historicalData.length - 1].dateTime
      }
      return out
    },
    numeralFormat () {
      let out = '0,0.[0000000000000000000000]'
      if (this.dominantSensor && this.dominantSensor.attributes &&
        this.dominantSensor.attributes.ui_precision !== '') {
        let precision = parseInt(this.dominantSensor.attributes.ui_precision)
        if (precision > 0) {
          out = `0,0.[${'0'.repeat(precision)}]`
        } else if (precision === 0) {
          out = '0,0'
        }
      }
      return out
    },
    dominantValue () {
      let out = ''
      if (this.settings.sensorFilter && this.settings.sensorFilter.sensorSelectedValue) {
        let normalizeKey = this.settings.sensorFilter.sensorSelectedValue
        if (this.lastSocketData) {
          out = parseFloat(this.lastSocketData.data[normalizeKey])
        } else if (this.historicalData && this.historicalData.length > 0) {
          out = parseFloat(this.historicalData[this.historicalData.length - 1].data[normalizeKey])
        }
      }
      this.$emit('updateDominantValue', out)
      return out
    },
    dominantSensor () {
      let out = ''
      if (this.lastSocketData) {
        out = this.sensorById(this.lastSocketData.sensorId)
      } else if (this.historicalData && this.historicalData.length > 0) {
        out = this.sensorById(this.historicalData[this.historicalData.length - 1].sensorId)
      }
      return out
    },
    dominantDevice () {
      let out = false
      if (this.lastSocketData) {
        let sensor = this.sensorById(this.lastSocketData.sensorId)
        if (sensor) {
          out = this.deviceById(sensor.deviceId)
        }
      } else if (this.historicalData && this.historicalData.length > 0) {
        let sensor = this.sensorById(this.historicalData[0].sensorId)
        if (sensor) {
          out = this.deviceById(sensor.deviceId)
        }
      }
      return out
    },
    dominantGateway () {
      let out = false
      if (this.lastSocketData) {
        out = this.gatewayById(this.lastSocketData.gatewayId)
      } else if (this.historicalData && this.historicalData.length > 0) {
        out = this.gatewayById(this.historicalData[0].gatewayId)
      }
      return out
    },
    indicatorMax () {
      let out = 100
      try {
        out = JSON.parse(this.dominantSensor.attributes.ui_colorRange)[0].value
      } catch (error) {
      }
      return out
    },
    range () {
      let out = []
      try {
        out = JSON.parse(this.dominantSensor.attributes.ui_colorRange)
      } catch (error) {
      }
      return out
    },
    indicatorMin () {
      let out = 0
      try {
        out = JSON.parse(this.dominantSensor.attributes.ui_colorRange).slice(-1)[0].value
      } catch (error) {
      }
      return out
    }
  },
  watch: {
    isResizing () {
      clearInterval(this.setResponsiveClassInterval)
      if (this.isResizing) {
        this.setResponsiveClassInterval = setInterval(() => {
          this.setResponsiveClass()
        }, 200)
      }
    },
    widgetData: {
      deep: true,
      handler () {
        this.handleResize()
      }
    },
    dashboardIsEditMode () {
      this.reflow()
      this.handleResize()
    }
  },
  mounted () {
    this.initChart()
    window.addEventListener('sidebarresized', this.handleResize)
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    clearInterval(this.setResponsiveClassInterval)
    clearTimeout(this.handleResizeDebounceTimer)
    clearTimeout(this.reflowDebounceTimer)
    window.removeEventListener('sidebarresized', this.handleResize)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      clearTimeout(this.handleResizeDebounceTimer)
      this.handleResizeDebounceTimer = setTimeout(() => {
        this.setResponsiveClass()
        this.reflow()
      }, 500)
    },
    getResponsiveBreakPoint (input) {
      let out = 'xxs'
      if (input > 0 && input <= 200) {
        out = 'xxs'
      }
      if (input > 200 && input <= 300) {
        out = 'xs'
      }
      if (input > 300 && input <= 450) {
        out = 'sm'
      }
      if (input > 450 && input <= 650) {
        out = 'md'
      }
      if (input > 650 && input <= 850) {
        out = 'lg'
      }
      if (input > 850 && input <= 1050) {
        out = 'xl'
      }
      if (input > 1050 && input <= 1250) {
        out = 'xxl'
      }
      if (input > 1250) {
        out = 'xxxl'
      }
      return out
    },
    setResponsiveClass () {
      let out = 'responsive class'
      if (this.$el) {
        out = this.$el.offsetWidth / this.$el.offsetHeight
        let m = Math.pow(10, parseInt(2))
        out = Math.floor(out * m) / m
        this.responsiveRatioClass = 'responsive-ratio-' + out
        this.responsiveWidthClass = `resp-width-size-${this.getResponsiveBreakPoint(this.$el.offsetWidth)}`
        this.responsiveHeightClass = `resp-height-size-${this.getResponsiveBreakPoint(this.$el.offsetHeight)}`
        this.debugResponsiveWidthClass = `${this.getResponsiveBreakPoint(this.$el.offsetWidth)}`
        this.debugResponsiveHeightClass = `${this.getResponsiveBreakPoint(this.$el.offsetHeight)}`
      }
    },
    reloadLoadingHistorical () {
      this.clearChartSeries()
      this.initChart()
      this.loadHistoricalData()
    },
    onHistoricalDataLoaded () {
      this.addDataToSeries(this.historicalData)
    },
    clearChartSeries (seriesData) {
      this.seriesCounter = {}
      let charts = this.$refs.highcharts
      if (charts) {
        if (charts.chart.series) {
          this._.forEach(charts.chart.series, (item) => {
            if (item && item.remove) {
              item.remove(true)
            }
          })
        }
      }
    },
    onGroupDataSocket (payload) {
      if (!this.paused) {
        this.addDataToSeries([payload.data])
        this.lastUpdateTime = new Date()
        this.lastSocketData = payload.data
      }
    },
    addDataToSeries (data) {
      let charts = this.$refs.highcharts
      if (charts && data && data[0]) {
        data.sort((a, b) => {
          return new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf()
        })
        this._.each(data, (item) => {
          this._.each(item.data, (valueItem, key) => {
            charts.chart.series.forEach((serie) => {
              let sensorValue = parseFloat(valueItem)
              let dateObject = new Date(item.dateTime).valueOf()
              let removeFromLast = false
              if (this.seriesCounter[serie.name]) {
                this.seriesCounter[serie.name].counter += 1
              } else {
                this.seriesCounter[serie.name] = {
                  counter: 1
                }
              }
              if (this.seriesCounter[serie.name].counter > 50) {
                removeFromLast = true
              }
              serie.addPoint([dateObject, sensorValue], true, removeFromLast)
            })
          })
        })
      }
    },
    specialUpdates () {
      this.clearSocketThings().then(() => {
        this.startSocketThings()
      })
      this.updateChartOptions()
    },
    updateChartOptions () {
      let charts = this.$refs.highcharts
      let clonedSetting = this._.clone(this.options)
      charts.chart.update(clonedSetting, true)
      this.reflow()
    },
    initChart () {
      // TODO: need debounce
      let charts = this.$refs.highcharts
      let out = this.settings && this.settings.chart && this.settings.chart.enabled
      if (out) {
        /* eslint-disable */
        setTimeout(() => {
          if (charts) {
            this._.forEach(charts.chart.series, (item) => {
              if (item && item.remove) {
                item.remove(true)
              }
            })
          }
          this.addSeriesToChart([{
            name: 'NewData',
            data: []
          }])
        }, 300)
        /* eslint-enable */
      }
      return out
    },
    addSeriesToChart (seriesData) {
      let charts = this.$refs.highcharts
      if (charts) {
        seriesData.forEach((item) => {
          charts.chart.addSeries({
            name: item.name,
            data: item.data,
            color: 'rgba(200,200,200, .3)'
          })
        })
        this.reflow()
      }
    },
    reflow () {
      clearTimeout(this.reflowDebounceTimer)
      this.reflowDebounceTimer = setTimeout(() => {
        let charts = this.$refs.highcharts
        if (charts) {
          charts.chart.reflow()
          charts.chart.redraw()
        }
      }, 400)
    }
  }
}
</script>
