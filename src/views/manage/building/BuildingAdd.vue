<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="building"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ $t("form.add_building") }}</span>
        </div>
      </div>
      <div class="page-content w-100 float-left pt-0 mb-4">
        <AddForm
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import AddForm from '@/components/building/AddForm'

export default {
  name: 'BuildingAddPage',
  components: { AddForm },
  methods: {
    success () {
      this.$router.push({ name: 'Buildings' })
    },
    cancel () {
      this.$router.push({ name: 'Buildings' })
    }
  }

}
</script>
