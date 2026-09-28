// Containers
import Manage from '@/containers/Manage'

// Views
import Dashboard from '@/views/dashboards/Dashboard'
import DashboardItem from '@/components/widgets/DashboardItem'
import DashboardAdd from '@/views/dashboards/DashboardAdd'
import UpdateDashboard from '@/views/dashboards/DashboardUpdate'
// Services
import checkRoles from '@/router/modules/authValidator'

export default [
  {
    path: '/full_dashboard',
    redirect: '/dashboard',
    component: Manage,
    beforeEnter: checkRoles,
    meta: {
      roles: ['AUTH', 'USERS']
    },
    children: [
      {
        path: '/dashboards',
        name: 'Dashboards',
        component: Dashboard,
        meta: { roles: ['AUTH', 'USERS'] }
      },
      {
        path: '/dashboards/new',
        name: 'NewDashboard',
        component: DashboardAdd,
        meta: {
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/dashboards/edit/:id',
        name: 'UpdateDashboard',
        component: UpdateDashboard,
        meta: {
          roles: ['AUTH', 'USERS']
        }
      },
      {
        path: '/dashboards/:id',
        name: 'DashboardsItem',
        component: DashboardItem,
        meta: { roles: ['AUTH', 'USERS'] }
      }
    ]
  }
]
