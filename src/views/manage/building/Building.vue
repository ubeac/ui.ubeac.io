<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="building"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">{{ $t("manage.buildings") }}</span>
        </div>
        <router-link
          :to="{ name: 'NewBuilding'}"
          class="float-right btn btn-fab btn-success mr-0">
          <icon name="add"/>
        </router-link>
      </div>
      <b-container
        class="p-0"
        fluid>
        <b-row
          v-if="viewCardMode"
          class="row-fixture">
          <b-col
            v-if="buildingsSorted.length === 0"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">
            <b-card
              class="w-100 mb-0 float-left entity-item-card entity-item-card--add"
              @click="$router.push(`building/new`)">
              <div class="card-text">
                <h1 class="text-center">
                  <icon
                    name="add"
                    class="card-view-add-item-icon"/>
                </h1>
                <div class="text-center w-100 db-block">
                  {{ $t("manage.add_building") }}
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col
            v-for="(item, index) in buildingsSorted"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">

            <b-card
              no-body
              class="component-entity-card mb-0">
              <div
                :style="{'background-color': getIndexColor(index)}"
                class="bottom-border" />

              <!--Header-->
              <b-card-header class="p-3">
                <router-link :to="{ name: 'DetailsBuildings', params: {id: item.id}}">
                  <h4 class="py-1 w-75 text-one-line">{{ item.name }}</h4>
                </router-link>
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
                  <small class="card-text text-small"> {{ $t("general.update") }} {{ item.createDate | moment("from") }}</small>
                </div>

                <!--Badge-->
                <b-row class="entity-item-card--badge mx-0">
                  <b-col class="p-0">
                    <b-badge
                      variant="light"
                      class="w-100 text-center component-entity-card--badge-light px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        <!--{{item.buildings.length}}-->
                        {{ buildingsFloorsCount(item.id) }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.floors") }}</span>
                  </b-col>
                  <b-col class="p-0">
                    <b-badge
                      variant="secondary"
                      class="w-100 text-center component-entity-card--badge-dark px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        {{ buildingsGatewaysCount(item.id) }}
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
                        {{ buildingsDevicesCount(item.id) }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.devices") }}</span>
                  </b-col>
                  <!--<b-col class="p-0">-->
                  <!--<b-badge-->
                  <!--variant="secondary"-->
                  <!--class="w-100 text-center component-entity-card--badge-dark px-2 py-3"-->
                  <!--size="sm">-->
                  <!--<h5 class="component-entity-card--badge-count">-->
                  <!--{{ buildingsSensorsCount(item.id) }}-->
                  <!--</h5>-->
                  <!--</b-badge>-->
                  <!--<span class="component-entity-card--badge-text card-text">{{ $t("badge.SENSORS") }}</span>-->
                  <!--</b-col>-->
                </b-row>
              </b-card-body>

              <!--Footer-->
              <b-card-footer class="p-3">
                <router-link
                  v-b-tooltip.hover
                  :title="$t('manage.details')"
                  :to="{ name: 'DetailsBuildings', params: {id: item.id}}"
                  class="btn w-2em float-right p-0">
                  <icon name="info"/>
                </router-link>
                <router-link
                  v-b-tooltip.hover
                  :title="$t('buttons.edit')"
                  :to="{ name: 'UpdateBuilding', params: {id: item.id}}"
                  class="btn w-2em float-right mr-2 p-0"
                  @click="prepareForUpdate(item)">
                  <icon name="setting"/>
                </router-link>
                <!--TODO: fix routing-->
                <router-link
                  v-b-tooltip.hover
                  :title="$t('manage.floor_list')"
                  :to="{name: 'Floors', query: {buildingId: item.id}}"
                  class="btn w-2em float-right mr-2 p-0">
                  <icon name="floor"/>
                </router-link>
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>
        <!--Grid View-->
        <b-card
          v-else
          class="page-entity-list--main-card w-100"
          no-body>
          <b-card-body class="px-0 pt-0 pb-0">
            <table
              class="table table-responsive-sm table-striped">
              <thead>
                <tr>
                  <th>{{ $t("general.name") }}</th>
                  <th>{{ $t("general.description") }}</th>
                  <th>{{ $t("manage.creation") }}</th>
                  <th>{{ $t("manage.last_update") }}</th>
                  <th>
                    <span class="float-right">
                      {{ $t("manage.actions") }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in buildingsSorted"
                  :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                    {{ item.description }}
                  </td>
                  <td>
                    <b>{{ $t("manage.time") }}:</b> {{ item.createDate | dateDay }}<br>
                    <b>{{ $t("manage.by") }}:</b> {{ item.createBy }}<br>
                  </td>
                  <td>
                    <b>{{ $t("manage.time") }}:</b> {{ item.updateDate | dateDay }}<br>
                    <b>{{ $t("manage.by") }}:</b> {{ item.updateBy }}
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'UpdateBuilding', params: {id: item.id}}"
                      class="btn btn-outline-info float-right ">
                      <icon name="setting"/>
                    </router-link>
                    <!--TODO: Fix Router Naming Convention-->
                    <router-link
                      v-b-tooltip.hover
                      :title="$t('manage.floor_list')"
                      :to="{name: 'Floors', query: {buildingId: item.id}}"
                      class="btn btn-outline-info float-right mr-2">
                      <icon name="floor"/>
                    </router-link>
                    <!--TODO: Fix Router Naming Convention-->
                    <router-link
                      v-b-tooltip.hover
                      :title="$t('manage.add_floor')"
                      :to="{name: 'NewFloor', query: {buildingId: item.id}}"
                      class="btn btn-outline-info float-right mr-2">
                      <icon name="floor"/>
                      <icon name="add"/>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card-body>
        </b-card>
      </b-container>
    </div>
  </ComponentContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import entityListPage from '@/mixin/entityListPage'

export default {
  name: 'BuildingsPage',
  mixins: [entityListPage],
  computed: {
    ...mapGetters({
      buildingsGatewaysCount: 'building/gatewaysCount',
      buildingsSensorsCount: 'building/sensorsCount',
      buildingsFloors: 'building/floors',
      buildingsFloorsCount: 'building/floorsCount',
      buildingsDevicesCount: 'building/devicesCount',
      buildingList: 'building/list'
    }),
    buildingsSorted () {
      return this._.orderBy(this.buildingList, [item => item.name.toLowerCase()], ['asc'])
    },
    markers () {
      let output = []
      this.buildingsSorted.forEach((item) => {
        if (item.longitude !== 0 && item.latitude !== 0) {
          output.push({
            position: {
              lng: item.longitude,
              lat: item.latitude
            },
            infoText: item.name,
            data: item
          })
        }
      })
      return output
    }
  }
}
</script>
