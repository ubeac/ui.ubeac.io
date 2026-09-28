<template>
  <ComponentContainer>
    <b-modal
      v-model="modalVisibility"
      :title="$t('modal.question_confirm_delete_widget')"
      size="sm"
      centered
      ok-variant="danger"
      cancel-variant="secandry"
      class="dashboard-widget-modal--zindex-fixture"
      @show="$emit('show')"
      @hide="$emit('hide')"
      @ok="$emit('ok')">
      <b-alert
        class="my-0"
        show
        variant="warning">
        {{ $t("modal.delete_widget_warning") }} <b>{{ data.widget.name }}</b>.
      </b-alert>
    </b-modal>
  </ComponentContainer>
</template>
<script>
export default {
  name: 'WidgetModalRemove',
  props: {
    visibility: {
      type: Boolean,
      required: false,
      default: false
    },
    data: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    modalVisibility: {
      get () {
        return this.visibility
      },
      set () {
      }
    }
  }
}
</script>
