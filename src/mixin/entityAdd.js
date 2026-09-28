import EntitiesMixin from '@/mixin/entities'
export default {
  mixins: [EntitiesMixin],
  methods: {
    success (e) {
      this.$emit('success', e)
    },
    cancel (e) {
      this.$emit('cancel', e)
    }
  }
}
