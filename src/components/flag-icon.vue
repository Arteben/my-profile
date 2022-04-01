<template>
  <img
    :src="icon"
    :class="$style.icon"
    :width="width"
    :height="width"
  >
</template>

<script>
import * as icons from '@/assets/flag-icons';

export default {
  name: 'FlagIcon',
  data() {
    return {
      icons,
      width: 35,
    };
  },
  computed: {
    lang () {
      // const lang = this.getLang()
      // return lang == 'ru' && 'eng' || 'ru'
      return 'ru'
    },
    icon () {
      return this.icons[`${this.lang}Icon`]
    },
  },
};
</script>

<style module>
.icon {
  border: 4px solid var(--v-primaryText-base);
  border-radius: 30px;
}
</style>
