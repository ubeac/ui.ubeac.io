import Server from '@/service/server'
import i18n from '@/i18n'

const state = {
  user: {
    profile: null,
    claims: [],
    info: null
  },
  userProfile: {
    id: '',
    email: ''
  }
}

const getters = {
  isAdmin (state) {
    let out = false
    if (state.user.info) {
      out = state.user.info.role.includes('Admins')
    }
    return out
  },
  user () {
    return state
  },
  userProfile () {
    return state.userProfile
  },
  profile () {
    return state.user.profile
  },
  userInfo () {
    return state.user.info
  },
  timeZoneOffset () {
    let out
    if (state.user.profile) {
      out = state.user.profile.timeZoneOffset
    }
    return out
  }
}
const actions = {
  getByIds (context, emailIds) {
    const userEmail = { email: emailIds }
    const promise = Server.GetUserProfileByEmail(userEmail)
    promise.then((response) => {
      context.commit('OnGetUserProfile', response.body.data)
    })
    return promise
  },
  // TODO: Check for remove and cleanup
  getUserProfile (context, email) {
    const userEmail = { email: email }
    const promise = Server.GetUserProfileByEmail(userEmail)
    promise.then((response) => {
      if (response.body.data === null) {
        context.commit('notification/error', {
          message: i18n.t('messages.user_not_found'),
          action: '404'
        }, { root: true })
      } else {
        context.commit('OnGetUserProfile', response.body.data)
      }
    })
    return promise
  },
  async fetchUserInfo (context) {
    let response = await Server.GetUserInfo()
    context.commit('OnUserInfo', response.body)
    response = await Server.GetUserClaims()
    context.commit('OnUserClaims', response.body.data)
    response = await Server.GetUserProfile()
    context.commit('OnUserProfile', response.body.data)
  },
  updateUserProfile (context, profile) {
    const promise = Server.UpdateUserProfile(profile)
    promise.then((response) => {
      context.commit('OnUpdateUserProfile', response.body.data)
      context.dispatch('fetchUserInfo')
    })
    return promise
  },
  getProfile (context) {
    const promise = Server.GetUserProfile()
    promise.then((response) => {
      context.commit('OnUserProfile', response.body.data)
    })
    return promise
  }
}

const mutations = {
  OnUserInfo (state, userInfo) {
    state.user.info = userInfo
  },
  OnUserClaims (state, userClaims) {
    state.user.claims = userClaims
  },
  OnUserProfile (state, userProfile) {
    state.user.profile = userProfile
  },
  OnGetUserProfile (state, userProfile) {
    state.userProfile.id = userProfile.id
    state.userProfile.email = userProfile.email
  },
  OnUpdateUserProfile (state, userProfile) {
    // Nothing to do
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
