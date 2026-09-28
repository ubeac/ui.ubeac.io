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
                    <p class="text-desc my-2"> 
                      {{ $t("auth.welcome") }}
                    </p>
              </div>
              <h1 class="h2 text-left">{{ $t("auth.login") }}</h1>
              <p class="text-desc text-left mb-4">{{ $t("auth.signin_to_account") }}</p>
              <b-form
                    novalidate
                    autocomplete="nope"
                    @submit.prevent="loginUser(credentials)">
                    <!-- Email -->
                    <b-input-group class="mb-3">
                      <!-- v-focus (move it to b-form-input email) -->
                      <b-form-input
                        v-validate="'required|email'"
                        :placeholder="$t('auth.email')"
                        :state="errors.has('email') ? false : true"
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

                    <!-- Password -->
                    <b-input-group class="mb-3">
                      <b-form-input
                        v-validate="'required'"
                        :state="errors.has('password') ? false : true"
                        :placeholder="$t('auth.password')"
                        v-model="credentials.password"
                        type="password"
                        name="password"
                        class="form-control" 
                        @focus.native="sendFocusEvent($event)"/>
                      <b-form-invalid-feedback v-if="errors.has('password')">
                        <span v-for="error in errors.collect('password')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>
                    <div class="page-auth--forgotpass--btn">
                      <router-link
                        class="px-0 btn btn-link"
                        :to="{ name: 'ForgotPassword', query: utmQuery}">{{ $t("auth.ask_forgot_pass") }}
                      </router-link>
                    </div>
                    
                    <!-- Submit -->
                    <div class="text-center">
                      <b-button
                        :class="{ 'btn-loading': auth.loadingLogin }"
                        variant="success"
                        type="submit"
                        class="mt-4 page-register--create--btn">
                         {{ $t("auth.login") }}
                      </b-button>
                    </div>
                    <div class="mt-2 text-center">
                      <span class="page-register--login--text mr-2">
                        {{ $t("auth.have_not_account") }}
                      </span>
                      <router-link
                        :to="{ name: 'Register', query: utmQuery}"
                        class="px-0 btn btn-link page-register--login--btn">
                        {{ $t("auth.signup_now") }}
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
import Config from '@/config/config'
import validation from '@/decorators/validation'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'LoginPage',
  mixins: [EntitiesMixin],
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      msg: '',
      eventModel: {
        action:'login',
        category:'User Login',
        label:'',
        value:0,
        userId:'',
        teamNamespace: ''
      },
      utmQuery: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  created ()
  {
    var x = this.utm.source ? this.utm.source : 'ubeac'
    this.eventModel.label = 'Active user with source ' + x
  },
  mounted () {
    window.localStorage.removeItem('workspaceTeamId')
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
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
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'      
      // this.sendGtagEvent(this.eventModel)
    },
      @validation
    loginUser () {
      this.login(this.credentials).then((result) => {
        // this.sendGtagEvent(this.eventModel)
        if (this.$router.currentRoute.query.redirect === '/login') {
          this.$router.currentRoute.query.redirect = null
        }
        window.location = this.$router.currentRoute.query.redirect || Config.defaultRoute.afterLogin
      }).catch((error) => {
        this.msg = error.bodyText
      })
    }
  }
}
</script>
