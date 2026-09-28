<template>
  <ComponentContainer
    class="w-100 form-address"
    needvalidation >
    <!--Address1-->
    <b-form-group
      :class="{ 'invalid-address-field': errors.has('address1') }"
      :label="$t('form.address1') ">
      <b-form-input
        v-if="readonly"
        :readonly="readonly"
        v-model="value.address1"
        type="text"
        name="address1"/>
      <gmap-place-input
        v-if="!readonly"
        :readonly="readonly"
        :default-place="value.address1"
        class="form-input-long google-place-input mb-0 px-0"
        @change.native="setAddress1"
        @place_changed="setPlace"/>
      <b-form-input
        v-validate="'required'"
        :state="errors.has('address1') ? false : null"
        v-model="value.address1"
        :placeholder="$t('form.address1') "
        type="text"
        class="hidden-input p-0"
        name="address1"
        tabindex="-1"
        autocomplete="nope"
        required
        @focus.native="sendFocusEvent($event)"/>
      <b-form-invalid-feedback v-if="errors.has('address1')">
        <span
          v-for="(error, index) in errors.collect('address1')"
          :key="index">
          {{ error }}
        </span>
      </b-form-invalid-feedback>
    </b-form-group>

    <!--Address 2-->
    <b-form-group
      :label="$t('form.address2') + ' ' + $t('general.optional')"
      class="form-control-optional">
      <b-form-input
        :readonly="readonly"
        v-model="value.address2"
        :placeholder="$t('form.address2') + ' ' + $t('general.optional')"
        type="text"
        name="address2"
        class="form-input-long"
        autocomplete="nope"
        required
        @focus.native="sendFocusEvent($event)"/>
    </b-form-group>

    <!--City-->
    <b-form-group :label="$t('form.city')">
      <b-form-input
        v-validate="'required'"
        :readonly="readonly"
        :state="errors.has('city') ? false : null"
        v-model="value.city"
        :placeholder="$t('form.city_placeholder')"
        type="text"
        size="md"
        name="city"
        autocomplete="nope"
        required
        @focus.native="sendFocusEvent($event)"/>
      <b-form-invalid-feedback v-if="errors.has('city')">
        <span v-for="error in errors.collect('city')">
          {{ error }}
        </span>
      </b-form-invalid-feedback>
    </b-form-group>

    <!--Province-->
    <b-form-group :label="$t('form.province')">
      <b-form-input
        v-validate="'required'"
        :readonly="readonly"
        :state="errors.has('province') ? false : null"
        v-model="value.province"
        :placeholder="$t('form.province')"
        type="text"
        size="md"
        name="province"
        autocomplete="nope"
        required
        @focus.native="sendFocusEvent($event)"/>
      <b-form-invalid-feedback v-if="errors.has('province')">
        <span v-for="error in errors.collect('province')">
          {{ error }}
        </span>
      </b-form-invalid-feedback>
    </b-form-group>

    <!--Country-->
    <b-form-group :label="$t('form.country')">
      <b-form-input
        v-validate="'required'"
        :readonly="readonly"
        :state="errors.has('country') ? false : null"
        v-model="value.country"
        :placeholder="$t('form.country')"
        type="text"
        size="md"
        autocomplete="nope"
        name="country"
        required
        @focus.native="sendFocusEvent($event)"/>
      <b-form-invalid-feedback v-if="errors.has('country')">
        <span v-for="error in errors.collect('country')">
          {{ error }}
        </span>
      </b-form-invalid-feedback>
    </b-form-group>

    <!--Postal Code-->
    <b-form-group
      :label="$t('form.postal_code')"
      class="pb-0">
      <b-form-input
        v-validate="'required'"
        :readonly="readonly"
        :state="errors.has('postalCode') ? false : null"
        v-model="value.postalCode"
        :placeholder="$t('form.postal_code')"
        type="text"
        size="md"
        autocomplete="nope"
        name="postalCode"
        required
        @focus.native="sendFocusEvent($event)"/>
      <b-form-invalid-feedback v-if="errors.has('postalCode')">
        <span v-for="error in errors.collect('postalCode')">
          {{ error }}
        </span>
      </b-form-invalid-feedback>
    </b-form-group>
  </ComponentContainer>
</template>

<script>
import EntitiesMixin from '@/mixin/entities'
export default {
  name: 'AddressForm',
  mixins: [EntitiesMixin],
  props: {
    value: {
      type: [Object, Boolean],
      default () {
        return {
          address1: '',
          address2: '',
          city: '',
          country: '',
          province: '',
          postalCode: ''
        }
      },
      required: true
    },
    readonly: {
      required: false,
      default: false,
      type: [Boolean, String, Object]
    }
  },
  data () {
    return {
      eventModel: {
        action: 'fill-address',
        category: 'Fill Address',
        label: 'User insert address',
        value: 0,
        teamNamespace: '',
        userId: ''
      }
    }
  },
  mounted () {
    if (this.value && this.value.address1) {
      this.addressObject = this.value
    }
  },
  methods: {
    setPlace (e) {
      let getAddressComponent = function (results, kind) {
        if (results.address_components) {
          for (var i = 0; i < results.address_components.length; i++) {
            var longName = results.address_components[i].long_name
            var type = results.address_components[i].types
            if (type.indexOf(kind) !== -1) {
              return longName
            }
          }
        }
      }
      this.value.address1p1 = getAddressComponent(e, 'street_number')
      this.value.address1p2 = getAddressComponent(e, 'route')
      if (this.value.address1p1) {
        this.value.address1 = this.value.address1p1 + ' ' + this.value.address1p2
      } else {
        this.value.address1 = this.value.address1p2
      }
      this.value.country = getAddressComponent(e, 'country')
      this.value.city = getAddressComponent(e, 'locality')
      this.value.province = getAddressComponent(e, 'administrative_area_level_1')
      this.value.postalCode = getAddressComponent(e, 'postal_code')
      this.$forceUpdate()
      this.$emit('setPlace', e)
    },
    setAddress1 (e) {
      this.value.address1 = e.target.value
    },
    update () {
      this.$emit('input', this.value)
    },
    sendFocusEvent (e) {
      this.eventModel.action = e.target.name + '-focus'
      // this.sendGtagEvent(this.eventModel)
    }
  }
}
</script>
