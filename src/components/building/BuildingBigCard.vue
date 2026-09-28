<template>
  <ComponentContainer>
    <b-card
      v-if="buildingObject"
      no-body
      class="component-building-big-card card-shadow">
      <b-card-body class="p-0">
        <b-row>
          <b-col
            cols="12"
            class="pr-sm-0 pr-md-0 pr-lg-0 pr-xl-0"
            sm="8">
            <div class="p-3 pr-0">

              <router-link :to="{name: 'DetailsBuildings', params: {id: buildingObject.id}}">
                <h2 class="text-one-line pb-1">
                  <icon name="building"/>
                  <span class="px-1">
                    {{ buildingObject.name }}
                  </span>
                </h2>
              </router-link>
              <p class="text-mute">{{ buildingObject.description }}</p>
              <p class="text-one-line text-muted address-area">
                {{ $t("form.address") }}: {{ buildingObject.address.address1 }}
              </p>
              <template v-if="moreFloors.length > 0">
                <h6 class="mb-0">
                  {{ $t("manage.floors") }}
                </h6>
                <hr class="mt-1">
                <section
                  v-for="floor in moreFloors"
                  :key="floor.i">
                  <b-row class="mb-2 mx-0">
                    <b-col
                      cols="12">
                      <router-link :to="{name: 'DetailsFloor', params: {id: floor.id}}">
                        <h5 class="text-one-line">
                          <icon name="floor"/>
                          {{ floor.name }}
                        </h5>
                      </router-link>
                      <p>{{ floor.description }}</p>

                    </b-col>
                  </b-row>
                </section>
              </template>
            </div>
          </b-col>
          <b-col
            cols="12"
            sm="4">
            <MapGeo
              :style="{'height':'100%'}"
              :searchable="false"
              :draggable="false"
              :zoom="16"
              :controls="false"
              :clickable="false"
              :lat="buildingObject.latitude"
              :lng="buildingObject.longitude"/>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'BuildingBigCard',
  mixins: [EntitiesMixin],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    building: {
      type: [Object, String],
      default: null,
      required: true
    }
  },
  data () {
    return {
      showMore: false
    }
  },
  computed: {
    buildingObject () {
      let out = null
      if (this.building && this._.isString(this.building)) {
        out = this.buildingById(this.building)
      }
      return out
    },
    floorsOfBuilding () {
      return this.floorByBuildingId(this.buildingObject.id)
    },
    firstFloor () {
      return this.floorsOfBuilding[0]
    },
    moreFloors () {
      return this.floorsOfBuilding
    }
  },
  methods: {
    toggleShowMore () {
      this.showMore = !this.showMore
      return this.showMore
    }
  }
}
</script>
