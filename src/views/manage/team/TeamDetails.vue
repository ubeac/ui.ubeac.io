<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-main-content pt-0 animated fadeIn">
      <EntityHead
        :setting-link="{
          enabled: true,
          to: {name: 'UpdateTeam', params: {id: id}}
        }"
        :name="teamById(id).name"
        icon="team"/>
      <Details
        :id="id"
        @success="success"
        @cancel="cancel"/>
    </div>
  </ComponentContainer>
</template>

<script>
import Details from '@/components/team/Details'
import EntityHead from '@/components/entity/EntityHead'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'TeamDetailsPage',
  components: { EntityHead, Details },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'team'
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
  methods: {
    success () {
      this.$router.push({ name: 'Teams' })
    },
    cancel () {
      this.$router.push({ name: 'Teams' })
    }
  }

}
</script>
