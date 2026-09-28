import _ from 'lodash'
export default function validation (target, name, descriptor) {
  const original = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function (...args) {
      let promises = []
      const validateChild = function (child) {
        if (child.$validator) {
          child.$validator.extend('gatewayurl', {
            getMessage (field, val) {
              return 'Gateway URl cant start with momentaj or ubeac (uBeac)'
            },
            validate (value, field) {
              let out = true
              let blackList = ['momentaj', 'ubeac']
              blackList.forEach((i) => {
                if (value.toLowerCase().indexOf(i) === 0) {
                  out = false
                }
              })
              return out
            }
          })
          let prom = new Promise((resolve, reject) => {
            child.$validator.validateAll().then((result) => {
              if (result) {
                resolve()
              }
            })
          })
          promises.push(prom)
        }
        if (child.$validator && child.$el && child.$el.getAttribute && child.$el.getAttribute('needvalidation') === '') {
          let prom = new Promise((resolve, reject) => {
            child.$validator.validateAll().then((result) => {
              if (result) {
                resolve()
              }
            })
          })
          promises.push(prom)
        }
        if (child.$children.length > 0) {
          _.each(child.$children, (nextChild) => {
            validateChild(nextChild)
          })
        }
      }
      _.each(this.$children, (child) => {
        validateChild(child)
      })
      let mainComponent = new Promise((resolve, reject) => {
        this.$validator.validateAll().then((result) => {
          if (result) {
            resolve()
          }
        })
      })
      promises.push(mainComponent)
      Promise.all([...promises]).then(() => {
        original.apply(this, args)
      })
    }
  }
  return descriptor
}
