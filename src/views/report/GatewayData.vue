<template>
  <ComponentContainer
    class="component-gateway-data-table">
    <b-modal
      ref="ModalBodyView"
      centered
      size="lg"
      hide-footer
      ok-variant="info"
      modal-class="component-gateway-data-table--modal">
      <div
        v-if="selectedItem"
        slot="modal-title"
        class="w-100">
        {{ selectedItem.name }}:
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
          v-if="false"
          :title="$t('general.devices')"
          :active="true"
          no-body>
          <div
            v-if="modalSensorData"
            class="tabs-toolbox">
            <b-button
              v-b-tooltip.hover
              :title="$t('buttons.export')"
              variant="outline-primary"
              size="sm"
              class="btn-sm ml-3 float-right d-none d-sm-block"
              @click="exportSensorData(modalSensorData)">
              <icon name="download"/>
            </b-button>
          </div>
          <template v-if="modalSensorData && modalSensorData.length > 0">
            <div class="table-responsive">
              <div
                v-for="item in modalSensorData"
                :key="item.id">
                <template v-if="deviceById(item.id)">
                  <h5 class="pl-2 mt-3">
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
                  class="db-block table w-calc-1">
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

          <div class="tabs-toolbox">
            <b-button
              v-b-tooltip.hover
              v-if="false"
              :title="$t('file.copy')"
              variant="outline-primary"
              size="sm"
              class="btn-sm ml-2 float-right d-none d-sm-block"
              @click="copyToClipBoard(bodyViewData)">
              <!--contentCopyIcon-->
              <icon :name="copyIcon"/>
            </b-button>
            <b-dropdown
              id="down-sm"
              :text="$t(`file.${format}`)"
              class="mb-3 float-right d-none d-sm-block"
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
        <b-tab
          v-if="false"
          :title="$t('data.exceptions')"
          no-body>
          <div class="tabs-toolbox">
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
            v-if="selectedItem && selectedItem.exceptions &&selectedItem.exceptions.length > 0"
            class="p-2">
            <b-alert
              v-for="(item, index) in selectedItem.exceptions"
              :key="index"
              show
              class="mb-2"
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
    <div
      class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="gateway"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("report.gateway_data") }}
          </span>
        </div>
        <b-button
          v-b-tooltip
          v-if="!filterBarVisibility"
          type="button"
          variant="success"
          title="Filtering"
          class="ml-auto mr-0 btn-fab float-right"
          @click.prevent="toggleFilterBar">
          <icon
            name="filter"/>
        </b-button>
        <b-button
          v-b-tooltip
          v-if="filterBarVisibility"
          type="button"
          variant="success"
          title="Filtering"
          class="ml-auto mr-0 btn-fab float-right"
          @click.prevent="toggleFilterBar">
          <icon name="close"/>
        </b-button>
        <b-button-group
          class="btn-round mr-3 float-right">
          <b-button
            v-b-tooltip.hover
            :title="$t('buttons.export')"
            class="float-right d-none d-sm-block pl-3"
            variant="info"
            @click="downloadRequest(reportResult, 'SensorData')">
            <icon
              class="mr-1"
              name="download"/>
            {{ $t("file.json") }}
          </b-button>
          <b-button
            v-b-tooltip.hover
            :title="$t('buttons.export')"
            class="float-right  d-none d-sm-block pr-3"
            variant="info"
            @click="downloadCSV(reportResult, 'SensorData')">
            <icon
              class="mr-1"
              name="download"/>
            {{ $t("file.csv") }}
          </b-button>
        </b-button-group>
      </div>
      <div class="page-content w-100 float-left">
        <b-card
          v-show="filterBarVisibility"
          no-body
          class="mb-3">
          <FilterGateway
            :compact="true"
            :novalidate="true"
            :sensor-schema-enabled="false"
            :auto-select-next-items="false"
            :historical="true"
            :collapse="{enabled: false}"
            :load-on-mount="false"
            :auto-save="false"
            :reset-button="{enabled: true}"
            :find-button="{enabled: true}"
            @collapse="false"
            @filter="doFilter"/>
        </b-card>
        <b-card
          style="position: relative; z-index: 1;"
          no-body
          class="p-0">
          <b-card-body class="p-0">
            <div
              class="mb-0 no-border no-radius-bottom">
              <div
                class="w-100 table-responsive overflow-hidden">
                <table
                  v-if="reportResult && reportResult.length > 0"
                  border="0"
                  style="max-width: 100%;table-layout: fixed;"
                  class="table w-calc-1">
                  <thead class="no-border">
                    <tr>
                      <th
                        class="pl-0"
                        style="width: 70px;">{{ $t("data.method") }}</th>
                      <th style="width: 200px;">{{ $t("general.name") }}</th>
                      <th style="width: 200px;">{{ $t("general.date") }}</th>
                      <th>{{ $t("data.request_body") }}</th>
                      <th style="width: 40px;"/>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in reportResult"
                      :key="item.id"
                      :style="{height: '4.5em'}"
                      class="main-row">
                      <td class="pl-0">
                        <HttpMethod :method="item.requestMethod" />
                      </td>
                      <td
                        class="text-one-line"
                        style="width: 200px;max-width: 300px;">
                        <template
                          v-if="gatewayById(item.gatewayId)">
                          {{ gatewayById(item.gatewayId).name }}
                        </template>
                      </td>
                      <td>
                        {{ item.dateTime | date }}
                      </td>
                      <td>
                        <div class="text-one-line">
                          <small v-if="item.body && item.body.slice" >
                            {{ item.body.slice(0, 400) }}
                          </small>
                        </div>
                      </td>
                      <td style="width: 40px;">
                        <b-button
                          v-b-tooltip.hover
                          :title="$t('manage.details')"
                          :variant="'link'"
                          :size="(item.exceptions && item.exceptions.length > 0) ? 'md' : 'md'"
                          :class="{'text-danger': (item.exceptions && item.exceptions.length > 0)}"
                          class="p-1 clearfix float-right text-one-line"
                          @click="showBodyData(gatewayById(item.gatewayId), item.body)">
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
                <Loading
                  v-if="dataLoading"
                  class="mx-auto mb-5 mt-5 text-center"/>
                <data-list-no-result
                  v-if="!dataLoading && reportResult && reportResult.length === 0 || reportResult === null"
                  class="mt-3"/>
                <b-navbar
                  type="dark"
                  variant="light"
                  class="card-radius-bottom ">
                  <!--page number-->
                  <b-navbar-nav class="ml-auto">
                    <b-pagination
                      :hide-ellipsis="true"
                      :hide-goto-end-buttons="true"
                      :total-rows="totalRows"
                      v-model="pageNumber"
                      size="sm"
                      @input="search(filterModel)"/>
                  </b-navbar-nav>
                </b-navbar>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import FilterSensorData from '@/components/filtering/SensorData'
