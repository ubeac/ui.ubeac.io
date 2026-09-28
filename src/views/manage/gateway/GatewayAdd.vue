<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="gateway"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ $t("form.add_gateway") }}</span>
        </div>
      </div>
      <div class="page-content w-100 mb-3 float-left">
        <AddForm
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import AddForm from '@/components/gateway/AddForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'GatewayAddPage',
  components: { AddForm },
  mixins: [EntitiesMixin],
  data () {
    return {
      eventModel: {
        action: 'submit-form',
        category: 'Gateway Add',
        label: 'User added a new gateway',
        value: 0,
        userId: '',
        teamNamespace: ''
      }
    }
  },
  methods: {
    success (id) {
      if (id) {
        // this.sendGtagEvent(this.eventModel)
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
