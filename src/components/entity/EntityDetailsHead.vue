<template>
  <!--Details-->
  <ComponentContainer>
    <b-row>
      <!--<b-col-->
      <!--cols="12"-->
      <!--class="pl-3 pt-0 mt-0"-->
      <!--md="6">-->
      <!--<p-->
      <!--v-if="breadcrumsVisibility && item.building && buildingById(item.building.id)"-->
      <!--class="px-3 mb-2 component-entity-details--text">-->
      <!--<router-link-->
      <!--v-b-tooltip.hover-->
      <!--v-if="item.building && buildingById(item.building.id)"-->
      <!--:title="$t('general.building')"-->
      <!--:to="{name: 'DetailsBuildings', params: {id: item.building.id}}">-->
      <!--<icon-->
      <!--name="building"-->
      <!--class="mr-1"/>-->
      <!--<span v-if="item.building && buildingById(item.building.id)">-->
      <!--{{ buildingById(item.building.id).name | truncate(15) }}-->
      <!--</span>-->
      <!--</router-link>-->
      <!--<router-link-->
      <!--v-b-tooltip.hover-->
      <!--v-if="item.floor && floorById(item.floor.id)"-->
      <!--:title="$t('general.floor')"-->
      <!--:to="{name: 'DetailsFloor', params: {id: item.floor.id}}"-->
      <!--class="ml-2">-->
      <!--<span class="mr-2">/</span>-->
      <!--<icon-->
      <!--name="floor"-->
      <!--class="mr-1"/>-->
      <!--<span>-->
      <!--{{ floorById(item.floor.id).name | truncate(15) }}-->
      <!--</span>-->
      <!--</router-link>-->
      <!--</p>-->
      <!--</b-col>-->
      <!--<b-col-->
      <!--cols="12"-->
      <!--md="6">-->
      <!--<slot-->
      <!--class="float-right"-->
      <!--name="headerSide"/>-->
      <!--</b-col>-->
      <b-col
        cols="12"
        md="12"
        class="entity-page-details--date edit-info-area"/>
    </b-row>
    <EntityInfoCard
      v-if="infoCards"
      :data="infoCards"
      class=""/>
  </ComponentContainer>
</template>

<script>
import EntityInfoCard from './EntityInfoCard'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'EntityDetailsHead',
  components: { EntityInfoCard },
  mixins: [EntitiesMixin],
  props: {
    breadcrumsVisibility: {
      type: Boolean,
      default () {
        return true
      },
      required: false
    },
    infoCards: {
      type: [Array, Boolean],
      default () {
        return false
      },
      required: false
    },
    type: {
      type: String,
      required: true
    },
    /* eslint-disable */
    item: {
      required: true,
      default () {
      }
    },
    /* eslint-enable */
    editUrl: {
      type: [String, Boolean, Object],
      required: false,
      default () {
      }
    }
  },
  computed: {
    // TODO: remove duplicate
    createBy () {
      let out = false
      if (this.item) {
        if (this.item.users && this.item.users.length > 0) {
          out = this.item.users.find((item) => {
            return item.profile.id === this.item.createBy
          })
        } else if (this.item.team && this.item.team.users && this.item.team.users.length > 0) {
          out = this.item.team.users.find((item) => {
            return item.profile.id === this.item.createBy
          })
        }
      }
      return out
    },
    updateBy () {
      let out = false
      if (this.item) {
        if (this.item.users && this.item.users.length > 0) {
          out = this.item.users.find((item) => {
            return item.profile.id === this.item.updateBy
          })
        } else if (this.item.team && this.item.team.users && this.item.team.users.length > 0) {
          out = this.item.team.users.find((item) => {
            return item.profile.id === this.item.updateBy
          })
        }
      }
      return out
    }
  }
}
</script>
