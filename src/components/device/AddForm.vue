<template>
  <ComponentContainer>
  <b-tabs
    lazy
    :no-fade="true"
    class="card-tabs tab-content-3" 
    card>
    <b-tab
      :title="$t('general.general')"
      active>
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <!--Uid-->
        <b-form-group :label="$t('device.uid')">
          <b-form-input
            v-validate="{
                         required: true,
                         min: 0,
                         max: 50
                         }"
            v-model="underAddItem.uid"
            :readonly="addFromRawData"
            :state="errors.has('uid') ? false : null"
            :placeholder="$t('device.uid_placeholder')"
            type="text"
            autofocus
            name="uid"/>
            <b-form-invalid-feedback v-if="errors.has('uid')">
              <span
                v-for="(error, index) in errors.collect('uid')"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="isDeviceUidDuplicated">
              <span>
                {{ $t('validation.custom.deviceUidExists') }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <!--Name-->
        <b-form-group :label="$t('device.name')">
          <b-form-input
            v-validate="{
                         required: true,
                         min: 2,
                         max: 150
                         }"
            :state="errors.has('name') ? false : null"
            v-model="underAddItem.name"
            :placeholder="$t('device.name_placeholder')"
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
            v-model="underAddItem.description"
            :placeholder="$t('device.description_placeholder')"
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

        <div class="form-row form-button-row p-3">
          <b-button
            :class="{'btn-loading': addDeviceLoading}"
            :disabled="addEnabled || isDeviceUidDuplicated"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="_addDevice(underAddItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
        <div
          class="mr-3 ml-3 w-100 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.device"
            :text="$t('help_cards.device')" />
        </div>
        </b-form>
    </b-tab>
    <b-tab
      :title="$t('general.appearance')">
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <IconSelector 
          v-model="underAddItem.attributes.ui_icon" />
        <ColorPicker 
          v-model="underAddItem.attributes.ui_color" />
        <div class="form-row form-button-row p-3">
          <b-button
            :class="{'btn-loading': addDeviceLoading}"
            :disabled="addEnabled || isDeviceUidDuplicated"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="_addDevice(underAddItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
        <div
          class="mr-3 ml-3 w-100 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.device"
            :text="$t('help_cards.device')" />
        </div>
      </b-form>
    </b-tab>
    <b-tab
      :title="$t('intro.map')">
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <FloorSelector
          @input="updateFloorPlan"
          class="d-block float-left w-100"
          @updateTeam="updateTeam"
          v-model="underAddItem.floorId"/> 
        <MapPinSelector 
          :color="underAddItem.attributes.ui_color"
          :icon="underAddItem.attributes.ui_icon"
          class="d-block float-left w-100 form-top-lined"
          size="1.5"
          v-model="underAddItem.attributes.ui_map_pin"/>
        <MapPinSizeSelector 
          class="d-block float-left w-100 form-top-lined"
          v-model="underAddItem.attributes.ui_map_pin_size"/>
        <!--Map-->
        <b-form-group
          v-if="currentFloorPlan"
          class="pr-0"
          :label="$t('general.pin_position')">
          <MapFloor
          :plan="currentFloorPlan"
          :markers="markers"
          class="form-map"
          @update="updateMarker"/>
        </b-form-group>
        <div class="form-row form-button-row p-3">
          <b-button
            :class="{'btn-loading': addDeviceLoading}"
            :disabled="addEnabled || isDeviceUidDuplicated"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="_addDevice(underAddItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
        <div
          class="mr-3 ml-3 w-100 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.device"
            :text="$t('help_cards.device')" />
        </div>
      </b-form>
    </b-tab>
  </b-tabs>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'
import FloorSelector from '@/components/floor/Selector'
import ColorPicker from '@/components/ColorPicker'
import IconSelector from '@/components/IconSelector'
import MapPinSelector from '@/components/map/MapPinSelector.vue'
import MapPinSizeSelector from '@/components/map/MapPinSizeSelector.vue'

export default {
  name: 'DeviceAddForm',
  mixins: [EntityAddMixin],
  components: { ColorPicker, FloorSelector, IconSelector, MapPinSelector, MapPinSizeSelector },
  data () {
    return {
      freezeValidation: false,
      addDeviceLoading: false,
      underAddItem: {
        deviceId: '',
        name: '',
        uid: '',
        attributes: {
          ui_color: '#000000',
          ui_map_pin: 'MapPinPin',
          ui_map_pin_size: 1,
          ui_icon: 'device',
        },
        teamId: self.getDefaultTeam,
      },
      addFromRawData: false,
      addItemCached: {},
      showCollapse: false
    }
  },
  computed: {
     isDeviceUidDuplicated () {
      let out = false
      if (!this.freezeValidation) { 
        this._.each(this.deviceList, (item) => {
          if (item.uid === this.underAddItem.uid) {
            out = true 
          }
        })
      } else {
        out = false 
      }
      return out
    },
    getDefaultTeam () {
      let out = null
      if (this.teamList && this.teamList.length > 0) {
        out = this.teamList[0].id
        this.underAddItem.teamId =  this.teamList[0].id
      }
      return out
    },
    addEnabled () {
      return JSON.stringify(this.addItemCached) ===
          JSON.stringify(this.underAddItem)
    },
    currentFloorPlan () {
      let out = ''
      if (this.currentFloor && this.currentFloor.planFileId) {
        out = this.getImageUrl(this.currentFloor.planFileId)
      }
      return out
    },
    markers () {
      return [{
        id: this.underAddItem.id,
        title: this.underAddItem.name,
        type: 'gateway',
        obj: this.underAddItem,
        pinNum: 1,
        x: this.underAddItem.x ? this.underAddItem.x : 50,
        y: this.underAddItem.y ? this.underAddItem.y : 50
      }]
    },
    currentFloor () {
      let out = null
      out = this.floorById(this.underAddItem.floorId)
      return out
    }
  },
  mounted () {
    if (this.$route.query.data) {
      this.underAddItem = JSON.parse(this.$route.query.data)
      this.underAddItem.attributes = {
        ui_color: '#000000',
        ui_map_pin: 'MapPinPin',
        ui_map_pin_size: 1,
        ui_icon: 'device',
      }
      this.underAddItem.teamId = this.gatewaysTeam(this.underAddItem.gatewayId).id
      this.underAddItem.name = this.underAddItem.uid
      this.addFromRawData = true
    }
  },
  methods: {
    updateFloorPlan () {
      this.underAddItem.x = 50
      this.underAddItem.y = 50
    },          
    updateMarker (payload) {
      this.underAddItem.x = payload.x
      this.underAddItem.y = payload.y
    },
    updateTeam (e) {
      this.underAddItem.team = e
    },
    toggleAddSensor () {
      this.showCollapse = !this.showCollapse
    },
      @validation
        @successNotification('Device Added Successfully')
    _addDevice (item) {
      item.teamId = this.workspaceId
      this.addDeviceLoading = true
      // Prevent validation blink
      this.freezeValidation = true
      let promise = this.addDevice(item)
      promise.then((response) => {
        this.success(response.data)
        this.addDeviceLoading = false
      })
      promise.catch(() => {
        this.addDeviceLoading = false
      })
      return promise
    }
  }
}
</script>
