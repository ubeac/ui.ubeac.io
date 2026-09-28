<template>
  <b-card
    class="card-help">
    <h5>
      <icon name="help" />
      {{ title }}
    </h5>
    <p>
      <span v-html="text"/>
    </p>
    <a
      :href="url"
      target="_blank">
      more
    </a>
  </b-card>
</template>

<script>
export default {
  name: 'HelpCard',
  props: {
    url: {
      required: true,
      default: '',
      type: [String]
    },
    text: {
      required: true,
      default: '',
      type: [String]
    },
    title: {
      required: false,
      default: 'HELP',
      type: [String]
    }
  }
}
</script>
