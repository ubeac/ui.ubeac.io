<template>
  <ComponentContainer>
    <b-col
      v-if="deviceList.length === 0"
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="3"
      class="px-2 pb-3 mx-auto">
      <b-card
        class="w-100 mb-0 mt-5 entity-item-card entity-item-card--add entity-item-card--medium-tall"
        @click="$router.push({name: 'NewDevice'})">
        <div class="card-text">
          <h1 class="text-center">
            <icon
              name="device"
              class="card-view-add-item-icon"/>
          </h1>
          <div class="text-center w-100 db-block">
            <icon name="add" />
            {{ $t("device.add_device") }}
          </div>
        </div>
      </b-card>
    </b-col>
    <div
      v-if="deviceList && deviceList.length > 0"
      class="table-responsive">
      <h2 class="table-header py-3 mb-0">
        {{ $t("device.my_device") }}
      </h2>
      <table
        border="0"
        class="table table-striped">
        <thead class="no-border">
          <tr class="align-items-center">
            <th style="width: 150px;">{{ $t("general.name") }}</th>
            <th>{{ $t("device.uid") }}</th>
            <th>{{ $t("general.team") }}</th>
            <th style="width: 110px;">{{ $t("general.sensors_count") }}</th>
            <th>{{ $t("manage.last_update") }}</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(item, index) in deviceList">
            <tr
              :key="item.id"
              :style="{height: '4.5em'}"
              class="align-items-center main-row">
              <td
                style="width: 150px;"
                class="pr-0">
                <span class="text-one-line">
                  <router-link
                    v-b-tooltip
                    :title="$t('device.details_device') "
                    :to="{name: 'DetailsDevice', params: {id: item.id}}">
                    {{ item.name }}
                  </router-link>
                </span>
              </td>
              <td style="width: 140px;">
                {{ item.uid }}
              </td>
              <td style="width: 120px;">
                <template v-if="teamItem(item.teamId)" >
                  {{ teamItem(item.teamId).name }}
                </template>
              </td>
              <td style="width: 80px;">
                <template v-if="item.sensors">
                  {{ item.sensors.length }}
                </template>
              </td>
              <td style="width: 180px;">
                {{ item.updateDate | moment("from") }}
              </td>
              <td style="width: 120px;">
                <router-link
                  v-b-tooltip
                  :title="$t('device.details_device') "
                  :to="{name: 'DetailsDevice', params: {id: item.id}}"
                  class="btn float-right ">
                  <icon name="info"/>
                </router-link>
                <router-link
                  v-b-tooltip
                  :title="$t('device.update_device') "
                  :to="{name: 'UpdateDevice', params: {id: item.id}}"
                  class="btn float-right ">
                  <icon name="setting"/>
                </router-link>
                <div
                  :style="{'background-color': getIndexColor(index)}"
                  class="table-row-art-line" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </ComponentContainer>
</template>

<script>
import DataListNoResult from '@/components/DataListNoResult'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'DevicesList',
  components: { DataListNoResult },
  mixins: [EntitiesMixin],
  data () {
    return {
      filterBarVisibility: true,
      filter: null,
      pauseRender: false,
      searchLoading: false,
      staticCount: 10
    }
  },
  methods: {
    teamItem (id) {
      const item = this.teamById(id)
      return item
    },
    playSocket () {
      this.pauseRender = false
    },
    pauseSocket () {
      this.pauseRender = true
    },
    doFilter (filter) {
      this.filter = filter
    },
    toggleFilterBar () {
      this.filterBarVisibility = !this.filterBarVisibility
    }
  }
}
</script>
