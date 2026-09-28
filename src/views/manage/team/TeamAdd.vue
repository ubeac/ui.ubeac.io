<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header center mb-5 mt-4">
        <div class="float-left">
          <icon
            name="team"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3">{{ $t("manage.add_team") }}</span>
        </div>
        <div class="btn-top-form">
          <!-- <router-link
             v-if="!readonly"
             :to="{name: 'ChangePassword'}"
             class="btn btn-outline-info mr-3">
            {{ $t("auth.change_pass") }}
          </router-link> -->
          <router-link
            :to="{name: 'Teams'}"
            class="btn btn-outline-info">
            <icon
              name="arrow-right"
              class="mr-1"/>
            <span>
              {{ $t("general.back_to_projects") }}
            </span>
          </router-link>
        </div>
      </div>
      <div class="page-content w-100 float-left mb-4">
        <AddForm
          @success="success"
          @cancel="cancel"/>
        <HelpCard
          :url="Config.docs.team"
          :text="$t('help_cards.team')" />
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import AddForm from '@/components/team/AddForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'TeamsAddPage',
  components: { AddForm },
  mixins: [EntitiesMixin],
  data () {
    return {
    }
  },
  methods: {
    success (id) {
      this.setWorkspaceTeamId(id)
      this.$store.dispatch('workspace/setTeamId', id)
      window.localStorage.setItem('workspaceTeamId', id)
      // this.sendGtagEvent(this.eventModel)
      window.location = `/intro`
    },
    cancel () {
      this.$router.push({ name: 'Teams' })
    }
  }

}
</script>
