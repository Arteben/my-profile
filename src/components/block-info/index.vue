<template>
  <v-flex
    ma-3
    :class="$style.rootContainer"
  >
    <p
      :title="p_title"
    >
      <v-icon
        x-large
      >mdi-{{ p_icon }}</v-icon>
      &nbsp;
      <span
        class="title"
      >{{ p_title }}:</span>
    </p>
    <p
      v-for="item of p_items"
      :key="item.title"
      class="pl-4 body-2"
      :title="item.title"
    >
      <v-icon
        :size="item.isBig && '24' || '18'"
      >mdi-{{ item.icon }}</v-icon>
      &nbsp;
      <span
        :class="item.isBig && 'subheading' || ''"
      >{{ item.name || item.title }}</span>
    </p>
  </v-flex>
</template>

<script>
export default {
  name: 'Contacts',
  props: [ 'p_title', 'p_icon', 'p_items' ]
}
</script>

<style module>
  .rootContainer {
    min-width: 250px;
    flex-grow: 0;
  }
</style>
