import Server from '@/service/server'
import _ from 'lodash'

const state = {
  baseData: [],
  products: [],
  firmwares: [],
  manufacturersDict: [],
  productsDict: [],
  firmwaresDict: []
}

const getters = {
  manufacturerById: (state) => (id) => {
    let out
    if (state.manufacturersDict[id]) {
      out = state.manufacturersDict[id]
    }
    return out
  },
  productById: (state) => (id) => {
    let out
    if (state.productsDict[id]) {
      out = state.productsDict[id]
    }
    return out
  },
  firmwareById: (state) => (id) => {
    let out
    if (state.firmwaresDict[id]) {
      out = state.firmwaresDict[id]
    }
    return out
  },
  getManufacturerByFirmware: (state) => (id) => {
    let baseData = []
    const firmwareItem = state.firmwares.filter((item) => {
      return item.id === id
    })
    if (firmwareItem[0]) {
      const productsItem = state.products.filter((item) => {
        if (firmwareItem[0]) {
          return item.id === firmwareItem[0].productId
        }
      })
      baseData = state.baseData.filter((item) => {
        if (productsItem[0]) {
          return item.id === productsItem[0].manufacturerId
        }
      })
    }
    return baseData[0]
  },
  getProductByFirmware: (state) => (id) => {
    let productsItem = []
    const firmwareItem = state.firmwares.filter((item) => {
      return item.id === id
    })
    if (firmwareItem[0]) {
      productsItem = state.products.filter((item) => {
        return item.id === firmwareItem[0].productId
      })
    }
    return productsItem[0]
  },
  getAllProducts () {
    return _.orderBy(state.products, ['viewOrder'], ['desc'])
  },
  getAllFirmwares () {
    return state.firmwares
  },
  baseData () {
    return state.baseData
  }
}

const actions = {
  async getBaseData (context) {
    let manufacturers = []
    let products = []
    let firmwares = []
    let manufacturersDict = {}
    let productsDict = {}
    let firmwaresDict = {}
    let result = await Server.GetAllManufacturers()
    manufacturers = result.body.data
    if (manufacturers) {
      manufacturers.forEach(manufacturer => {
        let productsList = []
        manufacturersDict[manufacturer.id] = manufacturer
        manufacturer.products.forEach(product => {
          productsDict[product.id] = product
          var manufacturerIndex = manufacturers.findIndex((x) => x.id === product.manufacturerId)
          if (manufacturers[manufacturerIndex]) {
            productsList.push(product.id)
            products.push(product)
          }
          let firmwaresList = []
          product.firmwares.forEach(firmware => {
            firmwaresDict[firmware.id] = firmware
            if (productsDict[firmware.productId]) {
              firmwaresList.push(firmware.id)
              productsDict[firmware.productId].firmwares.push(firmware.id)
              firmwares.push(firmware)
            }
          })
          product.firmwares = firmwaresList
        })
        manufacturer.products = productsList
      })
    }
    context.commit('OnBaseData', { manufacturers, products, firmwares })
    context.commit('OnBaseDataDicts', { manufacturersDict, productsDict, firmwaresDict })
  }
}

const mutations = {
  OnBaseData (state, baseData) {
    state.baseData = baseData.manufacturers
    state.products = baseData.products
    state.firmwares = baseData.firmwares
  },
  OnBaseDataDicts (state, payload) {
    state.manufacturersDict = payload.manufacturersDict
    state.productsDict = payload.productsDict
    state.firmwaresDict = payload.firmwaresDict
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
