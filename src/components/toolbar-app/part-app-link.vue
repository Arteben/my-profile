<template>
  <router-link
    :class="$style.main"
    :active-class="$style.underline"
    tag="span"
    :to="p_item.to"
  >{{ p_item.name }}</router-link>
</template>

<script>
export default {
  name: 'PartAppLink',
  props: {
    p_item: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style module>
  .main {
    cursor: pointer;
  }
  .underline {
    text-decoration-line: underline
  }
</style>
