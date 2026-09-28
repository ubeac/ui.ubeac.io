<template>
  <ComponentContainer class="component-gateway-security"> <b-card
    no-body
    class="card-border no-shadow mx-3 p-0 w-auto mb-3">
    <b-alert
      class="w-100 float-left my-0 d-block"
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
        <b-col
          cols="4"
          md="9">
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io`"
            :class="{'gateway-security-mobile': browser.isMobile}"
            class="mb-2 pr-2 component-gateway-security--url entity-details-url"/>
        </b-col>
        <b-col
          cols="8"
          md="3">
          <p class="mt-2">
            {{ $t('general.port') }} : 1883
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="4"
          md="9">
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io`"
            :class="{'gateway-security-mobile': browser.isMobile}"
            class="mb-2 pr-2 component-gateway-security--url entity-details-url"/>
        </b-col>
        <b-col
          cols="8"
          md="3">
          <p class="mt-2">
            {{ $t('general.port') }} : 8883
          </p>
        </b-col>
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
        <b-col
          cols="4"
          md="9">
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io/mqtt`"
            :class="{'gateway-security-mobile': browser.isMobile}"
            class="mb-2 pr-2 component-gateway-security--url entity-details-url"/>
        </b-col>
        <b-col
          cols="8"
          md="3">
          <p class="mt-2">
            {{ $t('general.port') }} : 80
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="4"
          md="9">
          <GatewayCopyUrl
            v-if="gatewayItem"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :url="`${teamList[0].namespace}.mqtt.ubeac.io/mqtt`"
            :class="{'gateway-security-mobile': browser.isMobile}"
            class="mb-2 pr-2 component-gateway-security--url entity-details-url"/>
        </b-col>
        <b-col
          cols="8"
          md="3">
          <p class="mt-2">
            {{ $t('general.port') }} : 443
          </p>
        </b-col>
      </b-row>
      <b-row
        v-if="false"
        class="mt-3">
        <b-col
          class="mb-2 component-gateway-security--text"
          cols="12">
          <span>
            {{ $t('general.gateway_client_id') }}
          </span>
        </b-col>
        <b-col
          cols="4"
          md="9">
          <GatewayCopyUrl
            v-if="gatewayItem"
            :uid="true"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :qr-code="false"
            :class="{'gateway-security-mobile': browser.isMobile}"
            class="mb-0 component-gateway-security--url entity-details-url"/>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col
          class="mb-2 component-gateway-security--text"
          cols="12">
          <span>
            {{ $t('general.gateway_publish_topic') }}
          </span>
        </b-col>
        <b-col
          cols="4"
          md="9">
          <GatewayCopyUrl
            v-if="gatewayItem"
            :uid="true"
            :mobile-view="browser.isMobile"
            :title="gatewayItem.name"
            :gateway-url-default="false"
            :qr-code="false"
            :url="gatewayItem.url"
            :class="{'gateway-security-mobile': browser.isMobile}"
            class="mb-0 component-gateway-security--url entity-details-url"/>
        </b-col>
      </b-row>
    </b-alert>
  </b-card>
    <b-card
      no-body
      class="card-border no-shadow mx-3 pt-3 p-0 w-auto mb-3">
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
          :label="$t('auth.username')"
          class="mt-3">
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
        <b-button
          v-if="false"
          :class="{'btn-loading': btnLoading}"
          type="button"
          class="btn btn-success float-left mr-2"
          @click="update()">
          {{ $t("buttons.submit") }}
        </b-button>
      </b-form>
    </b-card>
  </ComponentContainer>
</template>

<script>
import GatewayCopyUrl from './CopyUrl'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewaySecurityMqtt',
  components: { GatewayCopyUrl },
  mixins: [EntitiesMixin],
  props: {
    securityModel: {
      type: [Object, Boolean],
      default: null,
      required: true
    },
    insertItem: {
      type: [Object, Boolean],
      default: null,
      required: false
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
      let out = this.insertItem
      return out
    },
    gatewayUrl () {
      return `${this.teamList[0].namespace}.${this.Config.gatewayUrlFirstPart}${this.url}`
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
    },
    update () {
      this.$emit('updateSecurityModel')
    }
  }
}
</script>
