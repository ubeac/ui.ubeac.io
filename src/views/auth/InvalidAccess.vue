<template>
  <ComponentContainer>
    <div class="animated fadeIn">
      <div class="app flex-row align-items-center page-auth">
        <div class="container">
          <b-row class="justify-content-center">
            <b-col md="8">
              <b-card-group>
                <b-card
                  no-body
                  class="p-4 text-center">
                  <b-card-body class="px-0">
                    <div class="justify-content-center text-center mb-5">
                      <router-link :to="{name: 'Home'}">
                        <img
                          :src="`${imageBaseUrl}logo.svg`"
                          class="login-logo"
                          alt="ubeac">
                      </router-link>
                    </div>
                    <h3>{{ $t("auth.invalid_access") }}Invalid Access !</h3>
                    <p class="text-muted"/>
                    <router-link :to="{name: 'Home'}">{{ $t("auth.continue") }}</router-link>
                  </b-card-body>
                </b-card>
                <b-card
                  no-body
                  class="text-white bg-primary py-5 d-md-down-none"
                  style="width:44%">
                  <b-card-body class="text-center mt-5">
                    <div class="mt-3"/>
                  </b-card-body>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'InvalidAccessPage'
}
</script>
