<template>
  <fullscreen
    ref="fullscreen"
    @change="fullscreenChange">
    <div
      :class="{ 'floor-plan-map-dark-bg': darkBg}"
      class="leaflet-floor-map">
      <v-map
        ref="map"
        :crs="options.crs"
        :zoom-delta="options.zoomDelta"
        :zoom-snap="options.zoomSnap"
        :attribution="false"
        :min-zoom="options.minZoom"
        :max-zoom="options.maxZoom"
        :zoom="parseInt(zoom)"
        :center="center"
        @moveend="onCenterChanged"
        @zoomend="onZoomChanged">
        <v-control v-if="controls">
          <b-button
            v-if="true"
            variant="light"
            class="widget-floor-plan--control"
            @dblclick.native.stop="() => {return false}"
            @click="toggleBackground">
            <icon
              name="light-dark-toggle"/>
          </b-button>
          <b-button
            variant="light"
            class="widget-floor-plan--control"
            @dblclick.native.stop="() => {return false}"
            @click="toggleFullscreen">
            <icon
              v-if="!isFullscreen"
              name="expand"/>
            <icon
              v-if="isFullscreen"
              name="collapse"/>
          </b-button>
        </v-control>
        <v-control-layers
          v-if="layersControl && controls"
          :collapsed="true"/>
        <v-control
          v-if="controls && showControlsDelayed && showBackToDefault"
          position="bottomright">
          <b-button
            variant="light"
            class="widget-floor-plan--control"
            @dblclick.native.stop="() => {return false}"
            @click="backToDefaultBounds">
            <icon
              name="target"/>
          </b-button>
        </v-control>
        <v-layer-group
          v-if="mapExistance"
          ref="layerRef"
          layer-type="overlay"
          name="Devices">
          <v-marker
            v-for="marker in validMarkers"
            v-if="marker.type === 'device'"
            ref="markerRef"
            :key="marker.id"
            :lat-lng="[marker.y, marker.x]"
            :draggable="draggable"
            class="pulse"
            @add="onAddMarker"
            @dragend="setMarkerPosition">
            <v-icon
              :icon-size="[sanitizedSize(marker.obj.attributes.ui_map_pin_size), sanitizedSize(marker.obj.attributes.ui_map_pin_size)]"
              :icon-anchor="[sanitizedSize(marker.obj.attributes.ui_map_pin_size)/2, sanitizedSize(marker.obj.attributes.ui_map_pin_size)]"
              :popup-anchor="[0, -sanitizedSize(marker.obj.attributes.ui_map_pin_size)]"
              class-name="widget-floor-plan--marker-container">
              <component
                :is="marker.obj.attributes.ui_map_pin ? marker.obj.attributes.ui_map_pin : 'MapPinPin'"
                :size="marker.obj.attributes.ui_map_pin_size ? marker.obj.attributes.ui_map_pin_size : 1"
                :icon="marker.obj.attributes.ui_icon ? marker.obj.attributes.ui_icon : 'default'"
                :color="marker.obj.attributes.ui_color ? marker.obj.attributes.ui_color : '#000000'" />
            </v-icon>
            <v-popup
              v-if="marker.obj && showPopupsDelayed"
              ref="popupRef"
              :options="{ autoPan:true, autoClose: false, closeOnClick: false }" >
              <h6
                v-if="marker.obj"
                class="tet-one-line mb-0 pl-1 pb-0">
                {{ marker.obj.name }}
              </h6>
              <template v-if="marker.obj.sensors">
                <ul class="p-0 pt-2 m-0">
                  <li
                    v-b-tooltip.hover
                    v-for="sensor in marker.obj.sensors"
                    v-if="sensorById(sensor)"
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
                            {{ sensors[sensor].data.value |
                            numeralFormat(getNumeralFormat(sensorById(sensor).attributes.ui_precision)) }}
                          </span>
                          <span>
                            <template v-if="sensorById(sensor).prefix">{{ sensorById(sensor).prefix.symbol }}</template>{{ sensorById(sensor).unit.abbr }}
                          </span>
                        </template>
                        <template v-else>
                          <span
                            v-for="(sensorValue, key) in sensors[sensor].data" >
                            {{ key }} {{ sensorValue | numeralFormat(getNumeralFormat(sensorById(sensor).attributes.ui_precision)) }}
                          </span>
                        </template>
                      </template>
                    </template>
                  </li>
                </ul>
              </template>
            </v-popup>
          </v-marker>
        </v-layer-group>
        <v-layer-group
          v-if="mapExistance"
          ref="layerRef"
          layer-type="overlay"
          name="Gateways">
          <v-marker
            v-for="marker in validMarkers"
            v-if="marker && marker.obj && marker.type === 'gateway'"
            ref="markerRef"
            :key="marker.id"
            :lat-lng="[marker.y, marker.x]"
            :draggable="draggable"
            :auto-pane="true"
            class="pulse"
            @add="onAddMarker"
            @dragend="setMarkerPosition">
            <v-icon
              :icon-size="[sanitizedSize(marker.obj.attributes.ui_map_pin_size), sanitizedSize(marker.obj.attributes.ui_map_pin_size)]"
              :icon-anchor="[sanitizedSize(marker.obj.attributes.ui_map_pin_size)/2, sanitizedSize(marker.obj.attributes.ui_map_pin_size)]"
              :popup-anchor="[0, -sanitizedSize(marker.obj.attributes.ui_map_pin_size)]"
              class-name="widget-floor-plan--marker-container">
              <component
                :is="marker.obj.attributes.ui_map_pin ? marker.obj.attributes.ui_map_pin : 'MapPinPin'"
                :size="marker.obj.attributes.ui_map_pin_size ? marker.obj.attributes.ui_map_pin_size : 1"
                :icon="marker.obj.attributes.ui_icon ? marker.obj.attributes.ui_icon : 'default'"
                :color="marker.obj.attributes.ui_color ? marker.obj.attributes.ui_color : '#000000'" />
            </v-icon>
            <v-popup
              v-if="marker.obj"
              ref="popupRef"
              :options="{
                autoPan: false,
                closeButton: true,
                keepInView: false,
                autoClose: false,
                closeOnClick: false }" >
              <h6
                v-if="marker.obj"
                class="text-one-line mb-0 pb-0">
                {{ marker.obj.name }}
              </h6>
              <span class="d-block w-100 text-one-line">
                {{ marker.obj.description }}
              </span>
              <span
                v-if="marker.obj.lastRequestDate"
                class="d-block w-100">
                {{ marker.obj.lastRequestDate | date }}
              </span>
            </v-popup>
          </v-marker>
        </v-layer-group>
      </v-map>
    </div>
  </fullscreen>
