import Vue from 'vue'
import VueResource from 'vue-resource'
import Api from './api'
import IdentityServerApi from './identityserverapi'
import Auth from '@/service/auth'
import store from '@/store'
import router from '@/router'
import LocalStorage from './localstorage'

Vue.use(VueResource)

const allApi = {
  ...Api,
  ...IdentityServerApi
}

Vue.http.interceptors.push((request, next) => {
  const token = Auth.getToken()
  if (token && !request.headers.Authorization) {
    request.headers.set('X-CSRF-TOKEN', 'TOKEN')
    request.headers.set('Authorization', `Bearer ${token.access_token}`)
    request.headers.set('Accept', 'application/json')
  }
  next()
})

Vue.http.interceptors.push((request, next) => {
  next(function (response) {
    if (response.ok === false) {
      let errorMessage = ''
      if (response.statusText) {
        errorMessage = response.statusText
      }
      if (response.body && response.body.error_description) {
        errorMessage = response.body.error_description
      }
      if (response.body.errors && response.body.errors[0] && response.body.errors.length > 0) {
        response.body.errors.forEach((errorItem) => {
          errorMessage += ` ${errorItem.message}`
        })
      }
      if (response.status === 400) {
        if (request.url.indexOf('/register') < 0) {
          store.commit('notification/error', {
            message: errorMessage,
            action: response.status
          })
        }
      } else if (response.status === 401) {
        if (router.currentRoute.path !== '/login') {
          LocalStorage.removeToken()
          router.push({ path: '/login', query: { redirect: router.currentRoute.path } })
        }
      } else {
        console.log('request')
        console.log(request)
        store.commit('notification/error', {
          message: errorMessage,
          action: response.status
        })
      }
    }
  })
})

const Server = Vue.resource('sample{/id}', {}, allApi)
export default Server
