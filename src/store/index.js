import Vue from 'vue'
import Vuex from 'vuex'

/* ----------  Modules  ---------- */
import auth from './modules/auth'
import socket from './modules/socket'
import user from './modules/user'
import device from './modules/device'
import basedata from './modules/basedata'
import team from './modules/team'
import building from './modules/building'
import floor from './modules/floor'
import gateway from './modules/gateway'
import permission from './modules/permission'
import gatewaydata from './modules/gatewaydata'
import userassets from './modules/userassets'
import notification from './modules/notification'
import sensor from './modules/sensor'
import sensordata from './modules/sensordata'
import map from './modules/map'
import layout from './modules/layout'
import dashboard from './modules/dashboard'
import widget from './modules/widget'
import manufacturer from './modules/manufacturer'
import product from './modules/product'
import firmware from './modules/firmware'
import adminReport from './modules/adminReport'
import changelog from './modules/changelog'
import workspace from './modules/workspace'
import gtag from './modules/gtag'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    workspace,
    changelog,
    socket,
    layout,
    device,
    map,
    sensor,
    sensordata,
    notification,
    auth,
    user,
    basedata,
    team,
    building,
    floor,
    gateway,
    permission,
    gatewaydata,
    userassets,
    dashboard,
    widget,
    manufacturer,
    product,
    firmware,
    adminReport,
    gtag
  }
})

export default store
