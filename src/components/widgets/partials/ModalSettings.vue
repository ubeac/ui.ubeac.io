<template>
  <ComponentContainer>
    <b-modal
      ref="ModalWidgetSetting"
      v-model="modalVisibility"
      :visibile="value"
      :no-close-on-backdrop="true"
      :no-fade="true"
      modal-class="d-none d-lg-block dashboard-widget-modal"
      ok-variant="success"
      hide-header-close
      hide-header
      hide-backdrop
      cancel-variant="secandry"
      @show="show"
      @hide="hide"
      @ok="ok">
      <div
        slot="modal-footer"
        class="w-100">
        <b-button
          variant="success"
          class="mr-2"
          @click="ok">
          {{ $t("buttons.submit") }}
        </b-button>
        <b-button
          variant="secandry"
          @click="cancelSettingsModal">
          {{ $t("buttons.cancel") }}
        </b-button>
        <slot name="buttons"/>
      </div>
      <div class="dashboard-widget-modal--row-fixture">
        <b-row class="row-eq-height m-0 dashboard-widget-modal--main-row justify-content-center">
          <b-col
            ref="settingsArea"
            class="py-4 px-0 mr-0 d-block dashboard-widget-modal--settings-area"
            cols="12">
            <slot name="settings"/>
          </b-col>
          <!--<b-col-->
          <!--class="pr-4 pl-4 pb-4 pt-4 dashboard-widget-modal--preview-area"-->
          <!--xl="7"-->
          <!--lg="7"-->
          <!--md="6"-->
          <!--cols="6">-->
          <!--<div-->
          <!--:style="{width: previewAreaWidth }"-->
          <!--class="dashboard-widget-modal--preview-box">-->
          <!--<h3 class="pl-0 ml-0">-->
          <!--{{ $t('buttons.preview') }}-->
          <!--</h3>-->
          <!--<b-row-->
          <!--class="p-0 m-0 w-100 d-block" >-->
          <!--<b-col-->
          <!--class="p-0 m-0 w-100"-->
          <!--cols="12">-->
          <!--<slot name="preview"/>-->
          <!--</b-col>-->
          <!--</b-row>-->
          <!--</div>-->
          <!--</b-col>-->
        </b-row>
      </div>
    </b-modal>
  </ComponentContainer>
</template>
<script>
export default {
  name: 'WidgetModalSettings',
  props: {
    value: {
      required: false,
      default: false,
      type: [Boolean]
    }
  },
  data () {
    return {
      setPreviewWidthTimeout: null,
      previewAreaWidth: null
    }
  },
  computed: {
    modalVisibility: {
      get () {
        return this.value
      },
      set (value) {
      }
    }
  },
  mounted () {
    // TODO: need better approach
    this.setPreviewWidth()
    window.addEventListener('resize', this.setPreviewWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setPreviewWidth)
  },
  methods: {
    setPreviewWidth () {
      clearTimeout(this.setPreviewWidthTimeout)
      this.setPreviewWidthTimeout = setTimeout(() => {
        if (this.$refs.settingsArea) {
          let settingAreaWidth = this.$refs.settingsArea.offsetWidth
          let sidebarWidth = 240
          if (document.getElementsByClassName('sidebar-minimized').length > 0) {
            sidebarWidth = 95
          } else if (document.body.clientWidth < 1280) {
            sidebarWidth = 48
          }
          this.previewAreaWidth = `calc(100% - ${settingAreaWidth + sidebarWidth}px) !important`
        }
      }, 500)
    },
    cancelSettingsModal () {
      this.$emit('cancelSettingsModal')
    },
    show () {
      this.$emit('show')
    },
    hide () {
      this.$emit('hide')
    },
    ok () {
      this.$emit('ok')
    }
  }
}
</script>
