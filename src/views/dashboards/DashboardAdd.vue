<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="float-left">
          <icon
            name="dashboard"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3">{{ $t("manage.add_dashboard") }}</span>
        </div>
      </div>
      <div class="page-content w-100 float-left mb-4">
        <b-row>
          <b-col >
            <AddForm
              @success="success"
              @cancel="cancel"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import AddForm from '@/components/dashboard/AddForm'

export default {
  name: 'DashboardAddPage',
  components: { AddForm },
  data () {
    return {}
  },
  methods: {
    success () {
      // this.sendGtagEvent(this.eventModel)
    },
    cancel () {
      this.$router.push({ name: 'Dashboards' })
    }
  }

}
</script>
