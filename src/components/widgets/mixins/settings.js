import validation from '@/decorators/validation'
import EntitiesMixin from '@/mixin/entities'
import ModalSettings from '@/components/widgets/partials/ModalSettings'
import WidgetsComponents from '@/components/widgets/index'
import WidgetSelectDevice from '@/components/widgets/partials/SelectDevice'
import WidgetSelectSeries from '@/components/widgets/partials/SelectSeries'
export default {
  mixins: [EntitiesMixin],
  components: { ...WidgetsComponents, ModalSettings, WidgetSelectDevice, WidgetSelectSeries },
  props: {
    previewWidth: {
      default: false,
      required: false
    },
    visibility: {
      type: Boolean,
      default: false,
      required: false 
    }
  },
  data () {
    return { widgetData: null, settings: null
    }
  },
  mounted () {
    this.widgetData = this._.cloneDeep(this.value)
    this.widget = this.widgetData.widget
    this.settings = this.widget.settings
  },
  watch:{
    widget: {
      deep: true,
      handler () {
        this.$emit('updateWidgetData', this.widget)
      }
    },
    settings: {
      deep: true,
      handler () {
        this.$emit('updateWidgetData', this.widget)
      }
    }
  },
  methods: {
      @validation
    ok (e) {
      this.$emit('updateWidgetData', this.widget)
      this.$emit('ok', e)
    },
    show (e) {
      this.$emit('show', e)
    },
    hide (e) {
      this.$emit('hide', e)
    },
    cancelSettingsModal (e) {
      this.$emit('cancelSettingsModal', e)
    },
    updateFilter (filter) {
      this.settings.sensorFilter = filter
    }
  }
}
