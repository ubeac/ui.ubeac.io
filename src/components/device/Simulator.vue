<template>
  <ComponentContainer class="component-simulator">
  <b-form
    inline
    class="needs-validation"
    autocomplete="nope"
    novalidate>
    <div 
    :style="{'width': loadingBarWidth}"
    class="component-simulator--loading-bar" />
      <div class="w-100 float-left pb-2">
        <span class="h4 text-primary">
          {{ $t('device.data_simulator') }}
        </span>
      </div>
      <b-form-group class="w-100 mb-3">
        <b-form-select 
          v-validate.disable="'required'"
          :state="errors.has('method') ? 'invalid' : null"
          name="method"
          :disabled="!pauseRender"
          v-model="selectedMethod">
          <option :value="null">Please select method</option>
          <option value="static">Static</option>
          <option value="steps">Steps</option>
          <option value="random">Random</option>
        </b-form-select>
        <b-form-invalid-feedback v-if="errors.has('method')">
          <span
            v-for="(error, index) in errors.collect('method')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="w-100 mb-3">
        <b-form-select 
                    v-validate.disable="'required'"
                    :state="errors.has('gateway') ? 'invalid' : null"
                    name="gateway"
                    :disabled="!pauseRender"
                    v-model="selectedGateway" >
                    <option :value="null">Please select Gateway</option>
                    <option 
                    v-for="gateway in gatewayList"
                    :value="gateway.url">
                    {{ gateway.name }}
                    </option>
        </b-form-select>
        <b-form-invalid-feedback v-if="errors.has('gateway')">
          <span
            v-for="(error, index) in errors.collect('gateway')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="w-100 mb-3">
        <b-form-select 
                    v-validate.disable="'required'"
                    :state="errors.has('sensor') ? 'invalid' : null"
                    name="sensor"
                    :disabled="!pauseRender"
                    v-model="selectedSensor" >
                    <option :value="null">Please select an Sensor</option>
                    <option 
                    v-for="sensor in sensorTypesSingleValue"
                    :value="sensor.type">
                    {{ sensor.name }}
                    </option>
        </b-form-select>
        <b-form-invalid-feedback v-if="errors.has('sensor')">
          <span
            v-for="(error, index) in errors.collect('sensor')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group 
            :class="{'novalidate': errors.has('intervaldelay')}"
            class="w-100">
        <b-input-group prepend="Interval">
          <b-input-group-text
            slot="append"
            style="width: 5em"
            v-b-tooltip.hover
            :title="$t('device.second')">
            {{ $t('device.second') }}
          </b-input-group-text>
          <b-form-input 
            v-validate.disable="'required'"
            :state="errors.has('intervaldelay') ? 'invalid' : null"
            name="intervaldelay"
            type="number"
            :disabled="!pauseRender"
            class="input-group-interval"
            v-model="interval">
          </b-form-input>
        </b-input-group>
        <b-form-invalid-feedback v-if="errors.has('intervaldelay')">
          <span
            v-for="(error, index) in errors.collect('intervaldelay')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group 
            v-if="selectedMethod === 'static'"
            :class="{'novalidate': errors.has('staticValue')}"
            class="w-100">
        <b-input-group 
            v-if="selectedMethod === 'static'"
            prepend="Value">
          <b-form-input 
            v-validate.disable="'required'"
            :state="errors.has('staticValue') ? 'invalid' : null"
            name="staticValue"
            :disabled="!pauseRender"
            v-model="staticValue">
          </b-form-input>
        </b-input-group>
        <b-form-invalid-feedback v-if="errors.has('staticValue')">
          <span
            v-for="(error, index) in errors.collect('staticValue')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group 
            v-if="selectedMethod === 'steps'"
            :class="{'novalidate': errors.has('steps')}"
            class="w-100">
        <b-input-group 
            v-if="selectedMethod === 'steps'"
            prepend="Steps">
          <b-form-input 
            v-validate.disable="'required'"
            :state="errors.has('steps') ? 'invalid' : null"
            name="steps"
            :disabled="!pauseRender"
            v-model="steps">
          </b-form-input>
        </b-input-group>
        <b-form-invalid-feedback v-if="errors.has('steps')">
          <span
            v-for="(error, index) in errors.collect('steps')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group 
            v-if="selectedMethod === 'random' | selectedMethod === 'steps'"
            :class="{'novalidate': errors.has('minRange')}"
            class="w-100">
        <b-input-group 
            prepend="Min Range">
          <b-form-input 
            v-validate.disable="'required'"
            :state="errors.has('minRange') ? 'invalid' : null"
            name="minRange"
            :disabled="!pauseRender"
            v-model="minRange">
          </b-form-input>
        </b-input-group>
        <b-form-invalid-feedback v-if="errors.has('minRange')">
          <span
            v-for="(error, index) in errors.collect('minRange')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group 
            v-if="selectedMethod === 'random' | selectedMethod === 'steps'"
            :class="{'novalidate': errors.has('maxRange')}"
            class="w-100">
        <b-input-group 
            prepend="Max Range">
          <b-form-input 
            v-validate.disable="'required'"
            :state="errors.has('maxRange') ? 'invalid' : null"
            name="maxRange"
            :disabled="!pauseRender"
            v-model="maxRange">
          </b-form-input>
        </b-input-group>
        <b-form-invalid-feedback v-if="errors.has('maxRange')">
          <span
            v-for="(error, index) in errors.collect('maxRange')"
            :key="index">
            {{ error }}
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="form-row form-button-row p-3">
        <b-button
          v-b-tooltip.hover
          :title="$t('buttons.clear_list')"
          class="btn-iconic btn-fab-no-bg float-right mr-0"
          @click="removeData">
          <!--contentCopyIcon-->
          <icon name="delete"/>
        </b-button>
        <!--Play/Pause-->
        <b-button
          v-b-tooltip
          v-if="!pauseRender"
          variant="danger"
          :title="$t('buttons.pause')"
          class="float-left mr-0"
          @click="stop">
          <icon 
          class="mr-1"
          name="pause"/>
          {{ $t('stop') }} 
        </b-button>
        <b-button
          v-b-tooltip
          v-if="pauseRender"
          variant="primary"
          :title="$t('buttons.play')"
          class="float-left mr-0"
          @click="start">
          <icon 
          class="mr-1"
          name="play"/>
          {{ $t('start') }} 
        </b-button>
      </div>
      <div 
          v-if="sentRequests.length > 0"
          class="w-100 float-left requests-log">
        <span class="w-100 text-primary h6 pb-2">
          {{ $t('general.requests') }}
        </span>
        <b-list-group class="mt-1">
          <b-list-group-item 
                      class="text-sm"
                      v-for="item in sentRequests">
            Data: 
            {{ item.data }} 
            <!--<HttpMethod -->
            <!--class="float-right"  -->
            <!--method="post" />-->
          </b-list-group-item>
        </b-list-group>
      </div>
  </b-form>
  </ComponentContainer>
