# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2020-06-05
### Fixed 
- Dashboard is editable in none edit mode

## [1.0.2] - 2020-05-29
### Fixed 
- Revert sensor data chart type to line

## [1.0.1] - 2020-05-29
### Fixed 
- Gateway report filtering bug

## [1.0.0] - 2020-05-29
### Added
- Add gateway Wizard
- First time users new user story 
- New Design
- Widgets setting preview
### Fixed 
- Fix map widget bug
- Fix map widget bug
- Fix access token in team tokens page
- Dashboard Charts change theme issues
- In Dashboard Indicator widget, remove space between prefix and unit
- Dashboard black theme name
- Gateway update security issues
- Fix reverted issues on team add page
- Dashboard maps theme bug
- Disbale Gtag
- Dashboard widgets series selector zindex issue
- Sensors report chart highchart eror 15 (sort data)
- Diable button bug in profile page
- Update address from google place bug
- Header default avatar visibility in theme
- Selected indicator color issue in themes
- Add label to email and password field
- Wizard typo
- Update security button disable status bug
- Copy write year changed to 2020
- Fix some responsive UI
- Fix wizard last happy message
- Fix after addteam route
- Gateway report filtering UI
- Minor UI 
- Fix modal data table UI
- Fix minor responsive UI
- Fix wizard second step empty state visibility
- Add gateway console errors
- Team page resend verification email console errors
- minor UI issues
- Fix map set zoom and view type issues caused by remove widget setting preview
### Changed 
-  Merge Battery indicator branch
-  Set default websensor dashboard battery indicator
-  Show Registration API error messages in form (instead of notify)
### Removed
- API success messages
- Device Simulator

## [0.0.256-beta] - 2020-4-22
### Fixed
-  Gtag issue in sending Hotjar user id

## [0.0.255-beta] - 2020-4-22
### Fixed
-  Add device from live device list

## [0.0.254-beta] - 2020-3-16
### Fixed
-  Fix CSV Export issue

## [0.0.252-beta] - 2020-2-24
### Edited
- Edited gtag evnets to send event on changing focus on fields

## [0.0.251-beta] - 2020-2-20
### Added
- Sending userId instead of Email and added team namespace as custom dimension to gtag
- Edited page title to show that is from app.ubeac.io in analytics
### Hotfixed 
- Fixed counting page twice in analytics by refreshing browser
### Removed
- Removed vue-analytics package

## [0.0.250-beta] - 2020-2-17
### Added
- Email as custom dimension to gtag

## [0.0.249-beta] - 2020-2-13
### Added
- Battery Indicator

## [0.0.248-beta] - 2020-2-12
### Added
- Added userId to gtag

## [0.0.247-beta] - 2020-2-10
### Hotfixed
- Fixed duplicate pageview in analytics

## [0.0.246-beta] - 2020-2-10
### Hotfixed
- Fixed issue in keeping UTM between signup, login, forgot password
- Fixed issue in add dashboard event

## [0.0.245-beta] - 2020-2-10
### Hotfixed
- Added Hotjar script

## [0.0.244-beta] - 2020-2-09
### Hotfixed
- Move app.ubeac.io to www.ubeac.io google analytics account

## [0.0.243-beta] - 2020-2-06
### Hotfixed
- Fix gtag data model same as google example

## [0.0.242-beta] - 2020-2-05
### Hotfixed 
- Add vue-gtag and registration gtag event

## [0.0.241-beta] - 2020-2-05
### Hotfixed 
- Chart redraw after fullscreen dashboard when browser is fullscreen

## [0.0.240-beta] - 2020-2-04
### Hotfixed 
- Confirm before cancel dashboard edit mode

## [0.0.239-beta] - 2020-2-04
### Hotfixed
- Indicators socket issue (widget doesnt update after add)

## [0.0.238-beta] - 2020-2-04
### Hotfixed 
- Add lowercase validation to team namespace
- Increase sensor chart report data count
- Remove socket log 
- Fix gateway http url box responsive issue

## [0.0.237-beta] - 2020-2-04
### Changed 
- Bump version
- signalr retry config
- Upgrade signalr
- Building icon
- Sensor update form submit button text
- Disable hide-selected options in multi select
- Update building and floor empty state add button
- Sensor add, update precision field validate numbers between 0-20
- Device add page, redirect to device list after add device
- Modal confirm remove, change cancel button style to update form cancel button
- Improve map UI
- Dashboard widget setting size and theme
- Change setting tab bottom line color
- Change Indicator chart softThreshold to zero
- Change Indicator chart line width .5
- Change add team card to the bottom of list
### Fixed
- Fix map setting theme
- Fix dashboard widget setting too many requests during edit
- Fix responsive
- Fix map widget performance issue
- Merge last change of master
- Fix Update form delete button responsive UI
- Fix team details building big card responsive UI
- Fix forms tab header responsive UI
- Fix add team card position
- Fix gateway Url in gateway details page UI
- Fix gateway firmware selector responsive
- Fix gateway add and update HTTP security form responsive
- Fix Device live page table responsive
- Fix gateway add and update MQTT security form responsive
- Fix profile icon in sidebar in mobile view
- Fix file uploader upload and download icon
- Fix typo appearance
- Disable map pin info box show in first view
- Fix long text UI
- Fix map pins in floor plan map
- Floor plan minor UI fix
- Add gateway
- Device floor and position popeties
- Gateway UID error on exit page
- Gateay UID bug in gateway update page
- Device page performance issue
- Chart widget bsetting s performance issue
- Chart setting update preview issue
- Sync address form ui in building and team
- Gateway update form description validation message
- Chart onHistoricalDataLoaded performance issue by debounce
- Sensor update, Issue that cause other sensors type update by change one of them
- Add update forms validation
- Prevent send null unit in sensor add update
- Sensor add update button loading state after get error
- Autocomplete chrome bug
- Create team page, fix description field top margin
- Create team page, fix city field placeholder
- Create team page, disable auto complete in all fields
- Address component, disable auto complete in all fields
- Team edit page, handle user not found error in add user form (With bad
    approach because we handle it in client side)
- Add team namespace check and add gateway namespace check, fix redundant request
    when we write characters and immediately reset to last approved
- Device list page fix page margin same as other pages
- Building add, update form validation on name and description field
- Building details page, remove team name from entities header 
- Gateway cards, remove team name 
- Building details page, fix description, address margin
- Team details page, remove floors section from building card if there is no building
- Floor details, remove team from header
- Floor add, fix description rows same as others
- Dashboard card, remove team from cards
- Fix gateway UID placeholder typo
- Fix sensor add form cancel button style same as others
- Fix gateway pin visibility in gateway details page floor map
- Team authorized user, prevent request duplicate email
- Fix precision in chart widgets
- Fix new series default name in add series to chart widget
- Floor list page console error when building deleted in other window
- Floor details page console error when building deleted in other window
- Add gateway console error
- Chart series selector error on remove device by socket
- Chart settings preview issue in responsive (small sizes)
- Forgot password request error message 
- Improve map performance 
- Remove stale name field from map widget device selector
### Added
- Map widget device selector 
- Add empty state message to device selector
- Fix responsive
- Add map widget settings
- Map settings to GEO map widget
- Map settings to floor map widget
- Added profile and upload icon
- Add map pin, map pin size and color to building, gateway and device
- Add new map pins to floor and geo map
### Removed
- Remove tracking widget

## [0.0.236-beta] - 2019-12-06
### Hotfix
- Fix add gateway issue
- Fix FloorSelector issue with live data layer in gateway and device add/update pages
- Move device attributes ui_floor, ui_floorPlanX, ui_floorPlanY to device properties

## [0.0.235-beta] - 2019-12-05
### Hotfix
- Live sync delete building, floor issue

## [0.0.234-beta] - 2019-12-05
### Hotfix
- Live sync delete gateway issue

## [0.0.233-beta] - 2019-12-05
### Hotfix
- Live sync delete device issue

