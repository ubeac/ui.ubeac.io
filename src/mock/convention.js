/* eslint-disable */
/**
 * @description sample json data we expect to receive by gateway
 * @type {{sensor: [*], gateway: [*]}}
 */
var convention = {
    sensor: [{
        /**
         * @description name of sensor
         * @unique
         * @type String
         */
        name: 'office temperature',

        /**
         * @description sensor type like: light, sound, gas, temp, etc
         * @type String
         */
        type: 'temperature',

        /**
         * @description sensor current value
         * @type Int
         */
        value: '22',

        /**
         * @description unit of sensor value
         * @type String
         */
        unit: 'fahrenheit',

        /**
         * @description sensor value historically
         * @type Array
         */
        history: [
            {
                /**
                 * @type Int
                 */
                value: '13',
                /**
                 * @type Date
                 */
                date: '2017/12/03T12:334UTC'
            } //*n
        ]
    }],
    gateway: [{
        /**
         * @description friendly name of gateway
         * @type String
         */
        name: 'office gateway',

        /**
         * @description uBeace gatewayVersion id
         * @type String
         */
        gatewayVersionId: '',

        /**
         * @description activity status
         * @type String
         */
        status: 'active',

        /**
         * @description gateway geo location [long, lat]
         * @type Array
         */
        geoLocation: [321876.32, 312344214.432]
    }]
}