</template>
<style lang="scss">
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
<script>
import EntitiesMixin from '@/mixin/entities'
/* eslint-disable */
import L from 'leaflet'
// TODO: patch for https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
L.Icon.Default.imagePath = '.'
L.Map = L.Map.extend({
    openPopup: function(popup) {
        // this.closePopup(); 
        this._popup = popup;
        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
})
delete L.Icon.Default.prototype._getIconUrl
// End
import * as Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
import Indicators from '@/components/indicator/index'
import MapPins from '@/components/mappin/pins.js'
import { sizerate as sizerate } from '@/components/mappin/pinMixin.js'
export default {
  name: 'Gateway',
  mixins: [EntitiesMixin],
  components: {
    'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
    'v-icon': Vue2Leaflet.LIcon,
    'v-icondefault': Vue2Leaflet.LIconDefault,
    'v-marker': Vue2Leaflet.LMarker,
    'v-popup': Vue2Leaflet.LPopup,
    'v-tooltip': Vue2Leaflet.LTooltip,
    'v-control': Vue2Leaflet.LControl,
    'v-image-overlay': Vue2Leaflet.LImageOverlay,
    'v-control-layers': Vue2Leaflet.LControlLayers,
    'v-layer-group': Vue2Leaflet.LLayerGroup,
    'v-marker-cluster': Vue2LeafletMarkercluster,
    ...Indicators,
    ...MapPins
  },
  props: {
    showInfoBox: {
      type: Boolean,
      required: false,
      default: false 
    },
    showBackToDefault: {
      type: Boolean,
      required: false,
      default: false 
    },
    themeControl: {
      type: Boolean,
      required: false,
      default: true 
    },
    center: {
      type: [Boolean, Object],
      required: false,
      default () { return {lat: 50, lng: 50} }
    },
    layersControl: {
      type: Boolean,
      required: false,
      default: false
    },
    targetTrigger:{
      type: Number,
      required: false,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {
          zoomDelta: 1,
          zoomSnap: 0,
          minZoom: -4,
          maxZoom: 2,
          crs: L.CRS.Simple,
        }
      }
    },
    draggable: {
      type: Boolean,
      default: true
    },
    defaultMarker: {
      type: Boolean,
      default: true
    },
    stickToParent: {
      default: false,
      required: false
    },
    controls: {
      default: true,
      required: false
    },
    zoom: {
      default: 0,
      required: false
    },
    plan: {
      default: '',
      required: false
    },
    markers: {
      default () {
        let out = []
        if (this.defaultMarker) {
          out.push({
            id: 'sampleif',
            title: this.$t('general.sample_title'),
            type: 'gateway',
            pinNum: 1,
            x: 50,
            y: 50
          })
        }
        return out
      },
      required: false
    },
    sensors: {
      required: false
    },
    enableFitBounds: {
      default: true,
      required: false
    }
  },
  data () {
    return {
      zoomControl: null,
      showControlsDelayed: false,
      showPopupsDelayed: false,
      darkBg: false,
      debouceOnZoomCenter: null,
      debouceOnChangeCenter: null,
      isFullscreen: false,
      mapExistance: false,
      planWidth: 1000,
      planHeight: 1000,
      imageOverlay: null,
      map: null
    }
  },
  watch: {
    showInfoBox () {
      if (this.showInfoBox) {
        if (this.$refs.markerRef) {
          this.$refs.markerRef.forEach((item) => {
            item.mapObject.openPopup()
          })
        }
      } else {
        if (this.$refs.markerRef) {
          this.$refs.markerRef.forEach((item) => {
            item.mapObject.closePopup()
          })
        }
      }
    },       
    sensors: {
      deep: true,
      handler () {
        this.$forceUpdate()
      }       
    },       
    targetTrigger () {
      window.dispatchEvent(new Event('resize'))
    },
    controls () {
      if (this.controls) {
        if (this.map && this.zoomControl) {
          this.map.addControl( this.zoomControl )
        }
      } else {
        if (this.map && this.zoomControl) {
          this.map.removeControl( this.zoomControl )
        }
      }
    },
    plan () {
      this.cleanPlanImageOverlay()
      this.loadPlanImage()
    }
  },
  mounted () {
    let that = this
    this.loadPlanImage()
    this.showControlsDelayed = true
    this.showPopupsDelayed = true
  },
  computed: {
    // TODO: performance check
    validMarkers () {
      let out = []
      this.markers.forEach((item) => {
        let markerItem = this._.clone(item)
        markerItem.x = this.percentToMapX(item.x)
        markerItem.y = this.percentToMapY(item.y)
        if ((markerItem.x >= 0 || markerItem.x < 0) && (markerItem.y >= 0 || markerItem.y < 0)) {
          out.push(markerItem)
        }
      })
      return out
    }
  },
  methods: {
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
    onAddMarker (event) {
      if(this.showInfoBox) {
        setTimeout(() => {
          event.target.openPopup();
        }, 1000)
      }
    },
    sanitizedSize (size) {
      return (2 + ((size ? size : 1) * sizerate)) * 12
    },
    getPoint (x, y) {
      return L.point(x, y)
    },
    onZoomChanged (event) {
      clearTimeout(this.debouceOnZoomCenter)  
      this.debouceOnZoomCenter = setTimeout(() => {
        this.$emit('onZoomChanged', this.map.getZoom())  
      }, 500) 
    },
    onCenterChanged (event) {
      clearTimeout(this.debouceOnChangeCenter)  
      this.debouceOnChangeCenter = setTimeout(() => {
        this.$emit('onCenterChanged', {
          lat: this.map.getCenter().lat,
          lng: this.map.getCenter().lng,
        })  
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
    cleanPlanImageOverlay () {
      if (this.map && this.map.removeLayer && this.map.hasLayer(this.imageOverlay)) {
        this.map.eachLayer((layer) => {
          if(layer._image) {
            this.map.removeLayer(layer)
          }
        }, this.map)
      }
      else {
        //this.loadPlanImage()
      }
    },
    loadPlanImage () {
      let that = this
      window.map = this.map = this.$refs.map.mapObject // work as expected
      this.map.attributionControl.setPrefix(false)
      var img = new Image()
      img.onload = function() {
        that.planWidth = parseInt(this.naturalWidth)
        that.planHeight = parseInt(this.naturalHeight)
        that.initMap()
      }
      img.src = that.plan
    },
    setMarkerPosition (e) {
      this.$emit('update', {
        x: this.xToPercent(e.target._latlng.lng),
        y: this.yToPercent(e.target._latlng.lat)
      })
    },
    fullscreenChange (payload) {
      this.isFullscreen = payload
      window.dispatchEvent(new Event('resize'))
    },
    toggleFullscreen () {
      this.$refs['fullscreen'].toggle()
    },
    backToDefaultBounds () {
      this.map.flyTo(this.center, this.zoom)
    },
    initMap () {
      let that = this
      let bounds = [[0, 0], [that.planHeight, that.planWidth]]
      that.imageOverlay = L.imageOverlay(that.plan, bounds)
      that.map.addLayer(that.imageOverlay)
      that.map.attributionControl.setPrefix(false)
      that.map.setMaxBounds(bounds)
      that.map.zoomControl.setPosition('bottomright')
      that.zoomControl = that.map.zoomControl
      this.mapExistance = true
      if (this.enableFitBounds) {
        that.map.fitBounds(bounds)
      }
    },
    xy (x, y) {
      let yx = L.latLng
      if (L.Util.isArray(x)) {
        return yx(x[1], x[0])
      }
      return yx(y, x)
    },
    selectPoint (latlng) {
      this.$emit('select', latlng)
    },
    xToPercent (x) {
      return x * 100 / this.planWidth
    },
    yToPercent (y) {
      return (this.planHeight - y) * 100 / this.planHeight
    },
    percentToMapX (x) {
      return x * this.planWidth / 100
    },
    percentToMapY (y) {
      return this.planHeight - (y * this.planHeight / 100)
    },
    toggleBackground () {
      this.darkBg = !this.darkBg
    }
  }
}
/* eslint-enable */
</script>
