<template>
  <ComponentContainer>
    <div class="page-main-content page-asset-tracking animated fadeIn pt-0">
      <div class="page-content-header pl-0">
        <div class="float-left">
          <icon
            name="log"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("manage.admin.admin_log_count") }}
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
            class="mb-3 pl-lg-0 pl-xl-0 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2"
            sm="12"
            md="4"
            lg="4"
            xl="3">
            <FilterAdminLog
              :sensor-enabled="false"
              :sensor-schema-enabled="false"
              :auto-select-next-items="false"
              :historical="true"
              :auto-save="false"
              :reset-button="{enabled: false}"
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
                  class="mb-0 no-border no-shadow"
                  no-body>
                  <data-list-no-result
                    v-if="logData.length <= 0"
                    class="mt-5 mb-5"/>
                  <div
                    v-else
                    class="table-responsive">
                    <table
                      class="table table-striped table-header-colored">
                      <thead>
                        <tr>
                          <th
                            v-for="title in titles"
                            :key="title">
                            {{ title }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in logData"
                          :key="item.key"
                          class="align-items-center main-row">
                          <td
                            v-for="property in item"
                            :key="property">
                            {{ property }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
                <b-navbar
                  toggleable="md"
                  type="dark"
                  variant="light"
                  class="card-radius-bottom">
                  <!--page number-->
                  <b-navbar-nav class="ml-auto">
                    <b-pagination
                      :total-rows="10000"
                      v-model="pageNumber"
                      :per-page="100"
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
import FilterAdminLog from '@/components/filtering/AdminLog'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'AdminLogReportPage',
  components: { FilterAdminLog },
  mixins: [EntitiesMixin],
  data () {
    let shortDateFormat = this.$config.dateFormat.short
    return {
      shortDateFormat: shortDateFormat,
      filterBarVisibility: true,
      filterModel: {},
      pageNumber: 1,
      logData: [],
      titles: []
    }
  },
  watch: {
    pageNumber () {
      this.doFilter()
    }
  },
  methods: {
    ...mapActions({
      getLogReport: 'adminReport/getLogReport'
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
    doFilter (filter) {
      if (filter) {
        this.filterModel = filter
      }
      this.search(this.filterModel)
    },
    search (filter) {
      filter.pageNumber = this.pageNumber
      filter.pageSize = 20
      let promise = this.getLogReport(filter)
      promise.then((response) => {
        this.logData = response.body.data
        if (this.logData.length > 0) {
          this.titles = Object.keys(this.logData[0])
        }
      })
    }
  }
}
</script>
