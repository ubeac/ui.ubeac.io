import authService from '@/service/auth'

export default (to, from, next) => {
  var roles = ['*']
  var isValid = false
  var isAuthenticated = authService.getToken() !== null
  if (to.meta.roles) {
    roles = to.meta.roles
  } else {
    if (to.matched && to.matched[0].meta.roles) {
      roles = to.matched[0].meta.roles
    }
  }
  if (roles.includes('*')) {
    isValid = true
  }
  if (isAuthenticated && !roles.includes('?')) {
    isValid = true
  }
  if (!isAuthenticated && roles.includes('?')) {
    isValid = true
  }
  if (isAuthenticated && roles.includes('AUTH')) {
    isValid = true
  }
  if (isValid) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
}
