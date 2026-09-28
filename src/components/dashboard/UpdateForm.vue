<template>
  <ComponentContainer>
  <RemoveEntityModal
    :item="underRemoveItem"
    :warningMessage="$t('modal.delete_dashboard_warning')"
    action="dashboard/delete"
    @cancel="onRemoveCancel"
    @success="onRemoveSuccess"/>
  <b-card 
    no-body>
    <b-card-body
      class="px-0 pb-0 pt-1">
      <b-form
        inline
        v-if="dashboardUpdate"
        novalidate>
        
        <!--Name-->
        <b-form-group 
          :label="$t('general.name')">
          <b-form-input
            v-validate="{
                         required: true,
                         min: 2,
                         max: 150
                         }"
            :state="errors.has('name') ? false : null"
            v-model="underUpdateItem.name"
            :placeholder="$t('general.name')"
            size="md"
            type="text"
            autofocus
            name="name"
            required/>
            <b-form-invalid-feedback v-if="errors.has('name')">
              <span
                v-for="(error , index) in errors.collect('name')"
                :key="index" >
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <!--Theme-->
        <b-form-group
          :label="$t('dashboard.theme')">
          <b-form-select
            v-validate="'required'"
            v-model="underUpdateItem.attributes.theme"
            :state="errors.has('attributeTheme') ? false : null"
            name="attributeTheme">
            <option
              v-for="(theme, key) in $config.themes" 
              :value="key"
              :key="theme.url">
            {{ theme.name }}
            </option>
          </b-form-select>
          <b-form-invalid-feedback v-if="errors.has('attributeTheme')">
            <span
              v-for="(error, index) in errors.collect('attributeTheme')"
              :key="index">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>

        <!--View Order-->
        <b-form-group
          :label="$t('general.view_order')">
          <b-form-input
            v-model="underUpdateItem.viewOrder"
            v-validate="'required'"
            :state="errors.has('View Order') ? false : null"
            :rows="2"
            :placeholder="$t('form.dashboard_view_order_placeholder')"
            type="number"
            name="View Order"/>
          <b-form-invalid-feedback v-if="errors.has('View Order')">
              <span
                v-for="(error , index) in errors.collect('View Order')"
                :key="index" >
                {{ error }}
              </span>
          </b-form-invalid-feedback>   
        </b-form-group>

        <!--Description-->
        <b-form-group
          :label="$t('general.description') + ' ' + $t('general.optional')"
          class="form-control-optional">
          <b-form-textarea
            v-validate="{
                         min: 0,
                         max: 500
                         }"
            :state="errors.has('description') ? 'invalid' : null"
            v-model="underUpdateItem.description"
            :placeholder="$t('general.description') + ' ' + $t('general.optional')"
            size="md"
            :rows="2"
            type="text"
            name="description"/>
            <b-form-invalid-feedback v-if="errors.has('description')">
              <span
                v-for="(error , index) in errors.collect('description')"
                :key="index" >
                {{ error }}
              </span>
            </b-form-invalid-feedback>
        </b-form-group>

        <div class="form-row form-button-row pr-3 py-3 pl-2 mx-0">
          <b-button
            :disabled="updateEnabled"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="update(underUpdateItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            class="btn btn-secondary float-left"
            @click="cancel">
            {{ $t("buttons.cancel") }}
          </b-button>
          <b-button
            type="button"
            variant="outline-danger"
            class="float-right text-right"
            @click="prepareForRemove(underUpdateItem)">
            <icon name="delete" class="mr-1"/>
            {{ $t('buttons.delete') }}
          </b-button>
        </div>
        
        <div
          class="mr-3 ml-3 w-100 mb-3 mt-2">
          <HelpCard
            class="p-0 m-0 w-100"
            :url="Config.docs.dashboard"
            :text="$t('help_cards.dashboard')" />
        </div>

        </b-form>
    </b-card-body>
  </b-card>
  </ComponentContainer>
</template>

<script>
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
import EntityUpdateMixin from '@/mixin/entityUpdate'
import Entity from '@/mixin/entities'
import RemoveEntityModal from '@/components/modal/RemoveEntity'

export default {
  name: 'DashboardUpdateForm',
  mixins: [EntityUpdateMixin],
  components: { RemoveEntityModal },
  data () {
    return {
      underRemoveItem: false,
      underUpdateItem: {},
      updateItemCached: {}
    }
  },
  computed: {
    dashboardUpdate () {
      let item = this.dashboardById(this.id)
      if (item) {
        if (this.updateItemCached.id !== item.id) {
          this.updateItemCached = this._.cloneDeep(item)
        }
        this.users = item.users
        // TODO: fix dashboards that did not have theme attr
        if (!item.attributes.theme)  {
          item.attributes.theme = 'default'
        }
      }
      this.underUpdateItem = this._.cloneDeep(item)
      return this._.cloneDeep(item)
    },
    updateEnabled () {
      return JSON.stringify(this.updateItemCached) === JSON.stringify(this.underUpdateItem)
    }
  },
  methods: {
    onRemoveSuccess () {
      this.$router.push('/dashboards')
      this.underRemoveItem = false
    },
    onRemoveCancel () {
      this.underRemoveItem = false
    },
    prepareForRemove (item) {
      this.underRemoveItem = item
    },
      @validation
        @successNotification('Update Done')
    update (item) {
      var dashoboard = {
        id: item.id,
        name: item.name,
        attributes: item.attributes,
        description: item.description,
        viewOrder: item.viewOrder,
        teamId: item.teamId
      }
      return this.updateDashboard(dashoboard).then(() => {
        // NOTE: we do manual update on dashboard because of theme loading problem after update
        // dashboard details
        this.updateDashboardDetails(dashoboard)
        this.$router.push({ name: 'DashboardsItem', params: {id: this.id} })
        this.success()
      })
    }
  }
}
</script>



