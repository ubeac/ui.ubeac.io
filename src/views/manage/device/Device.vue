<template>
  <ComponentContainer>
    <div class="page-main-content page-entity-list page-asset-tracking animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="device"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t('general.devices') }}
          </span>
        </div>
        <router-link
          v-b-tooltip
          :title="$t('device.add_device') "
          :to="{name: 'NewDevice'}"
          class="float-right btn btn-fab btn-success mr-0">
          <icon name="add"/>
        </router-link>

        <router-link
          v-b-tooltip
          :title="$t('buttons.live_device_page')"
          :to="{name: 'LiveDevices'}"
          class="float-right btn mr-3">
          <icon name="link"/>
        </router-link>

      </div>
      <b-container
        class="p-0"
        fluid>
        <b-row
          class="row-fixture">
          <b-col
            v-if="deviceListSorted.length === 0"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="px-2 pb-3">
            <b-card
              tag="article"
              class="w-100 mb-0 float-left entity-item-card entity-item-card--add"
              @click="$router.push({name: 'NewDevice'})">
              <div class="card-text">
                <h1 class="text-center">
                  <icon
                    name="add"
                    class="card-view-add-item-icon"/>
                </h1>
                <div class="text-center w-100 db-block">
                  {{ $t("device.add_device") }}
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col
            v-for="(item, index) in deviceListSorted"
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
              style="height:280px;"
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
                  <router-link :to="{name: 'DetailsDevice', params: {id: item.id}}">
                    <h4 class="py-1 w-100 text-one-line">{{ item.name }}</h4>
                    <h6 class="py-1 w-100 text-one-line text-dark">{{ item.uid }}</h6>
                  </router-link>
                  <template v-if="item.description">
                    <p class="text-one-line card-text text-description mb-2">{{ item.description }}</p>
                  </template>
                  <template v-else>
                    <p class="mh-1"/>
                  </template>
                  <p
                    v-if="item.firstRequestDate"
                    class="card-text mb-2">
                    {{ $t("manage.first_req") }}:
                    <span> {{ item.firstRequestDate }} </span>
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
                        {{ item.sensors.length }}
                      </h5>
                    </b-badge>
                    <span class="component-entity-card--badge-text card-text text-capital">
                      {{ $t("badge.SENSORS") }}
                    </span>
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
                </b-row>
              </b-card-body>

              <!--Footer-->
              <b-card-footer>
                <b-row>
                  <!--Button-->
                  <b-col
                    cols="12">
                    <div class="component-gateway-card--footer-btn">
                      <router-link
                        v-b-tooltip.hover
                        :title="$t('manage.details')"
                        :to="{name: 'DetailsDevice', params: {id: item.id}}"
                        class="btn w-2em float-right p-0 component-gateway-card--footer-btn-setting">
                        <icon name="info"/>
                      </router-link>
                      <router-link
                        v-b-tooltip.hover
                        :title="$t('buttons.edit')"
                        :to="{name: 'UpdateDevice', params: {id: item.id}}"
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
      </b-container>
    </div>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'DevicesPage',
  mixins: [EntitiesMixin],
  created () {
    this.deviceListSorted = []
    this.timer = null
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.deviceListSorted = this._.cloneDeep(this._.orderBy(this.deviceList, [item =>
      item.name.toLowerCase()], ['asc']))
    this.$forceUpdate()
    this.timer = setInterval(() => {
      this.deviceListSorted = this._.cloneDeep(this._.orderBy(this.deviceList, [item =>
        item.name.toLowerCase()], ['asc']))
      this.$forceUpdate()
    }, 3000)
  }
}
</script>
