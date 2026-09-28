<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn">
      <b-card
        class="card-shadow"
        no-body>
        <b-card-header
          class="px-2">
          <b-form-input
            v-model="groupId"
            type="text"
            class="w-25 float-left"
            placeholder="Enter Socket URL" />
          <b-btn
            :class="{'btn-loading': joinGroupLoading}"
            variant="primary"
            class="mt-0 float-left"
            @click="joinGroupSocket(groupId)">
            Join Group
          </b-btn>
          <b-btn
            :class="{'btn-loading': leaveGroupLoading}"
            variant="warning"
            class="mt-0 float-left ml-2"
            @click="leaveGroupSocket(groupId)">
            Leave Group
          </b-btn>
          <b-button
            v-b-tooltip.hover
            :title="$t('manage.socket_status')"
            :class="{'btn-success': socketObject && socketStatus && socketStatus === 'connected'}"
            size="md"
            class="btn-numb btn-disabled float-right mr-auto mt-0 ml-2">
            <icon name="plug"/>
            {{ socketStatus }}
          </b-button>
          <b-button
            v-b-tooltip.hover
            :title="$t('manage.socket_status')"
            variant="danger"
            size="md"
            class="btn-numb btn-disabled float-right mr-auto mt-0"
            @click="clearData">
            Clear Data
          </b-button>
          <toggle-button
            v-b-tooltip.hover
            :value="true"
            :speed="100"
            :sync="true"
            :labels="false"
            v-model="renderSocketData"
            class="float-right mt-2 mr-2"
            unchecked-value="false"
            title="Render Data"/>
        </b-card-header>
        <b-card-body>
          <multiselect
            v-model="selectedTags"
            :multiple="true"
            :placeholder="$t('manage.select_device_uid')"
            :options="deviceList"
            class="mb-2"/>
          <span> Joined Groups:
            <pre> {{ socketJoinedGroups }} </pre>
            <template
              v-for="(item, key) in socketJoinedGroups" >
              <span class="h4">
                <b-badge
                  :key="key"
                  pill
                  variant="light"
                  size="lg">
                  {{ key }}
                </b-badge>
              </span>
            </template>
          </span>
          <h4 class="mt-3 mb-3">
            <b-badge
              pill
              variant="light"
              size="lg">
              Public Data Count: {{ socketPublicDataCount }}
            </b-badge>
            <b-badge
              pill
              variant="light"
              size="lg">
              Group Data Count: {{ socketGroupDataCount }}
            </b-badge>
          </h4>
          <b-list-group
            v-if="renderSocketData">
            <b-list-group-item
              v-for="(item, index) in socketData"
              :key="index">
              <pre>{{ item }} </pre>
            </b-list-group-item>
          </b-list-group>
        </b-card-body>
      </b-card>
    </div>
  </ComponentContainer>
</template>

<script>
import Multiselect from 'vue-multiselect'
import SocketMixin from '@/mixin/socket'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'SocketTest',
  components: { Multiselect },
  mixins: [SocketMixin, EntitiesMixin],
  data () {
    return {
      socketCheckInterval: null,
      selectedTags: [],
      renderSocketData: true,
      groupId: ''
    }
  },
  computed: {
    socketStatus () {
      let out = false
      if (this.socketObject) {
        out = this.socketObject.status
      }
      return out
    }
  },
  methods: {
    onGroupDataSocket (data) {
      this.socketData.push(data)
      if (this.socketData.length > 50) {
        this.socketData.shift()
      }
    }
  }
}
</script>
