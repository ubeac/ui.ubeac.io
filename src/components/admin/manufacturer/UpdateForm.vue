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
        v-if="manufacturerUpdate"
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

            <!-- Website -->
            <b-form-group :label="$t('general.website')">
              <b-form-input
                v-validate.disable="'required'"
                :state="errors.has('website') ? 'invalid' : null"
                v-model="underUpdateItem.website"
                :placeholder="$t('form.manufacturer_website_placeholder')"
                type="text"
                name="website"
                autofocus
                required/>
              <b-form-invalid-feedback v-if="errors.has('website')">
                <span v-for="error in errors.collect('website')">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
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
                :label="$t('form.manufacturer_logo')"
                label-for="logoUploader">
                <file-uploader
                  v-model="underUpdateItem.logo"
                  :prefill-options="logoFileUploaderOptions"
                  @startUploading="uploadingState = true"
                  @stopUploading="uploadingState = false"
                  @onUpload="onUpload"/>
                <b-form-input
                  v-validate="'required'"
                  :state="errors.has('logo') ? 'invalid' : null"
                  v-model="underUpdateItem.logo"
                  :placeholder="$t('form.logo')"
                  type="text"
                  class="hidden-input"
                  name="logo"
                  required/>
                <b-form-invalid-feedback v-if="errors.has('logo')">
                  <span v-for="error in errors.collect('logo')">
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
  name: 'ManufacturerUpdateForm',
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
      logoFileUploaderOptions: {
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
      manufacturerById: 'basedata/manufacturerById'
    }),
    manufacturerUpdate () {
      const item = this.manufacturerById(this.id)
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
      updateItem: 'manufacturer/update',
      deleteItem: 'manufacturer/delete'
    }),
    onUpload (payload) {
      this.underUpdateItem[payload.model] = payload.id
    },
    // Please Dry Me
    getFileUrl (fileId) {
      return FileUploader.methods.returnFileUrl(fileId)
    },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteItem(id).then(() => {
        this.success()
      })
    },
      @validation
        @successNotification('Manufacturer Updated Successfully')
    update (item) {
      var manufacturer = {
        id: item.id,
        name: item.name,
        description: item.description,
        website: item.website,
        logo: item.logo        
      }
      return this.updateItem(manufacturer).then(() => {
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
