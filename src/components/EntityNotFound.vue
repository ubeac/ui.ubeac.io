<template>
  <ComponentContainer>
    <div class="component-artwork-no-result w-100" >
      <div
        class="text-center mx-auto">
        <icon
          class="mx-auto d-block"
          name="nodata" />
      </div>
      <h2 class="text-muted text-center mt-1 mb-4">
        <slot>
          {{ $t("manage.nothing_data") }}
        </slot>
      </h2>
    </div>
  </ComponentContainer>
</template>
<script>
export default {
  name: 'EntityNotFound'
}
</script>
