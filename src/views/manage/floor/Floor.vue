<template>
  <ComponentContainer>
    <div
      v-if="building"
      class="page-main-content animated fadeIn page-entity-list pt-0">
      <div class="page-content-header">
        <div class="text-suitable-header float-left">
          <span class="page-entity-list--main-title card-text h3 bold">
            <icon name="floor"/>
            {{ $t("manage.floors") }}
          </span>
        </div>
        <!--TODO: Fix Router Naming Convention-->
        <router-link
          :to="{name: 'NewFloor', query: {buildingId: building.id}}"
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
            v-if="floorsSorted.length === 0"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">
            <b-card
              class="w-100 mb-0 float-left entity-item-card entity-item-card--add"
              @click="$router.push(`/building/floor/new?buildingId=${building.id}`)">
              <div class="card-text">
                <h1 class="text-center">
                  <icon
                    name="add"
                    class="card-view-add-item-icon"/>
                </h1>
                <div class="text-center w-100 db-block">
                  {{ $t("manage.add_floor") }}
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col
            v-for="(item, index) in floorsSorted"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">

            <b-card
              :style="{'border-bottom-color': getIndexColor(index)}"
              no-body
              class="component-entity-card mb-0">
              <div
                :style="{'background-color': getIndexColor(index)}"
                class="bottom-border" />

              <!--Header-->
              <b-card-header class="p-3">
                <router-link :to="{name: 'DetailsFloor', params: {id: item.id}}">
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
                      variant="secondary"
                      class="w-100 text-center component-entity-card--badge-dark px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        {{ floorsGatewaysCount(item.id) }}
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
                        {{ floorsDevicesCount(item.id) }}
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
                  <!--{{ floorsSensorsCount(item.id) }}-->
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
                  :to="{name: 'DetailsFloor', params: {id: item.id}}"
                  class="btn w-2em float-right p-0">
                  <icon name="info"/>
                </router-link>
                <router-link
                  v-b-tooltip.hover
                  :title="$t('buttons.edit')"
                  :to="{name: 'UpdateFloor', params: {id: item.id}}"
                  class="btn w-2em float-right mr-2 p-0"
                  @click="prepareForUpdate(item)">
                  <icon name="setting"/>
                </router-link>
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>
        <b-card
          v-else
          class="page-entity-list--main-card w-100"
          no-body>
          <b-card-body class="px-0 pt-0 pb-0">
            <!--Grid View-->
            <table
              class="table table-responsive-sm table-striped">
              <thead>
                <tr>
                  <th>{{ $t("general.name") }}</th>
                  <th>{{ $t("general.description") }}</th>
                  <th>{{ $t("manage.creation") }}</th>
                  <th>{{ $t("manage.last_update") }}</th>
                  <th>{{ $t("manage.id") }}</th>
                  <th>
                    <span class="float-right">
                      {{ $t("manage.actions") }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in floorsSorted"
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
                  <td>{{ item.id }}</td>
                  <td>
                    <router-link
                      :to="{name: 'DetailsFloor', params: {id: item.id}}"
                      class="btn btn-outline-info float-right">
                      <icon name="info"/>
                    </router-link>
                    <router-link
                      :to="{name: 'UpdateFloor', params: {id: item.id}}"
                      class="btn btn-outline-info float-right mr-2"
                      @click="prepareForUpdate(item)">
                      <icon name="setting"/>
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
import EntityListPage from '@/mixin/entityListPage'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'FloorsPage',
  mixins: [EntityListPage, EntitiesMixin],
  computed: {
    ...mapGetters({
      floorsGatewaysCount: 'floor/gatewaysCount',
      floorsSensorsCount: 'floor/sensorsCount',
      floorsSensors: 'floor/sensors',
      floorsDevicesCount: 'floor/devicesCount'
    }),
    floorsSorted () {
      return this._.orderBy(this.floorsList, [item => item.name.toLowerCase()], ['asc'])
    },
    floorsList () {
      let out = this.buildingsFloors(this.$route.query.buildingId)
      if (out) {
        out = this._.cloneDeep(out).sort((a, b) => {
          return new Moment(b.updateDate).valueOf() - new Moment(a.updateDate).valueOf()
        })
      }
      return out
    },
    building () {
      return this.buildingById(this.$route.query.buildingId)
    }
  }
}
</script>
