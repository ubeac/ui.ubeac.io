<template>
  <ComponentContainer>
    <div class="app page-auth">
      <b-card
        no-body
        class="m-auto">
        <b-row no-gutters>
          <b-col
            class="position-relative offset-sm-2 offset-md-0"
            cols="12"
            sm="8"
            md="6"
            lg="6"
            xl="6"
          >
            <b-card class="page-auth--form-area m-auto text-center px-3">
              <div class="justify-content-center text-center mb-5">
                <router-link :to="{name: 'Home'}">
                  <img
                    :src="`${imageBaseUrl}logo.svg`"
                    alt="ubeac"
                    class="login-logo">
                </router-link>
              </div>
              <h1 class="h2 mb-2">{{ msg }}</h1>
              <router-link
                :to="{name: 'Home'}"
                class="text-desc">{{ $t("auth.continue") }}</router-link>
            </b-card>
          </b-col>
          <b-col
            md="6"
            class="register-page-artwork d-none d-md-block">
            <div class="register-page-artwork--solid"/>
            <div class="register-page-artwork--gradiant"/>
            <div
              :style="{'background-image': `url(${imageBaseUrl}artworks/auth.png)`}"
              class="register-page-artwork--artwork"
            />
          </b-col>
        </b-row>
      </b-card>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Config from '@/config/config'

export default {
  name: 'LogoutPage',
  data () {
    return {
      msg: 'Logout'
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/auth'
    })
  },
  mounted () {
    this.logout().then(() => {
      window.location = Config.defaultRoute.afterLogout
      // console.log('logout done')
      // this.$router.push(Config.defaultRoute.afterLogout)
    })
    this.msg = this.$t('auth.logout_confirm')
    window.localStorage.removeItem('workspaceTeamId')
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>
