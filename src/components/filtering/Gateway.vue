<template>
  <ComponentContainer>
    <b-card
      :class="{ 'card-feint': feint}"
      class="no-shadow component-filtering"
      no-body
      title="Filter Data">
      <b-card-body class="pb-2">
        <b-form
          :inline="!compact"
          :class="{ 'form-compact': compact}"
          class="needs-validation"
          autocomplete="nope"
          novalidate>
          <div 
            class="clear-both w-100 float-left"
            v-if="historical">
            <div
              v-if="fromDate.enabled">
              <!-- From -->
              <b-form-group>
                <b-input-group
                  class="mr-2"
                  size="md">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <icon
                        class="mr-1"
                        name="calendar"/>
                      {{ $t("data.from") }}
                    </span>
                  </div>
                  <date-picker
                    v-model="filterModel.fromDate"
                    :disabled="dateFilterShorthand"
                    :placeholder="$t('data.date_picker_from')"
                    :config="options"
                    class="form-control"
                    @input="autoSearch"/>
                </b-input-group>
              </b-form-group>
            </div>
            <div
              v-if="toDate.enabled"
              cols="12">
              <!-- To -->
              <b-form-group>
                <b-input-group
                  class="mr-2"
                  size="md">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <icon
                        class="mr-1"
                        name="calendar"/>
                      {{ $t("data.to") }}
                    </span>
                  </div>
                  <date-picker
                    v-model="filterModel.toDate"
                    :disabled="dateFilterShorthand"
                    :placeholder="$t('data.date_picker_to') "
                    :config="options"
                    class="form-control"
                    @input="autoSearch"/>
                </b-input-group>
              </b-form-group>
            </div>
            <b-form-group
              class="clear-right"
              v-if="dateShortener.enabled">
              <b-button
                :variant="dateFilterShorthand === 'minute' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('minute', true)">{{ $t("data.lasts.minute") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'hour' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('hour', true)">{{ $t("data.lasts.hour") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'day' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('day', true)">{{ $t("data.lasts.day") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'week' ? 'success' : 'secondary'"
                class="mr-1 px-2 w-auto"
                @click="filterTime('week', true)">{{ $t("data.lasts.week") }}
              </b-button>
            </b-form-group>
          </div>
          <!--Gateway-->
          <b-form-group>
            <multiselect
              v-model="slectedGateway"
              :auto-close="true"
              :multiple="false"
              :options="gatewayList"
              :placeholder="$t('manage.select_gateway')"
              label="name"
              @input="autoSearch()"/>
          </b-form-group >
          <b-button
            v-if="findButton.enabled"
            :disabled="disabled"
            :class="{'btn-loading': loading}"
            class="mr-2"
            variant="outline-primary"
            type="button"
            @click="doFilter">
            <icon name="filter"/>
            <span>
              {{ $t("buttons.find") }}
            </span>
          </b-button>
          <b-button
            v-if="resetEnabled && resetButton.enabled"
            :disabled="disabled"
            variant="outline-secondary"
            type="button"
            @click="reset">
            <span>
              {{ $t("buttons.reset") }}
            </span>
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import validation from '@/decorators/validation'
import datePicker from 'vue-bootstrap-datetimepicker'
import Multiselect from '../multiselect/Multiselect.vue'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'
import DataListNoResult from '../../components/DataListNoResult'

export default {
  name: 'DeviceFiltering',
  components: { DataListNoResult, datePicker, Multiselect },
  mixins: [EntitiesMixin],
  props: {
    filterByTeam: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    filterSensors: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    novalidate: {
      type: Boolean,
      required: false,
      default: false
    },
    compact: {
      type: Boolean,
      required: false,
      default: false
    },
    fromDate: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    toDate: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    dateShortener: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    historical: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedTypesMultiple: {
      type: Boolean,
      required: false,
      default: true
    },
    referenceKey: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    feint: {
      type: Boolean,
      required: false,
      default: false
    },
    autoSave: {
      type: Boolean,
      required: false,
      default: true
    },
    header: {
      type: Object,
      required: false,
      default () {
        return {
          enabled: true
        }
      }
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    filteringData: {
      type: [Boolean, Object, String],
      required: false,
      default: null
    },
    resetButton: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    findButton: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    autoSelectNextItems: {
      type: [Boolean],
      required: false,
      default: true
    },
    loadOnMount: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: [Boolean],
      required: false,
      default: false
    }
  },
  data () {
    let dateFormatDatepicker = this.$config.dateFormat.datepicker
    return {
      currentSensorSchema: null,
      autoSearchTimer: null,
      cachedFilterObject: null,
      dateFilterShorthand: false,
      slectedGateway: null,
      options: {
        showTodayButton: true,
        format: dateFormatDatepicker,
        useCurrent: false,
        icons: {
          time: 'icon icon-clock',
          date: 'icon icon-calendar',
          up: 'fas fa-arrow-up',
          down: 'fas fa-arrow-down',
          previous: 'fas fa-chevron-left',
          next: 'fas fa-chevron-right',
          today: 'icon icon-target',
          clear: 'far fa-trash-alt',
          close: 'far fa-times-circle'
        }
      },
      selectedSchema: null,
      filter: null,
      filterModel: {
        fromDate: new Moment().subtract(1, 'hour').toISOString(true),
        toDate: new Moment().toISOString(true),
        gatewayIds: []
      }
    }
  },
  computed: {
    resetEnabled () {
      return JSON.stringify(this.filter) !== JSON.stringify(this.cachedFilterObject)
    }
  },
  watch: {
    filteringData (newVal, oldVal) {
      if (this.filteringData && JSON.stringify(newVal) !== JSON.stringify(oldVal) ) {
        this.syncFilterModel()
      }
    }
  },
  mounted () {
    if (this.filteringData) {
      this.syncFilterModel()
    }
    if (this.loadOnMount) {
      this.doFilter()
    }
    this.preparefilter()
    this.cachedFilterObject = Object.assign({}, this.filter)
  },
  methods: {
    filterTime (payload, toggle) {
      if (this.dateFilterShorthand === payload && toggle) {
        this.dateFilterShorthand = false
      } else {
        this.dateFilterShorthand = payload
        this.filterModel.toDate = new Moment().toISOString(true)
        this.filterModel.fromDate = new Moment().subtract(1, payload).toISOString(true)
      }
      this.autoSearch()
    },
    reset () {
      this.filterModel = {
        fromDate: new Moment().subtract(1, 'hour').toISOString(true),
        toDate: new Moment().toISOString(true),
        gatewayIds: []
      }
      this.slectedGateway = null
      this.dateFilterShorthand = false
      this.preparefilter()
      this.cachedFilterObject = Object.assign({}, this.filter)
      this.doFilter()
    },
    autoSearch () {
      this.preparefilter()
      clearTimeout(this.autoSearchTimer)
      if (this.autoSave) {
        this.autoSearchTimer = setTimeout(() => {
          this.doFilter()
        }, 100)
      }
    },
    syncFilterModel () {
      this.filterModel = Object.assign({}, this.filteringData)
    },
    preparefilter () {
      this.filter = {
        fromDate: new Moment(this.filterModel.fromDate).toISOString(true),
        toDate: new Moment(this.filterModel.toDate).toISOString(true),
        gatewayIds: [this.slectedGateway ? this.slectedGateway.id : null]
      }
      return this.filter
    },
     @validation
    doFilter () {
      if (this.dateFilterShorthand) {
        this.filterTime(this.dateFilterShorthand, false)
      }
      this.preparefilter()
      if (this.referenceKey) {
        this.$emit('filter', {
          filter: this.filter,
          referenceKey: this.referenceKey
        })
      } else {
        this.$emit('filter', this.filter)
      }
    }
  }
}
</script>
