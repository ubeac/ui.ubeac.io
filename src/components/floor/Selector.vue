<template>
  <ComponentContainer needvalidation >
    <div class="compoenent-floor-selector m-0 p-0">
      <!--Selected buildingId-->
      <b-form
        inline
        class="needs-validation"
        novalidate>
        <b-form-group
          v-if="insertItem.teamId && teamById(insertItem.teamId)"
          :label="$t('form.selected_building')">
          <b-form-select
            v-validate="validateBuilding ? 'required' : ''"
            v-model="selectedBuilding"
            :state="errors.has('buildingId') ? false : null"
            :disabled="teamById(insertItem.teamId).buildings.length === 0"
            name="buildingId"
            @change="selectedBuildingChange">
            <option
              :value="null">
              {{ $t('general.select_building') }}
            </option>
            <option
              v-for="building in teamById(insertItem.teamId).buildings"
              :value="building"
              :key="building">{{ buildingById(building).name }} </option>
          </b-form-select>
        </b-form-group>
        <b-form-invalid-feedback
          v-if="errors.has('buildingId')"
          class="pb-2">
          <span
            v-for="(error, index) in errors.collect('buildingId')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
        <!--Selected floor-->
        <b-form-group
          v-if="selectedBuilding && buildingById(selectedBuilding) && buildingById(selectedBuilding).floors &&
          buildingById(selectedBuilding).floors.length > 0"
          :label="$t('form.selected_floor')">
          <b-form-select
            v-validate="validateFloor ? 'required' : ''"
            :state="errors.has('floorId') ? false : null"
            :disabled="selectedBuilding === null"
            v-model="insertItem.floorId"
            :name="validateFloor ? 'floorId' : ''"
            @change="selectedFloor">
            <option
              :value="null">
              {{ $t('general.select_floor') }}
            </option>
            <option
              v-for="floor in buildingById(selectedBuilding).floors"
              :value="floor"
              :key="floor">
              {{ floorById(floor).name }}
            </option>
          </b-form-select>
          <b-form-invalid-feedback v-if="errors.has('floorId')">
            <span
              v-for="(error, index) in errors.collect('floorId')"
              :key="index">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>
      <!-- <b-form-group>
        <b-alert
          show
          variant="warning">
          <icon
            name="info"
            class="mr-2"/>
          <span class="pb-1">{{ $t("form.choose_gateway_plan") }}</span>
        </b-alert>
      </b-form-group> -->
      </b-form>
    </div>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'FloorSelector',
  mixins: [EntitiesMixin],
  props: {
    disableTeam: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    value: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    teamId: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    variant: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    validateBuilding: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    validateFloor: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    autoFillFloor: {
      type: [String, Boolean],
      required: false,
      default: true
    }
  },
  data () {
    return {
      selectedBuilding: null,
      buildings: null,
      floors: null,
      insertItem: {
        floorId: null,
        teamId: null,
        buildingId: null
      }
    }
  },
  computed: {
    currentFloorPlan () {
      let out = false
      if (this.currentFloor && this.currentFloor.planFileId) {
        out = this.getImageUrl(this.currentFloor.planFileId)
      }
      return out
    },
    currentFloor () {
      let out = null
      out = this.floorById(this.value)
      return out
    }
  },
  mounted () {
    this.insertItem.floorId = this.value
    if (this.value) {
      this.insertItem.teamId = this.currentFloor.team
      this.insertItem.buildingId = this.currentFloor.building
      this.bindBuilding(this.insertItem.teamId)
      if (this.floorBuilding(this.value)) {
        this.selectedBuilding = this.floorBuilding(this.value).id
        this.insertItem.floorId = this.value
      }
    } else if (this.teamId) {
      this.insertItem.teamId = this.teamId
    } else if (this.teamList && this.teamList.length > 0) {
      this.insertItem.teamId = this.teamList[0].id
    }
  },
  methods: {
    selectedBuildingChange (evt) {
      if (evt) {
        this.bindFloor(evt)
      } else {
        this.$emit('input', null)
      }
    },
    bindFloor (buildingId) {
      this.$emit('input', null)
      this.floors = []
      this.insertItem.floorId = null
      this.floors = this.floorByBuildingId(buildingId)
      if (this.floors.length > 0) {
        this.insertItem.floorId = this.floors[0].id
        this.$emit('input', this.insertItem.floorId)
      }
    },
    selectedFloor (e) {
      if (e) {
        this.$emit('input', e)
      } else {
        this.$emit('input', null)
      }
    },
    bindBuilding (id) {
      this.floors = []
      this.buildings = []
      this.insertItem.floorId = ''
      var team = this.teamList.find((x) => x.id === id)
      if (team && team.buildings.length > 0 && team.buildings[0] != null) {
        this.buildings = team.buildings
      }
    }
  }
}
</script>
