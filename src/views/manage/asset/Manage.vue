<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="default"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t("manage.assets.assets") }}
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

      <ModalRemove
        :visibility="removeModalVisibility"
        :data="underRemoveData"
        @ok="modalRemoveSubmit"
        @hide="modalRemoveHide"/>
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
              :asset-selector="{enabled: true}"
              :sensor-enabled="false"
              :sensor-schema-enabled="false"
              :auto-select-next-items="false"
              :historical="false"
              :collapse="{enabled: false}"
              :load-on-mount="true"
              :auto-save="false"
              :reset-button="{enabled: true}"
              :find-button="{enabled: true}"
              @filter="doFilter"/>
          </b-col>
          <b-col
            :md="filterBarVisibility ? 12 : 12"
            :lg="filterBarVisibility ? 8 : 12"
            :xl="filterBarVisibility ? 9 : 12"
            :class="{'mr-0': filterBarVisibility}"
            class="order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1"
            cols="12"
            sm="12">
            <b-card
              no-body
              class="p-0 no-border">
              <b-card-body class="p-0">
                <div>
                  <b-card
                    class="mb-0"
                    no-body>
                    <data-list-no-result
                      v-if="_deviceList.length <= 0"
                      class="mt-5 mb-5"/>
                    <div
                      v-else
                      class="table-responsive">
                      <table
                        class="table table-striped table-header-colored">
                        <thead>
                          <tr class="align-items-center">
                            <th style="width: 150px;">{{ $t("manage.device") }}</th>
                            <th>{{ $t("manage.assets.sensors") }}</th>
                            <th>{{ $t("general.team") }}</th>
                            <th>{{ $t("general.label") }}</th>
                            <th>
                              <span>
                                {{ $t("manage.assets.timeout") }}
                              </span>
                              <small>
                                {{ $t("manage.assets.seconds") }}
                              </small>
                            </th>
                            <th/>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in _deviceList"
                            :class="{'under-edit-row' : underEditList.includes(item.id)}"
                            :key="item.key"
                            class="align-items-center main-row">
                            <td
                              style="width: 150px;"
                              class="pr-0">
                              <span class="text-one-line">
                                {{ item.name }}
                              </span>
                            </td>
                            <!--<td-->
                            <!--style="width: 120px;"-->
                            <!--class="pr-0">-->
                            <!--[><pre> {{ item.assetData }} </pre><]-->
                            <!--<span-->
                            <!--v-if="item.assetData && item.assetData.toDate &&-->
                            <!--item.assetData.toDate !== '0001-01-01T00:00:00Z'"-->
                            <!--class="text-muted">-->
                            <!--{{ item.assetData.toDate | moment("from") }}-->
                            <!--</span>-->
                            <!--</td>-->
                            <td style="width: 120px;">
                              <!--<pre> {{ item.sensors }} </pre>-->
                              <div class="small">
                                <b-badge
                                  v-b-tooltip
                                  v-for="(sensor, index) in item.sensors"
                                  :key="index"
                                  :title="sensor.name"
                                  class="item mr-1 mb-1 p-1 no-bg">
                                  <template
                                    v-if="sensor.type">
                                    <icon
                                      :name="sensor.type.name.toLowerCase()"/>
                                  </template>
                                </b-badge>
                              </div>
                            </td>
                            <td style="width: 140px;">
                              {{ teamById(item.teamId).name }}
                            </td>
                            <td style="width: 120px;">
                              <template v-if="underEditList.includes(item.id)">
                                <template
                                  v-if="item.assetData">
                                  <b-form-input
                                    v-model="item.assetData.name"
                                    :placeholder="$t('general.label')"
                                    type="text"
                                    size="sm"
                                    aria-label="Label"/>
                                </template>
                              </template>
                              <template v-else>
                                <template
                                  v-if="item.isAssets">
                                  <span> {{ item.assetData.name }} </span>
                                </template>
                              </template>
                            </td>
                            <td style="width: 60px;">
                              <template v-if="item.isAssets || underEditList.includes(item.id)">
                                <template
                                  v-if="underEditList.includes(item.id)">
                                  <b-form-input
                                    v-model="item.assetData.timeOut"
                                    :placeholder="$t('manage.assets.threshold')"
                                    type="number"
                                    size="sm"
                                    aria-label="Timeout"/>
                                </template>
                                <template v-else>
                                  <template
                                    v-if="item.isAssets">
                                    <span> {{ item.assetData.timeOut }} </span>
                                  </template>
                                </template>
                              </template>
                            </td>
                            <td style="width: 120px;">
                              <template v-if="underEditList.includes(item.id)">
                                <b-button-group
                                  v-if="item.isAssets">
                                  <b-button
                                    :class="{'btn-loading': releaseButtonLoading.includes(item.id)}"
                                    class="no-radius"
                                    size="sm"
                                    variant="danger"
                                    @click="releaseBeforeConfirm(item)">
                                    <icon name="delete"/>
                                  </b-button>
                                  <b-button
                                    :class="{'btn-loading': updateButtonLoading.includes(item.id)}"
                                    class="no-radius"
                                    size="sm"
                                    variant="info"
                                    @click="update(item)">
                                    {{ $t("general.update") }}
                                  </b-button>
                                </b-button-group>
                                <b-button
                                  v-if="!item.isAssets"
                                  :class="{'btn-loading': addButtonLoading.includes(item.id)}"
                                  class="no-radius"
                                  size="sm"
                                  variant="success"
                                  @click="add(item.id, item.assetData.name, item.assetData.timeOut)">
                                  {{ $t("buttons.save") }}
                                </b-button>
                                <b-button
                                  class="no-radius"
                                  size="sm"
                                  variant="light"
                                  @click="removeItemFromUnderEditList(item.id)">
                                  <icon name="close" />
                                </b-button>
                              </template>
                              <template
                                v-else>
                                <b-button
                                  v-if="item.isAssets"
                                  class="visible-on-row-hover no-radius"
                                  size="sm"
                                  variant="outline-primary"
                                  @click="makeRowEditable(item.id)">
                                  {{ $t("buttons.edit") }}
                                </b-button>
                                <b-button
                                  v-if="!item.isAssets"
                                  class="visible-on-row-hover no-radius"
                                  size="sm"
                                  variant="outline-primary"
                                  @click="makeRowEditable(item.id)">
                                  {{ $t("manage.assets.assets") }}
                                </b-button>
                              </template>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </b-card>
                </div>
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
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'AssetTrackingManagePage',
  components: { FilterSensorData, DataListNoResult, ModalRemove },
  mixins: [EntitiesMixin],
  data () {
    return {
      deviceSearchList: null,
      filterBarVisibility: false,
      removeModalVisibility: false,
      underRemoveData: null,
      underEditList: [],
      filterModel: {},
      addButtonLoading: [],
      updateButtonLoading: [],
      releaseButtonLoading: []
    }
  },
  computed: {
    _deviceList () {
      let devices = []
      devices = this._.cloneDeep(this.deviceList)
      let assetList = this.assetesList
      devices.forEach((device) => {
        let asset = assetList.find((asset) => {
          return asset.deviceId === device.id && asset.isActive
        })
        if (asset) {
          device.assetData = asset
          device.isAssets = true
        } else {
          device.isAssets = false
          device.assetData = {
            name: this.$t('general.default_name'),
            timeOut: 0
          }
        }
      })
      let searched = []
      if (this.filterModel.deviceIds && this.filterModel.deviceIds.length > 0) {
        searched = devices.filter((device) => {
          return this.filterModel.deviceIds.includes(device.id)
        })
      } else {
        searched = devices
      }
      if (this.filterModel.assetIds && this.filterModel.assetIds.length > 0) {
        searched = searched.filter((device) => {
          return this.filterModel.assetIds.includes(device.assetData.id)
        })
      }
      return searched
    }
  },
  mounted () {
    this.fetchAssetTracking()
  },
  methods: {
    ...mapActions({
      searchDevice: 'device/searchDevice'
    }),
    toggleFilterBar () {
      this.filterBarVisibility = !this.filterBarVisibility
    },
    getGatewayById (id) {
      return this.gatewayById(id)
    },
    modalRemoveSubmit () {
      this.release(this.underRemoveData.id, this.underRemoveData.deviceId)
    },
    releaseBeforeConfirm (item) {
      this.removeModalVisibility = true
      this.underRemoveData = {
        id: item.assetData.id,
        name: item.assetData.name,
        deviceId: item.id
      }
    },
    add (deviceId, name, timeout) {
      this.addButtonLoading.push(deviceId)
      this.addAssetTracking({
        name: name,
        timeOut: timeout,
        deviceId: deviceId
      }).then((response) => {
        this.fetchAssetTracking()
        this.removeItemFromUnderEditList(deviceId)
        this.removeItemFromAddButtonList(deviceId)
      }).catch(() => {
        this.removeItemFromAddButtonList(deviceId)
      })
    },
    update (payload) {
      this.updateButtonLoading.push(payload.id)
      let data = {
        id: payload.assetData.id,
        name: payload.assetData.name,
        deviceId: payload.id,
        timeOut: payload.assetData.timeOut
      }
      this.updateAssetTracking(data).then(() => {
        this.fetchAssetTracking()
        this.removeItemFromUnderEditList(payload.id)
        this.removeItemFromUpdateButtonList(payload.id)
      }).catch(() => {
        this.removeItemFromUpdateButtonList(payload.id)
      })
    },
    release (id, deviceId) {
      this.releaseButtonLoading.push(id)
      this.releaseAssetTracking(id).then(() => {
        this.fetchAssetTracking()
        this.removeModalVisibility = false
        this.removeItemFromUnderEditList(deviceId)
        this.removeItemFromReleaseButtonList(deviceId)
      }).catch(() => {
        this.removeModalVisibility = false
      })
    },
    doFilter (filter) {
      if (filter) {
        this.filterModel = filter
      }
    },
    search (filter) {
      let promise = this.searchDevice(filter)
      promise.then((response) => {
        this.deviceSearchList = response
      })
    },
    modalRemoveHide () {
      this.removeModalVisibility = false
    },
    makeRowEditable (id) {
      this.underEditList = []
      this.underEditList.push(id)
    },
    removeItemFromAddButtonList (deviceUid) {
      const index = this.addButtonLoading.indexOf(deviceUid)
      this.addButtonLoading.splice(index, 1)
    },
    removeItemFromReleaseButtonList (deviceUid) {
      const index = this.releaseButtonLoading.indexOf(deviceUid)
      this.releaseButtonLoading.splice(index, 1)
    },
    removeItemFromUpdateButtonList (deviceUid) {
      const index = this.updateButtonLoading.indexOf(deviceUid)
      this.updateButtonLoading.splice(index, 1)
    },
    removeItemFromUnderEditList (deviceUid) {
      const editListIndex = this.underEditList.indexOf(deviceUid)
      this.underEditList.splice(editListIndex, 1)
    }
  }
}
</script>
