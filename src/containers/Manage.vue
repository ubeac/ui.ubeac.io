<template>
  <ComponentContainer>
    <div
      v-if="isBaseDataLoaded"
      class="app">
      <AppHeader/>
      <!--
      <v-tour
        :steps="steps"
        name="ubeacTour"/>
      -->
      <div class="app-body">
        <Sidebar :nav-items="nav"/>
        <main class="main">
          <div class="container-fluid container-manage px-4">
            <template >
              <router-view />
            </template>
          </div>
        </main>
      </div>
      <AppFooter/>
    </div>
  </ComponentContainer>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '@/components/'
import EntitiesMixin from '@/mixin/entities'
import SocketMixin from '@/mixin/socket'

export default {
  name: 'ManagePagesContainer',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  mixins: [SocketMixin, EntitiesMixin],
  data () {
    let sidebarParams = {
      modifiers: {
        preventOverflow: {
          enabled: false,
          priority: ['right', 'left', 'top', 'bottom']
        }
      },
      placement: 'right'
    }
    return {
      nav: nav.items,
      tourIsFinished: false,
      steps: [
        {
          target: '[data-tour="1"]', // We're using document.querySelector() under the hood
          content: `<strong>Start</strong>!`
        },
        {
          target: '[data-tour="intro"]', // We're using document.querySelector() under the hood
          content: `<strong>Intro</strong>!`,
          params: sidebarParams
        },
        {
          target: '[data-tour="dashboard"]', // We're using document.querySelector() under the hood
          content: this.$t('help_cards.dashboard'),
          params: sidebarParams
        },
        {
          target: '[data-tour="team"]', // We're using document.querySelector() under the hood
          content: this.$t('help_cards.team'),
          params: sidebarParams
        },
        {
          target: '[data-tour="building"]', // We're using document.querySelector() under the hood
          content: this.$t('help_cards.building'),
          params: sidebarParams
        },
        {
          target: '[data-tour="gateway"]', // We're using document.querySelector() under the hood
          content: this.$t('help_cards.gateway'),
          params: sidebarParams
        },
        {
          target: '[data-tour="device"]', // We're using document.querySelector() under the hood
          content: this.$t('help_cards.device'),
          params: sidebarParams
        },
        {
          target: '[data-tour="docs"]', // We're using document.querySelector() under the hood
          content: `<strong>Documentation</strong>!`,
          params: sidebarParams
        }
      ]
    }
  },
  computed: {
    isBaseDataLoaded () {
      return this.$store.getters['layout/baseDataLoaded']
    },
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'Logout') {
        this.$tours['ubeacTour'].stop()
      }
    }
  },
  created () {
    if (!this.isBaseDataLoaded) {
      if (this.setWorkspaceTeamId()) {
        this.getEssentialData()
      }
    }
  },
  methods: {
    setWorkspaceTeamId () {
      let out = false
      if (this.$route.query.teamId) {
        window.localStorage.setItem('workspaceTeamId', this.$route.query.teamId)
        this.$store.dispatch('workspace/setTeamId', this.$route.query.teamId)
        out = true
      } else if (window.localStorage.getItem('workspaceTeamId')) {
        this.$store.dispatch('workspace/setTeamId', window.localStorage.getItem('workspaceTeamId'))
        out = true
      } else if (this.$store.getters['workspace/teamId']) {
        this.$store.dispatch('workspace/setTeamId', this.$store.getters['workspace/teamId'])
        out = true
      } else {
        this.$router.push({ name: 'Teams' })
      }
      return out
    },
    getEssentialData () {
      if (this.auth.authenticated) {
        this.fetchBaseData()
        this.fetchSensorTypes()
        this.fetchUserAssets().then(() => {
          this.$store.dispatch('layout/setBaseDataLoadedStatus', true)
          this._startTour()
        })
        this.fetchCurrentPosition()
      } else {
        this.$store.dispatch('layout/setBaseDataLoadedStatus', true)
      }
    },
    _startTour () {
      // if (this.browser.isDesktop && window.innerWidth > 1280) {
      //   setTimeout(() => {
      //     this.$tours['ubeacTour'].start()
      //   }, 1000)
      // }
      // window.addEventListener('resize', evt => {
      //   this.$tours['ubeacTour'].stop()
      // })
    }
  }
}
</script>
