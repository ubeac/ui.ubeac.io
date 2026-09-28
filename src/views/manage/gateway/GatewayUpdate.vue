<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="text-suitable-header float-left">
          <icon
            name="gateway"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ gatewayById(id).name }} </span>
        </div>
        <div class="float-right">
          <b-link
            v-b-tooltip
            :title="$t('buttons.preview')"
            :to="{ name: 'GatewayDetails', params: {id: id}}"
            class="text-muted float-right btn btn-fab btn-success mr-0 d-lg-block">
            <icon name="eye"/>
          </b-link>
        </div>
      </div>
      <div class="page-content w-100 float-left mb-3">
        <b-row>
          <b-col
            cols="12">
            <UpdateForm
              :id="id"
              @updateFirmware="updateFirmware"
              @success="success"
              @cancel="cancel"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import UpdateForm from '@/components/gateway/UpdateForm'
import GatewayHelpBox from '@/components/gateway/HelpBox'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewayUpdatePage',
  components: { GatewayHelpBox, UpdateForm },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'gateway',
      selectedFirmware: null
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
    updateFirmware (e) {
      this.selectedFirmware = e
    },
    success (id) {
      if (id) {
        this.$router.push({ name: 'GatewayDetails', params: { id: id } })
      } else {
        this.$router.push({ name: 'Gateways' })
      }
    },
    cancel () {
      this.$router.push({ name: 'Gateways' })
    }
  }

}
</script>
