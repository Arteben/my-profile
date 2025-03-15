<template>
  <span
    :class="$style.lang"
  >{{ lang }}</span>
</template>

<script>
export default {
  name: 'LangSwitcher',
  computed: {
    lang () {
      return this.$langs.getReverseLang()
    },
    icon () {
      return this.icons[`${this.lang}Icon`]
    },
  },
};
</script>

<style module lang="sass">
.lang {
  color: var(--v-primaryText-base);
  font-weight: bold;
  margin-left: 2px;
  font-size: 17px;
}
</style>
