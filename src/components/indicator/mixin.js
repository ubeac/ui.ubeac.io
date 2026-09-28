export default {
  props: {
    value: {
      default: null
    },
    min: {
      default: 0
    },
    max: {
      default: 100
    },
    range: {
      default () { return [] }
    },
    lastUpdate: {
      default: ''
    }
  },
  computed: {
    indicatorLevelColor () {
      return null
    },
    _range () {
      let out = this.range
      if (!out || out.length === 0) {
        out = [{ value: 100, color: '#E04343', id: 'max' }, { value: 0, color: '#65BF7C', id: 'min' }]
      }
      return out
    },
    // TODO: performance check please
    indicatorMin () {
      let out = this.min
      if (!isNaN(parseFloat(out)) && isFinite(out)) {
        out = parseFloat(out)
      } else {
        out = 0
      }
      return out
    },
    indicatorMax () {
      let out = this.max
      if (!isNaN(parseFloat(out)) && isFinite(out)) {
        out = parseFloat(out)
      } else {
        out = 100
      }
      return out
    },
    indicatorValue () {
      let out = this.value
      if (!isNaN(parseFloat(out)) && isFinite(out)) {
        out = parseFloat(out)
      } else {
        out = 0
      }
      return out
    },
    currentColor () {
      let out = null
      if (this._range.length > 2) {
        this._.each(this._range, (item, index) => {
          if (index > 0) {
            let prevItemValue = parseFloat(this._range[index - 1].value)
            let currentValue = parseFloat(item.value)
            if (this.indicatorValue < prevItemValue & this.indicatorValue >= currentValue) {
              out = item.color
            }
          }
        })
        if (out === null) {
          if (this.indicatorValue >= parseFloat(this._range[0].value)) {
            out = this._range[1].color
          }
        }
      } else if (this._range.length > 0) {
        out = this._range[1].color
      }
      return out
    },
    twoStateSwitch () {
      let out = false
      // Return True for value equal to range min or bigger than range min number
      //  Otherwise return false
      if (this._range && this._range[0]) {
        if (this.indicatorValue >= parseFloat(this._range[0].value)) {
          out = true
        }
      } else if (this.indicatorValue > 0) {
        out = true
      } else if ([true, 'true', 'True', 'on', 'ON'].includes(this.indicatorValue)) {
        out = true
      }
      return out
    },
    percent () {
      let out = ((this.indicatorValue - this.indicatorMin) / (this.indicatorMax - this.indicatorMin)) * 100
      return out
    }
  }
}
