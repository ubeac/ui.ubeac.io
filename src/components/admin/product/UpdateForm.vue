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
        v-if="productUpdate"
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
                v-model="underUpdateItem.name"
                :placeholder="$t('form.manufacturer_name_placeholder')"
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
                :placeholder="$t('form.manufacturer_description_placeholder')"
                type="text"
                name="description"/>
            </b-form-group>

            <!--URL-->
            <b-form-group :label="$t('general.url')">
              <b-form-input
                v-validate.disable="'required'"
                :state="errors.has('url') ? 'invalid' : null"
                v-model="underUpdateItem.url"
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
                v-model="underUpdateItem.viewOrder"
                :rows="2"
                :placeholder="$t('form.product_view_order_placeholder')"
                type="number"
                name="viewOrder"/>
            </b-form-group>

            <!--Selected Manufacturer-->
            <b-form-group :label="$t('form.selected_manufacturer')">
              <b-form-select
                v-validate="'required'"
                v-model="underUpdateItem.manufacturerId"
                :state="errors.has('selectedManufacturer') ? 'invalid' : null"
                name="selectedManufacturer"
                class="mb-0">
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
                v-model="underUpdateItem.manualFile"
                file-type="file"
                @startUploading="uploadingState = true"
                @stopUploading="uploadingState = false" />
            </b-form-group>

            <!---- Spec File -->
            <b-form-group :label="$t('form.technical_spec')">
              <FileUploader
                v-model="underUpdateItem.technicalSpecFile"
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
                label-for="imageUploader">
                <file-uploader
                  v-model="underUpdateItem.image"
                  :prefill-options="imageFileUploaderOptions"
                  @startUploading="uploadingState = true"
                  @stopUploading="uploadingState = false" />
                <b-form-input
                  v-validate="'required'" :state="errors.has('image') ? 'invalid' : null"
                  v-model="underUpdateItem.image"
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
          variant="outline-danger"
          class="btn btn-outline-danger float-right"
          @click="prepareForRemove(underUpdateItem)">
          <icon name="delete"/>
        </b-button>
        <b-button
          :disabled="updateEnabled"
          type="button"
          class="btn btn-success float-left mr-2"
          :class="{'btn-loading': uploadingState}"
          @click="update(underUpdateItem)">
          {{ $t("buttons.submit") }}
        </b-button>
        <b-button
          type="button"
          class="btn btn-secondary float-left"
          @click="cancel">
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
import EntityUpdateMixin from '@/mixin/entityUpdate'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'ProductUpdateForm',
  components: {FileUploader},
  mixins: [EntityUpdateMixin],
  props: {
    id: {
      type: [Boolean, String],
      default: null,
      required: true
    }
  },
  data () {
    return {
      uploadingState: null,
      imageFileUploaderOptions: {
        fileName: 'image',
        fileType: 'png',
        mediaType: 'image/png'
      },
      underUpdateItem: {},
      underRemoveItem: {},
      updateItemCached: {}
    }
  },
  computed: {
    ...mapGetters({
      productById: 'basedata/productById',
      manufacturerList: 'basedata/baseData'
    }),
    productUpdate () {
      const item = this.productById(this.id)
      if (item) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
      }
      this.underUpdateItem = this._.cloneDeep(item)
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return JSON.stringify(JSON.decycle(this.updateItemCached)) === JSON.stringify(JSON.decycle(this.underUpdateItem))
    }
  },
  methods: {
    ...mapActions({
      updateItem: 'product/update',
      deleteItem: 'product/delete'
    }),
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteItem(id).then(() => {
        this.success()
      })
    },
      @validation
        @successNotification('Product Updated Successfully')
    update (item) {
      var product = {
        id: item.id,
        name: item.name,
        description: item.description,
        manufacturerId: item.manufacturerId,
        image: item.image,
        manualFile: item.manualFile,
        url: item.url,
        viewOrder: item.viewOrder,
        technicalSpecFile: item.technicalSpecFile
      }
      return this.updateItem(product).then(() => {
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
