<template>
  <ComponentContainer>
      <b-modal
        ref="ModalConfirmRemove"
        :title="$t('modal.question_confirm')"
        centered
        ok-variant="danger"
        cancel-variant="secondary"
        @ok="deleteMe(underRemoveItem.id)">
        <b-alert
          show
          variant="warning">
          {{ $t("modal.delete_gateway_warning") }}
        </b-alert>
        <span v-if="underRemoveItem">
          {{ $t("modal.delete_info_1") }} <b>{{ underRemoveItem.name }}</b>.
          {{ $t("modal.delete_info_2") }}
        </span>
      </b-modal>
      <b-tabs 
        lazy
        :no-fade="true"
        class="card-tabs" 
        card>
        <b-tab :title="$t('general.general')" active>
          <b-form
            inline
            v-if="gatewayUpdate"
            class="needs-validation"
            novalidate>
            <b-form-group 
            :label="$t('general.firmeware')"
            class="pt-0 mt-0">
              <FirmwareSelector
                v-if="productsList && productsList.length > 0"
                v-model="underUpdateItem.firmwareId"/>
            </b-form-group>
            <!--<GatewayHelpBox :firmware-id="underUpdateItem.firmwareId" />-->

            <GatewayUrl v-model="underUpdateItem.url" :id="id" />
            <!--Name-->
            <b-form-group :label="$t('general.name')">
              <b-form-input
                v-validate="{
                             required: true,
                             min: 2,
                             max: 150
                             }"
                :state="errors.has('name') ? 'invalid' : null"
                v-model="underUpdateItem.name"
                :placeholder="$t('general.name')"
                type="text"
                size="md"
                class="col-xl-6"
                autofocus
                name="name"
                required/>
                <b-form-invalid-feedback v-if="errors.has('name')">
                  <span v-for="error in errors.collect('name')">
                    {{ error }} </span>
                </b-form-invalid-feedback>
            </b-form-group>

            <!--Description-->
            <b-form-group
              :label="$t('general.description') + ' ' + $t('general.optional')"
              class="form-control-optional">
              <b-form-textarea
                v-validate="{
                             min: 0,
                             max: 500
                             }"
                :state="errors.has('description') ? 'invalid' : null"
                v-model="underUpdateItem.description"
                :placeholder="$t('general.description') + ' ' + $t('general.optional')"
                :rows="2"
                type="text"
                size="md"
                class="col-xl-6"
                name="description"/>
                <b-form-invalid-feedback v-if="errors.has('description')">
                  <span v-for="error in errors.collect('description')">
                    {{ error }} </span>
                </b-form-invalid-feedback>
            </b-form-group>

            <!--Buttons-->
            <div class="form-row form-button-row p-3">
              <b-button
                type="button"
                variant="outline-danger"
                class="float-right text-right"
                @click="prepareForRemove(underUpdateItem)">
                <icon name="delete"/>
                <span
                  v-if="!browser.isMobile"
                  class="ml-1">
                  {{ $t('buttons.delete') }}
                </span>
              </b-button>
              <b-button
                :disabled="updateEnabled"
                type="button"
                class="btn btn-success float-left mr-2"
                @click="update(underUpdateItem)">
                {{ $t("buttons.submit") }}
              </b-button>
              <b-button
                type="button"
                variant="secondary"
                class="float-left"
                @click="cancel()">
                {{ $t("buttons.cancel") }}
              </b-button>
            </div>
            <HelpCard
              class="mx-3 mb-0"
              :url="Config.docs.gateway"
              :text="$t('help_cards.gateway')" />
            </b-form>
        </b-tab>

        <b-tab
          class="pt-0"
          :title="$t('general.appearance')">
          <b-form
            inline
            v-if="gatewayUpdate"
            class="needs-validation"
            novalidate>
            <ColorPicker 
            v-model="underUpdateItem.attributes.ui_color" />
            <IconSelector 
            v-model="underUpdateItem.attributes.ui_icon" />
            <!--Buttons-->
            <div class="form-row form-button-row p-3">
              <b-button
                type="button"
                variant="outline-danger"
                class="float-right text-right"
                @click="prepareForRemove(underUpdateItem)">
                <icon name="delete"/>
                <span
                  v-if="!browser.isMobile"
                  class="ml-1">
                  {{ $t('buttons.delete') }}
                </span>
              </b-button>
              <b-button
                :disabled="updateEnabled"
                type="button"
                class="btn btn-success float-left mr-2"
                @click="update(underUpdateItem)">
                {{ $t("buttons.submit") }}
              </b-button>
              <b-button
                type="button"
                variant="secondary"
                class="float-left"
                @click="cancel()">
                {{ $t("buttons.cancel") }}
              </b-button>
            </div>
          </b-form>
        </b-tab>
        <b-tab
          class="pt-2"
          :title="$t('intro.map')">
          <b-form
            inline
            v-if="gatewayUpdate"
            class="needs-validation"
            novalidate>
            <FloorSelector
              :auto-fill-floor="false"
              :disable-team="true"
              :team-id="underUpdateItem.team"
              @updateTeam="updateTeam"
              v-model="underUpdateItem.floor"/> 
            <!--Map-->
            <b-form-group
              v-if="currentFloorPlan"
              class="pr-0"
              :label="$t('general.pin_position')">
              <MapFloor
                v-if="currentFloorPlan"
                :plan="currentFloorPlan"
                :markers="markers"
                class="form-map"
                @update="updateMarker"/>
            </b-form-group>
            <MapPinSelector 
                :color="underUpdateItem.attributes.ui_color"
            :icon="underUpdateItem.attributes.ui_icon"
            size="1.5"
            v-model="underUpdateItem.attributes.ui_map_pin"/>
            <MapPinSizeSelector 
            v-model="underUpdateItem.attributes.ui_map_pin_size"/>
            <!--Buttons-->
            <div class="form-row form-button-row p-3">
              <b-button
                type="button"
                variant="outline-danger"
                class="float-right text-right"
                @click="prepareForRemove(underUpdateItem)">
                <icon name="delete"/>
                <span
                  v-if="!browser.isMobile"
                  class="ml-1">
                  {{ $t('buttons.delete') }}
                </span>
              </b-button>
              <b-button
                :disabled="updateEnabled"
                type="button"
                class="btn btn-success float-left mr-2"
                @click="update(underUpdateItem)">
                {{ $t("buttons.submit") }}
              </b-button>
              <b-button
                type="button"
                variant="secondary"
                class="float-left"
                @click="cancel()">
                {{ $t("buttons.cancel") }}
              </b-button>
            </div>
          </b-form>
        </b-tab>
        <template v-if="security">
           <b-tab :title="`${$t('general.http')}/${$t('general.mqtt')}`">
            <SecurityHttp
              :security-model="securityModel"
              :id="id"
              @updateSecurityModel="updateSecurityModel"
              @startUpdate="startUpdate" />
            <SecurityMqtt
              :security-model="securityModel"
              :id="id"
              @updateSecurityModel="updateSecurityModel"
              @startUpdate="startUpdate" />
            <SecurityIpRestriction
              :security-model="securityModel"
              :id="id"
              class="mt-3"
              @updateSecurityModel="updateSecurityModel"
              @startUpdate="startUpdate" />
            <b-form 
              class="pl-3 needs-validation"
              autocomplete="nope"
              inline>
              <div class="form-row form-button-row p-3">
                <b-button
                  :disabled="updateEnabled"
                  type="button"
                  class="btn btn-success float-left"
                  @click="update(underUpdateItem)">
                  {{ $t("buttons.submit") }}
                </b-button>
              </div>
            </b-form>
           </b-tab>
        </template>
      </b-tabs>
  </ComponentContainer>
