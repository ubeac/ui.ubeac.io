<template>
  <ComponentContainer>
    <div
      v-if="userProfile"
      class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="sensor"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("manage.sensors.sensor_data") }}
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
            @click="downloadRequest(sensorData, 'SensorData')">
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
            @click="downloadCSV(sensorData, 'SensorData')">
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
          class="p-0 mb-3">
          <FilterDevice
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
          no-body
          style="position: relative; z-index: 1;"
          class="p-0">
          <b-card-body class="p-0">
            <div v-if="viewGridMode">
              <div
                class="mb-0 no-border no-radius-bottom">
                <div class="w-100 table-responsive">
                  <table
                    v-if="sensorTypesWidthTypeKey && sensorData && sensorData.length > 0"
                    border="0"
                    class="table w-calc-1">
                    <thead class="no-border">
                      <tr>
                        <th
                          class="pl-0"
                          style="width: 200px;">{{ $t("manage.sensors.sensor_type") }}</th>
                        <th>{{ $t("manage.sensors.sensor") }}</th>
                        <th>{{ $t("general.device") }}</th>
                        <th>{{ $t("general.gateway") }}</th>
                        <th>{{ $t("general.team") }}</th>
                        <th>{{ $t("general.date") }}</th>
                        <th>{{ $t("manage.sensors.value") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in sensorData"
                        :key="item.id"
                        :style="{height: '4.5em'}"
                        class="main-row">
                        <td
                          class="pl-0 text-one-line"
                          style="width: 200px;max-width: 300px;">
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
                              <span> {{ sensorById(item.sensorId).unit.name }} </span>
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
                          <template
                            v-if="sensorById(item.sensorId)">
                            {{ deviceById(sensorById(item.sensorId).deviceId).name }}
                          </template>
                        </td>
                        <td>
                          <span
                            v-if="gatewayById(item.gatewayId)">
                            {{ gatewayById(item.gatewayId).name }}
                          </span>
                        </td>
                        <td>
                          <template
                            v-if="sensorById(item.sensorId) && sensorById(item.sensorId).deviceId &&
                            deviceById(sensorById(item.sensorId).deviceId)">
                            {{ teamById(deviceById(sensorById(item.sensorId).deviceId).teamId).name }}
                          </template>
                        </td>
                        <td>
                          {{ item.dateTime | date }}
                        </td>
                        <td>
                          <template v-for="(value, key) in item.data" >
                            <div
                              :key="key"
                              class="w-100">
                              <template
                                v-if="key !== 'value' && key !== 'Value'" >
                                <span
                                  class="text-capitalize">
                                  {{ key }}
                                </span>:
                              </template>
                              <span
                                class="text-capitalize">
                                {{ value }}
                              </span>
                            </div>
                          </template>
                          <div
                            :style="{'background-color': getIndexColor(index)}"
                            class="table-row-art-line" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Loading
                  v-if="dataLoading"
                  class="mx-auto mb-5 mt-5 text-center"/>
                <data-list-no-result
                  v-if="!dataLoading && firstLoadDone && sensorData && sensorData.length === 0"
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
                      :per-page="20"
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
import FilterDevice from '@/components/filtering/Device.vue'
import DataListNoResult from '@/components/DataListNoResult'
import EntitiesMixin from '@/mixin/entities'
import json2csv from 'json2csv'

export default {
  name: 'SensorDataPage',
  components: { FilterDevice, DataListNoResult },
  mixins: [EntitiesMixin],
  data () {
    let mediumDateFormat = this.$config.dateFormat.medium
    let shortDateFormat = this.$config.dateFormat.short
    return {
      dataLoading: false,
      firstLoadDone: false,
      mediumDateFormat: mediumDateFormat,
      shortDateFormat: shortDateFormat,
      filterBarVisibility: true,
      viewGridMode: true,
      filterModel: {},
      pageNumber: 1,
      pageSize: 20
    }
  },
  computed: {
    totalRows () {
      let out = 1000
      if (this.pageNumber > 1 && this.sensorData.length === 0) {
        out = this.pageNumber * this.pageSize
      }
      if (this.pageNumber === 1 && this.sensorData.length === 0) {
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
      delete filter.sensorSelectedValue
      this.filterModel = filter
      this.pageNumber = 1
      this.search(filter)
    },
    search (filter) {
      if (filter) {
        filter.pageNumber = this.pageNumber
        filter.pageSize = this.pageSize
        this.dataLoading = true
        this.fetchSensorData(filter).then(() => {
          this.$forceUpdate()
          this.dataLoading = false
          this.firstLoadDone = true
        }).catch(() => {
          this.dataLoading = false
        })
      } else {
        this.dataLoading = true
        this.fetchSensorData().then(() => {
          this.$forceUpdate()
          this.dataLoading = false
          this.firstLoadDone = true
        }).catch(() => {
          this.dataLoading = false
        })
      }
    }
  }
}
</script>
