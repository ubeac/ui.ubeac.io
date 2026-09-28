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
              <h1 class="h2 text-left">{{ $t("auth.reset_pass") }}</h1>
              <p class="text-desc text-left mb-4"></p>
              <b-form
                    novalidate
                    autocomplete="nope"
                    @submit.prevent="reset(credentials)">
                    <!-- Email -->
                    <b-input-group class="mb-3">
                      <b-form-input
                        :placeholder="$t('auth.email')"
                        v-model="credentials.email"
                        :disabled="true"
                        type="text"
                        readonly/>
                    </b-input-group>

                    <!-- Password -->
                    <b-input-group class="mb-3">
                      <b-form-input
                        v-validate="{
                          required: true,
                          regex: /^(?=.*\d).*(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9].{7,}$/
                        }"
                        :state="errors.has('password') ? 'invalid' : null"
                        :placeholder="$t('auth.new_pass')"
                        v-model="credentials.password"
                        type="password"
                        name="password"
                        class="form-control"/>
                      <b-form-invalid-feedback v-if="errors.has('password')">
                        <span v-for="error in errors.collect('password')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>
                    
                    <!-- Submit -->
                    <div class="text-center">
                      <b-button
                        :class="{ 'btn-loading': auth.loadingLogin }"
                        variant="success"
                        type="submit"
                        class="mt-4 page-register--create--btn">
                        {{ $t("auth.reset_pass") }}
                      </b-button>
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
export default {
  name: 'ResetPasswordPage',
  data () {
    return {
      credentials: {
        code: '',
        email: '',
        password: ''
      },
      msg: ''
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  mounted () {
    this.readUrl()
  },
  methods: {
    ...mapActions({
      resetPassword: 'auth/resetPassword'
    }),
    readUrl () {
      var code = this.getParameterByName('code')
      var email = this.getParameterByName('email')
      if (code === null || email === null) {
        // console.log('Invalid reset password data!')
      } else {
        this.credentials.code = code
        this.credentials.email = email
      }
    },
      @validation
    reset () {
      this.resetPassword(this.credentials).then(() => {
        this.$router.push(Config.defaultRoute.afterResetPassword)
      }).catch((error) => {
        this.msg = error.bodyText
        // console.log(this.msg)
      })
    },
    getParameterByName (name) {
      var url = window.location.href
      name = name.replace(/[[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
      var results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
  }
}
</script>
