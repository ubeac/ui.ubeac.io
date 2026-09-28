import Utils from '@/helpers/utils'
export let sizerate = 0.8
export default {
  props: {
    color: {
      type: [Boolean, String],
      required: false,
      default: 'red'
    },
    icon: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    size: {
      type: [Boolean, String, Number],
      required: false,
      default: 1
    }
  },
  computed: {
    sanitizedSize () {
      return 2 + (this.size * sizerate)
    },
    strokeWidth () {
      return 1
    },
    primaryColor () {
      return Utils.hexToRgbA(this.color, 0.6)
    },
    darkerColor () {
      return Utils.hexToRgbA(Utils.pSBC(-0.9, this.color), 0.9)
    }
  }
}
