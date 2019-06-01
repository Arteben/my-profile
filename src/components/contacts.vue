<template>
  <v-layout
    justify-center
    :class="$style.containerMinWidth"
  >
    <div
      :class="[$style.contacts, contactsFontClass]"
    >
      <p
        title="телефон"
      >
        <v-icon>mdi-phone-classic</v-icon>
        &nbsp;
        <span>+7(920)-927-75-72</span>
      </p>
      <p title="электронная почта">
        <v-icon>mdi-email</v-icon>
        &nbsp;
        <span>artjombebenin@gmail.com</span>
      </p>
      <p title="skype">
        <v-icon>mdi-skype</v-icon>
        &nbsp;
        <span>artem__r</span>
      </p>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: 'Contacts',
  data () {
    return {}
  },
  computed: {
    contactsFontClass () {
      var breakpoint = this.$vuetify.breakpoint || {}
      var fontClass = 'title'
      if (breakpoint.smAndDown) {
        fontClass = 'subheading'
      }
      return fontClass
    }
  }
}
</script>

<style module>
  .containerMinWidth {
    min-width: 250px;
  }
</style>
