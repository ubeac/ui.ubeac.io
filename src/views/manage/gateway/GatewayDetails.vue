<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-main-content pt-0 animated fadeIn">
      <EntityHead
        :setting-link="{
          enabled: true,
          to: {name: 'UpdateGateway', params: {id: id}}
        }"
        :name="gatewayById(id).name"
        icon="gateway"/>
      <Details
        :id="id"
        @success="success"
        @cancel="cancel"/>
    </div>
  </ComponentContainer>
</template>

<script>
import Details from '@/components/gateway/Details'
import EntityHead from '@/components/entity/EntityHead'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewayDetailsPage',
  components: { EntityHead, Details },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'gateway'
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
      this.$router.push({ name: 'Gateways' })
    },
    cancel () {
      this.$router.push({ name: 'Gateways' })
    }
  }

}
</script>
