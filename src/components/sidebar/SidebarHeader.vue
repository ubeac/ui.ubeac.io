<template>
  <div class="sidebar-header">
    <router-link
      to="/profile">
      <div
        style="width: 6em; height: 6em;"
        class="mt-2 mx-auto d-md-block d-lg-none d-xl-none">
        <div
          class="avatar-container-circular" >
          <img
            :src="avatar"
            alt="Profile Avatar">
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>

import EntitiesMixin from '@/mixin/entities'
import FileUploader from '@/components/FileUploader'
export default {
  name: 'SidebarHeader',
  mixins: [EntitiesMixin],
  computed: {
    avatar () {
      // TODO: need cleanup
      let avatarId
      let out = `${this.imageBaseUrl}avatars/default.svg`
      if (this.$store.state.user.user && this.$store.state.user.user.profile) {
        avatarId = this.$store.state.user.user.profile.picture
        if (this && avatarId !== 'undefined' && avatarId !== '00000000-0000-0000-0000-000000000000') {
          out = FileUploader.methods.returnFileUrl(avatarId)
        }
      }
      return out
    }
  },
  methods: {
    hideMobile () {
      if (document.body.classList.contains('sidebar-mobile-show')) {
        document.body.classList.toggle('sidebar-mobile-show')
      }
    }
  }
}
</script>
