<template>
  <div
    class="component-geo-map component-map page-grid map-page p-0 m-0"
    @mousedown="onMouseKeyDown"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave">
    <GmapMap
      ref="mapRef"
      :center="center"
      :tilt="60"
      :options="mapOptions"
      :zoom="zoom"
      :style="{width: '100%', height: '100%', 'min-height': '100%'}"
      :map-type-id="mapType"
      @maptypeid_changed="onMapTypeChanged($event)"
      @zoom_changed="onZoomChanged($event)"
      @center_changed="onCenterChanged($event)">
      <gmap-custom-marker
        v-for="(marker, index) in markersList"
        v-if="marker.type === 'building' && marker.position && marker.position.lat !== null && marker.position.lng !== null "
        :marker="{ lat: marker.position.lat, lng: marker.position.lng }"
        :key="index">
        <gmap-info-window
          :options="{
            pixelOffset: {
              height: getInfoWindowHeightOffset(marker.obj.attributes.ui_map_pin_size)
            },
            disableAutoPan: true
          }"
          :opened="marker.popupVisibilityInner"
          :position="marker.position"
          @closeclick="toggleInfoWindow(marker)">
          <h6 class="tet-one-line mb-0 pl-1 pb-1">
            {{ marker.obj.name }}
          </h6>
          <ul
            v-if="marker.gateways && marker.gateways.length > 0"
            class="map-markers-box m-0 p-0">
            <li
              v-b-tooltip.hover
              v-for="gateway in marker.gateways"
              :title="`${$t('badge.last_request')}:
                       ${gateway.lastRequestDate}`"
              :key="gateway.id"
              gateway.lastRequestDate
              class="map-markers-item">
              <CircleIndicator
                :value="gateway.lastRequestDate"/>
              <span class="ml-1"> {{ gateway.name }} </span>
              <span class="ml-2"> {{ gateway.description }} </span>
            </li>
          </ul>
          <span
            v-else>
            {{ $t('badge.no_gateway') }}
          </span>
        </gmap-info-window>
        <template v-if="marker.type === 'building'">
          <component
            :is="marker.obj.attributes.ui_map_pin ? marker.obj.attributes.ui_map_pin : 'MapPinPin'"
            :size="marker.obj.attributes.ui_map_pin_size ? marker.obj.attributes.ui_map_pin_size : 1"
            :icon="marker.obj.attributes.ui_icon ? marker.obj.attributes.ui_icon : 'default'"
            :color="marker.obj.attributes.ui_color ? marker.obj.attributes.ui_color : '#000000'"
            @click="toggleInfoWindow(marker)" />
        </template>
      </gmap-custom-marker>
      <gmap-custom-marker
        v-for="marker in markersList"
        v-if="marker && marker.type === 'device' && marker.position"
        :marker="marker.position"
        :key="marker.obj.id">
        <gmap-info-window
          v-if="marker.popupVisibilityInner"
          :options="{
            pixelOffset: {
              height: getInfoWindowHeightOffset(marker.obj.attributes.ui_map_pin_size)
            },
            disableAutoPan: true
          }"
          :opened="marker.popupVisibilityInner"
          :position="marker.position"
          @closeclick="toggleInfoWindow(marker)">
          <template v-if="marker.obj.sensors">
            <h6 class="tet-one-line mb-0 pl-1 pb-1">
              {{ marker.obj.name }}
            </h6>
            <ul class="map-markers-box m-0 p-0">
              <li
                v-b-tooltip.hover
                v-for="sensor in deviceById(marker.id).sensors"
                v-if="sensorById(sensor) && sensorById(sensor).type.type !== 2"
                :title="sensorById(sensor).name"
                :style="{ color: currentColor(sensorById(sensor).attributes.ui_colorRange, marker.sensors[sensor]) }"
                class="text-one-line" >
                <template v-if="marker.sensors[sensor] && marker.sensors[sensor].data">
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
                    <template v-if="marker.sensors[sensor].data.value">
                      <span :style="{ color: currentColor(sensorById(sensor).attributes.ui_colorRange, marker.sensors[sensor]) }">
                        {{ marker.sensors[sensor].data.value | numeralFormat(getNumeralFormat(sensorById(sensor).attributes.ui_precision)) }}
                      </span>
                      <span>
                        <template v-if="sensorById(sensor).prefix">{{ sensorById(sensor).prefix.symbol }}</template>{{ sensorById(sensor).unit.abbr }}
                      </span>
                    </template>
                    <template v-else>
                      <span
                        v-for="(sensorValue, key) in marker.sensors[sensor].data" >
                        {{ key }} {{ sensorValue | numeralFormat(getNumeralFormat(sensorById(sensor).attributes.ui_precision)) }}
                      </span>
                    </template>
                  </template>
                </template>
              </li>
            </ul>
          </template>
        </gmap-info-window>
        <GmapPolyline
          :path="marker.trackPath"
          :options="{
            strokeWeight: 3,
            strokeColor: (marker.obj && marker.obj.attributes && marker.obj.attributes.ui_color ) ? marker.obj.attributes.ui_color : '#FF0000'
        }"/>
        <component
          :is="marker.obj.attributes.ui_map_pin ? marker.obj.attributes.ui_map_pin : 'MapPinPin'"
          :size="marker.obj.attributes.ui_map_pin_size ? marker.obj.attributes.ui_map_pin_size : 1"
          :icon="marker.obj.attributes.ui_icon ? marker.obj.attributes.ui_icon : 'default'"
          :color="marker.obj.attributes.ui_color ? marker.obj.attributes.ui_color : '#000000'"
          @click="toggleInfoWindow(marker)" />
        <BeamIndicator
          v-if="false"
          :value="marker.obj.lastRequestDate"
          class="beam-container" />
      </gmap-custom-marker>
    </GmapMap>
  </div>
</template>
<script>
/* eslint-disable */
  import GmapCustomMarker from './CustomMarker.vue'
  import Indicators from '@/components/indicator/index'
  import EntitiesMixin from '@/mixin/entities'
  import MapPins from '@/components/mappin/pins.js'
  import {gmapApi} from 'vue2-google-maps'
  export default {
    name: 'GeoMap',
    components: { GmapCustomMarker, ...Indicators, ...MapPins },
    mixins: [EntitiesMixin],
    props: {
      showInfoBox: {
        type: Boolean,
        default: false
      },
      mapTypeId: {
        type: String,
        default: 'terrain'
      },
      enableFitBound: {
        type: Boolean,
        default: true 
      },
      controls: {
        type: [Boolean, Number],
        default: true 
      },
      roadsDensity: {
        type: [Boolean, Number],
        default: true
      },
      landmarksDensity: {
        type: [Boolean, Number],
        default: true
      },
      labelsDensity: {
        type: [Boolean, Number],
        default: true
      },
      allInfoboxVisible: {
        type: Boolean,
        default: true
      },
      hideControls: {
        type: Boolean,
        default: true
      },
      center: {
        type: Object
      },
      mapType: {
        type: String,
        default: 'hybrid'      
      },
      searchable: {
        type: Boolean,
        default: true
      },
      clickable: {
        type: Boolean,
        default: true
      },
      zoom: {
        type: Number,
        default: 5
      },
      lng: {
        type: Number,
        default: null
      },
      lat: {
        type: Number,
        default: null
      },
      markers: {
        type: [Array, Object],
        default () {
          return []
        }
      }
    },
    computed: {
      controlsVisibility () {
        return this.controls || this.hovered
      },          
      locatioanlDevice () {
        return this.deviceList.filter((device) => {
          return device.sensors.find((sensorId) => {
            return this.sensorById(sensorId).type.type === 2
          })
        }) 
      },
      markersList () {
        let out
        out =  this._.each(this.markers, (i) => { 
          if ( !('popupVisibilityInner' in i) ) {
            i.popupVisibility = this.showInfoBox
            i.popupVisibilityInner = this.showInfoBox
          } else if ((this.oldShowInfoBox !== this.showInfoBox)){
            i.popupVisibility = this.showInfoBox
            i.popupVisibilityInner = this.showInfoBox
          }
          return i 
        })
        if (this.oldShowInfoBox !== this.showInfoBox){
            this.oldShowInfoBox = this.showInfoBox
        }
        return this.markers
      },
      roadDensityStyles () {
       if (this.roadsDensity === 2) {
         return [
           {
             "featureType": "road.arterial",
             "elementType": "labels",
             "stylers": [
               {
                 "visibility": "off"
               }
             ]
           },
           {
             "featureType": "road.highway",
             "elementType": "labels",
             "stylers": [
               {
                 "visibility": "off"
               }
             ]
           },
           {
             "featureType": "road.local",
             "stylers": [
               {
                 "visibility": "off"
               }
             ]
           }
         ]
       } else if (this.roadsDensity === 1) {
          return [
            {
              "featureType": "road.arterial",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
       } else if (this.roadsDensity === 0) {
          return [
            {
              "featureType": "road",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
       } else {
         return []
       }
      },
      landmarksDensityStyles () {
       if (this.landmarksDensity === 2) {
         return [
         {
           "featureType": "poi.business",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "poi.park",
           "elementType": "labels.text",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         }
         ]
       } else if (this.landmarksDensity === 1) {
         return [
         {
           "featureType": "poi",
           "elementType": "labels.text",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "poi.business",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "road",
           "elementType": "labels.icon",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "transit",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         }
         ]
       } else if (this.landmarksDensity === 0) {
         return [
         {
           "featureType": "administrative",
           "elementType": "geometry",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "poi",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "road",
           "elementType": "labels.icon",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "transit",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         }
         ]
       } else {
         return []
       }
      },
      labelDensityStyles () {
       if (this.labelsDensity === 2) {
         return [
         {
           "featureType": "administrative.land_parcel",
           "elementType": "labels",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "poi",
           "elementType": "labels.text",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "road.local",
           "elementType": "labels",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         }
         ]
       } else if (this.labelsDensity === 1) {
         return [
         {
           "featureType": "administrative.land_parcel",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "administrative.neighborhood",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "poi",
           "elementType": "labels.text",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "road",
           "elementType": "labels",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "water",
           "elementType": "labels.text",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         }
         ]
       } else if (this.labelsDensity === 0) {
         return [
         {
           "elementType": "labels",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "administrative.land_parcel",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         },
         {
           "featureType": "administrative.neighborhood",
           "stylers": [
           {
             "visibility": "off"
           }
           ]
         }
         ]
       } else {
         return []
       }
      },
      google: gmapApi
    },
    data () {
      return {
        mapOptions: {},
        mapStyles: null,
        oldShowInfoBox: this.showInfoBox,
        mouseOverDebounceTimer: null,
        hovered: false,
        activated: false,
        map: null,
        bounds: null,
        styles: window.theme.googleMap,
        firstCenterFormMarkers: true,
        omapApi: null,
        infoWindowPos: null,
        infoContent: '',
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        firstCentring: true,
        selectedmarker: null,
        debouceOnChangeCenter: null
      }
    },
    mounted () {
      this.oldShowInfoBox = this.showInfoBox
      window.addEventListener('updateTheme', (e) => {
        this.styles = window.theme.googleMap
        this.setMapStyle();
      })
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        this.fitBoundsTimeout = setTimeout(() => {
          this.fitBounds()
        }, 1000)
        this.setMapStyle();
      })
    },
    beforeDestroy () {
      clearTimeout(this.fitBoundsTimeout)
    },
    methods: {
      setMapStyle () {
        this.mapStyles = [
          ...this._.cloneDeep(this.roadDensityStyles),
          ...this._.cloneDeep(this.labelDensityStyles),
          ...this._.cloneDeep(this.landmarksDensityStyles),
          ...this._.cloneDeep(this.styles)
        ]
        this.mapOptions = {
          zoomControl: this.controlsVisibility,
          mapTypeControl: this.controlsVisibility,
          scaleControl: this.controlsVisibility,
          streetViewControl: false,
          rotateControl: this.controlsVisibility,
          fullscreenControl: this.controlsVisibility,
          disableDefaultUi: this.controlsVisibility,
          mapTypeId: this.mapTypeId,
          maxZoom: 40,
          controlSize: 32,
          styles: this.mapStyles
        }
      },
      getNumeralFormat (precision) {
        let out = '0,0.[0000000000000000000000]'
        precision = parseInt(precision)
        if (precision > 0) {
          out = `0,0.[${'0'.repeat(precision)}]`
        } else if (precision === 0) {
          out = '0,0'
        }
        return out
      },
      onMouseOver () {
        if (!this.hovered) {
          clearTimeout(this.mouseOverDebounceTimer)
          this.mouseOverDebounceTimer = setTimeout(() => {
            this.hovered = true
          }, 600)  
        }
      },
      onMouseLeave () {
        if (!this.activated) {
          clearTimeout(this.mouseOverDebounceTimer)
          this.hovered = false 
        }
      },
      onMouseKeyDown () {
        let that = this
        this.activated = true 
        function deactivate() {
          that.activated = false 
          window.removeEventListener('mouseup', deactivate);
        }
        window.addEventListener('mouseup',deactivate)
      },
      fitBounds () {
        if (this.enableFitBound) {
          this.bounds = new this.google.maps.LatLngBounds()
          this.markers.forEach((item) => {
            if (item.position) {
              this.bounds.extend(new this.google.maps.LatLng(item.position.lat, item.position.lng))
            }
          })
          this.map.fitBounds(this.bounds, 50)
        }
      },         
      onZoomChanged (event) {
        this.$emit('onZoomChanged', event)  
      },
      onMapTypeChanged (event) {
        this.$emit('onMapTypeChanged', event)  
      },
      onCenterChanged (event) {
        clearTimeout(this.debouceOnChangeCenter)  
        this.debouceOnChangeCenter = setTimeout(() => {
          this.$emit('onCenterChanged', event)  
        }, 500) 
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
      },
      getInfoWindowHeightOffset (size) {
        let calc = (2 + ((size ? size : 1) * 0.8) * 16)
        if (calc < 32) {
          calc = 32
        }
        return -calc
      },
      getValidLng (data) {
        return data.long ? data.long : data.lng ? data.lng : data.longitude ? data.longitude : null
      },
      getValidLat (data) {
        return data.lat ? data.lat : data.latitude ? data.latitude : null
      },
      toggleInfoWindow (marker, idx) {
        this.$set(marker, 'popupVisibilityInner', !marker.popupVisibilityInner) 
        this.$forceUpdate()
      }
    }
  }
</script>
