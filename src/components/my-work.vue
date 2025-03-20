<template>
  <v-flex
    :class="workItemWIdthClasses"
  >
    <v-card
      light
      hover
      @click.stop="onClickCard('expand')"
      :class="[paddingsForCardImg]"
    >
      <v-img
        :aspect-ratio="p_isExpandWork && 2 || 6"
        :src="getImageSrc()"
        :lazy-src="getImageSrc('lazy')"
        :key="'img' + p_isExpandWork"
        max-height="500"
      />
      <v-flex
        px-1
      >
        <v-card-title
          class="headline
                font-weight-medium
                px-0 py-3"
        >{{ $langs.translate(p_workData.name) }}</v-card-title>
        <v-layout
          column
        >
          <v-layout
            v-if="p_workData.date"
            align-center
            justify-end
            px-2
            mx-0
          >
            <span
              class="mr-1"
            >{{ date }}</span>
            <v-icon
              small
            >mdi-clock</v-icon>
          </v-layout>
          <v-flex>
            <p
              class="subheading font-weight-regular"
              :class="{ 'text-truncate': !p_isExpandWork }"
              column
              full
            > {{ $langs.translate(p_workData.text) }} </p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-card-actions>
        <work-add-buttons
          v-if="p_workData.addLinks"
          :p_links="p_workData.addLinks"
        />
        <v-spacer />
        <v-btn
          v-if="p_workData.link"
          @click.stop="onClickIconOpenGame()"
          icon
          :title="$langs.title('work_linkGoTitle')"
        >
          <v-icon
            large
          >mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>

import { getInfoImgSrc } from '@/utils'
import workAddButtons from './work-add-buttons'

const linkToWork = 'http://coderjs.space/projects/'

// {
//   "name": "Calculator",
//   "isSpecial": false,
//   "date": ''
//   "text": [
//     "This is my first typescript project and I created it for training"
//   ],
//   "img": "calculatorts",
//   "img_big": "calculatorts",
//   "link": "calculatorts/index.html",
//   "addLinks": {
//     "habr": "",
//     "gith": ""
//   },
// },

export default {
  name: 'MyWork',
  props: { p_workData: Object, p_isExpandWork: Boolean },
  components: { workAddButtons },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    workItemWIdthClasses () {
      return this.p_isExpandWork
        ? 'lg4 md6 sm6 xs12'
        : 'lg3 md3 sm4'
    },
    paddingsForCardImg () {
      const paddings = `pa-${this.p_isExpandWork && 4 || 1}`
      const isMobile = this.$vuetify.breakpoint.xs
      return isMobile && 'pa-1' || paddings
    },
    linkToWork () {
      const isSpecial = this.p_workData.isSpecial
      const link = this.p_workData.link
      return isSpecial && link || `${linkToWork}${link}`
    },
    date () {
      const localLangOptions = {
        'ru': 'ru-RU',
        'eng': 'en-GB',
      }
      const options = {month: 'long', year: 'numeric'}
      const date = new Date(this.p_workData.date)
      const localLang = localLangOptions[this.$langs.getLang()]
      return date.toLocaleDateString(localLang, options)
    },
  },
  methods: {
    getImageSrc (_isLazy) {
      return getInfoImgSrc(this.p_workData.img, !_isLazy && this.p_isExpandWork)
    },
    onClickCard() {
      this.$emit('toggleWork', this.p_workData.img)
    },
    onClickIconOpenGame() {
      window.open(this.linkToWork)
    },
  },
}
</script>
