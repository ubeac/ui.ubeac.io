<template>
  <ComponentContainer>
    <b-form
      v-if="liveConfig"
      inline
      class="pl-4 pr-0">
      <b-row class="w-100">
        <b-col
          xl="6"
          lg="6"
          cols="12">
          <b-card
            no-body
            class="no-shadow card-border pr-0 pl-3">
            <!--General Config-->
            <b-form-group :label="$t('dashboard.chart_type')">
              <b-form-select
                v-model="liveConfig.chart.type"
                style="min-width: -webkit-fill-available;"
                @input="updateParent()">
                <option value="line">{{ $t("dashboard.chart.line") }}</option>
                <option value="spline">{{ $t("dashboard.chart.spline") }}</option>
                <option value="column">{{ $t("dashboard.chart.column") }}</option>
                <option value="bar">{{ $t("dashboard.chart.bar") }}</option>
                <option value="area">{{ $t("dashboard.chart.area") }}</option>
                <option value="areaspline">{{ $t("dashboard.chart.area_spline") }}</option>
              </b-form-select>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.step_line')">
              <toggle-button
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.stepLine"
                :disabled="liveConfig.chart.type !== 'line'"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.title')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.title.enabled"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.tooltip')">
              <toggle-button
                :value="true"
                :speed="100"
                v-model="liveConfig.tooltip.enabled"
                :unchecked-value="false"
                :sync="true"
                :labels="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('general.grid')">
              <toggle-button
                :value="true"
                :speed="100"
                v-model="liveConfig.chartBgGrid"
                :unchecked-value="false"
                :sync="true"
                :labels="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.legend')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.legend.enabled"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
          </b-card>
        </b-col>
        <!--xAxis Config-->
        <b-col
          xl="6"
          lg="6"
          cols="12">
          <b-card
            no-body
            class="no-shadow card-border pt-3">
            <h4 class="form-header">{{ $t("dashboard.chart.xAxis") }}</h4>
            <b-form-group :label="$t('general.label')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.xAxis.labels.enabled"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.reversed')">
              <toggle-button
                :value="false"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.xAxis.reversed"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.align_ticks')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.xAxis.alignTicks"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.allow_decimals')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.xAxis.allowDecimals"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
          </b-card>
        </b-col>
        <b-col
          xl="6"
          lg="6"
          cols="12">
          <b-card
            no-body
            class="no-shadow card-border pt-3">
            <h4 class="form-header">{{ $t("dashboard.chart.yAxis") }}</h4>
            <b-form-group :label="$t('general.label')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.yAxis.labels.enabled"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.reversed')">
              <toggle-button
                :value="false"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.yAxis.reversed"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.align_ticks')">
              <toggle-button
                :value="true"
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="liveConfig.yAxis.alignTicks"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
            <b-form-group :label="$t('dashboard.chart.allow_decimals')">
              <toggle-button
                :value="true"
                :sync="true"
                :labels="false"
                v-model="liveConfig.yAxis.allowDecimals"
                :unchecked-value="false"
                @input="updateParent()"/>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </b-form>
  </ComponentContainer>
</template>
<script>
import Moment from 'moment'
export default {
  name: 'ChartConfig',
  props: {
    config: {
      type: Object,
      default () {
        return this.chartDefaultOption
      },
      required: false
    }
  },
  data () {
    let shortDateFormat = this.$config.dateFormat.short
    let mediumDateFormat = this.$config.dateFormat.medium
    return {
      liveConfig: null,
      chartDefaultOption: {
        chartBgGrid: false,
        stepLine: false,
        chart: {
          type: 'spline',
          zoomType: 'false',
          title: {
            enabled: true
          }
        },
        scrollbar: {
          enabled: false
        },
        navigator: {
          enabled: true
        },
        title: {
          enabled: true
        },
        legend: {
          enabled: true,
          align: 'center'
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          enabled: true,
          dateTimeLabelFormats: {
            millisecond: '%Y/%m/%e %H:%M:%S.%L'
          }
        },
        credits: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        },
        xAxis: {
          minorTickInterval: 'null',
          startOnTick: false,
          endOnTick: false,
          type: 'datetime',
          alignTicks: true,
          allowDecimals: true,
          reversed: false,
          title: {
            enabled: false
          },
          labels: {
            enabled: true,
            formatter: function () {
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
        yAxis: {
          alignTicks: true,
          allowDecimals: true,
          reversed: false,
          title: {
            enabled: true
          },
          labels: {
            enabled: true,
            formatter: function () {
              return this.value
            }
          }
        }
      }
    }
  },
  mounted () {
    this.liveConfig = this._.merge(this.chartDefaultOption, this.config)
    this.updateParent()
  },
  methods: {
    updateParent () {
      this.$emit('update', this.liveConfig)
    }
  }
}
</script>