</template>

<script>
import {mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityUpdateMixin from '@/mixin/entityUpdate'
import FloorSelector from '@/components/floor/Selector'
import FirmwareSelector from '@/components/FirmwareSelector'
import SecurityHttp from './SecurityHttp.vue'
import SecurityMqtt from './SecurityMqtt.vue'
import SecurityIpRestriction from './SecurityIpRestriction.vue'
import GatewayUrl from '@/components/gateway/AddUrl'
import ColorPicker from '@/components/ColorPicker'
import MapPinSelector from '@/components/map/MapPinSelector.vue'
import MapPinSizeSelector from '@/components/map/MapPinSizeSelector.vue'
import IconSelector from '@/components/IconSelector'
import GatewayHelpBox from '@/components/gateway/HelpBox'

export default {
  name: 'GatewayUpdateForm',
  components: { GatewayHelpBox, SecurityIpRestriction, SecurityMqtt, SecurityHttp, GatewayUrl, FirmwareSelector,
    FloorSelector, ColorPicker, MapPinSelector, MapPinSizeSelector, IconSelector },
  mixins: [EntityUpdateMixin],
  data () {
    return {
      disableButtonDisable: false,
      setOneTime:  false,
      underUpdateItem: {},
      updateItemCached: {},
      underRemoveItem: null,
      selectedBuilding: null,
      selectedManufacturer: null,
      selectedProduct: null,
      securityModel: null,
      firstLoad: true,
      buildings: null
    }
  },
  watch: {
    underUpdateItem: {
      deep: true,
      handler () {
        this.$emit('updateFirmware', this.underUpdateItem.firmwareId)
      }
    }
  },
  computed: {
    gatewayItem () {
      let item = this.gatewayById(this.id)
      return item
    },
    security () {
      let item = this.gatewayById(this.id)
      if (this.firstLoad) {
        this.securityModel = this._.cloneDeep(item.security)
        this.firstLoad = false
      }  
      return item.security
    },
    markers () {
      return [{
        id: this.underUpdateItem.id,
        title: this.underUpdateItem.name,
        type: 'gateway',
        pinNum: 1,
        obj: this.underUpdateItem,
        x: this.underUpdateItem.x,
        y: this.underUpdateItem.y
      }]
    },
    currentFloorPlan () {
      let out = ''
      if (this.currentFloor && this.currentFloor.planFileId) {
        out = this.getImageUrl(this.currentFloor.planFileId)
      }
      return out
    },
    currentFloor () {
      let out = null
      out = this.floorById(this.underUpdateItem.floor)
      return out
    },
    gatewayUpdate () {
      const item = this.gatewayById(this.id)
      if (item && this.setOneTime === false)  {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
        this.underUpdateItem = this._.cloneDeep(item)
        this.setOneTime = true
      }
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return this.disableButtonDisable ? !this.disableButtonDisable : JSON.stringify(this.updateItemCached) === JSON.stringify(this.underUpdateItem) 
    }
  },
  methods: {
    updateMarker (payload) {
      this.underUpdateItem.x = payload.x
      this.underUpdateItem.y = payload.y
    },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteGateway(id).then(() => {
        this.$router.push({ name: 'Gateways' })
        this.success()
      })
    },
    prepareForRemove (item) {
      this.underRemoveItem = item
      this.$refs.ModalConfirmRemove.show()
    },
    updateTeam (e) {
      this.underUpdateItem.team = e
    },
      @validation
        @successNotification('Update Security Done')
    updateSecurityModel (securityModel) {
      this.underUpdateItem.security = securityModel
      this.disableButtonDisable = true
    },
    startUpdate () {
      this.disableButtonDisable = true
    },
    @validation
    update (item) {
      const gatewayUpdate = {
        id: item.id,
        name: item.name,
        floorId: item.floor,
        description: item.description,
        firmwareId: item.firmwareId,
        teamId: item.team,
        attributes: item.attributes,
        url: item.url,
        security: item.security,
        x: item.x,
        y: item.y
      }
      return this.updateGateway(gatewayUpdate).then(async () => {
        this.$store.commit('notification/success', {
          message: 'Update Done'
        })
      })
    }
  }
}
</script>
