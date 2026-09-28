<template>
  <ComponentContainer>
    <b-nav-item-dropdown
      right
      no-caret
      data-tour="1"
      class="d-none float-right d-lg-block">
      <template slot="button-content">
        <div
          class="avatar-container-circular p-0 m-0 float-right" >
          <img
            :src="avatar"
            alt="Profile Avatar">
        </div>
        <b-badge
          v-if="userInfo && userInfo.email_verified === false"
          variant="danger">
          <icon name="message" />
        </b-badge>
      </template>
      <div
        v-if="profile"
        class="lined noline pt-3 pb-3">
        <div class="member-territory--avatar-area">
          <div
            class="avatar-container-circular float-right" >
            <img
              :src="avatar"
              alt="Profile Avatar">
          </div>
        </div>
        <div class="member-territory--details-area pt-2 pl-3">
          <div class="d-block w-100 overflow-hidden">
            <span
              v-if="profile && (profile.firstName || profile.lastName)"
              class="text-one-line d-block w-100">
              {{ profile.firstName }} {{ profile.lastName }}
            </span>
            <span class="text-one-line w-100"> {{ profile.email }} </span>
          </div>
        </div>
      </div>
      <div
        v-if="userInfo && userInfo.email_verified === false"
        class="pl-3" >
        <b-alert
          show
          size="sm"
          class="w-100 mb-0 float-left no-border d-block no-radius noline"
          variant="danger">
          <icon
            class="pr-2 float-left"
            name="danger" />
          <span>
            {{ $t('messages.not_verified_email') }}
          </span>
        </b-alert>
      </div>
      <div
        v-if="workspaceId && teamById(workspaceId) && !hideTeam"
        :class="{ 'noline': userInfo && userInfo.email_verified === false}"
        class="lined">
        <router-link
          :to="{name: 'DetailsTeam', params: { id: workspaceId }}"
          class="btn-link text-primary">
          <span class="">{{ $t('general.team') }}: </span>
          <span class="h6">{{ teamById(workspaceId).name }}</span>
        </router-link>
      </div>
      <div class="lined">
        <router-link
          :to="{name: 'Teams'}"
          class="btn-link">
          <icon
            name="team"
            class="mr-2"/>
          <span>{{ $t("general.nav.teams") }}</span>
        </router-link>
      </div>
      <div
        class="lined">
        <router-link
          :to="{name: 'Profile'}"
          class="btn-link green-color">
          <icon
            name="profile"
            class="mr-2"/>
          <span>{{ $t("general.profile") }}</span>
        </router-link>
      </div>
      <div class="lined">
        <router-link
          :to="{name: 'Logout'}"
          class="btn-link">
          <icon
            name="logout"
            class="mr-2"/>
          <span>{{ $t("auth.logout") }}</span>
        </router-link>
      </div>
    </b-nav-item-dropdown>
  </ComponentContainer>
</template>
<script>
import FileUploader from '@/components/FileUploader'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'HeaderDropdown',
  mixins: [EntitiesMixin],
  props: {
    hideTeam: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    avatar () {
      // TODO: need cleanup
      let out = `${this.imageBaseUrl}avatars/default.svg`
      if (this.$store.state.user.user && this.$store.state.user.user.profile) {
        let avatarId = this.$store.state.user.user.profile.picture
        if (this && avatarId !== 'undefined' && avatarId !== '00000000-0000-0000-0000-000000000000') {
          out = FileUploader.methods.returnFileUrl(avatarId)
        }
      }
      return out
    }
  }
}
</script>
