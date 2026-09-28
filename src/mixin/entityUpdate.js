import EntitiesMixin from '@/mixin/entities'
export default {
  mixins: [EntitiesMixin],
  computed: {
    itemNotFound () {
      let out = false
      if (typeof (this.$store.getters[`${this.entityType}/byId`](this.id)) !== 'object') {
        out = true
      }
      return out
    }
  },
  props: {
    id: {
      type: String,
      default: null,
      required: true
    }
  },
  methods: {
    success () {
      this.$emit('success')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
