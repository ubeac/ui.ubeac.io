<template>
  <ComponentContainer class="component-gateway-security">
    <b-card
      no-body
      class="card-border no-shadow mx-3 p-0 w-auto mb-3">
      <b-alert
        :class="{'box-loading': loadingSecurityData}"
        class="p-3 mt-0 mb-0 no-radius w-100 d-block float-left component-gateway-security--text"
        variant="success"
        show>
        <b-row>
          <b-col
            cols="12"
            class="mb-2">
            <span>
              {{ $t('general.mqtt_tcp') }}
            </span>
          </b-col>
        </b-row>
        <b-row>
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io`"
            :class="{'mqtt-security': !browser.isMobile}"
            class="pl-2 mb-2 pr-2 component-gateway-security--url entity-details-url"/>
          <p class="mt-2">
            {{ $t('general.port') }} : 1883
          </p>
        </b-row>
        <b-row>
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io`"
            :class="{'mqtt-security': !browser.isMobile}"
            class="pl-2 mb-2 pr-2 component-gateway-security--url entity-details-url"/>
          <p class="mt-2">
            {{ $t('general.port') }} : 8883
          </p>
        </b-row>
        <b-row class="mt-3">
          <b-col
            cols="12"
            class="mb-2">
            <span>
              {{ $t('general.mqtt_ws') }}
            </span>
          </b-col>
        </b-row>
        <b-row>
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io/mqtt`"
            :class="{'mqtt-security': !browser.isMobile}"
            class="pl-2 mb-2 pr-2 component-gateway-security--url entity-details-url"/>
          <p class="mt-2">
            {{ $t('general.port') }} : 80
          </p>
        </b-row>
        <b-row>
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io/mqtt`"
            :class="{'mqtt-security': !browser.isMobile}"
            class="pl-2 mb-2 pr-2 component-gateway-security--url entity-details-url"/>
          <p class="mt-2">
            {{ $t('general.port') }} : 443
          </p>
        </b-row>
        <b-row class="mt-3">
          <b-col
            class="mb-2 component-gateway-security--text"
            cols="12">
            <span>
              {{ $t('general.gateway_client_id') }}
            </span>
          </b-col>
          <GatewayCopyUrl
            v-if="gatewayItem"
            :uid="true"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :qr-code="false"
            :url="gatewayId"
            :class="{'mqtt-security': !browser.isMobile}"
            class="pl-2 mb-0 component-gateway-security--url entity-details-url"/>
        </b-row>
        <b-row class="mt-3">
          <b-col
            class="mb-2 component-gateway-security--text"
            cols="12">
            <span>
              {{ $t('general.gateway_publish_topic') }}
            </span>
          </b-col>
          <GatewayCopyUrl
            v-if="gatewayItem"
            :uid="true"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :qr-code="false"
            :url="gatewayItem.url"
            :class="{'mqtt-security': !browser.isMobile}"
            class="pl-2 mb-0 component-gateway-security--url entity-details-url"/>
        </b-row>
      </b-alert>
    </b-card>
    <b-card
      no-body
      class="card-border no-shadow mx-3 p-0 pt-3 w-auto">
      <h4 class="lined-header text-dark pb-2 w-100 float-left d-block">
        {{ $t('general.mqtt') }}
      </h4>
      <b-form
        inline
        class="needs-validation w-100 d-block float-left"
        novalidate>

        <b-form-group
          :label="$t('mqtt.enabled')">
          <toggle-button
            :speed="100"
            :sync="true"
            :labels="false"
            v-model="securityModel.mqtt.enabled"
            :value="true"
            :unchecked-value="false"/>
        </b-form-group>
        <b-form-group
          :label="$t('general.tls')">
          <toggle-button
            :speed="100"
            :sync="true"
            :labels="false"
            v-model="securityModel.mqtt.tls"
            :disabled="!securityModel.mqtt.enabled"
            :value="true"
            :unchecked-value="false"
            class="mr-3 pt-3 float-left"/>
          <small class="alert d-inline-block mt-3">
            {{ $t('general.mqtt_help_1') }}<br>
            {{ $t('general.mqtt_help_2') }}<br>
            {{ $t('general.mqtt_help_3') }}<br>
            {{ $t('general.mqtt_help_4') }}
          </small>
        </b-form-group>
        <b-form-group
          :label="$t('auth.username')">
          <b-form-input
            :disabled="!securityModel.mqtt.enabled"
            v-model="securityModel.mqtt.username"
            :placeholder="$t('general.username_placeholder')"
            type="text"
            name="name"/>
          <b-form-invalid-feedback v-if="errors.has('name')">
            <span
              v-for="(error, index) in errors.collect('name')"
              :key="index">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group :label="$t('auth.password')">
          <b-form-input
            :disabled="!securityModel.mqtt.enabled"
            v-model="securityModel.mqtt.password"
            :placeholder="$t('general.password_placeholder')"
            type="text"
            name="pass"/>
          <b-form-invalid-feedback v-if="errors.has('pass')">
            <span
              v-for="(error, index) in errors.collect('pass')"
              :key="index">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
    </b-card>
  </ComponentContainer>
</template>

<script>
import EntityUpdateMixin from '@/mixin/entityUpdate'
import GatewayCopyUrl from './CopyUrl'

export default {
  name: 'GatewaySecurityMqtt',
  components: { GatewayCopyUrl },
  mixins: [EntityUpdateMixin],
  props: {
    securityModel: {
      type: [Object, Boolean],
      default: null,
      required: true
    }
  },
  data () {
    return {
      btnLoading: false,
      ipRestrictionAddItem: {
        key: '',
        value: ''
      },
      headerAddItem: {
        key: '',
        value: ''
      },
      loadingSecurityData: true,
      underUpdateItem: {},
      updateItemCached: {},
      underRemoveItem: null,
      selectedBuilding: null,
      selectedManufacturer: null,
      selectedProduct: null,
      buildings: null
    }
  },
  computed: {
    gatewayItem () {
      let out = this.gatewayById(this.id)
      return out
    },
    gatewayUrl () {
      return `${this.teamList[0].namespace}.${this.Config.gatewayUrlFirstPart}${this.url}`
    },
    gatewayId () {
      return this.gatewayItem.id
    }
  },
  watch: {
    securityModel: {
      deep: true,
      handler () {
        this.$emit('startUpdate')
        this.$emit('updateSecurityModel', this.securityModel)
      }
    }
  },
  methods: {
    removeFromDict (dict, key) {
      this.$root.$emit('bv::hide::tooltip')
      delete dict[key]
      this.$forceUpdate()
    },
    addToDict (dict, newObj) {
      this.$root.$emit('bv::hide::tooltip')
      if (newObj.key) {
        dict[newObj.key] = newObj.value
        newObj.key = ''
        newObj.value = ''
        this.$forceUpdate()
      }
    }
  }
}
</script>
