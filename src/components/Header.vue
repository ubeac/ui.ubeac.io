<template>
  <ComponentContainer>
    <header
      class="app-header navbar">
      <b-button
        v-if="enableMenu"
        class="navbar-toggler mobile-sidebar-toggler d-lg-none"
        type="button"
        @click="mobileSidebarToggle">
        <span
          v-if="mobileSidebarShow === false">
          <icon
            name="menu"
            style="font-size: 1.4em;"/>
        </span>
        <span
          v-if="mobileSidebarShow === true">
          <icon
            name="close"
            style="font-size: 1.2em;"/>
        </span>
      </b-button>
      <b-link
        class="navbar-brand"
        to="/"/>
      <b-button
        class="navbar-toggler sidebar-toggler d-md-down-none mr-auto"
        type="button"
        @click="sidebarToggle">
        <span class="navbar-toggler-icon"/>
      </b-button>
      <b-navbar-nav>
        <HeaderDropDown :hide-team="hideTeam"/>
      </b-navbar-nav>
    </header>
  </ComponentContainer>
</template>
<script>
import HeaderDropDown from './HeaderDropdown'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'CHeader',
  components: { HeaderDropDown },
  mixins: [EntitiesMixin],
  props: {
    hideTeam: {
      type: Boolean,
      default: false,
      required: false
    },
    enableMenu: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      mobileSidebarShow: false
    }
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      this.mobileSidebarShow = !this.mobileSidebarShow
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
