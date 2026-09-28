<template>
  <b-card no-body>
    <b-modal
      ref="ModalConfirmRemove"
      :title="$t('modal.question_confirm')"
      centered
      ok-variant="danger"
      cancel-variant="success"
      @ok="deleteMe(underRemoveItem.id)">
      <b-alert
        show
        variant="warning">
        {{ $t("modal.delete_warning") }}
      </b-alert>
      <span v-if="underRemoveItem">
        {{ $t("modal.delete_info_1") }} <b>{{ underRemoveItem.name }}</b>.
        {{ $t("modal.delete_info_2") }}
      </span>
    </b-modal>
    <b-card-body class="px-3">
      <b-form
        v-if="firmwareUpdate"
        class="needs-validation"
        novalidate>
        <b-row>
          <b-col
            cols="12"
            sm="7"
            md="7"
            lg="12"
            xl="12">
            <!--Name-->
            <b-form-group :label="$t('general.name')">
              <b-form-input
                v-validate.disable="'required'"
                :state="errors.has('name') ? 'invalid' : null"
                v-model="underUpdateItem.name"
                :placeholder="$t('form.firmware_name_placeholder')"
                type="text"
                name="name"
                autofocus
                required/>
              <b-form-invalid-feedback v-if="errors.has('name')">
                <span v-for="error in errors.collect('name')">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
            </b-form-group>

            <!--Description-->
            <b-form-group
              :label="$t('general.description') + ' ' + $t('general.optional')"
              class="form-control-optional">
              <b-form-textarea
                v-model="underUpdateItem.description"
                :rows="2"
                :placeholder="$t('form.firmware_description_placeholder')"
                type="text"
                name="description"/>
            </b-form-group>

            <!--Selected Manufacturer-->            
            <b-form-group :label="$t('form.selected_manufacturer')">
              <b-form-select
                v-validate="'required'"
                v-model="underUpdateItem.manufacturerId"
                :state="errors.has('selectedManufacturer') ? 'invalid' : null"
                name="selectedManufacturer"
                @change="resetFirmware">
                <option
                  v-for="manufacturer in manufacturerList"
                  :value="manufacturer.id"
                  :key="manufacturer.id">{{ manufacturer.name }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback v-if="errors.has('selectedManufacturer')">
                <span
                  v-for="(error, index) in errors.collect('selectedManufacturer')"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
            </b-form-group>

            <!--Selected Product-->
            <b-form-group
              v-if="underUpdateItem.manufacturerId && manufacturerById(underUpdateItem.manufacturerId)"
              :label="$t('form.selected_product')">
              <b-form-select
                v-validate="'required'"
                v-model="underUpdateItem.productId"
                :state="errors.has('productId') ? 'invalid' : null"
                name="productId">
                <option
                  v-for="product in manufacturerById(underUpdateItem.manufacturerId).products"
                  :value="product"
                  :key="product">{{ productById(product).name }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback v-if="errors.has('productId')">
                <span
                  v-for="(error, index) in errors.collect('productId')"
                  :key="index">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
            </b-form-group>            

            <!-- Date -->
            <b-form-group :label="$t('data.release_date')">
              <b-input-group
                class="mr-2"
                size="md">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <icon
                      name="calendar"
                      class="mr-1"/>
                    {{ $t("data.from") }}
                  </span>
                </div>
                <date-picker
                  v-model="underUpdateItem.releaseDate"
                  :placeholder="$t('data.release_date')"
                  :dateShortener="{enabled: true}"
                  :config="options"
                  class="form-control"/>
              </b-input-group>
            </b-form-group>

            <!---- Spec File -->
            <b-form-group :label="$t('form.technical_spec')">
              <FileUploader
                v-model="underUpdateItem.technicalSpecFile"
                file-type="file"
                @startUploading="uploadingState = true"
                @stopUploading="uploadingState = false" />
            </b-form-group>

            <!--Processor-->
            <b-form-group
              :label="$t('general.processor') + ' ' + $t('general.optional')"
              class="form-control-optional">
              <b-form-textarea
                v-model="underUpdateItem.processor"
                :rows="3"
                :placeholder="$t('form.firmware_processor_placeholder')"
                type="text"
                name="processor"
                style="overflow: scroll; height: 300px;"/>
            </b-form-group>


            <!--Buttons-->
            <b-button
              type="button"
              variant="outline-danger"
              class="btn btn-outline-danger float-right"
              @click="prepareForRemove(underUpdateItem)">
              <icon name="delete"/>
            </b-button>
            <b-button
              :disabled="updateEnabled"
              type="button"
              :class="{'btn-loading': uploadingState}"
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
          </b-col>
        </b-row>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityUpdateMixin from '@/mixin/entityUpdate'
import datePicker from 'vue-bootstrap-datetimepicker'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'FirmwareUpdateForm',
  mixins: [EntityUpdateMixin],
  components: { datePicker, FileUploader },
  props: {
    id: {
      type: [Boolean, String],
      default: null,
      required: true
    }
  },
  data () {
    let dateFormat = this.$config.dateFormat.global
    return {
      uploadingState: false,
      dateFormat: dateFormat,
      underUpdateItem: {
        manufacturerId: null,
        productId: null
      },
      underRemoveItem: {},
      updateItemCached: {},
      options: {
        showTodayButton: true,
        format: dateFormat,
        useCurrent: false,
        icons: {
          time: 'icon icon-clock',
          date: 'icon icon-calendar',
          up: 'fas fa-arrow-up',
          down: 'fas fa-arrow-down',
          previous: 'fas fa-chevron-left',
          next: 'fas fa-chevron-right',
          today: 'icon icon-target',
          clear: 'far fa-trash-alt',
          close: 'far fa-times-circle'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      firmwareById: 'basedata/firmwareById',
      manufacturerList: 'basedata/baseData'
    }),
    firmwareUpdate () {
      const item = this.firmwareById(this.id)
      if (item) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
        this.underUpdateItem = this._.cloneDeep(item)
      }      
      const manufacturer = this.manufacturerByFirmware(this.id)
      if (manufacturer) {
        this.underUpdateItem.manufacturerId = manufacturer.id
      }
      const product = this.productByFirmware(this.id)
      if (product) {
        this.underUpdateItem.productId = product.id
      }    
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return JSON.stringify(JSON.decycle(this.updateItemCached)) === JSON.stringify(JSON.decycle(this.underUpdateItem))
    }
  },
  methods: {
    ...mapActions({
      updateItem: 'firmware/update',
      deleteItem: 'firmware/delete'
    }),
    resetFirmware () {
      this.underUpdateItem.productId = null
    },
    // eslint-disable-next-line
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteItem(id).then(() => {
        this.success()
      })
    },
    // eslint-disable-next-line
      @validation
      // eslint-disable-next-line
        @successNotification('Firmware Updated Successfully')
    update (item) {
      var firmware = {
        id: item.id,
        name: item.name,
        description: item.description,
        productId: item.productId,
        technicalSpecFile: item.technicalSpecFile,
        releaseDate: item.releaseDate,
        processor: item.processor
      }
      return this.updateItem(firmware).then(() => {
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
