<template>
  <ComponentContainer>
  <b-card 
    no-body 
    class="mb-3">
      <b-form
        inline
        class="needs-validation"
        novalidate>
        <!--NameSpace-->
        <b-form-group 
          class="noline"
          :label="$t('general.namespace')">
            <b-form-input
              v-validate="{
              required: true,
              min: 6,
              max: 50,
              regex: /^[a-z0-9]*$/
              }"
              :state="(errors.has('namespace') | isNamespaceExists)  ? false : null"
              v-model="insertItem.namespace"
              :placeholder="$t('general.namespace_placeholder')"
              size="md"
              class="float-left col-xl-6"
              type="text"
              name="namespace"
              @input="checkNamespaceExists"
              autocomplete="nope"
              autofocus
              required
              @focus.native="sendFocusEvent($event)"/>
              <b-input-group-append>
                <b-badge 
              v-if="happyNamesapce"
              style="width: 3.2em;height: 3.2em;line-height: 3em;"
              size="lg"
              class="text-light ml-2 float-left"
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
        <b-form-group :label="$t('general.name')">
          <b-form-input
            v-validate="{
                        required: true,
                        min: 2,
                        max: 150
                        }"
            :state="errors.has('name') ? false : null"
            v-model="insertItem.name"
            :placeholder="$t('general.name')"
            size="md"
            class="col-xl-6"
            type="text"
            autocomplete="nope"
            name="name"
            required
            @focus.native="sendFocusEvent($event)"/>
            <b-form-invalid-feedback v-if="errors.has('name')">
              <span v-for="error in errors.collect('name')">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <!--TODO: remove this block-->
        <AddressForm
          v-if="false"
          v-model="insertItem.address" />

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
            v-model="insertItem.description"
            :rows="2"
            :placeholder="$t('form.team_description_placeholder')"
            size="md"
            class="col-xl-6"
            type="text"
            autocomplete="nope"
            name="description"
            @focus.native="sendFocusEvent($event)"/>
            <b-form-invalid-feedback v-if="errors.has('description')">
              <span v-for="error in errors.collect('description')">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <!--Buttons-->
        <div class="form-row form-button-row p-3">
          <b-button
          type="button"
          :disabled="isNamespaceExists"
          class="btn btn-success float-left mr-2"
          @click="_addTeam(insertItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
          v-if="workspaceList.length > 0"
          type="button"
          variant="secondary"
          class="float-left"
          @click="cancel()">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
     </b-form>
  </b-card>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'
import AddressForm from '@/components/AddressForm'
import EntitiesMixin from '@/mixin/entities'
import _ from 'lodash'

export default {
  name: 'TeamAddForm',
  components: {AddressForm},
  mixins: [EntityAddMixin,EntitiesMixin],
  data () {
    return {
      happyNamesapce: false,
      checkNamespaceLoading: false,
      lastApprovedNamespace: null,
      isNamespaceExists: false,
      debounceTimer: false,
      debounceTimer2: null,
      insertItem: {
        name: '',
        description: '',
        users: '',
        address: {
          address1: '',
          address2: '',
          city: '',
          province: '',
          country: '',
          postalCode: ''
        }
      },
      eventModel: {
        action: 'add_team',
        category: 'Team Add',
        label: 'User added a new team',
        value: 0,
        teamNamespace: '',
        userId: ''
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.debounceTimer)
    clearTimeout(this.debounceTimer2)
  },
  methods: {
    checkNamespaceExists () {
      let namespace = this.insertItem.namespace
      clearTimeout(this.debounceTimer)
      clearTimeout(this.debounceTimer2)
      if (this.lastApprovedNamespace !== namespace) {
        this.happyNamesapce = false 
        this.debounceTimer2 = setTimeout( () => {
          if (!this.errors.has('namespace') && namespace.length >= 6) {
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
        }, 400)
      }
    },
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'      
      // this.sendGtagEvent(this.eventModel)
    },
    @validation
    @successNotification('Team Added Successfully')
    _addTeam (item) {
      this.eventModel.teamNamespace = item.namespace
      this.eventModel.action = 'submit-form'
      // this.sendGtagEvent(this.eventModel)
      return this.addTeam(item).then((response) => {
        if (this.team !== null && this.team !== '') {
          if (item.users !== '') {
            var usersList = item.users.split(',')
            if (usersList.length > 0) {
              for (var i = 0; i < usersList.length; i++) {
                this.getProfile(usersList[i])
                var profile = this.userProfile
                if (profile != null) {
                  this.permissionInsert.entityId = this.team
                  this.permissionInsert.userId = profile.id
                  this.addUserPermission(this.permissionInsert)
                }
              }
              // TODO: be careful about next line
              this.success()
            }
          } else {
            // TODO: be careful about next line
            this.success(response.body.data)
          }
        }
      })
    }
  }
}
</script>
