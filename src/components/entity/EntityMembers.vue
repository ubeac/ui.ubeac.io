<template>
  <ComponentContainer>
    <section class="component-entity-members">
      <MemberBadge
        v-for="(user, index) in users"
        :key="index"
        :user="user"/>
    </section>
  </ComponentContainer>
</template>
<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'EntityMembers',
  mixins: [EntitiesMixin],
  computed: {
    team () {
      return this.teamById(this.workspaceId)
    },
    users () {
      let out = null
      if (this.team) {
        out = this.team.users
      }
      this._.each(out, (user) => {
        this._.each(this.permissions, (item) => {
          if (item.userId === user.id) {
            user.permission = item
          }
        })
      })
      return out
    },
    permissions () {
      return this.team.accesses
    }
  }
}
</script>
