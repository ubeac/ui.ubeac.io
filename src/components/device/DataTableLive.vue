<template>
  <ComponentContainer>
    <div class="component-gateway-data-table">
      <b-modal
        ref="ModalBodyView"
        centered
        size="lg"
        hide-footer
        ok-variant="info"
        modal-class="component-gateway-data-table--modal">
        <div
          slot="modal-title"
          class="w-100">
          {{ gatewayItem.name }}:
          <template v-if="selectedItem">
            <span class="text-muted ml-auto">
              {{ selectedItem.dateTime | date }}
            </span>
          </template>
        </div>
        <b-tabs
          v-if="modalSensorData"
          class="component-gateway-data-table--modal-body"
          pills
          card>
          <b-tab
            :active="true"
            :title="$t('data.request_body')"
            no-body>
            <div class="tabs-toolbox">
              <b-button
                v-b-tooltip.hover
                :title="$t('file.copy')"
                variant="outline-primary"
                size="sm"
                class="btn-sm mb-3 ml-2 float-right"
                @click="copyToClipBoard(modalSensorData)">
                <icon :name="copyIcon"/>
              </b-button>
            </div>
            <RequestView
              :content="modalSensorData"
              :format="format"/>
          </b-tab>
        </b-tabs>
      </b-modal>
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="float-left">
          <div class="pt-4 px-2">
            <span class="text-primary h5 float-left ml-2">{{ $t("general.live_data") }}</span>
          </div>
        </b-col>
        <b-col
          cols="12"
          sm="6"
          class="float-right pl-0">
          <div class="pt-0 pt-sm-4 px-2">
            <!--Pause-->
            <b-link
              v-b-tooltip
              v-if="!pauseRender"
              :title="$t('buttons.pause')"
              class="btn btn-iconic btn-fab-no-bg float-sm-right mr-0 float-left ml-2 ml-sm-0"
              @click="pauseSocket">
              <icon name="pause"/>
            </b-link>
            <!--Play/Pause-->
            <b-link
              v-b-tooltip
              v-if="pauseRender"
              :title="$t('buttons.play')"
              class="btn btn-iconic btn-fab-no-bg float-sm-right mr-0 float-left ml-2 ml-sm-0"
              @click="playSocket">
              <icon name="play"/>
            </b-link>
            <b-button
              v-b-tooltip.hover
              :title="$t('buttons.delete')"
              class="btn-iconic btn-fab-no-bg float-sm-right mr-0 float-left ml-2 ml-sm-0"
              @click="removeData">
              <!--contentCopyIcon-->
              <icon name="delete"/>
            </b-button>
            <b-button
              v-b-tooltip.hover
              :title="$t('buttons.export')"
              class="btn-iconic btn-fab-no-bg float-sm-right mr-0 float-left ml-2 ml-sm-0"
              @click="exportSensorData(liveData)">
              <!--contentCopyIcon-->
              <icon name="download"/>
            </b-button>
            <b-button
              v-b-tooltip.hover
              :title="$t('manage.socket_status')"
              :disbale="true"
              :variant="'light'"
              :class="{'btn-socket-connected': socketStatus && socketStatus === 'connected'}"
              class="btn-socket-status btn-fab-no-bg btn-iconic btn-numb btn-disabled float-sm-right mr-0 float-left ml-3 ml-sm-0">
              <icon name="plug"/>
            </b-button>
            <b-form-select
              v-model="requestCount"
              size="sm"
              class="float-right mx-2 text-center no-border px-2 shadow-light"
              style="width: 55px;"
              @input="resetRenderedDataList">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </b-form-select>
          </div>
        </b-col>
      </b-row>
      <div
        v-if="loading"
        class="w-100 text-center py-5">
        <Loading/>
      </div>
      <template v-else>
        <div
          v-if="liveData.length > 0"
          class="table-responsive">
          <table
            class="db-block table w-calc-1"
            style="max-width: 100%;table-layout: fixed;">
            <thead class="w-100">
              <tr>
                <th style="width: 250px;">{{ $t("manage.sensors.sensor_type") }}</th>
                <th style="width: 150px;">{{ $t("manage.sensors.sensor") }}</th>
                <th style="width: 200px;">{{ $t("general.gateway") }}</th>
                <th style="width: 200px;">{{ $t("data.date") }}</th>
                <th style="width: 150px;">{{ $t("manage.sensors.value") }}</th>
                <th style="width: 60px;"/>
              </tr>
            </thead>
            <tbody class="w-100">
              <tr
                v-for="(item, indexGatewayData) in liveData"
                :key="indexGatewayData"
                style="height: 80px;"
                class="main-row">
                <td
                  class="text-one-line"
                  style="width: 250px;">
                  <template
                    v-if="sensorById(item.sensorId) && sensorById(item.sensorId).type">
                    <icon
                      v-if="sensorById(item.sensorId)"
                      :name="sensorById(item.sensorId).type.name.toLowerCase()"
                      class="mr-2"/>
                    <span> {{ sensorById(item.sensorId).type.name }} </span>
                    <small
                      v-if="sensorById(item.sensorId).unit"
                      class="text-muted">
                      (
                      <template
                        v-if="sensorById(item.sensorId).prefix">
                        <span> {{ sensorById(item.sensorId).prefix.name }} </span>
                      </template>
                      <span v-if="sensorById(item.sensorId).unit"> {{ sensorById(item.sensorId).unit.name }} </span>
                      )
                    </small>
                  </template>
                </td>
                <td>
                  <span
                    v-if="sensorById(item.sensorId)">
                    {{ sensorById(item.sensorId).name }}
                  </span>
                </td>
                <td>
                  <span
                    v-if="gatewayById(item.gatewayId)">
                    {{ gatewayById(item.gatewayId).name }}
                  </span>
                </td>
                <td>
                  <small>
                    {{ item.dateTime | date }}
                  </small>
                </td>
                <td>
                  <template v-for="(value, key) in item.data" >
                    <div
                      :key="key"
                      class="w-100">
                      <template
                        v-if="key !== 'value' && key !== 'Value'" >
                        <span class="text-capitalize">{{ key }}</span>:
                      </template>
                      <span class="text-capitalize">{{ value }}</span>
                    </div>
                  </template>
                </td>
                <td style="width: 60px;">
                  <b-button
                    v-b-tooltip.hover
                    :title="$t('manage.details')"
                    :variant="'link'"
                    :size="(item.exceptions && item.exceptions.length > 0) ? 'sm' : 'md'"
                    :class="{'text-danger': (item.exceptions && item.exceptions.length > 0)}"
                    class="clearfix float-right"
                    @click="showBodyData(item)">
                    <icon
                      v-if="!(item.exceptions && item.exceptions.length > 0)"
                      class="text-primary"
                      name="info"/>
                    <icon
                      v-if="(item.exceptions && item.exceptions.length > 0)"
                      name="danger"/>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <data-list-no-result
          v-if="liveData.length <= 0"
          class="mt-4 mb-3"/>
      </template>
    </div>
  </ComponentContainer>
