<template>
  <span
    :class="$style.wrapper"
  >
    <img
      :src="icon"
      :class="$style.icon"
      :width="width"
      :height="width"
    >
  </span>
</template>

<script>
import * as icons from '@/assets/flag-icons';

export default {
  name: 'FlagIcon',
  data() {
    return {
      icons,
      width: 32,
    };
  },
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

<style module>
.wrapper {
  border: 4px solid var(--v-primaryText-base);
  background: var(--v-primaryText-base);
  border-radius: 60px;
  max-width: 30px;
  max-height: 32px;
  overflow: hidden;
  vertical-align: top;
}
.icon {
  margin: -12px -4.5px;
}
</style>
