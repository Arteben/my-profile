<template>
  <v-alert
    @click.stop="onClick"
    :class="$style.alert"
    type="success"
  >
    {{ p_text }}
  </v-alert>
</template>

<script>

export default {
  name: 'AppAlerts',
  props: { p_text: String },
  methods: {
    onClick() {
      this.$emit('closeAlert')
    },
  },
}
</script>

<style module lang="sass">
.alert {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 10px;
  z-index: 10;
  cursor: pointer;
}
</style>

