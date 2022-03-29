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
      :title="icon.title"
      @click="onClickIcon(icon.id)"
      icon
      flat
    >
      <v-icon
        color="titleText"
        large
      >{{ getNameIcon(icon) }}</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
var addedIcons = [
  {
    id: 'print',
    name: 'mdi-printer',
    title: 'Печатать',
  },
  {
    id: 'switchColors',
    name: 'mdi-invert-colors',
    title: 'Switch colors',
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
  methods: {
    getNameIcon (_icon) {
      return _icon.name
    },
    onClickIcon (_iconId) {
      switch(_iconId) {
      case 'print':
        this.$router.push({name: 'print'})
        break
      case 'switchColors':
        this.$eventsBus.callEvent('switchColors')
      }
    },
  },
}
</script>
