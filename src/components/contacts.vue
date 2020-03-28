<template>
  <v-layout
    justify-center
    :class="[$style.containerMinWidth, isMobile && 'column']"
  > <v-flex
      py-2
      title="телефон"
    >
      <v-icon>mdi-phone-classic</v-icon>
      &nbsp;
      <span>+7(920)-927-75-72</span>
    </v-flex>
    <v-flex
      title="электронная почта"
      py-2
    >
      <v-icon>mdi-email</v-icon>
      &nbsp;
      <span>artjombebenin@gmail.com</span>
    </v-flex>
    <v-flex
      title="skype"
      py-2
    >
      <v-icon>mdi-skype</v-icon>
      &nbsp;
      <span>artem__r</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Contacts',
  data () {
    return {}
  },
  computed: {
    isMobile () {
      return  this.$vuetify.breakpoint.smAndDown
    },
  }
}
</script>

<style module>
  .containerMinWidth {
    min-width: 350px;
  }
</style>
