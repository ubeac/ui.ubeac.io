<template>
  <ComponentContainer>
    <DataListNoResult v-if="itemNotFound" />
    <div
      v-else
      class="page-main-content animated fadeIn pt-0">
      <div class="page-content-header">
        <div class="text-suitable-header float-left">
          <icon
            name="floor"
            class="page-content-header--icon mr-1"/>
          <span class="card-text h3 bold">{{ floorById(id).name }} </span>
        </div>
        <div class="float-right">
          <b-link
            v-b-tooltip
            :title="$t('buttons.preview')"
            :to="{ name: 'DetailsFloor', params: {id: id}}"
            class="text-muted float-right btn btn-fab btn-success mr-0 d-lg-block">
            <icon name="eye"/>
          </b-link>
        </div>
      </div>
      <div class="page-content w-100 float-left mb-4">
        <UpdateForm
          :id="id"
          @success="success"
          @cancel="cancel"/>
      </div>
    </div>
  </ComponentContainer>
</template>

<script>
import UpdateForm from '@/components/floor/UpdateForm'
import EntitiesMixin from '@/mixin/entities'

export default {
  name: 'FloorUpdatePage',
  components: { UpdateForm },
  mixins: [EntitiesMixin],
  data () {
    return {
      entityType: 'floor'
    }
  },
  computed: {
    itemNotFound () {
      let out = false
      if (typeof (this.$store.getters[`${this.entityType}/byId`](this.id)) !== 'object') {
        out = true
      }
      return out
    },
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    success () {
      this.$router.go(-1)
    },
    cancel () {
      this.$router.go(-1)
    }
  }

}
</script>
