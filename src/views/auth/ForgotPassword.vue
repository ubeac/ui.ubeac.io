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
                    <router-link :to="{name: 'Home'}">
                      <img
                        class="login-logo"
                        :src="`${imageBaseUrl}logo.svg`"
                        alt="ubeac">
                    </router-link>
              </div>
              <h1 class="h2 text-left">{{ $t("auth.forgot_pass") }}</h1>
              <p class="text-desc text-left mb-4">{{ $t("auth.forgot_pass_placeholder") }}</p>
              <b-form
                   novalidate
                    autocomplete="nope"
                    @submit.prevent="send(input)">
                    <!-- Email -->
                    <b-input-group class="mb-3">
                      <b-form-input
                        v-focus
                        v-validate="'required|email'"
                        :state="errors.has('email') ? 'invalid' : null"
                        :placeholder="$t('auth.email')"
                        v-model="input.email"
                        type="email"
                        name="email"
                        aria-describedby="emailHelp"/>
                      <b-form-invalid-feedback v-if="errors.has('email')">
                        <span v-for="error in errors.collect('email')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>

                    <!-- Submit -->
                    <div class="text-center">
                      <b-button
                        :class="{ 'btn-loading': auth.loadingForgotPass }"
                        variant="success"
                        type="submit"
                        class="mt-3 page-register--create--btn">
                         {{ $t("buttons.submit") }}
                      </b-button>
                    </div>
                    <div class="mt-2 text-center">
                      <router-link
                        :to="{ name: 'Login', query: utmQuery}"
                        class="px-0 btn btn-link page-register--login--btn">
                        {{ $t("auth.back_signin") }}
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
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'ForgotPasswordPage',
  mixins: [EntitiesMixin],
  data () {
    return {
      input: {email: ''},
      utmQuery: {},
      eventModel: {
        action:'forgot_password',
        category:'User Engagement',
        label:'',
        value:0
      },
    }
  },
  created() {
      let source = this.$route.query.utm_source ? this.$route.query.utm_source : ''
      let medium = this.$route.query.utm_medium ? this.$route.query.utm_medium : ''
      let campaign = this.$route.query.utm_campaign ? this.$route.query.utm_campaign : ''

      if(source != '' && medium!='' && campaign != '')
      {
        this.utmQuery.utm_source = source
        this.utmQuery.utm_medium = medium
        this.utmQuery.utm_campaign = campaign
      }    

      var x = source != '' ? source : 'ubeac'
      this.eventModel.label = 'Forgot password with source ' + x
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  methods: {
    ...mapActions({
      forgotPassword: 'auth/forgotPassword'
    }),
      @validation
      @successNotification('Reset password link sent to your email address.')
    send () {
      // this.sendGtagEvent(this.eventModel)

      return this.forgotPassword(this.input).then(() => {
        this.$router.push({ path: Config.defaultRoute.afterForgotPassword, query: this.utmQuery})
      })
    }
  }
}
</script>
