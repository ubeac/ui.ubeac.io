<template>
  <ComponentContainer v-if="floorItem">
    <b-card
      no-body
      class="mb-3 border-radius-6 card-shadow" >
      <EntityDetailsHead
        :item="floorItem"
        :edit-url="editUrl"
        :info-cards="infoCards"
        class="mb-2 mt-2"/>
      <b-card-body
        class="page-entity-details px-0 pt-0">
        <div
          v-if="floorItem.description"
          class="lined noline">
          <p
            class="my-2 entity-details-description">
            {{ floorItem.description }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.building") }}
          </label>
          <p>
            <router-link :to="{name: 'DetailsBuildings', params: {id: floorItem.building}}">
              <icon
                class="mr-2 text-dark "
                name="building"/>
              <span class="text-dark ">
                {{ buildingById(floorItem.building).name }}
              </span>
            </router-link>
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("data.created") }}
          </label>
          <p>
            {{ floorItem.createDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.update") }}
          </label>
          <p>
            {{ floorItem.updateDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("intro.map") }}
          </label>
          <p>
            <MapFloor
              :draggable="false"
              :clickable="false"
              :plan="getImageUrl(floorItem.planFileId)"
              :zoom="-1"
              :markers="markers"
              class="lined-map"/>
          </p>
        </div>
        <div
          v-if="building"
          :style="{height: '300px'}"
          class="">
          <MapGeo
            v-if="false"
            :zoom="16"
            :searchable="false"
            :draggable="false"
            :controls="false"
            :clickable="false"
            :lat="building.latitude"
            :lng="building.longitude"/>
        </div>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import EntityDetails from '@/mixin/entityDetails'

export default {
  name: 'FloorDetails',
  mixins: [EntityDetails],
  data () {
    return {
      type: 'floor'
    }
  },
  computed: {
    infoCards () {
      return [
        {
          title: this.$t('badge.gateways'),
          value: this.floorsGatewaysCount(this.id),
          icon: 'gateway'
        },
        {
          title: this.$t('badge.devices'),
          value: this.floorsDevicesCount(this.id),
          icon: 'device'
        }
        // {
        //   title: this.$t('badge.sensors'),
        //   value: this.floorsSensorsCount(this.id),
        //   icon: 'sensor'
        // }
      ]
    },
    markers () {
      return this.gatewayByFloorId(this.id)
    },
    floorItem () {
      return this.floorById(this.id)
    },
    building () {
      let out
      out = this._.clone(this.buildingById(this.floorItem.buildingId))
      this.floorItem.building = out
      return out
    },
    updateEnabled () {
      return JSON.stringify(this.updateItemCached) === JSON.stringify(this.underUpdateItem)
    },
    editUrl () {
      let out = '/building/floor/' + this.floorItem.id
      return out
    }
  }
}
</script>
