<template>
  <div
    class="nav-link sidebar-minimize"
    @click="sidebarMinimize();brandMinimize()">
    <icon name="menu" />
    <span class="sidebar-minimize-text">
      {{ $t("general.minimized_side") }}
    </span>
  </div>
</template>
<script>

export default {
  name: 'SidebarMinimizer',
  methods: {
    sidebarMinimize () {
      document.body.classList.toggle('sidebar-minimized')
      window.dispatchEvent(new Event('sidebarresized'))
    },
    brandMinimize () {
      document.body.classList.toggle('brand-minimized')
      window.dispatchEvent(new Event('sidebarresized'))
    }
  }
}
</script>
