<template>
  <div class="component-icon-selector lined">
    <label class="col-form-label">
      {{ $t('icon_selector') }}
    </label>
    <p>
      <b-button
        v-for="item in searchResult"
        :key="item"
        :title="item"
        :class="{'component-icon-selector--selected': value === item}"
        variant="outline-dark"
        class="no-border mb-2 mr-2"
        @click="clickOnIcon(item)">
        <icon :name="item" />
      </b-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'IconSelector',
  props: {
    value: {
      default: null,
      required: false,
      type: [Object, Boolean, String]
    }
  },
  data () {
    return {
      searchQuery: null,
      iconsList: [
        'acceleration',
        'altitude',
        'bathroom-hair-dryer',
        'beacon',
        'beat',
        'bicycle',
        'bluetooth',
        'boat',
        'bolt',
        'building',
        'building-castle',
        'building-official',
        'bus-school',
        'car',
        'car-ambulance',
        'car-repair',
        'car-smart',
        'cargo-boat',
        'coffee-espresso-machine',
        'color',
        'counter',
        'desktop-computer-pc',
        'device',
        'disability-wheelchair',
        'distance',
        'dog',
        'door',
        'door-lock',
        'drone-camera',
        'farming',
        'farming-wheat',
        'fire',
        'food-kiosk',
        'fridge',
        'gauge',
        'globe',
        'gyroscope',
        'hdd',
        'heartbeat',
        'hospital-shield',
        'house-garage',
        'humidity',
        'latitude',
        'laundry-machine',
        'light',
        'lightbulb',
        'location-map',
        'lock',
        'magnet',
        'manufacturer',
        'map-marker-alt',
        'mobile-phone',
        'motorcycle',
        'orientation',
        'park-ferris-wheel',
        'pet-tracking',
        'pin-home',
        'pin-plane',
        'pin-user',
        'plane',
        'plant',
        'plant-pot',
        'playhouse',
        'plug',
        'power',
        'pressure',
        'rotationalmotion',
        'route',
        'safety-fire-alarm',
        'safety-fire-extinguisher',
        'school-building',
        'sensors',
        'shield',
        'signal',
        'socket',
        'sound',
        'step-count',
        'stove-gas-pot',
        'tea-kettle',
        'temperature',
        'tracking',
        'truck',
        'truck-channel-van',
        'truck-empty',
        'truck-firefighter',
        'truck-rv',
        'truck-satelite',
        'tv-curvy',
        'voltage',
        'widget'
      ]
    }
  },
  computed: {
    searchResult () {
      let out = this.iconsList
      return out
    }
  },
  methods: {
    clickOnIcon (name) {
      this.$emit('input', name)
    },
    enterOnSearchBox () {
      if (this.searchResult.length === 1) {
        this.$emit('input', this.searchResult[0].name)
      }
    }
  }
}
</script>
