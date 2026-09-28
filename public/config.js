window.CONFIG = {
  // Nightly
  //apiServerUrl: 'https://nightlyapi.ubeac.io/',
  //socketURL: 'https://nightlysocket.ubeac.io/socket',
  //identityServerURL: 'https://nightlyidsrv.ubeac.io/',
  //identityServerClientId: 'uBeacTestUIClient',
  //gatewayUrlProtocol: 'http://',
  //gatewayUrlFirstPart: 'nightlyhub.ubeac.io/',
  // Master 
  apiServerUrl: 'https://api.ubeac.io/',
  socketURL: 'https://socket.ubeac.io/socket',
  identityServerURL: 'https://idsrv.ubeac.io/',
  identityServerClientId: 'uBeacUIClient',
  gatewayUrlProtocol: 'https://',
  gatewayUrlFirstPart: 'hub.ubeac.io/',
  gaCode: 'UA-135535158-2',
  googleMapKey: 'AIzaSyD-oX2ICjm2yVePw-_Rsh8dMljOBL6keYA',
  websensorAddress: 'https://websensor.ubeac.io/',
  //websensorAddress: 'http://192.168.0.104:3003/',
  socketRetryDelay: 3000,
  themes: {
    default: {
      name: 'Default',
      url: 'default',
      color: '#F3F3F3',
      cssCalss: 'theme-default'
    },
    darkBlue: {
      name: 'Dark Blue',
      url: 'dark-blue',
      color: '#031028',
      cssCalss: 'theme-drk-blue'
    },
    darkBlack: {
      name: 'Black',
      url: 'dark-black',
      color: '#0a0a0a',
      cssCalss: 'theme-dark-black'
    },
    darkGreen: {
      name: 'Dark Green',
      url: 'dark-green',
      color: '#2b6d5f',
      cssCalss: 'theme-dark-green'
    }
  },
  captchaSiteKey: '6Le-S5MUAAAAAK3_ZBa-yvu2G2SL-Oxmd_EqY3sk',
  myWidgetsEnable: false,
  map: {
    defaultMapCenter: {
      lng: -79.3877714524686,
      lat: 43.84633237422835
    },
    darkTheme: [{ 'featureType': 'all', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#ffffff' }] }, { 'featureType': 'all', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#000000' }, { 'lightness': 13 }] }, { 'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#000000' }] }, { 'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#144b53' }, { 'lightness': 14 }, { 'weight': 1.4 }] }, { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'color': '#08304b' }] }, { 'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{ 'color': '#0c4152' }, { 'lightness': 5 }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#000000' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#0b434f' }, { 'lightness': 25 }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#000000' }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#0b3d51' }, { 'lightness': 16 }] }, { 'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{ 'color': '#000000' }] }, { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'color': '#146474' }] }, { 'featureType': 'water', 'elementType': 'all', 'stylers': [{ 'color': '#021019' }] }]
  },
  deviceSimulatorDefaultFirmware: '1c7aeb0e-677a-4d9d-a42f-52ec5b9e2c65',
  brandColors: {
    primary: '#113982',
    green: '#57C99A',
    red: '#940a17'
  },
  colors: ['#D91A6D', '#E3CE84', '#F76F7F', '#391E47', '#009AB5', '#00659D', '#0D3600', '#6F5487', '#BA733B', '#9A024F'],
  lodash: {
    name: '_'
  },
  dateFormat: {
    global: 'YYYY/MM/DD HH:mm:ss.SSS',
    toServer: 'YYYY/MM/DD HH:mm:ss Z',
    datepicker: 'YYYY/MM/DD HH:mm:ss',
    short: 'HH:mm:ss',
    medium: 'MMM DD H:m:ss'
  },
  defaultRoute: {
    afterLogin: '/intro',
    afterLogout: '/login',
    afterForgotPassword: '/login',
    afterResetPassword: '/login',
    afterChangePassword: '/logout'
  },
  notification: {
    duration: 6000
  },
  nProgress: {
    latencyThreshold: 100, // Number of ms before progressbar starts showing, default: 100,
    router: true, // Show progressbar when navigating routes, default: true
    http: true, // Show progressbar when doing Vue.http, default: true
    easing: 'ease',
    speed: 1,
    showSpinner: false
  },
  locale: 'en',
  veeValidation: {
    errorBagName: 'errors', // change if property conflicts
    fieldsBagName: 'validationFields',
    delay: 0,
    locale: 'en',
    strict: false,
    dictionary: null,
    classes: true,
    classNames: {
      touched: 'touched', // the control has been blurred
      untouched: 'untouched', // the control hasn't been blurred
      valid: 'valid', // model is valid
      invalid: 'is-invalid', // model is invalid
      pristine: 'pristine', // control has not been interacted with
      dirty: 'dirty' // control has been interacted with
    },
    mode: 'eager',
    events: 'change|input|paste|blur',
    inject: true,
    validity: false,
    aria: true
  },
  docs: {
    registration: 'https://www.ubeac.io/docs/Walkthrough.html#_1-registration',
    team: 'https://www.ubeac.io/docs/Walkthrough.html#_3-creating-a-team',
    building: 'https://www.ubeac.io/docs/Walkthrough.html#_4-creating-building-and-floors',
    floor: 'https://www.ubeac.io/docs/Walkthrough.html#_4-creating-building-and-floors',
    gateway: 'https://www.ubeac.io/docs/Walkthrough.html#_5-creating-new-gateway',
    device: 'https://www.ubeac.io/docs/Walkthrough.html#_7-devices',
    sensor: 'https://www.ubeac.io/docs/Walkthrough.html#_7-devices',
    dashboard: 'https://www.ubeac.io/docs/Walkthrough.html#_8-create-your-dashboard',
    widget: 'https://www.ubeac.io/docs/Walkthrough.html#_9-widgets',
    intro: 'https://www.ubeac.io/docs/'
  }
}
