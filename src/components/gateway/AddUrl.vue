<template>
  <ComponentContainer>
    <b-form-group
      :label="$t('general.gateway_uid')">
      <b-form-input
        v-validate="{
          required: true,
          regex: /^[a-zA-Z0-9]*$/,
          min: 1,
          max: 50
        }"
        :state="(errors.has('uid') | isUrlExists) ? false : null"
        :placeholder="$t('general.gateway_link')"
        v-model="uid"
        autofocus
        class="float-left col-12 col-xl-6 border-radius-6"
        type="text"
        size="md"
        name="uid"
        @input="checkUrlExists"/>
      <b-input-group-append class="d-inline-flex">
        <b-badge
          v-if="happyUrl"
          style="width: 3.2em;height: 3.2em;line-height: 3em;"
          size="lg"
          class="text-light border-radius-6 ml-2 float-left"
          variant="success">
          <span class="h6">
            ✓
          </span>
        </b-badge>
        <Loading
          v-if="checkUrlLoading"
          class="pt-2 pl-2" />
      </b-input-group-append>
      <b-form-invalid-feedback v-if="errors.has('uid')">
        <span
          v-for="(error , index) in errors.collect('uid')"
          :key="index" >
          {{ error }}
        </span>
      </b-form-invalid-feedback>
      <b-form-invalid-feedback v-if="isUrlExists">
        <span>
          {{ $t('validation.custom.gatewayUrlExists') }}
        </span>
      </b-form-invalid-feedback>
    </b-form-group>
  </ComponentContainer>
</template>
<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'GatewayUrl',
  mixins: [EntitiesMixin],
  props: {
    value: {
      type: [String, Boolean],
      required: true,
      default: false
    },
    id: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      startCheckUrlExist: false,
      happyUrl: false,
      checkUrlLoading: false,
      isUrlExists: false,
      debounceTimer: false,
      debounceTimer2: false,
      lastApprovedNamespace: null,
      uid: '',
      eventModel: {
        action: 'add_gateway',
        category: 'Gateway Add',
        label: '',
        value: 0,
        teamNamespace: '',
        userId: ''
      }
    }
  },
  computed: {
    gatewayItem () {
      let item = this.gatewayById(this.id)
      return item
    }
  },
  mounted () {
    if (this.id && this.gatewayById(this.id)) {
      this.uid = this.gatewayById(this.id).url
    }
  },
  beforeDestroy () {
    clearTimeout(this.debounceTimer)
    clearTimeout(this.debounceTimer2)
  },
  methods: {
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'
      // this.sendGtagEvent(this.eventModel)
    },
    checkUrlExists () {
      let namespace = this.uid
      clearTimeout(this.debounceTimer)
      clearTimeout(this.debounceTimer2)
      if (this.lastApprovedNamespace !== namespace) {
        this.startCheckUrlExist = true
        this.happyUrl = false
        this.debounceTimer2 = setTimeout(() => {
          if (!this.errors.has('uid') && namespace.length >= 1) {
            if (this.gatewayItem && namespace === this.gatewayItem.url) {
              this.isUrlExists = false
            } else {
              this.debounceTimer = setTimeout(() => {
                this.checkUrlLoading = true
                this.fetchGatewayUrlExists(namespace).then((response) => {
                  this.checkUrlLoading = false
                  this.isUrlExists = response.body.data
                  if (response.body.data === false) {
                    this.happyUrl = true
                    this.lastApprovedNamespace = namespace
                    this.namespace = namespace
                    this.$emit('input', namespace)
                  }
                  this.startCheckUrlExist = false
                }).catch(() => {
                  this.checkUrlLoading = false
                })
              }, 400)
            }
          }
        }, 400)
      }
    }
  }
}
</script>
