<template>
  <div class="page-main-content animated fadeIn pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="product"
          class="page-content-header--icon mr-1"/>
        <span class="card-text h3 bold">{{ $t("form.update_product") }}</span>
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
import UpdateForm from '@/components/admin/product/UpdateForm'

export default {
  name: 'ProductUpdate',
  components: { UpdateForm },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    success () {
      this.$router.push({ name: 'Product' })
    },
    cancel () {
      this.$router.push({ name: 'Product' })
    }
  }
}
</script>
