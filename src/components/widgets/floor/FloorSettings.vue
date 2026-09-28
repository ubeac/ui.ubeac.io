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
            <FloorSelector
              :validate-building="true"
              :validate-floor="true"
              v-model="settings.floorId"
              needvalidation="false"/>
            <b-form-group :label="$t('dashboard.map.visbile_all_infobox')">
              <toggle-button
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="settings.allInfoboxVisible"
                :unchecked-value="false"
                @updateSeries="updateFilter($event);" />
            </b-form-group>
            <b-form-group :label="$t('dashboard.map.controls')">
              <toggle-button
                :speed="100"
                :sync="true"
                :labels="false"
                v-model="settings.controls"
                :unchecked-value="false"/>
            </b-form-group>
          </b-form>
        </b-tab>
      </b-tabs>
    </template>
    <template
      slot="preview">
      <Preview
        v-if="widgetData && widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.deviceFiltera !== null"
        :style="{width: `${previewWidth}px`, maxWidth: '100%', height: widgetData.h*80 + 'px'}"
        :widget-data="widgetData"
        class="settings-modal-widget-preview"
        @onZoomChanged="onZoomChanged"
        @onCenterChanged="onCenterChanged"/>
    </template>
  </ModalSettings>
</template>
<script>
import WidgetSettingsMixin from '../mixins/settings.js'
import Preview from './FloorPreview.vue'
import FloorSelector from '@/components/floor/Selector'
import WidgetSelectDevices from '@/components/widgets/partials/SelectDevices'
export default {
  name: 'FloorLiveWidgetSettings',
  components: { WidgetSelectDevices, Preview, FloorSelector },
  mixins: [WidgetSettingsMixin],
  props: {
    value: {
      type: [Object, Boolean],
      default: null,
      required: false
    }
  },
  data () {
    return {
      showDeviceSelector: false
    }
  },
  mounted () {
    this.showDeviceSelector = true
  },
  methods: {
    onZoomChanged (event) {
      this.settings.defaultZoom = event
    },
    onCenterChanged (event) {
      this.settings.defaultCenter = event
    },
    selectIndicatorType (indicatorType) {
      this.settings.widgetIndicator = indicatorType
    }
  }
}
</script>
