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
      >mdi-{{ icon.name }}</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
var addedIcons = [
  {
    id: 'print',
    name: 'printer',
    title: 'Печатать'
  }
]

export default {
  name: 'AddButtons',
  props: ['p_isColumn'],
  data () {
    return {
      addedIcons
    }
  },
  methods: {
    onClickIcon (_iconId) {
      switch(_iconId) {
      case 'print':
        this.$router.push({name: 'print'})
      }
    }
  }
}
</script>
