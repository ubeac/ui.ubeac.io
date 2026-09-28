<template>
  <ComponentContainer>
    <div class="app workspace-manage-pages">
      <AppHeader 
      :hide-team="true"
      class="container pt-2 px-0 mx-auto" />
      <div
        v-if="browser.isMobile"
        class="app-body">
        <Sidebar
          :nav-items="nav"/>
        <main class="main">
          <div class="container-fluid container-manage px-4">
            <template >
              <router-view />
            </template>
          </div>
        </main>
      </div>
      <div
        v-else
        class="app-body container px-0">
        <router-view />
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import { Header as AppHeader, Sidebar } from '@/components/'
import EntitiesMixin from '@/mixin/entities'
import nav from '@/_nav'
export default {
  name: 'AuthPagesContainer',
  components: { AppHeader, Sidebar },
  mixins: [EntitiesMixin],
  data () {
    return {
      nav: nav.items
    }
  }
}
</script>
