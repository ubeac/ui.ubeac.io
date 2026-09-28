<template>
  <ComponentContainer>
  <b-card
    no-body
    class="add-form-wizard mb-3">
    <b-card-body class="px-0 w-100">
      <form-wizard
        ref="wizard"
        :title="''"
        :color="'#113982'"
        :step-size="'sm'"
        :subtitle="''">
        <wizard-step 
          slot-scope="props" 
          slot="step" 
          :tab="props.tab" 
          :transition="props.transition" 
          :index="props.index">
        </wizard-step>
        <tab-content 
        :before-change="onCompleteFirstStep" 
        :title="$t('wizard.select_gateway')">
          <b-form
            inline
            class="needs-validation"
            novalidate>
            <h3 class="mt-4 ml-1 h6 card-border-out-title">
               {{ $t('wizard.start_add_first_gateway') }}
            </h3>
            <FirmwareSelector
              class="w-100"
              :horizontal-layout="true"
              @input="onSelectFirmware"
              v-model="firmwareId"/>
          </b-form>
        </tab-content>
        <tab-content :title="$t('wizard.connect_device')">
          <div v-if="gatewayItem" >
            <h3 class="h6 card-border-out-title">
               {{ $t('wizard.how_connect_you_device') }}
            </h3>
            <DataCollector 
               :url="gatewayUrl"/>
            <h3 class="h6 card-border-out-title">
               {{ $t('wizard.live_data') }}
            </h3>
            <NewlyAdded 
              v-if="$refs.wizard.activeTabIndex === 1"  
              @onnewdevice="onNewDevice"
              :id="gatewayItem.id" />
          </div>
        </tab-content>
        <tab-content 
          :title="$t('wizard.finish')">
          <b-alert 
              show
              class="py-2 py-sm-0"
              variant="success">
            <icon
              class="d-none d-sm-block"
              name="check-badge" />
            <span class="alert-text ml-0 ml-sm-3">
            {{ $t('wizard.last_step_happy_message') }}
            </span>
          </b-alert>
          <b-card
            no-body
            class="card-border no-shadow">
            <b-form
              inline
              autocomplete="nope"
              novalidate>
              <b-form-group 
                :label="$t('wizard.add_default_dashboard')">
                <toggle-button
                :speed="100"
                  :sync="true"
                  :labels="false"
                  v-model="addDashboardFlag"
                  :unchecked-value="false"/>
              </b-form-group>
              <b-form-group :label="$t('wizard.dashboard_name')">
                <b-form-input
                  :disabled="!addDashboardFlag"
                  v-validate="{
                    required: true,
                    min: 2,
                    max: 150
                  }"
                  :state="errors.has('name') ? false : null"
                  v-model="insertDashboard.name"
                  :placeholder="$t('general.name')"
                  size="md"
                  type="text"
                  autofocus
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
              </b-form>
          </b-card>
        </tab-content>
        <template slot="footer" slot-scope="props">
          <div class="wizard-footer-left">
            <wizard-button 
               v-if="false && props.activeTabIndex > 0 && !props.isLastStep" 
               @click.native="props.prevTab()" 
               :style="props.fillButtonStyle">
              {{ $t('wizard.previous') }}
            </wizard-button>
          </div>
          <div class="wizard-footer-right w-100">
            <wizard-button 
              :disabled="newDevices.length === 0"
              v-if="!props.isLastStep && props.activeTabIndex == 1" 
              @click.native="props.nextTab()" 
              class="wizard-footer-right float-right" 
              variant="info"
              :style="props.fillButtonStyle">
              {{ $t('wizard.next') }}
            </wizard-button>
            <span 
              class="mr-3 pt-2 d-block float-right wizard-happy-received-first-data"
              v-if="props.activeTabIndex == 1 && newDevices.length > 0"> 
              {{ newDevices.length }} {{ $t('wizard.happy_first_data_received')  }} 
            </span>
            <wizard-button 
               v-if="props.isLastStep" 
               @click.native="onCompleteLastStep"
               class="wizard-footer-right finish-button" 
               :style="props.fillButtonStyle">
              {{props.isLastStep ? $t('wizard.done') : $t('wizard.next')}}
            </wizard-button>
          </div>
        </template>
      </form-wizard>
    </b-card-body>
  </b-card>
  </ComponentContainer>
</template>

