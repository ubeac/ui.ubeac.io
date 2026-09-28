<template>
  <ComponentContainer>
  <b-card 
    no-body>
    <b-card-body
      class="px-0 pb-0 pt-1">
      <b-form
        inline
        autocomplete="nope"
        novalidate>
        <!--Name-->
        <b-form-group :label="$t('general.name')">
          <b-form-input
            v-validate="{
                         required: true,
                         min: 2,
                         max: 150
                         }"
            :state="errors.has('name') ? false : null"
            v-model="insertItem.name"
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

        <!-- Team -->
        <b-form-group :label="$t('general.team')" v-show="false">
          <b-form-select 
            v-validate="'required'"
            :state="errors.has('teamId') ? false : null"
            name="teamId"
            v-model="insertItem.teamId">
            <option
              v-for="org in teamList"
              :value="org.id"
              :key="org.id">{{ org.name }}
            </option>
          </b-form-select>
          <b-form-invalid-feedback v-if="errors.has('teamId')">
            <span
              v-for="(error, index) in errors.collect('teamId')"
              :key="index">
              {{ error }}
            </span>
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          :label="$t('dashboard.theme')">
          <b-form-select
            v-validate="'required'"
            class="col-xl-6"
            v-model="insertItem.attributes.theme"
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
            v-model="insertItem.viewOrder"
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
            v-model="insertItem.description"
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

        <!--Buttons-->
        <div class="form-row form-button-row pr-3 py-3 pl-2 mx-0">
          <b-button
            :class="{'btn-loading': addLoading}"
            type="button"
            class="btn btn-success float-left mr-2"
            @click="add(insertItem)">
            {{ $t("buttons.submit") }}
          </b-button>
          <b-button
            type="button"
            variant="secondary"
            class="float-left"
            @click="cancel()">
            {{ $t("buttons.cancel") }}
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
import EntityAddMixin from '@/mixin/entityAdd'
export default {
  name: 'DashboardAddForm',
  mixins: [EntityAddMixin],
  data () {
    return {
      addLoading: false,
      insertItem: {
        name: '',
        description: '',
        viewOrder: 0,
        attributes: {
          theme: 'default'
        },
        teamId: null
      }
    }
  },
  mounted () {
    this.autoSelectFirstTeam()
  },
  methods: {
    autoSelectFirstTeam () {
      if (this.teamList && this.teamList.length > 0) {
        this.insertItem.teamId = this.teamList[0].id
      }
    },
      @validation
        @successNotification('Dashboard Added Successfully')
    add () {
      this.addLoading = true
      return this.addDashboard(this.insertItem).then((response) => {
        this.addLoading = false
        this.$router.push({ name: 'DashboardsItem', params: {id: response.body.data} })
      }).catch(() => {
        this.addLoading = false
      })
    }
  }
}
</script>
