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
                type="text"
                autofocus
                name="name"
                required/>
            </b-form-group>
            <b-form-group :label="$t('general.description')">
              <b-form-textarea
                v-model="widgetData.widget.description"
                :placeholder="$t('general.description_placeholder')"
                type="text"
                ame="description"
                rows="2"
                required/>
            </b-form-group>
            <div
              :style="{'position': 'relative', 'z-index': 10000000}">
              <WidgetSelectDevice
                :static-count="20"
                :data-filter="settings.sensorFilter"
                class="h-25"
                @updateFilter="updateFilter"/>
            </div>
          </b-form>
        </b-tab>
        <b-tab :title="$t('dashboard.settings_tab.advance')">
          <fullscreen
            ref="fullscreen"
            class="px-4"
            @change="fullscreenChange">
            <b-button
              variant="light"
              size="sm"
              class="m-2 widget-floor-plan--control float-right"
              @click="toggleFullscreen">
              <icon
                v-if="!isFullscreen"
                name="expand"/>
              <icon
                v-if="isFullscreen"
                name="collapse"/>
            </b-button>
            <CodeEditor
              v-if="!isFullscreen"
              v-model="settings.contentHTML"
              lang="html"
              style="height: calc(100%)"
              @input="updatePreviewData"/>
            <b-row
              v-if="isFullscreen"
              class="row-fixture overflow-hidden"
              style="height: calc(100% - 50px)">
              <b-col cols="6">
                <CodeEditor
                  v-model="settings.contentHTML"
                  lang="html"
                  style="height: calc(100%)"
                  @input="updatePreviewData"/>
              </b-col>
              <b-col cols="6">
                <div
                  v-if="widgetData"
                  :style="{'max-width': '100%', width: widgetData.w + 'px', height: widgetData.h*80 + 'px'}" >
                  <Preview
                    v-if="widgetData.widget && widgetData.widget.settings && widgetData.widget.settings.deviceFiltera !== null"
                    :widget-data="widgetData"/>
                </div>
              </b-col>
            </b-row>
          </fullscreen>
        </b-tab>
      </b-tabs>
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
import Preview from './RawPreview.vue'
import CodeEditor from '@/components/CodeEditor'
export default {
  name: 'RawLiveWidget',
  components: { Preview, CodeEditor },
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
      isFullscreen: false,
      contentHTML: '<template><!-- Start create your own widget --></template>'
    }
  },
  methods: {
    fullscreenChange (payload) {
      this.isFullscreen = payload
      window.dispatchEvent(new Event('resize'))
    },
    toggleFullscreen () {
      this.$refs['fullscreen'].toggle()
    },
    updatePreviewData () { }
  }
}
</script>
