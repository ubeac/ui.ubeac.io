<template>
  <ComponentContainer class="component-entity--info pl-3 pr-3 pt-3 pb-0 pb-lg-3">
    <b-row
      v-if="data"
      class="row-fixture p-0">
      <b-col
        v-for="(item, index) in data"
        :key="index"
        :xl="baseColumnSize"
        :lg="baseColumnSizeResponsive"
        :md="baseColumnSizeResponsive"
        :sm="baseColumnSizeResponsive"
        :class="{'mb-lg-3': data.length === 4 && index <= 1}"
        class="px-2 pt-0 pb-3 pb-lg-0 pb-xl-0 mb-xl-0 "
        cols="12">
        <router-link
          v-if="item.route"
          :to="{ name: item.route }" >
          <div class="text-center mb-0 component-entity-info-card">
            <div
              class="p-0 d-flex">
              <div
                class="icon-area mr-2">
                <icon
                  :name="item.icon"
                  class="font-2xl"/>
              </div>
              <div class="info-area">
                <template v-if="item.type === 'date'">
                  <div class="h6 mt-3">
                    <template v-if="item.value">
                      {{ item.value | date }}
                    </template>
                    <template v-else >
                      {{ $t('badge.no_request') }}
                    </template>
                  </div>
                </template>
                <template v-if="item.type === 'bigNumber'">
                  <div class="text-value-lg">
                    {{ item.value | numeralFormat('0,0') }}
                  </div>
                </template>
                <template v-if="!item.type">
                  <div class="text-value-lg">
                    {{ item.value }}
                  </div>
                </template>
                <div class="title-area text-uppercase">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <div v-else >
          <div class="text-center mb-0 component-entity-info-card">
            <div
              class="p-0 d-flex">
              <div
                class="icon-area mr-2">
                <icon
                  :name="item.icon"
                  class="font-2xl"/>
              </div>
              <div class="info-area">
                <template v-if="item.type === 'date'">
                  <div class="h6 mt-3">
                    <template v-if="item.value">
                      {{ item.value | date }}
                    </template>
                    <template v-else >
                      {{ $t('badge.no_request') }}
                    </template>
                  </div>
                </template>
                <template v-if="item.type === 'bigNumber'">
                  <div class="text-value-lg">
                    {{ item.value | numeralFormat('0,0') }}
                  </div>
                </template>
                <template v-if="!item.type">
                  <div class="text-value-lg">
                    {{ item.value }}
                  </div>
                </template>
                <div class="title-area text-uppercase">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'EntityInfoCard',
  props: {
    data: {
      type: Array,
      required: true,
      default () {
        return false
      }
    }
  },
  computed: {
    baseColumnSize () {
      let out
      if (this.data.length === 3) {
        out = 4
      } else if (this.data.length === 2) {
        out = 6
      } else {
        out = 3
      }
      return out
    },
    baseColumnSizeResponsive () {
      let out
      if (this.data.length === 4) {
        out = 6
      } else if (this.data.length === 3) {
        out = 4
      } else if (this.data.length === 2) {
        out = 6
      } else {
        out = 3
      }
      return out
    }
  }
}
</script>
