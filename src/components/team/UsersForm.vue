<template>
  <ComponentContainer>
    <div
      class="pl-3 component-authorized-users">
      <div class="table-responsive mb-0" >
      <table
        v-if="profile"
        class="table pl-0 ml-0 my-0 pt-0">
        <thead>
          <tr>
            <th style="width: 2.5em;"></th>
            <th>
              {{ $t('form.first_name') }}
            </th>
            <th>
              {{ $t('form.last_name') }}
            </th>
            <th>
              {{ $t('auth.email') }}
            </th>
            <th>
              {{ $t('form.phone_number') }}
            </th>
            <th>
              {{ $t('general.access') }}
            </th>
            <th style="width: 2.5em;"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id">
            <td
              class="authorize-user-avatar float-left pl-0 mr-0">
              <span
                class="avatar-container-circular" >
                <img
                 :src="getAvatarUrl(user.picture)"
                 alt="Profile Avatar">
              </span>
            </td>
            <td>
              {{ user.firstName }}
            </td>
            <td>
              {{ user.lastName }}
            </td>
            <td>
              {{ user.email }}
            </td>
            <td>
              {{ user.phoneNumber }}
            </td>
            <td>
              <template
                v-if="user.permission.level === 1">
                {{ $t('general.access_admin') }}
              </template>
              <template
                v-if="user.permission.level === 0">
                {{ $t('general.access_view') }}
              </template>
            </td>
            <td
              class="pr-3">
              <b-button
                :disabled="users.length === 1"
                v-b-tooltip
                :title="$t('buttons.remove')"
                type="button"
                size="sm"
                variant="outline-danger"
                class="btn-iconi my-1 float-right"
                @click="removeUser(user)">
                <icon
                  name="delete"/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <b-form
        inline
        class="needs-validation pr-2"
        novalidate
        @submit.prevent>
        <b-form-group 
        :label="$t('form.add_user')"
        class="w-100 ml-0 mb-0">
          <b-input
        v-validate="'required|email'"
        :state="errors.has('users') ? 'invalid' : null"
        :placeholder="$t('form.enter_email')"
        v-model="profileEmail"
        type="text"
        name="users"
        autocomplete="nope"
        class="mr-4 mb-2 mb-sm-0 no-radius authorize-user--add"/>
            <span class="mr-3 text-muted">
              {{ $t('general.access_view') }}
            </span>
            <toggle-button
                  :speed="100"
                  :sync="true"
                  :labels="false"
                  v-model="selectedAccessLevelIsAdmin"
                  :unchecked-value="false"/>
              <span class="ml-3 text-muted">
                {{ $t('general.access_admin') }}
              </span>
              <b-button
                    variant="outline-success"
                    type="submit"
                    @click="_addPermission(profileEmail)"
                    class="ml-3 float-right authorize-user--add-btn">
                <icon name="plus"/>
              </b-button>
              <b-form-invalid-feedback v-if="errors.has('users')">
                <span v-for="error in errors.collect('users')">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
    </div>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'TeamUsersForm',
  mixins: [EntitiesMixin],
  props: {
    id: {
      type: [String, Boolean],
      default: null,
      required: true
    },
    entityId: {
      type: [String, Boolean],
      default: null,
      required: true
    }
  },
  data () {
    return {
      permissionInsert: {
        name: 'new permission',
        description: 'new permission',
        userId: '',
        level: 1,
        teamId: this.workspaceId
      },
      selectedAccessLevelIsAdmin: false,
      profileEmail: ''
    }
  },
  computed: {
    team () {
      return this.teamById(this.id)
    },
    users () {
      let out = null
      if (this.team) {
        out = this.team.users
      }
      this._.each(out, (user) => {
        this._.each(this.permissions, (item) => {
          if (item.userId === user.id) {
            user.permission = item
          }
        })
      })
      return out
    },
    permissions () {
      return this.team.accesses
    }
  },
  methods: {
    removeUser (user) {
      let accessList = this.teamById(this.workspaceId).accesses
      let accessObject = null
      this._.each(accessList, (item) => {
        if (item.userId === user.id) {
          accessObject = item
        }
      })
      this.deletePermission(accessObject.id).then(() => {
        var index = this.users.findIndex(x => x.permissionId === user.permissionId)
        this.users.splice(index, 1)
        this.fetchAssets()
        if (this.profile.email === user.email) {
          this.$router.push({name: 'Teams'})
        }
      })
    },
    checkIsUserInList (email) {
      return this.users.find((item) => {
        return item.email === email
      })
    },
      @validation
    _addPermission (email) {
      if (this.checkIsUserInList(email)) {
        this.$store.commit('notification/error', {
          message: this.$t('messages.duplicate_user'),
          action: '409'
        }, { root: true })
      } else {
        this.fetchProfile(email).then((response) => {
          var profile = response.body.data
          if (profile && profile.id !== null && profile.id !== '') {
            this.permissionInsert.userId = profile.id
            this.permissionInsert.teamId = this.workspaceId
            this.permissionInsert.level = this.selectedAccessLevelIsAdmin ? 1 : 0
            this.addPermission(this.permissionInsert).then(() => {
              this.fetchAssets()
              this.profileEmail = ''
              this.$validator.reset()
            })
          }
        })
      }
    }
  }
}
</script>
