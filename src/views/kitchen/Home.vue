<template>
  <ComponentContainer class="kitchensink">
    <div class="page-main-content animated fadeIn p-4">
      <h1> Kitchen sink page </h1>
      <IconSelector/>
      <b-card no-body>
        <b-card-header>
          <h3>Buttons</h3>
        </b-card-header>
        <b-card-body>
          <b-button
            variant="info"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="info"
            class="btn-loading"
            size="md" >
            Success
          </b-button>
          <br>
          <br>
          <b-button
            variant="success"
            class="btn-loading"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="success"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="success"
            size="md" >
            Success
          </b-button>
          <b-button
            variant="success"
            size="sm" >
            Success
          </b-button>
          <br>
          <br>
          <b-button
            variant="primary"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="primary"
            size="md" >
            Success
          </b-button>
          <b-button
            variant="primary"
            size="sm" >
            Success
          </b-button>
          <br>
          <br>
          <b-button
            variant="scandry"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="scandry"
            size="md" >
            Success
          </b-button>
          <b-button
            variant="scandry"
            size="sm" >
            Success
          </b-button>
          <br>
          <br>
          <b-button
            variant="danger"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="danger"
            size="md" >
            Success
          </b-button>
          <b-button
            variant="danger"
            size="sm" >
            Success
          </b-button>
          <br>
          <br>
          <b-button
            variant="outline-danger"
            size="lg" >
            Success
          </b-button>
          <b-button
            variant="outline-danger"
            size="md" >
            Success
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm" >
            Success
          </b-button>
        </b-card-body>
      </b-card>
      <b-card no-body>
        <b-card-header>
          <h3>Badge</h3>
        </b-card-header>
        <b-card-body>
          <b-badge
            variant="success"
            size="lg">
            Success
          </b-badge>
          <b-badge
            variant="danger"
            size="lg">
            Success
          </b-badge>
          <b-badge
            variant="info"
            size="lg">
            Success
          </b-badge>
          <b-badge
            variant="primary"
            size="lg">
            Success
          </b-badge>
          <b-badge
            variant="secandry"
            size="lg">
            Success
          </b-badge>
          <b-badge
            variant="warning"
            size="lg">
            Success
          </b-badge>
        </b-card-body>
      </b-card>
    <!--<DeviceFilter/>-->
    <!--<pre> {{ deviceList }} </pre>-->
    <!--<b-card no-body>-->
    <!--<SelectSeries-->
    <!--:sensor-value-type="true"-->
    <!--@updateSeries="updateFilter" />-->
    <!--</b-card>-->
    <!--<pre> {{ selectedSeriesData }} </pre>-->
    </div>
  </ComponentContainer>
</template>
<style lang="scss" scoped >
.kitchensink {
  .btn {
    margin-right: 2em !important;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
import SelectSeries from '@/components/widgets/partials/SelectSeries.vue'
import DeviceFilter from '@/components/filtering/Device.vue'
import FileUploader from '@/components/FileUploader'
import IconSelector from '@/components/IconSelector'
/* eslint-disable */
export default {
  name: 'Kitchen',
  components: {FileUploader, SelectSeries, DeviceFilter, IconSelector },
  /* eslint-disable */
  data () {
    return {
      uploadedFileData: null
    }
  },
  computed: {
    ...mapGetters({
      deviceList: 'device/list',
      deviceByTagUid: 'device/byTagUid'
    })
  },
  methods: {
    onUpload (e) { 
      this.uploadedFileData = e
    },
    updateFilter (data) {
      log('update series')
      log(data)
      this.selectedSeriesData = data
    }
  }
}
</script>
