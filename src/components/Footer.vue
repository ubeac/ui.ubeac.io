<template>
  <footer class="app-footer px-4">
    <span>
      <a
        :href="$t('ubeac')"
        target="_blank">
        {{ $t("app_title") }}
      </a>
      &copy; 2020.
    </span>
    <span class="ml-auto">v{{ appVersion }}</span>
  </footer>
</template>
<script>
export default {
  name: 'CFooter',
  data () {
    return {
      /* eslint-disable */
      appVersion: VERSION,
      /* eslint-enable */
    }
  }
}
</script>
