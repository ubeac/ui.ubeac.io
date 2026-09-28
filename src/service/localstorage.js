import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
var set = (key, object) => {
  Vue.localStorage.set(key, JSON.stringify(object))
}

var get = (key) => {
  var objectValue = Vue.localStorage.get(key)
  if (objectValue) {
    return JSON.parse(objectValue)
  }
  return null
}

var remove = (key) => {
  Vue.localStorage.remove(key)
  return true
}

export default {
  setToken: (userToken) => set('user_token', userToken),
  getToken: () => get('user_token'),
  removeToken: () => remove('user_token')
}
