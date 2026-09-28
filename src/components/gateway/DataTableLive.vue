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
          pills
          class="component-gateway-data-table--modal-body"
          card>
          <b-tab
            :title="$t('general.devices')"
            :active="true"
            class="pr-0"
            no-body>
            <div
              v-if="modalSensorData"
              class="tabs-toolbox">
              <b-button
                v-b-tooltip.hover
                :title="$t('buttons.export')"
                variant="outline-primary"
                size="sm"
                class="btn-sm mx-3 float-right d-none d-sm-block"
                @click="exportSensorData(modalSensorData)">
                <icon name="download"/>
              </b-button>
            </div>
            <template v-if="modalSensorData && modalSensorData.length > 0">
              <div class="table-responsive">
                <div
                  v-for="item in modalSensorData"
                  :key="item.id"
                  class="form-bottom-lined mb-2">
                  <template v-if="deviceById(item.id)">
                    <h5 class="pl-0 mb-0 mt-0">
                      {{ deviceById(item.id).name }}
                    </h5>
                  </template>
                  <template v-else>
                    <h5 class="pl-2 mt-3">
                      {{ item.uid }}
                    </h5>
                  </template>
                  <table
                    v-if="item.sensors && item.sensors.length > 0 "
                    class="db-block table w-100 ml-0">
                    <thead>
                      <tr class="text-muted">
                        <th>{{ $t("manage.sensors.sensor") }}</th>
                        <th>{{ $t("manage.sensors.value") }}</th>
                        <th>{{ $t("general.device") }}</th>
                        <th>{{ $t("general.date") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="item.sensors && item.sensors.length > 0" >
                        <tr
                          v-for="sensor in item.sensors">
                          <td style="width: 180px;">
                            <template v-if="sensorById(sensor.sensorId) && sensorById(sensor.sensorId).type">
                              <icon
                                v-if="sensorById(sensor.sensorId) && sensorById(sensor.sensorId).type"
                                :name="sensorById(sensor.sensorId).type.name | lowercase"
                                style="position:relative; top: 3px;"
                                class="mr-1 float-left d-none d-lg-table-cell"/>
                              <span class="pl-0 pl-lg-2"> {{ sensorById(sensor.sensorId).name }} </span>
                            </template>
                            <template v-if="sensor.type">
                              <icon
                                v-if="sensor.type"
                                :name="sensor.type | lowercase"
                                class="mr-3"/>
                              <template v-if="sensorByType(sensor.type)">
                                <span>
                                  {{ sensorByType(sensor.type).name }}
                                </span>
                              </template>
                            </template>
                          </td>
                          <td style="width: 100px;">
                            <template v-for="(value, key) in sensor.data" >
                              <span
                                :key="key">
                                <span
                                  v-if="key !== 'value' && key !== 'value'"
                                  class="text-capitalize">
                                  {{ key }}:
                                </span>
                                <span class="text-capitalize mr-2">{{ value }}</span>
                              </span>
                            </template>
                          </td>
                          <td>
                            <template v-if="deviceById(item.id)">
                              {{ deviceById(item.id).name }}
                            </template>
                          </td>
                          <td>
                            {{ sensor.dateTime | date }}
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <!-- eslint-disable -->
                      <tr
                        v-for="sensor in item.sensors">
                        <td>
                          {{ $t("manage.sensors.no_sensor_data") }}
                        </td>
                        <td/>
                          <td>
                            {{ item.uid }}
                          </td>
                          <td>
                            {{ item.dateTime | date }}
                          </td>
                      </tr>
                      <!-- eslint-enable -->
                      </template>
                    </tbody>
                  </table>
                  <p
                    v-else
                    class="text-center mt-3 text-muted">
                    {{ $t("manage.sensors.no_sensor_with_req") }}
                  </p>
                </div>
              </div>
            </template>
            <template v-else>
              <DataListNoResult class="mt-3">
                {{ $t('messages.no_device_detected') }}
              </DataListNoResult>
            </template>
          </b-tab>
          <b-tab
            :title="$t('data.request_body')"
            no-body>

            <div class="tabs-toolbox w-100">
              <b-button
                v-b-tooltip.hover
                :title="$t('file.copy')"
                variant="outline-primary"
                size="sm"
                class="btn-sm mb-3 ml-2 float-right d-none d-sm-block"
                @click="copyToClipBoard(bodyViewData)">
                <!--contentCopyIcon-->
                <icon :name="copyIcon"/>
              </b-button>
              <b-dropdown
                id="down-sm"
                :text="$t(`file.${format}`)"
                class="float-right d-none d-sm-block"
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
              :content="bodyViewDataSanitize"
              :format="format"/>
          </b-tab>
          <b-tab
            :title="$t('data.exceptions')"
            no-body>
            <div class="tabs-toolbox mb-3">
              <b-button
                v-b-tooltip.hover
                :title="$t('file.copy')"
                variant="outline-primary"
                size="sm"
                class="btn-sm ml-2 float-right d-none d-sm-block"
                @click="copyToClipBoard(selectedItem.exceptions)">
                <!--contentCopyIcon-->
                <icon :name="copyIcon"/>
              </b-button>
            </div>
            <div
              v-if="selectedItem && selectedItem.exceptions.length > 0"
              class="py-2">
              <b-alert
                v-for="(item, index) in selectedItem.exceptions"
                :key="index"
                show
                class="mb-2 mt-3"
                variant="warning">
                {{ item }}
              </b-alert>
            </div>
            <DataListNoResult
              v-else
              class="mt-3"/>
          </b-tab>
        </b-tabs>
      </b-modal>
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="float-left">
          <div class="pt-3 px-2">
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
              class="btn btn-iconic btn-fab-no-bg float-sm-right mr-0 float-left ml- ml-sm-0"
              @click="removeData">
              <!--contentCopyIcon-->
              <icon name="delete"/>
            </b-button>
            <b-button
              v-b-tooltip.hover
              :title="$t('buttons.export')"
              class="btn btn-iconic btn-fab-no-bg float-sm-right mr-0 float-left ml-2 ml-sm-0"
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
              class="btn-socket-status btn-fab-no-bg btn-iconic btn-numb btn-disabled float-sm-right mr-0 float-left ml-2 ml-sm-0">
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
            style="table-layout: fixed;">
            <thead class="w-100">
              <tr>
                <th
                  class="pl-0"
                  style="width: 70px;">{{ $t("data.method") }}</th>
                <th style="width: 100px;">{{ $t("data.protocol") }}</th>
                <th style="width: 200px;">{{ $t("data.date") }}</th>
                <th class="d-none d-sm-block">{{ $t("data.request_body") }}</th>
                <th style="width: 60px;"/>
              </tr>
            </thead>
            <tbody class="w-100">
              <tr
                v-for="(item, indexGatewayData) in liveData"
                :key="indexGatewayData"
                class="main-row">
                <td
                  class="pl-0"
                  style="width: 70px;">
                  <HttpMethod :method="item.requestMethod" />
                </td>
                <td style="width: 100px;">
                  <small>
                    {{ item.requestProtocol }}
                  </small>
                </td>
                <td style="width: 200px;">
                  <small>
                    {{ item.dateTime | date }}
                  </small>
                </td>
                <td class="d-none d-sm-block">
                  <div class="text-one-line mt-2">
                    <small>
                      {{ item.body | slice(400) }}
                    </small>
                  </div>
                </td>
                <td style="width: 60px;">
                  <b-button
                    v-b-tooltip.hover
                    :title="$t('manage.details')"
                    :variant="'link'"
                    :size="(item.exceptions && item.exceptions.length > 0) ? 'md' : 'md'"
                    :class="{'text-danger': (item.exceptions && item.exceptions.length > 0)}"
                    class="pr-1 clearfix float-right text-one-line"
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
  name: 'GatewayLiveDataTable',
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
    },
    count: {
      type: [Number],
      default: 20,
      required: false
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
      requestCount: 20,
      loading: false
    }
  },
  computed: {
    bodyViewDataSanitize () {
      return this.bodyViewData ? this.bodyViewData : false
    }
  },
  mounted () {
    this.requestCount = this.count
  },
  beforeDestroy () {
    this.clearGatewayData()
  },
  methods: {
    startSocketThings () {
      if (this.kind === 'gateway') {
        this.joinGroupSocket(`GatewayData/${this.workspaceId}/${this.id}`)
      } else if (this.kind === 'device') {
        let groupId = `SensorData/${this.workspaceId}/*/${this.id}/*`
        this.joinGroupSocket(groupId)
      }
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
      this.modalSensorData = data
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
      this.getSensorData(item.devices)
      this.bodyViewData = item.body
      this.selectedItem = item
      this.$refs.ModalBodyView.show()
    }
  }
}
</script>
