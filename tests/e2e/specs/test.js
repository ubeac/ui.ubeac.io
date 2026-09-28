// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
const SCREENSHOT_PATH = './tests/e2e/reports/'
var route = [
  'http://localhost:60001/intro',
  'http://localhost:60001/dashboards/7daa6411-5583-4fe9-9cde-b1663eec035d',
  'http://localhost:60001/team',
  'http://localhost:60001/team/details/92b3133a-7e07-409e-823e-ed62b9900168',
  'http://localhost:60001/team/92b3133a-7e07-409e-823e-ed62b9900168',
  'http://localhost:60001/team/new',
  'http://localhost:60001/building',
  'http://localhost:60001/building/details/0a298c10-5b01-4124-9204-f384e01bde11',
  'http://localhost:60001/building/0a298c10-5b01-4124-9204-f384e01bde11',
  'http://localhost:60001/building/new',
  'http://localhost:60001/building/floor/list?buildingId=0a298c10-5b01-4124-9204-f384e01bde11',
  'http://localhost:60001/building/floor/details/ac3a50ed-13f5-4bac-b72b-3ab23498e9d7',
  'http://localhost:60001/building/floor/ac3a50ed-13f5-4bac-b72b-3ab23498e9d7',
  'http://localhost:60001/building/floor/new?buildingId=0a298c10-5b01-4124-9204-f384e01bde11',
  'http://localhost:60001/gateway',
  'http://localhost:60001/gateway/details/c1b8b434-6d62-4e86-a7be-ce4d98994f18',
  'http://localhost:60001/gateway/c1b8b434-6d62-4e86-a7be-ce4d98994f18',
  'http://localhost:60001/gateway/new',
  'http://localhost:60001/devices',
  'http://localhost:60001/devices/details/b37047e9-16de-4bf9-9a23-f30d0d1fd9e3',
  'http://localhost:60001/devices/b37047e9-16de-4bf9-9a23-f30d0d1fd9e3',
  'http://localhost:60001/devices/new',
  'http://localhost:60001/asset-tracking/manage',
  'http://localhost:60001/asset-tracking/report',
  'http://localhost:60001/admin/manufacturer',
  'http://localhost:60001/manufacturer/d033bcd5-8ee9-45b8-be54-3fcd9c80887a',
  'http://localhost:60001/manufacturer/new',
  'http://localhost:60001/product',
  'http://localhost:60001/product/135f1671-97cd-4268-a5ff-c9f982f61d50',
  'http://localhost:60001/product/new',
  'http://localhost:60001/firmware',
  'http://localhost:60001/firmware/4b0d0f13-0dec-4707-a941-717329d40c57',
  'http://localhost:60001/firmware/new',
  'http://localhost:60001/adminLog',
  'http://localhost:60001/adminExec'
]
module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('.app', 10000)
      .assert.elementPresent('.btn-success')
      .setValue('[name="email"]', 'bita.edalati@gmail.com')
      .setValue('[name="password"]', '5671')
      .click('.btn-success')
      .pause(1000)
      .waitForElementVisible('.app-header .navbar-nav', 10000)
      .pause(5000)
      .saveScreenshot('./tests/e2e/reports/FirstViewAfterLogin.png')
    route.forEach((item) => {
      console.log(item)
      browser.url(item)
      browser.waitForElementVisible('.app', 15000)
      browser.pause(10000)
      browser.saveScreenshot(`./tests/e2e/reports/${item}.png`)
    })
    browser.end()
  }
}
