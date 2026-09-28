import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import i18n from '@/i18n'
// Views
import Manage from '@/containers/Manage'
import Intro from '@/views/dashboards/Intro'
import KitchenSink from '@/router/kitchen'
import AuthRoutes from '@/router/auth'
import DashboardRoutes from '@/router/dashboard'
import ManageRoutes from '@/router/manage'
import AdminRoutes from '@/router/admin'
import Team from '@/views/manage/team/Team'
import WorkspaceManager from '@/containers/WorkspaceManager'
import checkRoles from '@/router/modules/authValidator'
Vue.use(Router)

const router = new Router({
  linkActiveClass: 'open',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...AuthRoutes,
    ...DashboardRoutes,
    ...ManageRoutes,
    ...KitchenSink,
    ...AdminRoutes,
    {
      path: '/',
      component: WorkspaceManager,
      beforeEnter: checkRoles,
      meta: {
        roles: ['AUTH', 'USERS']
      },
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: Team,
          meta: {
            label: i18n.t('general.routers.teams'),
            roles: ['AUTH', 'USERS']
          }
        }
      ]
    },
    {
      path: '/manage',
      component: Manage,
      beforeEnter: checkRoles,
      meta: {
        roles: ['AUTH', 'USERS']
      },
      children: [
        {
          path: '/intro',
          component: Intro,
          name: 'Intro',
          meta: {
            roles: ['AUTH', 'USERS']
          }
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (store.state.dashboard.currentDashboardEditMode && !store.state.dashboard.currentDashboardResetMode) {
    let con = confirm(i18n.t('messages.prevent_leave_unsaved_dashboard'))
    if (con) {
      next()
    } else {
    }
  } else {
    next()
  }
})
export default router