## [0.0.232-beta] - 2019-12-02
### Hotfix
- Fix dashboard tracker widget settings issues
- Gateway UID box width (current gateway UID is pretty short)
- Fix team details page info box responsive issues in 1280
- Move add team card to end of list (mobile and desktop)
- Fix team authorized users table in 1280
- Fix submit button focus by tab index style
- Fix container max width in 1400 and bigger
- Remove 'Details' from team details page first side card and fix font size and color of namespace
- Fix created updated color in team page first side card
- Fix indicator historical chart view, thinner line and change area to areaspline and change softThreshold to zero
- Fix dashboard chart widget legend and title alignment
- Remove kitchen stale routes
- Remove admin log from admin menu because that was not functional
- Change details/setting icon UI from fab button to simple button
- Update validation plugin to version 2.2.15
- Change validation mode to eager and fix it in all forms
- Issue with back button and team namespace, gateway uid Validation fixed
- Fix lodash orderBy insensitive
- Sort all entity list by name 
- Remove building name from floor list page
- Separate attributes and schema in sensors

## [0.0.231-beta] - 2019-11-25
### Hotfix
- Fix floor plan center issue

## [0.0.230-beta] - 2019-11-25
### Hotfix
- Fix add sensor issue  (remove bad request data)
- Fix numeral js console error in portuguese locale

## [0.0.229-beta] - 2019-10-31
### Hotfix
- Check null data.body in gateway report page

## [0.0.228-beta] - 2019-10-31
### Hotfix
- Normalize gateway requestMethod in gateway live data

## [0.0.227-beta] - 2019-10-28
### Hotfix
- Sanitize data in gateway live data table

## [0.0.226-beta] - 2019-10-24
### Fixed 
- Gateway add http url sync issue
### Changed
- Update gateway details help text

## [0.0.225-beta] - 2019-10-22
### Changed
- Highchart tooltip style changed to grafana style
- Edited text related to gateway limitations
### Fixed 
- Historical data load system doesn't obey widget historicalCount
- Chart value on tooltip comma separated
- Move UID field to first of form in gateway add page
- Indicator/Gauge widget value on tooltip comma separated
- Fix dashboard bottom spacing
### Added 
- Security tabs to gateway add page
- Add new ability to read teamId from query parameter
### Removed 
- Remove additional icon from icon selector

## [0.0.224-beta] - 2019-09-20
### Fixed 
- Set default device position on map when floor plan changed
- Fix leave unsaved dashboard routine

## [0.0.223-beta] - 2019-09-18
### Added 
- Improve raw widget to use Live. Historical mixins
- Some initial meta tags
### Fixed 
- Improve resource size
  - Total Page Size from 2.7 to 2.3 MB
  - Requests from 38 to 26
- Remove vue-tour resource to decrease build size
- Remove vue-highcharts plugin (Currently we use last official version)
- Multiselect scroll issue in dashboard widget settings
- Add loading to device sensors list collapse/expand
- Try to fix floor plan popup position issue
### Changed
- Dashboard widget list order
- Raw widget settings tabs
- Improve floor plan map back to default center functionality and position on map
- Make map controls bigger (from 24px to 32px)

## [0.0.222b] - 2019-09-08
### Changed 
- Gateway mqtt URL

## [0.0.221b] - 2019-09-08
### Added 
- Heart Indicator
- Time machin functionality to indicator widget
- Map zoom and position setting 
- New Icons 
- Add Beam effect to GEO map
- New Map Widget 
- New Tracker widget
- Google map themes
- Icon and color selector to device add update pages
- Select floor position to device add update pages
- New Floor plan widget
### Reverted 
- Units and prefix to indicator widget
### Fixed
- Location sensor data compatibility with map
- Alignment of btn-fab
- Improve indicator rendering size
- Theme selected state UI
- Indicator widget chart Theme issues 
- Report pages pagination
- Static file loading cache
- Widget settings modal view in fullscreen mode
- Make indicator historical chart halo smaller
- Remove relative update time from widget indicator
- Chart multi sensor bug
- Improve gauge UI
- Improve notification theme
- Prevent more than one visible notification
- Improve indicator, chart widgets performance
- Gridstack resize UI issue 
- Fix bug in update sensor prefix
- Gauge responsibility to sidebar resize
- Dashboard fullscreen background
- Fix edge date format issue 
### Changed 
- Dashboard widget settings modal cancel button
- Gauge title position to bottom
- Fix map sensor icon UI
- Clean up code
- Move constant to config
- Improve load historical widget performance
- Improve map pins UI
- Improve map popup UI
- Map and tracker settings
- Floor plan map
- Clean up map components
- Floor plan theme
- Beam effect animation
- Floor plan popup content

## [0.0.220b] - 2019-08-27
### HotFixed
- Fix firefox, edge date fomrat issue 

## [0.0.219b] - 2019-08-26
### HotFixed
- Fix gateway report bug

## [0.0.218b] - 2019-08-21
### Fixed
- Fix precision in dashboard widgets
- Remove name required validation from chart and gauge widget

## [0.0.217b] - 2019-08-21
### Fixed
- Another Gauge widget issue

## [0.0.216b] - 2019-08-21
### Fixed
- Gauge widget console errors

## [0.0.215b] - 2019-08-21
### Added
- Ceiling Indicator
- Gauges read sensor's color range
- Heart beat indicator
- New Indicators (Door lock, Lamp, Gallery lamp, Fan, Outlet, Water gallon)
- Two state indicators functionality
- New chart design
- Gateway data and request warning have been added
- Gateway url, host address and help text in Gateway HTTP and MQTT security
- Tab view to dashboard widget settings
- Read indicator min/max from sensor attributes data
- Add chart to indicator widget
- Indicator widget responsibility
- Responsibility behavior when widget is under resize
- add 'xxs' to widget responsibilities
### Fixed 
- Fix side bar issue with long menu
- Disable animation in charts
- Improve hearbeat animation
- Magnetic field indicator colors issue
- Color range selector float number issues
- Gauge erros
- indicator settings console error
- Gateway help texts
- Indicator UI issues in small sizes
- Gateway help texts
- Dashboard indicator widgets vertical layout shape position
- Temperature SVG size issue has been fixed
- Default theme indicator area background
### Changed
- UID placeholder text in add device, sensor and gateway have been changed
- Gateway UID input label has been changed
- Gateway url field show gateway UID
- Dashboard chart widget setting seperated in tabs
### Removed
- GatewayUrl qr code button has been removed

## [0.0.214b] - 2019-08-09
### Changed  
- 'Add building' to 'Add Building'

## [0.0.213b] - 2019-08-08
### Fixed 
- Text (Branch fix text merged)
- GPS location icon has been fixed
- Email address overflow in member territory has been fixed
- None verified email badge UI issue has been fixed
- Gateway url min validation changed to 1
- Gateway IP restriction validation issues have been fixed

## [0.0.212b] - 2019-08-05
### Fixed 
- Fix gateway security issue
- Fix Map widget issue

## [0.0.211b] - 2019-08-04
### Fixed 
- Remove UI attributes from sensor attribute view

## [0.0.210b] - 2019-08-03
### Fixed 
- Add Chart widget minor bug

## [0.0.209b] - 2019-08-03
### Fixed 
- Location sensor data keys

## [0.0.208b] - 2019-08-01
### Added
- Speedy change dashboard theme loading debounce (500ms)
### Fixed 
- Add dashboard, theme issues
- Change dashboard theme issue after submit update form (not working properly because of socket update delay)
### Reverted
- API Naming convention patch (sensor data API)

## [0.0.207b] - 2019-07-30
### Changed 
- Add enable checkbox to http and matt security forms
### Fixed
- Device/Sensor add form minor issues

## [0.0.206b] - 2019-07-30
### Changed 
- Make sensor delete button visible

## [0.0.205b] - 2019-07-30
### Changed
- Fix add sensor form validation
- Hide theme dropdown in dashboard edit mode
### Fixed
- Fix gateway url validation (add disabled state to submit button based on validation)

## [0.0.204b] - 2019-07-29
### Changed
- Remove sensor button
- Fix sensor list rendering performance issue
### Fixed
- Sensor update form top margin
- Live device modal "copyToClipBoard" button variant
- Sensor UID form field place holder text issue

## [0.0.203b] - 2019-07-28
### Changed 
- Sensor add and update form
### Added
- Icon selector component
- Color range selector component
- Color picker component

## [0.0.202b] - 2019-07-24
### Changed 
- Device list page to cards view

## [0.0.201b] - 2019-07-22
### Added
- Dark green theme
- Dark black theme
- Dashboard theme switch

