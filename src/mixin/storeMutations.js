import _ from 'lodash'
import Vue from 'vue'
export default {
  PatchAdd (state, payload) {
    let clonedDict = _.cloneDeep(state.dict)
    clonedDict[payload.id] = payload.data
    state.dict = clonedDict
  },
  PatchUpdate (state, payload) {
    _.merge(state.dict[payload.id], payload.data)
  },
  PatchDelete (state, payload) {
    Vue.delete(state.dict, payload.id)
  },
  OnPatchAddChildren (state, payload) {
    if (state.dict[payload.id]) {
      if (state.dict[payload.id][payload.childName] && !state.dict[payload.id][payload.childName].includes(payload.childId)) {
        state.dict[payload.id][payload.childName].push(payload.childId)
      } else if (!state.dict[payload.id][payload.childName]) {
        Vue.set(state.dict[payload.id], payload.childName, [payload.childId])
      }
    }
  },
  OnPatchUpdateChildren (state, payload) {
    _.each(state.dict, (item) => {
      if (item[payload.childName] && item[payload.childName].includes(payload.childId)) {
        item[payload.childName] = item[payload.childName].filter((childItem) => {
          return childItem !== payload.childId
        })
      }
    })
    if (state.dict[payload.id] && state.dict[payload.id][payload.childName] && !state.dict[payload.id][payload.childName].includes(payload.childId)) {
      state.dict[payload.id][payload.childName].push(payload.childId)
    }
  },
  OnPatchDeleteChildren (state, payload) {
    if (state.dict[payload.id] && state.dict[payload.id][payload.childName]) {
      state.dict[payload.id][payload.childName] = state.dict[payload.id][payload.childName].filter((item) => {
        return item !== payload.childId
      })
    }
  }
}
