<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-main-content pt-0 animated fadeIn">
      <EntityHead
        :setting-link="{
          enabled: true,
          to: {name: 'UpdateFloor', params: {id: id}}
        }"
        :name="floorById(id).name"
        icon="floor"/>
      <Details
        :id="id"
        @success="success"
        @cancel="cancel"/>
    </div>
  </ComponentContainer>
</template>

<script>
import Details from '@/components/floor/Details'
import EntityHead from '@/components/entity/EntityHead'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'FloorDetailsPage',
  components: { EntityHead, Details },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'floor'
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
      this.$router.go(-1)
    },
    cancel () {
      this.$router.go(-1)
    }
  }

}
</script>
