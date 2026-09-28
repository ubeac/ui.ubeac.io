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
              <h1 class="h2 text-left">{{ $t("auth.change_pass") }}</h1>
              <p class="text-desc text-left mb-4">{{ $t("auth.change_pass_placeholder") }}</p>
              <b-form
                    novalidate
                    autocomplete="nope"
                    @submit.prevent="change(passwords)">
                    <!-- Email -->
                    <b-input-group class="mb-3">
                      <b-form-input
                        v-focus
                        v-validate="'required'"
                        :state="errors.has('oldPassword') ? false : null"
                        :placeholder="$t('auth.old_pass')"
                        v-model="passwords.oldPassword"
                        type="password"
                        name="oldPassword"
                        class="form-control"/>
                      <b-form-invalid-feedback v-if="errors.has('oldPassword')">
                        <span v-for="error in errors.collect('oldPassword')">
                          {{ error }}
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>

                    <!-- Password -->
                    <b-input-group class="mb-3">
                      <b-form-input
                       v-validate="{
                          required: true,
                          regex: /^(?=.*\d).*(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9].{7,}$/
                        }"
                        ref="password"
                        :state="errors.has('password') ? false : null"
                        :placeholder="$t('auth.new_pass')"
                        v-model="passwords.newPassword"
                        type="password"
                        class="form-control"
                        name="password"/>
                      <b-form-invalid-feedback v-if="errors.has('password')">
                        <span v-for="error in errors.collect('password')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>

                    <!-- Password Confirm -->
                    <b-input-group class="mb-3">
                      <b-form-input
                        v-validate="'required|confirmed:password'"
                        :state="errors.has('confirmPassword') ? false : null"
                        :placeholder="$t('auth.password_again')"
                        type="password"
                        v-model="passwords.confirmPassword"
                        class="form-control"
                        name="confirmPassword"/>
                      <b-form-invalid-feedback v-if="errors.has('confirmPassword')">
                        <span v-for="error in errors.collect('confirmPassword')">
                          {{ error }} <br>
                        </span>
                      </b-form-invalid-feedback>
                    </b-input-group>

                    <!-- Submit -->
                    <div class="text-center">
                      <b-button
                        :class="{ 'btn-loading': auth.loadingRegistration }"
                        variant="success"
                        type="submit"
                        class="mt-4 page-register--create--btn">{{ $t("auth.change_pass") }}
                      </b-button>
                    </div>
                    <div class="mt-2 text-center">
                      <router-link
                        :to="{ name: 'Profile'}"
                        class="px-0 btn btn-link page-register--login--btn">
                        {{ $t("buttons.back") }}
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
import Config from '@/config/config'

export default {
  name: 'ChangePasswordPage',
  data () {
    return {
      passwords: {
        oldPassword: '',
        newPassword: ''
      },
      msg: ''
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  methods: {
    ...mapActions({
      changePassword: 'auth/changePassword'
    }),
      @validation
    change () {
      this.changePassword(this.passwords).then(() => {
        this.$router.push(Config.defaultRoute.afterChangePassword)
      }).catch((error) => {
        this.msg = error.bodyText
        // console.log(this.msg)
      })
    }
  }
}
</script>
