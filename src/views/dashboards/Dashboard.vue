<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="dashboard"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">{{ $t("dashboard.dashboard") }}</span>
        </div>
        <router-link
          :to="{ name: 'NewDashboard'}"
          class="float-right btn btn-fab btn-success mr-0">
          <icon name="add"/>
        </router-link>
      </div>
      <!--Card View-->
      <b-container
        class="p-0"
        fluid>
        <b-row
          v-if="viewCardMode"
          class="row-fixture">
          <b-col
            v-if="dashboardList && dashboardList.length === 0"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">
            <b-card
              class="w-100 mb-0 float-left entity-item-card entity-item-card--add"
              @click="$router.push(`dashboards/new`)">
              <div class="card-text">
                <h1 class="text-center">
                  <icon
                    name="add"
                    class="card-view-add-item-icon"/>
                </h1>
                <div class="text-center w-100 db-block">
                  {{ $t("manage.add_dashboard") }}
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col
            v-for="(item, index) in dashboardList"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">
            <b-card
              no-body
              style="height: 200px;"
              class="component-entity-card mb-0">
              <div
                :style="{'background-color': getIndexColor(index)}"
                class="bottom-border" />
              <!--Header-->
              <b-card-header class="p-3">
                <router-link :to="{ name: 'DashboardsItem', params: {id: item.id}}">
                  <h4 class="py-1 w-75 text-one-line">{{ item.name }}</h4>
                </router-link>
                <b-badge
                  v-b-tooltip.hover
                  :title="$t('manage.members')"
                  variant="info"
                  class="p-2 component-entity-card--user-badge"
                  size="sm">
                  <icon name="users"/>
                </b-badge>
              </b-card-header>
              <!--Body-->
              <b-card-body class="p-0">
                <div class="pb-3 pt-0 px-3">
                  <template v-if="item.description">
                    <p class="text-one-line card-text text-description mb-2">{{ item.description }}</p>
                  </template>
                  <template v-else>
                    <p class="mh-1"/>
                  </template>
                  <small class="card-text text-small mb-3 w-100 float-right"> {{ $t("general.update") }} {{ item.createDate | moment("from") }}</small>
                </div>
                <!--Badge-->
                <b-row
                  v-if="false"
                  class="entity-item-card--badge mx-0">
                  <b-col class="p-0">
                    <b-badge
                      variant="light"
                      class="w-100 text-center component-entity-card--badge-light px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        {{ teamBuildingsCount(item.id) }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.buildings") }}</span>
                  </b-col>
                  <b-col class="p-0">
                    <b-badge
                      variant="secondary"
                      class="w-100 text-center component-entity-card--badge-dark px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        <template v-if="item.gateways && item.gateways[0] !== null">
                          {{ teamGatewaysCount(item.id) }}
                        </template>
                        <template v-else>
                          0
                        </template>
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.gateways") }}</span>
                  </b-col>
                  <b-col class="p-0">
                    <b-badge
                      variant="light"
                      class="w-100 text-center component-entity-card--badge-light px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        {{ teamDevicesCount(item.id) }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.devices") }}</span>
                  </b-col>
                  <b-col class="p-0">
                    <b-badge
                      variant="secondary"
                      class="w-100 text-center component-entity-card--badge-dark px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        {{ teamSensorsCount(item.id) }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.SENSORS") }}</span>
                  </b-col>
                </b-row>
              </b-card-body>
              <!--Footer-->
              <b-card-footer class="p-3">
                <router-link
                  v-b-tooltip.hover
                  :title="$t('manage.details')"
                  :to="{ name: 'DashboardsItem', params: {id: item.id}}"
                  class="btn float-right p-0">
                  <icon name="info"/>
                </router-link>
                <router-link
                  v-b-tooltip.hover
                  :title="$t('buttons.edit')"
                  :to="{ name: 'UpdateDashboard', params: {id: item.id}}"
                  class="btn w-2em float-right mr-2 p-0"
                  @click="prepareForUpdate(item)">
                  <icon name="setting"/>
                </router-link>
                <!--<router-link-->
                <!--v-b-tooltip.hover-->
                <!--:title="$t('buttons.edit')"-->
                <!--:to="{ name: 'DashboardsItem', params: {id: item.id}}"-->
                <!--class="btn float-right mr-2 p-0"-->
                <!--@click="prepareForUpdate(item)">-->
                <!--<icon name="setting"/>-->
                <!--</router-link>-->
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </ComponentContainer>
</template>

<script>
import entityListPage from '@/mixin/entityListPage'

export default {
  name: 'DashboardPage',
  mixins: [entityListPage],
  methods: {
    getIsOwner (creatorId) {
      let out
      if (this.profile) {
        out = creatorId === this.profile.id
      }
      return out
    }
  }
}
</script>