<script>
import FirmwareSelector from '@/components/FirmwareSelector'
import CheckMarked from '@/components/CheckMarked'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityAddMixin from '@/mixin/entityAdd'
import Wizards from '@/components/wizard/index.js'
import WebsensorTempate from '@/components/predefined_dashboard/websensor.js'
import NewlyAdded from '@/components/NewlyAdded.vue'
export default {
  name: 'GatewayAddWizardForm',
  components: { ...Wizards, NewlyAdded, FirmwareSelector, CheckMarked },
  data () {
    return {
      queryParamId: null,
      newDevices: [],
      addDashboardFlag: true,
      happyFirstDataReceived: false,
      insertedItemId: null,
      firmwareId: null,
      insertItem: {
        name: '',
        description: '',
        floorId: '',
        url: '',
        buildingId: '',
        firmwareId: '',
        x: 50,
        attributes: {
          ui_color: '#000000',
          ui_map_pin: 'MapPinPin',
          ui_map_pin_size: 1,
          ui_icon: 'hdd',
        },
        security: {
          http: {
            ssl: false,
            headers: {}
          },
          ipRestriction: {
            allowedIps: [],
            deniedIps: []
          },
          mqtt: {
            password: null,
            username: null,
            tls:false
          }
        },
        y: 50
      },
      insertDashboard: {
        name: '',
        description: '',
        viewOrder: 0,
        attributes: {
          theme: 'default'
        },
        teamId: null
      }
    }
  },
  mixins: [ EntityAddMixin ],
  computed: {
    gatewayItem () {
      return this.gatewayById(this.insertedItemId)
    },
    gatewayUrl () {
      let out = null
      if (this.gatewayItem) {
         out = `${this.gatewayItem.url}` 
      }
      return out
    }
  },
  mounted () {
    if (this.$route.query.id && this.gatewayById(this.$route.query.id)) {
      this.queryParamId = this.$route.query.id
      this.insertedItemId = this.queryParamId
      this.insertDashboard.name = this.gatewayById(this.queryParamId).name
      this.$refs.wizard.nextTab()
    }
  },
  methods: {
    onHappyFirstDataReceived () {
      this.happyFirstDataReceived = true
    },
    getSuffix () {
      return Math.random().toString().split('.')[1].slice(0, 3)
    },
    setQueryParam (gatewayId) {
      const params = new URLSearchParams(location.search);
      params.set('id', gatewayId);
      window.history.replaceState({}, '', `${location.pathname}?${params}`)
    },
    onCompleteFirstStep () {
      const promise  = new Promise((resolve, reject) => {
        if (this.queryParamId) {
          resolve(true)
        }
        else if (this.firmwareId) {
          let rand = this.getSuffix()
          let name = this.getDefaultName(this.firmwareId)
          //let uid = `${this.firmwareId.replace(/-/g, '')}${rand}`
          let uid = `${rand}`
          this._addGateway({
            name: name,
            url: uid,
            firmwareId: this.firmwareId
          }).then((response) => {
            this.setQueryParam(response.body.data)
            this.insertedItemId = response.body.data
            this.insertDashboard.name = name
            resolve(true)
          }).catch(() => {
            reject()
          })
        }
      })
      return promise 
    },
    getDefaultUrl (name) {
      return name.trim().replace(/ /g, '')
    },
    getDefaultName (id) {
      return this.firmwareById(id).name
    },
    onNewDevice (deviceId) {
      this.newDevices.push(deviceId)
    },
    onCompleteLastStep () {
      if (this.addDashboardFlag) {
        this._addDashboard()
      } else {
        this.$router.push({ name: 'GatewayDetails', params: { id: this.gatewayItem.id } })
      }
    },
    @validation
    _addDashboard () {
      let dashboardData = this._.cloneDeep(WebsensorTempate)
      this.insertDashboard.teamId = this.workspaceId
      let insertedItemId = this.insertedItemId
      if (this.newDevices.length > 0 ){
        this.newDevices.forEach((deviceId) => {
          let device = this.deviceById(deviceId)
          let sensors = device.sensors
          sensors.forEach((sensorId) => {
            let sensor = this.sensorById(sensorId)
            this._.each(dashboardData, (widget) => {
              if (widget.setting.sensorType === sensor.type.type) {
                if (widget.type === 'MapWidget') {
                  widget.setting.sensorFilter = [ 
                    {
                      "name": "SmartDevice",
                      "data": {
                        "sensorIds":[ sensor.id ],
                        "sensorSelectedValue": "lat",
                        "deviceIds":[ deviceId ],
                      },
                      "tooltipSensor": {
                        "deviceIds": {
                          "$ref": "$[\"settings\"][\"sensorFilter\"][0][\"data\"][\"deviceIds\"]"
                        }
                      },
                      "mustFollow": true
                    }
                  ]
                }
                if (widget.type === 'IndicatorLiveWidget') {
                  widget.setting.sensorFilter = {
                    "sensorIds":[ sensor.id ],
                    "sensorSelectedValue":"value",
                    "deviceIds":[ deviceId ],
                    "pageNumber":1,
                    "pageSize":false
                  }
                }
                if (widget.type === 'ChartLiveWidget') {
                  widget.setting.sensorFilter = [ ]
                  sensor.schema.forEach((item) => {
                    widget.setting.sensorFilter.push(
                      {
                        "name": item,
                        "data":{
                          "fromDate": "2020-03-10T02:52:08.450+03:30",
                          "toDate":"2020-03-10T03:52:08.450+03:30",
                          "sensorIds":[ sensor.id ],
                          "sensorSelectedValue": item,
                          "deviceIds":[ deviceId ]
                        }
                      }
                    )
                  })
                }
              }
            })
          })
        })
      }
      return this.addDashboard(this.insertDashboard).then((response) => {
        let dashboardId = response.body.data
        dashboardData.forEach((item) => {
          item.dashboardId = dashboardId
          item.setting = JSON.stringify(item.setting)
        })
        this.updateDataDashboard({
          teamId: this.workspaceId,
          dashboardId: dashboardId,
          widgets: dashboardData
        }).then((response) => {
          this.$router.push({ name: 'DashboardsItem', params: {id: dashboardId } })
        })
      })
    },
    _addGateway (item) {
      const gatewayUpdate = {
        name: item.name,
        firmwareId: item.firmwareId,
        teamId: this.workspaceId,
        security: this.insertItem.security,
        url: item.url,
      }
      return this.addGateway(gatewayUpdate)
    },
    onSelectFirmware () {
      if (this.firmwareId === '11111111-1111-1111-1111-111111111111') {
        this.$refs.wizard.nextTab()
      } else {
        this.$router.push({
          name: 'NewGateway',
          query: {
            firmwareId: this.firmwareId
          }
        })
      }
    }
  }
}
</script>
