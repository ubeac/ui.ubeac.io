// Containers
import Manage from '@/containers/Manage'

// Views
import Manufacturer from '@/views/manage/admin/manufacturer/Manufacturer'
import ManufacturerAdd from '@/views/manage/admin/manufacturer/ManufacturerAdd'
import ManufacturerUpdate from '@/views/manage/admin/manufacturer/ManufacturerUpdate'

import Product from '@/views/manage/admin/product/Product'
import ProductAdd from '@/views/manage/admin/product/ProductAdd'
import ProductUpdate from '@/views/manage/admin/product/ProductUpdate'

import Firmware from '@/views/manage/admin/firmware/Firmware'
import FirmwareAdd from '@/views/manage/admin/firmware/FirmwareAdd'
import FirmwareUpdate from '@/views/manage/admin/firmware/FirmwareUpdate'

import AdminExec from '@/views/manage/admin/stats/AdminExec'

// Services
import checkRoles from '@/router/modules/authValidator'
import i18n from '@/i18n'

export default [{
  path: '/admin',
  name: 'AdminManage',
  component: Manage,
  beforeEnter: checkRoles,
  meta: {
    roles: ['AUTH', 'ADMINS']
  },
  children: [
    {
      path: '/manufacturer',
      name: 'Manufacturer',
      component: Manufacturer,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.manufacturer')
      }
    },
    {
      path: '/manufacturer/new',
      name: 'NewManufacturer',
      component: ManufacturerAdd,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.manufacturer')
      }
    },
    {
      path: '/manufacturer/:id',
      name: 'UpdateManufacturer',
      component: ManufacturerUpdate,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.manufacturer')
      }
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.product')
      }
    },
    {
      path: '/product/new',
      name: 'NewProduct',
      component: ProductAdd,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.product')
      }
    },
    {
      path: '/product/:id',
      name: 'UpdateProduct',
      component: ProductUpdate,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.product')
      }
    },
    {
      path: '/firmware',
      name: 'Firmware',
      component: Firmware,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.firmware')
      }
    },
    {
      path: '/firmware/new',
      name: 'NewFirmware',
      component: FirmwareAdd,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.firmware')
      }
    },
    {
      path: '/firmware/:id',
      name: 'UpdateFirmware',
      component: FirmwareUpdate,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.firmware')
      }
    },
    {
      path: '/AdminExec',
      name: 'AdminExec',
      component: AdminExec,
      meta: {
        roles: ['ADMINS'],
        label: i18n.t('general.routers.logReport')
      }
    }
  ]
}]
