<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list page-dashboard pt-0">
      <fullscreen
        ref="fullscreen"
        @change="fullscreenChange">
        <AppAside>
          <div
            class="dashboard-component-side-bar">
            <!--<div class="input-group dashboard-component-side-bar--search">-->
            <!--<b-form-input-->
            <!--v-model="searchWidgetsQuery"-->
            <!--:placeholder="$t('general.search_here')"/>-->
            <!--<div class="input-group-append">-->
            <!--<span class="input-group-text" >-->
            <!--<icon name="search" />-->
            <!--</span>-->
            <!--</div>-->
            <!--</div>-->
            <div
              v-if="WidgetsComponentsList">
              <h6 class="px-3 my-3 text-muted">
                {{ $t('dashboard.widgets') }}
              </h6>
              <b-card
                v-for="(item, index) in filteredWidgetsList"
                v-if="!deletedWidgets.includes(item.type)"
                :key="index"
                :id="`widgetsTooltipButton${index}`"
                :data-widget="JSON.stringify(item)"
                :data-default-width="item && item.widget ? item.widget.defaultWidth :
                2"
                :data-default-height="item && item.widget ? item.widget.defaultHeight
                : 2"
                style="min-width: 160px;"
                class="mb-3 mx-3 pointer w-auto dashboard-widget-raw grid-stack-item cloned-widget"
                data-gs-width="1"
                data-gs-height="1">
                <div class="widget-details px-2 text-nowrap">
                  <span class="mr-3 h4 card-icon-area text-center">
                    <icon :name="item.widget.type"/>
                  </span>
                  <span class="card-text-area">
                    {{ item.widget.listTitle }}
                  </span>
                </div>
              </b-card>
              <span class="w-100 text-numb text-center d-block h6" >
                {{ $t('messages.drag_widget') }}
              </span>
              <!--<b-card-->
              <!--v-if="Config.myWidgetsEnable"-->
              <!--no-body-->
              <!--class="no-shadow mb-0 dashboard-component-side-bar--accordion">-->
              <!--<div-->
              <!--class="p-0 dashboard-component-side-bar--accordion-item"-->
              <!--role="tab">-->
              <!--<b-btn-->
              <!--v-b-toggle.myWidgetAccordion-->
              <!--block-->
              <!--class="no-radius"-->
              <!--href="#">-->
              <!--{{ $t('dashboard.my_widgets') }}-->
              <!--</b-btn>-->
              <!--</div>-->
              <!--<b-collapse-->
              <!--id="myWidgetAccordion"-->
              <!--accordion="myWidgetAccordion"-->
              <!--visible-->
              <!--role="tabpanel">-->
              <!--<b-card-body-->
              <!--v-if="myWidgetsListRaw"-->
              <!--class="pt-2 p-0 pb-5">-->
              <!--<template-->
              <!--v-if="filteredMyWidgetsList.length == 0">-->
              <!--<p class="p-3 text-light-muted text-center">-->
              <!--There is no widget added yet!-->
              <!--<br>-->
              <!--Please add new widget-->
              <!--</p>-->
              <!--</template>-->
              <!--<template v-for="(item, index) in filteredMyWidgetsList">-->
              <!--<b-col-->
              <!--v-if="validateComponentType(item.type)"-->
              <!--:key="index"-->
              <!--:id="`myWidgetTooltipButton${index}`"-->
              <!--:data-widget="JSON.stringify(item)"-->
              <!--:data="item"-->
              <!--:data-default-width="item && item.widget ? item.widget.defaultWidth :-->
              <!--2"-->
              <!--:data-default-height="item && item.widget ? item.widget.defaultHeight-->
              <!--: 2"-->
              <!--cols="12"-->
              <!--sm="6"-->
              <!--md="4"-->
              <!--lg="12"-->
              <!--xl="12"-->
              <!--class="mb-3 dashboard-widget-raw grid-stack-item cloned-widget">-->
              <!--<b-tooltip-->
              <!--:target="`myWidgetTooltipButton${index}`"-->
              <!--boundary="viewport"-->
              <!--placement="left">-->
              <!--{{ item.widget.description }}-->
              <!--</b-tooltip>-->
              <!--<div class="widget-details px-2 text-nowrap">-->
              <!--<span class="mr-1 card-icon-area text-center">-->
              <!--<icon :name="item.widget.type"/>-->
              <!--</span>-->
              <!--<span class="card-text-area">-->
              <!--{{ item.widget.name }}-->
              <!--</span>-->
              <!--</div>-->
              <!--</b-col>-->
              <!--</template>-->
              <!--</b-card-body>-->
              <!--</b-collapse>-->
              <!--</b-card>-->
            </div>
          </div>
        </AppAside>
        <RemoveEntityModal
          :item="underRemoveItem"
          action="dashboard/delete"
          @cancel="onRemoveCancel"
          @success="onRemoveSuccess"/>
        <div class="dashboard-plot-area">
          <div class="page-content-header">
            <div class="float-left">
              <icon
                name="dashboard"
                class="page-content-header--icon mr-1 float-left"/>
              <!--<template-->
              <!--v-if="false">-->
              <!--<editable-->
              <!--:editable="editMode"-->
              <!--:content="dashboardItem.name"-->
              <!--class="card-text page-entity-list--main-title h3 ml-1 mt-1 bold float-left"-->
              <!--@update="dashboardItem.name = $event"/>-->
              <!--<span v-if="_dashboardById"/>-->
              <!--</template>-->
              <template>
                <template
                  v-if="_dashboardById">
                  <span
                    v-if="browser.isMobile"
                    style="position:relative;top: 3px;"
                    class="card-text ml-1 h3">
                    {{ _dashboardById.name | truncate(20, '...') }}
                  </span>
                  <span
                    v-else
                    style="position:relative;top: 3px;"
                    class="card-text ml-1 h3">
                    {{ _dashboardById.name }}
                  </span>
                </template>
              </template>
            </div>
            <!--Cancel-->
            <b-link
              v-b-tooltip
              v-if="!fullscreen && dashboardEditMode"
              :title="$t('buttons.cancel') "
              class="float-right btn btn-fab-no-bg mr-1"
              @click="cancelEditMode">
              <!-- <icon name="times"/> -->
              <icon
                class="svg-absolute-center"
                name="CancelThin"/>
            </b-link>

            <!--Settings-->
            <b-link
              v-b-tooltip
              v-if="!fullscreen && !dashboardEditMode"
              :title="$t('buttons.edit') "
              class="float-right btn btn-fab-no-bg mr-1 d-none d-lg-block"
              @click="switchOnEditMode">
              <icon name="edit"/>
            </b-link>

            <!--Update-->
            <router-link
              v-b-tooltip
              v-if="!fullscreen && !dashboardEditMode"
              :to="{name: 'UpdateDashboard', params:{id: id}}"
              :title="$t('buttons.update_dashboard') "
              class="btn btn-fab-no-bg pr-0 mr-0 d-none d-sm-block">
              <icon name="setting"/>
            </router-link>

            <!--Pause-->
            <b-link
              v-b-tooltip
              v-if="!currentDashboardPaused && dashboardDataList && dashboardDataList.length > 0"
              :title="$t('buttons.pause') "
              class="btn btn-fab-no-bg"
              @click="pauseDashboard">
              <icon name="pause"/>
            </b-link>

            <!--Play/Pause-->
            <b-link
              v-b-tooltip
              v-if="currentDashboardPaused && dashboardDataList && dashboardDataList.length > 0"
              :title="$t('buttons.play') "
              class="btn btn-fab-no-bg"
              @click="playDashboard">
              <!-- TODO: Improve play icon and remove style from here -->
              <icon
                name="play"
                class="dashboard-play-icon"/>
            </b-link>

            <!--Add-->
            <!--<b-link-->
            <!--v-b-tooltip-->
            <!--v-if="!isDashboardNewPage && !dashboardEditMode && browser.isDesktop"-->
            <!--:to="{path: '/dashboards/new'}"-->
            <!--:title="$t('buttons.add_dashboard') "-->
            <!--class="btn btn-fab-no-bg d-none d-sm-block">-->
            <!--<icon-->
            <!--class="svg-absolute-center"-->
            <!--name="AddThin"/>-->
            <!--</b-link>-->

            <!--Save-->
            <b-link
              v-b-tooltip
              v-if="!fullscreen && dashboardEditMode"
              :class="{'btn-loading': dashboardSaveLoading}"
              :title="$t('buttons.save') "
              class="btn btn-fab-no-bg"
              @click="saveCurrentDashboard">
              <icon name="save"/>
            </b-link>

            <b-dropdown
              v-if="!dashboardEditMode"
              dropleft
              class="dashboard-theme-dropdown btn btn-fab-no-bg float-right"
              variant="outline-info">
              <template slot="button-content">
                <icon name="color"/>
              </template>
              <b-button
                v-b-tooltip
                v-for="(item, key) in $config.themes"
                :key="key"
                :style="{ backgroundColor: `${item.color} !important` }"
                :class="{'is-active': currentThemeName === key }"
                :disabled="currentThemeName === key && currentThemeName !== 'default'"
                class="m-2 theme-button"
                @click="changeTheme(key)"/>
            </b-dropdown>

            <!--FullScreen-->
            <b-link
              v-b-tooltip
              :title="$t('buttons.fullscreen') "
              class="btn-expand btn btn-fab-no-bg pr-0 mr-0 d-none d-sm-block"
              @click="fullscreenDashboard">
              <icon
                v-if="!fullscreen"
                name="expand"/>
              <icon
                v-if="fullscreen"
                name="close"/>
            </b-link>

            <!--Delete-->
            <!--<b-link-->
            <!--v-b-tooltip-->
            <!--v-if="!isDashboardNewPage && dashboardEditMode"-->
            <!--:title="$t('buttons.delete') "-->
            <!--class="btn btn-fab-no-bg  d-none d-sm-block"-->
            <!--@click="deleteDashboard">-->
            <!--<icon name="delete"/>-->
            <!--</b-link>-->
          </div>
          <div class="w-100 float-left">
            <!--<pre> {{ $store.state.socket.joinedGroups }} </pre>-->
            <b-row>
              <b-col
                cols="12">
                <b-card
                  class="no-shadow page-entity-list--main-card"
                  no-body>
                  <b-card-body
                    :class="{'grid-stack-diabled': (previewMode || !editMode)}"
                    class="px-0 pt-0 pb-0">
                    <Loading
                      v-if="dashboardLoading"
                      class="mx-auto mt-5 text-center"/>
                    <b-row>
                      <b-col cols="12">
                        <div
                          v-if="gridStackVisible"
                          class="grid-stack">
                          <transition
                            name="fade"
                            mode="out-in">
                            <data-list-no-result
                              v-if="!dashboardLoading && dashboardDataList.length == 0"/>
                          </transition>
                          <template
                            v-for="item in dashboardDataList">
                            <div
                              :style="{'height': item.h ? item.h : 2 + 'px'}"
                              :class="{'open-setting-modal': openedSettingsModal == item.uid}"
                              :id="item.uid"
                              :key="item.uid"
                              :data-gs-x="item.x"
                              :data-gs-y="item.y"
                              :data-gs-width="item.w ? item.w : 2"
                              :data-gs-height="item.h ? item.h : 2"
                              :data-gs-min-width="2"
                              :data-gs-min-height="2"
                              class="grid-stack-item">
                              <div class="grid-stack-item-content">
                                <component
                                  :is-resizing="underResizeItemUid === item.uid"
                                  :paused="paused"
                                  :is="normalizedWidgetName(item.widget.type)"
                                  :skeleton-mode="false"
                                  :data="item"
                                  :style="{'height': item.h ? item.h : 2 + 'px'}"
                                  :edit-mode="editMode"
                                  :widget-type="item.widget.type"
                                  @selectSettingModal="showSettingModal"
                                  @hideSettingModal="hideSettingModal"
                                  @remove="onWidgetRemove"/>
                              </div>
                            </div>
                          </template>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card-body>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </div>
      </fullscreen>
    </div>
  </ComponentContainer>
