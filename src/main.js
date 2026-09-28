import Vue from 'vue'
import store from './store'
import Config from './config/config'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import TreeView from 'vue-json-tree-view'

import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import stockInit from 'highcharts/modules/stock'
import loadSolidGauge from 'highcharts/modules/solid-gauge'
import loadHighchartsMore from 'highcharts/highcharts-more'
// import VueHighcharts from 'vue-highcharts'

import Notifications from 'vue-notification'
import VueMoment from 'vue-moment'
import fullscreen from 'vue-fullscreen'
import VueNumerals from 'vue-numerals'
import VeeValidate from 'vee-validate'
import NProgress from 'vue-nprogress'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import * as VueGoogleMaps from 'vue2-google-maps'
import Auth from './mixin/global'
import VueLodash from 'vue-lodash'
import ToggleButton from 'vue-js-toggle-button'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
/* eslint-disable no-unused-vars */
import filters from '@/filters'
import Directives from './directives'
import i18n from './i18n'
import Cycle from './helpers/cycle'
/* eslint-enable no-unused-vars */
import Vuep from '@/components/vuep'
/* eslint-disable spellcheck/spell-checker */
import VueGtag from 'vue-gtag'
// import VueTour from 'vue-tour'

/* eslint-disable spellcheck/spell-checker */
Vue.use(VueGtag, {
  config: { id: Config.gaCode,
    params: {
      send_page_view: false
    }
  },
  pageTrackerTemplate (to) {
    return {
      page_title: 'app.ubeac.io - ' + to.name,
      page_path: to.path
    }
  }
}, router)
// Vue.use(VueTour)
Vue.use(VueFormWizard)
Vue.use(Vuep)
loadHighchartsMore(Highcharts)
stockInit(Highcharts)
loadSolidGauge(Highcharts)
Vue.use(HighchartsVue, { tagName: 'charts' })
// Vue.use(VueHighcharts, { Highcharts })

Vue.use(ToggleButton)
Vue.use(VueLodash, Config.lodash)
Vue.use(VueNumerals, {
  locale: 'en'
})
Vue.use(fullscreen)
Vue.mixin(Auth)
Vue.use(VueGoogleMaps, {
  load: {
    /* eslint-disable spellcheck/spell-checker */
    key: Config.googleMapKey,
    /* eslint-enable spellcheck/spell-checker */
    libraries: 'places'
  }
})
Vue.component(VueQrcode.name, VueQrcode)
Vue.use(NProgress, Config.nProgress)
const nprogress = new NProgress()

Vue.use(VeeValidate, Config.veeValidation)
Vue.use(VueMoment)
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(TreeView)
Vue.prototype.$config = Config
Vue.prototype.$hotjarCode = ''
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  nprogress,
  components: {
    App
  },
  template: '<App/>'
})
