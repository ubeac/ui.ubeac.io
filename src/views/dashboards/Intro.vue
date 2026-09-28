<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0 px-0">
      <div class="page-content-header pl-0">
        <div class="float-left">
          <icon
            name="wizard"
            class="page-content-header--icon mr-1"/>
          <span class="page-entity-list--main-title card-text h3 bold">{{ $t("general.nav.intro") }}</span>
        </div>
      </div>
      <AddFormWizard />
    </div>
  </ComponentContainer>
</template>

<script>
import AddFormWizard from '@/components/gateway/AddFormWizard'
import CardIntro from '@/components/CardIntro'
export default {
  name: 'IntroPage',
  components: { AddFormWizard, CardIntro },
  computed: {
    isBaseDataLoaded () {
      return this.$store.getters['layout/baseDataLoaded']
    }
  }
}
</script>
