<template>
  <li
    :class="classListComputed"
    :to="url"
    tag="li"
    class="nav-item nav-dropdown"
    disabled>
    <div
      class="nav-link nav-dropdown-toggle"
      @click="handleClick">
      <icon :name="icon"/>
      {{ name }}
    </div>
    <ul class="nav-dropdown-items">
      <slot/>
    </ul>
  </li>
</template>

<script>
import Nav from '../../_nav'

export default {
  props: {
    linked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    classListComputed () {
      let out = []
      let outClass = ''
      Nav.items.filter((item) => {
        if (this.$router.currentRoute.path === this.url) {
          out.push(this.url)
        }
        if (item.name === this.name && item.children) {
          item.children.filter((child) => {
            if (this.$router.currentRoute.path.concat('/').indexOf(child.url.concat('/')) > -1) {
              out.push(child)
            }
            if (this.$router.currentRoute.path.indexOf(this.url.concat('/')) > -1) {
              out.push(child)
            }
          })
        } else {
          if (this.$router.currentRoute.path.indexOf(this.url.concat('/')) > -1) {
            out.push(true)
          }
        }
      })
      if (out.length > 0) {
        outClass = 'open'
      }
      return outClass
    }
  },
  watch: {
    $route: {
      deep: true,
      handler () {
        this.$forceUpdate()
      }
    }
  },
  methods: {
    classList () {
      let out = []
      let outClass = ''
      Nav.items.filter((item) => {
        if (item.name === this.name && item.children) {
          item.children.filter((child) => {
            if (this.$router.currentRoute.path.concat('/').indexOf(child.url.concat('/')) > -1) {
              out.push(child)
            }
            if (this.$router.currentRoute.path.split('/')[1].concat('/').indexOf(child.url.concat('/')) > -1) {
              out.push(child)
            }
          })
        }
      })
      if (out.length > 0) {
        outClass = 'open'
      }
      return outClass
    },
    handleClick (e) {
      if (this.linked) {
        this.$router.push({ name: 'Dashboards' })
      } else {
        e.preventDefault()
        e.target.parentElement.classList.toggle('open')
      }
    }
  }
}
</script>
