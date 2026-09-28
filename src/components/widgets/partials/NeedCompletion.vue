<template>
  <b-card-body
    class="dashboard-widget-skeleton-mode p-2 pb-0 position-relative">
    <div class="dashboard-widget--raw">
      <b-button
        v-if="editMode"
        size="sm"
        class="text-one-line dashboard-widget--connection-btn"
        variant="outline-success"
        @click="showSettingsModal">
        {{ $t("dashboard.widget.connect") }}
      </b-button>
    </div>
    <div class="dashboard-widget--skeleton-icon">
      <icon :name="icon"/>
    </div>
  </b-card-body>
</template>
<script>
export default {
  name: 'WidgetNeedCompletion',
  props: {
    editMode: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    icon: {
      type: [String, Boolean],
      required: false,
      default: 'RawWidget'
    }
  },
  methods: {
    showSettingsModal () {
      this.$emit('showSettingsModal')
    }
  }
}
</script>
