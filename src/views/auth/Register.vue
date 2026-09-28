<template>
  <ComponentContainer>
    <div class="app page-auth">
      <b-card no-body class="m-auto">
        <b-row no-gutters>
          <b-col 
            class="position-relative offset-sm-2 offset-md-0"
            cols="12"
            sm="8"
            md="6"
            lg="6"
            xl="6">
            <b-card class="page-auth--form-area m-auto px-3 px-sm-5 px-md-3 px-lg-3 px-xl-3 px-xxl-5">
              <div class="justify-content-center text-center mb-5">
                    <router-link :to="{name: 'HomePage'}">
                      <img
                        class="login-logo"
                        :src="`${imageBaseUrl}logo.svg`"
                        alt="ubeac">
                    </router-link>
              </div>
              <h1 class="h2 text-left">{{ $t("auth.register") }}</h1>
              <br />
              <p v-show="false" class="text-desc text-left mb-4">{{ $t("auth.create_your_account") }}</p>
              <b-form
                novalidate
                autocomplete="nope"
                @submit.prevent="registerUser(credentials)">
                   <!--NameSpace-->
                   <b-form-group 
                   class="w-100"
                   :label="$t('general.namespace')">
                     <b-form-input
                       v-focus
                       v-validate="{
                         required: true,
                         min: 6,
                         max: 50,
                         regex: /^[a-z0-9]*$/
                       }"
                       :state="(errors.has('namespace') | isNamespaceExists)  ? false : null"
                       v-model="projectNamespace"
                       :placeholder="$t('general.namespace_placeholder')"
                       size="md"
                       type="text"
                       name="namespace"
                       autocomplete="nope"
                       autofocus
                       required/>
                       <b-form-invalid-feedback v-if="errors.has('namespace')">
                         <span v-for="error in errors.collect('namespace')">
                                      {{ error }}
                         </span>
                       </b-form-invalid-feedback>
                       <b-form-invalid-feedback v-if="isNamespaceExists">
                         <span>
                         {{ $t('validation.custom.namespaceExists') }} 
                         </span>
                       </b-form-invalid-feedback>
                       <b-form-text >{{ $t('form.helpers.namespace') }}</b-form-text>
                   </b-form-group>

                    <!-- Email -->
                   <b-form-group 
                   class="w-100"
                   :label="$t('auth.email')">
                    <b-input-group class="mb-3">
                      <b-form-input                        
                        v-validate="'required|email'"
                        :placeholder="$t('auth.email')"
                        :state="errors.has('email') ? 'invalid' : null"
                        v-model="credentials.email"
                        type="email"
                        name="email"
                        class=""
                        autocomplete="nope" 
                        @focus.native="sendFocusEvent($event)"/>
                      <b-form-invalid-feedback v-if="errors.has('email')">
                        <span v-for="error in errors.collect('email')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>
                   </b-form-group>

                    <!-- Password -->
                   <b-form-group 
                   class="w-100"
                   :label="$t('auth.password')">
                    <b-input-group class="mb-3">
                      <b-form-input
                        v-validate="{
                          required: true,
                          regex: /^(?=.*\d).*(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9].{7,}$/
                        }"
                        ref="password"
                        :state="errors.has('password') ? 'invalid' : null"
                        :placeholder="$t('auth.password')"
                        v-model="credentials.password"
                        type="password"
                        class="form-control "
                        name="password" 
                        @focus.native="sendFocusEvent($event)"/>
                      <b-form-invalid-feedback v-if="errors.has('password')">
                        <span v-for="error in errors.collect('password')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>
                   </b-form-group>

                    <!-- Password Confirm -->
                    <b-input-group
                      v-if="false"
                      class="mb-3">
                      <b-form-input
                        v-validate="'required|confirmed:password'"
                        :state="errors.has('confirmPassword') ? 'invalid' : null"
                        :placeholder="$t('auth.password_again')"
                        v-model="credentials.confirmPassword"
                        type="password"
                        class="form-control "
                        name="confirmPassword"
                        @focus.native="sendFocusEvent($event)"/>
                      <b-form-invalid-feedback v-if="errors.has('confirmPassword')">
                        <span v-for="error in errors.collect('confirmPassword')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>

                    <!-- Captcha -->
                    <vue-recaptcha 
                       v-if="false"
                       @verify="onVerify"
                       :sitekey="Config.captchaSiteKey">
                    </vue-recaptcha>
                    <b-input-group 
                       v-if="false">
                      <input
                        v-validate="'required'"
                        :state="errors.has('captcha') ? 'invalid' : null"
                        v-model="credentials.captcha"
                        type="hidden"
                        name="captcha"/>
                      <b-form-invalid-feedback v-if="errors.has('captcha')">
                        <span v-for="error in errors.collect('captcha')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>
                    <b-form-invalid-feedback v-if="apiErrors.length > 0">
                      <span v-for="error in apiErrors">
                        {{ error.message }} <br>
                      </span>
                    </b-form-invalid-feedback>
                    <!-- Submit -->
                    <div class="text-center">
                      <b-button
                        :class="{ 'btn-loading': auth.loadingRegistration }"
                        variant="success"
                        type="submit"
                        class="mt-4 page-register--create--btn">{{ $t("auth.create_account") }}
                      </b-button>
                    </div>
                    <div class="mt-2 text-center">
                      <span class="page-register--login--text mr-2">
                        {{ $t("auth.have_account") }}
                      </span>
                      <router-link
                        :to="{ name: 'Login', query: utmQuery}"
                        class="px-0 btn btn-link page-register--login--btn">
                        {{ $t("auth.login_now") }}
                      </router-link>
                    </div>
              </b-form>
            </b-card>
          </b-col>
          <b-col 
            md="6"
            class="register-page-artwork d-none d-md-block"> 
            <div class="register-page-artwork--solid"></div>           
            <div class="register-page-artwork--gradiant"></div>           
            <div
              :style="{'background-image': `url(${imageBaseUrl}artworks/auth.png)`}"
              class="register-page-artwork--artwork"></div>           
          </b-col>
        </b-row>
      </b-card>
    </div>
  </ComponentContainer>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import Config from '@/config/config'