## [0.0.200b] - 2019-07-20
### Fix
- Address autocomplete, 'street_number' concatenated with 'route'
- Move config.js to public
- Move i18n to public

## [0.0.199b] - 2019-07-18
### Removed
- Disable JS source map in production build
- Unwanted manufacturers request
- Remove team dropdown from device pages
### Changed
- Move Uid filed to top of forms
- After update profile route to -1
### Fixed
- Registration page blur caused by captcha
- Load team list and profile ssequence
- Gateway MQTT, IP Restriction

## [0.0.198b] - 2019-07-18
### Fixed
- Card box-shadow typo
- Fix 'Add the first' text decoration
- Member territory update after edit profile
- Avatar ratio
- Fix after remove self from team route
- Make always enable all entities delete button
- Teams cards UI improvement
### Added
- My teams link to profile page
- Floor widget theme

## [0.0.200a] - 2019-07-17
### Added 
- Dashboard Theme

## [0.0.197b] - 2019-07-17
### Fixed 
- Notifications z-index

## [0.0.196b] - 2019-07-17
### Fixed 
- Dashboard bug in update widget
- Dashboard duplicate requests

## [0.0.195b] - 2019-07-11
### Fixed 
- Fix device delete error

## [0.0.194b] - 2019-07-11
### Changed
- Fix add gateway firmware validation

## [0.0.193b] - 2019-07-09
### Changed
- Change nightly adresses to app

## [0.0.192b] - 2019-07-09
### Changed
- Update identity server config

## [0.0.191b] - 2019-07-05
### Fixed
- Merge breanch feat-edit-text

## [0.0.190b] - 2019-06-27
### Fixed
- Change GatewayUrl validation (min: 1, regex: /^\w+$/, max: 50, required: true)
- Add historical data loading to gauge
- Missing icons

## [0.0.189b] - 2019-06-26
### Fixed
- Fix ip restriction regex
- Mobile view workspace pages, sidebar visibility issue
- Add cpu, gpu sesnors default icon

## [0.0.188b] - 2019-06-25
### Added
- Added historical data loading to widgets

## [0.0.187b] - 2019-06-21
### Fixed
- Remove protocol from gateway copy URL
- Gateway URL input placeholder text
- Add team Id to sensor data request
- Fix gateway data API 
- Fix cursor on none link info cards

## [0.0.186b] - 2019-06-21
### Fixed
- Fix gateway live data table issue after gateway added

## [0.0.185b] - 2019-06-21
### Fixed
- Gateway details page live data table bug

## [0.0.184b] - 2019-06-21
### Fixed
- Prevent start socket with pages that have * role
- On add device console error

## [0.0.183b] - 2019-06-20
### Fixed
- Gateway details live table issue after add gateway
- File uploader read file from nightly API

## [0.0.182b] - 2019-06-20
### Fixed
- Gateway add bug in default security 

## [0.0.181b] - 2019-06-20
### Changed 
- Read sensortype URL from config

## [0.0.180b] - 2019-06-20
### Changed 
- Move gateway security parts to separated tabs
- Request count socket integrated with new back end

## [0.0.179b] - 2019-06-18
### Fixed
- Gateway security to new model
- Gateway firmware, info card appearance
- Team namespace, gateway URL checking
- Sidebar issues
- Remove teams and profile link from member territory in workspace manage page
- Team add button hover appearance
- Building gateways list bug
- Gateway add form, URL validation and server side existence checking issues
- Sidebar team name route
- Gateway copy URL input width in gateway details page
- Gateway copy URL right alignment
- Team Authorized users grid, alignment issue
### Changed 
- Profile page container to workspace manager
### Reverted
- Member territory teams link visibility in team list page
### Added
- Phone number to team authorized list

## [0.0.178b] - 2019-06-14
### Added
- Add link to team details info cards
- Add happy tick to namespace field
### Changed 
- Change form labels bottom spacing
- In team details page add namespace: before team namespace string
- Change team namespace field appearance
- Move team to sidebar main content area
- Change after select team route to team details page
- Change sidebar box header size 
- Change Authorized users table appearance minor (changes)
### Removed
- Remove intro link from sidebar 
- Remove edit text from all update pages
- Remove firmware selector if there is only one version to select

## [0.0.177b] - 2019-06-13
### Changed 
- Remove search from firmware selector
- Move namespace field to top pf team add, update forms
- Change root route to team page and redirect /team to /
- Remove unwanted head section from gateway security form
- Update vue2-google-maps to latest version
- In team add/update page, description field moved to end of form
- Remove (Edit) from team update page title
- Change "Authorized User" to "Authorized Users"
- In Search place, set address_1 from route instead formatted_address
- Authorized user layout to grid
- After registration route to new team page
### Fixed
- Gateway security form alignment
- Entities update pages title alignment
### Removed 
- Floor map from team details page building list
- Cancel button removed from add team on adding first team
### Added
- Check namespace functionality
- Check gateway URL functionality
- n/a sensor type icon
- Access level drop down to add user form
- Access level text to member list entity pages
- Background color to form cancel button
- Update date and namespace to teams list cards

## [0.0.176b] - 2019-06-09
###  Fixed
- Gridstack map file warning
- After add team routine
- Icon to team link in sidebar

## [0.0.175b] - 2019-06-08
###  Fixed
- Issues in register user
- Multiple Issues in Entities pages
- Tab style
### Changed
- Add delete text to all delete buttons

## [0.0.174b] - 2019-06-07
### Changed 
- New API model

## [0.0.173b] - 2019-06-03
### Changed 
- Entity page new navigation model

## [0.0.172b] - 2019-05-30
### Changed 
- Update (Dashboard) store to new API

## [0.0.171b] - 2019-05-30
### Changed 
- Update store to new API

## [0.0.170b] - 2019-05-23
### Changed 
- Change nightly API address

## [0.0.169b] - 2019-05-23
### Added
- Workspace selector feature
- Team to header drop-down box
### Removed
- Team from sidebar

## [0.0.168b] - 2019-05-14
### Changed
- Prevent hide selected in multi select
- Show device name in indicator widget instead of gateway name
### Fixed
- Update device state in live device components

## [0.0.167b] - 2019-05-04
### Hotfixed
- Gateway/Device/Sensor update issue 

## [0.0.166b] - 2019-05-04
### Fixed
- Fix gateway changelog bug

## [0.0.165b] - 2019-05-03
### Fixed
- Docs URL

## [0.0.164b] - 2019-04-30
### Removed
- Tour

## [0.0.163b] - 2019-04-25
### Change
- Docs URL to www.ubeac.io/docs
### Removed
- Changelog socket naming convention patch

## [0.0.162b] - 2019-04-18
### Fixed
- Password validation regex
- Sensor icon issue in device filtering component   
- Stop tour in under 1280, on page load and resize    
- After delete device route   
- In Add building/device/sensor, select default from zero index of list
- Toggle key/value header in gateway security HTTP section    
- Dashboard viewOrder field default value bug
- Sensor chart console error
- Gateway copy URL mobile view issue
### Added
- Sound sensor icon
- Entity pages not found state
- Gateway security IP restriction, check IP with regex    
- Add Firmware help box to gateway add/update page
### Changed
- Disable team selector in gateway update page
### Reverted
- Sensor chart page filtering reset

## [0.0.161b] - 2019-04-02
### Changed
- Implement new changelog model, update device request count, fix gateway request count
- Gateway security icon
- Auto select first team in add dashboard page    
### Added
- Gateway report page
- Tour (Need Data)
- Dashboard viewOrder field to add/update pages and apply order to sidebar store list
- Gateway security link box in gateway update/details page
### Fixed
- Dashboard update page help text and link
- Fix device live light no result state
- Gauge rendering issue on 1366px displays
- Device list table, minor UI issue
- Building details floor list minor UI issue
- Gateway list, product link minor UI issue
- Gateway details live data table minor UI issue

## [0.0.160b] - 2019-03-30
### Changed
- Fix DeviceRawData socket channel naming convention

## [0.0.159b] - 2019-03-28
### Added
- URL field to product add/update forms
### Changed
- Dashboard sidebar route when there is no dashboard
### Fixed
- Device simulator console error, and date format
### Removed
- Reset button from admin pages search forms

