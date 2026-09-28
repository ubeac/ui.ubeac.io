<template>
  <ComponentContainer class="component-gateway-security">
    <b-card
      no-body
      class="card-border no-shadow mx-3 pt-3 p-0 w-auto mb-3">
      <h4 class="lined-header form-bottom-lined text-dark pb-2 w-100 float-left d-block">
        {{ $t('general.ip_restriction') }}
      </h4>
      <b-form
        inline
        class="needs-validation w-100 d-block float-left"
        novalidate>
        <b-form-group
          :label="$t('general.ipRules')"
          class="noline">
          <b-input
            v-validate="{
              // NOTE: test Regex here https://www.regextester.com/95065
              regex: /^(([(\d+)(x+)]){1,3})(\-+([(\d+)(x)]{1,3}))?\.(([(\d+)(x+)]){1,3})(\-+([(\d+)(x)]{1,3}))?\.(([(\d+)(x+)]){1,3})(\-+([(\d+)(x)]{1,3}))?\.(([(\d+)(x+)]){1,3})(\-+([(\d+)(x)]{1,3}))?$/
            }"
            :disabled="disableUpdate"
            :state="errors.has($t('general.allowedIps')) ? false : null"
            v-model="underAddAllowedIps"
            :name="$t('general.allowedIps')"
            class="mb-2 mr-3" />
          <span class="mr-2 mr-sm-4 pt-3 text-muted">
            {{ $t('general.deniedIps') }}
          </span>
          <toggle-button
            :speed="100"
            :sync="true"
            :labels="false"
            v-model="addModeAllow"
            :unchecked-value="false"
            class="ml-3"/>
          <span class="ml-2 ml-sm-4 pt-2 text-muted">
            {{ $t('general.allowedIps') }}
          </span>
          <b-button
            v-b-tooltip
            :title="$t('buttons.add')"
            :disabled="errors.has($t('general.allowedIps'))"
            type="button"
            variant="outline-success"
            class="my-2 ml-3"
            @click="addToIpList">
            <icon name="add"/>
          </b-button>
        </b-form-group>
        <b-form-invalid-feedback
          v-if="errors.has($t('general.ipRules'))"
          class="w-100 py-3 pl-0 float-left">
          <span
            v-for="(error, index) in errors.collect($t('general.allowedIps'))"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
        <b-form-group
          :label="' '"
          class="noline pt-0 mt-0">
          <table
            class="table p-0 m-0">
            <tbody>
              <tr
                v-for="key in securityModel.ipRestriction.allowedIps">
                <td>
                  <b-badge
                    size="lg"
                    class="p-2 mr-3 no-radius"
                    variant="success">
                    {{ $t('general.allowedIps') }}
                  </b-badge>
                  {{ key }}
                </td>
                <td>
                  <b-button
                    v-b-tooltip
                    :title="$t('buttons.remove')"
                    type="button"
                    size="sm"
                    style="width: 2em;"
                    variant="outline-danger"
                    class="my-2 show-only-on-row-hover float-right"
                    @click="removeFromAllowedIps(key)">
                    <icon
                      name="delete"/>
                  </b-button>
                </td>
              </tr>
              <tr
                v-for="key in securityModel.ipRestriction.deniedIps">
                <td>
                  <b-badge
                    size="lg"
                    class="p-2 mr-3 no-radius"
                    variant="danger">
                    {{ $t('general.deniedIps') }}
                  </b-badge>
                  {{ key }}
                </td>
                <td>
                  <b-button
                    v-b-tooltip
                    :title="$t('buttons.remove')"
                    type="button"
                    size="sm"
                    style="width: 2em;"
                    variant="outline-danger"
                    class="my-2 show-only-on-row-hover float-right"
                    @click="removeFromDeniedIps(key)">
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
import EntityUpdateMixin from '@/mixin/entityUpdate'

export default {
  name: 'GatewaySecurityIpRestriction',
  mixins: [EntityUpdateMixin],
  props: {
    disableUpdate: {
      type: Boolean,
      default: false,
      required: false
    },
    securityModel: {
      type: [Object, Boolean],
      default: null,
      required: true
    }
  },
  data () {
    return {
      addModeAllow: false,
      btnLoading: false,
      underAddAllowedIps: '',
      underDeniedIps: '',
      ipRestrictionAddItem: {
        key: '',
        value: '',
        switch: false
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
    removeFromAllowedIps (input) {
      this.$root.$emit('bv::hide::tooltip')
      let cachedIpList = this.securityModel.ipRestriction.allowedIps
      this._.remove(cachedIpList, (item) => {
        return input === item
      })
      this.securityModel.ipRestriction.allowedIps = cachedIpList
      this.$forceUpdate()
      this.$emit('startUpdate')
      this.$emit('updateSecurityModel', this.securityModel)
    },
    removeFromDeniedIps (input) {
      this.$root.$emit('bv::hide::tooltip')
      let cachedIpList = this.securityModel.ipRestriction.deniedIps
      this._.remove(cachedIpList, (item) => {
        return input === item
      })
      this.securityModel.ipRestriction.deniedIps = cachedIpList
      this.$forceUpdate()
      this.$emit('startUpdate')
      this.$emit('updateSecurityModel', this.securityModel)
    },
    addToIpList () {
      if (this.addModeAllow && this.underAddAllowedIps.length > 0) {
        this.addToAllowedIps()
      } else if (this.underAddAllowedIps.length > 0) {
        this.addToDeniedIps()
      }
    },
    addToAllowedIps () {
      this.$root.$emit('bv::hide::tooltip')
      this.securityModel.ipRestriction.allowedIps.push(this.underAddAllowedIps)
      this.underAddAllowedIps = ''
      this.$forceUpdate()
      this.errors.clear()
      this.$emit('startUpdate')
      this.$emit('updateSecurityModel', this.securityModel)
    },
    addToDeniedIps () {
      this.$root.$emit('bv::hide::tooltip')
      this.securityModel.ipRestriction.deniedIps.push(this.underAddAllowedIps)
      this.underAddAllowedIps = ''
      this.$forceUpdate()
      this.errors.clear()
      this.$emit('startUpdate')
      this.$emit('updateSecurityModel', this.securityModel)
    }
  }
}
</script>
