<template>
  <ComponentContainer>
    <b-modal
      v-model="modalVisibility"
      :title="$t('modal.question_confirm')"
      size="sm"
      centered
      ok-variant="danger"
      cancel-variant="secondary"
      @show="$emit('show')"
      @hide="$emit('hide')"
      @ok="$emit('ok')">
      <b-alert
        show
        variant="warning">
        {{ $t("modal.delete_warning") }}
      </b-alert>
      <span v-if="data && data.name">
        {{ $t("modal.delete_info_1") }}<b>{{ data.name }}</b>.
        {{ $t("modal.delete_info_2") }}
      </span>
    </b-modal>
  </ComponentContainer>
</template>
<script>
export default {
  name: 'RemoveModal',
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
