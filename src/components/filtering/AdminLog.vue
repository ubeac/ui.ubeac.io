<!-- TODO: remove this file -->
<template>
  <ComponentContainer>
    <b-card
      :class="{ 'card-feint': feint}"
      class="component-filtering"
      no-body
      title="Filter Data">
      <b-card-body>
        <b-form>
          <b-row v-if="historical">
            <b-col
              v-if="fromDate.enabled"
              cols="12">
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
            </b-col>
            <b-col
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
                        class="mr-2"
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
            </b-col>
            <b-col
              v-if="dateShortener.enabled"
              cols="12"
              class="mb-3">
              <b-button
                :variant="dateFilterShorthand === 'minute' ? 'success' : 'secandry'"
                size="sm"
                class="mb-2 mr-1"
                @click="filterTime('minute', true)">{{ $t("data.lasts.minute") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'hour' ? 'success' : 'secandry'"
                size="sm"
                class="mb-2 mr-1"
                @click="filterTime('hour', true)">{{ $t("data.lasts.hour") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'day' ? 'success' : 'secandry'"
                size="sm"
                class="mb-2 mr-1"
                @click="filterTime('day', true)">{{ $t("data.lasts.day") }}
              </b-button>
              <b-button
                :variant="dateFilterShorthand === 'week' ? 'success' : 'secandry'"
                size="sm"
                class="mb-2 mr-1"
                @click="filterTime('week', true)">{{ $t("data.lasts.week") }}
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <!-- Select Command-->
            <b-col
              v-if="reportDef != null"
              cols="12"
              class="mb-2">
              <b-form-group :label="$t('form.query_select')">
                <b-form-select
                  v-validate="'required'"
                  v-model="selectedQuery"
                  :state="errors.has('selectedReport') ? 'invalid' : null"
                  :placeholder="$t('form.query_select')"
                  name="selectedReport"
                  class="mb-3">
                  <option
                    v-for="method in getKeys"
                    :value="method"
                    :key="method">{{ method }}
                  </option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-button
                v-if="findButton.enabled"
                :disabled="disabled"
                :class="{'btn-loading': loading}"
                class="mr-2"
                variant="outline-primary"
                @click="doFilter">
                <icon name="filter"/>
                <span>
                  {{ $t("buttons.find") }}
                </span>
              </b-button>
              <b-button
                v-if="resetEnabled && resetButton.enabled"
                :disabled="disabled"
                variant="outline-link"
                @click="reset">
                <span>
                  {{ $t("buttons.reset") }}
                </span>
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import datePicker from 'vue-bootstrap-datetimepicker'
import Moment from 'moment'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'DeviceFiltering',
  components: { datePicker },
  mixins: [EntitiesMixin],
  props: {
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
    sensorEnabled: {
      type: [Boolean],
      required: false,
      default: true
    },
    sensorSchemaEnabled: {
      type: [Boolean],
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
    let dateFormat = this.$config.dateFormat.global
    return {
      dateFormat: dateFormat,
      autoSearchTimer: null,
      cachedFilterObject: null,
      dateFilterShorthand: false,
      methodNames: [],
      options: {
        showTodayButton: true,
        format: dateFormat,
        useCurrent: false
      },
      selectedSchema: null,
      selectedQuery: null,
      filter: null,
      filterModel: {
        fromDate: new Moment().subtract(1, 'hour').format(dateFormat),
        toDate: new Moment().format(dateFormat),
        query: null
      }
    }
  },
  computed: {
    ...mapGetters({
      reportDef: 'adminReport/reports'
    }),
    getKeys () {
      this.methodNames = Object.keys(this.reportDef)
      return (this.methodNames)
    },
    resetEnabled () {
      return JSON.stringify(this.filter) !== JSON.stringify(this.cachedFilterObject)
    }
  },
  beforeMount () {
    return this.reportList()
  },
  mounted () {
    this.preparefilter()
    this.cachedFilterObject = Object.assign({}, this.filter)
  },
  methods: {
    ...mapActions({
      reportList: 'adminReport/ReportList'
    }),
    filterTime (payload, toggle) {
      if (this.dateFilterShorthand === payload && toggle) {
        this.dateFilterShorthand = false
      } else {
        this.dateFilterShorthand = payload
        this.filterModel.toDate = new Moment().format(this.dateFormat)
        this.filterModel.fromDate = new Moment().subtract(1, payload).format(this.dateFormat)
      }
    },
    reset () {
      this.filterModel = {
        fromDate: new Moment().subtract(1, 'hour').format(this.dateFormat),
        toDate: new Moment().format(this.dateFormat),
        query: null
      }
      this.dateFilterShorthand = false
      this.selectedSchema = null
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
      if (this.filterModel.query != null) {
        this.selectedDevice = this.deviceById(this.filterModel.deviceIds[0])
      }
    },
    getSensorByType (sensorType) {
      return this.sensorByType(sensorType)
    },
    preparefilter () {
      this.filter = {
        fromDate: new Moment(this.filterModel.fromDate).format(this.dateFormat),
        toDate: new Moment(this.filterModel.toDate).format(this.dateFormat)
      }
      if (this.selectedQuery) {
        this.filter.query = this.selectedQuery
      }
      return this.filter
    },
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
