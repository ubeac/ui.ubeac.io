<template>
  <ComponentContainer>
  <b-tab 
    :title="$t('manage.sensors.sensors')">
    <b-form
      inline
      v-if="deviceUpdate"
      class="needs-validation"
      autocomplete="nope"
      novalidate>
      <!--Uid-->
      <b-form-group :label="$t('device.uid')">
        <b-form-input
          :readonly="true"
          :disabled="true"
          v-model="underUpdateItem.uid"
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
      </b-form-group>

      <!--Name-->
      <b-form-group :label="$t('device.name')">
        <b-form-input
          v-validate="{
                      required: true,
                      min: 2,
                      max: 150
                      }"
          :state="errors.has('name') ? 'invalid' : null"
          v-model="underUpdateItem.name"
          :placeholder="$t('device.name_placeholder')"
          type="text"
          autofocus
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
          v-model="underUpdateItem.description"
          :placeholder="$t('device.description_placeholder')"
          :rows="2"
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

      <FloorSelector
        :auto-fill-floor="false"
        :disable-team="true"
        :team-id="underUpdateItem.team"
        @updateTeam="updateTeam"
        @input="updateFloorPlan"
        v-model="underUpdateItem.floorId"/> 
      <!--Map-->
      <b-form-group :label="$t('intro.map')">
        <MapFloor
          v-if="currentFloorPlan"
          :plan="currentFloorPlan"
          :markers="markers"
          style="height: 625px;"
          class="w-100 mb-5"
          @update="updateMarker"/>
      </b-form-group>

      <MapPinSelector 
          class="col-12"
          :color="underUpdateItem.attributes.ui_color"
          :icon="underUpdateItem.attributes.ui_icon"
          size="1.5"
          v-model="underUpdateItem.attributes.ui_map_pin"/>
      <ColorPicker 
          class="col-lg-6 col-xl-6 col-md-6"
          v-model="underUpdateItem.attributes.ui_color" />
      <MapPinSizeSelector 
          class="col-lg-6 col-xl-6 col-md-6"
          v-model="underUpdateItem.attributes.ui_map_pin_size"/>
      <IconSelector 
          class="col-12"
          v-model="underUpdateItem.attributes.ui_icon" />
      <div class="form-row form-button-row p-3">
        <!--Buttons-->
        <b-button
          type="button"
          variant="outline-danger"
          class="btn float-right"
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
          class="btn btn-secondary float-left"
          @click="cancel">
          {{ $t("buttons.cancel") }}
        </b-button>
      </div>
      </b-form>
  </b-tab>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import Multiselect from 'vue-multiselect'
import EntityUpdateMixin from '@/mixin/entityUpdate'
import FloorSelector from '@/components/floor/Selector'
import ColorPicker from '@/components/ColorPicker'
import IconSelector from '@/components/IconSelector'
import MapPinSelector from '@/components/map/MapPinSelector.vue'
import MapPinSizeSelector from '@/components/map/MapPinSizeSelector.vue'
export default {
  name: 'DeviceUpdateFormDetails',
  components: { IconSelector, ColorPicker, FloorSelector, Multiselect, MapPinSelector, MapPinSizeSelector },
  mixins: [EntityUpdateMixin],
  data () {
    return {
      setOneTime: false,
      underAddSensor: {
        deviceId: this.id,
        name: ''
      },
      underUpdateItem: {},
      underRemoveItem: {},
      updateItemCached: {}
    }
  },
  computed: {
    deviceUpdate () {
      const item = this.deviceById(this.id)
      if (item && this.setOneTime === false) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
        this.underUpdateItem = this._.cloneDeep(item)
        this.underAddSensor.deviceId = item.id
        this.underAddSensor.deviceUid = item.uid
        this.underAddSensor.teamId = item.teamId
        this.setOneTime = true
      }
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return JSON.stringify(this.updateItemCached) ===
          JSON.stringify(this.underUpdateItem)
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
        id: this.underUpdateItem.id,
        title: this.underUpdateItem.name,
        obj: this.underUpdateItem,
        type: 'gateway',
        pinNum: 1,
        x: this.underUpdateItem.x ? this.underUpdateItem.x : 50,
        y: this.underUpdateItem.y ? this.underUpdateItem.y : 50
      }]
    },
    currentFloor () {
      let out = null
      out = this.floorById(this.underUpdateItem.floorId)
      return out
    }
  },
  methods: {
    updateFloorPlan () {
      this.underUpdateItem.x = this.underUpdateItem.x ? this.underUpdateItem.x : 50
      this.underUpdateItem.y = this.underUpdateItem.y ? this.underUpdateItem.y : 50
    },          
    updateMarker (payload) {
      this.underUpdateItem.x = payload.x
      this.underUpdateItem.y = payload.y
    },
    updateTeam (e) {
      this.underUpdateItem.team = e
    },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteDevice(id).then(() => {
        // TODO: fix this code, replace with this.$emit('success')
        this.$router.push({ name: 'Devices' })
      })
    },
      @validation
      @successNotification('Device Update Successfully')
    update (item) {
      return this.updateDevice(item).then(() => {
        this.success()
      })
    },
    prepareForRemove (item) {
      this.underRemoveItem = item
      this.$refs.ModalConfirmRemove.show()
    }
  }
}
</script>
