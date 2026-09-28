<template>
  <ComponentContainer>
    <b-modal
      ref="ModalConfirmRemove"
      :visible="modalVisibility"
      :title="$t('modal.question_confirm')"
      centered
      ok-variant="danger"
      cancel-variant="secondary"
      @ok="deleteMe"
      @hide="cancel"
      @cancel="cancel">
      <b-alert
        show
        variant="warning" v-if="warningMessage === null || warningMessage === ''">
        {{ $t("modal.delete_warning") }}
      </b-alert>
      <b-alert
        show
        variant="warning" v-else>
        {{ warningMessage }}  
      </b-alert>
      <span>
        {{ $t("modal.delete_info_1") }} <b v-if="item && item.name">{{ item.name }}</b>.
        {{ $t("modal.delete_info_2") }}
      </span>
    </b-modal>
  </ComponentContainer>
</template>
<script>
import successNotification from '@/decorators/successNotification'
export default {
  name: 'EntityModalRemove',
  props: {
    item: {
      type: [Boolean, Object],
      default: false,
      required: true
    },
    action: {
      type: [String, Boolean],
      default: false,
      required: true
    },
    warningMessage: ''
  },
  computed: {
    modalVisibility () {
      return this.item !== false
    }
  },
  methods: {
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.$store.dispatch(this.action, this.item.id).then(() => {
        this.success()
      })
    },
    cancel () {
      this.$emit('cancel')
    },
    success () {
      this.$emit('success')
    }
  }
}
</script>
