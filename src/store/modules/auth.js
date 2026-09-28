import Server from '@/service/server'
import Auth from '@/service/auth'

let userToken = Auth.getToken()

const state = {
  userToken: userToken,
  loadingLogin: false,
  loadingLogout: false,
  loadingRegistration: false,
  loadingForgotPass: false,
  loadingChangePass: false,
  loadingResetPass: false,
  loadingResendVerificationCode: false,
  authenticated: userToken !== null
}

const getters = {
  auth () {
    return state
  },
  loadingResendVerificationCode (state) {
    return state.loadingResendVerificationCode
  }
}
const actions = {
  login (context, credentials) {
    context.commit('LoadingLogin', true)
    const promise = Auth.login(credentials)
    promise.then(result => {
      context.commit('OnLogin', result)
      context.commit('LoadingLogin', false)
    }, error => {
      console.log(error)
      context.commit('LoadingLogin', false)
    })
    return promise
  },
  register (context, data) {
    context.commit('LoadingRegistration', true)
    const promise = Auth.register(data)
    promise.then((response) => {
      context.commit('LoadingRegistration', false)
      context.commit('OnRegister', response.body)
    }).catch(() => {
      context.commit('LoadingRegistration', false)
    })
    return promise
  },
  logout (context) {
    context.commit('LoadingLogout', true)
    const promise = Auth.logout()
    // TODO: must handle in better way
    context.commit('OnLogout')
    promise.then((result) => {
      context.commit('OnLogout', result)
      context.commit('LoadingLogout', false)
    }).catch(() => {
      context.commit('LoadingLogin', false)
    })
    return promise
  },
  changePassword (context, data) {
    context.commit('LoadingChangePass', true)
    const promise = Server.ChangePassword(data)
    promise.then((result) => {
      context.commit('OnChangePassword', result)
      context.commit('LoadingChangePass', false)
    }).catch(() => {
      context.commit('LoadingChangePass', false)
    })
    return promise
  },
  forgotPassword (context, data) {
    context.commit('LoadingForgotPass', true)
    const promise = Server.ForgotPassword(data)
    promise.then((result) => {
      context.commit('OnForgotPassword', result)
      context.commit('LoadingForgotPass', false)
    }).catch((e) => {
      context.commit('LoadingForgotPass', false)
    })
    return promise
  },
  resetPassword (context, data) {
    context.commit('LoadingResetPass', true)
    const promise = Server.ResetPassword(data)
    promise.then((result) => {
      context.commit('OnResetPassword', result)
      context.commit('LoadingResetPass', false)
    }).catch(() => {
      context.commit('LoadingResetPass', false)
    })
    return promise
  },
  resendVerificationEmail (context, data) {
    context.commit('LoadingResendVerificationCode', true)
    const promise = Server.ResendEmail(data)
    promise.then((result) => {
      context.commit('LoadingResendVerificationCode', false)
    }).catch(() => {
      context.commit('LoadingResendVerificationCode', false)
    })
    return promise
  }
}

const mutations = {
  LoadingLogin (state, payload) {
    state.loadingLogin = payload
  },
  LoadingLogout (state, payload) {
    state.loadingLogout = payload
  },
  LoadingRegistration (state, payload) {
    state.loadingRegistration = payload
  },
  LoadingForgotPass (state, payload) {
    state.loadingForgotPass = payload
  },
  LoadingChangePass (state, payload) {
    state.loadingChangePass = payload
  },
  LoadingResendVerificationCode (state, payload) {
    state.loadingResendVerificationCode = payload
  },
  LoadingResetPass (state, payload) {
    state.loadingResetPass = payload
  },
  OnLogin (state, userToken) {
    state.userToken = userToken
    state.authenticated = true
  },
  OnLogout (state) {
    state.userToken = null
    state.authenticated = false
  },
  OnRegister (state, user) {
    // nothing to do
  },
  OnChangePassword (state) {
    // nothing to do
  },
  OnForgotPassword (state) {
    // nothing to do
  },
  OnResetPassword (state) {
    // nothing to do
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
