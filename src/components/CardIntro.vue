<template>
  <div class="component-card-intro">
    <b-row
      class="row-fixture mx-0">
      <b-col
        v-for="widget in widgets"
        :key="widget.name"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        class="px-2 pb-3">
        <b-card
          :key="widget.name"
          tag="article"
          no-body
          class="w-100 mb-2 float-left component-entity-card component-card-intro--card">
          <!--Body-->
          <b-card-body
            :style="{'background-image': widget.background}"
            class="p-0 pt-3 position-relative entity-item-card">
            <icon
              :name="widget.icon"
              class="card-icon" />
            <!--<img-->
            <!--:src="widget.artwork"-->
            <!--class="card-img">-->
            <div class="artwork-container" />
            <p
              class="card-text h3 px-3 pb-1 mb-2">
              {{ widget.name }}
            </p>
          </b-card-body>
          <!--Footer-->
          <b-card-footer class="p-3">
            <b-row>
              <b-col
                cols="10">
                <router-link
                  v-if="!getter(widget.entity) || getter(widget.entity).length === 0"
                  :to="{ name: widget.firstActionLink }"
                  class="text-footer">
                  {{ widget.firstCallToAction }}
                </router-link>
                <router-link
                  v-if="getter(widget.entity) && getter(widget.entity).length > 0"
                  :to="{ name: widget.actionLink }"
                  class="text-footer">
                  {{ widget.callToAction }}
                </router-link>
              </b-col>
              <!--Button-->
              <b-col
                cols="2">
                <a
                  v-b-tooltip.hover
                  :title="$t('general.docs')"
                  :href="widget.helpUrl"
                  target="_blank"
                  class="btn float-right p-0 component-gateway-card--footer-btn-setting">
                  <icon name="help-wheel"/>
                </a>
              </b-col>
            </b-row>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'CardIntro',
  mixins: [EntitiesMixin],
  data () {
    return {
      widgets: [
        {
          name: 'Teams',
          icon: 'team',
          entity: 'teamList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #EDEFF4 20%, #D1D7E1 100%)',
          helpUrl: this.$config.docs.team,
          firstCallToAction: 'Add your first team',
          callToAction: 'Team List',
          actionLink: 'Teams',
          firstActionLink: 'NewTeam'
        },
        {
          name: 'Buildings',
          icon: 'building',
          entity: 'buildingList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #E8EEEE 20%, #CAE3DD 100%)',
          helpUrl: this.$config.docs.building,
          firstCallToAction: 'Add your first building',
          callToAction: 'Building List',
          actionLink: 'Buildings',
          firstActionLink: 'NewBuilding'
        },
        {
          name: 'Floors',
          icon: 'floor',
          entity: 'floorList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #EDEFF4 20%, #D1D7E1 100%)',
          helpUrl: this.$config.docs.floor,
          firstCallToAction: 'Add your first floor',
          callToAction: 'Floor List',
          actionLink: 'Buildings',
          firstActionLink: 'NewBuilding'
        },
        {
          name: 'Gateways',
          icon: 'gateway',
          entity: 'gatewayList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #E9F1F4 20%, #C6DDE2 100%)',
          helpUrl: this.$config.docs.gateway,
          firstCallToAction: 'Add your First gateway',
          callToAction: 'Gateway List',
          actionLink: 'Gateways',
          firstActionLink: 'NewGateway'
        },
        {
          name: 'Devices',
          icon: 'device',
          entity: 'deviceList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #E9F1F4 20%, #C6DDE2 100%)',
          helpUrl: this.$config.docs.device,
          firstCallToAction: 'Add your First device',
          callToAction: 'Device List',
          actionLink: 'Devices',
          firstActionLink: 'NewDevice'
        },
        {
          name: 'Sensors',
          icon: 'sensor',
          entity: 'sensorList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #EDEFF4 20%, #D1D7E1 100%)',
          helpUrl: this.$config.docs.sensor,
          firstCallToAction: 'Add your First sensor',
          callToAction: 'Sensor List',
          actionLink: 'Devices',
          firstActionLink: 'NewDevice'
        },
        {
          name: 'Dashboards',
          icon: 'dashboard',
          entity: 'dashboardList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #E8EEEE 20%, #CAE3DD 100%)',
          helpUrl: this.$config.docs.dashboard,
          firstCallToAction: 'Add your First dashboards',
          callToAction: 'Dashboard List',
          actionLink: 'Dashboards',
          firstActionLink: 'Dashboards'
        },
        {
          name: 'Widgets',
          icon: 'widget',
          entity: 'dashboardList',
          artwork: 'static/img/logo-shape.svg',
          background: 'radial-gradient(53% 144%, #E9F1F4 20%, #C6DDE2 100%)',
          helpUrl: this.$config.docs.widget,
          firstCallToAction: 'Add your First widget',
          callToAction: 'Widget List',
          actionLink: 'Dashboards',
          firstActionLink: 'Dashboards'
        }
      ]
    }
  },
  methods: {
    getter (e) {
      return this[e]
    }
  }
}
</script>
