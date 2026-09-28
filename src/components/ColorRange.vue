<template>
  <b-form-group
    :label="$t('color_range')"
    class="lined componenet-color-range"
    style="direction: ltr;">
    <div
      v-for="(item, index) in range"
      :key="item.id"
      class="componenet-color-range--item">
      <b-button
        v-if="index !== 0"
        class="btn-fab btn-add-range"
        variant="success"
        @click="addToRange(index)">
        +
      </b-button>
      <div
        v-if="index !== 0"
        :style="{'background-color': item.color}"
        class="componenet-color-range--color-indicator"/>
      <b-input-group>
        <b-input-group-append>
          <Swatches
            v-if="index === 0"
            :colors="swatchesColors"
            :disabled="true"
            v-model="staticFirstValue"
            class="swatches-circle" />
          <Swatches
            v-else
            :colors="swatchesColors"
            :key="item.id"
            v-model="range[index].color"
            class="swatches-circle" />
        </b-input-group-append>
        <b-form-input
          :class="{ 'componenet-color-range--first-range': index === 0 && index+1 !== range.length ,
                    'deleteable' : index !== 0 && index+1 !== range.length}"
          v-model="item.value" />

        <b-input-group-prepend>
          <b-button
            v-if="index !== 0 && index+1 !== range.length"
            variant="outline-danger"
            class="btn-remove-range"
            @click="removeFromRange(index)">
            <icon name="close" />
          </b-button>
        </b-input-group-prepend>
      </b-input-group>
    </div>
  </b-form-group>
</template>
<script>
import Swatches from '@/components/Swatches'
export default {
  components: { Swatches },
  props: {
    value: {
      default: null,
      required: false,
      type: [Array, Boolean, String]
    }
  },
  data () {
    return {
      colorList: [
        '#65BF7C',
        '#2B6D5F',
        '#0084D6',
        '#F5A623',
        '#9D6BCA',
        '#CD6A2B',
        '#C02F6B'
      ],
      swatchesColors: [
        '#9B3A3A', '#A34C4C', '#C36666', '#DB8F8F',
        '#E04343', '#DD5555', '#DA7D7D', '#E09D9D',
        '#CD6A2B', '#CF7D48', '#CB906A', '#DEA37C',
        '#F5A623', '#EFB85D', '#EEC178', '#F2D5A4',
        '#65BF7C', '#7BC08C', '#97BFA1', '#ACD2B5',
        '#2B6D5F', '#517A71', '#6F8681', '#85A39C',
        '#9D6BCA', '#AC89CA', '#B59EC9', '#CDBADD',
        '#C02F6B', '#C05D86', '#C27293', '#D899B3',
        '#0084D6', '#5EA5D1', '#83B2CF', '#B0D2E8',
        '#6C7B96', '#858FA1', '#9AA4B5', '#ACBAD5',
        '#ffffff', '#EADFDF', '#D5C9C9', '#A79A9A',
        '#000000', '#090909', '#1D1D1D', '#3D3D3D'
      ],
      staticFirstValue: '#cccccc',
      range: [
        {
          value: 100,
          id: 'max'
        },
        {
          value: 0,
          color: '#65BF7C',
          id: 'min'
        }
      ]
    }
  },
  watch: {
    value: {
      deep: true,
      handler () {
        if (this.value) {
          this.range = JSON.parse(this.value)
        }
      }
    },
    range: {
      deep: true,
      handler () {
        this.$emit('input', JSON.stringify(this.range))
      }
    }
  },
  created () {
    if (this.value) {
      this.range = JSON.parse(this.value)
    }
  },
  methods: {
    average (index) {
      let out = 0
      if (index + 1 === this.range.length) {
        out = (parseFloat(this.range[index].value) + parseFloat(this.range[index - 1].value)) / 2
      } else if (index === 0) {
        out = (parseFloat(this.range[index + 1].value) + parseFloat(this.range[index].value)) / 2
      } else {
        out = (parseFloat(this.range[index].value) + parseFloat(this.range[index - 1].value)) / 2
      }
      return out
    },
    getNextColor (index) {
      let out = this.colorList[0]
      if (this.range.length <= this.colorList.length) {
        out = this.colorList[this.range.length - index]
      } else if (this.range.length % this.colorList.length >= 0) {
        out = this.colorList[this.colorList.length - (this.range.length % this.colorList.length)]
      }
      if (!out) {
        out = this.colorList[0]
      }
      return out
    },
    addToRange (index) {
      let item = {
        id: Math.random() * 100,
        value: this.average(index),
        color: this.getNextColor(index)
      }
      this.range.splice(index, 0, item)
    },
    removeFromRange (index) {
      this.range.splice(index, 1)
    }
  }
}
</script>
