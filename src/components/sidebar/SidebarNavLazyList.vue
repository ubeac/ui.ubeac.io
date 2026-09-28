<template>
  <div class="lazy-menu">
    <SidebarNavDropdown
      v-if="lazyList && lazyList.length > 0"
      :name="dropdownItem.name"
      :icon="dropdownItem.icon"
      :linked="true"
      :data-tour="tour"
      :url="dropdownItem.url">
      <li
        v-for="(item, index) in lazyList"
        :key="index"
        class="nav-item"
        @click="hideMobile">
        <SidebarNavLink
          v-b-tooltip="{
            container: 'body',
            delay: { show: 800, hide: 100 },
            placement: 'left',
            boundary: 'viewport',
            trigger: 'hover'
          }"
          :title="item.name"
          :name="item.name"
          :url="dropdownItem.url + '/' + item.id"
          :icon="'default'"
          :badge="item.badge"
          :variant="item.variant"/>
      </li>
    </SidebarNavDropdown>
    <SidebarNavItem
      v-else
      :classes="dropdownItem.class">
      <SidebarNavLink
        :name="dropdownItem.name"
        :url="dropdownItem.url"
        :icon="dropdownItem.icon"
        :badge="dropdownItem.badge"
        :variant="dropdownItem.variant"/>
    </SidebarNavItem>
  </div>
</template>
<script>
import SidebarNavLink from './SidebarNavLink'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavItem from './SidebarNavItem'
export default {
  name: 'SidebarNavLazyList',
  components: { SidebarNavLink, SidebarNavDropdown, SidebarNavItem },
  props: {
    tour: {
      type: [Number, Boolean, String],
      default: null
    },
    list: {
      type: [Boolean, Array, String],
      required: true
    },
    dropdownItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    lazyList () {
      return this.$store.getters[this.list]
    }
  },
  methods: {
    hideMobile () {
      if (document.body.classList.contains('sidebar-mobile-show')) {
        document.body.classList.toggle('sidebar-mobile-show')
      }
    }
  }
}
</script>
