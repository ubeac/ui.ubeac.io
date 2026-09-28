<template>
  <ComponentContainer>
    <b-card
      no-body
      class="p-0 mb-0 page-card--very-tall">
      <b-card-header class="mb-2 p-3 page-card--header">{{ $t("dashboard.widget.add_form") }}</b-card-header>
      <b-form
        class="needs-validation px-3 py-2"
        autocomplete="nope"
        novalidate>
        <b-row>
          <b-col cols="12">
            <!--Name-->
            <b-form-group>
              <b-form-input
                v-validate.disable="'required'"
                :state="errors.has('name') ? 'invalid' : null"
                v-model="insertItem.name"
                :placeholder="$t('general.name_placeholder')"
                type="text"
                autofocus
                name="name"
                required/>
              <b-form-invalid-feedback v-if="errors.has('name')">
                <span v-for="error in errors.collect('name')">
                  {{ error }}
                </span>
              </b-form-invalid-feedback>
            </b-form-group>
            <!--Description-->
            <b-form-group class="mb-3">
              <b-form-textarea
                v-model="insertItem.description"
                :placeholder="$t('general.description_placeholder')"
                :rows="2"
                type="text"
                name="description"/>
            </b-form-group>

          </b-col>
        </b-row>
        <!--Buttons-->
        <div class="page-card--footer-button">
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
      </b-form>
    </b-card>
  </ComponentContainer>
</template>
<script>
import {mapActions} from 'vuex'
import validation from '@/decorators/validation'
import successNotification from '@/decorators/successNotification'
export default {
  name: 'WidgetAddForm',
  data () {
    return {
      addLoading: false,
      insertItem: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addWidget: 'card/add'
    }),
    success () {
      this.$emit('success')
    },
    cancel () {
      this.$emit('cancel')
    },
      @validation
        @successNotification('Widget Added Successfully')
    add () {
      this.addLoading = true
      this.addWidget(this.insertItem).then(() => {
        this.success()
        this.insertItem = {
          name: '',
          description: ''
        }
        this.addLoading = false
      }).catch(() => {
        this.addLoading = false
      })
    }
  }
}
</script>
