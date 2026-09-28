import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      /* TODO complete doc
       * Document http://usejsdoc.org/
       */
      /**
       * @type Object
       * @desc Return base data object from Store
       * @version 0.0.1
       * @example {
       *  example: example
       * }
       * @example <pre> {{ baseData }} </pre>
       *
       */
      socketStatus: 'socket/socketStatus',
      workspaceId: 'workspace/teamId',
      workspaceListLoaded: 'workspace/teamsListLoaded',
      workspaceList: 'workspace/teamList',
      baseData: 'basedata/baseData',
      manufacturerById: 'basedata/manufacturerById',
      productsList: 'basedata/getAllProducts',
      productById: 'basedata/productById',
      firmwareById: 'basedata/firmwareById',
      manufacturerByFirmware: 'basedata/getManufacturerByFirmware',
      productByFirmware: 'basedata/getProductByFirmware',
      profile: 'user/profile',
      userInfo: 'user/userInfo',
      dashboardList: 'dashboard/list',
      dashboardById: 'dashboard/byId',
      dashboardEditMode: 'dashboard/byId',
      dashboardIsEditMode: 'dashboard/currentDashboardEditMode',
      dashboardIsPreviewMode: 'dashboard/currentDashboardPreviewMode',
      dashboardIsResetEnabledMode: 'dashboard/currentDashboardResetMode',
      currentDashboardId: 'dashboard/currentDashboardId',
      widgetList: 'widget/list',
      currentLocation: 'map/currentPosition',

      user: 'user/user',
      auth: 'auth/auth',
      userProfile: 'user/profile',
      isAdmin: 'user/isAdmin',

      teamById: 'team/byId',
      teamList: 'team/list',
      teamGatewaysCount: 'team/gatewaysCount',
      teamBuildingsCount: 'team/buildingsCount',
      teamSensorsCount: 'team/sensorsCount',
      teamSensors: 'team/sensors',
      teamDevicesCount: 'team/devicesCount',
      teamSortedByDate: 'team/sortedByDate',

      buildingById: 'building/byId',
      buildingList: 'building/list',
      buildingsGatewaysCount: 'building/gatewaysCount',
      buildingsSensorsCount: 'building/sensorsCount',
      buildingsSensors: 'building/sensors',
      buildingsFloors: 'building/floors',
      buildingsFloorsCount: 'building/floorsCount',
      buildingsDevicesCount: 'building/devicesCount',
      buildingsSorted: 'building/sortedByDate',
      buildingSortedByDate: 'building/sortedByDate',

      floorById: 'floor/byId',
      floorBuilding: 'floor/building',
      floorByBuildingId: 'floor/byBuildingId',
      floorList: 'floor/list',
      floorsGatewaysCount: 'floor/gatewaysCount',
      floorsSensorsCount: 'floor/sensorsCount',
      floorsSensors: 'floor/sensors',
      floorsDevicesCount: 'floor/devicesCount',
      floorsSortedByDate: 'floor/sortedByDate',

      gatewayById: 'gateway/byId',
      gatewayLightList: 'gateway/lightList',
      gatewayList: 'gateway/list',
      gatewayByFloorId: 'gateway/byFloorId',
      gatewaysTeam: 'gateway/team',
      gatewaysBuilding: 'gateway/building',
      gatewaysFloor: 'gateway/floor',
      gatewaysSensors: 'gateway/sensors',
      gatewaysSensorsCount: 'gateway/sensorsCount',
      gatewaysDevicesCount: 'gateway/devicesCount',
      gatewaysSortedByDate: 'gateway/sortedByDate',

      sensorById: 'sensor/byId',
      sensorByDevice: 'sensor/byDeviceId',
      sensorList: 'sensor/list',
      sensorUnitsBySensorType: 'sensor/unitsBySensorType',
      sensorTypesWithTypeKey: 'sensor/typesWithTypeKey',
      sensorTypes: 'sensor/types',
      sensorTypesSingleValue: 'sensor/typesSingleValue',
      sensorPrefixes: 'sensor/prefixes',
      sensorUnits: 'sensor/units',
      sensorSortedByDate: 'sensor/sortedByDate',
      sensorData: 'sensordata/sensorData',
      sensorTypesWidthTypeKey: 'sensor/typesWithTypeKey',
      unitBySensorId: 'sensor/unitBySensorId',
      sensorByType: 'sensor/byType',

      deviceById: 'device/byId',
      deviceOriginalById: 'device/originalById',
      deviceList: 'device/list',
      deviceSortedByDate: 'device/sortedByDate',
      deviceByUid: 'device/byUid',
      deviceSensors: 'device/sensors',
      deviceByFloorId: 'device/byFloorId',
      deviceBySensorId: 'device/bySensorId',
      // reportList: 'adminReport/dict',

      utm: 'gtag/utm'
    })
  },
  methods: {
    formSetting () {
      this.readonly = !this.readonly
      if (!this.readonly) {
        this.$refs.autofocus.focus()
      }
    },
    ...mapActions({

      fetchCurrentPosition: 'map/getCurrentPosition',
      fetchUserInfo: 'user/fetchUserInfo',
      fetchBaseData: 'basedata/getBaseData',
      fetchUserAssets: 'userassets/getUserAssets',
      fetchSensorTypes: 'sensor/getSensorsTypes',
      startSocketConnection: 'socket/startGlobalSocketConnection',

      getProfile: 'user/getProfile',
      fetchAssets: 'userassets/getUserAssets',

      setWorkspaceTeamId: 'workspace/setTeamId',

      fetchWorkspaceTeams: 'workspace/getAll',

      fetchTeams: 'team/getAll',
      addTeam: 'team/add',
      updateTeam: 'team/update',
      deleteTeam: 'team/delete',
      fetchNamespaceExists: 'team/checkNamespaceExists',
      invokeToken: 'team/invokeToken',
      removeToken: 'team/removeToken',

      addBuilding: 'building/add',
      updateBuilding: 'building/update',
      deleteBuilding: 'building/delete',

      addFloor: 'floor/add',
      updateFloor: 'floor/update',
      deleteFloor: 'floor/delete',

      addGateway: 'gateway/add',
      updateGateway: 'gateway/update',
      deleteGateway: 'gateway/delete',
      fetchGatewayUrlExists: 'gateway/checkUrlExists',

      clearGatewayData: 'gatewaydata/clearGatewayData',

      addDevice: 'device/add',
      updateDevice: 'device/update',
      deleteDevice: 'device/delete',

      addPermission: 'permission/add',
      deletePermission: 'permission/delete',

      addSensor: 'sensor/addSensor',
      deleteSensor: 'sensor/removeSensor',
      updateSensor: 'sensor/updateSensor',
      fetchSensorData: 'sensordata/getSensorData',
      clearSensorData: 'sensordata/clear',

      addDashboard: 'dashboard/add',
      deleteDashboard: 'dashboard/delete',
      updateDashboard: 'dashboard/update',
      updateDataDashboard: 'dashboard/updateData',
      updateDashboardTrigger: 'dashboard/updateTrigger',
      updateDashboardEditMode: 'dashboard/setCurrentDashboardEditMode',
      updateDashboardResetMode: 'dashboard/setCurrentDashboardResetMode',
      updateDashboardPauseMode: 'dashboard/setCurrentDashboardPaused',
      updateDashboardSaveLoadingMode: 'dashboard/setCurrentDashboardSaveLoading',
      updateDashboardDetails: 'dashboard/updateDashboardDetails',
      fetchWidgetList: 'widget/getAll',
      setWidgetList: 'widget/setCurrentWidgetList',

      addWidget: '',
      updateWidget: '',
      deleteWidget: 'widget/delete',

      fetchProfile: 'user/getUserProfile',
      resendVerificationEmail: 'auth/resendVerificationEmail',
      fetchGatewayData: 'gatewaydata/getGatewayData',

      updateChangelog: 'changelog/change',

      sendGtagEvent: 'gtag/sendGtagEvent',
      sendGtagCustomEvent: 'gtag/sendGtagCustomEvent',
      gtagSet: 'gtag/gtagSet',
      gtagConfig: 'gtag/gtagConfig'
    })
  }
}
