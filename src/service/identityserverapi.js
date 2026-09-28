import Config from '../config/config'
/* eslint-disable */
export const IdentityServerConfig = {
  client_id: Config.identityServerClientId,
  client_secret: Config.identityServerClientSecret,
  response_type: 'password',
  scope: 'openid profile api idsrv socket roles',
  authority: Config.identityServerURL
}
/* eslint-enable */

export const IdentityServerApi = {
  Login: {
    method: 'POST',
    url: IdentityServerConfig.authority + 'connect/token',
    headers: {
      'Authorization': 'Basic ' + btoa(IdentityServerConfig.client_id + ':' + IdentityServerConfig.client_secret)
    },
    body: ''
  },
  Register: { method: 'POST', url: IdentityServerConfig.authority + 'user/register' },
  Logout: { method: 'POST', url: IdentityServerConfig.authority + 'user/logout' },
  Revoke: { method: 'POST', url: IdentityServerConfig.authority + 'connect/revocation' },
  GetUserInfo: { method: 'GET', url: IdentityServerConfig.authority + 'connect/userinfo' },
  GetUserProfile: { method: 'POST', url: IdentityServerConfig.authority + 'user/profile' },
  GetUserClaims: { method: 'POST', url: IdentityServerConfig.authority + 'user/claims' },
  ChangePassword: { method: 'POST', url: IdentityServerConfig.authority + 'user/changepassword' },
  ForgotPassword: { method: 'POST', url: IdentityServerConfig.authority + 'user/forgotpassword' },
  ResetPassword: { method: 'POST', url: IdentityServerConfig.authority + 'user/resetpassword' },
  ResendEmail: { method: 'POST', url: IdentityServerConfig.authority + 'user/resendemail' },
  GetUserProfileByEmail: { method: 'GET', url: IdentityServerConfig.authority + 'user/GetUserProfileByEmail{?email*}' },
  UpdateUserProfile: { method: 'POST', url: IdentityServerConfig.authority + 'user/Update' }
}

export default IdentityServerApi
