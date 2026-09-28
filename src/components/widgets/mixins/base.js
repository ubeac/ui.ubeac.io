import WidgetsComponents from '@/components/widgets/index'
import WidgetModalRemove from '@/components/widgets/partials/ModalRemove'
import WidgetToolbox from '@/components/widgets/partials/Toolbox'
import Widgetloading from '@/components/widgets/partials/Loading'
import WidegtNeedCompletionMode from '@/components/widgets/partials/NeedCompletion'
export default {
  components: { WidegtNeedCompletionMode, Widgetloading, WidgetToolbox, ...WidgetsComponents, WidgetModalRemove },
  created () {
    this.normalizeData()
  },
  beforeDestroy () {
  },
  props: {
    isResizing: {
      required: false,
      default: null
    },
    paused: {
      required: false,
      default: true
    },
    skeletonMode: {
      required: false,
      default: true
    },
    editMode: {
      required: false,
      default: false
    },
    data: {
      required: false
    },
    widgetType: {
      required: false,
      default: false
    }
  },
  watch: {
    data: {
      handler () {
        this.normalizeData()
      },
      deep: true
    }
  },
  methods: {
    updateWidgetData (e) {
      if (e) {
        this.widgetData.widget = JSON.decycle(e)
      }
    },
    resetToCachedData () {
      this.normalizeData()
    },
    // Remove Modal Methods
    // -------------------------------------------------------------------------
    remove () {
      if (this.needCompletionMode) {
        this.$emit('remove', { data: this.data, refresh: false })
      } else {
        this.removeWidgetModalEnabled = true
      }
    },
    onOkRemoveModal () {
      this.$emit('remove', { data: this.data, refresh: true })
    },
    onShowRemoveModal () {
      this.$emit('selectSettingModal', this.widgetData.uid)
    },
    onHideRemoveModal () {
      this.$emit('hideSettingModal')
      this.removeWidgetModalEnabled = false
      this.removeWidgetModal = false
      this.modalIsEnabled = false
    },
    // Settings Modal Methods
    // -------------------------------------------------------------------------
    showSettingsModal () {
      this.cachedWidgetdata = this._.cloneDeep(this.widgetdata)
      this.settingsModalEnabled = true
    },
    onShowSettingsModal () {
      this.$emit('selectSettingModal', this.widgetData.uid)
    },
    onHideSettingsModal () {
      this.settingsModalEnabled = false
      this.$emit('hideSettingModal')
      this.$emit('update')
    },
    onCancelSettingsModal () {
      this.$emit('hideSettingModal')
      this.settingsModalEnabled = false
      this.resetToCachedData()
    },
    onOkSettingsModal () {
      this.settingsModalEnabled = false
      this.data.name = this.widgetData.widget.name
      this.data.description = this.widgetData.widget.description
      this.data.widget = this.widgetData.widget
      this.data.setting = this.data.widget.setting = JSON.stringify(this.widgetData.widget.settings)
      this.$emit('hideSettingModal')
    },
    // -------------------------------------------------------------------------
    normalizeData () {
      this.widgetData = this._.cloneDeep(this.data)
      this.widgetData.widget.settings = JSON.parse(this.widgetData.widget.setting)
      if (this.widgetData.widget.settings && this.widgetData.widget.settings.dataFilter) {
        this.widgetData.widget.settings.sensorFilter = this.widgetData.widget.settings.dataFilter
        // delete this.widgetData.widget.settings.dataFilter
      }
      if (this.widgetData.widget.settings === null) {
        this.widgetData.widget.settings = this._.cloneDeep(this.defaultSettings)
        this.data.setting = JSON.stringify(this.widgetData.widget.settings)
      }
      delete this.widgetData.widget.setting
      // NOTE: Handle chart resize issue
      this.$forceUpdate()
    },
    getPreviewWidth () {
      let out = null
      if (this.$refs.previewEl) {
        out = this.$refs.previewEl.$el.offsetWidth
      } else if (this.$refs.previewNeedCompletionEl) {
        out = this.$refs.previewNeedCompletionEl.$el.offsetWidth
      }
      return out
    }
  },
  data () {
    return {
      settingsModalEnabled: false,
      removeWidgetModalEnabled: false,
      needCompletionMode: false,
      loadingMode: false,
      settingsMode: false
    }
  }
}