## [0.0.158b] - 2019-03-26
### Fixed
- In sidebar menu, report link moved after device

## [0.0.157b] - 2019-03-26
### Added
- In dashboard widgets settings, filter devices based on current dashboard related team

## [0.0.156b] - 2019-03-26
### Added
- Dashboard add/update pages
### Changed
- Dashboard link in sidebar, open drop-down menu and route to dashboard list page
- Add/Delete buttons removed from top of dashboard page    
- Team/Building/gateway/device moved to root of sidebar   

## [0.0.155b] - 2019-03-19
### Fixed
- Prevent show resend verification in profile page for verified users
- Sensor chart, tooltip date format    
- Chang sensor chart, default chart to step line    
- Chart widget, tooltip date format
### Changed
- 'Sensor data chart' to 'Sensor chart'
- Edit link in the entity details page moved to the right side and make it always visible    
### Added
- Counter icon
- Alternate color to device simulator request log
- Select and copy URL on click gateway URL text
- Export CSV in sensor data report
### Removed
- String 'Value:' from sensor data report value column
    
## [0.0.154b] - 2019-03-18
### Added
- Hotjar script
### Fixed
- Some minor responsive issues
- Sidebar responsive issues
- Dashboard remove widget modal responsive issues
- Stylelint
- Auto fix eslints
- Move device simulator address to Config

## [0.0.153b] - 2019-03-15
### Fixed
- Address component set postalCode bug
- Order products descending
- Gateway URL form validation issue
- Card title height
- Gateway data table responsive
- Device data table responsive
- Live device list responsive
- EntityInfoCard responsive

## [0.0.152b] - 2019-03-14
### Fixed
- Gateway last request date
- Device summary last request data
- Gauge widget padding issue fixed
- Entitiey details head responsive UI
- Gateway copy url responsive UI
- Admin pages responsive UI
- Sidebar background issue in minimized mode 
- Improve fateway details page Performance    
- Sensor data table responsive
- Sensor data chart responsive
### Changed
- Logout icon
- Improve member territory dropdown UI   
- Update @aspnet/signalr to 1.1.2
- Manage pages responsive
### Added
- Gateway url validation limitation
- New features to Device Tracker widget
- Map theme options to Device Tracker and Map widgets
- Zoom option to Map widget
- Default building selector to Map widget
- Gateway device info UI/UX
- Sensor list to Gateway details page

## [0.0.151b] - 2019-03-12
### Added
- Add danger badge on user avatar in header when email is not verified
- Add validity icon to live device components
- Add alert to member territory dropdown when email is not verified
- Add resend email verification to profile page
- Sensor type sort by viewOrder
- Products sort by viewOrder
- View order field added to product update page
- Tooltip to entityDetailsHead edit btn
### Fixed
-  Grammar
### Changed
- Make logo beta eadge lighter
- Temprature sensor icon
- Move password section in profile page to right sidebar.
- Close multiselect on blur
- Footer ubeac link to ubeac.io

## [0.0.150b] - 2019-03-07
### Added
- Documents link to sidebar
- Auto complete country/province/city/postal_code from google place search result 
  - Docs: https://developers.google.com/places/web-service/details  
### Fixed
- Member badge text spacing
- Make logo BETA badge outline path (fix font issue) and smaller 
- Fix intro titles type
- Intro help icon changed and tooltip added
- Change password page, text 'cancel' replaced with 'back'
- Device filtering from/to inputs group text alignment and smaller width
- Fix entities sensor list icons (custom sensor icon issue)
- Floor details page floor plan map height
- Missing remove gateway from building functionality
- Widget setting s preview size mismatch with preview size
### Changed
- Widget icon
- Sensor Data Chart page, Make chart area full height
- Device live list, make settings button always visible
- Device simulator, move button to bottom of form
- Device simulator, remove `post` from list
- Device simulator, filter multi-value sensors from the dropdown list
- Device Update page, make sensor settings button bigger
- Gateway and device details page live data area header UI (Request count dropdown moved to right)
- Auth pages artwork
### Removed
- Type selector from device live data request preview

## [0.0.149b] - 2019-03-06
### Fixed
- New gateway security data model
    
## [0.0.148b] - 2019-03-06
### Fixed
- Admin pages UI
- Update sensor icon UI
- Add caret to dropdown select
- Gateway live data table page count dropdown styles
- Device delete next route
- baseDataLoaded state for first time users
### Changed
- Gateway details copy url, background added to url area
- Gateway add form, default team picked from zero index of teamList
- No buidling message in team details page
- Make form inputs darker
- gateway manufacrurer section UI
### Removed
- `http://` from gateway copy URL

## [0.0.147b] - 2019-03-05
### Hotfixed
- Fix gateway securty, disable forms on update security, prevent unwanted request.
- Fix gateway security sub components events

## [0.0.146b] - 2019-03-05
### Added
- Google Analytics
- Member avatar to sidebar in md-down sizes
- New desktop member territory box
### Fixed
- Fix default avatar
- Gateway security, disable other form update button during submit one of them

## [0.0.145b] - 2019-03-04
### Fixed
- Fix gateway security console errors
- Fix re-fetch userAssets and device summary after add/remove/update entities

## [0.0.144b] - 2019-03-04
### Changed
- Change Identity Server client_id to UserUIClientRO

## [0.0.143b] - 2019-03-03
### Fixed
- Device filter date buttons UI issue
- Teams sensors list issue
- Device sensor list issue
- Dashboard map widget rendering errors when there is no building
- Admin pages delete entities sequence bug
- File uploader button classes bug
- Firmware datepicker config issue
- Dashborad widget, prevent show connect to data in preview mode

## [0.0.142b] - 2019-03-03
### Changed
- Auth page new Ui
### Fixed
- Gauge widget value font size
- Dashboard link toggle sidebar in mobile view
### Added
- PWA config
- Second field in interval simulator input
- Create time and update date in profile page
- Gauge widget unit
- GetDeviceSummary to prerequisite data fetch
### Removed
- Sensor count section from building/floor/gateway list and details pages

## [0.0.141b] - 2019-02-28
### Changed
- Dashboard update group model new payload schema
### Added
- IoT/GetDeviceSummary to API
- Device details info card 
- Tooltip to dashboad link in sidebar
- Device UID in device details page
- Gateway short details in gateway security page
### Fixed
- Typo denay -> deny
- Gateway security tables layout
- Gateway security ip restriction checkbox to toggle button
- Member territory icon visbility in responsive view
- Delete button disbale mode UI issue

## [0.0.140b] - 2019-02-27
### Removed
- My widget section from dashboard sidebar for alpha version
### Added
- Browser detection package, make browser object persist in app level (in components)
### Fixed
- Dashboard add button visibility in tablets
- Help card texts
- Fix sensor select hover UI issue
- Fix Sidebar long text issue 
- Fix gateway table add button tooltip position issue
- Fix manufacturer logo uploader issue in admi page
- File uploader mobile view width issue
- Device light live list component text truncate
- Device big add button UI issue
- Device multiselect disable mode UI issue
- Live device details model UI issue
- Registration page secandry buttons visibility issue in mobile view 
- Device update page validaiton issues
- Device details page sensor (newly added) icons
- Remove freepik artwork from change password page, replaced with image from streamline
- Fix manufacturer route from `/admin/manufacturer` to `/manufacturer` 
- Fix Indicator dashboard widget long text

## [0.0.139b] - 2019-02-26
### Fix 
- Notification width on mobile
- Gateway securitycard button tooltip
- Admin page card downlaod buttons funcitonality and tooltip
- Cards button width  
- Fix live device link icon in light live device component    
- Remove lorem ipsum from profile help text    
- Fix change password validaiton same as registration
    
## [0.0.138b] - 2019-02-26
### Added 
- Gateway security functionality

# [0.0.137b] - 2019-02-25
### Added 
- Gateway security page and UI
### Hotfixed
- Store inhertance base class issue

## [0.0.136b] - 2019-02-23
### Reverted
- Gateway card header link to details page
### Added
- Recaptcha to registration page
- Password strength validation regex with custom error message
- File uploader to admin panel pages
### Changed
- Add firmware id to device simulator requests `http://http://hub.ubeac.io/gatewayurl?firmware=firmwareId`

