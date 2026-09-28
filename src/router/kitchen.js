// Containers
import Manage from '@/containers/Manage'
// Views
import SocketTest from '@/views/kitchen/Socket'
import Home from '@/views/kitchen/Home'
import editor from '@/views/kitchen/CodeEditor'
// Services
import checkRoles from '@/router/modules/authValidator'

export default [{
  path: '/kitchen',
  name: 'Kitchen',
  component: Manage,
  beforeEnter: checkRoles,
  meta: { roles: ['ADMINS'] },
  children: [
    {
      path: '/kitchen/home',
      name: 'KitchenIndexPage',
      component: Home,
      meta: { roles: ['ADMINS'] }
    },
    {
      path: '/kitchen/socket-test',
      name: 'kitchenSocketTest',
      component: SocketTest,
      meta: { roles: ['ADMINS'] }
    },
    {
      path: '/kitchen/editor',
      name: 'KitchenCodeEditor',
      component: editor,
      meta: { roles: ['ADMINS'] }
    }
  ]
}]
