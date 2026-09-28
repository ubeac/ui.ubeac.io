<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list pt-0 page-profile">
      <div class="page-content-header center mb-2 mt-4">
        <h1 class="card-text text-center h2 mb-2">
          {{ $t('general.profile') }}
        </h1>
        <div class="btn-top-form">
          <!-- <router-link
             v-if="!readonly"
             :to="{name: 'ChangePassword'}"
             class="btn btn-outline-info mr-3">
            {{ $t("auth.change_pass") }}
          </router-link> -->
          <router-link
             :to="{name: 'Teams'}"
             class="btn btn-outline-info">
            <icon
             name="arrow-right"
             class="mr-1"/>
            <span>
              {{ $t("general.back_to_projects") }}
            </span>
          </router-link>
        </div>
      </div>
      <b-container class="p-0" fluid>
        <b-row>
          <b-col>
            <b-card no-body>
              <b-link
                   v-if="readonly"
                   v-b-tooltip
                   :title="$t('buttons.settings')"
                   :readonly="readonly"
                   @click="formSetting"
                   class="text-muted btn btn-fab btn-success profile-form-setting">
                <icon
                  name="setting"/>
              </b-link>
              <b-link
                  v-if="!readonly"
                  v-b-tooltip
                  :title="$t('buttons.cancel')"
                  :readonly="readonly"
                  @click="formSetting"
                  class="text-muted btn btn-fab btn-success profile-form-setting">
                <icon
                  name="cancel"/>
              </b-link>
              <b-form
                inline
                class="pb-1"
                autocomplete="nope">
                <div class="py-3 w-100 pl-3">
                  <div class="avatar-image">
                    <div
                       v-if="readonly"
                       class="avatar-container-circular" >
                       <img
                       :src="avatar"
                       alt="Profile Avatar">
                    </div>
                      <file-uploader
                       v-if="!readonly"
                       v-model="underEditProfile.picture"
                      :prefill-options="avatarFileUploaderOptions"
                      model="picture"
                      @onRemove="onRemovePlan"
                      @onUpload="onUpload"/>
                  </div>
                  <div class="float-left primary-color pt-4 profile-user--info">
                        <span class="h3 w-100 d-block"> 
                          {{ underEditProfile.email }} 
                        </span>
                        <span class="w-100 d-block"> 
                          {{ $t('data.create_date') }} : {{ underEditProfile.createDate | date }}
                        </span>
                        <span class="w-100 d-block"> 
                          {{ $t('general.update') }} : 
                          {{ underEditProfile.updateDate | moment("from") }} 
                        </span>
                  </div>
                </div>

                  <div 
                    v-if="userInfo && userInfo.email_verified === false"
                    class="lined noline">
                    <b-alert
                      show
                      size="md"
                      class="h5 py-3 pl-3 px-2 alert-email-verified"
                      variant="danger">
                      <icon
                        class="pr-2 float-left"
                        name="danger" />
                      <span class="alert-text">
                        {{ $t('messages.not_verified_email') }}
                      </span>
                      <b-button
                        variant="outline-danger"
                        class="px-3 px-sm-4 px-md-5 mt-2 mt-sm-0 ml-0 ml-sm-3"
                        :class="{'btn-loading': resendVerificationLoading}"
                        @click="resendVerification()">
                        {{ $t("auth.resend_email") }}
                      </b-button>
                    </b-alert>
                </div>

                <b-form-group
                  :class="{ 'noline': userInfo && userInfo.email_verified === false }"
                  :label="$t('form.first_name') + ' ' + $t('general.optional')"
                  class="form-control-optional">
                  <b-form-input
                    :readonly="readonly"
                    v-model="underEditProfile.firstName"
                    :placeholder="$t('form.first_name')"
                    type="text"
                    ref="autofocus"
                    name="firstName"/>
                </b-form-group>

                <b-form-group
                  :label="$t('form.last_name') + ' ' + $t('general.optional')"
                  class="form-control-optional">
                  <b-form-input
                    :readonly="readonly"
                    v-model="underEditProfile.lastName"
                    :placeholder="$t('form.last_name')"
                    type="text"
                    name="lastName"/>
                </b-form-group>

                <b-form-group
                  :label="$t('auth.change_pass')"
                  v-if="readonly"
                  class="form-control-optional">
                  <div>
                    <router-link
                      :to="{name: 'ChangePassword'}"
                      class="btn btn-outline-danger mr-3">
                      <icon
                        name="key"
                        class="mr-1"/>
                      {{ $t("auth.change_pass") }}
                    </router-link>
                    <!-- <span class="text-muted d-block py-2">{{ $t('auth.update_pass_warning')
                      }}</span> -->
                  </div>
                </b-form-group>

                <b-form-group
                  :label="$t('form.phone_number') + ' ' + $t('general.optional')"
                  class="form-control-optional">
                  <b-form-input
                    :readonly="readonly"
                    v-model="underEditProfile.phoneNumber"
                    :placeholder="$t('form.phone_number')"
                    type="number"
                    name="phoneNumber"/>
                </b-form-group>

                <b-form-group
                  :label="$t('form.website') + ' ' + $t('general.optional')"
                  class="form-control-optional">
                  <b-form-input
                    :readonly="readonly"
                    v-model="underEditProfile.webSite"
                    :placeholder="$t('form.website')"
                    type="text"
                    name="website"/>
                </b-form-group>

                <!--Address-->
                <AddressForm
                  :readonly="readonly"
                  @setPlace="disableDisableButton = false"
                  v-model="underEditProfile.address" />

                <div class="form-row form-button-row p-3">
                  <b-button
                    :disabled="updateEnabled && disableDisableButton"
                    type="button"
                    class="btn btn-success float-left  mr-2"
                    @click="prepareForUpdate(underEditProfile)">
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
            </b-card>
            <HelpCard
              :url="Config.docs.registration"
              :text="$t('help_cards.registration')" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </ComponentContainer>
