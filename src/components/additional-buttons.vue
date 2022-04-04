<template>
  <v-layout
    justify-center
    align-center
    :column="p_isColumn"
    nowrap
  >
    <v-btn
      class="ma-2"
      v-for="icon of addedIcons"
      :key="icon.id"
      :title="$langs.title(icon.title)"
      @click="onClickIcon(icon.id)"
      icon
      flat
    >
      <v-icon
        color="titleText"
        large
      >{{ getNameIcon(icon) }}</v-icon>
    </v-btn>
    <v-btn
      class="ma-3"
      flat
      icon
      large
      :title="$langs.title('head_title_switchlang')"
      @click="onClickIcon('switchLang')"
    >
      <flag-icon />
    </v-btn>
  </v-layout>
</template>

<script>
import flagIcon from '@/components/flag-icon'
import { pushAppRouter } from '@/utils'

const addedIcons = [
  {
    id: 'print',
    name: 'mdi-printer',
    title: 'head_title_print',
  },
  {
    id: 'switchColors',
    name: 'mdi-invert-colors',
    title: 'head_title_switchColor',
  },
]

export default {
  name: 'AddButtons',
  props: {
    p_isColumn: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      addedIcons,
    }
  },
  components: { flagIcon },
  methods: {
    getNameIcon (_icon) {
      return _icon.name
    },
    onClickIcon (_iconId) {
      switch(_iconId) {
      case 'print':
        pushAppRouter.call(this, {_name: 'print'})
        break
      case 'switchColors':
        this.$eventsBus.callEvent('switchColors')
        break
      case 'switchLang':
        this.$langs.switch()
      }
    },
  },
}
</script>
