<template>
  <div
    class="component-map map-page p-0 m-0 no-shadow">
    <GmapMap
      ref="mapRef"
      :options="googleMapOptions"
      :styles="styles"
      :center="validatedCenter"
      :zoom="validatedZoom"
      :clickable="clickable"
      :style="{width: '100%', height: '100%', 'min-height': '100%'}"
      map-type-id="hybrid"
      @zoom_changed="onZoomChanged($event)"
      @center_changed="onCenterChanged($event)">
      <gmap-custom-marker
        v-for="(marker, index) in markersList"
        v-if="marker.position && marker.position.lat && marker.position.lng"
        ref="markers"
        :key="index"
        :marker="{ lat: marker.position.lat, lng: marker.position.lng }"
        :clickable="clickable"
        :optimizaed="false"
        :draggable="draggable">
        <gmap-info-window
          :options="{
            disableAutoPan: true
          }"
          :opened="marker.popupVisibility"
          :position="marker.position"
          @closeclick="toggleInfoWindow(marker)">
          <template v-if="marker.obj.sensors">
            <h6 class="tet-one-line mb-0 pl-1 pb-1">
              {{ marker.obj.name }}
            </h6>
            <ul class="map-markers-box m-0 p-0">
              <li
                v-b-tooltip.hover
                v-for="sensor in marker.obj.sensors"
                v-if="sensorById(sensor) && sensorById(sensor).type.type !== 2"
                :title="sensorById(sensor).name"
                :style="{ color: currentColor(sensorById(sensor).attributes.ui_colorRange, sensors[sensor]) }"
                class="text-one-line" >
                <template v-if="sensors[sensor] && sensors[sensor].data">
                  <div
                    class="icon-container float-left mr-2">
                    <icon
                      v-if="sensorById(sensor).attributes.ui_icon"
                      :name="sensorById(sensor).attributes.ui_icon" />
                    <icon
                      v-else
                      :name="sensorById(sensor).type.name | lowercase" />
                  </div>
                  <template>
                    <template v-if="sensors[sensor].data.value">
                      <span :style="{ color: currentColor(sensorById(sensor).attributes.ui_colorRange, sensors[sensor]) }">
                        {{ sensors[sensor].data.value | precision(sensorById(sensor).attributes.ui_precision) }}
                      </span>
                      <span>
                        <template v-if="sensorById(sensor).prefix">{{ sensorById(sensor).prefix.symbol }}</template>{{ sensorById(sensor).unit.abbr }}
                      </span>
                    </template>
                    <template v-else>
                      <span
                        v-for="(sensorValue, key) in sensors[sensor].data" >
                        {{ key }} {{ sensorValue | precision(sensorById(sensor).attributes.ui_precision) }}
                      </span>
                    </template>
                  </template>
                </template>
              </li>
            </ul>
          </template>
        </gmap-info-window>
        <div
          class="map-markers"
          @click="toggleInfoWindow(marker)">
          <BeamIndicator
            :value="marker.obj.lastRequestDate"
            class="beam-container" />
          <div
            :style="{
              'border-color': marker.obj.attributes.ui_color,
              'background-color': marker.obj.attributes.ui_color,
              'color': marker.obj.attributes.ui_color
            }"
            class="markers-icon">
            <icon
              v-if="marker && marker.obj && marker.obj.attributes && marker.obj.attributes.ui_icon"
              :name="marker.obj.attributes.ui_icon" />
            <icon
              v-else
              name="device" />
          </div>
        </div>
        <GmapPolyline
          v-if="path[marker.sensorId]"
          :path="path[marker.sensorId]"
          :options="{
            strokeWeight: 3,
            strokeColor: (marker.obj && marker.obj.attributes && marker.obj.attributes.ui_color ) ? marker.obj.attributes.ui_color : '#FF0000'
        }"/>
      </gmap-custom-marker>
    </GmapMap>
  </div>