</template>

<script>
import {mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import FileUploader from '@/components/FileUploader'
import datePicker from 'vue-bootstrap-datetimepicker'
import EntitiesMixin from '@/mixin/entities'
import AddressForm from '@/components/AddressForm'

export default {
  name: 'ProfilePage',
  components: {FileUploader, datePicker, AddressForm},
  mixins: [EntitiesMixin],
  data () {
    return {
      disableDisableButton: true,
      resendVerificationLoading: false,
      date: new Date(),
      avatarFileUploaderOptions: {
        fileName: 'image',
        fileType: 'png',
        mediaType: 'image/png'
      },
      underEditProfile: {
        address:{}
      },
      cachedProfile: {},
      readonly: true
    }
  },
  computed: {
    updateEnabled () {
      return JSON.stringify(this.cachedProfile) ===
        JSON.stringify(this.underEditProfile)
    },
    avatar () {
      // TODO: need cleanup
      let out = `${this.imageBaseUrl}avatars/default.svg`
      if (this.$store.state.user.user && this.$store.state.user.user.profile) {
        let avatarId = this.$store.state.user.user.profile.picture
        if (this && avatarId !== 'undefined' && avatarId !== '00000000-0000-0000-0000-000000000000') {
          out = FileUploader.methods.returnFileUrl(avatarId)
        }
      }
      return out
    }
  },
  mounted () {
    this.getProfile().then(() => {
      this.underEditProfile = this.user.user.profile
      if (this.underEditProfile.address === null) {
        this.underEditProfile.address = {}
      }
      this.cachedProfile = this._.cloneDeep(this.underEditProfile)
    })
  },
  methods: {
    ...mapActions({
      updateProfile: 'user/updateUserProfile',
      getProfile: 'user/getProfile'
    }),
    onUpload (payload) {
      this.avatarFileUploaderOptions[payload.model] = payload.id
      this.underEditProfile.picture = this.avatarFileUploaderOptions[payload.model]
    },
    onRemovePlan (payload) {
      this.underEditProfile[payload.model] = '00000000-0000-0000-0000-000000000000'
    },
    // Please Dry Me
    getFileUrl (fileId) {
      return FileUploader.methods.returnFileUrl(fileId)
    },
      @successNotification('New verification email sent to your email address.')
    resendVerification () {
      this.resendVerificationLoading = true
      let promise = this.resendVerificationEmail().then(() => {
        this.resendVerificationLoading = false
      })
      return promise
    },
    cancel () {
      this.$router.go(-1)
    },
      @validation
      @successNotification('Update Done')
    prepareForUpdate (underEditProfile) {
      let promise = this.updateProfile(underEditProfile)
      promise.then(() => {
        this.$router.push({ name: 'Teams'})
      })
      return promise
    }
  }
}
</script>
