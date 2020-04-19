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
    title: 'Печатать'
  },
  {
    id: 'sound',
    name: {
      on: 'mdi-volume-high',
      off: 'mdi-volume-off',
    },
    title: 'Звук'
  },
]

export default {
  name: 'AddButtons',
  props: {
    p_isColumn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addedIcons
    }
  },
  methods: {
    getNameIcon (_icon) {
      switch(_icon.id) {
      case 'print':
        return _icon.name
      case 'sound':
        if (this.$eventsBus.sound) {
          return _icon.name.on
        } else {
          return _icon.name.off
        }
      }
    },
    onClickIcon (_iconId) {
      switch(_iconId) {
      case 'print':
        this.$router.push({name: 'print'})
        break
      case 'sound':
        this.$eventsBus.sound = !this.$eventsBus.sound
      }
    }
  }
}
</script>
