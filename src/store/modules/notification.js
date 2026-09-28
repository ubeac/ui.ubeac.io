export default {
  state: {},
  namespaced: true,
  mutations: {
    success (state, payload = { action: '', message: '' }) {
      this._vm.$notify({
        group: 'server',
        title: '',
        text: `${payload.message}`
      })
    },
    error (state, payload = { action: '', message: '' }) {
      this._vm.$notify({
        group: 'server',
        type: 'error',
        title: 'Sad message',
        text: `${payload.action}, ${payload.message}`
      })
    },
    warning (state, payload = { title: '', action: '', message: '' }) {
      this._vm.$notify({
        group: 'server',
        type: 'warn',
        title: payload.title,
        text: `${payload.message}`
      })
    }
  }
}
