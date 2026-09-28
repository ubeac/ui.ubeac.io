import EntitiesMixin from '@/mixin/entities'
export default {
  mixins: [EntitiesMixin],
  data () {
    return {
      updatePreviewFirstTimeDelayTimer: null,
      reloadTimeDelayTimer: null,
      firstSetup: true,
      lastUpdateTime: null,
      settings: null
    }
  },
  props: {
    isResizing: {
      required: false,
      default: null
    },
    paused: {
      default: false,
      required: false
    },
    widgetData: {
      type: [Object, Boolean],
      default: null,
      required: false
    }
  },
  beforeDestroy () {
    clearTimeout(this.updatePreviewFirstTimeDelayTimer)
    clearTimeout(this.reloadTimeDelayTimer)
  },
  methods: {
    reload3rdParties () {}
  },
  watch: {
    settings: {
      deep: true,
      handler (newVal, oldVal) {
        clearTimeout(this.updatePreviewFirstTimeDelayTimer)
        this.updatePreviewFirstTimeDelayTimer = setTimeout(() => {
          if (this.firstSetup) {
            this.startDataLoading()
            if (this.startLoadingHistorical) {
              this.startLoadingHistorical()
            }
          }
          if (newVal && oldVal) {
            if (JSON.stringify(newVal.sensorFilter) !== JSON.stringify(oldVal.sensorFilter)) {
              if (this.startLoadingHistorical) {
                this.reloadLoadingHistorical()
              }
              clearTimeout(this.reloadTimeDelayTimer)
              this.reloadTimeDelayTimer = setTimeout(() => {
                this.reloadData()
              }, 1500)
            }
            if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
              this.reload3rdParties()
            }
          } else if (oldVal === null) {
            if (this.startLoadingHistorical) {
              this.reloadLoadingHistorical()
            }
            clearTimeout(this.reloadTimeDelayTimer)
            this.reloadTimeDelayTimer = setTimeout(() => {
              this.reloadData()
            }, 1500)
          }
        }, 0)
      }
    },
    widgetData: {
      deep: true,
      handler () {
        if (this.widgetData) {
          this.settings = this._.cloneDeep(this.widgetData.widget.settings)
        }
      }
    }
  },
  mounted () {
    if (this.widgetData) {
      this.settings = this._.cloneDeep(this.widgetData.widget.settings)
    }
  }
}
