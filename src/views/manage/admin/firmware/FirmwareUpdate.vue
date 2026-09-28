<template>
  <div class="page-main-content animated fadeIn pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="firmware"
          class="page-content-header--icon mr-1"/>
        <span class="card-text h3 bold">{{ $t("form.update_firmware") }}</span>
      </div>
    </div>
    <UpdateForm
      :id="id"
      class="w-100 float-left"
      @success="success"
      @cancel="cancel"/>
  </div>
</template>

<script>
import UpdateForm from '@/components/admin/firmware/UpdateForm'

export default {
  name: 'FirmwareUpdate',
  components: { UpdateForm },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    success () {
      this.$router.push({ name: 'Firmware' })
    },
    cancel () {
      this.$router.push({ name: 'Firmware' })
    }
  }
}
</script>
