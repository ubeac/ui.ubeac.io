export default [
  {
    'name': 'Battery',
    'dashboardId': '',
    'description': null,
    'type': 'IndicatorLiveWidget',
    'x': 0,
    'y': 0,
    'w': 6,
    'h': 2,
    'setting': {
      'decimalPlaces': 2,
      'historicalDataSize': 20,
      'sensorType': 1,
      'defaultWidth': 4,
      'defaultHeight': 2,
      'widgetIndicator': 'BatteryIndicator',
      'indicatorMin': 0,
      'indicatorMax': 100,
      'deviceName': {
        'enabled': true
      },
      'unit': {
        'enabled': true
      },
      'lastUpdateTime': {
        'enabled': true
      },
      'updateTimeDiff': {
        'enabled': false
      },
      'chart': {
        'enabled': true
      }
    }
  },
  {
    'name': 'Memory',
    'dashboardId': '',
    'description': null,
    'type': 'IndicatorLiveWidget',
    'x': 6,
    'y': 0,
    'w': 6,
    'h': 2,
    'setting': {
      'decimalPlaces': 2,
      'historicalDataSize': 20,
      'sensorType': 19,
      'defaultWidth': 4,
      'defaultHeight': 2,
      'widgetIndicator': 'GasIndicator',
      'indicatorMin': 0,
      'indicatorMax': 100,
      'deviceName': {
        'enabled': true
      },
      'unit': {
        'enabled': true
      },
      'lastUpdateTime': {
        'enabled': true
      },
      'updateTimeDiff': {
        'enabled': false
      },
      'chart': {
        'enabled': true
      }
    }
  },
  {
    'name': 'Acceleration',
    'dashboardId': '',
    'description': null,
    'type': 'ChartLiveWidget',
    'x': 0,
    'y': 2,
    'w': 8,
    'h': 4,
    'setting': {
      'historicalDataSize': 1000,
      'refreshTime': 1000,
      'dataTimeRange': 60,
      'dataCount': 1000,
      'chart': {
        'chartBgGrid': false,
        'stepLine': false,
        'chart': {
          'type': 'spline',
          'zoomType': 'false',
          'title': {
            'enabled': true
          }
        },
        'scrollbar': {
          'enabled': false
        },
        'navigator': {
          'enabled': true
        },
        'title': {
          'enabled': true
        },
        'legend': {
          'enabled': true,
          'align': 'center'
        },
        'tooltip': {
          'crosshairs': true,
          'shared': true,
          'enabled': true,
          'dateTimeLabelFormats': {
            'millisecond': '%Y/%m/%e %H:%M:%S.%L'
          }
        },
        'credits': {
          'enabled': false
        },
        'rangeSelector': {
          'enabled': false
        },
        'xAxis': {
          'minorTickInterval': 'null',
          'startOnTick': false,
          'endOnTick': false,
          'type': 'datetime',
          'alignTicks': true,
          'allowDecimals': true,
          'reversed': false,
          'title': {
            'enabled': false
          },
          'labels': {
            'enabled': true
          }
        },
        'yAxis': {
          'alignTicks': true,
          'allowDecimals': true,
          'reversed': false,
          'title': {
            'enabled': true
          },
          'labels': {
            'enabled': true
          }
        }
      },
      'sensorType': 7,
      'sensorFilter': [
        {
          'name': 'New Series',
          'data': {
            'fromDate': '2020-03-10T02:52:08.450+03:30',
            'toDate': '2020-03-10T03:52:08.450+03:30',
            'sensorIds': [
              ''
            ],
            'sensorSelectedValue': 'x',
            'deviceIds': [
              ''
            ]
          }
        }
      ],
      'defaultWidth': 4,
      'defaultHeight': 2
    }
  },
  {
    'name': 'Orientation',
    'dashboardId': '',
    'description': null,
    'type': 'ChartLiveWidget',
    'x': 0,
    'y': 6,
    'w': 8,
    'h': 3,
    'setting': {
      'historicalDataSize': 1000,
      'refreshTime': 1000,
      'dataTimeRange': 60,
      'dataCount': 1000,
      'chart': {
        'chartBgGrid': false,
        'stepLine': false,
        'chart': {
          'type': 'line',
          'zoomType': 'false',
          'title': {
            'enabled': true
          }
        },
        'scrollbar': {
          'enabled': false
        },
        'navigator': {
          'enabled': true
        },
        'title': {
          'enabled': true
        },
        'legend': {
          'enabled': true,
          'align': 'center'
        },
        'tooltip': {
          'crosshairs': true,
          'shared': true,
          'enabled': true,
          'dateTimeLabelFormats': {
            'millisecond': '%Y/%m/%e %H:%M:%S.%L'
          }
        },
        'credits': {
          'enabled': false
        },
        'rangeSelector': {
          'enabled': false
        },
        'xAxis': {
          'minorTickInterval': 'null',
          'startOnTick': false,
          'endOnTick': false,
          'type': 'datetime',
          'alignTicks': true,
          'allowDecimals': true,
          'reversed': false,
          'title': {
            'enabled': false
          },
          'labels': {
            'enabled': true
          }
        },
        'yAxis': {
          'alignTicks': true,
          'allowDecimals': true,
          'reversed': false,
          'title': {
            'enabled': true
          },
          'labels': {
            'enabled': true
          }
        }
      },
      'sensorType': 14,
      'defaultWidth': 4,
      'defaultHeight': 2
    }
  },
  {
    'type': 'MapWidget',
    'name': 'My Device Location',
    'description': null,
    'listTitle': 'Map',
    'defaultWidth': 6,
    'defaultHeight': 4,
    'dashboardId': '',
    'x': 8,
    'y': 2,
    'w': 4,
    'h': 7,
    'setting': {
      'mapTypeId': 'terrain',
      'roadsDensity': 0,
      'landmarksDensity': 0,
      'labelsDensity': 0,
      'allInfoboxVisible': false,
      'controls': true,
      'defaultZoom': 15,
      'sensorType': 2,
      'defaultCenter': {
        'lat': 43.64962701058062,
        'lng': -79.3569616880268
      },
      'sensorFilter': [],
      'defaultWidth': 6,
      'defaultHeight': 4
    }
  }
]