## [0.0.135b] - 2019-02-22
### Hotfixed
- Charet duplicate series issue
- Gateway live data body tab scroll issue
    
# [0.0.134b] - 2019-02-21
- Add sensor data chart page

## [0.0.133b] - 2019-02-21
### Fixed
- Hotfix team update validation issue

## [0.0.132b] - 2019-02-20
### Fixed
- Fix file uploader http issue

## [0.0.131b] - 2019-02-19
### Added
- Dashboard widgets settings validation
- Dashboard gauge widget
### Fixed
- Dashboard widgets min width in grid
- Dashboard widget settings preview min width
- Dashboard widgets first setup load data issue

## [0.0.130b] - 2019-02-16
### Fixed
- Datepicker change icon with streamline icon
- Dahsborad loading
- Sensor Data report first load data bug 
- Sensor Data report default date format bug (caused by refactor conventions)

## [0.0.129b] - 2019-02-16
### Added
- Dashboard list page
- Help cards text and doc url
### Fixed
- Sensors icon
- Chart label visibility
### Changed
- No result icon (change with streamline icon)
### Removed
- Some deprecated files from public

## [0.0.128b] - 2019-02-15
### Added
- Sensor card to device details page
### Fixed
- Device live data table columns like sensor data
- Fix dashboard maps centering issues
- Chart widget margin and padding
- Building map set position by drag marker
### Added
- Gateway URL Form and prevent start with ubeac/momentaj
### Changed
- Footer year to 2019

## [0.0.127b] - 2019-02-14
### Changed
- API address to https
- Sensor badge color
### Fixed
- Fix remove modals button style
- Add details link icon to device list page
- Google Maps Controls size
- Notifications UI
- Profile page UI
- Input disabled focus state
- Confirm register icon UI
- Add Icon to intro cards
- Fix intro card Urls
- Auth pages input UI
- Device header responsive
- Add and update form page responsive
- Entity details header responsive
- Device details responsive
- Data similator responsive
- Widget list responsive
- Authorized user new UI
- Gateway data table modal details UI and responsive
- Header responsive
### Added
- Socket authentication
- Profile and Logout link to sidebar menu in mobile and tablet size

## [0.0.126b] - 2019-02-13
### HotFixed
- Sensor type load issue

## [0.0.125b] - 2019-02-12
### Fixed
- dahsboard widgets setting preview UI
- Indicator widget settings form UI
- Indicator widget settings shape (connect to live data)
- Fix indicator theme
- Secondary and success button color on the active state
### Changed
- Dsashboard Buttons Style
- Sidebar item and minimizer color
- Move asset tracking nav to the kitchen root menu
### Removed
- Method column from device live data table (at the moment, we dont have access method in device socket)

## [0.0.124b] - 2019-02-11
### Added
- Nightwatch.js screenshots
### Fixed
- Gridstack multiselect scrol bug
- Sensor data auth issue
- Dashboard UI fixes 
- Highcharts version
- Add npx dev script
- Fix bootstrap resourcesa
- Try to fix build performance issue
- Dashboard widget settings modal UI issues
- Sensor data UI
- Asset tracking below the kitchen in navbar
- Device filtering UI
- Header menu UI
- CopyUrl btn style
- Sidebar minimizer UI

## [0.0.123b] - 2019-02-09
### Added
- New firmware selector component
- Intro card

## [0.0.122b] - 2019-02-05
### Added
- request protocol column in gateway live data
### Fixed 
- Gateway live data table modal device section visbility issue

## [0.0.121b] - 2019-02-05
### Changed
- Sync admin pages with new UI
- Works sensor, member componenets
- Fix minor issue in list pages
- Fix favicon issue

## [0.0.120b] - 2019-02-03
### Added
- Device details page component
- Device live data table component
- Device data simulator component
### Changed
- Page profile drop down style
- Add/Update pages layout (help box added)
- Gateway/Device details page new ui
- Gateway live data table UI

## [0.0.119b] - 2019-01-30
### Added
- beta badge to panel logo
- straem lines icons 
### Changed
- Main font size to Open Sans
- Apply new theme color to main layout
### Removed
- remove unwnated core-ui logo file
- Sidebar toggle from header
### Fixed
- fix logo SVG preview issue

## [0.0.118] - 2018-12-21
### Fixed
- Fix manufacturer route
- Manufacturer/firmware cards list height issue
- Fix product manual download link
- Fix manufacturer website link

## [0.0.117b] - 2018-12-20
### Fixed
- i18n warnings
- duplicate route
- product cards list height issue

## [0.0.116b] - 2018-12-20
### Added
- Admin panel pages
    
## [0.0.115b] - 2018-12-20
### Fixed
- Router check roles issue
- Remove widget need comletion mode shadow

## [0.0.114b] - 2018-12-19
### Refactored
- Rename deviceFilter to sensorFilter
### Change
- Access to leave untouched dashboard

## [0.0.113b] - 2018-12-19
### Refactored
- Widgtes structure and mixins
### Fixed
- Sidebar permissions
### Changed
- File uploader (remove picture input)
### Removed
- Cleanup old widget files and mixins

## [0.0.112b] - 2018-12-14
### Fixed
- Map gateway name ui issue
- Side bar buttons ui issue

## [0.0.111b] - 2018-12-14
### Fixed
- Router duplicate name fix
- building add/update form team validation
### Added
- Ability to validate child components
- Components kitchensink

## [0.0.110b] - 2018-12-13
### Hotfix 
- Multi Tracker ui issue
- Fix custom widget default code
- Fix asset tracking release issue
- Device filtering calendar icons ui issue
- Asset Tracking report column team/floor issue
- Gateway details page, no request state, info box ui issue
- Remove CircleGraph from map compoenent
- Floor selector bugs

## [0.0.109b] - 2018-12-13
### Hotfix 
- Remove Unwanted pre from add team page
- Remove Text widget from widgets list

## [0.0.108b] - 2018-12-12
### Added
- Add first async component example
- Add ComponentContainer component and used as parent element in other components
- Box-shadow to setting.scss file
- AddressForm component
- Border-radius to setting.scss file
- Rgba color to setting.scss file
### Fix
- Route convention in auth, device live, floor pages
- Cleanup sass file
- Bug in add new gateway
### Change
- Renavme Graph to Indicator

## [0.0.107b] - 2018-12-10
### Fixed
- Filter time button alignment 
- Fix buildingBigCard address

## [0.0.106b] - 2018-12-09
### Fixed
- Profile page
- Minor UI issues

## [0.0.105b] - 2018-12-09
### Added
- Upgrade to VUE CLI 3, node stable v9.10.0
- Custom font icon geneartor
- Add entities mixin that contain all getters and action around entities
- Add entitiesAdd mixin 
- Add entitiesUpdate mixin 
- Add entitiesDetials mixin 
- Add firmewar selector component
- Add store entity module base getters class (DRY store modules getters)
### Changed
- Dry entites add/update/details pages with mixins
- Remove all unused states/getters/actions/mutations from store modules
- Remove all entity list state from store (replace with return list from dict) 
- Cleanup direct usage of $store.getter in compoenents
- Cleanup from old 'tag' entity name
- Rename Organization to Team
- Rename Card to Widget
- Rename Gateway to Product
- Rename GatewayFirmware to Firmware
- Rename Tag to Device
### Removed
- JSON.decycle completely removed from vue componenets after Refactor store
- '/static/img/' from project and replace with ${imageBaseUrl}
- Old tag folder from component
- Old tag store module
- Doc folder from root
- Deprecated files from store and other folders
### Fixed
- Compoenents naming
- Replace all class card and its subcategories to b-card and its subcategories
- Replace all button tag to b-button tag
- Replace all form tag to b-form tag
- Replace all a tag to router-link tag
- Replace all col-12 and etc to b-col tag
- Date filter from global config

## [0.0.102b] - 2018-12-04
### Fixed
- Resolve i18n/router console warnings
- Load sensor data async
- Minor style lint errors
- Minor spell lint errors
- Router label i18n

