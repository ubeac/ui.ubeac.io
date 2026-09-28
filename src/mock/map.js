const randomBetween = function (a, b) {
  return Math.floor(Math.random() * b) + a
}
const indicatorType = function () {
  const arr = ['light', 'gas', 'temperature']
  return arr[randomBetween(1, 3) - 1]
}

const map = function (n = 20) {
  let object = []
  let i = 0
  while (i <= n) {
    let random = Math.random()
    let indicatorTypeRandom = indicatorType()
    object.push({
      id: `randomId${i}${random}`,
      title: this.$t('general.main_corridor_light') + i,
      sensorValue: randomBetween(0, indicatorTypeRandom === 'light' ? 1000 : indicatorTypeRandom === 'temperature' ? 60 : 100),
      unit: 'lux',
      indicator: indicatorType(),
      pinNum: 1,
      xp: randomBetween(0, 100),
      yp: randomBetween(0, 100)
    })
    i++
  }
  return object
}

export default {
  map: map
}
