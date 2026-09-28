<template>
  <div class="page-main-content animated fadeIn pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="manufacturer"
          class="page-content-header--icon mr-1"/>
        <span class="card-text h3 bold">{{ $t("form.new_manufacturer") }}</span>
      </div>
    </div>
    <AddForm
      @success="success"
      @cancel="cancel"/>
  </div>
</template>

<script>
import AddForm from '@/components/admin/manufacturer/AddForm'

export default {
  name: 'ManufacturerAdd',
  components: { AddForm },
  methods: {
    success (id) {
      if (id) {
        this.$router.push({ name: 'Manufacturer' })
      } else {
        this.$router.push({ name: 'Manufacturer' })
      }
    },
    cancel () {
      this.$router.push({ name: 'Manufacturer' })
    }
  }
}
</script>