## [0.0.101b] - 2018-12-02
### Added
- Prevent leave unsaved dashboard
- Socket status component (currently its not added to views)
### Fixed
- Error icon UI in gateway live data component
- Add no result message to device tab in gateway live data component (No device is detected in this request)
- Format convention in gateway live data component
- Gateway live data typo (Request > Requests)
- Gateway live data socket status icon active mode background
- Gateway update page, building field binding issue
- Add Device page button loading state after errors
- Team details page, sensors section
- Some route naming issues
### Changed
- Organizaiton name and routes to "team"
- Endpont name and routes to "gateway"
- Gateway name to "model"
- Gateway Firmeware name to "Firmeware"
- Cards name to "widget"
### Removed
- Old fake-tracker dashboard card
- Remove 'selected' text from forms

## [0.0.100b] - 2018-11-29
### Added
- Text card html editor

## [0.0.99b] - 2018-11-29
### Added
- Device tracker card

## [0.0.98b] - 2018-11-26
### Removed
- Last seen column from device manage grid
### Added
- Duration column to asset tracking report
### Changed
- Move asset tracking nav to root menu

## [0.0.97b] - 2018-11-26
### Changed
- Make disable cluster option in floor plan map

## [0.0.96b] - 2018-11-26
### Fixed
- Asset tracking report page integrate with new device model
### Added
- Asset selector to device filtering component

## [0.0.95b] - 2018-11-24
### Fixed
- Asset tracking manage page integrate with new device model
- User icon on team usersForm issue
- Profile and lock icons in auth pages and header dropdown

## [0.0.94b] - 2018-11-23
### Hot-fixed
- Floor plan card first add preview issues

## [0.0.93b] - 2018-11-23
### Hot-fixed
- Floor plan pulse effect issue with device timing

## [0.0.92b] - 2018-11-23
### Added
- Component Leaflet floor plan
- Component Floor selector 
- Component Floor plan dashboard card
- Indicator Beam
- Edit button to entity pages
- Loading state for floor plan upload
- Empty state for the dashboard and my cards list
### Fixed
- Delete and save Icons on the new version of Font Awesome and moved to icon component
### Changed
- Update font-awesome v5 and improve icon rendering model
- Device grid update time format to relative

## [0.0.91b] - 2018-11-17
### Added
- DeviceUid dictionary in device store module
- Live device page (add/update functionality)
- Exceptions tab to gateway live data details modal
- Define row with exceptions in data grid (gateway live data)
- Delete button to device update page
### Changed
- Gateway live data count to 20
- Gateway live data details modal "Sensors" tab changed to "Devices"
- Backgroun-color of auth page green button of right side
### Fixed
- Auth page icons alignment in mobile
- Live devices page icons alignment

## [0.0.90b] - 2018-11-14
### Hot-Fixed
- Fix team column in Sensor data grid (after organizaiton removed from
    sesnor data)

## [0.0.89b] - 2018-11-14
### Added
- Series Icon to series selector if exist
### Fixed
- Team users list (based on permission list)
- Fix tooltip issue when drag card from sidebar
- Gateway dataTableLive details no-result state alignment
- Update device sensor when prefix become null
- Sensor data random console error
- Userassets model generate, restriction (console error on first app view)
- Device filtering, clear device multiselect error
- Issue with select item in multi-select after search (card settings modal)
### Changed
- Load sensor schema from sensor "attributes"
- New Dashboard card neddCompletion state UI
- Hide dashboard pause/play button when there is no cards

## [0.0.88b] - 2018-11-13
### Fixed
- Asset tracking moved to kitchen
- Chart data count to 1000
- Add and update device success message
- Update team submit button disable state
- Handle after remove self from team
- Floor plan size (2x) in gateway Add/Update pages
- Dashboard card settings layout bug with sidebar menu (in hide or minimize
    states)
