<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-building-details pt-0 page-main-content animated fadeIn">
      <EntityHead
        :setting-link="{
          enabled: true,
          to: {name: 'UpdateBuilding', params: {id: id}}
        }"
        :name="buildingById(id).name"
        icon="building"/>
      <Details
        :id="id"
        @success="success"
        @cancel="cancel"/>
    </div>
  </ComponentContainer>
</template>

<script>
import Details from '@/components/building/Details'
import EntityHead from '@/components/entity/EntityHead'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'BuildingUpdatePage',
  components: { EntityHead, Details },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'building'
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
      this.$router.push({ name: 'Buildings' })
    },
    cancel () {
      this.$router.push({ name: 'Buildings' })
    }
  }

}
</script>
