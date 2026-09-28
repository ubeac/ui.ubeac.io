<template>
  <ComponentContainer>
  <b-modal
    ref="ModalConfirmRemove"
    :title="$t('modal.question_confirm')"
    centered
    ok-variant="danger"
    cancel-variant="secondary"
    @ok="deleteMe(underRemoveItem.id)">
    <b-alert
      show
      variant="warning">
      {{ $t("modal.delete_team_warning") }}
    </b-alert>
    <span v-if="underRemoveItem">
      {{ $t("modal.delete_info_1") }} <b>{{ underRemoveItem.name }}</b>.
      {{ $t("modal.delete_info_2") }}
    </span>
  </b-modal>
  <b-card 
   class="no-shadow"
   no-body>
    <b-form
      inline
      v-if="teamUpdate"
      class="needs-validation mb-3"
      novalidate>

      <!--NameSpace-->
      <b-form-group 
      class="input-append noline"
      :label="$t('general.namespace')">
          <b-form-input
            v-validate="{
                         required: true,
                         min: 6,
                         max: 50,
                         regex: /^[a-z0-9]*$/
                         }"
            :state="errors.has('namespace') ? 'invalid' : null"
            v-model="underUpdateItem.namespace"
            :placeholder="$t('general.namespace')"
            size="md"
            class="float-left col-xl-6"
            type="text"
            name="namespace"
            @input="checkNamespaceExists"
            autocomplete="nope"
            autofocus
            required/>
            <b-input-group-append class="d-inline-flex">
              <b-badge 
            v-if="happyNamesapce"
            style="width: 3.2em;height: 3.2em;line-height: 3em;"
            size="lg"
            class="text-light border-radius-6 ml-2 float-left"
            variant="success">
                <span class="h6">
                  ✓ 
                </span>
              </b-badge>
              <Loading v-if="checkNamespaceLoading" class="pt-2 pl-2" />
            </b-input-group-append>
        <b-form-invalid-feedback v-if="errors.has('namespace')">
          <span v-for="error in errors.collect('namespace')">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="isNamespaceExists">
          <span>
            {{ $t('validation.custom.namespaceExists') }} 
          </span>
        </b-form-invalid-feedback>
        <b-form-text
          class="float-left w-100" >
          {{ $t('form.helpers.namespace') }}
        </b-form-text>
      </b-form-group>

      <!--Name-->
      <b-form-group
        :label="$t('general.name')">
        <b-form-input
          v-validate="{
                       required: true,
                       min: 2,
                       max: 150
                       }"
          :state="errors.has('name') ? 'invalid' : null"
          v-model="underUpdateItem.name"
          :placeholder="$t('general.name')"
          size="md"
          class="col-xl-6"
          type="text"
          name="name"
          autocomplete="nope"
          required/>
          <b-form-invalid-feedback v-if="errors.has('name')">
            <span v-for="error in errors.collect('name')">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
      </b-form-group>

      <!--TODO: remove this block-->
      <AddressForm
        v-if="false"
        v-model="underUpdateItem.address" />

      <!--Description-->
      <b-form-group
        :label="$t('general.description') + ' ' + $t('general.optional')"
        class="form-control-optional">
        <b-form-textarea
          v-validate="{
                       min: 0,
                       max: 500 
                       }"
          :state="errors.has('description') ? false : null"
          v-model="underUpdateItem.description"
          :rows="4"
          :placeholder="$t('general.description') + ' ' + $t('general.optional')"
          type="text"
          size="md"
          class="form-input-long col-xl-6"
          autocomplete="nope"
          name="description"/>
          <b-form-invalid-feedback v-if="errors.has('description')">
            <span v-for="error in errors.collect('description')">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
      </b-form-group>

      <div class="form-row form-button-row p-3 mx-0">
        <b-button
          :disabled="updateEnabled || isNamespaceExists"
          type="button"
          class="btn btn-success float-left mr-2"
          @click="update(underUpdateItem)">
          {{ $t("buttons.submit") }}
        </b-button>
        <b-button
          type="button"
          class="btn btn-secondary float-left"
          @click="cancel">
          {{ $t("buttons.cancel") }}
        </b-button>
        <b-button
          type="button"
          variant="outline-danger"
          class="float-right mr-0 text-right"
          @click="prepareForRemove(underUpdateItem)">
          <icon name="delete"/>
          <span
            v-if="!browser.isMobile"
            class="ml-1">
            {{ $t('buttons.delete') }}
          </span>
        </b-button>
      </div>
      </b-form>
  </b-card>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import UsersForm from './UsersForm'
import EntityUpdateMixin from '@/mixin/entityUpdate'
import AddressForm from '@/components/AddressForm'

export default {
  name: 'TeamUpdateForm',
  components: {UsersForm, AddressForm},
  mixins: [EntityUpdateMixin],
  data () {
    return {
      happyNamesapce: false,
      cachedNamespace: null,
      checkNamespaceLoading: false,
      isNamespaceExists: false,
      debounceTimer: false,
      debounceTimer2: false,
      lastApprovedNamespace: null,
      underRemoveItem: null,
      underUpdateItem: {},
      updateItemCached: {},
      permissionInsert: {
        name: 'new permission',
        userId: '',
        entityId: '',
        entityType: 1
      },
      users: []
    }
  },
  computed: {
    teamUpdate () {
      let item = this.teamById(this.id)
      // TODO: Must remove before alpha version, added for handle address schema refactor old teams compatiblity
      if (!item.address) {
        item.address = {}
      }
      if (item) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
        this.users = item.users
        this.permissionInsert.entityId = item.id
        this.cachedNamespace = item.namespace
      }
      this.underUpdateItem = this._.cloneDeep(item)
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return JSON.stringify(this.updateItemCached) === JSON.stringify(this.underUpdateItem)
    }
  },
  beforeDestroy () {
    clearTimeout(this.debounceTimer)
    clearTimeout(this.debounceTimer2)
  },
  methods: {
    checkNamespaceExists () {
      let namespace = this.underUpdateItem.namespace
      clearTimeout(this.debounceTimer)
      clearTimeout(this.debounceTimer2)
      if (this.lastApprovedNamespace !== namespace) {
        this.happyNamesapce = false 
        this.debounceTimer2 = setTimeout( () => {
          if (!this.errors.has('namespace') && namespace.length >= 6) {
            if (this.cachedNamespace === namespace) {
              this.isNamespaceExists = false
            } else {
              this.debounceTimer = setTimeout( () => {
                this.checkNamespaceLoading = true
                this.fetchNamespaceExists(namespace).then((response) => {
                  this.checkNamespaceLoading = false 
                  this.isNamespaceExists = response.body.data
                  if (response.body.data === false) {
                    this.happyNamesapce = true
                    this.lastApprovedNamespace = namespace
                  }
                }).catch(() => {
                  this.checkNamespaceLoading = false 
                })
              }, 500)
            }
          }
        }, 400)
      }
    },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteTeam(id).then(() => {
        this.$emit('successdelete')
      })
    },
    prepareForRemove (item) {
      this.underRemoveItem = item
      this.$refs.ModalConfirmRemove.show()
    },
      @validation
        @successNotification('Update Done')
    update (item) {
      var team = {
        id: item.id,
        name: item.name,
        description: item.description,
        teamId: item.teamId,
        namespace: item.namespace,
        address: {
          address1: item.address.address1,
          address2: item.address.address2,
          city: item.address.city,
          country: item.address.country,
          province: item.address.province,
          postalCode: item.address.postalCode
        }
      }
      return this.updateTeam(team).then(() => {
        this.success()
      })
    }
  }
}
</script>
