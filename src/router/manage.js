// Containers
import Manage from '@/containers/Manage'
import WorkspaceManager from '@/containers/WorkspaceManager'

// Views
import TeamDetails from '@/views/manage/team/TeamDetails'
import TeamAdd from '@/views/manage/team/TeamAdd'
import TeamUpdate from '@/views/manage/team/TeamUpdate'

import Building from '@/views/manage/building/Building'
import BuildingDetails from '@/views/manage/building/BuildingDetails'
import BuildingAdd from '@/views/manage/building/BuildingAdd'
import BuildingUpdate from '@/views/manage/building/BuildingUpdate'

import Floor from '@/views/manage/floor/Floor'
import FloorAdd from '@/views/manage/floor/FloorAdd'
import FloorUpdate from '@/views/manage/floor/FloorUpdate'
import FloorDetails from '@/views/manage/floor/FloorDetails'

import Gateway from '@/views/manage/gateway/Gateway'
import GatewayAdd from '@/views/manage/gateway/GatewayAdd'
import GatewayUpdate from '@/views/manage/gateway/GatewayUpdate'
import GatewayDetails from '@/views/manage/gateway/GatewayDetails'

import Device from '@/views/manage/device/Device'
import DeviceAdd from '@/views/manage/device/DeviceAdd'
import DeviceUpdate from '@/views/manage/device/DeviceUpdate'
import DeviceDetails from '@/views/manage/device/DeviceDetails'
import DeviceLive from '@/views/manage/device/Live'

import SensorData from '@/views/manage/SensorData'
import SensorDataChart from '@/views/manage/SensorDataChart'
import GatewayDataReport from '@/views/report/GatewayData'

import Profile from '@/views/manage/Profile'

import Card from '@/views/manage/card/Card'

// Services
import checkRoles from '@/router/modules/authValidator'
import i18n from '@/i18n'

export default [
  {
    path: '/workspace-manager',
    component: WorkspaceManager,
    beforeEnter: checkRoles,
    meta: {
      roles: ['AUTH', 'USERS']
    },
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
          label: i18n.t('general.routers.profile'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/team/new',
        name: 'NewTeam',
        component: TeamAdd,
        meta: {
          label: i18n.t('general.routers.teams'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/team',
        redirect: '/',
        name: 'Teams'
      }
    ]
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    beforeEnter: checkRoles,
    meta: {
      roles: ['AUTH', 'USERS']
    },
    children: [
      {
        path: '/team/:id',
        name: 'UpdateTeam',
        component: TeamUpdate,
        meta: {
          label: i18n.t('general.routers.teams'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/card',
        name: 'Card',
        component: Card,
        meta: {
          label: i18n.t('general.routers.widget'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/team/details/:id',
        name: 'DetailsTeam',
        component: TeamDetails,
        meta: {
          label: i18n.t('general.routers.teams'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building',
        name: 'Buildings',
        component: Building,
        meta: {
          label: i18n.t('general.routers.buildings'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/details/:id',
        name: 'DetailsBuildings',
        component: BuildingDetails,
        meta: {
          label: i18n.t('general.routers.buildings'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/new',
        name: 'NewBuilding',
        component: BuildingAdd,
        meta: {
          label: i18n.t('general.routers.buildings'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/:id',
        name: 'UpdateBuilding',
        component: BuildingUpdate,
        meta: {
          label: i18n.t('general.routers.buildings'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/floor/list',
        name: 'Floors',
        component: Floor,
        meta: {
          label: i18n.t('general.routers.floors'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/floor/new',
        name: 'NewFloor',
        component: FloorAdd,
        meta: {
          label: i18n.t('general.routers.floors'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/floor/:id',
        name: 'UpdateFloor',
        component: FloorUpdate,
        meta: {
          label: i18n.t('general.routers.floors'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/building/floor/details/:id',
        name: 'DetailsFloor',
        component: FloorDetails,
        meta: {
          label: i18n.t('general.routers.floors'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/gateway',
        name: 'Gateways',
        component: Gateway,
        meta: {
          label: i18n.t('general.routers.gateways'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/gateway/new',
        name: 'NewGateway',
        component: GatewayAdd,
        meta: {
          label: i18n.t('general.routers.gateways'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/gateway/:id',
        name: 'UpdateGateway',
        component: GatewayUpdate,
        meta: {
          label: i18n.t('general.routers.gateways'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/gateway/details/:id',
        name: 'GatewayDetails',
        component: GatewayDetails,
        meta: {
          label: i18n.t('general.routers.gateways'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/devices',
        name: 'Devices',
        component: Device,
        meta: {
          label: i18n.t('general.routers.devices'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/devices/new',
        name: 'NewDevice',
        component: DeviceAdd,
        meta: {
          label: i18n.t('general.routers.devices'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/devices/:id',
        name: 'UpdateDevice',
        component: DeviceUpdate,
        meta: {
          label: i18n.t('general.routers.devices'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/devices/details/:id',
        name: 'DetailsDevice',
        component: DeviceDetails,
        meta: {
          label: i18n.t('general.routers.devices'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/reports',
        name: 'Reports',
        component: SensorData,
        meta: {
          label: i18n.t('general.nav.reports'),
          roles: ['AUTH', 'USERS']
        },
        children: [
          {
            path: '/sensordata',
            name: 'SensorData',
            component: SensorData,
            meta: {
              label: i18n.t('general.routers.sensor_data'),
              roles: ['AUTH', 'USERS']
            }
          }
        ]
      },
      {
        path: '/sensorchart',
        name: 'SensorDataChart',
        component: SensorDataChart,
        meta: {
          label: i18n.t('general.nav.reports'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/gatewaydata',
        name: 'GatewayData',
        component: GatewayDataReport,
        meta: {
          label: i18n.t('general.nav.reports'),
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/device/live-devices',
        name: 'LiveDevices',
        component: DeviceLive,
        meta: {
          label: i18n.t('general.routers.live_devices'),
          roles: ['AUTH', 'USERS']
        }
      }
    ]
  }]
