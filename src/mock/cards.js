/* eslint-disable */
var carts = {

    /**
     * @description gateway basic cart data example
     */
    gateway_basic: {
        gatwayVersionId: '324h',
        name: 'Office',
        description: 'description about gateway',
        isActive: true,
        last_update: '2017-12-22T13:34:46+00:00',
        requestCount: 123,
        connectedGatewayId: '131u'
    },

    /**
     * @description gateway log cart data example
     */
    gateway_log: [{
        gatwayVersionId: '324h',
        name: 'Office',
        description: 'description about gateway',
        isActive: true,
        last_update: '2017-12-22T13:34:46+00:00',
        requestCount: 123,
        connectedGatewayId: '131u'
    }],

    // =========================================================================================
    // Temperature
    // =========================================================================================

    /**
     * @description temperature basic cart data example
     */
    temperature_basic: {
        data: {
            name: 'Main Corridor',
            value: 23.5,
            humidity: 24.5,
            moisture: 47,
            last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
            last_update: '2017-12-22T13:34:46+00:00',
            unit: 'celsius'
        },
        settings: {
            enable_details: false, // if true show humidity and moisture
            history_chart: false, // if true show temperature value historically in line chart
            history_chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description temperature log cart data example
     */
    temperature_log: {
        data: {
            name: 'Main Corridor',
            value: 23.5,
            unit: 'celsius',
            log_data: [
                {
                    date: '2017-12-22T13:34:46+00:00',
                    value: 23,
                    change: 'up' // accept 'up', 'down', 'null'
                }
                // *n
            ]
        },
        settings: {
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description temperature group cart data example
     */
    temperature_group: {
        data: [
            {
                name: 'Main Corridor',
                value: 23.5,
                humidity: 24.5,
                moisture: 47,
                last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
                last_update: '2017-12-22T13:34:46+00:00',
                unit: 'celsius'
            }
            // *n
        ],
        settings: {
            enable_details: false, // if true show humidity and moisture
            history_chart: false, // if true show temperature value historically in line chart
            history_chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description temperature group chart cart data example
     */
    temperature_group_chart: {
        data: [
            {
                name: 'Main Corridor',
                value: 23.5,
                humidity: 24.5,
                moisture: 47,
                last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
                last_update: '2017-12-22T13:34:46+00:00',
                unit: 'celsius'
            },
            // *n
        ],
        settings: {
            column: 2,
            chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },

    // =========================================================================================
    // Gas
    // =========================================================================================

    /**
     * @description Gas basic cart data example
     */
    gas_basic: {
        data: {
            name: 'Main Corridor',
            gas: 'CO2',
            value: 23.5,
            last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
            last_update: '2017-12-22T13:34:46+00:00',
            unit: 'ppm'
        },
        settings: {
            enable_details: false, // if true show more details
            history_chart: false, // if true show temperature value historically in line chart
            history_chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description Gas log cart data example
     */
    gas_log: {
        data: {
            name: 'Main Corridor',
            gas: 'CO2',
            value: 23.5,
            unit: 'ppm',
            log_data: [
                {
                    date: '2017-12-22T13:34:46+00:00',
                    value: 23,
                    gas: 'CO2',
                    change: 'up' // accept 'up', 'down', 'null'
                }
                // *n
            ]
        },
        settings: {
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description Gas group cart data example
     */
    gas_group: {
        data: [
            {
                name: 'Main Corridor',
                gas: 'CO2',
                value: 23.5,
                last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
                last_update: '2017-12-22T13:34:46+00:00',
                unit: 'ppm'
            }
            // *n
        ],
        settings: {
            enable_details: false, // if true show humidity and moisture
            history_chart: false, // if true show temperature value historically in line chart
            history_chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description temperature group chart cart data example
     */
    gas_group_chart: {
        data: [
            {
                name: 'Main Corridor',
                value: 23.5,
                gas: 'CO2',
                last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
                last_update: '2017-12-22T13:34:46+00:00',
                unit: 'ppm'
            },
            // *n
        ],
        settings: {
            column: 2,
            chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },

    // =========================================================================================
    // Light
    // =========================================================================================

    /**
     * @description Light basic cart data example
     */
    light_basic: {
        data: {
            name: 'Main Corridor',
            value: 23.5,
            last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
            last_update: '2017-12-22T13:34:46+00:00',
            unit: 'lux'
        },
        settings: {
            enable_details: false, // if true show more details
            history_chart: false, // if true show temperature value historically in line chart
            history_chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description Light log cart data example
     */
    light_log: {
        data: {
            name: 'Main Corridor',
            gas: 'CO2',
            value: 23.5,
            unit: 'lux',
            log_data: [
                {
                    date: '2017-12-22T13:34:46+00:00',
                    value: 23,
                    change: 'up' // accept 'up', 'down', 'null'
                }
                // *n
            ]
        },
        settings: {
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description Light group cart data example
     */
    light_group: {
        data: [
            {
                name: 'Main Corridor',
                value: 23.5,
                last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
                last_update: '2017-12-22T13:34:46+00:00',
                unit: 'lux'
            }
            // *n
        ],
        settings: {
            enable_details: false, // if true show humidity and moisture
            history_chart: false, // if true show temperature value historically in line chart
            history_chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },
    /**
     * @description Light group chart cart data example
     */
    light_group_chart: {
        data: [
            {
                name: 'Main Corridor',
                value: 23.5,
                last_hour_history: [23.5, 24, 25, 25.5, 27, 27.5, 25, 23.5, 23.5, 23.5],
                last_update: '2017-12-22T13:34:46+00:00',
                unit: 'lux'
            },
            // *n
        ],
        settings: {
            column: 2,
            chart_type: 'line', // accept 'line', 'column', 'bar', 'area'
            theme: 'light' // accept 'light', 'dark'
        }
    },

}
console.log(carts)
