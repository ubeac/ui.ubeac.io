<template>
  <ComponentContainer>
    <b-button
      v-b-tooltip.hover
      :title="$t('manage.socket_status')"
      :disbale="true"
      :variant="connected ? 'success' : 'light'"
      :class="{'btn-socket-connected': connected, 'btn-disabled': connected}"
      class="btn-socket-status btn-numb btn-disabled float-right">
      <icon name="plug"/>
    </b-button>
  </ComponentContainer>
</template>
<script>
import SocketMixin from '@/mixin/socket'
export default {
  name: 'SocketStatus',
  mixins: [SocketMixin],
  props: {
    variant: {
      type: [String, Boolean],
      required: false,
      default: false
    }
  },
  computed: {
    connected () {
      return this.socketStatus && this.socketStatus === 'connected'
    },
    classList () {
      return [
        'callout',
        this.calloutVariant
      ]
    },
    calloutVariant () {
      return this.variant ? `callout-${this.variant}` : ''
    }
  }
}
</script>
