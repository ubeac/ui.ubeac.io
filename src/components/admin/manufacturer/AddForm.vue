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
                v-model="insertItem.description"
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
                v-model="insertItem.website"
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
                  v-model="insertItem.logo"
                  :prefill-options="logoFileUploaderOptions"
                  @startUploading="uploadingState = true"
                  @stopUploading="uploadingState = false"
                  @onUpload="onUpload"/>
                <b-form-input
                  v-validate="'required'"
                  :state="errors.has('logo') ? 'invalid' : null"
                  v-model="insertItem.logo"
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
          class="btn btn-success float-left mr-2"
          @click="addManufacturer(insertItem)">
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
import {mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'
import FileUploader from '@/components/FileUploader'

export default {
  name: 'ManufacturerAddForm',
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
        website: '',
        logo: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addItem: 'manufacturer/add'
    }),
    onUpload (payload) {
      this.insertItem[payload.model] = payload.id
    },
    // Please Dry Me
    getFileUrl (fileId) {
      return FileUploader.methods.returnFileUrl(fileId)
    },
    success () {
      this.$emit('success')
    },
    cancel () {
      this.$emit('cancel')
    },
    @validation
    @successNotification('Manufacturer Added Successfully')
    addManufacturer (item) {
      return this.addItem(item).then(() => {
        if (this.Manufacturer !== null && this.Manufacturer !== '') {
          // TODO: be careful about next line
          this.success()
        }
      })
    }
  }
}
</script>
