<template>
  <ComponentContainer>
    <div
      class="pl-2 pr-3 component-authorized-users">
      <div class="table-responsive" >
        <table
          v-if="profile"
          class="table pl-0 ml-0 my-0 pt-0">
          <thead>
            <tr>
              <th> {{ $t('form.access_token') }}</th>
              <th> {{ $t('general.access_level') }}</th>
              <th style="width: 2.5em;" />
              <th style="width: 2.5em;" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="token in tokens"
              :key="token.accessToken">
              <td>{{ trimmedString(token.accessToken) }}</td>
              <td>
                <template v-if="token.role === 1"> {{ $t('general.access_admin') }} </template>
                <template v-if="token.role === 0"> {{ $t('general.access_view') }} </template>
              </td>
              <td class="pr-0">
                <b-button
                  v-b-tooltip
                  :title="$t('buttons.copy')"
                  type="button"
                  size="sm"
                  variant="outline-success"
                  class="btn-iconi my-1 float-right"
                  @click="copyToClipBoard(token.accessToken)">
                  <icon
                    :name="copyIcon"/>
                </b-button>
              </td>
              <td class="pr-0">
                <b-button
                  v-b-tooltip
                  :disabled="tokens.length === 0"
                  :title="$t('buttons.remove')"
                  type="button"
                  size="sm"
                  variant="outline-danger"
                  class="btn-iconi my-1 float-right"
                  @click="_removeToken(token.accessToken)">
                  <icon
                    name="delete"/>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <b-form
        class="needs-validation"
        novalidate
        @submit.prevent>
        <b-form-group class="mb-0">
          <b-input-group class="mb-0">
            <b-input-group-addon class="mx-2 mt-1">
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
            </b-input-group-addon>
            <b-input-group-addon class="mx-3">
              <b-button
                slot="append"
                variant="outline-success"
                type="submit"
                class="btn-iconi float-right"
                @click="getToken()">
                {{ $t("form.invoke_token") }}
              </b-button>
            </b-input-group-addon>
          </b-input-group>
        </b-form-group>
      </b-form>
    </div>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'
export default {
  name: 'TeamTokensForm',
  mixins: [EntitiesMixin],
  props: {
    id: {
      type: [String, Boolean],
      default: null,
      required: true
    }
  },
  data () {
    return {
      timer: null,
      copyIcon: 'copy',
      model: {},
      length: 80,
      showHappyClipboardTimeout: 3000,
      selectedAccessLevelIsAdmin: false
    }
  },
  computed: {
    team () {
      return this.teamById(this.id)
    },
    tokens () {
      let out = null
      if (this.team) {
        out = this.team.tokens
      }
      return out
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  mounted () {
    this.model.teamId = this.workspaceId
  },
  methods: {
    trimmedString (token, le) {
      return token.length > this.length ? token.substring(0, this.length - 3) + '...' : token
    },
    copyToClipBoard (token) {
      clipboard.writeText(token).then(() => {
        // this.copyIcon = 'check'
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // this.copyIcon = 'copy'
        }, this.showHappyClipboardTimeout)
      })
    },
    getToken () {
      let role = this.selectedAccessLevelIsAdmin ? 1 : 0
      this.model.accessLevel = role
      let promise = this.invokeToken(this.model)
      promise.then(result => {
        if (this.team && result.body.code === 200) {
          let obj = { accessToken: result.body.data, role: role }
          this.team.tokens.push(obj)
          this.$forceUpdate()
        }
      })
    },
    _removeToken (token) {
      let model = { teamId: this.workspaceId, token: token }
      let promise = this.removeToken(model)
      promise.then(result => {
        if (result.body.code === 200) {
          let index = this.team.tokens.findIndex(x => x.accessToken === token)
          this.team.tokens.splice(index, 1)
          this.$forceUpdate()
        }
      })
    }
  }
}

</script>
