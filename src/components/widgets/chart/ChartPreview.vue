<template>
  <div class="widgets-preview-container">
    <charts
      v-if="widgetData && widgetData.widget && widgetData.widget.settings"
      ref="highcharts"
      :constructor-type="'stockChart'"
      :options="options"/>
  </div>
</template>
<script>
import LiveWidgetMixin from '@/components/widgets/mixins/live'
import HistoricalMixin from '@/components/widgets/mixins/historical'
export default {
  name: 'ChartLiveWidgetPreview',
  mixins: [LiveWidgetMixin, HistoricalMixin],
  data () {
    let self = this
    return {
      applyHistoricalDataDebounce: null,
      chartReflowTimer: null,
      chartReflowTimerTime: 300,
      cachedSeriesGroupId: null,
      seriesCounter: {},
      updateChartTimelineInterval: false,
      options: {
        chart: {
          animation: false
        },
        tooltip: {
          shared: true,
          followPointer: true,
          xDateFormat: '%Y/%m/%e %H:%M:%S',
          pointFormatter (p) {
            let out
            let precision
            let name = this.series.name.split('---')[0]
            let filterinfItem = self.settings.sensorFilter.find((item) => {
              return item.name === name
            })
            if (filterinfItem) {
              let sensorId = filterinfItem.data.sensorIds[0]
              let sensor = self.sensorById(sensorId)
              if (sensor && sensor.attributes && sensor.attributes.ui_precision) {
                precision = sensor.attributes.ui_precision
              }
            }
            out = self.$options.filters.numeralFormat(this.y, self.getNumeralFormat(precision))
            return ` <span style="color:${this.color}">●</span> ${name}: <b>${out}</b><br/>`
          }
        },
        xAxis: {
          type: 'datetime',
          ordinal: false,
          tickPixelInterval: 150
        },
        time: {
          useUTC: false
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
    chartOptions () {
      if (this.settings) {
        this.updateChartOptions(this.settings.chart)
        return true
      } else {
        return false
      }
    },
    dashboardEditMode () {
      return this.dashboardIsEditMode
    },
    dashboardPreviewMode () {
      return this.dashboardIsPreviewMode
    }
  },
  watch: {
    widgetData: {
      deep: true,
      handler () {
        this.reflow()
      }
    },
    dashboardEditMode () {
      this.reflow()
    }
  },
  mounted () {
    window.addEventListener('sidebarresized', this.handleResize)
    window.addEventListener('resize', this.handleResize)
    this.updateChartOptions()
    window.addEventListener('updateTheme', (e) => {
      this.updateChartOptions()
    })
  },
  beforeDestroy () {
    window.removeEventListener('sidebarresized', this.handleResize)
    window.removeEventListener('resize', this.handleResize)
    clearTimeout(this.chartReflowTimer)
    clearTimeout(this.applyHistoricalDataDebounce)
  },
  methods: {
    reload3rdParties () {
      this.updateChartOptions()
    },
    getNumeralFormat (precision) {
      let out = '0,0.[0000000000000000000000]'
      precision = parseInt(precision)
      if (precision > 0) {
        out = `0,0.[${'0'.repeat(precision)}]`
      } else if (precision === 0) {
        out = '0,0'
      }
      return out
    },
    handleResize () {
      this.reflow()
    },
    addDefaultSeries () {
      this._.each(this.settings.sensorFilter, (serie) => {
        if (serie.data && serie.data.sensorIds && serie.data.sensorSelectedValue) {
          let sensorId = serie.data.sensorIds[0]
          if (sensorId) {
            this.addSeriesToChart([{
              name: `${serie.name}---${sensorId}---${serie.data.sensorSelectedValue.toLowerCase()}`,
              data: []
            }])
          }
        }
      })
    },
    onHistoricalDataLoaded () {
      clearTimeout(this.applyHistoricalDataDebounce)
      this.applyHistoricalDataDebounce = setTimeout(() => {
        this.addDataToSeries(this.historicalData)
      }, 3000)
    },
    specialUpdates () {
      this.firstHistoricalLoadDone = false
      this.clearChartSeries()
      this.addDefaultSeries()
      this.reloadLoadingHistorical()
      this.updateChartOptions()
      this.clearSocketThings().then(() => {
        this.updateChartOptions()
        this.startSocketThings()
      })
    },
    startSocketThings () {
      if (this.settings.sensorFilter) {
        this.cachedSeriesGroupId = {}
        this._.each(this.settings.sensorFilter, (serie) => {
          if (serie.data && serie.data.sensorSelectedValue) {
            let gatewayId = '*'
            let deviceId = serie.data.deviceIds[0]
            let sensorId = serie.data.sensorIds[0]
            if (deviceId && sensorId) {
              let groupId = `SensorData/${this.workspaceId}/${gatewayId}/${deviceId}/${sensorId}`
              this.cachedSeriesGroupId[`${groupId}-${serie.name}-${serie.data.sensorSelectedValue.toLowerCase()}`] = {
                name: serie.name,
                sensorValueType: serie.data.sensorSelectedValue.toLowerCase()
              }
              this.joinGroupSocket(groupId)
            }
          }
        })
        this.firstSetup = false
      }
    },
    onGroupDataSocket (payload) {
      if (!this.paused) {
        this.addDataToSeries([payload.data])
      }
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
          // TODO: remove this lines if navigator series issue resolved in Highcharts
          this._.forEach(charts.chart.series, (item) => {
            if (item && item.remove) {
              item.remove(true)
            }
          })
        }
      }
    },
    startChartInterval () {
      this.stopChartInterval()
      let charts = this.$refs.highcharts
      if (charts) {
        this.updateChartTimelineInterval = setInterval(() => {
          if (charts.chart.xAxis) {
            charts.chart.xAxis[0].setExtremes(
              new Date().valueOf() - (1000 * this.settings.dataTimeRange),
              new Date().valueOf()
            )
          }
        }, this.settings.refreshTime)
      }
    },
    stopChartInterval () {
      clearInterval(this.updateChartTimelineInterval)
    },
    addSeriesToChart (seriesData) {
      let charts = this.$refs.highcharts
      if (charts) {
        let noDuplicate = true
        charts.chart.series.forEach((serie) => {
          if (serie.name === seriesData[0].name) {
            noDuplicate = false
          }
        })
        if (noDuplicate) {
          charts.chart.addSeries({
            name: seriesData[0].name,
            data: seriesData[0].data
          })
        }
        this.updateChartOptions()
        this.reflow()
        this.startChartInterval()
      }
    },
    addDataToSeries (data) {
      let charts = this.$refs.highcharts
      if (charts && charts.chart.series[0] && data && data[0]) {
        data.sort((a, b) => {
          return new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf()
        })
        data.forEach((item) => {
          this._.each(item.data, (valueItem, key) => {
            charts.chart.series.forEach((serie) => {
              let sensorValue = parseFloat(valueItem)
              let dateObject = new Date(item.dateTime).valueOf()
              let removeFromLast = false
              if (serie.name.split('---')[1] === item.sensorId) {
                if (serie.name.split('---')[2].toLowerCase() === key.toLowerCase()) {
                  if (this.seriesCounter[serie.name]) {
                    this.seriesCounter[serie.name].counter += 1
                  } else {
                    this.seriesCounter[serie.name] = {
                      counter: 1
                    }
                  }
                  if (this.seriesCounter[serie.name].counter > 1000) {
                    removeFromLast = true
                  }
                  serie.addPoint([dateObject, sensorValue], true, removeFromLast)
                }
              }
            })
          })
        })
      }
    },
    updateChartOptions () {
      let that = this
      let charts = this.$refs.highcharts
      let clonedSetting = this._.clone(this.settings.chart)
      let plotOptions = {
        series: {
          fillOpacity: 0.1
        }
      }
      let chart = {
        backgroundColor: 'transparent',
        marginBottom: 5,
        height: (that.widgetData.h * 80) + ((that.widgetData.h - 1) * 10) - 6
      }

      let xAxis = {
        type: 'datetime',
        ordinal: false,
        gridLineWidth: 1,
        gridLineColor: window.theme.chart.axisLineColor,
        tickLength: 0,
        tickColor: window.theme.chart.axisLineColor,
        tickPixelInterval: 150,
        lineColor: window.theme.chart.axisLineColor,
        labels: {
          style: {
            color: window.theme.chart.labelColor
          }
        }
      }
      if (clonedSetting && clonedSetting.stepLine) {
        plotOptions = {
          series: {
            fillOpacity: 0.1,
            lineWidth: 1
          },
          line: {
            step: 'center'
          }
        }
      } else {
        plotOptions = {
          series: {
            fillOpacity: 0.1,
            lineWidth: 1
          },
          line: {
            step: null
          }
        }
      }
      if (charts) {
        let opt = this._.merge({}, this.options, clonedSetting, {
          // TODO: move this config to config.js
          // http://jsfiddle.net/Bitii/aayajgLe/237/
          chart: chart,
          colors: window.theme.chart.colors,
          navigator: {
            enabled: false
          },
          plotOptions: plotOptions,
          title: {
            verticalAlign: 'top',
            align: 'left',
            x: 10,
            y: 20,
            style: {
              color: window.theme.chart.titleColor
            },
            text: this.widgetData.widget.name
          },
          tooltip: {
            split: false,
            shared: true,
            followPointer: true,
            style: {
              color: window.theme.chart.titleColor
            },
            backgroundColor: window.theme.chart.tooltipBg
          },
          legend: {
            labelFormatter (x) {
              return this.name.split('---')[0]
            },
            y: -10,
            layout: 'horizontal',
            verticalAlign: 'top',
            align: 'right',
            style: {
              color: window.theme.chart.labelColor
            },
            itemStyle: {
              color: window.theme.chart.labelColor
            }
          },
          yAxis: {
            opposite: false,
            gridLineColor: window.theme.chart.plotLineColor,
            title: {
              enabled: false
            },
            labels: {
              style: {
                color: window.theme.chart.labelColor
              }
            },
            style: {
              color: window.theme.chart.titleColor
            }
          },
          xAxis: xAxis
        })
        if (this.settings && this.settings.chart && this.settings.chart.title &&
          this.settings.chart.title.enabled === false) {
          opt.title.text = ''
        }
        charts.chart.update(opt, true)
        this.reflow()
      }
    },
    reflow (delay) {
      let charts = this.$refs.highcharts
      clearTimeout(this.chartReflowTimer)
      this.chartReflowTimer = setTimeout(() => {
        charts.chart.reflow()
      }, this.chartReflowTimerTime)
    }
  }
}
</script>
