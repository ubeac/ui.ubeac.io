<template>
  <ComponentContainer>
  <b-tabs 
    :no-fade="true"
    class="card-tabs tab-content-3" 
    card>
    <b-tab :title="$t('general.general')" active>
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <!--Name-->
        <b-form-group :label="$t('general.name')">
          <b-form-input
            v-validate="{
                         required: true,
                         min: 2,
                         max: 150
                         }"
            :state="errors.has('name') ? false : null"
            v-model="insertItem.name"
            :placeholder="$t('general.name')"
            size="md"
            type="text"
            autofocus
            autocomplete="nope"
            name="name"
            required/>
            <b-form-invalid-feedback v-if="errors.has('name')">
              <span
                v-for="(error , index) in errors.collect('name')"
                :key="index" >
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <!--Description-->
        <b-form-group
          :label="$t('general.description') + ' ' + $t('general.optional')"
          class="form-control-optional">
          <b-form-textarea
            v-model="insertItem.description"
            v-validate="{
                         min: 0,
                         max: 500
                         }"
            :state="errors.has('description') ? false : null"
            :placeholder="$t('general.description') + ' ' + $t('general.optional')"
            size="md"
            :rows="2"
            type="text"
            autocomplete="nope"
            name="description"/>
            <b-form-invalid-feedback v-if="errors.has('description')">
              <span
                v-for="(error , index) in errors.collect('description')"
                :key="index" >
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <AddressForm 
                v-model="insertItem.address"
                @setPlace="setPlace" />

        <div class="form-row form-button-row p-3">
          <b-button
            type="button"
            class="btn btn-success float-left mr-2"
            @click="_addBuilding(insertItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            variant="secondary"
            class="float-left"
            @click="cancel()">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
        <div
          class="mr-3 ml-3 w-100 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.building"
            :text="$t('help_cards.building')" />
        </div>
        </b-form>
    </b-tab>
    <b-tab :title="$t('general.appearance')">
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <IconSelector 
        v-model="insertItem.attributes.ui_icon" />
        <ColorPicker 
        v-model="insertItem.attributes.ui_color" />
        <div class="form-row form-button-row p-3">
          <b-button
            type="button"
            class="btn btn-success float-left mr-2"
            @click="_addBuilding(insertItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            variant="secondary"
            class="float-left"
            @click="cancel()">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
        <div
          class="mr-3 ml-3 w-100 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.building"
            :text="$t('help_cards.building')" />
        </div>
      </b-form>
    </b-tab>
    <b-tab :title="$t('intro.map')">
      <b-form
        inline
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <MapPinSelector 
        :color="insertItem.attributes.ui_color"
        :icon="insertItem.attributes.ui_icon"
        size="1.5"
        v-model="insertItem.attributes.ui_map_pin"/>
        <MapPinSizeSelector 
        v-model="insertItem.attributes.ui_map_pin_size"/>
        <div 
        class="lined mt-3 w-100 d-block">
          <label> {{ $t('intro.map') }} </label>
          <p>
          <MapGeo
            class="form-map"
            :zoom="18"
            :searchable="false"
            :obj="insertItem"
            :lat="insertItem.latitude"
            :lng="insertItem.longitude"
            @select="selectPoint"/>
          </p>
        </div>
        <div class="form-row form-button-row p-3">
          <b-button
            type="button"
            class="btn btn-success float-left mr-2"
            @click="_addBuilding(insertItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            variant="secondary"
            class="float-left"
            @click="cancel()">
            {{ $t("buttons.cancel") }}
          </b-button>
        </div>
        <div
          class="mr-3 ml-3 w-100 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.building"
            :text="$t('help_cards.building')" />
        </div>
      </b-form>
    </b-tab>
  </b-tabs>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'
import AddressForm from '@/components/AddressForm'
import EntitiesMixin from '@/mixin/entities'
import IconSelector from '@/components/IconSelector'
import ColorPicker from '@/components/ColorPicker'
import MapPinSelector from '@/components/map/MapPinSelector.vue'
import MapPinSizeSelector from '@/components/map/MapPinSizeSelector.vue'
export default {
  name: 'BuildingAddForm',
  components: {AddressForm, IconSelector, ColorPicker, MapPinSelector, MapPinSizeSelector},
  mixins: [EntityAddMixin, EntitiesMixin ],
  data () {
    let self = this
    return {
      insertItem: {
        name: '',
        description: '',
        longitude: null,
        latitude: null,
        attributes: {
          ui_map_pin_size: 2,
          ui_icon: 'building',
          ui_map_pin: 'MapPinPin',
          ui_color: '#ff0000'
        },
        address: {
          address1: '',
          address2: '',
          city: '',
          country: '',
          province: '',
          postalCode: ''
        }
      }
    }
  },
  methods: {
    selectPoint (latlng) {
      this.insertItem.longitude = latlng.lng
      this.insertItem.latitude = latlng.lat
    },
    setPlace (place) {
      if (place && place.geometry && place.geometry.location) {
        this.insertItem.longitude = place.geometry.location.lng()
        this.insertItem.latitude = place.geometry.location.lat()
      }
    },
      @validation
        @successNotification('Building Added Successfully')
    _addBuilding (item) {
      item.teamId = this.workspaceId
      return this.addBuilding(item).then(async () => {
        this.success()
      })
    }
  }
}
</script>
