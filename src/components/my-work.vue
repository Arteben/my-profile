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
        :aspect-ratio="isExpanded && 2 || 6"
        :src="getImageSrc()"
        :lazy-src="getImageSrc('lazy')"
        :key="'img' + isExpanded"
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
          >
            <span
              class="mx-1"
            >{{ date }}</span>
            <v-icon
              small
            >mdi-clock</v-icon>
          </v-layout>
          <v-flex>
            <p
              class="subheading font-weight-regular"
              :class="{ 'text-truncate': !isExpanded }"
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

const linkToWork = 'http://coderjs.link/projects/'

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
  data () {
    return {
      isExpanded: false,
    }
  },
  props: { p_workData: Object },
  components: { workAddButtons },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    workItemWIdthClasses () {
      return this.isExpanded
        ? 'lg4 md6 sm6 xs12'
        : 'lg3 md3 sm4'
    },
    paddingsForCardImg () {
      const paddings = `pa-${this.isExpanded && 4 || 1}`
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
      return getInfoImgSrc(this.p_workData.img, !_isLazy && this.isExpanded)
    },
    onClickCard() {
      this.isExpanded = !this.isExpanded
      this.$emit('toggleWork', {
        ref: this.p_workData.name,
        isExpanded:  this.isExpanded,
      })
    },
    onClickIconOpenGame() {
      window.open(this.linkToWork)
    },
  },
}
</script>
