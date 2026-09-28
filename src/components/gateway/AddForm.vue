<template>
  <ComponentContainer>
    <b-tabs
      :no-fade="true"
      class="card-tabs gateway-update-header"
      card>
      <b-tab
        :title="$t('general.general')"
        lazy
        active>
        <b-form
          inline
          class="needs-validation"
          novalidate>
          <!--firmwareId-->
          <b-form-group
            :label="$t('general.firmeware')"
            class="pt-0 mt-0">
            <FirmwareSelector
              v-if="productsList && productsList.length > 0"
              v-model="insertItem.firmwareId"/>
            <b-form-input
              v-validate="'required'"
              :state="errors.has('firmwareId') ? 'invalid' : null"
              v-model="insertItem.firmwareId"
              :placeholder="$t('general.firmwareId')"
              type="text"
              size="md"
              style="width: 0; height: 0; opacity: none;visibility: hidden;"
              name="firmwareId"
              required/>
            <b-form-invalid-feedback v-if="errors.has('firmwareId')">
              <span v-for="error in errors.collect('firmwareId')">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
          </b-form-group>
          <!--<GatewayHelpBox :firmware-id="insertItem.firmwareId" />-->
          <!--UID-->
          <GatewayUrl
            v-model="insertItem.url"
            class="w-100 form-top-lined" />
          <!--Name-->
          <b-form-group :label="$t('general.name')">
            <b-form-input
              v-validate="{
                required: true,
                min: 2,
                max: 150
              }"
              :state="errors.has('name') ? 'invalid' : null"
              v-model="insertItem.name"
              :placeholder="$t('general.name')"
              size="md"
              type="text"
              name="name"
              required/>
            <b-form-invalid-feedback v-if="errors.has('name')">
              <span
                v-for="(error, index) in errors.collect('name')"
                :key="index">
                {{ error }}
              </span>
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
              v-model="insertItem.description"
              :placeholder="$t('general.description') + ' ' + $t('general.optional')"
              :rows="4"
              type="text"
              name="description"/>
            <b-form-invalid-feedback v-if="errors.has('description')">
              <span
                v-for="(error , index) in errors.collect('description')"
                :key="index" >
                {{ error }}
              </span>
            </b-form-invalid-feedback>
          </b-form-group>

          <!--Buttons-->
          <div class="form-row form-button-row p-3">
            <b-button
              type="button"
              class="btn btn-success float-left mr-2"
              @click="_addGateway(insertItem)">
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
          <div
            class="mr-3 ml-3 w-100 mt-2">
            <HelpCard
              :url="Config.docs.gateway"
              :text="$t('help_cards.gateway')"
              class="mb-0 pb-0" />
          </div>
        </b-form>
      </b-tab>
      <b-tab
        :title="$t('general.appearance')"
        class="pt-0">
        <b-form
          inline
          class="needs-validation"
          autocomplete="nope"
          novalidate>
          <IconSelector
            v-model="insertItem.attributes.ui_icon" />
          <ColorPicker
            v-model="insertItem.attributes.ui_color" />
          <!--Buttons-->
          <div class="form-row form-button-row p-3">
            <b-button
              type="button"
              class="btn btn-success float-left mr-2"
              @click="_addGateway(insertItem)">
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
          <div
            class="mr-3 ml-3 w-100 mt-2">
            <HelpCard
              :url="Config.docs.gateway"
              :text="$t('help_cards.gateway')"
              class="mb-0 pb-0" />
          </div>
        </b-form>
      <!-- Address -->
      </b-tab>
      <b-tab
        :title="$t('intro.map')"
        class="pt-2">
        <b-form
          inline
          class="needs-validation"
          autocomplete="nope"
          novalidate>
          <FloorSelector
            v-model="insertItem.floor"
            class="d-block float-left w-100"/>
          <MapPinSelector
            :color="insertItem.attributes.ui_color"
            :icon="insertItem.attributes.ui_icon"
            v-model="insertItem.attributes.ui_map_pin"
            class="d-block float-left w-100 form-top-lined"
            size="1.5"/>
          <MapPinSizeSelector
            v-model="insertItem.attributes.ui_map_pin_size"
            class="d-block float-left w-100 form-top-lined" />
          <!--Map-->
          <b-form-group
            v-if="currentFloorPlan"
            :label="$t('general.pin_position')"
            class="pr-0">
            <MapFloor
              v-if="insertItem.floor"
              :plan="currentFloorPlan"
              :markers="markers"
              class="form-map"
              @update="updateMarker"/>
          </b-form-group>
          <!--Buttons-->
          <div class="form-row form-button-row p-3">
            <b-button
              type="button"
              class="btn btn-success float-left mr-2"
              @click="_addGateway(insertItem)">
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
          <div
            class="mr-3 ml-3 mb-0 pb-0 w-100 mt-2">
            <HelpCard
              :url="Config.docs.gateway"
              :text="$t('help_cards.gateway')"
              class="mb-0 pb-0" />
          </div>
        </b-form>
      </b-tab>
      <b-tab :title="`${$t('general.http')}/${$t('general.mqtt')}`">
        <SecurityHttp
          :insert-item="insertItem"
          :security-model="insertItem.security"
          @updateSecurityModel="updateSecurityModel"
          @startUpdate="startUpdate" />
        <SecurityMqtt
          :insert-item="insertItem"
          :security-model="insertItem.security"
          @updateSecurityModel="updateSecurityModel"
          @startUpdate="startUpdate" />
        <SecurityIpRestriction
          :insert-item="insertItem"
          :security-model="insertItem.security"
          class="mt-2 w-100 mx-0"
          @updateSecurityModel="updateSecurityModel"
          @startUpdate="startUpdate" />
        <b-form
          inline
          class="pl-3 needs-validation"
          autocomplete="nope"
          novalidate>
          <div class="form-row form-button-row p-3">
            <!--Buttons-->
            <b-button
              type="button"
              class="btn btn-success float-left mr-2"
              @click="_addGateway(insertItem)">
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
    </b-tabs>

  </ComponentContainer>
</template>

<script>
import GatewayAdd from '@/mixin/gatewayAdd'
import GatewayUrl from '@/components/gateway/AddUrl'
import FloorSelector from '@/components/floor/Selector'
import FirmwareSelector from '@/components/FirmwareSelector'
import SecurityHttp from './AddSecurityHttp.vue'
import SecurityMqtt from './AddSecurityMqtt.vue'
import SecurityIpRestriction from './AddSecurityIpRestriction.vue'
import ColorPicker from '@/components/ColorPicker'
import MapPinSelector from '@/components/map/MapPinSelector.vue'
import MapPinSizeSelector from '@/components/map/MapPinSizeSelector.vue'
import IconSelector from '@/components/IconSelector'
import GatewayHelpBox from '@/components/gateway/HelpBox'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewayAddForm',
  components: {
    GatewayHelpBox,
    SecurityIpRestriction,
    SecurityMqtt,
    SecurityHttp,
    FirmwareSelector,
    FloorSelector,
    ColorPicker,
    MapPinSelector,
    MapPinSizeSelector,
    IconSelector,
    GatewayUrl
  },
  mixins: [GatewayAdd, EntitiesMixin],
  data () {
    return {
      eventModel: {
        action: 'add_gateway',
        category: 'Gateway Add',
        label: '',
        value: 0,
        teamNamespace: '',
        userId: ''
      }
    }
  },
  methods: {
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'
      // this.sendGtagEvent(this.eventModel)
    },
    updateSecurityModel () {

    },
    startUpdate () {

    }
  }
}
</script>