import VueRecaptcha from 'vue-recaptcha'
import Utils from '@/helpers/utils'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'RegisterPage',
  components: {VueRecaptcha},
  mixins: [EntitiesMixin],
  data () {
    return {
      isNamespaceExists: null,
      projectNamespace: null,
      credentials: {
        captcha: null,
        email: '',
        password: '',
        confirmPassword: ''
      },
      apiErrors: [],
      eventModel: {
        action:'sign_up',
        category:'User SignUp',
        label:'',
        value:0,
        userId:'',
        teamNamespace: ''
      },
      utmQuery: {}
    }
  },
  created () {
    Utils.loadjscssfile(`https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit`, 'js')
    this.setUtm()
    var x = this.utm.source ? this.utm.source : 'ubeac'
    this.eventModel.label = 'New user with source ' + x
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      login: 'auth/login',
      addTeam: 'team/add'
    }),
    checkNamespaceExists () {
      let namespace = this.projectNamespace
      let promise = new Promise( (resolve, reject)=> {
        this.fetchNamespaceExists(namespace).then((response) => {
          this.isNamespaceExists = response.body.data
          if (response.body.data === false) {
            resolve()
            this.happyNamesapce = true
            this.lastApprovedNamespace = namespace
          } else {
            reject()
          }
        })
      })
      return promise
    },
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'      
      // this.sendGtagEvent(this.eventModel)
    },
    setUtm () {
      this.utm.source = this.$route.query.utm_source ? this.$route.query.utm_source : ''
      this.utm.medium = this.$route.query.utm_medium ? this.$route.query.utm_medium : ''
      this.utm.campaign = this.$route.query.utm_campaign ? this.$route.query.utm_campaign : ''

      if(this.utm.source != '' && this.utm.medium!='' && this.utm.campaign != '')
      {
        this.utmQuery.utm_source = this.utm.source
        this.utmQuery.utm_medium = this.utm.medium
        this.utmQuery.utm_campaign = this.utm.campaign
      }
    },
    onVerify (recievedKey) {
      this.credentials.captcha = recievedKey
      this.$validator.validateAll()
    },
    addTeamPrivate (item) {
      return this.addTeam(item)
    },
    _setWorkspaceTeamId (teamId) {
      this.setWorkspaceTeamId(teamId)
      this.$store.dispatch('layout/setBaseDataLoadedStatus', false)
      this.$store.dispatch('workspace/setTeamId', teamId)
      window.localStorage.setItem('workspaceTeamId', teamId)
      window.location = Config.defaultRoute.afterLogin
    },
    @validation
    registerUser () {
      this.apiErrors  = []
      this.checkNamespaceExists().then(() => {
        this.register(this.credentials).then((data) => {
          this.login(this.credentials).then((result) => {
            // this.sendGtagEvent(this.eventModel)
            this.addTeamPrivate({
              name: this.projectNamespace,
              namespace: this.projectNamespace
            }).then((team) => {
              this._setWorkspaceTeamId(team.body.data)
            }).catch((error) => {
              this.apiErrors = error.body.errors
            })
          }).catch((error) => {
              this.apiErrors = error.body.errors
          })
        }).catch((error) => {
          this.apiErrors = error.body.errors
        })
      }).catch((error) => {
      })
    }
  }
}
</script>
