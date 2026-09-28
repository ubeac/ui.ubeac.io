<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn p-4">
      <h1> Kitchen Floors Plan</h1>
      <FloorSelector
        v-model="floorId"/>
      <!--Map-->
      <MapFloor
        v-if="currentFloorPlan"
        :plan="currentFloorPlan"
        :update-trigger="updateTrigger"
        :target-trigger="updateTrigger"
        :markers="markers"
        zoom="-1"
        style="height: 625px;"
        class="mb-5 mt-5"
        @update="updateMarker"/>
    </div>
  </ComponentContainer>
</template>

<script>
import FloorSelector from '@/components/floor/Selector'
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'Gateway',
  components: { FloorSelector },
  mixins: [EntitiesMixin],
  data () {
    return {
      updateTrigger: 0,
      /* eslint-disable */
      floorId: '9c373e5e-236d-499f-b6cb-48799ff8595c'
      /* eslint-enable */
    }
  },
  computed: {
    markers () {
      let out = []
      let gateways = this.gatewayByFloorId(this.floorId)
      gateways.forEach((gateway) => {
        out.push({
          id: gateway.id,
          title: gateway.name,
          type: 'gateway',
          pinNum: 1,
          x: gateway.x,
          y: gateway.y
        })
      })
      return out
    },
    currentFloorPlan () {
      let out = ''
      if (this.currentFloor && this.currentFloor.planFileId) {
        out = this.getImageUrl(this.currentFloor.planFileId)
      }
      return out
    },
    currentFloor () {
      let out = null
      out = this.floorById(this.floorId)
      return out
    }
  },
  watch: {
    floorId () {
      this.updateTrigger = this.updateTrigger + 1
    }
  },
  methods: {
    updateMarker (payload) {
      this.insertItem.x = payload.x
      this.insertItem.y = payload.y
    }
  }
}
</script>
