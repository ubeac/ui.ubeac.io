<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div
        class="page-content-header">
        <div
          v-if="deviceById(id)"
          class="text-suitable-header float-left">
          <icon
            name="device"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ deviceById(id).name }} </span>
        </div>
        <div class="float-right">
          <b-link
            v-b-tooltip
            :title="$t('buttons.preview') "
            :to="{ name: 'DetailsDevice', params: {id: id}}"
            class="text-muted float-right btn btn-fab btn-success mr-0 d-lg-block">
            <icon name="eye"/>
          </b-link>
        </div>
      </div>
      <div class="page-content w-100 float-left mb-3">
        <UpdateForm
          :id="id"
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapActions } from 'vuex'
import UpdateForm from '@/components/device/UpdateForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'DeviceUpdatePage',
  components: { UpdateForm },
  mixins: [EntitiesMixin],
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions({
      getDevices: 'device/getAll'
    }),
    success () {
      this.getDevices()
      this.$router.push({ name: 'Devices' })
    },
    cancel () {
      this.$router.push({ name: 'Devices' })
    }
  }

}
</script>
