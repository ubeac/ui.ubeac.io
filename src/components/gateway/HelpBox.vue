<template>
  <div
    v-if="selectedFirmware && selectedProduct && selectedManufacturer"
    class="lined pb-0 componetnt-manufacturer-selected"
    no-body>
    <label>
      {{ $t("general.firmwareId") }}
    </label>
    <p>
      <a
        v-if="selectedManufacturer"
        :href="selectedManufacturer.website"
        class="manufacturer-logo-image-link float-left pr-0 mb-0 mt-3 ml-0 mr-3"
        target="_blank">

        <img
          v-b-tooltip.hover
          :title="selectedManufacturer.name"
          :src="getImageUrl(selectedManufacturer.logo)"
          width="120"
          alt="">
      </a>
      <a
        v-if="selectedManufacturer"
        :href="selectedManufacturer.website"
        target="_blank"
        class="float-left clearfix text-dark mt-3">
        {{ selectedManufacturer.name }}
        {{ selectedManufacturer.url }}
        /
        {{ selectedProduct.name }}
      </a>
      <br>
      <a
        v-if="selectedManufacturer.description"
        class="manufacturer-link mb-2 text-muted">
        {{ selectedManufacturer.description | truncate(40) }}
      </a>
      <span class="manufacturer-link">
        <a
          v-if="selectedManufacturer"
          :href="selectedManufacturer.website"
          target="_blank">
          <b-button
            v-b-tooltip.hover
            :title="$t('manage.website')"
            class="no-radius p-3 mb-2 mr-2"
            variant="secondary"
            size="sm">
            <span>
              {{ $t("manage.website") }}
            </span>
          </b-button>
        </a>
        <b-button
          v-b-tooltip.hover
          v-if="selectedProduct && selectedProduct.technicalSpecFile !== '00000000-0000-0000-0000-000000000000'"
          :href="getFileUrl(selectedProduct.technicalSpecFile)"
          :title="$t('manage.document')"
          class="no-radius p-3 mb-2 mr-2"
          download
          variant="secondary"
          size="sm">
          <span>
            {{ $t("manage.document") }}
          </span>
        </b-button>
        <b-button
          v-b-tooltip.hover
          v-if="selectedProduct && selectedProduct.manualFile !== '00000000-0000-0000-0000-000000000000'"
          :href="getFileUrl(selectedProduct.manualFile)"
          :title="$t('manage.download_manual')"
          class="no-radius p-3 mb-2 mr-2"
          download
          variant="secondary"
          size="sm">
          <span>
            {{ $t("manage.download_manual") }}
          </span>
        </b-button>
        <b-button
          v-b-tooltip.hover
          v-if="selectedFirmware && firmwareById(selectedFirmware).technicalSpecFile !== '00000000-0000-0000-0000-000000000000'"
          :href="getFileUrl(selectedFirmware.technicalSpecFile)"
          :title="$t('manage.download_gateway_firmware_tech_spec')"
          class="no-radius p-3 mb-2 mr-2"
          download
          variant="secondary"
          size="sm">
          <span>
            {{ $t("manage.download_spec_file") }}
          </span>
        </b-button>
      </span>
    </p>
  </div>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewayHelpBox',
  mixins: [EntitiesMixin],
  props: {
    firmwareId: {
      type: [String, Boolean],
      default: false,
      required: false
    }
  },
  computed: {
    selectedFirmware () {
      let out = this.firmwareId
      return out
    },
    selectedManufacturer () {
      return this.manufacturerByFirmware(this.firmwareId)
    },
    selectedProduct () {
      return this.productByFirmware(this.firmwareId)
    },
    gatewayItem () {
      return this.gatewayById(this.id)
    }
  }
}
</script>
