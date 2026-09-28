<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="team"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ $t("form.update_dashboard") }}</span>
        </div>
        <div class="float-right">
          <b-link
            v-b-tooltip
            :title="$t('buttons.preview') "
            :to="{ name: 'DashboardsItem', params: {id: id}}"
            class="text-muted float-right btn btn-fab btn-success mr-0 d-lg-block">
            <icon name="eye"/>
          </b-link>
        </div>
      </div>
      <b-row>
        <b-col>
          <UpdateForm
            :id="id"
            class="w-100 float-left"
            @success="success"
            @cancel="cancel"/>
        </b-col>
      </b-row>
    </div>
  </ComponentContainer>
</template>

<script>
import UpdateForm from '@/components/dashboard/UpdateForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'DashboardUpdatePage',
  mixin: [EntitiesMixin],
  components: { UpdateForm },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    success () {
      // this.$router.push({ name: 'Dashboards' })
    },
    cancel () {
      this.$router.go(-1)
    }
  }

}
</script>
