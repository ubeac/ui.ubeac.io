<template>
  <!--<div v-if="searchable">-->
  <!--<gmap-place-input-->
  <!--:default-place="place"-->
  <!--@place_changed="setPlace"/>-->
  <!--</div>-->
  <div class="component-map">
    <GmapMap
      ref="mapRef"
      :tilt="60"
      :center="center"
      :options="googleMapOptions"
      :zoom="zoom"
      :clickable="clickable"
      :style="{width: '100%', height: '100%', 'min-height': '100%'}"
      map-type-id="hybrid"
      @click="selectPoint">
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false">
        <!-- <pre> {{ JSON.decycle(infoContent) }} </pre> -->
        <span> {{ infoContent.name }} </span>
        <span> {{ infoContent.description }} </span>
      </gmap-info-window>
      <template
        v-if="customMarkers">
        <gmap-custom-marker
          v-for="(marker, index) in markersList"
          v-if="marker.position && marker.position.lat !== null && marker.position.lng !== null "
          :marker="{ lat: marker.position.lat, lng: marker.position.lng }"
          :key="index"
          @click="selectPoint"
          @dragend="selectPoint">
          <template
            v-if="marker.contentType === 'graph'">
            <CircleIndicator
              :value="marker.lastSeen"/>
          </template>
          <template
            v-if="marker.type === 'building'">
            <!-- TODO:Delete map-markers here and uncomment MapMarker component below-->
            <div class="map-markers">
              <ul
                class="map-markers-box">
                <li
                  v-for="gateway in marker.gateways"
                  :key="gateway.id"
                  class="map-markers-item my-1 p-1">
                  <CircleIndicator
                    :value="gateway.lastSeen"/>
                  <span class="ml-1"> {{ gateway.name }} </span>
                  <span class="ml-2"> {{ gateway.description }} </span>
                </li>
              </ul>
              <div
                class="markers-icon p-1">
                <icon
                  :name="marker.iconName"
                  @click.native="toggleInfoWindow(marker,index)"/>
              </div>
            </div>
            <!-- <MapMarker
                :marker="marker"
                @click.native="toggleInfoWindow(marker,index)"/> -->
          </template>
          <template
            v-if="!marker.contentType">
            <b-badge>Default Custom Marker</b-badge>
          </template>
        </gmap-custom-marker>
      </template>
      <template
        v-if="!customMarkers">
        <gmap-custom-marker
          v-for="(marker, index) in markersList"
          v-if="obj && marker.position && marker.position.lat !== null && marker.position.lng !== null "
          ref="markers"
          :marker="{ lat: marker.position.lat, lng: marker.position.lng }"
          :key="index"
          :position="marker.position"
          :clickable="clickable"
          :animation="2"
          :optimizaed="false"
          :draggable="draggable"
          :icon="normalizeIcon(marker.icon)"
          @click="selectPoint"
          @dragend="selectPoint" >
          <component
            v-if="obj && obj.attributes"
            :is="obj.attributes.ui_map_pin ? obj.attributes.ui_map_pin : 'MapPinPin'"
            :size="obj.attributes.ui_map_pin_size ? obj.attributes.ui_map_pin_size : 1"
            :icon="obj.attributes.ui_icon ? obj.attributes.ui_icon : 'default'"
            :color="obj.attributes.ui_color ? obj.attributes.ui_color : '#000000'" />
        </gmap-custom-marker>
        <GmapMarker
          v-for="(marker, index) in markersList"
          v-if="!obj && marker.position && marker.position.lat !== null && marker.position.lng !== null "
          ref="markers"
          :marker="{ lat: marker.position.lat, lng: marker.position.lng }"
          :key="index"
          :position="marker.position"
          :clickable="clickable"
          :animation="2"
          :optimizaed="false"
          :draggable="draggable"
          :icon="normalizeIcon(marker.icon)"
          @dragend="selectPoint"
          @click.native="toggleInfoWindow(marker,index)"/>
      </template>
      <GmapPolyline
        :path="path"
        :options="{ strokeWeight: 3, strokeColor:'#FF0000'}"/>
    </GmapMap>
  </div>
