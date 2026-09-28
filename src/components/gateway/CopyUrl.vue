<template>
  <ComponentContainer>
    <div class="component-gateway-copy-url">
      <b-modal
        ref="qrCodeModal"
        :title="title"
        centered
        ok-only
        hide-footer>
        <div class="d-block text-center">
          <qrcode
            v-b-tooltip.hover
            v-if="gatewayUrl"
            :title="$t('manage.copy_qr')"
            :value="gatewayUrl"
            :options="{ size: 200 }"
            class="m-auto"/>
          <b-input-group class="w-100 mt-3">
            <span
              v-show="urlSpan1Visible"
              ref="urlSpan1"
              class="component-gateway-copy-url--url-area form-control text-truncate text-left no-border mr-3"
              @click="selectUrlInput1">
              {{ gatewayUrl }}
            </span>
            <b-form-input
              v-show="!urlSpan1Visible"
              ref="urlInput1"
              :value="gatewayUrl"
              class="component-gateway-copy-url--url-area text-left no-border mr-3"
              readonly/>
            <b-input-group-addon>
              <b-btn
                v-b-tooltip.hover
                :title="$t('manage.copy_url')"
                variant="outline-success"
                class="clipboard-btn-inside-modal btn-fab-no-bg"
                @click="copyToClipBoard">
                <icon :name="copyIcon"/>
                <!-- <i
                  :class="'fa-'+copyIcon"
                  class="fa"/> -->
              </b-btn>
            </b-input-group-addon>
          </b-input-group>
        </div>
      </b-modal>
      <template v-if="mobileView || onlyQr">
        <b-btn
          v-b-tooltip.hover
          v-if="mobileView"
          :title="$t('manage.copy_url')"
          variant="light"
          class="btn-qr-code no-border btn-outline-success btn-fab-no-bg"
          @click="showQrCodeModal">
          <icon name="link"/>
        </b-btn>
        <b-btn
          v-b-tooltip.hover
          v-if="onlyQr"
          :title="$t('manage.copy_url')"
          variant="light"
          class="btn-qr-code"
          @click="showQrCodeModal">
          <icon name="link"/>
        </b-btn>
      </template>
      <b-input-group
        v-else
        class="w-100">
        <span
          v-show="urlSpan2Visible"
          ref="urlSpan2"
          class="component-gateway-copy-url--url-area form-control text-truncate"
          @click="selectUrlInput2">
          {{ gatewayUrl }}
        </span>
        <b-form-input
          v-show="!urlSpan2Visible"
          ref="urlInput2"
          :value="gatewayUrl"
          readonly/>
        <b-input-group-addon class="component-gateway-copy-url--addon">
          <b-btn
            v-b-tooltip.hover
            :title="$t('manage.copy_url')"
            variant="outline-success"
            class="clipboard-btn btn-fab-no-bg mr-0"
            @click="copyToClipBoard">
            <icon :name="copyIcon"/>
            <!-- <i
              :class="'fa-'+copyIcon"
              class="fa"/> -->
          </b-btn>

          <b-btn
            v-b-tooltip.hover
            v-if="qrCode"
            :title="$t('manage.copy_qr')"
            variant="outline-success"
            class="btn-fab-no-bg mr-0"
            @click="showQrCodeModal">
            <icon name="qrcode"/>
          </b-btn>

          <!-- TODO: writhe @click method for help -->
          <b-btn
            v-b-tooltip.hover
            v-if="infoLink"
            :title="$t('general.help')"
            :href="this.$config.docs.gateway"
            target="_blank"
            variant="outline-success"
            class="btn-fab-no-bg mr-0">
            <icon name="help-wheel"/>
          </b-btn>
        </b-input-group-addon>
      </b-input-group>
    </div>
  </ComponentContainer>
</template>

<script>
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewayUrlCopy',
  mixins: [ EntitiesMixin ],
  props: {
    infoLink: {
      type: [Boolean, String],
      default: true,
      required: false
    },
    title: {
      type: String,
      default: 'general.qr_code',
      required: false
    },
    onlyQr: {
      type: [Boolean, String],
      default: null,
      required: false
    },
    mobileView: {
      type: [Boolean, String],
      default: null,
      required: false
    },
    url: {
      type: [String, Boolean],
      default: null,
      required: true
    },
    gatewayUrlDefault: {
      type: Boolean,
      default: true,
      required: false
    },
    qrCode: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      timer: null,
      urlSpan1Visible: true,
      urlSpan2Visible: true,
      copyIcon: 'copy',
      showHappyClipboardTimeout: 3000
    }
  },
  computed: {
    gatewayUrl () {
      if (this.url && this.url) {
        // TODO: must move to config
        if (this.gatewayUrlDefault) {
          return `${this.teamList[0].namespace}.${this.Config.gatewayUrlFirstPart}${this.url}`
        } else {
          return `${this.url}`
        }
      } else {
        return ``
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    showQrCodeModal () {
      this.$refs.qrCodeModal.show()
    },
    selectUrlInput1 () {
      this.urlSpan1Visible = false
      this.copyToClipBoard()
    },
    selectUrlInput2 () {
      this.urlSpan2Visible = false
      this.copyToClipBoard()
    },
    copyToClipBoard () {
      this.urlSpan1Visible = false
      this.urlSpan2Visible = false
      clipboard.writeText(this.gatewayUrl).then(() => {
        this.copyIcon = 'check'
        if (this.$refs.urlInput1 && this.$refs.urlInput1.$el) {
          this.$refs.urlInput1.$el.select()
        }
        if (this.$refs.urlInput2 && this.$refs.urlInput2.$el) {
          this.$refs.urlInput2.$el.select()
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.copyIcon = 'copy'
          this.urlSpan1Visible = true
          this.urlSpan2Visible = true
        }, this.showHappyClipboardTimeout)
      })
    }
  }
}
</script>
