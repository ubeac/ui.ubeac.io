<template>
  <div class="page-main-content animated fadeIn page-entity-list page-admin pt-0">
    <div class="page-content-header">
      <div class="float-left">
        <icon
          name="product"
          class="page-content-header--icon mr-1"/>
        <span class="page-entity-list--main-title card-text h3 bold">{{ $t("manage.products") }}</span>
      </div>
      <router-link
        :to="{name: 'NewProduct'}"
        class="float-right btn btn-fab btn-success mr-0">
        <icon name="add"/>
      </router-link>
    </div>
    <b-container
      class="p-0"
      fluid>
      <b-row
        v-if="productList && productList.length > 0"
        class="row-fixture">
        <b-col
          v-for="(item, index) in productList"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          class="px-2 pb-3">
          <b-card
            :key="item.id"
            no-body
            class="component-entity-card entity-item-card entity-item-card-tall mb-0">
            <div
              :style="{'background-color': getIndexColor(index)}"
              class="bottom-border" />
            <!--Header-->
            <b-card-header class="p-3">
              <router-link :to="{name: 'UpdateProduct', params: {id: item.id}}">
                <h4 class="py-1 w-75 text-one-line">{{ item.name }}</h4>
              </router-link>
            </b-card-header>

            <!--Body-->
            <b-card-body class="p-0">
              <div class="pb-3 pt-0 px-3">
                <b-row>
                  <b-col cols="8">
                    <template v-if="item.description">
                      <p class="text-one-line card-text text-description mb-2">{{ item.description }}</p>
                    </template>
                    <template v-else>
                      <p class="mh-1"/>
                    </template>
                    <small class="card-text text-small"> {{ $t("data.create_date") }} {{ item.createDate | moment("from") }}</small> <br >
                    <small class="card-text text-small"> {{ $t("data.last_update_date") }} {{ item.updateDate | moment("from") }}</small>
                  </b-col>
                  <b-col cols="4">
                    <div class="page-admin-logo">
                      <router-link
                        :to="{name: 'UpdateProduct', params: {id: item.id}}"
                        class="image-container">
                        <b-card-img
                          v-b-tooltip.hover
                          v-if="item.name"
                          :title="item.name"
                          :src="getImageUrl(item.image)"
                          alt=""/>
                      </router-link>
                    </div>
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
                :to="{name: 'UpdateProduct', params: {id: item.id}}"
                class="btn w-2em float-right p-0">
                <icon name="setting"/>
              </router-link>
              <b-button
                v-b-tooltip.hover
                v-if="item.technicalSpecFile && item.technicalSpecFile !== '00000000-0000-0000-0000-000000000000'"
                :href="getFileUrl(item.technicalSpecFile)"
                :title="$t('general.technicalSpecFile')"
                download
                class="p-0 w-2em"
                variant="perimary-ouline"
                size="sm">
                <icon name="download-file"/>
              </b-button>
              <b-button
                v-b-tooltip.hover
                v-if="item.manualFile && item.manualFile !== '00000000-0000-0000-0000-000000000000'"
                :href="getFileUrl(item.manualFile)"
                :title="$t('general.manualFile')"
                download
                class="p-0 w-2em"
                variant="perimary-ouline"
                size="sm">
                <icon name="download-file"/>
              </b-button>
            </b-card-footer>
          </b-card>
        </b-col>
        <!--Card View-->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  computed: {
    ...mapGetters({
      productList: 'basedata/getAllProducts'
    })
  }
}
</script>
