<template>
  <ComponentContainer class="w-100">
    <div class="page-main-content animated fadeIn page-entity-list pt-0">
      <div class="page-content-header center mt-4 mb-5">
        <h1 class="text-center h2 mb-2">
          {{ $t("manage.teams") }}
        </h1>
        <div class="btn-top-form">
          <router-link
            :to="{name: 'NewTeam'}"
            class="btn btn-outline-info">
            <icon
              name="plus"/>
            {{ $t("manage.add_team") }}
          </router-link>
        </div>
      </div>
      <div
        v-if="userInfo && userInfo.email_verified === false"
        class="lined noline ml-0 w-100 mb-3">
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
            :class="{'btn-loading': resendVerificationLoading}"
            variant="outline-danger"
            class="px-3 px-sm-4 px-md-5 mt-2 mt-sm-0 ml-0 ml-sm-3"
            @click="resendVerification()">
            {{ $t("auth.resend_email") }}
          </b-button>
        </b-alert>
      </div>
      <!--Card View-->
      <b-row
        v-if="viewCardMode"
        class="row-fixture">
        <b-col
          v-for="(item, index) in teamSorted"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="px-2 pb-3 order-1 order-md-1">
          <b-card
            no-body
            style="height: 200px;"
            class="component-entity-card card-hover pointer mb-0 h-19" >

            <!--Header-->
            <b-card-header
              class="p-3"
              @click="_setWorkspaceTeamId(item.id)">
              <div >
                <h4 class="py-1 text-one-line">
                  {{ item.name }}
                </h4>
              </div>
            </b-card-header>

            <!--Body-->
            <b-card-body
              class="p-0 m-0 mt-2"
              @click="_setWorkspaceTeamId(item.id)">
              <div class="pt-0 px-3">
                <p class="h-7 text-two-line text-description mb-4">
                  {{ item.description }}
                </p>
                <small class="card-date pt-2 mt-5">
                  {{ $t("general.update") }}  {{ item.updateDate | moment("from") }}
                </small>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import entityListPage from '@/mixin/entityListPage'

export default {
  name: 'TeamsPage',
  mixins: [entityListPage],
  data () {
    return {
      resendVerificationLoading: false
    }
  },
  computed: {
    ...mapGetters({
      teamBuildingsCount: 'team/buildingsCount',
      teamGatewaysCount: 'team/gatewaysCount',
      teamSensorsCount: 'team/sensorsCount',
      teamDevicesCount: 'team/devicesCount',
      teamList: 'workspace/teamList'
    }),
    teamSorted () {
      return this._.orderBy(this.teamList, [item => item.name.toLowerCase()], ['asc'])
    }
  },
  methods: {
    resendVerification () {
      this.resendVerificationLoading = true
      let promise = this.resendVerificationEmail().then(() => {
        this.resendVerificationLoading = false
      })
      return promise
    },
    _setWorkspaceTeamId (teamId) {
      this.setWorkspaceTeamId(teamId)
      this.$store.dispatch('layout/setBaseDataLoadedStatus', false)
      this.$store.dispatch('workspace/setTeamId', teamId)
      window.localStorage.setItem('workspaceTeamId', teamId)
      this.$router.push({ name: 'Intro' })
    },
    _setWorkspaceTeamIdAndGoToDetails (teamId) {
      this.setWorkspaceTeamId(teamId)
      this.$store.dispatch('layout/setBaseDataLoadedStatus', false)
      this.$store.dispatch('workspace/setTeamId', teamId)
      window.localStorage.setItem('workspaceTeamId', teamId)
      this.$router.push({ name: 'DetailsTeam', params: { id: teamId } })
    },
    _setWorkspaceTeamIdAndGoToEdit (teamId) {
      this.setWorkspaceTeamId(teamId)
      this.$store.dispatch('layout/setBaseDataLoadedStatus', false)
      this.$store.dispatch('workspace/setTeamId', teamId)
      window.localStorage.setItem('workspaceTeamId', teamId)
      this.$router.push({ name: 'UpdateTeam', params: { id: teamId } })
    },
    getIsOwner (creatorId) {
      let out
      if (this.profile) {
        out = creatorId === this.profile.id
      }
      return out
    }
  }
}
</script>
