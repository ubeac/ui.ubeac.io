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
            <b-form-group
              :label="$t('dashboard.map.roads')"
              horizontal>
              <b-form-input
                v-model="settings.roadsDensity"
                style="max-width: 150px;"
                type="range"
                step="1"
                min="0"
                max="3"
                class="custom-range" />
            </b-form-group>
            <b-form-group
              :label="$t('dashboard.map.landmarks')"
              horizontal>
              <b-form-input
                v-model="settings.landmarksDensity"
                style="max-width: 150px;"
                type="range"
                step="1"
                min="0"
                max="3"
                class="custom-range" />
            </b-form-group>
            <b-form-group
              :label="$t('dashboard.map.labels')"
              horizontal>
              <b-form-input
                v-model="settings.labelsDensity"
                style="max-width: 150px;"
                type="range"
                step="1"
                min="0"
                max="3"
                class="custom-range" />
            </b-form-group>
          </b-form>
        </b-tab>
        <b-tab
          :title="$t('dashboard.settings_tab.devices')" >
          <WidgetSelectDevices
            v-if="showDeviceSelector"
            :empty-list-message="$t('messages.empty_map_device_selector')"
            :show-map-options="true"
            :sensor-value-type="true"
            :series="sanitizedFilterList"
            class="dashboard-widget--map"
            filter-sensors="map"
            @updateSeries="updateFilter($event);" />
          <Loading v-else />
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
        @onMapTypeChanged="onMapTypeChanged"
        @onZoomChanged="onZoomChanged"
        @onCenterChanged="onCenterChanged"/>
    </template>
  </ModalSettings>
</template>
<script>
import WidgetSettingsMixin from '../mixins/settings.js'
import Preview from './MapPreview.vue'
import BuildingSelector from '@/components/building/Selector'
import WidgetSelectDevices from '@/components/widgets/partials/SelectDevices'
export default {
  name: 'MapLiveWidgetSettings',
  components: { BuildingSelector, Preview, WidgetSelectDevices },
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
  computed: {
    sanitizedFilterList () {
      // Handle old map widgets
      let out = this.settings.sensorFilter
      if (out === null) {
        this.$set(this.settings, 'sensorFilter', [])
      }
      return this.settings.sensorFilter
    },
    dominantValue () {
      let out = ''
      return out
    }
  },
  mounted () {
    this.showDeviceSelector = true
  },
  methods: {
    onZoomChanged (event) {
      this.settings.defaultZoom = event
    },
    onMapTypeChanged (event) {
      this.settings.mapTypeId = event
    },
    onCenterChanged (event) {
      this.settings.defaultCenter = {
        lat: event.lat(),
        lng: event.lng()
      }
    },
    selectIndicatorType (indicatorType) {
      this.settings.widgetIndicator = indicatorType
    }
  }
}
</script>
