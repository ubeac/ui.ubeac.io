<template>
  <ComponentContainer>
    <b-card
      no-body>
      <b-card-body 
        class="px-0 pb-0 pt-1">
        <b-form
          inline
          class="needs-validation"
          autocomplete="nope"
          novalidate>
          <!--Plan Image-->
          <b-form-group
            :label="$t('form.floor_plan')"
            label-for="logoUploader">
            <file-uploader
              class="pr-2"
              v-model="insertItem.planFileId"
              :prefill-options="planFileUploaderOptions"
              @startUploading="uploadingState = true"
              @stopUploading="uploadingState = false"/>
            <b-form-input
              v-validate="'required'"
              :state="errors.has('planFileId') ? false : null"
              v-model="insertItem.planFileId"
              :placeholder="$t('form.plan_file')"
              type="text"
              class="hidden-input"
              name="planFileId"
              required/>
            <b-form-invalid-feedback v-if="errors.has('planFileId')">
              <span v-for="error in errors.collect('planFileId')">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
          </b-form-group>
          <!--Name-->
          <b-form-group :label="$t('general.name')">
            <b-form-input
              v-validate="{
                           required: true,
                           min: 2,
                           max: 150
                           }"
              :state="errors.has('name') ? false : null"
              v-model="insertItem.name"
              :placeholder="$t('general.name')"
              type="text"
              size="md"
              class="col-xl-6"
              autofocus
              name="name"
              required/>
            <b-form-invalid-feedback v-if="errors.has('name')">
              <span v-for="error in errors.collect('name')">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
          </b-form-group>
          <!--Description-->
          <b-form-group :label="$t('general.description') + ' ' + $t('general.optional')"
            class="form-control-optional">
            <b-form-textarea
              v-validate="{
                           min: 0,
                           max: 500
                           }"
              :state="errors.has('description') ? 'invalid' : null"
              v-model="insertItem.description"
              :placeholder="$t('general.description') + ' ' + $t('general.optional')"
              :rows="2"
              size="md"
              class="col-xl-6"
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
          <div class="form-row form-button-row p-3 mx-0">
            <b-button
              :class="{'btn-loading': uploadingState}"
              :disabled="uploadingState"
              type="button"
              class="btn btn-success float-left mr-2"
              @click="addBuilding(insertItem)">
              {{ $t("buttons.submit") }}
            </b-button>
            <b-button
              :disabled="uploadingState"
              type="button"
              variant="secondary"
              class="float-left"
              @click="cancel()">
              {{ $t("buttons.cancel") }}
            </b-button>
          </div>
          <div
            class="mr-3 ml-3 mb-3 w-100 mt-2">
            <HelpCard
              class="p-0 m-0 w-100"
              :url="Config.docs.floor"
              :text="$t('help_cards.floor')" />
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import {mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import FileUploader from '@/components/FileUploader'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'FloorAddForm',
  components: {FileUploader},
  mixins: [EntitiesMixin],
  props: {
    buildingId: {
      type: [String, Boolean],
      default: null,
      required: true
    }
  },
  data () {
    return {
      uploadingState: false,
      planFileUploaderOptions: {
        fileName: 'image',
        fileType: 'png',
        mediaType: 'image/png'
      },
      insertItem: {
        name: '',
        description: '',
        planFileId: '',
        buildingId: ''
      }
    }
  },
  mounted () {
    this.insertItem.buildingId = this.buildingId
  },
  methods: {
    ...mapActions({
      addItem: 'floor/add',
      deleteItem: 'floor/delete',
      updateItem: 'floor/update'
    }),
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
        @successNotification('Floor Added Successfully')
    addBuilding (item) {
      item.teamId = this.workspaceId
      return this.addItem(item).then(async () => {
        this.success()
      })
    }
  }
}
</script>
