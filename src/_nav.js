import i18n from './i18n'
export default {
  items: [
    {
      name: i18n.t('general.nav.intro'),
      routeName: 'Intro',
      url: '/intro',
      tour: 'intro',
      icon: 'wizard'
    },
    {
      name: i18n.t('general.nav.dashboards'),
      routeName: 'Dashboards',
      url: '/dashboards',
      icon: 'dashboard',
      tour: 'dashboard',
      lazy: true,
      lazyList: 'dashboard/list'
    },
    {
      name: i18n.t('general.nav.buildings'),
      routeName: 'Buildings',
      tour: 'building',
      url: '/building',
      icon: 'building'
    },
    {
      name: i18n.t('general.nav.gateways'),
      routeName: 'Gateways',
      tour: 'gateway',
      url: '/gateway',
      icon: 'gateway'
    },
    {
      name: i18n.t('general.nav.devices'),
      routeName: 'Devices',
      tour: 'device',
      url: '/devices',
      icon: 'device'
    },
    {
      name: i18n.t('general.nav.reports'),
      routeName: 'Reports',
      url: '/reports',
      icon: 'reports',
      children: [
        {
          name: i18n.t('general.nav.sensor_data'),
          routeName: 'SensorData',
          url: '/sensordata',
          icon: 'report'
        },
        {
          name: i18n.t('general.nav.sensor_data_chart'),
          routeName: 'SensorDataChart',
          url: '/sensorchart',
          icon: 'report'
        },
        {
          name: i18n.t('general.nav.gateway_data'),
          routeName: 'GatewayData',
          url: '/gatewaydata',
          icon: 'gateway'
        }
      ]
    },
    {
      name: i18n.t('general.nav.admin'),
      routeName: 'AdminManage',
      url: '/admin',
      icon: 'admin',
      children: [
        {
          name: i18n.t('general.nav.manufacturers'),
          routeName: 'Manufacturer',
          url: '/manufacturer',
          icon: 'manufacturer'
        },
        {
          name: i18n.t('general.nav.products'),
          routeName: 'Product',
          url: '/product',
          icon: 'product'
        },
        {
          name: i18n.t('general.nav.firmwares'),
          routeName: 'Firmware',
          url: '/firmware',
          icon: 'firmware'
        },
        {
          name: i18n.t('general.nav.adminExec'),
          routeName: 'AdminExec',
          url: '/adminExec',
          icon: 'execute'
        }
      ]
    },
    {
      name: i18n.t('general.nav.kitchensink'),
      routeName: 'Kitchen',
      url: '/kitchen',
      icon: 'kitchensink',
      children: [
        {
          name: i18n.t('general.nav.kitchensink'),
          routeName: 'KitchenIndexPage',
          url: '/kitchen/home',
          icon: 'floor'
        },
        {
          name: i18n.t('general.nav.socket'),
          routeName: 'kitchenSocketTest',
          url: '/kitchen/socket-test',
          icon: 'Socket'
        }
      ]
    },
    {
      name: i18n.t('general.profile'),
      routeName: 'Profile',
      url: '/profile',
      view: 'general',
      icon: 'profile'
    },
    {
      name: i18n.t('auth.logout'),
      routeName: 'Logout',
      url: '/logout',
      view: 'general',
      icon: 'logout'
    },
    {
      name: i18n.t('general.nav.teams'),
      routeName: 'Teams',
      url: '/team',
      tour: 'team',
      view: 'general',
      icon: 'team'
    },
    {
      name: i18n.t('general.docs'),
      routeName: 'Devices',
      tour: 'docs',
      view: 'general',
      url: 'https://www.ubeac.io/docs',
      icon: 'docs'
    }
  ]
}
