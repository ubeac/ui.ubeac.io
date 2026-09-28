import { IdentityServerConfig } from './identityserverapi'
import Server from './server'
import LocalStorage from './localstorage'

export default {
  getToken () {
    return LocalStorage.getToken()
  },
  async login (credentials) {
    // ensure to remove previous token
    LocalStorage.removeToken()

    // creating the posted data structure based on
    // IdentityServer gateway requirements
    var formData = new FormData()
    formData.append('username', credentials.email)
    formData.append('password', credentials.password)
    formData.append('grant_type', IdentityServerConfig.response_type)
    formData.append('scope', IdentityServerConfig.scope)

    var response = await Server.Login(formData)
    // setting user's access token in local storage
    LocalStorage.setToken(response.body)
    return response.body
  },
  async register (data) {
    // getting current user's time zone information
    data.timeZoneOffset = new Date().getTimezoneOffset()
    data.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    var response = await Server.Register(data)
    return response.body
  },
  async logout (context) {
    await LocalStorage.removeToken()
  }
}
