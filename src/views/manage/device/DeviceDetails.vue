<template>
  <ComponentContainer>
    <div class="page-main-content animated pt-0 fadeIn">
      <div class="page-content w-100 pt-0 float-left">
        <EntityHead
          :setting-link="{
            enabled: true,
            to: {name: 'UpdateDevice', params: {id: id}}
          }"
          :name="deviceById(id).name"
          icon="device"/>
        <DeviceDetails
          :id="id"
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapActions } from 'vuex'
import DeviceDetails from '@/components/device/Details'
import EntitiesMixin from '@/mixin/entities'
import EntityHead from '@/components/entity/EntityHead'

export default {
  name: 'DeviceUpdatePage',
  components: { EntityHead, DeviceDetails },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'device'
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    itemNotFound () {
      let out = false
      if (typeof (this.deviceById(this.id)) !== 'object') {
        out = true
      }
      return out
    }
  },
  methods: {
    ...mapActions({
      getDevices: 'device/getAll'
    }),
    success () {
      this.getDevices()
      this.$router.push('/devices')
    },
    cancel () {
      this.$router.push('/devices')
    }
  }

}
</script>
