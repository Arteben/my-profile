<template>
  <v-layout
    class="ma-0 my-1 justify-center"
  >
    <v-btn
      v-for="(link, idx) of Object.keys(links)"
      :key="idx"
      @click.stop="btnClick(link)"
      icon
      :title="getTitle(link)"
      class="mx-2"
    >
      <v-icon
        large
      >{{ getFullIconName(link) }}</v-icon>
    </v-btn>

    <v-btn
      v-if="p_workData.link"
      @click.stop="onClickIconOpenGame()"
      :title="$langs.title('work_linkGoTitle')"
      :icon="!p_expanded"
      class="mx-2"
    >
      <v-icon
        :large="!p_expanded"
      >mdi-arrow-right</v-icon>
      <span
        v-if="p_expanded"
      >{{ $langs.title('work_linkGoTitle') }}</span>
    </v-btn>
  </v-layout>
</template>

<script>

import { linkToWorks } from '@/rc-links'

//   "addLinks": [{
//       "habr": "",
//       "gith": ""
//     },
// link

const icons = {
  git: {
    title: 'work_titleGithub',
    icon: 'github',
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
      links: {},
    }
  },
  created() {
    if (this.p_workData.addLinks) {
      this.links = this.p_workData.addLinks
    }
  },
  props: {
    p_expanded: {
      type: Boolean,
      default: false,
    },
    p_workData: {
      type: Object,
      default () {
        return {
          addLinks: null,
          link: '',
          isSpecial: false,
        }
      },
    },
  },
  computed: {
    linkToWork () {
      const isSpecial = this.p_workData.isSpecial
      const link = this.p_workData.link
      return isSpecial && link || `${linkToWorks}${link}`
    },
  },
  methods: {
    btnClick (_link = '') {
      window.open(this.links[_link])
    },
    getFullIconName (_icon) {
      return 'mdi-' + (icons[_icon] || {}).icon
    },
    getTitle (_icon) {
      return this.$langs.title((icons[_icon] || {}).title)
    },
    onClickIconOpenGame() {
      window.open(this.linkToWork)
    },
  },
}
</script>