</template>
<script>
/* eslint-disable */
  import GmapCustomMarker from './CustomMarker.vue'
  import MapMarker from './MapMarker.vue'
  import Indicators from '@/components/indicator/index'
  import MapPins from '@/components/mappin/pins.js'
  export default {
    name: 'GeoMap',
    components: { GmapCustomMarker, ...Indicators, MapMarker, ...MapPins },
    props: {
      obj: {
        type: [Number, Object],
        default: null
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
        type: Number,
        default: 5
      },
      search: {
        default: true
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
        type: Array,
        default () {
          return []
        }
      },
      customMarkers: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      googleMapOptions ()  {
        return {
          mapTypeId: 'terrain',
          streetViewControl: false,
          fullscreenControl: true,
          maxZoom: 40,
          controlSize: 24,
          styles: this.styles
        }
      },
      styles () {
        let out = window.theme.googleMap
        return out
      },
      markersList () {
        let out = []
        if (!isNaN(parseFloat(this.lat)) && isFinite(this.lat) && !isNaN(parseFloat(this.lng)) && isFinite(this.lng)) {
          out.push({
            position: {lat: this.lat, lng: this.lng}
          })
        } else {
          out = this.markers
        }
        if (this.liveMarkers && out) {
          out.forEach((building) => {
            if (building.type == 'building') {
              building.gateways.forEach((item) => {
                if (item.id === this.liveMarkers.id) {
                  item.lastSeen = this.liveMarkers.date
                }
              })
            }
          })
        }
        return out
      },
      defaultCenter () {
        let firstItem = this.markersList.find((a) => {return a.defaultCenterOfMap})
        if (firstItem) {
          firstItem = firstItem.position
        }
        else if (!firstItem && this.markersList[0]) {
          firstItem = this.markersList[0].position
        }
        return firstItem
      },
      currentPosition () {
        return this.currentLocation
      }
    },
    watch: {
      defaultCenter () {
        this.centerToLatLng(this.defaultCenter.lat, this.defaultCenter.lng)
      },
      currentPosition () {
        this.zoomToViewAllMarkers()
      },
      lng () {
        this.zoomToViewAllMarkers()
        this.$forceUpdate()
      },
      lat () {
        this.zoomToViewAllMarkers()
        this.$forceUpdate()
      },
      markersList: {
        deep: true,
        handler () {
          this.zoomToViewAllMarkers()
        }
      }
    },
    data () {
      return {
        firstCenterFormMarkers: true,
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
        center: {lat: 43.64962701058062, lng: -79.3569616880268},
        selectedmarker: null
      }
    },
    mounted () {
      setTimeout(() => {
        this.zoomToViewAllMarkers()
      }, 300)
    },
    beforeDestroy () {
      clearTimeout(this.fitBoundsTimeout)
    },
    methods: {
      normalizeIcon (icon) {
        if (icon) {
          return {
            url: icon.url,
            size: this.getMapSize(...icon.size),
            origin: this.getMapPoint(...icon.origin),
            anchor: this.getMapPoint(...icon.anchor)
          }
        } else {
          return null
        }
      },
      getMapPoint (a, b) {
        return new window.google.maps.Point(a, b)
      },
      getMapSize (a, b) {
        return new window.google.maps.Size(a, b)
      },
      toggleInfoWindow: function(marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = marker.popover;
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },
      happyBounds () {
        let out = false
        let happyMarkers = []
        if (window.google) {
          let bounds = new window.google.maps.LatLngBounds()
          if (this.markers.length > 0) {
            this.markers.forEach((marker) => {
              let point = new google.maps.LatLng(marker.lat, marker.lng)
              happyMarkers.push(point)
              bounds.extend(point)
            })
          }
          if (happyMarkers.length > 0) {
            out = bounds
          }
        }
        return out
      },
      zoomToViewAllMarkers () {
        if (this.happyBounds()) {
          if (this.$refs.mapRef) {
            // this.$refs.mapRef.$mapObject.fitBounds(this.happyBounds(), 0);
            // this.googleMapOptions.maxZoom = null
          }
        } else if (this.lat !== null && this.lng !== null) {
          this.centerToLatLng(this.lat, this.lng)
          this.googleMapOptions.maxZoom = null
        } else if (this.currentPosition){
          this.centerToLatLng(this.currentPosition.lat, this.currentPosition.lng)
          this.googleMapOptions.maxZoom = null
        }
      },
      centerToLatLng (lat, lng) {
        this.center = {
          lat: lat,
          lng: lng
        }
      },
      setPlace (place) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      },
      selectPoint (a) {
        this.$emit('select', {
          lat: a.latLng.lat(),
          lng: a.latLng.lng()
        })
      }
    }
  }
</script>
