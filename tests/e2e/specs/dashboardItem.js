// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('.app', 10000)
      .assert.elementPresent('.btn-success')
      .setValue('[name="email"]', '<test-user-email>')
      .setValue('[name="password"]', '<test-user-password>')
      .click('.btn-success')
      .pause(2000)
      .waitForElementVisible('.sidebar', 10000)
      .waitForElementVisible('.sidebar li.nav-item.nav-dropdown:first-child .nav-link', 10000)
      .click('.sidebar li.nav-item.nav-dropdown:first-child .nav-link')
      .pause(2000)
      .waitForElementVisible('.sidebar li.nav-item.nav-dropdown.open .nav-dropdown-items .nav-item:first-child .nav-link', 5000)
      .click('.sidebar li.nav-item.nav-dropdown.open .nav-dropdown-items .nav-item:first-child .nav-link')
      .pause(5000)
      .saveScreenshot('./tests/e2e/reports/FirstDashboardview.png')
      .end()
  }
}
