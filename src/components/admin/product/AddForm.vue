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
            lg="8"
            xl="8"
            order="2"
            order-sm="1">
            <!--Name-->
            <b-form-group :label="$t('general.name')">
              <b-form-input
                v-validate.disable="'required'"
                :state="errors.has('name') ? 'invalid' : null"
                v-model="insertItem.name"
                :placeholder="$t('form.product_name_placeholder')"
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
                :placeholder="$t('form.product_description_placeholder')"
                type="text"
                name="description"/>
            </b-form-group>

            <!--URL-->
            <b-form-group :label="$t('general.url')">
              <b-form-input
                v-validate.disable="'required'"
                :state="errors.has('url') ? 'invalid' : null"
                v-model="insertItem.url"
                :placeholder="$t('form.product_url_placeholder')"
                type="text"
                name="url"
                autofocus
                required/>
              <b-form-invalid-feedback v-if="errors.has('url')">
                <span v-for="error in errors.collect('url')">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
            </b-form-group>

            <!--View Order-->
            <b-form-group
              :label="$t('general.view_order')">
              <b-form-input
                v-model="insertItem.viewOrder"
                :rows="2"
                :placeholder="$t('form.product_view_order_placeholder')"
                type="number"
                name="View Order"/>
            </b-form-group>

            <!--Selected Manufacturer-->
            <b-form-group :label="$t('form.selected_manufacturer')">
              <b-form-select
                v-validate="'required'"
                v-model="insertItem.manufacturerId"
                :state="errors.has('selectedManufacturer') ? 'invalid' : null"
                name="selectedManufacturer">
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

            <!---- Manual File -->
            <b-form-group :label="$t('form.manual_file')">
              <FileUploader
                v-model="insertItem.manualFile"
                file-type="file"
                @startUploading="uploadingState = true"
                @stopUploading="uploadingState = false" />
            </b-form-group>

            <!---- Spec File -->
            <b-form-group :label="$t('form.technical_spec')">
              <FileUploader
                v-model="insertItem.technicalSpecFile"
                file-type="file"
                @startUploading="uploadingState = true"
                @stopUploading="uploadingState = false" />
            </b-form-group>

          </b-col>
          <b-col
            cols="12"
            sm="5"
            md="5"
            lg="4"
            xl="4"
            order="1"
            order-sm="2">
            <div>
            <!--Plan Image-->
              <b-form-group
                :label="$t('form.product_image')"
                label-for="logoUploader">
                <file-uploader
                  v-model="insertItem.image"
                  :prefill-options="logoFileUploaderOptions"
                  @startUploading="uploadingState = true"
                  @stopUploading="uploadingState = false" />
                <b-form-input
                  v-validate="'required'"
                  :state="errors.has('image') ? 'invalid' : null"
                  v-model="insertItem.image"
                  :placeholder="$t('form.image')"
                  type="text"
                  class="hidden-input"
                  name="image"
                  required/>
                <b-form-invalid-feedback v-if="errors.has('image')">
                  <span v-for="error in errors.collect('image')">
                    {{ error }}
                  </span>
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
        </b-row>

        <!--Buttons-->
        <b-button
          type="button"
          class="btn btn-success float-left mr-2"
          :class="{'btn-loading': uploadingState}"
          @click="addProduct(insertItem)">
          {{ $t("buttons.submit") }}
        </b-button>
        <b-button
          type="button"
          variant="secondary"
          class="float-left"
          @click="cancel()">
          {{ $t("buttons.cancel") }}
        </b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'ProductAddForm',
  components: {FileUploader},
  mixins: [EntityAddMixin],
  data () {
    return {
      uploadingState: false,
      logoFileUploaderOptions: {
        fileName: 'image',
        fileType: 'png',
        mediaType: 'image/png'
      },
      insertItem: {
        name: '',
        description: '',
        image: '',
        viewOrder: 0,
        url: '',
        manufacturerId: ''
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
      addItem: 'product/add'
    }),
    success () {
      this.$emit('success')
    },
    cancel () {
      this.$emit('cancel')
    },
    @validation
      @successNotification('Product was Added Successfully')
      addProduct (item) {
        return this.addItem(item).then(() => {
          if (this.Product !== null && this.Product !== '') {
            // TODO: be careful about next line
            this.success()
          }
        })
      }
  }
}
</script>
