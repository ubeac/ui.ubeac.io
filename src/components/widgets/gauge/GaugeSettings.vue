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
        <b-form-group
          :label="$t('general.description')"
          class="form-border-bottom">
          <b-form-textarea
            v-model="widgetData.widget.description"
            :placeholder="$t('general.description_placeholder')"
            :name="$t('general.description')"
            type="text"
            rows="2" />
        </b-form-group>
      </b-form>
      <div
        :style="{'position': 'relative', 'z-index': 10000000}">
        <WidgetSelectDevice
          :data-filter="settings.sensorFilter"
          class="h-25 mb-3"
          @updateFilter="updateFilter"/>
      </div>
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
import Preview from './GaugePreview.vue'
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
    dominantValueComp () {
      return this.dominantValue
    }
  },
  methods: {
    selectIndicatorType (indicatorType) {
      this.settings.widgetIndicator = indicatorType
    }
  }
}
</script>
