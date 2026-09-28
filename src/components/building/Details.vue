<template>
  <ComponentContainer v-if="buildingItem">
    <b-card
      no-body
      class="mb-3 border-radius-6 card-shadow" >
      <EntityDetailsHead
        :breadcrums-visibility="false"
        :item="buildingItem"
        :info-cards="infoCards"
        :edit-url="editUrl"
        class="mt-3 mb-0 w-100 d-block float-right"
        type="building"/>
      <b-card-body
        class="page-entity-details px-0 pt-0">
        <!--Details-->
        <div
          v-if="buildingItem.description"
          class="lined noline">
          <p
            class="my-2 entity-details-description">
            {{ buildingItem.description }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("form.address") }}:
          </label>
          <p>
            {{ buildingItem.address.postal_code }}
            {{ buildingItem.address.address1 }}
            {{ buildingItem.address.city }}
            {{ buildingItem.address.province }}
            {{ buildingItem.address.country }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("data.created") }}
          </label>
          <p>
            {{ buildingItem.createDate | moment("from") }}
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.update") }}
          </label>
          <p>
            {{ buildingItem.updateDate | moment("from") }}
          </p>
        </div>
        <!--Map-->
        <div
          class="lined">
          <label> {{ $t('intro.map') }} </label>
          <p>
            <MapGeo
              :searchable="false"
              :zoom="16"
              :draggable="false"
              :controls="false"
              :clickable="false"
              :lat="buildingItem.latitude"
              :lng="buildingItem.longitude"
              class="lined-map"/>
          </p>
        </div>
        <div
          class="lined">
          <label>
            {{ $t("general.floor") }}:
          </label>
          <p class="d-block">
            <b-card
              v-for="floor in buildingsFloors(id)"
              :key="floor.id"
              no-body
              class="lined mt-2 mb-3 no-shadow float-right w-100 d-inline-block">
              <b-card-body class="p-0">
                <b-row>
                  <!--<b-col-->
                  <!--cols="12"-->
                  <!--sm="4">-->
                  <!--<MapFloor-->
                  <!--:zoom="-2"-->
                  <!--:controls="false"-->
                  <!--:draggable="false"-->
                  <!--:clickable="false"-->
                  <!--:markers="markers(floor.id)"-->
                  <!--:plan="getImageUrl(floor.planFileId)"-->
                  <!--:default-marker="false"-->
                  <!--style="height: 200px;"/>-->
                  <!--</b-col>-->
                  <b-col
                    cols="12">
                    <div class="pt-3 pl-3 pl-sm-0">
                      <router-link :to="{name: 'DetailsFloor', params: {id: floor.id}}">
                        <h5 class="text-suitable-header">
                          <icon name="floor"/>
                          <span class="px-1">
                            {{ floor.name }}
                          </span>
                        </h5>
                      </router-link>
                      <p
                        class="text-mute pr-3">
                        {{ floor.description }}
                      </p>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </p>
          <div
            v-if="buildingsFloors(id).length === 0"
            class="empty-state">
            <EntityNoResult
              :message="$t('manage.no_building')"
              :button-text="$t('manage.add_first')"
              :url="`/building/floor/new?buildingId=${buildingItem.id}`"
              icon="building"/>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import EntityDetails from '@/mixin/entityDetails'
export default {
  name: 'BuildingDetails',
  mixins: [EntityDetails],
  data () {
    return {
      type: 'building'
    }
  },
  computed: {
    infoCards () {
      return [
        {
          title: this.$t('badge.floors'),
          value: this.buildingsFloorsCount(this.id),
          icon: 'floor'
        },
        {
          title: this.$t('badge.gateways'),
          value: this.buildingsGatewaysCount(this.id),
          icon: 'gateway'
        },
        {
          title: this.$t('badge.devices'),
          value: this.buildingsDevicesCount(this.id),
          icon: 'device'
        }
      ]
    },
    buildingItem () {
      return this.buildingById(this.id)
    }
  },
  methods: {
    markers (id) {
      return this.gatewayByFloorId(id)
    }
  }
}
</script>
