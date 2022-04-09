<template>
  <v-flex
    class="pa-0"
  >
    <v-btn
      v-for="(link, idx) of Object.keys(p_links)"
      :key="idx"
      @click.stop="btnClick(link)"
      icon
      :title="getTitle(link)"
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

const icons = {
  git: {
    title: 'work_titleGithub',
    icon: 'github-circle',
  },
  habr: {
    title: 'work_titleHabra',
    icon: 'alphabetical',
  },
}

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
      return 'mdi-' + (icons[_icon] || {}).icon
    },
    getTitle (_icon) {
      return this.$langs.title((icons[_icon] || {}).title)
    },
  },
}
</script>
