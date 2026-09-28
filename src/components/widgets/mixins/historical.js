import Moment from 'moment'
export default {
  data () {
    return {
      loadHistoricalDataTime: null,
      firstHistoricalLoadDone: false,
      historicalDataLoading: false,
      historicalData: null
    }
  },
  methods: {
    startLoadingHistorical () {
      this.loadHistoricalData()
    },
    reloadLoadingHistorical () {
      if (!this.firstHistoricalLoadDone) {
        this.loadHistoricalData()
      } else {
        this.onHistoricalDataLoaded()
      }
    },
    onHistoricalDataLoaded () {
    },
    loadHistoricalData () {
      clearTimeout(this.loadHistoricalDataTime)
      this.firstHistoricalLoadDone = true
      this.loadHistoricalDataTime = setTimeout(() => {
        if (this.settings && this.settings.sensorFilter) {
          let filter = {}
          if (Array.isArray(this.settings.sensorFilter)) {
            filter.sensorIds = []
            this._.each(this.settings.sensorFilter, (item) => {
              if (item.data && item.data.sensorIds[0]) {
                filter.sensorIds.push(item.data.sensorIds[0])
              }
            })
          } else {
            filter = this._.cloneDeep(this.settings.sensorFilter)
          }
          filter.pageNumber = 1
          filter.pageSize = this.settings.historicalDataSize || 30
          if (this.settings.dataTimeRange) {
            filter.fromDate = new Moment().subtract(this.settings.dataTimeRange, 'second').toISOString(true)
          } else {
            filter.fromDate = new Moment().subtract(1, 'year').toISOString(true)
          }
          filter.toDate = new Moment().toISOString(true)
          this.historicalDataLoading = true
          this.fetchSensorData(filter).then((response) => {
            this.historicalData = response.body.data
            this.onHistoricalDataLoaded()
            this.historicalDataLoading = false
          }).catch(() => {
            this.historicalDataLoading = false
          })
        }
      }, 300)
    }
  }
}
