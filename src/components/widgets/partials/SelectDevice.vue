<template>
  <ComponentContainer>
    <div
      v-if="userProfile">
      <b-row>
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="12">
          <DeviceFilter
            :filter-by-team="workspaceId"
            :feint="true"
            :novalidate="true"
            :filtering-data="dataFilter"
            :load-on-mount="false"
            @filter="doFilter"/>
        </b-col>
        <b-col
          v-if="false"
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="12">
          <b-card
            no-body
            class="p-0 card-feint">
            <b-card-body class="p-0">
              <template v-if="searchLoading" >
                <Loading class="mx-auto mt-5 text-center" />
              </template>
              <template v-else>
                <table
                  v-if="sensorTypesWidthTypeKey && sensorDataInner && sensorDataInner.length > 0"
                  class="table no-border table-sm table-responsive-sm table-striped">
                  <thead>
                    <tr>
                      <th>{{ $t("manage.sensors.sensor") }}</th>
                      <th>{{ $t("manage.sensors.value") }}</th>
                      <th>{{ $t("manage.sensors.device_id") }}</th>
                      <th>{{ $t("general.date") }}</th>
                      <th>{{ $t("manage.sensors.gateway_name") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in sensorDataInner"
                      :key="index">
                      <td
                        class="dashboard-widget-select"
                        @click="addSensorTypeToFiltering(item.sensorType)">

                        <icon
                          :name="item.sensorType"
                          class="mr-2"/>
                        <template v-if="sensorTypesWidthTypeKey[item.sensorType]">
                          {{ sensorTypesWidthTypeKey[item.sensorType]['name'] }}
                        </template>
                        <template v-if="sensorTypesWidthTypeKey[item.sensorType]">
                          ({{ sensorTypesWidthTypeKey[item.sensorType]['unit'] }})
                        </template>
                      </td>
                      <td>
                        {{ item.value }}
                      </td>
                      <td
                        class="dashboard-widget-select"
                        @click="addTagIdToFiltering(item.deviceUid)">
                        {{ item.deviceUid }}
                      </td>
                      <td>
                        {{ item.lastRequestDate | date }}
                      </td>
                      <td
                        class="dashboard-widget-select"
                        @click="addGatewayIdToFiltering(item.gatewayId)">
                        <template v-if="getGatewayById(item.gatewayId)">
                          {{ getGatewayById(item.gatewayId).name }}
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <data-list-no-result v-if="sensorDataInner && sensorDataInner.length <= 0"/>
              </template>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </ComponentContainer>
</template>

<script>
import FilterSensorData from '@/components/filtering/SensorData'
import DeviceFilter from '@/components/filtering/Device'
import DataListNoResult from '@/components/DataListNoResult'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'SelectDevice',
  components: { DeviceFilter, FilterSensorData, DataListNoResult },
  mixins: [EntitiesMixin],
  props: {
    selectedTypesMultiple: {
      type: Boolean,
      required: false,
      default: false
    },
    dataFilter: {
      type: [Boolean, Object, String],
      required: false,
      default: null
    },
    staticCount: {
      type: [Number, Boolean],
      required: false,
      default: false
    },
    sensorValueType: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      searchLoading: false,
      sensorDataInner: [],
      viewGridMode: true,
      filterModel: {},
      date: new Date(),
      pageNumber: 1
    }
  },
  mounted () {
    if (this.dataFilter) {
      this.filterModel = this.dataFilter
    }
  },
  methods: {
    doFilter (filter) {
      this.filterModel = filter
      this.pageNumber = 1
      this.search(filter)
    },
    search (filter) {
      if (filter) {
        filter.pageNumber = this.pageNumber
        filter.pageSize = this.staticCount
        this.searchLoading = true
        delete filter.toDate
        delete filter.fromDate
        this.$emit('updateFilter', filter)
      }
    },
    addSensorTypeToFiltering (sensorType) {
      if (!this.filterModel.types.includes(sensorType)) {
        this.filterModel.types.push(sensorType)
        this.doFilter(this.filterModel)
      }
    },
    addTagIdToFiltering (deviceUid) {
      if (!this.filterModel.deviceIds.includes(deviceUid)) {
        this.filterModel.deviceIds.push(deviceUid)
        this.doFilter(this.filterModel)
      }
    },
    addGatewayIdToFiltering (gatewayId) {
      if (!this.filterModel.gatewayIds.includes(gatewayId)) {
        this.filterModel.gatewayIds.push(gatewayId)
        this.doFilter(this.filterModel)
      }
    }
  }
}
</script>
