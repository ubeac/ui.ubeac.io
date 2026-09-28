<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="floor"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ $t("form.add_floor") }}</span>
        </div>
      </div>
      <div class="page-content w-100 float-left mb-4">
        <AddForm
          :building-id="buildingId"
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import AddForm from '@/components/floor/AddForm'

export default {
  name: 'FloorAddPage',
  components: { AddForm },
  computed: {
    buildingId () {
      return this.$route.query.buildingId
    }
  },
  methods: {
    success () {
      this.$router.go(-1)
    },
    cancel () {
      this.$router.go(-1)
    }
  }

}
</script>
