import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from '@/config/config'
import { Validator } from 'vee-validate'
/* eslint-disable */
Vue.use(VueI18n)
const messages = {
  en: i18n_en
}
// https://github.com/kazupon/vue-i18n
const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale') ? window.localStorage.getItem('locale') : config.locale,
  messages
})
const dict = i18n_en.validation
Validator.localize('en', dict)
/* eslint-enable */
export default i18n
