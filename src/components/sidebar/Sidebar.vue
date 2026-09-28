<template>
  <div
    v-show="!fullscreen"
    class="sidebar">
    <SidebarForm/>
    <nav class="sidebar-nav">
      <div slot="header"/>
      <ul class="nav">
        <SidebarHeader/>
        <template
          v-for="(item, index) in authorizedNavItems">
          <template v-if="item.title">
            <SidebarNavTitle
              :key="index"
              :name="item.name"
              :classes="item.class"
              :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider
              :key="index"
              :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown
                :name="item.name"
                :key="index"
                :tour="item.tour"
                :url="item.url"
                :icon="item.icon">
                <!-- eslint-disable vue/valid-v-for -->
                <template
                  v-for="(childL1, index) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown
                      :key="index"
                      :name="childL1.name"
                      :url="childL1.url"
                      :icon="childL1.icon">
                      <li
                        v-for="(childL2, index) in childL1.children"
                        :key="index"
                        class="nav-item">
                        <SidebarNavLink
                          :name="childL2.name"
                          :url="childL2.url"
                          :tour="childL2.tour"
                          :route-name="childL2.routeName"
                          :icon="childL2.icon"
                          :badge="childL2.badge"
                          :variant="item.variant"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class">
                      <SidebarNavLink
                        :name="childL1.name"
                        :url="childL1.url"
                        :icon="childL1.icon"
                        :badge="childL1.badge"
                        :variant="item.variant"/>
                    </SidebarNavItem>
                  </template>
                </template>
                <!-- eslint-enable vue/valid-v-for -->
              </SidebarNavDropdown>
            </template>
            <template v-else >
              <!--TODO: remove this block-->
              <template v-if="item.lazy && false">
                <SidebarNavLazyList
                  :tour="item.tour"
                  :key="index"
                  :dropdown-item="item"
                  :list="item.lazyList" />
              </template>

              <template v-else>
                <SidebarNavItem
                  :class="{'d-lg-none': (item.routeName === 'Profile' || item.routeName === 'Logout' || item.routeName === 'Teams' )}"
                  :key="index"
                  :classes="item.class">
                  <SidebarNavLink
                    :name="item.name"
                    :tour="item.tour"
                    :url="item.url"
                    :route-name="item.routeName"
                    :icon="item.icon"
                    :badge="item.badge"
                    :variant="item.variant"/>
                </SidebarNavItem>
              </template>
            </template>
          </template>
        </template>
      </ul>
      <slot/>
    </nav>
    <SidebarMinimizer/>
  </div>
</template>
<script>
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarMinimizer from './SidebarMinimizer'
import SidebarNavDivider from './SidebarNavDivider'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavItem from './SidebarNavItem'
import { mapGetters } from 'vuex'
import SidebarNavLazyList from './SidebarNavLazyList'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'Sidebar',
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    SidebarNavLazyList
  },
  mixins: [EntitiesMixin],
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      fullscreen: 'layout/fullscreen'
    }),
    userRoles () {
      let out = null
      if (this.user && this.user.user && this.user.user.info) {
        out = this.user.user.info.role
      }
      return out
    },
    authorizedNavItems () {
      let normalizedNavItems = []
      if (this.userRoles) {
        this._.each(this.navItems, (navItem) => {
          if (this.workspaceId) {
            let normalizedChildNavItems = []
            this.checkPermission(navItem, normalizedNavItems)
            if (navItem.children) {
              this._.each(navItem.children, (navChild) => {
                this.checkPermission(navChild, normalizedChildNavItems)
              })
              navItem.children = normalizedChildNavItems
            }
          } else {
            if (navItem.view && navItem.view === 'general') {
              normalizedNavItems.push(navItem)
            }
          }
        })
      }
      if (this.workspaceId) {
        normalizedNavItems.splice(normalizedNavItems.length - 1, 0, {
          'name': 'Settings', // this.teamList[0].name,
          'routeName': 'DetailsTeam',
          'tour': 'team',
          'url': '/team/' + this.workspaceId,
          'icon': 'cog'
        })
      }
      return normalizedNavItems
    }
  },
  methods: {
    checkPermission (navItem, normalizedNavItems) {
      if (navItem.routeName) {
        let routeObject = this.$router.resolve({ name: navItem.routeName })
        if (routeObject.route && routeObject.route.meta && routeObject.route.meta.roles) {
          let routeRoles = routeObject.route.meta.roles
          if (routeRoles.includes('*')) {
            normalizedNavItems.push(navItem)
            return true
          }
          if (this._.intersection(routeRoles, this.userRoles).length > 0) {
            normalizedNavItems.push(navItem)
            return true
          }
        }
      }
    },
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor: pointer;
  }
</style>
