import Config from '../config/config'
export const ApiServerUrl = Config.apiServerUrl
export default {
  // Manufacturer
  GetAllManufacturers: { method: 'GET', url: ApiServerUrl + 'Manufacturer/GetAll' },
  AddManufacturer: { method: 'POST', url: ApiServerUrl + 'Manufacturer/Add' },
  UpdateManufacturer: { method: 'POST', url: ApiServerUrl + 'Manufacturer/Update' },
  RemoveManufacturer: { method: 'DELETE', url: ApiServerUrl + 'Manufacturer/Remove/{id}' },
  // Product
  AddProduct: { method: 'POST', url: ApiServerUrl + 'Product/Add' },
  UpdateProduct: { method: 'POST', url: ApiServerUrl + 'Product/Update' },
  RemoveProduct: { method: 'DELETE', url: ApiServerUrl + 'Product/Remove/{id}' },
  // Firmware
  AddFirmware: { method: 'POST', url: ApiServerUrl + 'Firmware/Add' },
  UpdateFirmware: { method: 'POST', url: ApiServerUrl + 'Firmware/Update' },
  RemoveFirmware: { method: 'DELETE', url: ApiServerUrl + 'Firmware/Remove/{id}' },
  // Team
  GetTeams: { method: 'GET', url: ApiServerUrl + 'Team/GetAll' },
  GetTeamsById: { method: 'GET', url: ApiServerUrl + 'Team/GetById/{id}' },
  AddTeam: { method: 'POST', url: ApiServerUrl + 'Team/Add' },
  DeleteTeam: { method: 'DELETE', url: ApiServerUrl + 'Team/Remove/{id}' },
  UpdateTeam: { method: 'POST', url: ApiServerUrl + 'Team/Update' },
  TeamExists: { method: 'GET', url: ApiServerUrl + 'Team/Exists/{id}' },
  InvokeToken: { method: 'POST', url: ApiServerUrl + 'Team/InvokeToken' },
  RemoveToken: { method: 'POST', url: ApiServerUrl + 'Team/RemoveToken' },
  // Building
  AddBuilding: { method: 'POST', url: ApiServerUrl + 'Building/Add' },
  DeleteBuilding: { method: 'DELETE', url: ApiServerUrl + 'Building/Remove/{id}' },
  UpdateBuilding: { method: 'POST', url: ApiServerUrl + 'Building/Update' },
  // Sensors
  GetSensorsType: { method: 'GET', url: ApiServerUrl + 'sensortypes.json' },
  // Floors
  AddFloor: { method: 'POST', url: ApiServerUrl + 'Floor/Add' },
  DeleteFloor: { method: 'DELETE', url: ApiServerUrl + 'Floor/Remove/{id}' },
  UpdateFloor: { method: 'POST', url: ApiServerUrl + 'Floor/Update' },
  // Gateway
  AddGateway: { method: 'POST', url: ApiServerUrl + 'Gateway/Add' },
  DeleteGateway: { method: 'DELETE', url: ApiServerUrl + 'Gateway/Remove/{id}' },
  UpdateGateway: { method: 'POST', url: ApiServerUrl + 'Gateway/Update' },
  GetGatewayData: { method: 'GET', url: ApiServerUrl + 'Gateway/GetData{?gatewayId*}' },
  GatewayExists: { method: 'GET', url: ApiServerUrl + 'Gateway/Exists/{id}{?teamId*}' },
  // Permission
  AddPermission: { method: 'POST', url: ApiServerUrl + 'Access/Add' },
  DeletePermission: { method: 'DELETE', url: ApiServerUrl + 'Access/Remove/{id}' },
  // Dashboard
  GetDashboards: { method: 'GET', url: ApiServerUrl + 'Dashboard/GetAll' },
  GetDashboardById: { method: 'GET', url: ApiServerUrl + 'Dashboard/GetById/{id}' },
  AddDashboard: { method: 'POST', url: ApiServerUrl + 'Dashboard/Add' },
  DeleteDashboard: { method: 'DELETE', url: ApiServerUrl + 'Dashboard/Remove/{id}' },
  UpdateDashboard: { method: 'POST', url: ApiServerUrl + 'Dashboard/Update' },
  GetDashboardData: { method: 'GET', url: ApiServerUrl + 'Widget/GetByDashboardId/{id}' },
  UpdateDashboardData: { method: 'POST', url: ApiServerUrl + 'Dashboard/UpdateWidgets' },
  // Device
  GetDevices: { method: 'GET', url: ApiServerUrl + 'Device/GetAll{?deviceIds*,assetIds*}' },
  UpdateDevice: { method: 'POST', url: ApiServerUrl + 'Device/Update' },
  AddDevice: { method: 'POST', url: ApiServerUrl + 'Device/Add' },
  DeleteDevice: { method: 'DELETE', url: ApiServerUrl + 'Device/Remove/{id}' },
  // Sensor
  UpdateSensor: { method: 'POST', url: ApiServerUrl + 'Sensor/Update' },
  AddSensor: { method: 'POST', url: ApiServerUrl + 'Sensor/Add' },
  DeleteSensor: { method: 'DELETE', url: ApiServerUrl + 'Sensor/Remove/{id}' },
  GetSensorData: { method: 'GET', url: ApiServerUrl + 'Sensor/GetData{?sensorIds*,gatewayIds*,deviceIds*}' },
  // Admin
  GetLogReport: { method: 'GET', url: ApiServerUrl + 'Admin/Log{?query*}' },
  RunQuery: { method: 'GET', url: ApiServerUrl + 'Admin/Exec{?db*,query*}' },
  ReportList: { method: 'GET', url: ApiServerUrl + 'Admin/Description' }
}
