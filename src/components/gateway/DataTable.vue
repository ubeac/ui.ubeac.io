<template>
  <ComponentContainer>
    <div class="component-gateway-data-table">
      <b-modal
        ref="ModalBodyView"
        centered
        size="lg"
        hide-footer
        ok-variant="info">
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
        <b-tabs>
          <b-tab
            :title="$t('manage.sensors.sensor_data')"
            no-body
            active>
            <div
              v-if="modalSensorData"
              class="tabs-toolbox">
              <b-button
                v-b-tooltip.hover
                :title="$t('buttons.export')"
                variant="outline-primary"
                size="sm"
                class="btn-sm btn-info ml-3 float-right"
                @click="exportSensorData(modalSensorData)">
                <!--contentCopyIcon-->
                <icon name="download"/>
              </b-button>
            </div>
            <div
              v-if="getSensorDataLoading"
              class="w-100 text-center py-5">
              <Loading/>
            </div>
            <template v-else>
              <div class="table-responsive">
                <table
                  v-if="modalSensorData && modalSensorData.length > 0"
                  class="db-block table table-striped w-100">
                  <thead>
                    <tr>
                      <th>{{ $t("manage.sensors.sensor") }}</th>
                      <th>{{ $t("manage.sensors.value") }}</th>
                      <th>{{ $t("manage.sensors.device_id") }}</th>
                      <th>{{ $t("general.date") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="item in modalSensorData" >
                      <template v-if="item.sensors.length > 0" >
                        <tr
                          v-for="sensor in item.sensors">
                          <td>
                            <icon :name="sensor.type"/>
                            <template v-if="getSensorObject(item.type)">
                              {{ getSensorObject(sensor.type).name }}
                            </template>
                            <template v-if="getSensorObject(item.type)">
                              ({{ getSensorObject(sensor.type).unit }})
                            </template>
                          </td>
                          <td>
                            {{ sensor.value }}
                          </td>
                          <td>
                            {{ item.uid }}
                          </td>
                          <td>
                            {{ item.dateTime | date }}
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
                    </template>
                  </tbody>
                </table>
                <p
                  v-else
                  class="text-center text-muted">
                  {{ $t("manage.sensors.no_sensor_with_req") }}
                </p>
              </div>
            </template>
          </b-tab>
          <b-tab
            :title="$t('data.request_body')"
            no-body>

            <div class="tabs-toolbox">
              <b-button
                v-b-tooltip.hover
                :title="$t('file.copy')"
                variant="outline-primary"
                size="sm"
                class="btn-sm btn-info ml-2 float-right"
                @click="copyToClipBoard(bodyViewData)">
                <!--contentCopyIcon-->
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
              :format="format"/>
          </b-tab>
        </b-tabs>
      </b-modal>
      <b-card
        class="card-shadow"
        no-body>
        <section>
          <b-navbar
            toggleable="md"
            class="p-3"
            type="dark"
            variant="light">
            <b-navbar-nav>
              <span class="mt-1 ml-2">{{ $t("data.last") }}</span>
              <!--page size-->
              <b-form-select
                v-model="requestCount"
                size="sm"
                class="float-left mx-2"
                @input="getGatewayData(id)">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </b-form-select>
              <span class="mt-1 ml-1">{{ $t("data.requests") }}</span>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-button
                v-b-tooltip.hover
                :disabled="loading"
                :title="$t('buttons.export')"
                size="md"
                class="float-right mr-3"
                variant="success"
                @click="downloadRequest(gatewayData)">
                <icon name="download"/>
              </b-button>
              <b-button
                v-b-tooltip.hover
                :title="$t('buttons.refresh')"
                size="md"
                class="float-right"
                variant="success-outline"
                @click="getGatewayData(id)">
                <icon name="refresh"/>
              </b-button>
            </b-navbar-nav>
          </b-navbar>
          <div
            v-if="loading"
            class="w-100 text-center py-5">
            <Loading/>
          </div>
          <template v-else>
            <div class="table-responsive">
              <table
                class="db-block table table-striped w-100"
                style="max-width: 100%;table-layout: fixed;">
                <thead class="w-100">
                  <tr>
                    <th style="width: 200px;">{{ $t("data.receive_date") }}</th>
                    <th>{{ $t("data.request_body") }}</th>
                    <th style="width: 60px;"/>
                  </tr>
                </thead>
                <tbody class="w-100">
                  <tr
                    v-for="(item, indexGatewayData) in gatewayData"
                    :key="indexGatewayData">
                    <td style="width: 200px;">
                      {{ item.dateTime | date }}
                    </td>
                    <td>
                      <div class="text-one-line">
                        {{ item.body.slice(0, 400) }}
                      </div>
                    </td>
                    <td style="width: 60px;">
                      <b-button
                        class="clearfix float-right"
                        variant="link"
                        @click="showBodyData(item)">
                        <icon name="info"/>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </section>
      </b-card>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RequestView from '../RequestView'
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'

export default {
  name: 'GatewayDataTable',
  components: { RequestView },
  props: {
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
      showHappyClipboardTimeout: 2000,
      copyIcon: 'copy',
      format: 'raw',
      getSensorDataLoading: false,
      selectedItem: null,
      modalSensorData: null,
      bodyViewData: false,
      requestCount: 20,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      gateway: 'gateway/gateway',
      gatewayData: 'gatewaydata/gatewayData'
    })
  },
  mounted () {
    this.getGatewayData(this.id)
  },
  beforeDestroy () {
    this.clearGatewayData()
  },
  methods: {
    ...mapActions({
      updateItem: 'gateway/update',
      getUserAssets: 'userassets/getUserAssets',
      clearGatewayData: 'gatewaydata/clearGatewayData'
    }),
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
    copyToClipBoard (content) {
      clipboard.writeText(content).then(() => {
        this.copyIcon = 'check'
        setTimeout(() => {
          this.copyIcon = 'copy'
        }, this.showHappyClipboardTimeout)
      })
    },
    getSensorObject (sensorType) {
      return this.sensorByType(sensorType)
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
