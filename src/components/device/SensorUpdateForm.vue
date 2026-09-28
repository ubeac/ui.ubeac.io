<template>
  <b-card
    no-body
    class="no-shadow no-radius p-0 m-0 w-100 float-left">
    <b-card-body class="p-0 m-0">
      <!--Uid-->
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <b-form-group :label="$t('device.uid')">
          <b-form-input
            v-validate="{
                        required: true,
                        min: 0,
                        max: 50
                        }"
            :disabled="true"
            :readonly="true"
            :state="errors.has('sensor_uid') ? false : null"
            v-model="sensor.uid"
            :placeholder="$t('device.uid_placeholder')"
            type="text"
            name="sensor_uid"/>
            <b-form-invalid-feedback v-if="errors.has('sensor_uid')">
              <span
                v-for="(error, index) in errors.collect('sensor_uid')"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <!--Name-->
        <b-form-group :label="$t('device.sensor_name')">
          <b-form-input
            v-validate="{
                        required: true,
                        min: 2,
                        max: 150
                        }"
            :state="errors.has($t('device.sensor_name_placeholder')) ? false : null"
            v-model="sensor.name"
            :placeholder="$t('device.sensor_name_placeholder')"
            type="text"
            autofocus
            :name="$t('device.sensor_name_placeholder')"/>
            <b-form-invalid-feedback v-if="errors.has($t('device.sensor_name_placeholder'))">
              <span
                v-for="(error, index) in errors.collect($t('device.sensor_name_placeholder'))"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <!-- Description Update -->
        <b-form-group
          :label="$t('general.description') + ' ' + $t('general.optional')"
          class="form-control-optional">
          <b-form-textarea
            v-validate="{
                        min: 0,
                        max: 500
                        }"
            :state="errors.has('description') ? 'invalid' : null"
            v-model="sensor.description"
            :rows="2"
            :placeholder="$t('device.sensor_description_placeholder')"
            type="text"
            name="description"/>
            <b-form-invalid-feedback v-if="errors.has('description')">
              <span
                v-for="(error, index) in errors.collect('description')"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <!-- Sensor Type -->
        <b-form-group :label="$t('device.sensor_type')">
          <multiselect
            :class="{ 'no-validate' : errors.has($t('device.sensor_type')) }"
            v-model="sensor.type"
            :multiple="false"
            :options="_sensorTypes"
            :placeholder="$t('device.sensor_type')"
            label="name"
            :name="$t('device.sensor_type')"
            @select="resetSensorUnit(sensor)"/>
          <input
            v-validate="'required'"
            v-model="sensor.type"
            :state="errors.has($t('device.sensor_type')) ? false : null"
            :name="$t('device.sensor_type')"
            required
            type="hidden" >
            <b-form-invalid-feedback v-if="errors.has($t('device.sensor_type'))">
              <span
                v-for="(error, index) in errors.collect($t('device.sensor_type'))"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <!-- Unit Update -->
        <b-form-group
          v-if="sensor.type"
          :label="$t('device.unit')">
          <multiselect
            v-model="sensor.unit"
            :multiple="false"
            :options="sensorUnitsBySensorType(sensor.type.type)"
            :placeholder="$t('device.unit')"
            label="name"/>
        </b-form-group>
        <!-- Prefix Update -->
        <b-form-group
          v-if="sensor.type"
          :label="$t('device.prefix') + ' ' + $t('general.optional')">
          <multiselect
            v-model="sensor.prefix"
            :multiple="false"
            :options="sensorPrefixes"
            :placeholder="$t('device.prefix')"
            label="name"/>
        </b-form-group>
        <!--Precision-->
        <b-form-group :label="$t('dashboard.widget.precision') + ' ' + $t('general.optional')">
          <b-form-input
            :state="errors.has(`precision`) ? false : null"
            v-model="sensor.attributes.ui_precision"
            v-validate="{
                        regex: /^(2[0-0]|1[0-9]|[0-9])$/
                        }"
            :placeholder="$t('dashboard.widget.precision')"
            type="text"
            :name="`precision`"/>
            <b-form-invalid-feedback v-if="errors.has(`precision`)">
              <span
                v-for="(error, index) in errors.collect(`precision`)"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <IconSelector v-model="sensor.attributes.ui_icon" />
        <ColorPicker 
                      v-model="sensor.attributes.ui_color" />
        <ColorRange 
                      v-if="sensor.attributes"
                      v-model="sensor.attributes.ui_colorRange" />
        <div class="form-row form-button-row p-3">
          <!-- Submit -->
          <b-button
            :disabled="updateEnabled"
            :class="{'btn-loading': updateSensorLoading}"
            class="float-left mr-2 mb-3"
            variant="success"
            @click="_updateSensor(sensor)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-btn
            :disabled="updateEnabled"
            @click="resetForm"
            variant="light">
            {{ $t("buttons.reset") }}
          </b-btn>
          <b-button
            type="button"
            variant="outline-danger"
            class="float-right text-right"
            @click="prepareForRemove(sensor)">
            <icon name="delete"/>
            <span
              v-if="!browser.isMobile"
              class="ml-1">
              {{ $t('buttons.delete') }}
            </span>
          </b-button>
        </div>
        </b-form>
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
            {{ $t("modal.delete_sensor_warning") }}
          </b-alert>
          <span v-if="underRemoveItem">
            {{ $t("modal.delete_info_1") }} <b>{{ underRemoveItem.name }}</b>.
            {{ $t("modal.delete_info_2") }}
          </span>
        </b-modal>
    </b-card-body>
  </b-card>
