<template>
  <ComponentContainer class="component-gateway-security">
    <b-card
      no-body
      class="card-border no-shadow mx-3 p-0 w-auto mb-3">
      <b-alert
        class="no-radius mb-0"
        variant="success"
        show>
        <b-row>
          <b-col
            class="mb-3 component-gateway-security--text"
            cols="12">
            <span>
              {{ $t('general.gateway_url') }}
            </span>
          </b-col>
          <b-col
            cols="12"
            sm="10"
            md="9">
            <span class="mt-2 mr-4 float-left"> {{ $t('general.http') }} </span>
            <GatewayCopyUrl
              v-if="gatewayItem"
              :mobile-view="browser.isMobile"
              :title="gatewayItem.name"
              :gateway-url-default="false"
              :url="`http://${teamList[0].namespace}.${$config.gatewayUrlFirstPart}${gatewayItem.url}`"
              :class="{'http-security': !browser.isMobile}"
              class="float-left mb-2 pr-2 component-gateway-security--url entity-details-url"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="12"
            sm="10"
            md="9">
            <span class="mt-2 mr-4 float-left"> {{ $t('general.https') }} </span>
            <GatewayCopyUrl
              v-if="gatewayItem"
              :mobile-view="browser.isMobile"
              :title="gatewayItem.name"
              :gateway-url-default="false"
              :url="`https://${teamList[0].namespace}.${$config.gatewayUrlFirstPart}${gatewayItem.url}`"
              :class="{'http-security': !browser.isMobile}"
              class="float-left mb-0 pr-2 component-gateway-security--url entity-details-url"/>
          </b-col>
          <b-col
            cols="12">
            <small class="float-left d-block w-100 mt-2">
              {{ $t('general.gateway_http_help_1') }}<br>
              {{ $t('general.gateway_http_help_2') }}
            </small>
          </b-col>
        </b-row>
      </b-alert>
    </b-card>
    <b-card
      no-body
      class="card-border no-shadow mx-3 p-0 pt-3 w-auto mb-3">
      <h4 class="lined-header text-dark pb-2 w-100 float-left d-block">
        {{ $t('general.http') }}
      </h4>
      <b-form
        inline
        class="needs-validation w-100 d-block float-left"
        novalidate>
        <b-form-group
          :label="$t('http.enabled')">
          <toggle-button
            :speed="100"
            :sync="true"
            :labels="false"
            v-model="securityModel.http.enabled"
            :value="true"
            :unchecked-value="false"/>
        </b-form-group>
        <b-form-group
          :label="$t('general.https_only')">
          <toggle-button
            :speed="100"
            :sync="true"
            :labels="false"
            v-model="securityModel.http.ssl"
            :disabled="!securityModel.http.enabled"
            :value="true"
            :unchecked-value="false"/>
        </b-form-group>
        <b-form-group
          :label="$t('general.key_value_pairs')"
          class="pt-2">
          <table
            class="ml-0 table gateway-security-table">
            <thead>
              <tr class="d-block">
                <th class="pl-0 pt-0">
                  <span class="text-muted w-4 float-left d-block lh-2">
                    {{ $t('general.key') }}
                  </span>
                  <span class="float-left table-input">
                    <b-input
                      :disabled="!securityModel.http.enabled"
                      v-model="headerAddItem.key"
                      autofocus/>
                  </span>
                </th>
                <th class="pl-0 pt-0">
                  <span class="text-muted w-4 float-left d-block lh-2">
                    {{ $t('general.value') }}
                  </span>
                  <span class="float-left table-input">
                    <b-input
                      :disabled="!securityModel.http.enabled"
                      v-model="headerAddItem.value"
                      class="text-one-line"/>
                  </span>
                </th>
                <th
                  class="float-right p-0"
                  style="width: 10%;">
                  <b-button
                    v-b-tooltip
                    :title="$t('buttons.add')"
                    :disabled="!securityModel.http.enabled"
                    type="button"
                    size="sm"
                    style="width: 2em;"
                    variant="outline-success"
                    class="mr-2 float-right"
                    @click="addToDict(securityModel.http.headers, headerAddItem)">
                    <icon name="add"/>
                  </b-button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(value, key) in securityModel.http.headers">
                <td class="pl-0 lh-4">
                  {{ key }}
                </td>
                <td class="pl-0 lh-4">
                  {{ value }}
                </td>
                <td
                  class="float-right p-0"
                  style="width: 10%;">
                  <b-button
                    v-b-tooltip
                    :title="$t('buttons.remove')"
                    :disabled="!securityModel.http.enabled"
                    type="button"
                    size="sm"
                    style="width: 2em;"
                    variant="outline-danger"
                    class="m-2 show-only-on-row-hover float-right"
                    @click="removeFromDict(securityModel.http.headers, key)">
                    <icon
                      name="delete"/>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-form-group>
      </b-form>
    </b-card>
  </ComponentContainer>
</template>

<script>
import GatewayCopyUrl from './CopyUrl'
import EntityUpdateMixin from '@/mixin/entityUpdate'

export default {
  name: 'GatewaySecurityHttp',
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
      return this.gatewayById(this.id)
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
      this.$emit('startUpdate')
      this.$emit('updateSecurityModel', this.securityModel)
      this.$forceUpdate()
    },
    addToDict (dict, newObj) {
      this.$root.$emit('bv::hide::tooltip')
      if (newObj.key) {
        dict[newObj.key] = newObj.value
        newObj.key = ''
        newObj.value = ''
        this.$emit('startUpdate')
        this.$emit('updateSecurityModel', this.securityModel)
        this.$forceUpdate()
      }
    }
  }
}
</script>
