<template>
  <ModalSettings
    v-model="visibility"
    @show="show"
    @hide="hide"
    @cancelSettingsModal="cancelSettingsModal"
    @ok="ok">
    <template
      v-if="settings"
      slot="settings">
      <h3>
        {{ $t('dashboard.widget.settings') }}
      </h3>
      <b-row>
        <b-col cols="12">
          <b-tabs
            :no-fade="true"
            content-class="mt-3">
            <b-tab
              :title="$t('dashboard.settings_tab.general')"
              active>
              <b-form
                inline
                class="needs-validation"
                autocomplete="nope"
                novalidate>
                <b-form-group :label="$t('general.name')">
                  <b-form-input
                    v-model="widgetData.widget.name"
                    :placeholder="$t('general.name_placeholder')"
                    :name="$t('general.name')"
                    type="text"
                    autofocus
                    required/>
                  <b-form-invalid-feedback v-if="errors.has(`${$t('general.name')}`)">
                    <span v-for="error in errors.collect(`${$t('general.name')}`)">
                      {{ error }}
                    </span>
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group :label="$t('general.description')">
                  <b-form-textarea
                    v-model="widgetData.widget.description"
                    :placeholder="$t('general.description_placeholder')"
                    :name="$t('general.description')"
                    type="text"
                    rows="2"/>
                </b-form-group>
                <b-form-group :label="$t('dashboard.widget.IndicatorLiveWidget')">
                  <b-card
                    v-for="(indicator, index) in indicatorList"
                    v-if="indicator.name != 'BeamIndicator'"
                    :key="index"
                    :class="{
                      'card-selected': settings.widgetIndicator == indicator.name ,
                      'no-shadow': settings.widgetIndicator != indicator.name
                    }"
                    class="float-left mr-3 card-border dashboard-widget--indicator-modal-indicator"
                    @click="selectIndicatorType(indicator.name)">
                    <div>
                      <component
                        v-if="range"
                        :last-update="dominantValueUpdateTime"
                        :value="dominantValue"
                        :max="indicatorMax"
                        :range="range"
                        :is="indicator.name"/>
                      <component
                        v-else
                        :last-update="dominantValueUpdateTime"
                        :value="dominantValue"
                        :max="indicatorMax"
                        :is="indicator.name"/>
                    </div>
                  </b-card>
                </b-form-group>
              </b-form>
            </b-tab>
            <b-tab :title="$t('dashboard.settings_tab.sensor')">
              <b-row>
                <b-col cols="12">
                  <div
                    :style="{'position': 'relative', 'z-index': 10000000}">
                    <WidgetSelectDevice
                      :data-filter="settings.sensorFilter"
                      class="h-25 mb-3"
                      @updateFilter="updateFilter"/>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('dashboard.settings_tab.advance')">
              <b-form
                inline
                class="needs-validation"
                autocomplete="nope"
                novalidate>
                <b-form-group
                  v-if="settings && settings.chart"
                  :label="$t('dashboard.widget_chart_visbility_switch')"
                  class="pt-0">
                  <toggle-button
                    :speed="100"
                    :sync="true"
                    :labels="false"
                    v-model="settings.chart.enabled"
                    :unchecked-value="false"/>
                </b-form-group>
                <b-form-group
                  v-if="settings && settings.unit"
                  :label="$t('dashboard.widget_unit_visbility_switch')">
                  <toggle-button
                    :speed="100"
                    :sync="true"
                    :labels="false"
                    v-model="settings.unit.enabled"
                    :unchecked-value="false"/>
                </b-form-group>
                <b-form-group
                  v-if="settings && settings.deviceName"
                  :label="$t('dashboard.widget_device_name_visbility_switch')">
                  <toggle-button
                    :speed="100"
                    :sync="true"
                    :labels="false"
                    v-model="settings.deviceName.enabled"
                    :unchecked-value="false"/>
                </b-form-group>
                <b-form-group
                  v-if="settings && settings.lastUpdateTime"
                  :label="$t('dashboard.widget_last_update_visbility_switch')">
                  <toggle-button
                    :speed="100"
                    :sync="true"
                    :labels="false"
                    v-model="settings.lastUpdateTime.enabled"
                    :unchecked-value="false"/>
                </b-form-group>
              </b-form>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row class="row-fixture justify-content-center"/>
    </template>
    <template
      slot="preview">
      <Preview
        v-if="widgetData && widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.deviceFiltera !== null"
        :style="{width: `${previewWidth}px`, maxWidth: '100%', height: widgetData.h*80 + 'px'}"
        :widget-data="widgetData"
        class="settings-modal-widget-preview"/>
    </template>
  </ModalSettings>
</template>
<script>
import WidgetSettingsMixin from '../mixins/settings.js'
import Preview from './IndicatorPreview.vue'
import Indicators from '@/components/indicator/index'
export default {
  name: 'IndicatorLiveWidgetSettings',
  components: { Preview, ...Indicators },
  mixins: [WidgetSettingsMixin],
  props: {
    value: {
      type: [Object, Boolean],
      default: null,
      required: false
    },
    dominantValue: {
      type: [Object, Boolean, String, Number],
      default: null,
      required: false
    }
  },
  data () {
    return {
      indicatorList: Indicators
    }
  },
  computed: {
    dominantValueUpdateTime () {
      let out = null
      if (this.lastSocketData) {
        out = new Date(this.lastSocketData.dateTime)
      } else if (this.historicalData && this.historicalData.length > 0) {
        out = this.historicalData[0].dateTime
      }
      return out
    },
    dominantValueComp () {
      return this.dominantValue
    },
    dominantSensor () {
      let out = null
      if (this.settings.sensorFilter.sensorIds[0]) {
        out = this.sensorById(this.settings.sensorFilter.sensorIds[0])
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
  methods: {
    selectIndicatorType (indicatorType) {
      this.settings.widgetIndicator = indicatorType
    }
  }
}
</script>
