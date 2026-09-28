<template>
  <ComponentContainer>
    <div class="page-content-header">
      <div class="text-suitable-header float-left">
        <icon
          :name="icon"
          class="page-content-header--icon mr-1"/>
        <span class="page-entity-list--main-title card-text h3 bold">{{ name }}</span>
      </div>
      <div
        class="float-right">
        <!--Preview-->
        <b-link
          v-b-tooltip
          v-if="previewLink.enabled"
          :title="$t('buttons.preview')"
          :to="previewLink.to"
          class="text-muted float-right btn btn-primary ml-2 d-lg-block">
          <icon name="info"/>
          {{ $t('manage.details') }}
        </b-link>
        <!--Settings-->
        <b-link
          v-b-tooltip
          v-if="settingLink.enabled"
          :title="$t('dashboard.settings')"
          :to="settingLink.to"
          class="text-muted float-right btn btn-fab btn-success mr-0 ml-2 d-lg-block">
          <icon name="setting"/>
        </b-link>
        <!--Security-->
        <b-link
          v-b-tooltip
          v-if="securityLink.enabled"
          :title="$t('manage.security')"
          :to="securityLink.to"
          class="text-muted float-right btn btn-danger d-lg-block">
          <icon name="shield"/>
          {{ $t('manage.security') }}
        </b-link>
      </div>
    </div>
  </ComponentContainer>
</template>
<script>
export default {
  name: 'Entityhead',
  props: {
    name: {
      default: '',
      type: String,
      require: true
    },
    icon: {
      default: '',
      type: String,
      require: true
    },
    previewLink: {
      default () {
        return {
          enabled: false,
          to: null
        }
      },
      type: Object,
      require: false
    },
    settingLink: {
      default () {
        return {
          enabled: false,
          to: null
        }
      },
      type: Object,
      require: false
    },
    securityLink: {
      default () {
        return {
          enabled: false,
          to: null
        }
      },
      type: Object,
      require: false
    }
  }
}
</script>