</template>

<script>
import RequestView from '../RequestView'
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'
import SocketMixin from '@/mixin/socket'
import EntitiesMixin from '@/mixin/entities'
import HttpMethod from '@/components/HttpMethod'

export default {
  name: 'DeviceLiveDataTable',
  components: { HttpMethod, RequestView },
  mixins: [SocketMixin, EntitiesMixin],
  props: {
    kind: {
      type: [Boolean, String],
      default: 'gateway',
      required: false
    },
    gatewayItem: {
      type: [Boolean, Object],
      default: null,
      required: true
    },
    id: {
      type: [String, Boolean],
      default: null,
      required: true
    }
  },
  data () {
    return {
      liveData: [],
      pauseRender: false,
      showHappyClipboardTimeout: 2000,
      copyIcon: 'copy',
      format: 'raw',
      selectedItem: null,
      modalSensorData: null,
      bodyViewData: false,
      requestCount: 5,
      loading: false
    }
  },
  beforeDestroy () {
    this.clearGatewayData()
  },
  methods: {
    startSocketThings () {
      let groupId = `SensorData/${this.gatewayItem.teamId}/*/${this.id}/*`
      this.joinGroupSocket(groupId)
    },
    pauseSocket () {
      this.pauseRender = true
    },
    playSocket () {
      this.pauseRender = false
    },
    resetRenderedDataList () {
      this.liveData = []
    },
    exportSensorData (content) {
      const data = 'text/jsoncharset=utf-8,' + encodeURIComponent(JSON.stringify(content))
      const a = document.createElement('a')
      a.href = 'data:' + data
      a.download = this.id + '.json'
      a.innerHTML = 'download JSON'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    onGroupDataSocket (data) {
      // TODO: fix me
      if (!this.pauseRender) {
        this.liveData.push(data.data)
        this.$emit('updateLiveData', data.data)
        if (this.liveData.length > this.requestCount) {
          this.liveData.shift()
        }
      }
    },
    removeData () {
      this.liveData = []
    },
    copyToClipBoard (content) {
      clipboard.writeText(content).then(() => {
        this.copyIcon = 'check'
        setTimeout(() => {
          this.copyIcon = 'copy'
        }, this.showHappyClipboardTimeout)
      })
    },
    getGatewayData (id) {
      this.loading = true
      this.fetchGatewayData({
        gatewayIds: id,
        pageSize: this.requestCount
      }).then(() => {
        this.loading = false
      })
    },
    getSensorData (data) {
      this.modalSensorData = JSON.stringify(data)
    },
    downloadRequest (content) {
      const data = 'text/jsoncharset=utf-8,' + encodeURIComponent(JSON.stringify(content))
      const a = document.createElement('a')
      a.href = 'data:' + data
      a.download = this.id + '.json'
      a.innerHTML = 'download JSON'
      a.click()
    },
    showBodyData (item) {
      this.getSensorData(item)
      this.bodyViewData = item.body
      this.selectedItem = item
      this.$refs.ModalBodyView.show()
    }
  }
}
</script>
