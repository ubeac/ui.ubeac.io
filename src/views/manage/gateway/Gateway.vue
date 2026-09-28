<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="gateway"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">{{ $t("manage.gateways") }}</span>
        </div>
        <router-link
          :to="{name: 'NewGateway'}"
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
            v-if="sortedByName.length === 0"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">
            <b-card
              tag="article"
              class="w-100 mb-0 float-left entity-item-card entity-item-card--add"
              @click="$router.push({name: 'NewGateway'})">
              <div class="card-text">
                <h1 class="text-center">
                  <icon
                    name="add"
                    class="card-view-add-item-icon"/>
                </h1>
                <div class="text-center w-100 db-block">
                  {{ $t("general.add_gateway") }}
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col
            v-for="(item, index) in sortedByName"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">

            <b-card
              :key="item.id"
              tag="article"
              no-body
              class="w-100 mb-0 float-left component-entity-card">
              <div
                :style="{'background-color': getIndexColor(index)}"
                class="bottom-border" />

              <!--Body-->
              <b-card-body class="p-0 pt-3">
                <!--Title and Description and Details-->
                <div
                  v-if="item && item.name"
                  class="pb-3 pt-0 px-3">
                  <router-link :to="{name: 'GatewayDetails', params: {id: item.id}}">
                    <h4 class="py-1 w-100 text-one-line">{{ item.name }}</h4>
                  </router-link>
                  <template v-if="item.description">
                    <p class="text-one-line card-text text-description mb-2">{{ item.description }}</p>
                  </template>
                  <template v-else>
                    <p class="mh-1"/>
                  </template>
                  <p
                    class="card-text mb-2 mh-3 component-entity-card--management">
                    <span v-if="item.building">
                      <router-link
                        v-if="item.building"
                        :to="{name: 'DetailsBuildings', params: {id: item.building}}"
                        class="card-text">
                        <icon name="building"/>
                        <span class="pl-1">
                          {{ buildingById(item.building).name | truncate(15) }}
                        </span>
                      </router-link>
                    </span>
                    <span v-if="item.floor">
                      <span class="text-muted mx-1">
                        /
                      </span>
                      <router-link
                        v-if="item.floor"
                        :to="{name: 'DetailsFloor', params: {id: item.floor}}"
                        class="card-text">
                        <icon name="floor"/>
                        <span class="pl-1">
                          {{ floorById(item.floor).name | truncate(15) }}
                        </span>
                      </router-link>
                    </span>
                  </p>
                  <p
                    v-if="item.firstRequestDate"
                    class="card-text mb-2">
                    {{ $t("manage.first_req") }}:
                    <span> {{ item.firstRequestDate }} </span>
                  </p>
                  <p
                    style="height: 1em;"
                    class="card-text mb-2">
                    <small
                      v-if="item.lastRequestDate">
                      {{ item.lastRequestDate | date }}
                    </small>
                    <small v-else />
                  </p>
                </div>

                <!--Badge-->
                <b-row class="entity-item-card--badge mx-0">
                  <b-col class="p-0">
                    <b-badge
                      variant="light"
                      class="w-100 text-center component-entity-card--badge-light px-2 py-3"
                      size="sm">
                      <h5 class="component-entity-card--badge-count">
                        {{ gatewaysDevicesCount(item.id) }}
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
                        {{ item.requestCount | numeralFormat('0,0') }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text">{{ $t("badge.requests") }}</span>
                  </b-col>
                  <!--<b-col class="p-0">-->
                  <!--<b-badge-->
                  <!--variant="light"-->
                  <!--class="w-100 text-center component-entity-card--badge-light px-2 py-3"-->
                  <!--size="sm">-->
                  <!--<h5 class="component-entity-card--badge-count">-->
                  <!--{{ gatewaysSensorsCount(item.id) }}-->
                  <!--</h5>-->
                  <!--</b-badge>-->
                  <!--<span class="component-entity-card--badge-text card-text">{{ $t("badge.SENSORS") }}</span>-->
                  <!--</b-col>-->
                </b-row>
              </b-card-body>

              <!--Footer-->
              <b-card-footer>
                <b-row>
                  <b-col
                    cols="3">
                    <a
                      v-if="item.manufacturer"
                      :href="item.manufacturer.website"
                      class="card-image-circular-btn"
                      target="_blank">
                      <b-card-img
                        v-b-tooltip.hover
                        :title="item.manufacturer.name"
                        :src="getImageUrl(item.manufacturer.logo)"
                        class="mr-1 card-img"
                        alt=""/>
                    </a>
                  </b-col>

                  <!--Button-->
                  <b-col
                    cols="9">
                    <!--TODO: checked component-gateway-card--footer-btn-setting class-->
                    <div class="component-gateway-card--footer-btn">
                      <router-link
                        v-b-tooltip.hover
                        :title="$t('manage.details')"
                        :to="{name: 'GatewayDetails', params: {id: item.id}}"
                        class="btn w-2em float-right p-0 component-gateway-card--footer-btn-setting">
                        <icon name="info"/>
                      </router-link>
                      <router-link
                        v-b-tooltip.hover
                        :title="$t('buttons.edit')"
                        :to="{name: 'UpdateGateway', params: {id: item.id}}"
                        class="btn w-2em float-right mr-2 p-0 component-gateway-card--footer-btn-setting"
                        @click="prepareForUpdate(item)">
                        <icon name="setting"/>
                      </router-link>
                      <GatewayCopyUrl
                        v-if="item.url"
                        :url="item.url"
                        :title="item.name"
                        class="float-right w-2em mr-2 p-0 "
                        only-qr="true"/>
                    </div>
                  </b-col>
                </b-row>
              </b-card-footer>

            </b-card>
          </b-col>
        </b-row>
        <b-card
          v-else
          class="page-entity-list--main-card w-100"
          no-body>
          <b-card-body
            v-if="baseData && baseData.length > 0"
            class="px-0 pt-0 pb-0">
            <!--Grid View-->
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
                  v-for="item in sortedByName"
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
                      :to="{name: 'UpdateGateway', params: {id: item.id}}"
                      class="btn btn-outline-info float-right ml-2">
                      <icon name="setting"/>
                    </router-link>
                    <router-link
                      :to="{name: 'GatewayDetails', params: {id: item.id}}"
                      class="btn btn-outline-info float-right">
                      <icon name="info"/>
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
import GatewayCopyUrl from '@/components/gateway/CopyUrl'

export default {
  name: 'GatewaysPage',
  components: { GatewayCopyUrl },
  mixins: [entityListPage],
  computed: {
    ...mapGetters({
      baseData: 'basedata/baseData',
      gatewaysSensorsCount: 'gateway/sensorsCount',
      gatewaysDevicesCount: 'gateway/devicesCount',
      gatewayList: 'gateway/cardList'
    }),
    sortedByName () {
      return this._.orderBy(this.gatewayList, [item => item.name.toLowerCase()], ['asc'])
    }
  },
  methods: {
    getMarker (item) {
      return [{
        id: item.id,
        title: item.name,
        type: 'gateway',
        pinNum: 1,
        x: item.x,
        y: item.y
      }]
    }
  }
}
</script>
