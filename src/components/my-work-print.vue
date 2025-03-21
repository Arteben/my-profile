<template>
  <v-layout
    :class="$style.workContainer"
  >
    <img
      :class="['mx-3', $style.workImage]"
      :src="getImgSrc(p_workData.img)"
      @load="$emit('loadImgWork')"
    >
    <v-flex
      column
    >
      <span class="display-1"> {{ $langs.translate(p_workData.name) }} </span>
      <div>
        <p
          class="body-1"
        > {{ $langs.translate(p_workData.text) }} </p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

import { getInfoImgSrc } from '@/utils'

export default {
  name: 'MyPrintedWork',
  props: {
    p_workData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImgSrc (_dir) {
      return getInfoImgSrc(_dir)
    },
  },
}
</script>

<style module lang="sass">
  .workContainer {
    margin: 15px;

    & > div {
      max-width: 70%;
    }
  }

  .workImage {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 10px;
  }
</style>
