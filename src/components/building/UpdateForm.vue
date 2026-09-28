<template>
  <ComponentContainer >
  <b-modal
    ref="ModalConfirmRemove"
    :title="$t('modal.question_confirm')"
    centered
    ok-variant="danger"
    cancel-variant="secondary"
    @ok="deleteMe(underRemoveItem.id)">
    <b-alert
      show
      variant="warning">
      {{ $t("modal.delete_building_warning") }}
    </b-alert>
    <span v-if="underRemoveItem">
      {{ $t("modal.delete_info_1") }} <b>{{ underRemoveItem.name }}</b>.
      {{ $t("modal.delete_info_2") }}
    </span>
  </b-modal>
  <b-tabs 
    class="card-tabs tab-content-3" 
    :no-fade="true"
    card>
    <b-tab 
      :title="$t('general.general')" 
      active>
      <b-form
        inline
        v-if="buildingUpdate"
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
            v-model="underUpdateItem.name"
            :placeholder="$t('general.name')"
            size="md"
            type="text"
            autofocus
            name="name"/>
            <b-form-invalid-feedback v-if="errors.has('name')">
              <span
                v-for="(error, index) in errors.collect('name')"
                :key="index">
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <!--Description-->
        <b-form-group
          :label="$t('general.description') + ' ' + $t('general.optional')"
          class="form-control-optional">
          <b-form-textarea
            v-validate="{
                         min: 0,
                         max: 500
                         }"
            :state="errors.has('description') ? false : null"
            v-model="underUpdateItem.description"
            :placeholder="$t('general.description') + ' ' + $t('general.optional')"
            :rows="2"
            size="md"
            type="text"
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
          v-model="underUpdateItem.address"
          @setPlace="setPlace" />

        <div class="form-row form-button-row p-3">
          <!--Buttons-->
          <b-button
            type="button"
            variant="outline-danger"
            class="float-right text-right"
            @click="prepareForRemove(underUpdateItem)">
            <icon name="delete"/>
            <span
              v-if="!browser.isMobile"
              class="ml-1">
              {{ $t('buttons.delete') }}
            </span>
          </b-button>
          <b-button
            :disabled="updateEnabled"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="update(underUpdateItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
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
    <b-tab 
      :title="$t('general.appearance')">
      <b-form
        inline
        v-if="buildingUpdate"
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <IconSelector 
        v-model="underUpdateItem.attributes.ui_icon" />
        <ColorPicker 
        v-model="underUpdateItem.attributes.ui_color" />
        <div class="form-row form-button-row p-3">
          <!--Buttons-->
          <b-button
            type="button"
            variant="outline-danger"
            class="float-right text-right"
            @click="prepareForRemove(underUpdateItem)">
            <icon name="delete"/>
            <span
              v-if="!browser.isMobile"
              class="ml-1">
              {{ $t('buttons.delete') }}
            </span>
          </b-button>
          <b-button
            :disabled="updateEnabled"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="update(underUpdateItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
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
    <b-tab 
      :title="$t('intro.map')">
      <b-form
        inline
        v-if="buildingUpdate"
        class="needs-validation"
        autocomplete="nope"
        novalidate>
        <MapPinSelector 
        :color="underUpdateItem.attributes.ui_color"
        :icon="underUpdateItem.attributes.ui_icon"
        size="1.5"
        v-model="underUpdateItem.attributes.ui_map_pin"/>
        <MapPinSizeSelector 
        v-model="underUpdateItem.attributes.ui_map_pin_size"/>
        <div 
        class="lined">
          <label>
            {{ $t('intro.map') }}
          </label>
          <p>
          <MapGeo
            class="form-map"
            :zoom="16"
            :searchable="false"
            :obj="underUpdateItem"
            :lat="underUpdateItem.latitude"
            :lng="underUpdateItem.longitude"
            @select="selectPoint"/>
          </p>
        </div>
        <div class="form-row form-button-row p-3">
          <!--Buttons-->
          <b-button
            type="button"
            variant="outline-danger"
            class="float-right text-right"
            @click="prepareForRemove(underUpdateItem)">
            <icon name="delete"/>
            <span
              v-if="!browser.isMobile"
              class="ml-1">
              {{ $t('buttons.delete') }}
            </span>
          </b-button>
          <b-button
            :disabled="updateEnabled"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="update(underUpdateItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
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
import EntityUpdateMixin from '@/mixin/entityUpdate'
import AddressForm from '@/components/AddressForm'
import IconSelector from '@/components/IconSelector'
import ColorPicker from '@/components/ColorPicker'
import MapPinSelector from '@/components/map/MapPinSelector.vue'
import MapPinSizeSelector from '@/components/map/MapPinSizeSelector.vue'

export default {
  name: 'BuildingUpdateForm',
  components: {AddressForm, IconSelector, ColorPicker, MapPinSelector, MapPinSizeSelector},
  mixins: [EntityUpdateMixin],
  data () {
    return {
      underUpdateItem: {},
      underRemoveItem: {},
      updateItemCached: {}
    }
  },
  computed: {
    buildingUpdate () {
      const item = this.buildingById(this.id)
      if (item) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
      }
      this.underUpdateItem = this._.cloneDeep(item)
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return JSON.stringify(this.updateItemCached) ===
          JSON.stringify(this.underUpdateItem)
    }
  },
  methods: {
    setPlace (place) {
      if (place && place.geometry && place.geometry.location) {
        this.underUpdateItem.longitude = place.geometry.location.lng()
        this.underUpdateItem.latitude = place.geometry.location.lat()
      }
    },
    selectPoint (latlng) {
      this.underUpdateItem.longitude = latlng.lng
      this.underUpdateItem.latitude = latlng.lat
    },
      @successNotification('Delete Done')
    deleteMe (id) {
      return this.deleteBuilding(id).then(() => {
        this.$router.push({ name: 'Buildings' })
        this.$emit('success')
      })
    },
      @validation
        @successNotification('Building Updated Successfully')
    update (item) {
      var building = {
        id: item.id,
        name: item.name,
        description: item.description,
        teamId: item.teamId,
        longitude: item.longitude,
        latitude: item.latitude,
        attributes: item.attributes,
        address: {
          address1: item.address.address1,
          address2: item.address.address2,
          city: item.address.city,
          country: item.address.country,
          province: item.address.province,
          postalCode: item.address.postalCode
        }
      }
      return this.updateBuilding(building).then(() => {
        this.success()
      })
    },
    prepareForRemove (item) {
      this.underRemoveItem = item
      this.$refs.ModalConfirmRemove.show()
    }
  }
}
</script>
