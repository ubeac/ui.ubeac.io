export default (message, ins) => {
  function successNotification (target, name, descriptor) {
    const original = descriptor.value
    if (typeof original === 'function') {
      descriptor.value = function (...args) {
        original.apply(this, args)
        // promise.then((response) => {
        //  this.$store.commit('notification/success', {
        //    message: message
        //  })
        // })
      }
    }
    return descriptor
  }

  return successNotification
}
