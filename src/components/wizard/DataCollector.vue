<template>
  <b-card
    v-if="url"
    no-body
    class="component-data-collector card-border no-shadow">
    <b-card-body
      class="pr-0 pl-0 py-0 pl-sm-3 py-sm-3">
      <qrcode
        v-b-tooltip.hover
        :title="$t('manage.copy_qr')"
        :value="address"
        :options="{ width: 200, color: { dark: $config.brandColors.primary }, margin: 0 }"
        class="mx-auto float-left order-1 pr-0 pr-sm-3 my-3 my-sm-0"/>
      <div class="info-area p-3 p-sm-0 order-2">
        <GatewayCopyUrl
          :qr-code="false"
          :info-link="false"
          :gateway-url-default="false"
          :url="address"
          :class="{'http-security': !browser.isMobile}"
          class="float-left w-100 mt-0 mb-0"/>
        <HelpCard
          :url="Config.docs.gateway"
          :text="$t('help_cards.gateway')"
          class="mb-0 mt-2 mt-sm-0 pt-3 pt-sm-0 pb-0"/>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import GatewayCopyUrl from '@/components/gateway/CopyUrl'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'WizardDataCollector',
  components: { GatewayCopyUrl },
  mixins: [ EntitiesMixin ],
  props: {
    url: {
      type: [Boolean, String],
      default: false,
      required: true
    }
  },
  computed: {
    address () {
      // return `${this.$config.websensorAddress}${this.teamList[0].namespace}/${this.url}`
      return `${this.$config.websensorAddress}?project=${this.teamList[0].namespace}&gateway=${this.url}`
      // return `${this.$config.gatewayUrlProtocol}${this.teamList[0].namespace}.${this.$config.gatewayUrlFirstPart}${this.url}`
    }
  }
}
</script>
