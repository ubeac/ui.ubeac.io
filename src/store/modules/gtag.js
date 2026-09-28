import Vue from 'vue'
const myVue = new Vue()

const state = {
  utm: {
    source: '',
    medium: '',
    campaign: ''
  }
}

const getters = {
  utm () {
    return state.utm
  }
}

const methods = {
  setHotjarGtagLabel (eventModel) {
    if (hj.globals) {
      let user = hj.globals.get('userId')
      if (user && eventModel) {
        eventModel.label = user.split('-').shift()
      }
    }
  }
}

const actions = {
  sendGtagEvent (context, eventModel) {
    methods.setHotjarGtagLabel(eventModel)
    if (this.state.user.user.profile) {
      eventModel.userId = this.state.user.user.profile.id
    }
    if (this.state.team.dict[this.state.workspace.teamId] || this.state.team.dict[this.state.team.team]) {
      eventModel.teamNamespace = this.state.team.dict[this.state.workspace.teamId].namespace
    }

    myVue.$gtag.event(eventModel.action, {
      'event_label': eventModel.label,
      'event_category': eventModel.category,
      'value': eventModel.value,
      'userId': eventModel.userId,
      'teamNamespace': eventModel.teamNamespace
    })
  },
  gtagSet (context, userId) {
    myVue.$gtag.set({
      'user_id': userId
    })
  },
  gtagConfig (context, config) {
    myVue.$gtag.customMap(config.custom_map)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
