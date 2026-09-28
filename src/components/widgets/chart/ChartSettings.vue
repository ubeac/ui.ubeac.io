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
      <b-tabs content-class="mt-3">
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
            <b-form-group :label="$t('general.time_range')">
              <b-form-input
                v-validate.disable="'required|numeric'"
                v-model="settings.dataTimeRange"
                :placeholder="$t('general.time_range')"
                :state="errors.has(`${$t('general.time_range')}`) ? 'invalid' : null"
                :name="$t('general.time_range')"
                type="number"
                required/>
              <b-form-invalid-feedback v-if="errors.has(`${$t('general.time_range')}`)">
                <span v-for="error in errors.collect(`${$t('general.time_range')}`)">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form>
        </b-tab>
        <b-tab
          :title="$t('dashboard.settings_tab.sensor')">
          <WidgetSelectSeries
            :sensor-value-type="true"
            :series="series"
            @updateSeries="updateFilter" />
        </b-tab>
        <b-tab :title="$t('dashboard.settings_tab.chart')">
          <ChartConfig
            :config="settings.chart"
            @update="updateChartConfig"/>
        </b-tab>
      </b-tabs>
    </template>
    <template
      slot="preview">
      <Preview
        v-if="showPreview && widgetData && widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.deviceFilter !== null"
        :style="{width: `${previewWidth}px`, maxWidth: '100%', height: previewHeight + 'px'}"
        :widget-data="widgetData"
        class="settings-modal-widget-preview"/>
      <Loading v-else />
    </template>
  </ModalSettings>
</template>

<script>
import WidgetSettingsMixin from '../mixins/settings.js'
import Preview from './ChartPreview.vue'
import ChartConfig from '@/components/widgets/partials/ChartConfig'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'ChartLiveWidgetSettings',
  components: { ChartConfig, Preview },
  mixins: [WidgetSettingsMixin, EntitiesMixin],
  props: {
    value: {
      type: [Object, Boolean],
      default: null,
      required: false
    }
  },
  data () {
    return {
      showPreviewTimeout: null,
      showPreview: false,
      eventModel: {
        action: 'add_chart_widget',
        category: 'Chart Widget',
        label: 'User added a new chart',
        value: 0
      }
    }
  },
  computed: {
    previewHeight () {
      return (this.widgetData.h * 80) + ((this.widgetData.h - 1) * 10) - 6
    },
    series () {
      let out = []
      if (this.settings && this.settings.sensorFilter) {
        out = this._.cloneDeep(this.settings.sensorFilter)
      }
      return out
    }
  },
  beforeDestroy () {
    clearTimeout(this.showPreviewTimeout)
  },
  mounted () {
    this.showPreviewTimeout = setTimeout(() => {
      this.showPreview = true
    }, 1500)
  },
  methods: {
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'
      // this.sendGtagEvent(this.eventModel)
    },
    updateChartConfig (event) {
      this.settings.chart = event
    }
  }
}
</script>
