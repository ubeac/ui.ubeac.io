<template>
  <!-- TODO: Clean up this file from page-asset-tracking class -->
  <ComponentContainer>
    <div class="page-main-content page-live-devices page-asset-tracking animated fadeIn pt-0">
      <div class="page-content-header pl-0">
        <div class="float-left">
          <icon
            name="liveData"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">
            {{ $t('general.live_devices') }}
          </span>
        </div>
        <!--<b-button-->
        <!--v-b-tooltip-->
        <!--v-if="!filterBarVisibility"-->
        <!--type="button"-->
        <!--variant="success"-->
        <!--title="Filtering"-->
        <!--class="mr-0 btn-fab float-right"-->
        <!--@click.prevent="toggleFilterBar">-->
        <!--<icon-->
        <!--name="filter"/>-->
        <!--</b-button>-->
        <!--<b-button-->
        <!--v-b-tooltip-->
        <!--v-if="filterBarVisibility"-->
        <!--type="button"-->
        <!--variant="success"-->
        <!--title="Filtering"-->
        <!--class="mr-0 btn-fab float-right"-->
        <!--@click.prevent="toggleFilterBar">-->
        <!--<icon-->
        <!--name="close"/>-->
        <!--</b-button>-->
        <!--Pause-->
        <b-button
          v-b-tooltip
          v-if="!pauseRender"
          :title="$t('buttons.pause') "
          variant="danger"
          class="btn-fab float-right ml-2"
          @click="pauseSocket">
          <icon name="pause"/>
        </b-button>
        <!--Play/Pause-->
        <b-button
          v-b-tooltip
          v-if="pauseRender"
          :title="$t('buttons.play') "
          variant="success"
          class="btn-fab ml-2"
          @click="playSocket">
          <icon
            name="play"
            class="page-live-devices--play-icon"/>
        </b-button>
        <router-link
          v-b-tooltip
          :title="$t('general.device')"
          :to="{name: 'Devices'}"
          class="float-right btn mr-1">
          <icon name="link"/>
        </router-link>
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
              :collapse="{enabled: false}"
              :selected-types-multiple="false"
              :feint="false"
              :auto-save="false"
              :reset-button="{enabled: false}"
              :buttons="{enabled: true}"
              :header="{enabled: true}"
              :date-shortener="{enabled: false}"
              :to-date="{enabled: false}"
              :from-date="{enabled: false}"
              :loading="searchLoading"
              :static-count="staticCount"
              :filtering-data="filter"
              :load-on-mount="false"
              @collapse="toggleFilterBar"
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
              <LiveDevice
                :pause="pauseRender"
                :filter="filter" />
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import FilterSensorData from '@/components/filtering/SensorData'
import DataListNoResult from '@/components/DataListNoResult'
import LiveDevice from '@/components/device/Live'

export default {
  name: 'DeviceLiveListPage',
  components: { FilterSensorData, DataListNoResult, LiveDevice },
  data () {
    return {
      filterBarVisibility: false,
      filter: null,
      pauseRender: false,
      searchLoading: false,
      staticCount: 10
    }
  },
  methods: {
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
