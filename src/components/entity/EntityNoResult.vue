<template>
  <ComponentContainer>
    <b-card
      no-body
      class="component-entity-no-result no-shadow no-radius text-center">
      <b-card-body clss="justify-content-start py-5">
        <span class="text-left d-inline-block">
          <div class="icon-area">
            <icon
              v-if="icon"
              :name="icon"/>
          </div>
          <span
            v-if="message"
            class="h5 d-inline-block">
            {{ message }}
          </span>
          <br>
          <router-link
            :to="url"
            class="d-inline-block">
            <span>
              {{ buttonText }}
            </span>
          </router-link>
        </span>
      </b-card-body>
    </b-card>
  </ComponentContainer>
</template>

<script>
export default {
  name: 'EntityNoResult',
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    buttonText: {
      type: String,
      default: '',
      required: false
    },
    message: {
      type: String,
      default: '',
      required: false
    },
    url: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
