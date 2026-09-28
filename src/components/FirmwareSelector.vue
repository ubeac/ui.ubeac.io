<template>
  <ComponentContainer
    needvalidation
    class="compoenent-firmware-selector mr-0 pt-2 px-1 pb-0 no-bg no-shadow">
    <template
      v-if="horizontalLayout">
      <b-list-group
        :class="{'firmware-selector-horizontal': horizontalLayout}"
        class="w-100 float-left">
        <b-list-group-item
          v-for="product in filteredProductQuery"
          :key="product.id"
          :class="{
            'card-selected': isSelected(product.id),
            'no-shadow': !isSelected(product.id)
          }"
          class="w-100">
          <div class="card-selected-badge">
            <icon name="check" />
          </div>
          <a
            class="lined p-0 text-center product-selector--item">
            <b-card-img
              :src="getImageUrl(product.image)"
              class="float-left m-auto"
              alt=""/>
            <p class="ml-1 ml-sm-3 float-left text-muted card-text text-left">
              <span
                v-b-tooltip
                :title="product.name"
                class="product-item--name">
                {{ product.name }}
              </span>
              <b-button
                type="button"
                variant="outline-success"
                class="mt-0 float-right mr-0"
                @click="selectProduct(product)">
                <span class="d-none d-sm-block">
                  {{ $t("buttons.add") }}
                </span>
                <icon
                  class="d-block d-sm-none"
                  name="add"/>
              </b-button>
            </p>
          </a>
        </b-list-group-item>
      </b-list-group>
    </template>
    <template v-if="!horizontalLayout">
      <b-card
        v-for="product in filteredProductQuery"
        :key="product.id"
        :class="{
          'card-selected': isSelected(product.id),
          'no-shadow': !isSelected(product.id)
        }"
        no-body
        class="p-2 card-border mr-3 mb-4 pointer card-selectable float-left"
        @click="selectProduct(product)" >
        <div class="card-selected-badge">
          <icon name="check" />
        </div>
        <a
          class="p-0 text-center product-selector--item">
          <b-card-img
            :src="getImageUrl(product.image)"
            class="m-auto"
            alt=""/>
          <p class="card-text text-center">
            <small>
              {{ product.name }}
            </small>
          </p>
        </a>
      </b-card>
    </template>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'FloorSelector',
  mixins: [EntitiesMixin],
  props: {
    horizontalLayout: {
      type: [Boolean],
      required: false,
      default: false
    },
    value: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    variant: {
      type: [String, Boolean],
      required: false,
      default: false
    }
  },
  data () {
    return {
      selectedBuilding: null,
      buildings: null,
      floors: null,
      insertItem: {
        manufacturerId: null,
        productId: null,
        firmwareId: null
      },
      searchProduct: ''
    }
  },
  computed: {
    filteredProductQuery () {
      return this.productsList.filter(product => {
        let out = false
        if (product && product.name) {
          out = product.name.toLowerCase().includes(this.searchProduct)
        }
        return out
      })
    }
  },
  mounted () {
    const product = this.productByFirmware(this.value)
    if (product) {
      this.insertItem.productId = product.id
    }
    this.insertItem.firmwareId = this.value
    if (this.$route.query.firmwareId) {
      const product = this.productByFirmware(this.$route.query.firmwareId)
      this.selectProduct(product)
    }
  },
  methods: {
    isSelected (id) {
      let out = false
      const product = this.productByFirmware(this.value)
      if (product) {
        out = product.id === id
      }
      return out
    },
    selectProduct (e) {
      this.insertItem.productId = e.id
      this.autoSelectFirstFirmwareId()
    },
    autoSelectFirstFirmwareId () {
      if (this.productById(this.insertItem.productId)) {
        this.insertItem.firmwareId = this.productById(this.insertItem.productId).firmwares[0]
        this.select(this.insertItem.firmwareId)
      }
    },
    resetFirmware () {
      this.insertItem.productId = null
      this.insertItem.firmwareId = null
    },
    select (e) {
      this.$emit('input', e)
    }
  }
}
</script>
