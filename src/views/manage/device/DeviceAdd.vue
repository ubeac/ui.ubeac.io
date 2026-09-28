<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="device"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ $t("device.add_device") }}</span>
        </div>
      </div>
      <div class="page-content w-100 float-left">
        <AddForm
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapActions } from 'vuex'
import AddForm from '@/components/device/AddForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'DeviceAddPage',
  components: { AddForm },
  mixins: [EntitiesMixin],
  data () {
    return {
      eventModel: {
        action: 'add_device',
        category: 'User Activities',
        label: 'User added a new device',
        value: 0,
        userId: '',
        teamNamespace: ''
      }
    }
  },
  methods: {
    ...mapActions({
      getDevices: 'device/getAll'
    }),
    success (e) {
      // this.sendGtagEvent(this.eventModel)
      this.getDevices()
      this.$router.push({ name: 'Devices' })
    },
    cancel () {
      this.$router.go(-1)
    }
  }

}
</script>