</template>

<script>
import { Aside as AppAside } from '@/components/'
import { mapGetters, mapActions } from 'vuex'
import AddFormWizard from '@/components/gateway/AddFormWizard'
import RemoveEntityModal from '@/components/modal/RemoveEntity'
import AddForm from '@/components/dashboard/AddForm'
import WidgetsComponents from '@/components/widgets/index'
import draggable from 'vuedraggable'
import EntitiesMixin from '@/mixin/entities'
import Utils from '@/helpers/utils'

/* eslint-disable vue/no-side-effects-in-computed-properties */
export default {
  name: 'DashboardPage',
  components: {
    AddFormWizard,
    AppAside,
    AddForm,
    RemoveEntityModal,
    ...WidgetsComponents,
    draggable
  },
  mixins: [EntitiesMixin],
  data () {
    return {
      deletedWidgets: ['MultiTrackerWidget'],
      underResizeItemUid: null,
      unloadDefaultThemeFirstTime: true,
      changeThemeTimeout2: null,
      changeThemeTimeout: null,
      firstTimeLoaded: true,
      cachedCurrentThemeName: false,
      currentThemeName: false,
      updateTriggerTimeout: null,
      fullscreen: false,
      underRemoveItem: false,
      paused: false,
      gridStack: null,
      gridStackVisible: true,
      widgetsListDragFirstInit: true,
      gridStackFirstInit: true,
      compData: [],
      openedSettingsModal: null,
      gridChanged: false,
      dashboardDataList: [],
      dashboardLoading: false,
      dashboardCachedDataList: null,
      widgetsList: [],
      myWidgetsList: [],
      dashboardItem: {
        name: this.$t('dashboard.default'),
        description: this.$t('dashboard.default_description')
      },
      searchWidgetsQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      dashboardList: 'dashboard/list',
      dashboardSaveLoading: 'dashboard/currentDashboardSaveLoading',
      dashboardEditMode: 'dashboard/currentDashboardEditMode',
      dashboardPreviewMode: 'dashboard/currentDashboardPreviewMode',
      currentDashboardResetMode: 'dashboard/currentDashboardResetMode',
      currentDashboardPaused: 'dashboard/currentDashboardPaused',
      editMode: 'dashboard/currentDashboardEditMode'
    }),
    isDirty () {
      return this.dashboardCachedDataList === JSON.stringify(this.dashboardDataList)
    },
    isDashboardNewPage () {
      return this.$route.path.includes('dashboards/new')
    },
    isDashboardPage () {
      return this.$route.path.includes('dashboards/')
    },
    currentDashboard () {
      return this._dashboardById(this.$route.params.id)
    },
    previewMode () {
      let out = this.dashboardIsPreviewMode
      if (out) {
        this.disableGridStack()
      } else if (this.editMode && this.openedSettingsModal === null) {
        this.enableGridStack()
      }
      return out
    },
    myWidgetsListRaw () {
      let out = this._.cloneDeep(this.widgetList)
      this.myWidgetsList = []
      this._.forEach(out, (item, index) => {
        this.myWidgetsList.push({
          type: item.type,
          dashboardId: this.id,
          widget: item
        })
      })
      return out
    },
    addMode () {
      let out = false
      if (this.id && this.id !== 'new') {
      } else {
        out = true
      }
      return out
    },
    _dashboardById () {
      let out = this._.cloneDeep(this.dashboardById(this.id))
      if (out) {
        this.dashboardItem = out
        if (this.firstTimeLoaded && out.attributes && this.currentThemeName === false) {
          this.changeTheme(out.attributes.theme)
          this.currentThemeName = out.attributes.theme
          this.cachedCurrentThemeName = out.attributes.theme
          this.firstTimeLoaded = false
        }
      }
      return out
    },
    sortableOptions () {
      return {
        group: 'widgets',
        disabled: false,
        animation: 400,
        dragClass: 'sortable-drag',
        ghostClass: 'sortable-ghost'
      }
    },
    WidgetsComponentsList () {
      this.widgetsList = []
      this._.forEach(this._.cloneDeep(WidgetsComponents), (value, key) => {
        // TODO: we must handle removed widgets scenario
        if (key === 'TrackerWidget') {
          return true
        }
        let obj = {
          type: key,
          dashboardId: this.id,
          widget: {
            type: key,
            name: null,
            listTitle: this.$t(`dashboard.widget.${key}`),
            description: null
          }
        }
        if (value.data() && value.data().defaultSettings) {
          obj.widget.defaultWidth = value.data().defaultSettings.defaultWidth
          obj.widget.defaultHeight = value.data().defaultSettings.defaultHeight
        }
        this.widgetsList.push(obj)
      })
      return WidgetsComponents
    },
    id () {
      return this.$route.params.id
    },
    sidebarHeight () {
      return `${window.innerHeight - 180}px`
    },
    filteredWidgetsList () {
      return this.widgetsList.filter((widget) => {
        return widget.type.toLowerCase().includes(this.searchWidgetsQuery)
      })
    },
    filteredMyWidgetsList () {
      let sorted = this._.orderBy(this.myWidgetsList, ['widget.name'], ['asc'])
      if (this.searchWidgetsQuery) {
        return sorted.filter((widget) => {
          let outCheck = false
          if (widget.widget.name) {
            outCheck = widget.widget.name.toLowerCase().includes(this.searchWidgetsQuery)
          }
          return outCheck
        })
      } else {
        return sorted
      }
    }
  },
  watch: {
    searchWidgetsQuery () {
      this.initWidgetsListDraggable()
    },
    dashboardDataList: {
      deep: true,
      handler () {
        this.updateDashboardTrigger()
        this.updateDashboardResetMode(this.dashboardCachedDataList === JSON.stringify(this.dashboardDataList))
      }
    },
    myWidgetsList () {
      this.initWidgetsListDraggable()
    },
    editMode () {
      if (this.editMode) {
        window.dashboardExtraRow = true
        this.enableGridStack()
        jQuery(document.body).removeClass('aside-menu-hidden')
      } else {
        window.dashboardExtraRow = false
        this.disableGridStack()
        jQuery(document.body).addClass('aside-menu-hidden')
      }
      if (this.gridStack) {
        this.gridStack.batchUpdate()
        this.gridStack.commit()
      }
      clearTimeout(this.updateTriggerTimeout)
      this.updateTriggerTimeout = setTimeout(() => {
        this.updateDashboardTrigger()
      }, 500)
    }
  },
  mounted () {
    // let self = this
    this.getAllMyWidgets()
    if (this.id && this.id === 'new') {
      this.setEditMode(true)
      this.initGridStack()
    } else {
      this.getDashboardData(this.id)
    }
    jQuery('body').addClass('theme-default')
  },
  beforeDestroy () {
    this.unloadTheme()
    this.clearCurrentData()
    clearTimeout(this.changeThemeTimeout)
    clearTimeout(this.changeThemeTimeout2)
    jQuery(document.body).addClass('aside-menu-hidden')
  },
  methods: {
    ...mapActions({
      getAll: 'dashboard/getAll',
      clearCurrentData: 'dashboard/clearCurrentData'
    }),
    getEditModeState () {
      return this.dashboardEditMode
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    fullscreenDashboard () {
      this.$refs['fullscreen'].toggle()
      window.dispatchEvent(new Event('resize'))
      this.$root.$emit('bv::hide::tooltip')
    },
    deleteDashboard () {
      this.remove()
    },
    playDashboard () {
      this.paused = false
      this.updateDashboardPauseMode(false)
      this.$root.$emit('bv::hide::tooltip')
    },
    pauseDashboard () {
      this.paused = true
      this.updateDashboardPauseMode(true)
      this.$root.$emit('bv::hide::tooltip')
    },
    cancelEditMode () {
      let confirmcheck
      if (this.isDirty) {
        confirmcheck = true
      } else {
        confirmcheck = confirm(this.$t('messages.prevent_leave_unsaved_dashboard'))
      }
      if (confirmcheck) {
        if (this.isDashboardNewPage) {
          this.$router.go(-1)
        } else {
          this.resetDashboard()
          this.resetGridStackItems()
          this.updateDashboardEditMode(false)
          this.$root.$emit('bv::hide::tooltip')
          jQuery('.grid-stack').find('.grid-stack-item').each((index, item) => {
            if (!jQuery(item).is('.ui-draggable') &&
              jQuery(item).find('.ui-draggable-handle').length <= 0) {
              let uid = jQuery(item).attr('id')
              this.gridStack.makeWidget(jQuery('#' + uid))
            }
          })
          setTimeout(() => {
            jQuery('.grid-stack').find('.grid-stack-item').each((index, item) => {
              if (!jQuery(item).is('.ui-draggable') &&
                jQuery(item).find('.ui-draggable-handle').length <= 0) {
                let uid = jQuery(item).attr('id')
                this.gridStack.makeWidget(jQuery('#' + uid))
              }
            })
            this.resetGridStackItems()
          }, 500)
        }
      }
    },
    switchOnEditMode () {
      this.updateDashboardEditMode(true)
      this.$root.$emit('bv::hide::tooltip')
    },
    onWidgetRemove (args) {
      this.enableGridStack()
      this.gridChanged = true
      this.dashboardDataList.splice(this.dashboardDataList.indexOf(args.data), 1)
      if (jQuery('#' + args.data.uid).length > 0) {
        this.gridStack.removeWidget(jQuery('#' + args.data.uid))
      }
    },
    resetGridStackItems () {
      let recoveredCache = JSON.parse(this.dashboardCachedDataList)
      if (this.gridStack) {
        jQuery('.grid-stack').find('.grid-stack-item').each((index, item) => {
          let mustRemove = true
          recoveredCache.forEach((dataItem) => {
            if (dataItem.uid === item.id) {
              mustRemove = false
              this.gridStack.update(item, dataItem.x, dataItem.y, dataItem.w, dataItem.h)
            }
          })
          if (mustRemove) {
            this.gridStack.removeWidget(item)
          }
        })
      }
    },
    resetDashboard () {
      let recoveredCache = JSON.parse(this.dashboardCachedDataList)
      this.dashboardDataList = recoveredCache
    },
    reInitDashboard () {
      this.updateDashboardEditMode(true)
      this.disableGridStack()
      this.emptyGridStack()
      this.dashboardDataList = []
      this.gridStackVisible = false
      let recoveredCache = JSON.parse(this.dashboardCachedDataList)
      this.dashboardDataList = recoveredCache
      this.gridStack = null
      this.updateDashboardEditMode(false)
      setTimeout(() => {
        this.gridStackVisible = true
        setTimeout(() => {
          this.initGridStack()
        }, 500)
      }, 500)
    },
    saveCurrentDashboard () {
      this.saveDashboard()
      this.$root.$emit('bv::hide::tooltip')
    },

    getDashboardData () {
      if (this.id && this.id !== 'new') {
        let out = this.dashboardItem.widgets
        let tempList = []
        if (out) {
          out.forEach((item) => {
            let uid = 'random-widget-id-' + Math.random().toString().split('.')[1]
            item.uid = uid
            item.widget = JSON.decycle(item)
            tempList.push(Object.assign({}, item))
          })
        }
        this.dashboardCachedDataList = JSON.stringify(tempList)
        this.dashboardDataList = tempList
        this.reInitDashboard()
        this.dashboardLoading = false
      }
    },
    remove () {
      this.underRemoveItem = this.dashboardItem
    },
    onRemoveSuccess () {
      this.getAll().then(() => {
        this.$router.push('/intro')
        this.underRemoveItem = false
      })
    },
    onRemoveCancel () {
      this.underRemoveItem = false
    },
    // TODO: must remove
    getAllMyWidgets () {
      // this.fetchWidgetList().then(() => {
      //   setTimeout(() => {
      this.initWidgetsListDraggable()
      //   }, 300)
      // })
    },
    initWidgetsListDraggable () {
      let self = this
      jQuery('.dashboard-widget-raw').each(function () {
        const w = jQuery(this).data('default-width')
        const h = jQuery(this).data('default-height')
        jQuery(this).data('_gridstack_node', {
          width: w || 2,
          height: h || 2
        })
      })
      jQuery('.dashboard-widget-raw').draggable({
        revert: 'invalid',
        scroll: false,
        helper: function () {
          return jQuery(this).clone()
        },
        start: function (event, ui) {
          self.$root.$emit('bv::hide::tooltip')
          jQuery('.dashboard-widget-raw').each(function () {
            const w = jQuery(this).data('default-width')
            const h = jQuery(this).data('default-height')
            jQuery(this).data('_gridstack_node', {
              width: w || 2,
              height: h || 2
            })
          })
        },
        appendTo: 'body'
      })
    },
    initGridStack () {
      let options = {
        float: false,
        cellHeight: 80,
        verticalMargin: 10,
        acceptWidgets: true,
        animate: true,
        resizable: {
          handles: 'e, se, s, sw, w'
        },
        draggable: {
          handle: '.grid-stack-item-content'
        }
      }
      let self = this
      jQuery('.grid-stack').gridstack(options)
      this.gridStack = window.gstack = jQuery('.grid-stack').data('gridstack')
      this.disableGridStack()
      jQuery('.grid-stack').on('added', (event, items) => {
        let grid = jQuery('.grid-stack').data('gridstack')
        for (var i = 0; i < items.length; i++) {
          if (jQuery(items[i].el).is('.cloned-widget')) {
            let cachedObj = items[i]
            if (items[i].el) {
              grid.removeWidget(items[i].el)
            }
            setTimeout(() => {
              this.addGridStack(cachedObj)
            }, 10)
          }
        }
        return false
      })
      jQuery('.grid-stack').on('change', (event, items) => {
        this.gridChanged = true
        if (items && items.length > 0) {
          items.forEach((item) => {
            this.dashboardDataList.forEach((dashItem) => {
              if (item.el[0] && dashItem.uid === item.el[0].id) {
                dashItem.x = item.x
                dashItem.y = item.y
                dashItem.w = item.width
                dashItem.h = item.height
              }
            })
          })
        }
      })
      jQuery('.grid-stack').on('resizestart', function (event, elem) {
        self.underResizeItemUid = event.target.id
      })
      jQuery('.grid-stack').on('gsresizestop', function (event, elem) {
        self.underResizeItemUid = null
      })
      this.updateDashboardTrigger()
    },
    addGridStack (data) {
      let widgetData = jQuery(data.el).data('widget')
      let uid = 'random-widget-id-' + Math.random().toString().split('.')[1]
      let createdWidget = {
        type: widgetData.type,
        dashboardId: this.id,
        uid: uid,
        x: data.x,
        y: data.y,
        w: data.width,
        h: data.height,
        widgetId: data.widget ? data.widget.id : widgetData.widget.id,
        customProp: 'this is custom prop'
      }
      createdWidget.widget = this._.extend({
        type: widgetData.type,
        name: 'Test',
        description: 'default description',
        setting: null
      }, widgetData.widget)
      this.dashboardDataList.push(createdWidget)
      setTimeout(() => {
        if (this.gridStack) {
          this.gridStack.makeWidget(jQuery('#' + uid))
        }
      }, 10)
    },
    emptyGridStack () {
      jQuery('.grid-stack').find('.grid-stack-item').each((index, item) => {
        let uid = jQuery(item).attr('id')
        if (jQuery('#' + uid).length > 0 && this.gridStack) {
          this.gridStack.removeWidget(jQuery('#' + uid), true)
        }
      })
    },
    saveDashboard () {
      if (this.addMode) {
        this._addDashboard()
      } else {
        this._updateDashboard()
      }
      this.dashboardCachedDataList = JSON.stringify(this.dashboardDataList)
    },
    setEditMode (payload) {
      this.updateDashboardEditMode(payload)
    },
    _updateDashboard (id, options = { exitFromEditMode: true }) {
      this.updateDashboardSaveLoadingMode(true)
      let payload = this.dashboardDataList
      let out = []
      let that = this
      let lastPromise = null
      payload.forEach((item, index) => {
        let copyObject = Object.assign({}, item)
        copyObject.dashboardId = id || this.id
        copyObject.teamId = this.workspaceId
        copyObject = this._.extend(copyObject.widget, copyObject)
        delete copyObject.widget
        out.push(
          copyObject
        )
        if (copyObject.setting === null) {
          copyObject.setting = '{}'
        }
      })
      if (!this.addMode) {
        // TODO: remove redundant requests
        lastPromise = this.updateDataDashboard({
          teamId: that.workspaceId,
          dashboardId: that.id,
          widgets: out
        }).then((response) => {
          // this.getDashboardData(id || this.id)
          if (options.exitFromEditMode) {
            this.setEditMode(false)
          }
          this.updateDashboardSaveLoadingMode(false)
        }).catch(() => {
          this.updateDashboardSaveLoadingMode(false)
        })
      } else {
        lastPromise = this.updateDataDashboard({
          teamId: that.workspaceId,
          dashboardId: id,
          widgets: out
        }).then(() => {
          this.getDashboardData(id || this.id)
          if (options.exitFromEditMode) {
            this.setEditMode(false)
          }
          this.getAllMyWidgets()
          this.updateDashboardSaveLoadingMode(false)
        }).catch(() => {
          this.updateDashboardSaveLoadingMode(false)
        })
      }
      return lastPromise
    },
    _addDashboard () {
      this.addDashboard(this.dashboardItem).then((response) => {
        this._updateDashboard(response.body.data).then(() => {
          this.getAll().then(() => {
            this.$router.push({ path: `/dashboards/${response.body.data}` })
          })
        })
      })
    },
    updateDashboardDetails () {
      if (!this.addMode) {
        this.dashboardItem.id = this.id
      }
      return this.updateDashboard(this.dashboardItem).then(() => {
        this.getAll()
      })
    },
    validateComponentType (type) {
      return this.WidgetsComponentsList[type]
    },
    disableGridStack () {
      if (this.gridStack && this.gridStack.disable) {
        this.gridStack.disable()
      }
    },
    enableGridStack () {
      if (this.gridStack && this.gridStack.enable) {
        this.gridStack.enable()
      }
    },
    showSettingModal (e) {
      this.disableGridStack()
      this.openedSettingsModal = e
    },
    hideSettingModal () {
      this.openedSettingsModal = null
      this.enableGridStack()
    },
    // TODO: must remove in alpha version
    normalizedWidgetName (type) {
      return type.replace('Card', 'Widget').replace('Graph', 'Indicator')
    },
    unloadTheme () {
      this._.each(this.$config.themes, (item) => {
        Utils.removejscssfile(`/themes/${item.url}.css`, 'css')
        Utils.removejscssfile(`/themes/${item.url}.js`, 'js')
      })
    },
    changeTheme (themeName) {
      // NOTE: prevent blink theme on speedly change dashboards
      clearTimeout(this.changeThemeTimeout)
      this.changeThemeTimeout = setTimeout(() => {
        let oldTheme = this.currentThemeName
        const self = this
        this.currentThemeName = themeName
        if (themeName === 'default') {
          Utils.loadjscssfile(`/themes/default.js`, 'js')
          this.unloadTheme()
        } else {
          if (this.$config.themes[themeName]) {
            jQuery('body').addClass(`theme-${this.$config.themes[themeName].cssClass}`)
            Utils.loadjscssfile(`/themes/${this.$config.themes[themeName].url}.js`, 'js')
            Utils.loadjscssfile(`/themes/${this.$config.themes[themeName].url}.css`, 'css')
            clearTimeout(this.changeThemeTimeout2)
            this.changeThemeTimeout2 = setTimeout(() => {
              if (oldTheme === this.cachedCurrentThemeName && this.unloadDefaultThemeFirstTime) {
                this.unloadDefaultThemeFirstTime = false
              } else {
                Utils.removejscssfile(`/themes/${this.$config.themes[oldTheme].url}.css`, 'css')
                Utils.removejscssfile(`/themes/${this.$config.themes[oldTheme].url}.js`, 'js')
              }
            }, 300)
          }
        }
        window.addEventListener('updateTheme', (e) => {
          self.resetDashboard()
        }, { once: true })
      }, 800)
    }
  }
}
/* eslint-enable vue/no-side-effects-in-computed-properties */
</script>
