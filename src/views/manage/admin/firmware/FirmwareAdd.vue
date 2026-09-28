<template>
  <div class="page-main-content animated fadeIn pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="firmware"
          class="page-content-header--icon mr-1"/>
        <span class="card-text h3 bold">{{ $t("form.new_firmware") }}</span>
      </div>
    </div>
    <AddForm
      @success="success"
      @cancel="cancel"/>
  </div>
</template>

<script>
import AddForm from '@/components/admin/firmware/AddForm'

export default {
  name: 'FirmwareAdd',
  components: { AddForm },
  methods: {
    success (id) {
      if (id) {
        this.$router.push({ name: 'Firmware' })
      } else {
        this.$router.push({ name: 'Firmware' })
      }
    },
    cancel () {
      this.$router.push({ name: 'Firmware' })
    }
  }
}
</script>
