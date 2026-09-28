<template>
  <ComponentContainer needvalidation >
    <div class="compoenent-floor-selector">
      <!--Selected Team-->
      <b-form-group :label="$t('form.selected_team')">
        <b-form-select
          v-validate="'required'"
          v-model="insertItem.teamId"
          :state="errors.has('teamId') ? 'invalid' : null"
          class="col-xl-6"
          name="teamId"
          @change="updateTeam">
          <option
            v-for="item in teamList"
            :value="item.id"
            :key="item.id">{{ item.name }}
          </option>
        </b-form-select>
        <b-form-invalid-feedback v-if="errors.has('teamId')">
          <span
            v-for="(error, index) in errors.collect('teamId')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <!--Selected buildingId-->
      <b-form-group
        v-if="insertItem.teamId && teamById(insertItem.teamId)"
        :label="$t('form.selected_building')">
        <b-form-select
          v-validate="validateBuilding ? 'required' : ''"
          v-model="insertItem.buildingId"
          :state="errors.has('buildingId') ? 'invalid' : null"
          :disabled="teamById(insertItem.teamId).buildings.length === 0"
          :name="validateBuilding ? 'buildingId' : ''"
          class="col-xl-6"
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
        <b-form-invalid-feedback v-if="errors.has('buildingId')">
          <span
            v-for="(error, index) in errors.collect('buildingId')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
    </div>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'BuildingSelector',
  mixins: [EntitiesMixin],
  props: {
    value: {
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
    }
  },
  data () {
    return {
      selectedBuilding: null,
      buildings: null,
      insertItem: {
        teamId: null,
        buildingId: null
      }
    }
  },
  mounted () {
    this.selectedBuilding = this.buildingById(this.value)
    if (this.value) {
      this.insertItem.teamId = this.selectedBuilding.team
      this.bindBuilding(this.insertItem.teamId)
      this.insertItem.buildingId = this.value
    } else if (this.teamId) {
      this.insertItem.teamId = this.teamId
    } else if (this.teamList && this.teamList.length > 0) {
      this.insertItem.teamId = this.teamList[0].id
    }
  },
  methods: {
    updateTeam (e) {
      this.$emit('updateTeam', e)
      this.selectedBuilding = null
      this.$emit('input', null)
      this.bindBuilding(e)
    },
    selectedBuildingChange (evt) {
      this.$emit('input', evt)
    },
    bindBuilding (id) {
      this.buildings = []
      var team = this.teamList.find((x) => x.id === id)
      if (team && team.buildings.length > 0 && team.buildings[0] != null) {
        this.buildings = team.buildings
        this.insertItem.buildingId = this.buildings[0]
        this.$emit('input', this.insertItem.buildingId)
      }
    }
  }
}
</script>
