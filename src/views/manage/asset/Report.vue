<template>
  <ComponentContainer>
    <div class="page-main-content page-asset-tracking animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="default"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("manage.assets.assets_report") }}
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
          <icon
            name="close"/>
        </b-button>
      </div>
      <div class="page-content w-100 float-left">
        <b-row>
          <b-col
            v-show="filterBarVisibility"
            cols="12"
            class="pl-sm-0 pl-md-0 pl-lg-0 pl-xl-0 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2"
            sm="12"
            md="4"
            lg="4"
            xl="3">
            <FilterSensorData
              :device-selector="{enabled: false}"
              :asset-selector="{enabled: true}"
              :sensor-enabled="false"
              :sensor-schema-enabled="false"
              :auto-select-next-items="false"
              :historical="true"
              :auto-save="false"
              :reset-button="{enabled: true}"
              :find-button="{enabled: true}"
              :load-on-mount="true"
              @collapse="false"
              @filter="doFilter"/>
          </b-col>
          <b-col
            :md="filterBarVisibility ? 12 : 12"
            :lg="filterBarVisibility ? 8 : 12"
            :xl="filterBarVisibility ? 9 : 12"
            class="order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1"
            cols="12"
            sm="12">
            <b-card
              no-body
              class="p-0">
              <b-card-body class="p-0">
                <b-card
                  class="mb-0 no-border"
                  no-body>
                  <data-list-no-result
                    v-if="assetData.length <= 0"
                    class="mt-5 mb-5"/>
                  <div
                    v-else
                    class="table-responsive">
                    <table
                      class="table table-striped table-header-colored">
                      <thead>
                        <tr>
                          <th>{{ $t("general.label") }}</th>
                          <th style="width: 150px;">{{ $t("manage.device") }}</th>
                          <th style="width: 150px;">{{ $t("manage.assets.gateway") }}</th>
                          <th style="width: 150px;">{{ $t("general.team") }}</th>
                          <th style="width: 150px;">{{ $t("general.building") }}</th>
                          <th style="width: 150px;">{{ $t("general.floor") }}</th>
                          <th style="width: 130px;" >{{ $t("manage.assets.start_date") }}</th>
                          <th style="width: 130px;" >{{ $t("manage.assets.end_date") }}</th>
                          <th style="width: 130px;" >{{ $t("manage.assets.duration") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in assetData"
                          :key="item.key"
                          class="align-items-center main-row">
                          <td style="width: 140px;">
                            <span> {{ item.assetName }} </span>
                            <!--<pre> {{ item }} </pre>-->
                          </td>
                          <td
                            style="width: 150px;"
                            class="pr-0">
                            <span
                              v-if="deviceById(item.deviceId)"
                              class="text-one-line">
                              {{ deviceById(item.deviceId).name }}
                            </span>
                          </td>
                          <td>
                            <template v-if="getGatewayById(item.gatewayId)">
                              <icon name="gateway" />
                              {{
                                getGatewayById(item.gatewayId).name
                              }}
                            </template>
                          </td>
                          <td>
                            <template v-if="getGatewayById(item.gatewayId) && getTeamById(getGatewayById(item.gatewayId).team)">
                              <icon name="team" />
                              {{
                                getTeamById(getGatewayById(item.gatewayId).team).name
                              }}
                            </template>
                          </td>
                          <td>
                            <template
                              v-if="getGatewayById(item.gatewayId) &&
                              getGatewayById(item.gatewayId).building" >
                              <icon name="building"/>
                              {{
                                getBuildingByFloorId(getGatewayById(item.gatewayId).building).name
                              }}
                            </template>
                          </td>
                          <td>
                            <template v-if="getGatewayById(item.gatewayId) && getFloorById(getGatewayById(item.gatewayId).floor)">
                              <icon name="floor" />
                              {{
                                getFloorById(getGatewayById(item.gatewayId).floor).name
                              }}
                            </template>
                          </td>
                          <td
                            style="width: 120px;"
                            class="pr-0">
                            <span class="text-muted">
                              {{ item.startDate | date }}
                            </span>
                          </td>
                          <td
                            style="width: 120px;"
                            class="pr-0">
                            <span class="text-muted">
                              {{ item.endDate | date }}
                            </span>
                          </td>
                          <td
                            style="width: 120px;"
                            class="pr-0">
                            <span class="text-muted">
                              {{ getDuration(item.startDate, item.endDate) }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
                <b-navbar
                  toggleable="md"
                  type="dark"
                  variant="light">
                  <!--page number-->
                  <b-navbar-nav class="ml-auto">
                    <b-pagination
                      :total-rows="10000"
                      v-model="pageNumber"
                      :per-page="20"
                      size="sm"
                      @change="doFilter(filterModel)"/>
                  </b-navbar-nav>
                </b-navbar>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapActions } from 'vuex'
import ModalRemove from '@/components/ModalRemove'
import FilterSensorData from '@/components/filtering/Device'
import DataListNoResult from '@/components/DataListNoResult'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'AssetTrackingReportPage',
  components: { FilterSensorData, DataListNoResult, ModalRemove },
  mixins: [EntitiesMixin],
  data () {
    let shortDateFormat = this.$config.dateFormat.short
    return {
      shortDateFormat: shortDateFormat,
      filterBarVisibility: true,
      filterModel: {},
      pageNumber: 1,
      assetData: []
    }
  },
  watch: {
    pageNumber () {
      this.doFilter()
    }
  },
  mounted () {
    this.getOveralAssetsData()
    this.getAllAssets()
  },
  beforeDestroy () {
    this.clearStore()
  },
  methods: {
    ...mapActions({
      clearStore: 'assetTracking/clear',
      getAllAssets: 'assetTracking/getAll',
      getOveralAssetsData: 'assetTracking/getData',
      getAssetData: 'assetTracking/getData'
    }),
    getDuration (startDate, endDate) {
      let a = new Moment(startDate).valueOf()
      let b = new Moment(endDate).valueOf()
      let duration = Moment.duration({ milliseconds: b - a })
      return Moment.utc(duration.asMilliseconds()).format(this.shortDateFormat)
    },
    toggleFilterBar () {
      this.filterBarVisibility = !this.filterBarVisibility
    },
    getTeamById (id) {
      return this.teamById(id)
    },
    getBuildingByFloorId (id) {
      return this.buildingById(id)
    },
    getFloorById (id) {
      return this.floorById(id)
    },
    getGatewayById (id) {
      return this.gatewayById(id)
    },
    doFilter (filter) {
      if (filter) {
        this.filterModel = filter
      }
      this.search(this.filterModel)
    },
    search (filter) {
      filter.pageNumber = this.pageNumber
      filter.pageSize = 20
      let promise = this.getAssetData(filter)
      promise.then((response) => {
        this.assetData = response.body.data
      })
    }
  }
}
</script>