- Sidebar menu header background color
- Sidebar menu icon layout bug in minimize state
- Wrong GPS sensor icon 
- Dashboard cards accordion state change (goes to collapse state) bug on open card setting
- grid stack issue with add card to bottom of grid (clone main project, merge
    fixed branch (WiktorStarczewski)
- Clean up deviceUid from device filtering that cause cant select Device with
    same Uid
### Reverted
- Gateway column to sensor data page
- improved the confirmation dialog to delete dashboard card
### Removed
- Data count from chart setting UI
- Add gateway wizard from Intro page
- Top-right spinner loading
- Cleanup deprecated dashboard cards
### Added
- Card description to the tooltip of cards in dashboard cards list
- Welcoming to intro
- Profile page update button disable state
- Disable state to update button profile form
### Changed
- Route to gateway details page after Add/Update gateway
- Device page section separation
- Sort my cards list by name
- Sort multi-select device by name
- Add and update gateway page floor plan size
- Dashboard card list background color
- Login word to Sign in

## [0.0.87b] - 2018-11-11
### Fixed
- Add series typo
- Card default name and default description UI
- GPS sensor icon
### Removed
- Indicator card reasonless 'Details'
### Reverted
- SidebarMinimizer and fix background color

## [0.0.86b] - 2018-11-10
### Fixed
- Add tooltip to buttons in device pages
- Device page table header UI
- Remove serie btn UI
- Console error in first visit panel
- Console error of chart live on add first sensor
### Added
- Add device page submit btn loading state
- Description to update sensor device
- Gateway dataTable details btn tooltip

## [0.0.85b] - 2018-11-10
### Fix
- Dashboard chart card first setup issues
- Issue in device selector with device without type
- Fix gateway isssue with device without type
## Change
- Chart handle multi series from single sensor

## [0.0.84b] - 2018-11-10
### Changed
- Add more data to sensor data grid
### Fixed
- typo in forgot pass

## [0.0.83b] - 2018-11-09
### Fixed
- SensorTypes json issue
- Add Custom sensor console error

## [0.0.82b] - 2018-11-09
### Added
- types/units/prefixes/sensorUnits data to store sensor module
- New sensor meta data model to store sensor module
- Load sensor schema from IoT/GetSensorData
### Fixed
- Issues caused by new sensor data model

## [0.0.81b] - 2018-11-08
### Fixed 
- Gateway details valid data preview
- Device update page hide unwanted fields
- Device list page minor UI
### Reverteded
- Device filtering find/reset button in historical mode

## [0.0.80b] - 2018-11-08
### Fixed 
- Device page grid headers
- Fix xAxis missing ordinal: false options, that cause many rendering bugs in
    new highchart version
### Reverted
- Dashboard chart card time range/data count settings
### Changed
- Add date filtering to new filtering device componenet
- Socket data from deviceUid to deviceId
- Device update layout

## [0.0.79b] - 2018-11-07
### Added 
- Manage device pages
### Changed 
- Device Filtering model integrated with new device/sensor model
- New Sensor Data socket model
- Sensor Data filtering compoenent (unfinished)
- Device/Sensor store modules
- Series selector integrated with new device/sensor model
### Removed
- Right sidebar footer and minimizer box

## [0.0.78b] - 2018-10-30
### Changed
- Chart card point date format tooltip
- Chart card zooming to disable
- Table header background
- Move indicator min-max to last of settings
### Added
- New device selector component
- Chart card config grid background
- Chart card config Step Line type
### Fixed
- Dashboard issues with grid stack and two way data binding
- Dashboard text card preview update issue
- Update vue-multiselect to 2.1.3 (fix z-index issue)

## [0.0.77b] - 2018-10-28
### Removed
- Dashboard reset/preview buttons
### Changedd
- Prevent refresh dashboard on save
- Dashboard aside UI
- Card settings form UI
### Added
- Cancel functionality to dashboard card setting modal
### Fixed
- Fix dashboard Edit mode cancel functionality, Now when we click on dashboard
    edit mode cancel button if we didnt save dashboard dashboard reset to last saved
    state
- Dashboard sidebar search isssue (after search in cards, cards cant drag to page)

## [0.0.76b] - 2018-10-27
### Changed
- Dashboard sidebar UI
- New card settings modal UI
- New Breadcrumbs UI
### Added
- Card icons

## [0.0.75b] - 2018-10-24
### Fixed 
- Dashboard map card blink bug
- Entity pages unwanted maps

## [0.0.74b] - 2018-10-24
### Changed
- New store data model applied to all store modules
- Cleanup userassets store module
- Cleanup assets store module
- Cleanup userassets/assets store modules usage in entity pages
- MapGeo zoom in building
- Map floor layout
### Removed
- None live cards
- Right sidebar button (header)
### Fixed
- Gateway live data table header ui issue
- Gateway without building issue
### Added
- Cart map
- Building and gateway on Geo map with Tooltips
- Change gateway color based on socket data

## [0.0.73b] - 2018-10-23
### Changed
- Store data model
### Added
- Add console log for check data model

## [0.0.72b] - 2018-10-22
### Changed
- Grid pages header hieght, button size, background-color
- Change Tag name to Device (only in Live Device page)
- /device/manage to /device/live-devices
- Text change on filtering box (add (s) to labales for more clarification)
- Add Team/Building/Floor/Gateway name to Live Device Table

## [0.0.71b] - 2018-10-21
### Changed
- Live device component fifo
- Live device componenet connect to filtering box

## [0.0.70b] - 2018-10-20
### Added
- Live devices component
### Fixed
- Sidebar size in xl view
### Hotfix
- Building update page data

## [0.0.69b] - 2018-10-19
### fix
- card live chart series issue
- charts unwanted unit in yaxis

## [0.0.68b] - 2018-10-19
### fix
- gateway data console error

## [0.0.67b] - 2018-10-18
### Added
- Chart Series selector component with basic UI
- multiple imporve in socket mixin
### Changed
- Chart date format on tooltip
- Chart background to grid background

## [0.0.66b] - 2018-10-16
### Added
- Basic IndicatorLiveCard (Socket)
- Basic ChartLiveCard (Socket)
- Gallon and Signal indicator
- Border top to Gateway page sidebar box
### Removed 
- '>' unwanted character from Sensor Data page
- Remove paging from top of all pages
### Changed
- Filtering model layout
### Fixed
- Export functionality on firefox

## [0.0.65b] - 2018-10-12
### Added
- Magnet and Drop indicator
### Fixed
- Indicator color state
- Gateway DataTableLive component UI

## [0.0.64b] - 2018-10-11
### Added 
- Add Ednpoint DataTableLive Component, Socket.
- Add Socket Sample test page under kitchen menu 'kitchen/socket-test' 

## [0.0.63b] - 2018-10-9
### Added 
- Tag manage page under kitchen menu '/device/manage' (unfinished)
### Fixed
- Asset report bug
### Changed
- Style of grid page same as device manage page

## [0.0.62b] - 2018-10-8
### Added
- Socket join group ability 

## [0.0.61b] - 2018-10-8
### Added
- Socket test page /kitchen/socket-test

## [0.0.60b] - 2018-10-6
### Hotfix
- Disable chart animation

## [0.0.59b] - 2018-10-1
### Changed
- Enable assets multiselect in sensor filtering components in Asset Tracking
    pages

## [Unreleased]
### Fixed
- Style lint errors
- Spell lint errors
### Changed
- Chart data, add fromDate param to first request, set first request pageSize
    to hard code 1000

## [0.0.57b] - 2018-09-29
### Changed
- Chart data loading model
### Fixed
- Sensor value type text capitalized
- Clean up duplicate values from i18n
- Sensor data page table responsive

## [0.0.56b] - 2018-09-28
### Added
- Asset tracking report (/asset-tracking/report)
- Sensor data popover inside sensor data grid in SensorData page
### Changed
- Grid columns title
- card filtering data sensor types select UI

## [0.0.55b] - 2018-09-28
### Added
- i18n

## [0.0.54b] - 2018-09-28
### Added
- Asset tracking manage scenario

## [0.0.53b] - 2018-09-25
### Added
- Tooltip to dashboard card button
### Changed
- Add new dashboard issue (404 error)
### Fixed
- Fix chart data loading bug
- Breadcrumb button UI

## [0.0.52b] - 2018-09-25
### Changed 
- New dashboard card data loading model (from timeout series to interval)
### Fixed
- Breadcrumb button UI

## [0.0.51b] - 2018-09-24
### Hotfix
- Change sidebar background color
### Fixed
- GridStack Issues with update card data and reset
- Chart settings modal opening lag
- Chart add data to series bug
- Ability to add sensor type to filtering from grid
- Map fullscreen issue and enable control
- Indicator latency value
### Added
- Chart card select sensor value types

## [0.0.50b] - 2018-09-24
### Fixed
- Indicator select sensor value types issue
- Gridstack issues after save and reset, make better integration with
    grdistack
- Chart range selector (10 second and 1 minutes button added)
- Prevent save dashboard after remove needCompletion cards
- Chart card preview height
- Text card show modal on connect to data btn
- Chart config navigator typo
- Highstock yAxis alignment to left
- Minor fix on card UI toolbox icons
- Dashboard pause issue
### Added
- Ability to add deviceUid/gatewayId to filtering from grid
- Scrollbar config to chart config
### Changed
- Card settings modal selectSensor to selectTag

## [0.0.49b] - 2018-09-22
### Changed
- Add sensor schema support to dashboard indicator/chart card
### Fixed
- Temporary test of sensor-type API CORS issue

## [0.0.48b] - 2018-09-21
### Fixed 
- Dashboard route change bug
- Minor fix on indicator UI in small screens
- Gateway details table export typo
### Added
- TagUid to dashboard indicator card
### Changed
- Dashboard cards data loading model to sync requests (Performance seems much better)
- Minimum request interval to 1ms (because of changing data loading model its
    work cool)

## [0.0.47b] - 2018-09-21
### Added
- Chart card config generator
- Chart LastIn/FirstOut
- Sensors icon
- Highstock
- Map Tracker Line

## [0.0.46b] - 2018-09-18
### Added
- Dashboard delete functionality
- Latency value in Indicator card
### Changed
- Indicator update value to sensor lastUpdateTime

## [0.0.45b] - 2018-09-17
### Hotfix
- Dashboard card setting modal bugs

## [0.0.44b] - 2018-09-17
### add
- reset functionality to dashboard edit mode
- pause functionality to dashboard
- no data! when there is no data in card
### fix
- indicator setting modal issue on first opening
- clear dashboard states before destroy (edit mode button state persist issue)
- dashboard cards list responsive view
- connect to data mode
- card style when dragging
- minor alignment issues uin dashboard
### change
- dashboard, prevent close card settings modal by click on back layer
- indicator card min/max settings ui

## [0.0.43b] - 2018-09-15
### Added
_ Decimal places setting to indicator card
- Update dashboard on card remove
- Export 100,000 request log (There is button but it doesn't work properly)
### Reverted
- Sensor data filtering button in card data tab
### Fixed
- Remove date param from sensorData/getTagSummary requests
- Force load staticCount of data in sensor filtering in dashboard card modal data tab
- Light indicator update issue
- Update preview mode settings text card

## [0.0.42b] - 2018-09-14
### Added
- Basic Version of card tracker (Map)  with mock data
- Indicator range support
- Chart type config in ChartCard
- Legend visibility config in ChartCard
- Tags filtering form search on change
- Loading state to devices tab
- Handle card chart data and resolve Highchart erros
- Multiple config to devices filtering component for reusablity
- Live config update to highchart for using in ChartCard
### Removed
- Card indicator modal: "card" in Indicator tab
### Fixed
- Filtering date format (issue after deprecatr z/zz formatter)
- Sensor data tooltip typo
- Move all dashboard requests to dashboard store module
- OK text in the modal btn to submit

## [0.0.41b] - 2018-09-12
### Fixed
- Fix Existence typo

## [0.0.40b] - 2018-09-12
### Added
- Add new asset page
### Changed
- TagExistence Moved from Report to Asset Tracking

## [0.0.39b] - 2018-09-12
### Changed
- Move device tab to first in all dahsboard cards
- Top text of dashboard card to card name
### Removed
- Last req: label from enpoint card, and make lastRequestDate text smaller
### Reverted
- Chart view in Sensor Data page
### Fixed
- UI of card instanceView inside card setting modal
- Floor edit page console error

## [0.0.38b] - 2018-09-11
### Removed
- Chart view from Sensor Data page
- Dashboard Card Loading
- End/elleipsise/first button from Sensor Data pagination
### Changed
- Sort Gateways list by name
- Show Full date in gateway lastRequestDate
- Gateway requestCount comma separated
### Fixed
- Remove duplicate of / in GetTagSummry API

## [0.0.37b] - 2018-09-11
### Added 
- Add dashboard name to breadcrumbs
- Basic Version of card chart
### Changed
- Dashboard page header UI minor change
### Fixed
- Reload interval after refreshTime update
- Prformance issue of card instanceView mode

## [0.0.36b] - 2018-09-10
### Added
- Basic Version of card grid

### Changed
- Some changes on Card Structure

### Fixed
- Clean unwnated settings

## [0.0.35b] - 2018-09-09
### Fixed 
- Add loading to sensor dfata filtering
- Card Sensor data filter issue with select new filters
- Fix card needCompletionMode state after settings changed
- Fix Card Setting parse console silent errors
- Fix disable nprogress in dashboard page
### Removed
- Date shortener and toDate from sensor data filter inside card modal

## [0.0.34b] - 2018-09-09
### Added
- Add 'Tag Existance' page '/deviceexistenceview'
- Card default width/height
- Remove card confirm modal (in 'needCompletionMode' card state, cards remove
    whitout confirm)
- Card Toolbox Component
- Card Wizard functionality
- Indicator Basic versions
- Basic version of card with sensor data (IndicatorCard)

### Changed
- Dashboard card draggable from button to whole card area
- Disable grid Stack in None 'editModea' mode
- Basic Version of card indicator


- Clear Every thing after login and logout by refreshing page
- Fix Sensor Data paging filter bug
- Fix modal UI issues

## [0.0.33b] - 2018-09-05
## Add
- Dashboard GridStack first version

## [0.0.32b] - 2018-09-04
## Change
- Move 'Sensor Data' link under 'Reports'

## Remove
- Remove request to IoT/GetPivotSensorData in sensor data page

## [0.0.31b] - 2018-09-04
## Change
- Gateway data API changes
- First version of dashboard card setting (only initial things)

## [0.0.30b] - 2018-09-03
### Added
- Preview button to dashboard edit mode

### Changed
- Move dashboard Add/Save/Edit buttons to breadcrumbs area
- Show dashboard card toolbox only on hover and editMode
- Fix 'Dashboard' to 'Dashboards' in breadcrumbs
- Cards button toolbox UI
- Minimize add dashboard button text and add icon

### Fixed
- Drag and drop duplicate cards data issue

### Removed
- Remove icon before dashboard name
- Remove details tab from dashboard sidebar

## [0.0.29b] - 2018-09-02
### Fixed
- Fix some ui issue

## [0.0.28b] - 2018-09-01
### Added
- Lazy load support to sidebar nav (dashboard)
- SidebarNavLazyList component
- DashboradItem component and route
- Dashbaord Drag and Drop functiinality
- Dashboard Cards functionality
- Implement first basic dashboard card component
- Implement Dashboard sidebar

### Fixed
- redundant requests in entity pages (teams, buildings, floors)

## [0.0.27b] - 2018-08-29
### Changed
- Api route changes

## [0.0.26b] - 2018-08-27
### Changed
- Change gateway icon in floor map

## [0.0.25b] - 2018-08-27
### Added
- Add /devicesdata route and Tag Data component

### Changed
- Some minor UI change on Sensor Data
- Column order in SensorData and EdnpointRequestDetails table
_ Enable devtools in production mode

## [0.0.24b] - 2018-08-26
### Added
- Add Export Button to SensorData grid

### Changed
- Improve Sensor data filtering component
- Last time shorthands always set as Real time

## [0.0.23b] - 2018-08-25
### Fixed
- Fix sensor name in gateway request details

## [0.0.22b] - 2018-08-25
### Added
- New route /asset
- Implement asset add/update/release functionality

## [0.0.21b] - 2018-08-24
### Added
- Add tooltip to qr-code/clipboard buttons in GatewayCopyUrl
- Add Export button to sensor details in GatewayDataTable component modal

### Removed
- Remove Footer from Qr code modal
- Remove 'Copy' string from clipboard button
- Remove Floor plan from Gateway card list
- Remove 'Add New Floor' button from Building card list

### Changed
- Move back floor plan to sidebar in Gateway details page
- Change Qr modal title to gateway name
- Move refresh button of GatewayDataTable component to right side

### Fixed
- Gateway details data table ui issue
- Sensor data issues with (Type changed to type)
- Gateway data table modal ui issue
- Gateway data table filtering issue


## [0.0.20b] - 2018-08-23
### Fixed
- Performance issue
- Sensor data page console errors

## [0.0.19b] -  2018-08-23
### Added
- Add Gateway data list component with Export, Refresh and details modal ability
- Add highlight component (used in Gateway data list component)
- Add RequestView component (used in Gateway data list component)
- Add request count of sensor in sensors badge in all details pages
- Add sensors count to gateway card
- Add related team members list to gateway details page
- Add gateways marker to floor plan in building details page
- Add team/building/floor breadcrumbs in all entity pages
- Add new API "GetSensorDataByGatewayDataId"
- Add google place service to building address field and sync it into geo map

### Changed
- Floor pin map icon
- Gateway details page UI
- Gateway card list UI
- Minor change on image uploader UI
- Change 'Plan Image' label text to 'Floor Plan'
- Change Geo map style to terrain
- Change Default map center position to uBeac headquarter office

### Removed
- Remove numeral formatter from big numbers

### Fixed
- Fix index color loop
- Fix uploader alignment
- Fix floor map centering issue in building details page
- Fix floor map zoom and background styles

## [0.0.18] - 2018-08-22
- Add default team after registration
- Move unchecked pages under kitchensink menu
- Complete team details UI
- Complete team card UI
- Some fix on team uupdate UI
- Change body bg color to #EBECEC
- Add multiple component that used in entity pages
- Complete Building card UI
- Complete Floor card UI
- Complete Gateway card UI
- Improve assets store module
- Readable placeholder color

## [0.0.16] - 2018-08-18
### Changed
- Hotfix clipboard console error

## [0.0.15] - 2018-08-16
### Changed
- Hotfix default route
- Check Api response for null (to produce no result our api return null in data)

## [0.0.14] - 2018-08-16
### Changed
- Hotfix sensor data page console errors

## [0.0.13] - 2018-08-16
### Changed
- Hotfix sensor data page console errors

## [0.0.12] - 2018-08-16
### Changed
- Hotfix remove buildings map until fix all issues in ketchensink
- Fix building map state in add building

## [0.0.11] - 2018-08-16
### Changed
- Hotfix first time add organizaiton assets error

## [0.0.10] - 2018-08-16
### Changed
- Hotfix moment deprecation warning
- Hotfix team users form, prevent submit by Enter and refresh page

## [0.0.9] - 2018-08-16
### Changed
- Hotfix floor map issue, (leaflet styles issue when referenced from node_modules)

## [0.0.8] - 2018-08-16
### Changed
- Hotfix team empty list error

## [0.0.7] - 2018-08-16
### Changed
- Fix functionality issues in entity pages
- Fix functionality of maps
- Resolve console errors
- Make add card visible only if there is no item

## [0.0.6] - 2018-08-15
### Changed
- hotfix merge issue

## [0.0.5] - 2018-08-15
### Changed
- Team details page (Basic UI)
- Building details page (Basic UI)
- Floor details page (Basic UI)
- Gateway details page (Basic UI)
- Add Dashboard routes

## [0.0.4] - 2018-08-14
### Changed
- Team details page basic UI

## [0.0.3] - 2018-08-14
### Added
- Geo Map Improvement
- Leaflet floor map
- Team details page (Basic UI)
- Building details page (Basic UI)
- Floor details page (Basic UI)
- Gateway details page (Basic UI)
- Store Improvement

## [0.0.2] - 2018-08-11
### Added
- Floor map to gateway add, update and wizard components
- Floor image is required from this version (its not required in server side)
- Check entities form dirty state to disable Submit button
- More details to entities cards
- Tags count added to team, building, gateway and floor cards

### Changed
- Fix redundant requests
- Fix store convention for team, building, gateway and floor modules
- Team users, check last user instead current user

### Removed
- Remove profile link from sidebar, its accessible from top right member territory menu
- Team delete button hint text

## [0.0.1] - 2018-08-9
### Changed
- Fix Login automatically after registration
- Fix Reset-password route authentication validator
- Fix Profile page UI,update website field
- Fix Form selected data in update team,building,floor pages
- Add category and category version card property in addFormWizard
- Fix map google layer
