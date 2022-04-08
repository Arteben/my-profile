<template>
  <v-flex>
    <v-btn
      v-for="(link, idx) of Object.keys(p_links)"
      :key="idx"
      @click.stop="btnClick(link)"
      icon
    >
      <v-icon
        large
      >{{ getFullIconName(link) }}</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>

//   "addLinks": [{
//       "habr": "",
//       "gith": ""
//     },

export default {
  name: 'WorkAddButtons',
  data () {
    return {
    }
  },
  props: {
    p_links: {
      type: Object,
      default () {
        return { git: '', habr: '' }
      },
    },
  },
  methods: {
    btnClick (_link = '') {
      window.open(this.p_links[_link])
    },
    getFullIconName (_icon) {
      const icons = {
        git: 'github-circle',
        habr: 'alphabetical',
      }
      return 'mdi-' + icons[_icon]
    },
  },
}
</script>
