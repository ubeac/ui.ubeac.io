<template>
  <b-card no-body>
    <b-card-body class="px-3">
      <b-form
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
                v-model="insertItem.name"
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
                v-model="insertItem.description"
                :rows="2"
                :placeholder="$t('form.firmware_description_placeholder')"
                type="text"
                name="description"/>
            </b-form-group>

            <!--Selected Manufacturer-->
            <b-form-group :label="$t('form.selected_manufacturer')">
              <b-form-select
                v-validate="'required'"
                v-model="insertItem.manufacturerId"
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
              v-if="insertItem.manufacturerId && manufacturerById(insertItem.manufacturerId)"
              :label="$t('form.selected_product')">
              <b-form-select
                v-validate="'required'"
                v-model="insertItem.productId"
                :state="errors.has('productId') ? 'invalid' : null"
                name="productId">
                <option
                  v-for="product in manufacturerById(insertItem.manufacturerId).products"
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
                  v-model="insertItem.releaseDate"
                  :placeholder="$t('data.release_date')"
                  :dateShortener="{enabled: true}"
                  :config="options"
                  class="form-control"/>
              </b-input-group>
            </b-form-group>

            <!---- Spec File -->
            <b-form-group :label="$t('form.technical_spec')">
              <FileUploader
                v-model="insertItem.technicalSpecFile"
                file-type="file"
                @startUploading="uploadingState = true"
                @stopUploading="uploadingState = false" />
            </b-form-group>

            <!--Processor-->
            <b-form-group
              :label="$t('general.processor') + ' ' + $t('general.optional')"
              class="form-control-optional">
              <b-form-textarea
                v-model="insertItem.processor"
                :rows="2"
                :placeholder="$t('form.firmware_processor_placeholder')"
                type="text"
                name="processor"/>
            </b-form-group>

            <!--Buttons-->
            <b-button
              type="button"
              :class="{'btn-loading': uploadingState}"
              class="btn btn-success float-left mr-2"
              @click="addFirmware(insertItem)">
              {{ $t("buttons.submit") }}
            </b-button>
            <b-button
              type="button"
              variant="secondary"
              class="float-left"
              @click="cancel()">
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
import EntityAddMixin from '@/mixin/entityAdd'
import datePicker from 'vue-bootstrap-datetimepicker'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'FirmwareAddForm',
  components: { datePicker, FileUploader },
  mixins: [EntityAddMixin],
  data () {
    let dateFormat = this.$config.dateFormat.global
    return {
      uploadingState: false,
      dateFormat: dateFormat,
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
      },
      insertItem: {
        name: '',
        description: '',
        processor: '',
        productId: '',
        releaseDate: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      manufacturerList: 'basedata/baseData'
    })
  },
  methods: {
    ...mapActions({
      addItem: 'firmware/add'
    }),
    success () {
      this.$emit('success')
    },
    cancel () {
      this.$emit('cancel')
    },
    resetFirmware () {
      this.insertItem.productId = null
    },
    @validation
      @successNotification('Firmware was Added Successfully')
      addFirmware (item) {
        return this.addItem(item).then(() => {
          if (this.Firmware !== null && this.Firmware !== '') {
              // TODO: be careful about next line
                this.success()
          }
        })
      }
  }
}
</script>