</template>
<script>
/* eslint-disable */
  import GmapCustomMarker from './CustomMarker.vue'
  import MapMarker from './MapMarker.vue'
  import Indicators from '@/components/indicator/index'
  import TrackingSensor from '@/components/map/TrackingSensor.vue'
  import EntitiesMixin from '@/mixin/entities'
  export default {
    name: 'GeoMap',
    components: { GmapCustomMarker, ...Indicators, MapMarker, TrackingSensor },
    mixins: [EntitiesMixin],
    props: {
      center: {
        type: Object
      },
      sensors: {
        required: false
      },
      searchable: {
        type: Boolean,
        default: true
      },
      clickable: {
        type: Boolean,
        default: true
      },
      draggable: {
        type: Boolean,
        default: true
      },
      zoom: {
        type: [Number, String],
        default: 1
      },
      search: {
        default: true
      },
      lng: {
        type: [Number, Boolean],
        default: null
      },
      lat: {
        type: [Number, Boolean],
        default: null
      },
      markers: {
        type: Array,
        default () {
          return []
        }
      },
      theme: {
        default: 'light'
      },
      liveMarkers: {
        type: [Object, Boolean],
        required: false,
        default () {
          return {
            id: '',
            date: ''
          }
        }
      },
      path: {
        type: Object,
        default () {
          return {}
        }
      },
      customMarkers: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      validatedZoom () {
        return this.zoom
      },          
      markersList () {
        if (this.lat && this.lng) {
          this.validatedCenter = {
            lat: this.lat,
            lng: this.lng
          }
        }
        else if (this.firstCenterSymcWithMarkers && this.markers && this.markers.length > 0 && this.markers[0].position) {
          this.firstCenterSymcWithMarkers = false
        }
        return this.markers
      },
      googleMapOptions ()  {
        return {
          mapTypeId: 'terrain',
          streetViewControl: false,
          fullscreenControl: true,
          maxZoom: 40,
          controlSize: 24,
          styles: this.styles
        }
      }
    },
    data () {
      let self = this
      return {
        validatedCenter: self.center,
        debouceOnChangeCenter: null,
        styles: window.theme.googleMap,
        firstCenterSymcWithMarkers: true,
        gmapApi: null,
        infoContent: '',
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        place: 'Toronto',
        fitBoundsTimeout: null,
        firstCentring: true,
        selectedmarker: null
      }
    },
    watch: {
      center () {
        this.validatedCenter = this.center
      }
    },
    mounted () {
      window.addEventListener('updateTheme', (e) => {
        this.styles = window.theme.googleMap
      })
    },
    beforeDestroy () {
      clearTimeout(this.fitBoundsTimeout)
    },
    methods: {
      onZoomChanged (event) {
        this.$emit('onZoomChanged', event)  
      },
      onCenterChanged (event) {
        clearTimeout(this.debouceOnChangeCenter)  
        this.debouceOnChangeCenter = setTimeout(() => {
          this.$emit('onCenterChanged', event)  
        }, 500) 
      },
      toggleInfoWindow (marker) {
        this.$set(marker, 'popupVisibility', !marker.popupVisibility) 
        this.$forceUpdate()
      },
      currentColor (range, indicatorValue) {
        let out = null
        if (indicatorValue && indicatorValue.data && indicatorValue.data.value)  {
          let value = indicatorValue.data.value
          if (range && typeof range === 'string') {
            range = JSON.parse(range)
          }
          if (range) {
            if (range.length > 2) {
              this._.each(range, (item, index) => {
                if (index > 0) {
                  let prevItemValue = parseFloat(range[index - 1].value)
                  let colorValue = parseFloat(item.value)
                  if (value < prevItemValue & value >= colorValue ) {
                    out = item.color
                  }
                }
              })
              if (out === null ) {
                if (value > parseFloat(range[0].value) ) {
                  out = range[1].color
                }
              }
            } else if (range.length > 0 && range[0]) {
              out = range[1].color
            }
          }
        }
        return out
      }
    }
  }
</script>