</template>

<script>
import Vue from 'vue'
import validation from '@/decorators/validation'
import EntitiesMixin from '@/mixin/entities'
import HttpMethod from '@/components/HttpMethod'
import Moment from 'moment'
export default {
  name: 'DataSimulator',
  components: {HttpMethod},
  mixins: [ EntitiesMixin ],
  props: {
    deviceId: {
      type: [Boolean, Object, String],
      default: null,
      required: true
    }
  },
  data () {
    return {
      sentRequests: [],
      timer: null,
      selectedGateway: null,
      selectedMethod: 'random',
      selectedSensor: 4,
      interval: 5,
      staticValue: null,
      minRange: 0,
      maxRange: 1000,
      steps: 10,
      strepsCounter: 0,
      loadingBarWidth: 0,
      pauseRender: true
    }
  },
  computed: {
    uid () {
      let out = null
      if (this.deviceId) {
        out = this.deviceById(this.deviceId).uid
      }
      return out
    }
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    removeData () {
      this.sentRequests = []
    },
    clearTimer () {
      this.strepsCounter = 0
      this.pauseRender =true 
      clearInterval(this.timer)
      clearInterval(this.loadingBarInterval)
    },
    @validation
    start () {
      const self = this
      this.clearTimer()
      this.pauseRender = false
      this.doInterval()
      this.timer = setInterval(() => {
        this.doInterval()
      }, this.interval * 1000)
    },
    doInterval () {
      const self = this
      self.loadingBarWidth = '0%'
      this.sendRequest()
      clearInterval(this.loadingBarInterval)
      let i = 1
      this.loadingBarInterval = setInterval(() => {
        let out = ((i * 1000) * 96) / ((this.interval -1) * 1000)
        if (out > 96) {
          out = 96
        }
        self.loadingBarWidth = out + '%'
        i++;
      }, 1000)
    },
    getValue () {
      let out
      if (this.selectedMethod === 'static') {
        out = this.staticValue
      } else if (this.selectedMethod === 'random') {
        out = this.getRandomInt(parseInt(this.minRange), parseInt(this.maxRange))
      } else if (this.selectedMethod === 'steps') {
        out = this.minRange +  (this.steps * this.strepsCounter)
        if (out > this.maxRange) {
          this.strepsCounter = 0
        } else {
          this.strepsCounter += 1
        }
      }
      return out
    },
    getRandomInt (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sendRequest () {
      const self = this
      let value = this.getValue();
      let requestPayload = {
        "mac": self.uid,  
        "type": self.selectedSensor,  
        "dateTime": new Moment().toISOString(true),
        "data": value
      }
      let gatewayUrl = `${self.gatewayUrl()}?firmwareId=${self.Config.deviceSimulatorDefaultFirmware}`
      log(gatewayUrl)
      $.ajax({
        method: 'POST',
        url: gatewayUrl,
        processData: false,
        async: true,
        complete: () => {
          self.sentRequests.push(requestPayload)
          if (self.sentRequests.length > 10) {
            self.sentRequests.shift()
          }
        },
        data: JSON.stringify(requestPayload)
      })
    },
    gatewayUrl () {
      return `${this.Config.gatewayUrlProtocol}${this.teamList[0].namespace}.${this.Config.gatewayUrlFirstPart}${this.selectedGateway}`
    },
    stop () {
      this.strepsCounter = 0
      this.clearTimer()
    }
  }
}
</script>