</template>

<script>
import EntityUpdateMixin from '@/mixin/entityUpdate'
import ColorPicker from '@/components/ColorPicker'
import ColorRange from '@/components/ColorRange'
import IconSelector from '@/components/IconSelector'
import Multiselect from 'vue-multiselect'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
export default {
  name: 'SensorUpdateForm',
  mixins: [EntityUpdateMixin],
  components: {IconSelector, ColorRange, Multiselect, ColorPicker },
  props: {
   lazyLoaded: {
     required: true,
     type: [Object, Boolean],
     default: true
   },
   sensorObj: {
     required: true,
     type: [Object, Boolean]
   }
 },
 data () {
   return {
     lazyLoadedOneTime: false,
     updateSensorLoading: false,
     updateItemCached: {},
     underRemoveItem: null,
     sensor: null
   }
 },
 watch: {
   lazyLoaded () {
     if (this.lazyLoaded) {
       this.lazyLoadedOneTime = true
     }
   }
 },
 created () {
   this.sensor = this._.cloneDeep(this.sensorObj)
   this.updateItemCached = this._.cloneDeep(this.sensor)
 },
 computed: {
   underAddSensorUnitList () {
     let out = null
     if (this.underAddSensor.type) {
       out = this.sensorUnitsBySensorType(this.underAddSensor.type.type)
     }
     return out
   },
   updateEnabled () {
     return JSON.stringify(this.updateItemCached) === JSON.stringify(this.sensor)
   },
   _sensorTypes () {
     let output = []
     if (this.sensorTypes) {
       output = this.sensorTypes
       output.forEach((item) => {
         if (item.unit && item.unit !== '') {
           item.nameWithUnit = item.name + ' (' + item.unit + ')'
         } else {
           item.nameWithUnit = item.name
         }
       })
     }
     return output
   }
 },
 methods: {
    resetSensorUnit (sensor) {
      setTimeout(() => {
        if (this.sensor.type) {
          this.sensor.unit = this.sensorUnitsBySensorType(this.sensor.type.type)[0]
        }
      }, 100)
    },
   resetForm () {
     this.sensor = this._.cloneDeep(this.updateItemCached)
   },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteSensor(id).then(() => {
      })
    },
    prepareForRemove (item) {
      this.underRemoveItem = item
      this.$refs.ModalConfirmRemove.show()
    },
     @validation
   _updateSensor (mainPayload) {
     let payload = this._.cloneDeep(mainPayload)
     if (payload.type) {
       payload.type = payload.type.type
     }
     if (payload.unit) {
       payload.unit = payload.unit.id
     } else {
       delete payload.unit
     }
     if (payload.prefix) {
       payload.prefix = payload.prefix.base10
     }
     if (payload.prefix === null) {
       delete payload.prefix
     }
     this.updateSensorLoading = true
     let promise = this.updateSensor(payload)
     promise.then(() => {
       this.updateSensorLoading = false
       this.$emit('closeMe')
       this.updateItemCached = this._.cloneDeep(this.sensor)
     }).catch(() => {
       this.updateSensorLoading = false
     })
     return promise
   }
 }
}
</script>