import FilterGateway from '@/components/filtering/Gateway.vue'
import DataListNoResult from '@/components/DataListNoResult'
import EntitiesMixin from '@/mixin/entities'
import json2csv from 'json2csv'
import Multiselect from '@/components/multiselect/Multiselect.vue'
import HttpMethod from '@/components/HttpMethod'
import RequestView from '@/components/RequestView'

export default {
  name: 'GatewayDataPage',
  components: { RequestView, HttpMethod, Multiselect, FilterGateway, FilterSensorData, DataListNoResult },
  mixins: [EntitiesMixin],
  data () {
    let mediumDateFormat = this.$config.dateFormat.medium
    let shortDateFormat = this.$config.dateFormat.short
    return {
      selectedGatewaysList: [],
      reportResult: [],
      dataLoading: false,
      mediumDateFormat: mediumDateFormat,
      shortDateFormat: shortDateFormat,
      filterBarVisibility: true,
      viewGridMode: true,
      filterModel: {},
      selectedItem: null,
      modalSensorData: null,
      bodyViewData: false,
      format: 'raw',
      copyIcon: 'copy',
      pageNumber: 1,
      pageSize: 20
    }
  },
  computed: {
    totalRows () {
      let out = 1000
      if (this.pageNumber > 1 && this.reportResult.length === 0) {
        out = this.pageNumber * this.pageSize
      }
      if (this.pageNumber === 1 && this.reportResult.length === 0) {
        out = 0
      }
      return out
    }
  },
  mounted () {
    this.search()
  },
  beforeDestroy () {
    this.clearSensorData()
  },
  methods: {
    showBodyData (item, body) {
      this.bodyViewData = body
      this.selectedItem = item
      this.$refs.ModalBodyView.show()
    },
    toggleFilterBar () {
      this.filterBarVisibility = !this.filterBarVisibility
    },
    downloadCSV (content, name) {
      try {
        let parser = new json2csv.Parser()
        this.downloadRequest(parser.parse(content), name, '.csv')
      } catch (err) {
        console.error(err)
      }
    },
    downloadRequest (content, name, format = '.json') {
      let data
      if (format === '.json') {
        data = 'text/jsoncharset=utf-8,' + encodeURIComponent(JSON.stringify(content))
      } else {
        data = 'text/csvcharset=utf-8,' + content
      }
      const a = document.createElement('a')
      a.href = 'data:' + data
      a.download = name + format
      a.innerHTML = 'download JSON'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    doFilter (filter) {
      this.filterModel = filter
      this.pageNumber = 1
      this.search(filter)
    },
    search (filter) {
      if (filter) {
        this.fetchGatewayData({
          toDate: filter.toDate,
          fromDate: filter.fromDate,
          teamId: this.workspaceId,
          gatewayId: filter.gatewayIds,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }).then((response) => {
          this.reportResult = response.body.data
          this.loading = false
        })
      }
    }
  }
}
</script>
