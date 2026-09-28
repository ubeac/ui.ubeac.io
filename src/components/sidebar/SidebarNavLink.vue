<template>
  <div
    v-if="isExternalLink"
    :data-tour="tour">
    <a
      :href="url"
      :class="classList()"
      target="_blank">
      <icon :name="icon"/>
      {{ name }}
      <b-badge
        v-if="badge && badge.text"
        :variant="badge.variant">{{ badge.text }}
      </b-badge>
    </a>
  </div>
  <div
    v-else
    :data-tour="tour">
    <router-link
      v-if="to"
      :to="{ name: to }"
      :class="classList()">
      <icon :name="icon"/>
      {{ name }}
      <b-badge
        v-if="badge && badge.text"
        :variant="badge.variant">{{ badge.text }}
      </b-badge>
    </router-link>
    <router-link
      v-if="!to"
      :to="url"
      :class="classList()">
      <icon :name="icon"/>
      {{ name }}
      <b-badge
        v-if="badge && badge.text"
        :variant="badge.variant">{{ badge.text }}
      </b-badge>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarNavLink',
  props: {
    tour: {
      type: [Number, Boolean, String],
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    to: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: ''
    },
    badge: {
      type: Object,
      default: () => {
      }
    },
    variant: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      addClassTriggerFlag: 1
    }
  },
  computed: {
    linkVariant () {
      return this.variant ? `nav-link-${this.variant}` : ''
    },
    itemClasses () {
      return this.classes ? this.classes.split(' ') : []
    },
    isExternalLink () {
      if (this.url.substring(0, 4) === 'http' || this.url.substring(0, 4) === 'https') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    $route () {
      this.$forceUpdate()
    }
  },
  methods: {
    classList () {
      let selectedStateClass = ''
      if (this.$router.currentRoute.path.concat('/').indexOf(this.url.concat('/')) > -1 && this.addClassTriggerFlag) {
        selectedStateClass = 'router-link-active'
      }
      if (this.$router.currentRoute.name === 'UpdateTeam' && this.routeName === 'DetailsTeam') {
        selectedStateClass = 'router-link-active'
      }
      return [
        selectedStateClass,
        'nav-link',
        this.linkVariant,
        ...this.itemClasses
      ]
    }
  }
}
</script>
