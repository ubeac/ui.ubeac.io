/* eslint-disable */
const sampleArray = function (a = 30, b = 15, c = 40) {
  return Array.from(Array(a), (_, i) => randomBetween(b, c))
}

const randomBetween = function (a, b) {
  return Math.floor(Math.random() * b) + a
}

const coinFlip = function () {
  return Math.floor(Math.random() * 1) + 1000 > 500
}

const chartType = function () {
  const arr = ['column', 'line', 'area']
  return arr[randomBetween(1, 3) - 1]
}

const randomPlace = function () {
  const arr = ['Main Corridor', 'Office', 'Living room', 'Bedroom', 'Master Room']
  return arr[randomBetween(1, 5) - 1]
}

const themeFlip = function () {
  return (randomBetween(0, 100) > 50) ? 'dark' : 'light'
}

const rendomDate = function () {
  return new Date(new Date().valueOf() - (1000 * 60 * randomBetween(5, 15)))
}

const returnTempLogItem = function (n = 20) {
  let arr = []
  let i = 0
  while (i <= n) {
    arr.push({
      change: 'up',
      value: randomBetween(15, 50),
      lastHourHistory: sampleArray(),
      updateDate: rendomDate(),
      unit: '°C'
    })
    i++
  }
  return arr
}

const returnTempGroupItem = function (n = 20) {
  let arr = []
  let i = 0
  while (i <= n) {
    arr.push({
      name: randomPlace(),
      value: randomBetween(15, 50),
      humidity: randomBetween(15, 50),
      moisture: randomBetween(15, 50),
      lastHourHistory: sampleArray(),
      lastUpdate: rendomDate(),
      unit: '°C'
    })
    i++
  }
  return arr
}

const returnGasLogItem = function (n = 20) {
  let arr = []
  let i = 0
  while (i <= n) {
    arr.push({
      change: 'up',
      value: randomBetween(15, 50),
      lastHourHistory: sampleArray(),
      updateDate: rendomDate(),
      unit: 'ppm'
    })
    i++
  }
  return arr
}

const returnGasGroupItem = function (n = 20) {
  let arr = []
  let i = 0
  while (i <= n) {
    arr.push({
      name: randomPlace(),
      gasName: 'CO2',
      value: randomBetween(15, 50),
      lastHourHistory: sampleArray(),
      lastUpdate: rendomDate(),
      unit: 'ppm'
    })
    i++
  }
  return arr
}

const returnLightLogItem = function (n = 20) {
  let arr = []
  let i = 0
  while (i <= n) {
    arr.push({
      change: 'up',
      value: randomBetween(200, 800),
      lastHourHistory: sampleArray(),
      updateDate: rendomDate(),
      unit: 'lux'
    })
    i++
  }
  return arr
}

const returnLightGroupItem = function (n = 20) {
  let arr = []
  let i = 0
  while (i <= n) {
    arr.push({
      name: randomPlace(),
      value: randomBetween(200, 800),
      lastHourHistory: sampleArray(),
      lastUpdate: rendomDate(),
      unit: 'lux'
    })
    i++
  }
  return arr
}

