import Config from '@/config/config'
import Vue from 'vue'
import Moment from 'moment'

Vue.filter('truncate', function (text, length, clamp) {
  clamp = clamp || '...'
  var node = document.createElement('div')
  node.innerHTML = text
  var content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
})
Vue.filter('localDate', function (value, format) {
  return new Moment(value).format(Config.dateFormat.global)
})
Vue.filter('date', function (value) {
  return new Moment(value).format('YYYY/MM/DD HH:mm:ss.SSS')
})
Vue.filter('dateMedium', function (value) {
  return new Moment(value).format('MMM DD H:m:ss')
})
Vue.filter('dateShort', function (value) {
  return new Moment(value).format('HH:mm:ss.SSS')
})
Vue.filter('dateDay', function (value) {
  return new Moment(value).format('dddd, MMMM Do YYYY')
})
Vue.filter('lowercase', function (value) {
  return value.toLowerCase()
})
Vue.filter('int', function (value) {
  return parseInt(value)
})
Vue.filter('slice', function (value, count) {
  if (value) {
    return value.slice(0, count)
  } else {
    return ''
  }
})
Vue.filter('precision', function (value, precision) {
  if (precision) {
    let p = Math.pow(10, parseInt(precision))
    return Math.floor(value * p) / p
  } else {
    return value
  }
})
// TODO: replace with regex
Vue.filter('separated', function (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d)[.]?)/g, ',')
})
