<template>
  <ComponentContainer>
  <b-card no-body>
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
        {{ $t("modal.delete_floor_warning") }}
      </b-alert>
      <span v-if="underRemoveItem">
        {{ $t("modal.delete_info_1") }} <b>{{ underRemoveItem.name }}</b>.
        {{ $t("modal.delete_info_2") }}
      </span>
    </b-modal>
    <b-card-body
      class="px-0 pb-0 pt-1">
      <b-form
        inline
        v-if="floorUpdate"
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <!--Plan Image-->
        <b-form-group
          :label="$t('form.floor_plan')"
          label-for="logoUploader">
          <file-uploader
            class="pr-2"
            v-model="underUpdateItem.planFileId"
            :prefill-options="planFileUploaderOptions"
            @onRemove="onRemovePlan"
            @startUploading="uploadingState = true"
            @stopUploading="uploadingState = false" />
            <b-form-input
              v-validate="'required'"
              :state="errors.has('planFileId') ? false : null"
              v-model="underUpdateItem.planFileId"
              type="text"
              class="hidden-input"
              name="planFileId"
              required
              placeholder="planFileId"/>
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
            v-model="underUpdateItem.name"
            :placeholder="$t('general.name')"
            type="text"
            size="md"
            class="col-xl-6"
            autofocus
            name="name"/>
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
            v-validate="{
                         min: 0,
                         max: 500
                         }"
            :state="errors.has('description') ? 'invalid' : null"
            v-model="underUpdateItem.description"
            :placeholder="$t('general.description') + ' ' + $t('general.optional')"
            :rows="2"
            type="text"
            size="md"
            class="col-xl-6"
            name="description"/>
            <b-form-invalid-feedback v-if="errors.has('description')">
              <span
                v-for="(error , index) in errors.collect('description')"
                :key="index" >
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>
        <div class="form-row form-button-row p-3 mx-0">
          <!--Buttons-->
          <b-button
            type="button"
            variant="outline-danger"
            class="btn float-right text-right"
            @click="prepareForRemove(underUpdateItem)">
            <icon name="delete"/>
            <span
              v-if="!browser.isMobile"
              class="ml-1">
              {{ $t('buttons.delete') }}
            </span>
          </b-button>
          <b-button
            :class="{'btn-loading': uploadingState}"
            :disabled="updateEnabled || uploadingState"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="update(underUpdateItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            :disabled="uploadingState"
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
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
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import FileUploader from '@/components/FileUploader'
import EntityUpdateMixin from '@/mixin/entityUpdate'

export default {
  name: 'FloorsUpdateForm',
  components: {FileUploader},
  mixins: [EntityUpdateMixin],
  data () {
    return {
      uploadingState: false,
      underUpdateItem: {},
      planFileUploaderOptions: {
        fileName: 'image',
        fileType: 'png',
        mediaType: 'image/png'
      },
      underRemoveItem: {},
      updateItemCached: {}
    }
  },
  computed: {
    floorItem () {
      return this.floorById(this.id)
    },
    floorUpdate () {
      const item = this.floorItem
      if (item) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = Object.assign({}, item)
        }
      }
      this.underUpdateItem = Object.assign({}, item)
      return this.underUpdateItem
    },
    updateEnabled () {
      return JSON.stringify(this.updateItemCached) === JSON.stringify(this.underUpdateItem)
    }
  },
  methods: {
    onRemovePlan (payload) {
      this.underUpdateItem[payload.model] = ''
    },
    // Please Dry Me
    getFileUrl (fileId) {
      return FileUploader.methods.returnFileUrl(fileId)
    },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteFloor(id).then(() => {
        this.$router.go(-1)
        this.success()
      })
    },
      @validation
        @successNotification('Floor Updated Successfully')
    update (item) {
      const floor = {
        id: item.id,
        name: item.name,
        description: item.description,
        buildingId: item.buildingId,
        teamId: this.workspaceId,
        planFileId: item.planFileId
      }
      return this.updateFloor(floor).then(() => {
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
