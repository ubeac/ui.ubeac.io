// Containers
import Auth from '@/containers/Auth'

// Views
import Login from '@/views/auth/Login'
import Logout from '@/views/auth/Logout'
import Register from '@/views/auth/Register'
import InvalidAccess from '@/views/auth/InvalidAccess'
import ChangePassword from '@/views/auth/ChangePassword'
import ForgotPassword from '@/views/auth/ForgotPassword'
import ResetPassword from '@/views/auth/ResetPassword'

// Services
import checkRoles from '@/router/modules/authValidator'

export default [{
  path: '/auth',
  redirect: '/',
  name: 'Auth',
  component: Auth,
  beforeEnter: checkRoles,
  meta: { roles: ['?'] },
  children: [
    {
      path: '/invalidaccess',
      name: 'InvalidAccess',
      component: InvalidAccess,
      meta: { roles: ['*'] }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { roles: ['*'] }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: { roles: ['AUTH', 'USERS'] }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { roles: ['*'] }
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { roles: ['AUTH'] }
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: { roles: ['*'] }
    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { roles: ['*'] }
    }
  ]
}]
