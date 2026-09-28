<template>
  <ComponentContainer>
    <div class="page-main-content animated fadeIn page-entity-list page-card">

      <RemoveEntityModal
        :item="underRemoveItem"
        action="card/delete"
        @cancel="onRemoveCancel"
        @success="onRemoveSuccess"/>

      <b-card
        class="page-entity-list--main-card"
        no-body>
        <b-card-header class="page-entity-list--header p-3">
          <div class="float-left">
            <icon
              name="card"
              class="page-entity-list--header--icon mr-1"/>
            <span class="page-entity-list--main-title card-text h3 bold">{{ $t("manage.card") }}</span>
          </div>
          <b-button
            class="btn-edit-dashboard float-right btn btn-sm btn-success py-1"
            @click="toggleEditMode">
            <span v-if="editMode">
              {{ $t("buttons.save") }}
            </span>
            <span v-else>{{ $t("buttons.edit") }}</span>
          </b-button>
        </b-card-header>
        <b-card-body class="px-0 pt-3 pb-0">
          <div class="row row-fixture">
            <b-col
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
              class="px-2 pb-3">
              <b-card
                no-body
                class="w-100 mb-0 float-left page-card--very-tall card-shadow p-0">

                <AddForm @success="onAddCard"/>

              </b-card>
            </b-col>
            <b-col
              v-for="item in sortedByUpdateDate"
              :key="item.id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
              class="px-2 pb-3">

              <b-card
                :class="{'btn-loading': cardLoadingIds.includes(item.id)}"
                no-body
                class="text-white mb-0 bg-info page-card--very-tall card-shadow">

                <b-card-header class="p-3">

                  <editable
                    :content="item.name"
                    :editable="editMode"
                    class="h4 card-text text-one-line"
                    @update="item.name = $event, update(item)"/>

                </b-card-header>
                <b-card-body class="page-card--description px-3 py-2 mb-2">

                  <editable
                    :editable="editMode"
                    :content="item.description"
                    class="card-text "
                    @update="item.description = $event, update(item)"/>
                  <small class="card-text font-weight-600">{{ $t("data.created") }} {{ item.createDate | moment("from") }}</small>
                </b-card-body>
                <b-card-footer
                  v-if="editMode"
                  class="p-3">
                  <b-button
                    class="btn-edit-dashboard float-right btn btn-sm btn-outline-danger py-1"
                    @click="deleteMe(item)">
                    <icon
                      name="delete"
                      class="pr-0"/>
                  </b-button>
                </b-card-footer>
              </b-card>
            </b-col>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </ComponentContainer>
</template>

<script>
import entityListPage from '@/mixin/entityListPage'
import RemoveEntityModal from '@/components/modal/RemoveEntity'
import AddForm from '@/components/widgets/partials/AddForm'
import Moment from 'moment'

export default {
  name: 'CardsPage',
  components: { RemoveEntityModal, AddForm },
  mixins: [entityListPage],
  data () {
    return {
      underRemoveItem: false,
      buildingCount: '',
      cardLoadingIds: [],
      editMode: false,
      cardDeleteId: []
    }
  },
  computed: {
    sortedByUpdateDate () {
      let sorted = this._.cloneDeep(this.cardList).sort((a, b) => {
        return new Moment(b.updateDate).valueOf() - new Moment(a.updateDate).valueOf()
      })
      return sorted
    }
  },
  mounted () {
    this.fetchCardList()
  },
  methods: {
    onAddCard () {
      this.fetchCardList()
    },
    update (item) {
      this.cardLoadingIds.push(item.id)
      this.updateDashboard(item).then(() => {
        let index = this.cardLoadingIds.indexOf(item.id)
        if (index >= 0) {
          this.cardLoadingIds.splice(index, 1)
        }
      })
    },
    deleteMe (item) {
      // this.underRemoveItem = item
      this.deleteCard('card/delete', item.id)
    },
    toggleEditMode () {
      this.editMode = !this.editMode
    },
    onRemoveSuccess () {
      this.fetchCardList()
      this.underRemoveItem = false
    },
    onRemoveCancel () {
      this.underRemoveItem = false
    }
  }
}
</script>
