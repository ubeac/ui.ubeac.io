import Server from './server'

export default {
  getClaims () {
    return Server.GetUserClaims()
      .then((response) => response.body)
      .catch((error) => Promise.reject(error.response))
  },
  getUserProfile () {
    return Server.GetUserProfile()
      .then((response) => response.body)
      .catch((error) => Promise.reject(error.response))
  },
  getUserInfo () {
    // console.log(response)
    return Server.GetUserInfo()
      .then((response) => response.body)
      .catch((error) => Promise.reject(error.response))
  }
}
