<template>
  <v-layout
    ma-2
  >
    <add-buttons
      :p_isColumn="true"
    />
  </v-layout>
</template>

<script>
import addButtons from '@/components/additional-buttons'

export default {
  name: 'NavDrawerAppContent',
  props: {
    p_isShow: Boolean
  },
  components: {
    addButtons
  }
}
</script>
