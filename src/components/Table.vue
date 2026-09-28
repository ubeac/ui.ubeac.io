<template>
  <ComponentContainer>
    <b-card
      :header="caption"
      no-body>
      <b-table
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        responsive="sm">
        <template
          slot="actions"
          slot-scope="row">
          <b-button
            size="sm"
            class="mr-1"
            @click.stop="info(row.item, row.index, $event.target)">
            {{ $t("manage.info_modal") }}
          </b-button>
          <b-button
            size="sm"
            @click.stop="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} {{ $t("manage.info_modal") }}
          </b-button>
        </template>
      </b-table>
      <nav>
        <b-pagination
          :total-rows="getRowCount(items)"
          :per-page="perPage"
          v-model="currentPage"
          prev-text="Prev"
          next-text="Next"
          hide-goto-end-buttons/>
      </nav>
    </b-card>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'CTable',
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      modalInfo: { title: '', content: '' }
    }
  },
  methods: {
    getRowCount (items) {
      return items.length
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    }
  }
}
</script>
