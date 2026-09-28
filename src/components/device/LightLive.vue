<template>
  <ComponentContainer>
    <div class="component-live-devices">
      <b-modal
        ref="ModalBodyView"
        centered
        size="lg"
        hide-footer
        class="live-data-details-model"
        ok-variant="info">
        <div
          v-if="selectedItem"
          slot="modal-title"
          class="w-100">
          {{ selectedItem.uid }}:
          <template v-if="selectedItem">
            <span class="text-muted ml-auto">
              {{ selectedItem.dateTime | date }}
            </span>
          </template>
        </div>
        <b-tabs>
          <b-tab
            :title="$t('manage.details')"
            no-body
            active>
            <div class="tabs-toolbox mb-2">
              <b-button
                v-b-tooltip.hover
                :title="$t('file.copy')"
                variant="outline-primary"
                size="sm"
                class="ml-2 float-right"
                @click="copyToClipBoard(bodyViewData)">
                <icon :name="copyIcon"/>
              </b-button>
              <b-dropdown
                id="down-sm"
                :text="format"
                class="float-right"
                right
                variant="outline-primary"
                size="sm">
                <b-dropdown-item @click="format = 'raw'">{{ $t("file.Raw") }}</b-dropdown-item>
                <b-dropdown-item @click="format = 'json'">{{ $t("file.Json") }}</b-dropdown-item>
                <b-dropdown-item @click="format = 'yaml'">{{ $t("file.Yaml") }}</b-dropdown-item>
                <b-dropdown-item @click="format = 'xml'">{{ $t("file.XML") }}</b-dropdown-item>
                <b-dropdown-item @click="format = 'html'">{{ $t("file.HTML") }}</b-dropdown-item>
              </b-dropdown>
            </div>
            <RequestView
              :content="bodyViewData"
              :format="format"
              default-format="json"/>
          </b-tab>
        </b-tabs>
      </b-modal>
      <div
        class="table-responsive">
        <h2 class="table-header py-3 mb-0">
          {{ $t("general.live_devices") }}
          <b-button
            v-b-tooltip
            v-if="!pause"
            :title="$t('buttons.pause')"
            variant="info"
            class="float-right ml-2"
            @click="pauseSocket">
            <icon name="pause"/>
          </b-button>
          <b-button
            v-b-tooltip
            v-if="pause"
            :title="$t('buttons.play')"
            variant="info"
            class="float-right ml-2"
            @click="playSocket">
            <icon
              name="play"
              class="page-live-devices--play-icon"/>
          </b-button>
          <router-link
            v-b-tooltip
            :title="$t('buttons.live_device_page')"
            :to="{name: 'LiveDevices'}"
            class="float-right btn">
            <icon name="link"/>
          </router-link>
        </h2>
        <data-list-no-result
          v-if="Object.keys(filteredTagsList).length === 0"
          class="mt-4 mb-3"/>
        <table
          v-else
          border="0"
          class="table table-white-row">
          <thead>
            <th>
              {{ $t('device.search_device') }}
            </th>
          </thead>
          <tbody>
            <template
              v-for="(item, key) in filteredTagsList">
              <tr
                :class="{'under-edit-row' : underEditList.includes(key)}"
                :key="item.data.deviceUid"
                :style="{height: '4.5em'}"
                class="align-items-center main-row">
                <td
                  style="max-width: 150px;"
                  class="pr-0 text-one-line">
                  <icon
                    v-b-tooltip.hover
                    v-if="item.data.isValid"
                    :title="$t('device.is_valid')"
                    name="check" />
                  <icon
                    v-b-tooltip.hover
                    v-if="!item.data.isValid"
                    :title="$t('device.is_invalid')"
                    name="danger" />
                  <span
                    v-b-tooltip.hover
                    v-if="deviceByUid(`${item.data.uid}-${gatewaysTeam(item.data.gatewayId).id}`)"
                    :title="deviceByUid(`${item.data.uid}-${gatewaysTeam(item.data.gatewayId).id}`).name"
                    class="text-truncate text-one-line">
                    {{ deviceByUid(`${item.data.uid}-${gatewaysTeam(item.data.gatewayId).id}`).name | truncate(30, '...') }}
                  </span>
                  <span
                    v-else
                    class="text-truncate text-one-line">
                    {{ item.data.uid | truncate(30, '...') }}
                  </span>
                </td>
                <td style="width: 130px;">
                  <b-button
                    v-b-tooltip.hover
                    :title="$t('manage.details')"
                    class="float-right"
                    variant="link"
                    @click="showBodyData(item)">
                    <icon name="info"/>
                  </b-button>
                  <router-link
                    v-b-tooltip.hover
                    v-if="deviceByUid(`${item.data.uid}-${gatewaysTeam(item.data.gatewayId).id}`)"
                    :title="$t('device.update_device')"
                    :to="{name: 'UpdateDevice', params: {id: deviceByUid(item.data.uid + '-' + gatewaysTeam(item.data.gatewayId).id).id}}"
                    class="float-right btn mt-1 btn-sm">
                    <icon name="setting"/>
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </ComponentContainer>
</template>
<script>
import SocketMixin from '@/mixin/socket'
import RequestView from '../RequestView'
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'DeviceLightLivesList',
  components: { RequestView },
  mixins: [SocketMixin, EntitiesMixin],
  props: {
    pause: {
      type: [Boolean, Object],
      default: null,
      required: false
    },
    filter: {
      type: [Boolean, Object],
      default: null,
      required: false
    }
  },
  data () {
    return {
      showHappyClipboardTimeout: 2000,
      bodyViewData: false,
      selectedItem: null,
      format: 'json',
      copyIcon: 'copy',
      modalSensorData: null,
      isSocketConnect: false,
      firstViewUpdateTimeout: null,
      devicesObject: {},
      devicesList: [],
      forceUpdateInterval: null,
      removeModalVisibility: false,
      underRemoveData: null,
      underEditList: []
    }
  },
  computed: {
    filteredTagsList () {
      let out = {}
      this._.each(this.devicesList, (item, index) => {
        out[item] = this.devicesObject[item]
      })
      return out
    }
  },
  mounted () {
    this.search()
  },
  beforeDestroy () {
    clearInterval(this.forceUpdateInterval)
    clearTimeout(this.firstViewUpdateTimeout)
  },
  methods: {
    pauseSocket () {
      this.pause = true
    },
    playSocket () {
      this.pause = false
    },
    showRowDetails (item) {
      item.showDetails = !item.showDetails
      this.$forceUpdate()
    },
    modalRemoveSubmit () {
      this.release(this.underRemoveData.id, this.underRemoveData.deviceUid)
    },
    modalRemoveHide () {
      this.removeModalVisibility = false
    },
    search (filter) {
      if (this.isSocketConnect) {
        this.restartSocketThings()
        this.devicesObject = {}
        this.devicesList = []
      }
    },
    restartSocketThings () {
      this.clearSocketThings().then(() => {
        this.startSocketThings()
      })
    },
    startSocketThings () {
      this.isSocketConnect = true
      if (this.filter && this.filter.gatewayIds[0]) {
        let gatewayId = this.filter.gatewayIds[0] || '*'
        let deviceId = this.filter.deviceIds[0] || '*'
        let sensorType = this.filter.types[0] || '*'
        let gatewayItem = this.gatewayById(gatewayId)
        let teamId = '*'
        if (gatewayItem && gatewayItem.team) {
          teamId = gatewayItem.team
        }
        let groupId = `SensorData/${teamId}/${gatewayId}/${deviceId}/${sensorType}`
        this.joinedGroup.push(groupId)
        this.joinGroupSocket(groupId)
      } else {
        this.gatewayList.forEach((gateway, index) => {
          let gatewayId = gateway.id
          let deviceId = (this.filter && this.filter.deviceIds[0]) || '*'
          // let sensorType = (this.filter && this.filter.types[0]) || '*'
          let gatewayItem = this.gatewayById(gatewayId)
          let teamId = '*'
          if (gatewayItem && gatewayItem.team) {
            teamId = gatewayItem.team
          }
          let groupId = `DeviceRawData/${teamId}/*/${deviceId}`
          this.joinedGroup.push(groupId)
          this.joinGroupSocket(groupId)
        })
      }
    },
    showBodyData (item) {
      this.bodyViewData = JSON.stringify(item.data)
      this.selectedItem = item.data
      this.$refs.ModalBodyView.show()
    },
    copyToClipBoard (content) {
      clipboard.writeText(content).then(() => {
        this.copyIcon = 'check'
        setTimeout(() => {
          this.copyIcon = 'copy'
        }, this.showHappyClipboardTimeout)
      })
    },
    onGroupDataSocket (payload) {
      let name = null
      let id = null
      if (!this.pause && this.underEditList.length === 0) {
        if (!this.devicesObject[payload.data.uid]) {
          this.devicesObject[payload.data.uid] = {}
          this.devicesObject[payload.data.uid].data = payload.data
          if (name && !this.devicesObject[payload.data.uid].name) {
            this.devicesObject[payload.data.uid].name = name
            this.devicesObject[payload.data.uid].id = id
            this.devicesObject[payload.data.uid].isValid = id.payload.data.isValid
          }
          this.devicesList.push(payload.data.uid)
          if (this.devicesList.length > 100) {
            delete this.devicesObject[this.devicesList[0]]
            this.devicesList.splice(0, 1)
          }
        }
      }
    }
  }
}
</script>
