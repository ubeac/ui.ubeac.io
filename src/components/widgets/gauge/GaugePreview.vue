<template>
  <div
    v-if="dominantSensor"
    class="widgets-preview-container widget-preview-gauge">
    <charts
      v-if="dominantSensor && timerDone"
      ref="highcharts"
      :value="dominantValue"
      :options="defaultOptions" />
  </div>
</template>
<script>
import LiveWidgetMixin from '@/components/widgets/mixins/live'
import HistoricalMixin from '@/components/widgets/mixins/historical'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'GaugeLiveWidgetPreview',
  mixins: [LiveWidgetMixin, HistoricalMixin, EntitiesMixin],
  data () {
    return {
      setResponsiveClassInterval: null,
      responsiveRatioClass: null,
      responsiveWidthClass: null,
      responsiveHeightClass: null,
      debugResponsiveWidthClass: null,
      debugResponsiveHeightClass: null,
      showMapTimer: null,
      timerDone: false,
      defaultOptions: {
        chart: {
          type: 'solidgauge',
          renderTo: 'container',
          alignTicks: false,
          backgroundColor: 'transparent',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          style: {
            color: window.theme.chart.titleColor
          },
          plotShadow: false
        },
        pane: {
          center: ['50%', '70%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
            borderWidth: 0,
            borderColor: window.theme.chart.gaugePane.borderColor,
            backgroundColor: window.theme.chart.gaugePane.backgroundColor,
            innerRadius: '70%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },
        tooltip: {
          enabled: false
        },
        // the value axis
        yAxis: {
          min: 0,
          max: 100,
          tickPositioner: function () {
            return [this.min, this.max]
          },
          stops: [
            [0.1, '#57C99A'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#940a17'] // red
          ],
          tickLength: 0,
          endOnTick: false,
          lineWidth: 0,
          minorTickInterval: null,
          tickAmount: 0,
          title: {
            style: {
              color: window.theme.chart.titleColor
            },
            y: 5
          },
          labels: {
            y: 16,
            style: {
              color: window.theme.chart.titleColor
            },
            distance: -10
          }
        },
        series: [{
          data: [{
            innerRadius: '70%',
            radius: '100%',
            y: 0
          }]
        }],
        plotOptions: {
          solidgauge: {
            animation: false,
            dataLabels: {
              y: 40,
              borderWidth: 0,
              useHTML: true,
              style: {
                color: window.theme.chart.titleColor,
                fontFamily: 'Open Sans',
                fontSize: '48px'
              }
            }
          }
        },
        credits: {
          enabled: false
        }
      }
    }
  },
  computed: {
    range () {
      let out = []
      try {
        out = JSON.parse(this.dominantSensor.attributes.ui_colorRange)
      } catch (error) {
      }
      return out
    },
    chartOptions () {
      if (this.settings) {
        this.updateChartOptions(this.settings.chart)
        return true
      } else {
        return false
      }
    },
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
      if (this.lastSocketData) {
        out = this.lastSocketData.value
        if (this.settings.sensorFilter.sensorSelectedValue) {
          let normalizeKey = this.settings.sensorFilter.sensorSelectedValue
          out = this.lastSocketData.data[normalizeKey]
        }
      } else if (this.historicalData && this.historicalData.length > 0) {
        out = this.historicalData[this.historicalData.length - 1].data.value
        if (this.settings.sensorFilter.sensorSelectedValue) {
          let normalizeKey = this.settings.sensorFilter.sensorSelectedValue
          out = this.historicalData[this.historicalData.length - 1].data[normalizeKey]
        }
      }
      out = this.$options.filters.numeralFormat(out, this.numeralFormat)
      this.$emit('updateDominantValue', out)
      this.updateGaugeValue(parseFloat(out))
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
    dominantGateway () {
      let out = false
      if (this.lastSocketData) {
        out = this.gatewayById(this.lastSocketData.gatewayId)
      } else if (this.historicalData && this.historicalData.length > 0) {
        out = this.gatewayById(this.historicalData[0].gatewayId)
      }
      return out
    }
  },
  watch: {
    widgetData: {
      deep: true,
      handler () {
        this.setResponsiveClassInterval = setInterval(() => {
          this.setResponsiveClass()
        }, 200)
        this.reflow()
        this.updateChartOptions()
      }
    },
    dashboardIsEditMode () {
      this.reflow()
      this.setResponsiveClassInterval = setInterval(() => {
        this.setResponsiveClass()
      }, 200)
      setTimeout(() => {
        this.updateChartOptions()
        this.reflow()
      }, 500)
    }
  },
  beforeDestroy () {
    clearTimeout(this.showMapTimer)
  },
  mounted () {
    this.showMapTimer = setTimeout(() => {
      this.timerDone = true
      setTimeout(() => {
        this.updateChartOptions()
      }, 200)
    }, 1000)
    window.addEventListener('sidebarresized', (e) => {
      setTimeout(() => {
        this.reflow()
      }, 500)
    })
    window.addEventListener('resize', this.onWindowResize)
    this.setResponsiveClassInterval = setInterval(() => {
      this.setResponsiveClass()
    }, 200)
  },
  methods: {
    onWindowResize () {
      this.setResponsiveClassInterval = setInterval(() => {
        this.setResponsiveClass()
      }, 200)
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
    specialUpdates () {
      this.clearSocketThings().then(() => {
        this.updateChartOptions()
        this.startSocketThings()
      })
    },
    updateChartOptions () {
      let unit = null
      let format = '{y}'
      let charts = this.$refs.highcharts
      let cloned = this._.cloneDeep(this.defaultOptions)
      let calcedRatio = this.$el.offsetWidth / this.$el.offsetHeight
      if (calcedRatio < 0.96) {
        this._.extend(cloned.pane, {
          center: ['50%', '50%'],
          size: '100%'
        })
      } else if (calcedRatio > 0.96 && calcedRatio < 1) {
        this._.extend(cloned.pane, {
          center: ['50%', '70%'],
          size: '115%'
        })
      } else if (calcedRatio === 1) {
        this._.extend(cloned.pane, {
          center: ['50%', '70%'],
          size: '140%'
        })
      } else if (calcedRatio > 1 && calcedRatio < 1.3) {
        this._.extend(cloned.pane, {
          center: ['50%', '55%'],
          size: '110%'
        })
      } else if (calcedRatio > 1.3 && calcedRatio < 1.5) {
        this._.extend(cloned.pane, {
          center: ['50%', '70%'],
          size: '110%'
        })
      } else if (this.widgetData.h > 2 && calcedRatio > 2) {
        this._.extend(cloned.pane, {
          center: ['50%', '85%'],
          size: '170%'
        })
      } else {
        this._.extend(cloned.pane, {
          center: ['50%', '75%'],
          size: '140%'
        })
      }

      let dataLabelsY = -30
      let dataLabelsFontSize = 32
      let titleY = -10
      let titleFontSize = 20

      if (this.widgetData.w <= 2 || this.widgetData.h <= 2) {
        dataLabelsY = -30
        dataLabelsFontSize = 32
        titleY = -10
      } else if (this.widgetData.w === 3 || this.widgetData.h === 3) {
        dataLabelsY = -30
        dataLabelsFontSize = 32
        titleY = -10
      } else {
        dataLabelsY = -30
        dataLabelsFontSize = 32
        titleY = -10
      }
      if (['xxs', 'xs'].includes(this.debugResponsiveWidthClass) && ['xxs', 'xs'].includes(this.debugResponsiveHeightClass)) {
        titleY = 0
        titleFontSize = 15
      }
      if (['md', 'sm', 'lg', 'xl', 'xxl', 'xxxl'].includes(this.debugResponsiveWidthClass) && ['xxs', 'xs'].includes(this.debugResponsiveHeightClass)) {
        titleY = 0
        titleFontSize = 15
      }
      if (['lg', 'xl', 'xxl', 'xxxl'].includes(this.debugResponsiveWidthClass) && ['lg', 'xl', 'xxl', 'xxxl'].includes(this.debugResponsiveHeightClass)) {
        titleY = -10
        dataLabelsFontSize = 42
        titleFontSize = 25
      }
      if (this.settings.sensorFilter && this.settings.sensorFilter.sensorIds &&
        this.settings.sensorFilter.sensorIds.length > 0) {
        if (this.settings.sensorFilter.sensorIds[0] && this.unitBySensorId(this.settings.sensorFilter.sensorIds[0])) {
          unit = this.unitBySensorId(this.settings.sensorFilter.sensorIds[0]).abbr
        }
        format = function () {
          return `<div style="text-align:center">
            <span 
              class="w-100 clear-both d-block">
              ${this.y}
            <span 
              style="font-size:.7em;"
              class="text-muted h6">
              ${unit}
            </span>
            </span>
            </div>`
        }
      }
      let stopsList = []
      let stopMin = 0
      let stopMax = 100
      if (this.range && this.range.length > 0) {
        this._.each(this.range, (item) => {
          if (item.color) {
            stopsList.push([this.getPercent(item.value, this.range[0].value,
              this.range[this.range.length - 1].value), item.color])
          }
        })
        stopMax = parseFloat(this.range[0].value)
        stopMin = parseFloat(this.range[this.range.length - 1].value)
      }

      let opt = this._.merge(cloned, {
        chart: {
          backgroundColor: 'transparent',
          style: {
            color: window.theme.chart.titleColor
          }
        },
        title: {
          style: {
            color: window.theme.chart.titleColor,
            fontFamily: 'Open Sans',
            fontSize: `${titleFontSize}px`
          },
          y: titleY,
          verticalAlign: 'bottom',
          text: this.widgetData.widget.name
        },
        plotOptions: {
          animation: false,
          solidgauge: {
            dataLabels: {
              formatter: format,
              y: dataLabelsY,
              borderWidth: 0,
              useHTML: true,
              style: {
                color: window.theme.chart.titleColor,
                fontFamily: 'Open Sans',
                fontSize: `${dataLabelsFontSize}px`
              }
            }
          }
        },
        yAxis: {
          labels: {
            style: {
              color: window.theme.chart.titleColor
            }
          },
          stops: stopsList.reverse(),
          min: stopMin,
          max: stopMax
        },
        pane: {
          background: {
            borderColor: window.theme.chart.gaugePane.borderColor,
            backgroundColor: window.theme.chart.gaugePane.backgroundColor
          }
        }
      })
      this.defaultOptions = opt

      if (charts && charts.chart && charts.chart.series) {
        charts.chart.update(opt, true)
      }
      this.reflow()
    },
    getPercent (value, max, min) {
      return (value * 1) / (max - min)
    },
    updateGaugeValue (out) {
      let chart = this.$refs.highcharts
      if (chart && chart.chart && chart.chart.series) {
        chart.chart.series[0].points[0].update(out)
      }
    },
    reflow () {
      let charts = this.$refs.highcharts
      if (charts && charts.chart) {
        charts.chart.reflow()
        charts.chart.redraw()
      }
    }
  }
}
</script>
