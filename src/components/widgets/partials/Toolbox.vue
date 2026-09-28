<template>
  <ComponentContainer>
    <div class="dashboard-widget--toolbox">
      <i
        class="mr-1 toolbox-icon"
        @click="$emit('remove')">
        <icon name="close"/>
      </i>
      <i
        v-if="settingVisibility"
        class="toolbox-icon"
        @click="$emit('showSettingsModal')">
        <icon name="setting"/>
      </i>
    </div>
  </ComponentContainer>
</template>
<script>
export default {
  name: 'WidgetToolbox',
  props: {
    settingVisibility: {
      default: true,
      type: Boolean,
      required: false
    }
  }
}
</script>
