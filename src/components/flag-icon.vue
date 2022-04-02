<template>
  <div>
    <v-icon
      :class="$style.icon"
      color="titleText"
    >mdi-translate</v-icon>
    <span
      :class="$style.lang"
    >{{ lang }}</span>
  </div>
</template>

<script>
export default {
  name: 'FlagIcon',
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

<style module lang="less">
.icon {
  border: 3px solid var(--v-primaryText-base);
  border-radius: 30px;
}

.lang {
  color: var(--v-primaryText-base);
  font-weight: bold;
  margin-left: 2px;
  font-size: 17px;
  vertical-align: super;
}
</style>
