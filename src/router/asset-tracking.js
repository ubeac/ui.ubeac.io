// Containers
import Manage from '@/containers/Manage'
// Views
// import Asset-old from '@/views/manage/asset/Asset-old'
import AssetTrackingManage from '@/views/manage/asset/Manage'
import AssetTrackingReport from '@/views/manage/asset/Report'
// Services
import checkRoles from '@/router/modules/authValidator'
import i18n from '@/i18n'

export default [{
  path: '/asset-tracking',
  name: 'AssetTracking',
  component: Manage,
  beforeEnter: checkRoles,
  meta: {
    roles: ['AUTH', 'USERS']
  },
  children: [
    {
      path: '/asset-tracking/manage',
      name: 'AssetTrackingManage',
      component: AssetTrackingManage,
      meta: {
        label: i18n.t('general.routers.asset_tracking'),
        roles: ['AUTH', 'USERS']
      }
    },
    {
      path: '/asset-tracking/report',
      name: 'AssetTrackingReport',
      component: AssetTrackingReport,
      meta: {
        label: i18n.t('general.routers.asset_tracking_report'),
        roles: ['AUTH', 'USERS']
      }
    }

  ]
}]
