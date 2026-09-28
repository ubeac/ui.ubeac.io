<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="text-suitable-header float-left">
          <icon
            name="team"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ teamById(id).name }} </span>
        </div>
        <div class="float-right">
          <b-link
            v-b-tooltip
            :title="$t('buttons.preview')"
            :to="{ name: 'DetailsTeam', params: {id: id}}"
            class="text-muted float-right btn btn-fab btn-success mr-0 d-lg-block">
            <icon name="eye"/>
          </b-link>
        </div>
      </div>
      <b-tabs
        class="card-tabs tab-content-3"
        card>
        <b-tab
          :title="$t('general.general')"
          active>
          <UpdateForm
            :id="id"
            class="w-100 float-left"
            @successdelete="successDelete"
            @success="success"
            @cancel="cancel"/>
          <div class="w-100 px-3">
            <HelpCard
              :url="Config.docs.team"
              :text="$t('help_cards.team')"
              class="mt-0 mb-0" />
          </div>
        </b-tab>
        <b-tab
          :title="$t('form.authorized_user')"
          class="pt-2 over-flow-auto">
          <UsersForm
            :id="id"
            :entity-id="permissionInsert.entityId"/>
        </b-tab>
        <b-tab
          :title="$t('form.access_tokens')"
          class="over-flow-auto">
          <TokensForm
            :id="id"/>
        </b-tab>
      </b-tabs>
    </div>
  </ComponentContainer>
</template>

<script>
import UpdateForm from '@/components/team/UpdateForm'
import UsersForm from '@/components/team/UsersForm'
import TokensForm from '@/components/team/TokensForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'TeamUpdatePage',
  components: { UpdateForm, UsersForm, TokensForm },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'team',
      permissionInsert: {
        name: 'new permission',
        userId: '',
        entityId: '',
        entityType: 1
      },
      users: []
    }
  },
  computed: {
    itemNotFound () {
      let out = false
      if (typeof (this.$store.getters[`${this.entityType}/byId`](this.id)) !== 'object') {
        out = true
      }
      return out
    },
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.permissionInsert.entityId = this.id
  },
  methods: {
    successDelete () {
      window.localStorage.setItem('workspaceTeamId', null)
      this.$router.push({ name: 'Teams' })
    },
    success () {
      this.$router.push({ name: 'DetailsTeam', params: { id: this.id } })
    },
    cancel () {
      this.$router.go(-1)
    }
  }

}
</script>
