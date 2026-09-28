<template>
  <div class="page-main-content animated fadeIn pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="product"
          class="page-content-header--icon mr-1"/>
        <span class="card-text h3 bold">{{ $t("form.new_product") }}</span>
      </div>
    </div>
    <AddForm
      @success="success"
      @cancel="cancel"/>
  </div>
</template>

<script>
import AddForm from '@/components/admin/product/AddForm'

export default {
  name: 'ProductAdd',
  components: { AddForm },
  methods: {
    success (id) {
      if (id) {
        this.$router.push({ name: 'Product' })
      } else {
        this.$router.push({ name: 'Product' })
      }
    },
    cancel () {
      this.$router.push({ name: 'Product' })
    }
  }
}
</script>
