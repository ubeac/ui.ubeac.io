<template>
  <ComponentContainer>
    <b-card
      v-if="teamItem"
      no-body
      class="mb-3 border-radius-6 card-shadow" >
      <EntityInfoCard
        v-if="infoCards"
        :data="infoCards"
        class="page-entity-info-card pt-4 pb-0 pb-xl-4 mt-3 mb-0"/>
      <b-card-body
        class="page-entity-details px-0 pt-0">
        <div
          v-if="teamItem.description"
          class="lined noline">
          <p
            class="my-2 entity-details-description">
            {{ teamItem.description }}
          </p>
        </div>
        <div class="lined">
          <label>
            {{ $t('general.namespace') }}
          </label>
          <p>
            {{ teamItem.namespace }}
          </p>
        </div>
        <!--TODO: remove this block-->
        <div
          v-if="false"
          class="lined">
          <label>
            {{ $t("form.address") }}:
          </label>
          <p>
            {{ teamItem.address.postal_code }}
            {{ teamItem.address.address1 }}
            {{ teamItem.address.city }}
            {{ teamItem.address.province }}
            {{ teamItem.address.country }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("data.created") }}
          </label>
          <p>
            {{ teamItem.createDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.update") }}
          </label>
          <p>
            {{ teamItem.updateDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("manage.members") }}
          </label>
          <p
            class="mb-2">
            <EntityMembers :users="teamItem.users"/>
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("manage.sensors.sensors") }}
          </label>
          <p>
            <EntitySensors :sensors="teamSensors(teamItem.id)"/>
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("manage.buildings") }}
          </label>
          <p
            class="mt-0 pt-0">
            <section class="w-100 d-block float-left">
              <template
                v-if="teamItem.buildings && teamItem.buildings.length > 0 && teamItem.buildings[0] !== null">
                <div
                  v-for="building in teamItem.buildings"
                  :kye="building.id"
                  class="lined ml-0 mh-3 lh-2 pt-2 w-100">
                  <div
                    class="mr-3 w-10 d-inline-block text-one-line">
                    <router-link :to="{name: 'DetailsBuildings', params: {id: building}}">
                      <icon
                        class="mr-2 text-dark "
                        name="building"/>
                      <span class="text-dark ">
                        {{ buildingById(building).name }}
                      </span>
                    </router-link>
                  </div>
                  <span
                    class="mr-4 w-14 d-inline-block text-muted text-one-line">
                    {{ buildingById(building).description | truncate(40) }}
                  </span>
                  <div
                    class="w-12 d-inline-block text-one-line">
                    <icon
                      class="mr-2"
                      name="floor"/>
                    <span
                      class="mr-2">
                      {{ buildingById(building).floors.length }}
                    </span>
                    <span class="text-muted">
                      {{ $t("general.floor") }}
                    </span>
                  </div>
                </div>
              </template>
              <div
                v-else
                class="empty-state">
                <EntityNoResult
                  :message="$t('manage.no_building')"
                  :button-text="$t('manage.add_first')"
                  icon="building"
                  url="/building/new"/>
              </div>
            </section>
          </p>
        </div>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import UsersForm from './UsersForm'
import EntityDetails from '@/mixin/entityDetails'
import EntityInfoCard from '@/components/entity/EntityInfoCard'

export default {
  name: 'TeamDetails',
  components: { UsersForm, EntityInfoCard },
  mixins: [EntityDetails],
  data () {
    return {
      type: 'team'
    }
  },
  computed: {
    infoCards () {
      return [
        {
          title: this.$t('badge.buildings'),
          value: this.teamBuildingsCount(this.teamItem.id),
          variant: '',
          route: 'Buildings',
          icon: 'building'
        },
        {
          title: this.$t('badge.gateways'),
          value: this.teamGatewaysCount(this.teamItem.id),
          route: 'Gateways',
          icon: 'gateway'
        },
        {
          title: this.$t('badge.devices'),
          value: this.teamDevicesCount(this.teamItem.id),
          route: 'Devices',
          icon: 'device'
        },
        {
          title: this.$t('badge.sensors'),
          value: this.teamSensorsCount(this.teamItem.id),
          route: null,
          icon: 'sensor'
        }
      ]
    },
    teamItem () {
      const item = this.teamById(this.id)
      return item
    }
  }
}
</script>
