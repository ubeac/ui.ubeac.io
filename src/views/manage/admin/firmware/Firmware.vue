<template>
  <div class="page-main-content animated fadeIn page-entity-list pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="firmware"
          class="page-content-header--icon mr-1"/>
        <span class="page-entity-list--main-title card-text h3 bold">{{ $t("manage.firmwares") }}</span>
      </div>
      <router-link
        :to="{name: 'NewFirmware'}"
        class="float-right btn btn-fab btn-success mr-0">
        <icon name="add"/>
      </router-link>
    </div>

    <b-container
      class="p-0"
      fluid>
      <b-row
        v-if="firmwareList && firmwareList.length > 0"
        class="row-fixture">
        <b-col
          v-for="(item, index) in sortedByName"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          class="px-2 pb-3">
          <b-card
            :key="item.id"
            :style="{'border-bottom-color': getIndexColor(index)}"
            no-body
            class="component-entity-card entity-item-card mb-0">
            <div
              :style="{'background-color': getIndexColor(index)}"
              class="bottom-border" />
            <!--Header-->
            <b-card-header class="p-3">
              <router-link :to="{name: 'UpdateFirmware', params: {id: item.id}}">
                <h4 class="py-1 w-75 text-one-line">{{ item.name }}</h4>
              </router-link>
            </b-card-header>

            <!--Body-->
            <b-card-body class="p-0">
              <div class="pb-3 pt-0 px-3">
                <b-row>
                  <b-col cols="12">
                    <template v-if="item.description">
                      <p class="text-one-line card-text text-description mb-2">{{ item.description }}</p>
                    </template>
                    <template v-else>
                      <p class="mh-1"/>
                    </template>
                    <small class="card-text text-small"> {{ $t("data.release_date") }} {{ item.releaseDate | moment("from") }}</small>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>

            <!--Footer-->
            <b-card-footer class="p-3">
              <!--Button-->
              <router-link
                v-b-tooltip.hover
                :title="$t('buttons.edit')"
                :to="{name: 'UpdateFirmware', params: {id: item.id}}"
                class="btn float-right p-0">
                <icon name="setting"/>
              </router-link>
              <b-link
                v-b-tooltip.hover
                v-if="item.technicalSpecFile !== '' && item.technicalSpecFile !== '00000000-0000-0000-0000-000000000000'"
                :title="$t('general.technicalSpecFile')"
                :href="getFileUrl(item.technicalSpecFile)"
                download
                class="btn float-left p-0">
                <icon name="download-file"/>
              </b-link>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Firmware',
  computed: {
    ...mapGetters({
      firmwareList: 'basedata/getAllFirmwares'
    }),
    sortedByName () {
      let sorted = this._.orderBy(this.firmwareList, ['name'], ['asc'])
      return sorted
    }
  }
}
</script>
