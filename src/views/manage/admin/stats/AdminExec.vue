<template>
  <ComponentContainer>
    <div class="page-main-content page-asset-tracking animated fadeIn pt-0">
      <div class="page-content-header pl-0">
        <div class="float-left">
          <icon
            name="execute"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("manage.admin.admin_Exec") }}
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
            class="pl-lg-0 pl-xl-0 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2"
            sm="12"
            md="4"
            lg="4"
            xl="3">
            <!--DB Name-->
            <b-card class="mb-3">
              <b-form-group :label="$t('general.db_name')">
                <b-form-input
                  v-validate.disable="'required'"
                  :state="errors.has('dbName') ? 'invalid' : null"
                  v-model="dbName"
                  :placeholder="$t('general.db_name')"
                  type="text"
                  name="dbName"
                  autofocus
                  required/>
                <b-form-invalid-feedback v-if="errors.has('dbName')">
                  <span v-for="error in errors.collect('dbName')">
                    {{ error }}
                  </span>
                </b-form-invalid-feedback>
              </b-form-group>

              <!--Query-->
              <b-form-group
                :label="$t('general.query')">
                <b-form-textarea
                  v-model="query"
                  :rows="2"
                  :placeholder="$t('general.query')"
                  type="text"
                  name="query"
                  required/>
                <b-form-invalid-feedback v-if="errors.has('query')">
                  <span v-for="error in errors.collect('query')">
                    {{ error }}
                  </span>
                </b-form-invalid-feedback>
              </b-form-group>

              <!--Button-->
              <b-button
                type="button"
                class="btn btn-success float-left mr-2"
                @click="search()">
                {{ $t("buttons.submit") }}
              </b-button>
            </b-card>
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
              class="p-0 mb-3">
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
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'AdminRunQueryPage',
  mixins: [EntitiesMixin],
  data () {
    let shortDateFormat = this.$config.dateFormat.short
    return {
      shortDateFormat: shortDateFormat,
      filterBarVisibility: true,
      pageNumber: 1,
      filter: {},
      dbName: '',
      query: '',
      logData: [],
      titles: []
    }
  },
  methods: {
    ...mapActions({
      runQuery: 'adminReport/runQuery'
    }),
    toggleFilterBar () {
      this.filterBarVisibility = !this.filterBarVisibility
    },
    search () {
      this.filter.db = this.dbName
      this.filter.query = this.query
      let promise = this.runQuery(this.filter)
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
