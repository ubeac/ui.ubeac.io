<template>
  <ComponentContainer>
    <b-badge
      v-if="user"
      variant="success"
      class="item component-member-badge">
      <div
        style="width: 2.3em; height: 2.3em;"
        class="float-left mr-1">
        <div
          class="avatar-container-circular" >
          <img
            :src="getAvatarUrl(user.picture)"
            alt="Profile Avatar">
        </div>
      </div>
      <span class="main-text">
        <span class="name-and-family">
          <template v-if="user.firstName">{{ user.firstName }} </template>
          <template v-if="user.lastName">{{ user.lastName }} </template>
        </span>
        <span class="email-address">
          <template v-if="user.lastName || user.firstName">({{ user.email }})</template>
          <template v-else>{{ user.email }}</template>
          <template v-if="user.permission.level === 1"> ({{ $t('general.access_admin') }}) </template>
          <template v-if="user.permission.level === 0"> ({{ $t('general.access_view') }}) </template>
        </span>
      </span>
    </b-badge>
  </ComponentContainer>
</template>

<script>
/* eslint-disable spellcheck/spell-checker */
//     NOTE: Experimental Visual Doc,
//
//     UI:
//     min-width: 0; max-width: 100%;
//     +--------------------------------------------+
//     |Avatar |Name family (Email)                 |
//     |       |                                    | 45px
//     |       |                                    |
//     +--------------------------------------------+
//
//     DOC:
//
//     +---------------------+
//     |Props                |
//     +---------------------+
//     |user: required,      |
//     |      default=false  |
//     |                     |
//     |                     |
//     |                     |
//     |                     |
//     |                     |
//     +---------------------+
//
/* eslint-enable spellcheck/spell-checker */
export default {
  name: 'MemberBadge',
  props: {
    user: {
      type: [String, Boolean, Object],
      default: null,
      required: true
    }
  }
}
</script>
