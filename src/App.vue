<template>
  <div>
    <notifications
      :duration="duration"
      :max="1"
      group="server"
      position="bottom right"/>
    <nprogress-container/>
    <router-view
      :key="$route.fullPath" />
  </div>
</template>
<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import EntitiesMixin from '@/mixin/entities'
import SocketMixin from '@/mixin/socket'
export default {
  name: 'App',
  components: {
    NprogressContainer
  },
  mixins: [SocketMixin, EntitiesMixin],
  data () {
    return {
      socketJoinRetryTimer: null,
      gtagconfigModel: {
        custom_map: {
          dimension2: 'userId',
          dimension3: 'teamNamespace'
        }
      },
      eventModel: {
        action: 'click-action',
        category: 'User Interaction',
        label: '',
        value: 0,
        teamNamespace: '',
        userId: ''
      }
    }
  },
  computed: {
    duration () {
      let out = this.$config.notification.duration
      if (this.isAdmin) {
        out = -1
      }
      return out
    }
  },
  watch: {
    workspaceId (newValue, oldValue) {
      if (oldValue) {
        this.leaveGroupSocket(`ChangeLog/${oldValue}`)
      }
      this._startSocketThings()
    }
  },
  created () {
    this.getEssentialData()
    if (this.$route.meta.roles[0] !== '*') {
      this.startSocketConnection()
    }
    window.log = (i) => {
      console.log(i)
    }
    this.gtagConfig(this.gtagconfigModel)
  },
  mounted () {
    // this.addChat()
    // document.addEventListener('click', (e) => {
    //   e = e || window.event
    //   let parent = e.target.parentElement
    //   let target = e.target || e.srcElement
    //   let text = target.textContent || target.innerText || target.name || target.placeholder
    //   let tag = target.tagName
    //   this.sendClickEvent(parent, target, text, tag)
    // }, false)
  },
  methods: {
    getEssentialData () {
      if (this.auth.authenticated) {
        this.fetchWorkspaceTeams()
        this.fetchUserInfo().then((result) => {
          this.gtagSet(this.user.user.profile.email)
          if (this.user.user) {
            this.$store.state.userEmail = this.user.user.profile.email
            // this.setChatInfo(this.user.user.profile)
          }
        })
      }
    },
    // sendClickEvent (parent, element, text, tag) {
    //   // console.log(this.$route.fullPath)
    //   var y = document.getElementsByClassName('card-text h3 bold')
    //   console.log(y[0].innerText)
    //   this.eventModel.action = document.getElementsByClassName('card-text h3 bold')[0].innerText
    //   this.eventModel.label = 'Tag: ' + tag + ' __ Text: ' + text
    //   this.sendGtagEvent(this.eventModel)
    // },
    // addChat () {
    //   let script = document.createElement('script')
    //   script.setAttribute('type', 'text/javascript')
    //   script.appendChild(document.createTextNode(this.$config.chat.snippet))
    //   document.body.appendChild(script)
    // },
    // setChatInfo (profile) {
    //   let name = ''
    //   if (profile.firstName || profile.lastName) {
    //     name = profile.firstName + ' ' + profile.lastName
    //   } else {
    //     name = profile.email
    //   }
    //   purechatApi.on('chatbox:ready', () => {
    //     purechatApi.set('visitor.email', profile.email)
    //     purechatApi.set('visitor.name', name)
    //   })
    // },
    _startSocketThings () {
      clearTimeout(this.socketJoinRetryTimer)
      if (this.workspaceId) {
        if (this.socketStatus === 'connected') {
          this.joinGroupSocket(`ChangeLog/${this.workspaceId}`)
        } else {
          this.socketJoinRetryTimer = setTimeout(() => {
            this._startSocketThings()
          }, this.$config.socketRetryDelay)
        }
      }
    },
    onGroupDataSocket (payload) {
      this.updateChangelog(payload)
    }
  }
}
</script>
<style lang="scss">
  // Import Main styles for this application
  @import 'scss/main';
</style>