const dashboard = function () {
  return [
    // LightBasic
    {
      meta: {
        cardType: 'LightBasic',
        enableDetails: coinFlip(), // if true show humidity and moisture
        enableChart: coinFlip(), // if true show temperature value historically in line chart
        historyChartType: chartType() // accept 'line', 'column', 'bar', 'area'
      },
      data: {
        name: randomPlace(),
        value: randomBetween(200, 800),
        lastHourHistory: sampleArray(),
        lastUpdate: rendomDate(),
        unit: 'lux'
      }
    },
    // TemperatureBasic
    {
      meta: {
        cardType: 'TemperatureBasic',
        enableDetails: coinFlip(),
        enableChart: coinFlip(),
        historyChartType: chartType()
      },
      data: {
        name: randomPlace(),
        value: randomBetween(15, 50),
        humidity: randomBetween(15, 50),
        moisture: randomBetween(15, 50),
        lastHourHistory: sampleArray(30, 0, 100),
        lastUpdate: rendomDate(),
        unit: '°C'
      }
    },
    // GasBasic
    {
      meta: {
        cardType: 'GasBasic',
        enableChart: coinFlip(), // if true show temperature value historically in line chart
        historyChartType: chartType() // accept 'line', 'column', 'bar', 'area'
      },
      data: {
        name: randomPlace(),
        value: randomBetween(15, 50),
        gasName: 'CO2',
        lastHourHistory: sampleArray(),
        lastUpdate: rendomDate(),
        unit: 'ppm'
      }
    },
    // LightLog
    {
      meta: {
        cardType: 'LightLog',
        enableDetails: coinFlip(), // if true show humidity and moisture
        enableChart: coinFlip(), // if true show temperature value historically in line chart
        historyChartType: chartType(), // accept 'line', 'column', 'bar', 'area'
        theme: 'light' // accept 'light', 'dark'
      },
      data: {
        name: randomPlace(),
        logData: returnLightLogItem()
      }
    },
    // GasLog
    {
      meta: {
        cardType: 'GasLog',
        theme: themeFlip() // accept 'light', 'dark'
      },
      data: {
        name: randomPlace(),
        logData: returnGasLogItem()
      }
    },
    // TemperatureLog
    {
      meta: {
        cardType: "TemperatureLog",
        enableDetails: coinFlip(), // if true show humidity and moisture
        enableChart: coinFlip(), // if true show temperature value historically in line chart
        historyChartType: chartType(), // accept 'line', 'column', 'bar', 'area'
        theme: themeFlip() // accept 'light', 'dark'
      },
      data: {
        name: randomPlace(),
        logData: returnTempLogItem()
      }
    },
    // LightGroup
    {
      meta: {
        cardType: 'LightGroup',
        enableChart: true, // if true show temperature value historically in line chart
        historyChartType: 'indicator', // accept 'line', 'column', 'bar', 'area', and also indicator
        theme: 'dark' // accept 'light', 'dark'
      },
      data: returnLightGroupItem(3)
    },
    // GasGroup
    {
      meta: {
        cardType: 'GasGroup',
        enableDetails: coinFlip(), // if true show humidity and moisture
        enableChart: coinFlip(), // if true show temperature value historically in line chart
        historyChartType: chartType(), // accept 'line', 'column', 'bar', 'area'
        theme: themeFlip() // accept 'light', 'dark'
      },
      data: returnGasGroupItem(3)
    },
    // TemperatureGroup
    {
      meta: {
        cardType: 'TemperatureGroup',
        enableDetails: coinFlip(), // if true show humidity and moisture
        enableChart: coinFlip(), // if true show temperature value historically in line chart
        historyChartType: chartType(), // accept 'line', 'column', 'bar', 'area'
        theme: themeFlip() // accept 'light', 'dark'
      },
      data: returnTempGroupItem(3)
    },
    // LightChart
    {
      meta: {
        cardType: 'LightChart',
        historyChartType: chartType(), // accept 'line', 'column', 'bar', 'area'
        theme: themeFlip() // accept 'light', 'dark'
      },
      data: {
        name: randomPlace(),
        value: 23.5,
        humidity: 24.5,
        moisture: 47,
        lastHourHistory: sampleArray(),
        lastUpdate: '2017-12-22T13:34:46+00:00',
        unit: 'lux'
      }
    },
    // LightChart
    {
      meta: {
        cardType: 'LightChart',
        historyChartType: chartType(), // accept 'line', 'column', 'bar', 'area'
        theme: themeFlip() // accept 'light', 'dark'
      },
      data: {
        name: randomPlace(),
        value: 23.5,
        humidity: 24.5,
        moisture: 47,
        lastHourHistory: sampleArray(),
        lastUpdate: '2017-12-22T13:34:46+00:00',
        unit: 'lux'
      }
    },
    // TemperatureChart
    {
      meta: {
        cardType: 'TemperatureChart',
        enableDetails: false, // if true show humidity and moisture
        enableChart: false, // if true show temperature value historically in line chart
        historyChartType: chartType()
      },
      data: {
        name: randomPlace(),
        value: randomBetween(15, 50),
        humidity: randomBetween(15, 50),
        moisture: randomBetween(15, 50),
        lastHourHistory: sampleArray(),
        lastUpdate: rendomDate(),
        unit: '°C'
      }
    },
    // GasChart
    {
      meta: {
        cardType: "GasChart",
        enableDetails: false, // if true show humidity and moisture
        enableChart: false, // if true show temperature value historically in line chart
        historyChartType: chartType()
      },
      data: {
        name: randomPlace(),
        value: randomBetween(15, 50),
        gasName: 'CO2',
        lastHourHistory: sampleArray(),
        lastUpdate: rendomDate(),
        unit: 'ppm'
      }
    }
  ]
}

export default dashboard
